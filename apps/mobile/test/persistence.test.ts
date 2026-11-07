// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { addCharacter, emptyState } from "@companion/core";
import { DEFAULT_PREFS, PREFS_KEY, STATE_KEY, createPersistence, parsePrefs, type KeyValueStorage } from "../src/persistence";

function memStorage(initial: Record<string, string> = {}): KeyValueStorage & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    getItem: async (k) => data[k] ?? null,
    setItem: async (k, v) => { data[k] = v; },
    removeItem: async (k) => { delete data[k]; },
  };
}

describe("persistence", () => {
  it("returns empty state when nothing stored", async () => {
    expect(await createPersistence(memStorage()).loadState()).toEqual(emptyState());
  });

  it("round-trips state", async () => {
    const p = createPersistence(memStorage());
    const s = addCharacter(emptyState(), { name: "Sample" });
    expect(await p.saveState(s)).toBe(true);
    expect(await p.loadState()).toEqual(s);
  });

  it("falls back to empty state on corrupt data", async () => {
    const st = memStorage({ [STATE_KEY]: "{not json" });
    expect(await createPersistence(st).loadState()).toEqual(emptyState());
    const st2 = memStorage({ [STATE_KEY]: JSON.stringify({ version: 99 }) });
    expect(await createPersistence(st2).loadState()).toEqual(emptyState());
  });

  it("reports save failure instead of throwing", async () => {
    const st: KeyValueStorage = {
      getItem: async () => null,
      setItem: async () => { throw new Error("full"); },
      removeItem: async () => undefined,
    };
    expect(await createPersistence(st).saveState(emptyState())).toBe(false);
    expect(await createPersistence(st).savePrefs(DEFAULT_PREFS)).toBe(false);
  });

  it("prefs default to reminders off and validate input", async () => {
    expect(DEFAULT_PREFS.remindersEnabled).toBe(false);
    expect(parsePrefs(null)).toEqual(DEFAULT_PREFS);
    expect(parsePrefs({ remindersEnabled: "yes", reminderLeadMinutes: 1 })).toEqual(DEFAULT_PREFS);
    expect(parsePrefs({ remindersEnabled: true, reminderLeadMinutes: 60 })).toEqual({ remindersEnabled: true, reminderLeadMinutes: 60 });
    const p = createPersistence(memStorage());
    await p.savePrefs({ remindersEnabled: true, reminderLeadMinutes: 15 });
    expect(await p.loadPrefs()).toEqual({ remindersEnabled: true, reminderLeadMinutes: 15 });
  });

  it("clearAll removes state and prefs", async () => {
    const st = memStorage();
    const p = createPersistence(st);
    await p.saveState(emptyState());
    await p.savePrefs(DEFAULT_PREFS);
    await p.clearAll();
    expect(st.data[STATE_KEY]).toBeUndefined();
    expect(st.data[PREFS_KEY]).toBeUndefined();
  });
});
