// SPDX-License-Identifier: GPL-3.0-only
// Strict parsing of untrusted JSON (imports, localStorage). Unknown fields are dropped.
import { DEFAULT_RESET_CONFIG, type Activity, type AppState, type Character, type ResetConfig } from "./types.js";

const MAX_ITEMS = 1000;
const MAX_STR = 500;

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function str(v: unknown, field: string, required = true): string | undefined {
  if (v === undefined || v === null) {
    if (required) throw new Error(`${field} is required`);
    return undefined;
  }
  if (typeof v !== "string") throw new Error(`${field} must be a string`);
  if (v.length > MAX_STR) throw new Error(`${field} too long`);
  return v;
}

function parseCharacter(v: unknown): Character {
  if (!isObj(v)) throw new Error("character must be an object");
  const c: Character = { id: str(v.id, "character.id")!, name: str(v.name, "character.name")! };
  const realm = str(v.realm, "realm", false);
  const className = str(v.className, "className", false);
  const notes = str(v.notes, "notes", false);
  if (realm !== undefined) c.realm = realm;
  if (className !== undefined) c.className = className;
  if (notes !== undefined) c.notes = notes;
  if (v.level !== undefined) {
    if (typeof v.level !== "number" || !Number.isInteger(v.level) || v.level < 1 || v.level > 1000)
      throw new Error("level must be a positive integer");
    c.level = v.level;
  }
  return c;
}

function parseActivity(v: unknown): Activity {
  if (!isObj(v)) throw new Error("activity must be an object");
  const cadence = v.cadence;
  const scope = v.scope;
  if (cadence !== "daily" && cadence !== "weekly" && cadence !== "once") throw new Error("invalid cadence");
  if (scope !== "character" && scope !== "account") throw new Error("invalid scope");
  const a: Activity = { id: str(v.id, "activity.id")!, title: str(v.title, "activity.title")!, cadence, scope };
  const notes = str(v.notes, "notes", false);
  if (notes !== undefined) a.notes = notes;
  return a;
}

function parseResets(v: unknown): ResetConfig {
  if (v === undefined) return { ...DEFAULT_RESET_CONFIG };
  if (!isObj(v)) throw new Error("resets must be an object");
  const num = (x: unknown, lo: number, hi: number, f: string) => {
    if (typeof x !== "number" || !Number.isInteger(x) || x < lo || x > hi) throw new Error(`${f} out of range`);
    return x;
  };
  return {
    dailyHourUtc: num(v.dailyHourUtc, 0, 23, "dailyHourUtc"),
    dailyMinuteUtc: num(v.dailyMinuteUtc, 0, 59, "dailyMinuteUtc"),
    weeklyDayUtc: num(v.weeklyDayUtc, 0, 6, "weeklyDayUtc"),
  };
}

export function parseState(input: unknown): AppState {
  if (!isObj(input)) throw new Error("state must be an object");
  if (input.version !== 1) throw new Error("unsupported state version");
  const chars = input.characters ?? [];
  const acts = input.activities ?? [];
  if (!Array.isArray(chars) || !Array.isArray(acts)) throw new Error("characters/activities must be arrays");
  if (chars.length > MAX_ITEMS || acts.length > MAX_ITEMS) throw new Error("too many items");
  const completions: Record<string, string> = {};
  if (input.completions !== undefined) {
    if (!isObj(input.completions)) throw new Error("completions must be an object");
    for (const [k, val] of Object.entries(input.completions)) {
      if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
      if (typeof val !== "string" || Number.isNaN(Date.parse(val))) throw new Error("invalid completion timestamp");
      completions[k] = val;
    }
  }
  return {
    version: 1,
    characters: chars.map(parseCharacter),
    activities: acts.map(parseActivity),
    completions,
    resets: parseResets(input.resets),
  };
}

export function exportState(s: AppState): string {
  return JSON.stringify(s, null, 2);
}

export function importState(json: string): AppState {
  return parseState(JSON.parse(json));
}
