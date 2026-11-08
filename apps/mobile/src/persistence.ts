// SPDX-License-Identifier: GPL-3.0-only
// Persistence for the mobile app. Mirrors apps/web/src/storage.ts but takes an
// injectable async key-value store so it can be unit-tested without React Native.
import { DEFAULT_THEME_PREF, parseThemePref, type ThemePref } from "./theme";
import { emptyState, exportState, parseState, type AppState } from "@companion/core";

/** Minimal subset of AsyncStorage that we depend on. */
export interface KeyValueStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export const STATE_KEY = "companion-forever:state:v1";
export const PREFS_KEY = "companion-forever:prefs:v1";
/** First-launch onboarding completion flag. Kept out of Prefs so the prefs shape is unchanged. */
export const ONBOARDING_KEY = "companion-forever:onboarding:v1";

/** Device-local preferences that are not part of the portable backup. */
export interface Prefs {
  /** Opt-in. Off by default. */
  remindersEnabled: boolean;
  /** Minutes before a reset at which the reminder fires. */
  reminderLeadMinutes: number;
  /** Appearance: "auto" follows the phone's system light/dark setting. */
  theme: ThemePref;
}

export const DEFAULT_PREFS: Prefs = { remindersEnabled: false, reminderLeadMinutes: 30, theme: DEFAULT_THEME_PREF };

export const MIN_LEAD_MINUTES = 5;
export const MAX_LEAD_MINUTES = 240;

export function parsePrefs(input: unknown): Prefs {
  if (typeof input !== "object" || input === null) return { ...DEFAULT_PREFS };
  const o = input as Record<string, unknown>;
  const lead = o.reminderLeadMinutes;
  return {
    remindersEnabled: o.remindersEnabled === true,
    reminderLeadMinutes:
      typeof lead === "number" && Number.isInteger(lead) && lead >= MIN_LEAD_MINUTES && lead <= MAX_LEAD_MINUTES
        ? lead
        : DEFAULT_PREFS.reminderLeadMinutes,
    theme: parseThemePref(o.theme),
  };
}

export interface Persistence {
  loadState(): Promise<AppState>;
  saveState(s: AppState): Promise<boolean>;
  loadPrefs(): Promise<Prefs>;
  savePrefs(p: Prefs): Promise<boolean>;
  loadOnboardingDone(): Promise<boolean>;
  saveOnboardingDone(done: boolean): Promise<boolean>;
  clearAll(): Promise<void>;
}

export function createPersistence(storage: KeyValueStorage): Persistence {
  return {
    async loadState() {
      try {
        const raw = await storage.getItem(STATE_KEY);
        if (!raw) return emptyState();
        return parseState(JSON.parse(raw));
      } catch {
        return emptyState();
      }
    },
    async saveState(s) {
      try {
        await storage.setItem(STATE_KEY, exportState(s));
        return true;
      } catch {
        return false; // app keeps working in memory
      }
    },
    async loadPrefs() {
      try {
        const raw = await storage.getItem(PREFS_KEY);
        return raw ? parsePrefs(JSON.parse(raw)) : { ...DEFAULT_PREFS };
      } catch {
        return { ...DEFAULT_PREFS };
      }
    },
    async savePrefs(p) {
      try {
        await storage.setItem(PREFS_KEY, JSON.stringify(parsePrefs(p)));
        return true;
      } catch {
        return false;
      }
    },
    async loadOnboardingDone() {
      try {
        return (await storage.getItem(ONBOARDING_KEY)) === "done";
      } catch {
        return false;
      }
    },
    async saveOnboardingDone(done) {
      try {
        if (done) await storage.setItem(ONBOARDING_KEY, "done");
        else await storage.removeItem(ONBOARDING_KEY);
        return true;
      } catch {
        return false;
      }
    },
    async clearAll() {
      await storage.removeItem(STATE_KEY);
      await storage.removeItem(PREFS_KEY);
      await storage.removeItem(ONBOARDING_KEY);
    },
  };
}
