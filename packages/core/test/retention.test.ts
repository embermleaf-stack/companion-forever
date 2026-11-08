// SPDX-License-Identifier: GPL-3.0-only
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  applyRetention,
  disconnectProvider,
  mapProfileResponse,
  mergeImported,
  parseState,
  purgeExpired,
  removeApiDerived,
  type Character,
} from "../src/index.js";

const NOW = new Date("2026-12-01T12:00:00.000Z");
const daysAgo = (d: number, extraMs = 0) => new Date(NOW.getTime() - d * 86_400_000 - extraMs).toISOString();
const api = (id: string, importedAt?: string): Character => ({
  id,
  name: id,
  source: "blizzard",
  blizzardId: "1" + id,
  ...(importedAt !== undefined ? { importedAt } : {}),
});

describe("purgeExpired", () => {
  it("keeps day 29, drops day 30 and 31", () => {
    const out = purgeExpired([api("d29", daysAgo(29)), api("d30", daysAgo(30)), api("d31", daysAgo(31))], NOW);
    expect(out.map((c) => c.id)).toEqual(["d29"]);
  });
  it("keeps a record 1 ms younger than the TTL, drops one exactly at it", () => {
    expect(purgeExpired([api("a", daysAgo(30, -1))], NOW)).toHaveLength(1);
    expect(purgeExpired([api("b", daysAgo(30))], NOW)).toHaveLength(0);
  });
  it("never touches manual records, however old or garbled", () => {
    const manual: Character[] = [
      { id: "m1", name: "A" },
      { id: "m2", name: "B", source: "manual", importedAt: "garbage" },
      { id: "m3", name: "C", source: "manual", importedAt: daysAgo(400) },
    ];
    expect(purgeExpired(manual, NOW)).toBe(manual);
  });
  it("drops API-derived records with garbage, missing or far-future timestamps", () => {
    const out = purgeExpired(
      [api("g", "not a date"), api("m"), api("e", ""), api("f", daysAgo(-2)), api("ok", daysAgo(1))],
      NOW,
    );
    expect(out.map((c) => c.id)).toEqual(["ok"]);
  });
  it("tolerates small clock skew into the future", () => {
    expect(purgeExpired([api("s", daysAgo(0, -60_000))], NOW)).toHaveLength(1);
  });
  it("honours a custom retention and an invalid clock", () => {
    expect(purgeExpired([api("x", daysAgo(8))], NOW, 7)).toHaveLength(0);
    const list = [api("y", daysAgo(100))];
    expect(purgeExpired(list, new Date("nope"))).toBe(list);
  });
  it("returns the same array when nothing is purged and does not mutate input", () => {
    const list = [api("a", daysAgo(1)), { id: "m", name: "M" }];
    const copy = JSON.stringify(list);
    expect(purgeExpired(list, NOW)).toBe(list);
    purgeExpired([...list, api("old", daysAgo(99))], NOW);
    expect(JSON.stringify(list)).toBe(copy);
  });
});

describe("removeApiDerived", () => {
  it("removes only blizzard-sourced records", () => {
    const out = removeApiDerived([{ id: "m", name: "M" }, api("a", daysAgo(1))]);
    expect(out.map((c) => c.id)).toEqual(["m"]);
  });
});

describe("parseState with provider fields", () => {
  const base = { version: 1, activities: [], completions: {} };
  it("still loads old saved data without the new fields", () => {
    const s = parseState({ ...base, characters: [{ id: "1", name: "Old", level: 3 }] });
    expect(s.characters[0]).toEqual({ id: "1", name: "Old", level: 3 });
  });
  it("round-trips source, importedAt, blizzardId", () => {
    const c = { id: "1", name: "N", source: "blizzard", importedAt: daysAgo(1), blizzardId: "42" };
    expect(parseState({ ...base, characters: [c] }).characters[0]).toEqual(c);
  });
  it("rejects an invalid source and wrongly typed fields; drops unknown fields", () => {
    expect(() => parseState({ ...base, characters: [{ id: "1", name: "N", source: "other" }] })).toThrow();
    expect(() => parseState({ ...base, characters: [{ id: "1", name: "N", blizzardId: 5 }] })).toThrow();
    const s = parseState({ ...base, characters: [{ id: "1", name: "N", token: "x", guild: "g" }] });
    expect(Object.keys(s.characters[0]).sort()).toEqual(["id", "name"]);
  });
});

describe("mapProfileResponse", () => {
  const fixture = JSON.parse(
    readFileSync(new URL("../../../fixtures/battlenet/profile-user-wow.synthetic.json", import.meta.url), "utf8"),
  );
  it("fixture is flagged synthetic", () => expect(fixture.synthetic).toBe(true));
  it("minimizes to the allowlisted fields and skips malformed entries", () => {
    const out = mapProfileResponse(fixture);
    expect(out).toEqual([
      { name: "Testwarden", realm: "Examplia", className: "Sample Class A", level: 10, blizzardId: "910000001" },
      { name: "Fixturebard", realm: "Examplia", className: "Sample Class B", level: 20, blizzardId: "910000002" },
    ]);
    const text = JSON.stringify(out);
    for (const dropped of ["Invented Guild", "FEMALE", "Sample Race", "900000001", "900000002", "slug"]) {
      expect(text).not.toContain(dropped);
    }
  });
  it("accepts a JSON string and rejects malformed JSON", () => {
    expect(mapProfileResponse(JSON.stringify(fixture))).toHaveLength(2);
    expect(() => mapProfileResponse("{not json")).toThrow(/malformed/);
  });
  it("rejects wrong top-level shapes", () => {
    for (const bad of [null, 5, [], "[]", {}, { wow_accounts: "x" }]) expect(() => mapProfileResponse(bad)).toThrow();
  });
  it("returns an empty list for an empty account", () => {
    expect(mapProfileResponse({ wow_accounts: [] })).toEqual([]);
    expect(mapProfileResponse({ wow_accounts: [{ characters: [] }] })).toEqual([]);
  });
  it("de-duplicates by id and rejects out-of-range levels", () => {
    const ch = { name: "A", id: 1, realm: { name: "R" }, playable_class: { name: "C" }, level: 5 };
    const accts = [{ characters: [ch, ch, { ...ch, id: 2, level: 0 }, { ...ch, id: 3, level: 1.5 }] }];
    expect(mapProfileResponse({ wow_accounts: accts })).toHaveLength(1);
  });
});

describe("state-level retention helpers", () => {
  const mk = (characters: Character[], completions: Record<string, string> = {}) => ({
    version: 1 as const, characters, activities: [], completions, resets: { dailyHourUtc: 15, dailyMinuteUtc: 0, weeklyDayUtc: 2 },
  });
  it("applyRetention drops expired records and their completions, keeps the rest", () => {
    const s = mk([api("old", daysAgo(40)), { id: "man", name: "M" }], { "a::old": "x", "a::man": "y" });
    const out = applyRetention(s, NOW);
    expect(out.characters.map((c) => c.id)).toEqual(["man"]);
    expect(Object.keys(out.completions)).toEqual(["a::man"]);
    const fresh = mk([api("new", daysAgo(1))]);
    expect(applyRetention(fresh, NOW)).toBe(fresh);
  });
  it("disconnectProvider deletes all API-derived data regardless of age", () => {
    const s = mk([api("n", daysAgo(0)), { id: "man", name: "M" }], { "a::n": "x", "a::man": "y" });
    const out = disconnectProvider(s);
    expect(out.characters.map((c) => c.id)).toEqual(["man"]);
    expect(Object.keys(out.completions)).toEqual(["a::man"]);
  });
  it("mergeImported updates in place, adds, deletes vanished, never touches manual", () => {
    const i = (bid: string, name: string, level = 1) => ({ name, realm: "Examplia", className: "Sample Class A", level, blizzardId: bid });
    const s = mk(
      [{ ...api("keep", daysAgo(10)), blizzardId: "1", name: "Old name" }, { ...api("gone", daysAgo(10)), blizzardId: "2" }, { id: "man", name: "Manual" }],
      { "a::keep": "x", "a::gone": "y" },
    );
    const out = mergeImported(s, [i("1", "Renamed", 5), i("3", "Newone")], NOW, () => "newid");
    expect(out.characters.map((c) => [c.id, c.name, c.level])).toEqual([["keep", "Renamed", 5], ["man", "Manual", undefined], ["newid", "Newone", 1]]);
    expect(out.characters[0].importedAt).toBe(NOW.toISOString());
    expect(Object.keys(out.completions)).toEqual(["a::keep"]);
    expect(mergeImported(s, [], NOW).characters.map((c) => c.id)).toEqual(["man"]);
  });
});
