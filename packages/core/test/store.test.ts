// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import {
  addActivity, addCharacter, buildChecklist, emptyState, exportState, importState, parseState,
  progress, removeActivity, removeCharacter, setResetConfig, toggleDone, SyntheticProvider, ManualProvider,
} from "../src/index.js";

let n = 0;
const id = () => `id${++n}`;
const now = new Date("2026-11-07T10:00:00Z");

function seeded() {
  let s = emptyState();
  s = addCharacter(s, { name: " Alpha " }, id);
  s = addCharacter(s, { name: "Beta", level: 5 }, id);
  s = addActivity(s, { title: "Daily thing", cadence: "daily", scope: "character" }, id);
  s = addActivity(s, { title: "Account weekly", cadence: "weekly", scope: "account" }, id);
  return s;
}

describe("store", () => {
  it("builds checklist rows per character and per account", () => {
    const rows = buildChecklist(seeded(), now);
    expect(rows).toHaveLength(3);
    expect(rows[0]?.subjectName).toBe("Alpha");
    expect(progress(rows)).toEqual({ done: 0, total: 3 });
  });
  it("toggles done and undone", () => {
    const s = seeded();
    const a = s.activities[0]!, c = s.characters[0]!;
    const s2 = toggleDone(s, a.id, c.id, now);
    expect(progress(buildChecklist(s2, now)).done).toBe(1);
    expect(progress(buildChecklist(toggleDone(s2, a.id, c.id, now), now)).done).toBe(0);
  });
  it("daily completion resets after reset time", () => {
    const s = seeded();
    const s2 = toggleDone(s, s.activities[0]!.id, s.characters[0]!.id, now);
    const later = new Date("2026-11-07T15:01:00Z");
    expect(progress(buildChecklist(s2, later)).done).toBe(0);
  });
  it("removal cleans completions", () => {
    const s = seeded();
    const s2 = toggleDone(s, s.activities[0]!.id, s.characters[0]!.id, now);
    expect(Object.keys(removeCharacter(s2, s.characters[0]!.id).completions)).toHaveLength(0);
    expect(Object.keys(removeActivity(s2, s.activities[0]!.id).completions)).toHaveLength(0);
  });
  it("rejects empty names and bad reset config", () => {
    expect(() => addCharacter(emptyState(), { name: "  " })).toThrow();
    expect(() => addActivity(emptyState(), { title: "", cadence: "daily", scope: "account" })).toThrow();
    expect(() => setResetConfig(emptyState(), { dailyHourUtc: 24, dailyMinuteUtc: 0, weeklyDayUtc: 0 })).toThrow();
  });
  it("round-trips export/import", () => {
    const s = seeded();
    expect(importState(exportState(s))).toEqual(s);
  });
});

describe("validation of untrusted input", () => {
  it("rejects wrong version, bad types, bad enums", () => {
    expect(() => parseState({ version: 2 })).toThrow();
    expect(() => parseState(null)).toThrow();
    expect(() => parseState({ version: 1, characters: [{ id: 1, name: "x" }] })).toThrow();
    expect(() => parseState({ version: 1, activities: [{ id: "a", title: "t", cadence: "hourly", scope: "account" }] })).toThrow();
    expect(() => parseState({ version: 1, completions: { a: "not a date" } })).toThrow();
  });
  it("drops unknown fields and prototype keys", () => {
    const s = parseState(JSON.parse('{"version":1,"evil":1,"completions":{"__proto__":"2026-01-01T00:00:00Z"}}'));
    expect(Object.keys(s.completions)).toHaveLength(0);
    expect("evil" in s).toBe(false);
  });
});

describe("providers", () => {
  it("declare provenance; synthetic is original, manual is empty", async () => {
    const syn = new SyntheticProvider();
    expect(syn.provenance.rights).toBe("original");
    expect((await syn.listCharacters()).length).toBeGreaterThan(0);
    expect(await new ManualProvider().listCharacters()).toEqual([]);
  });
});
