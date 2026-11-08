// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { addCharacter, emptyState } from "@companion/core";
import { DEFAULT_PREFS, ONBOARDING_KEY, PREFS_KEY, STATE_KEY, createPersistence, parsePrefs, type KeyValueStorage } from "../src/persistence";

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
    expect(parsePrefs({ remindersEnabled: true, reminderLeadMinutes: 60 })).toEqual({ remindersEnabled: true, reminderLeadMinutes: 60, theme: "auto" });
    const p = createPersistence(memStorage());
    await p.savePrefs({ remindersEnabled: true, reminderLeadMinutes: 15, theme: "auto" });
    expect(await p.loadPrefs()).toEqual({ remindersEnabled: true, reminderLeadMinutes: 15, theme: "auto" });
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

  it("onboarding flag defaults to not done, persists, and is cleared by clearAll", async () => {
    const st = memStorage();
    const p = createPersistence(st);
    expect(await p.loadOnboardingDone()).toBe(false);
    expect(await p.saveOnboardingDone(true)).toBe(true);
    expect(st.data[ONBOARDING_KEY]).toBe("done");
    expect(await createPersistence(st).loadOnboardingDone()).toBe(true);
    await p.clearAll();
    expect(await p.loadOnboardingDone()).toBe(false);
  });

  it("onboarding ignores unexpected stored values and survives storage errors", async () => {
    expect(await createPersistence(memStorage({ [ONBOARDING_KEY]: "garbage" })).loadOnboardingDone()).toBe(false);
    const bad: KeyValueStorage = {
      getItem: async () => { throw new Error("x"); },
      setItem: async () => { throw new Error("x"); },
      removeItem: async () => { throw new Error("x"); },
    };
    expect(await createPersistence(bad).loadOnboardingDone()).toBe(false);
    expect(await createPersistence(bad).saveOnboardingDone(true)).toBe(false);
  });
});

describe("theme preference persistence", () => {
  it("defaults to auto", () => {
    expect(DEFAULT_PREFS.theme).toBe("auto");
    expect(parsePrefs({}).theme).toBe("auto");
  });
  it("maps unknown values to auto and keeps valid ones", () => {
    expect(parsePrefs({ theme: "sepia" }).theme).toBe("auto");
    expect(parsePrefs({ theme: 3 }).theme).toBe("auto");
    expect(parsePrefs({ theme: "light" }).theme).toBe("light");
    expect(parsePrefs({ theme: "dark" }).theme).toBe("dark");
  });
  it("round-trips through storage and validates on load", async () => {
    const st = memStorage();
    const p = createPersistence(st);
    await p.savePrefs({ ...DEFAULT_PREFS, theme: "light" });
    expect((await p.loadPrefs()).theme).toBe("light");
    st.data[PREFS_KEY] = JSON.stringify({ remindersEnabled: false, reminderLeadMinutes: 30, theme: "bogus" });
    expect((await p.loadPrefs()).theme).toBe("auto");
  });
});
