// SPDX-License-Identifier: GPL-3.0-only
// Pure, immutable state transitions. No I/O.
import {
  ACCOUNT_SUBJECT,
  DEFAULT_RESET_CONFIG,
  completionKey,
  type Activity,
  type AppState,
  type Character,
  type ResetConfig,
} from "./types.js";
import { isCompleteNow, nextReset } from "./reset.js";

export function emptyState(): AppState {
  return { version: 1, characters: [], activities: [], completions: {}, resets: { ...DEFAULT_RESET_CONFIG } };
}

export type IdGen = () => string;

export const defaultIdGen: IdGen = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function addCharacter(s: AppState, c: Omit<Character, "id">, id: IdGen = defaultIdGen): AppState {
  const name = c.name.trim();
  if (!name) throw new Error("Character name is required");
  return { ...s, characters: [...s.characters, { ...c, name, id: id() }] };
}

export function removeCharacter(s: AppState, characterId: string): AppState {
  const completions = Object.fromEntries(
    Object.entries(s.completions).filter(([k]) => !k.endsWith(`::${characterId}`)),
  );
  return { ...s, characters: s.characters.filter((c) => c.id !== characterId), completions };
}

export function addActivity(s: AppState, a: Omit<Activity, "id">, id: IdGen = defaultIdGen): AppState {
  const title = a.title.trim();
  if (!title) throw new Error("Activity title is required");
  return { ...s, activities: [...s.activities, { ...a, title, id: id() }] };
}

export function removeActivity(s: AppState, activityId: string): AppState {
  const completions = Object.fromEntries(
    Object.entries(s.completions).filter(([k]) => !k.startsWith(`${activityId}::`)),
  );
  return { ...s, activities: s.activities.filter((a) => a.id !== activityId), completions };
}

export function setResetConfig(s: AppState, resets: ResetConfig): AppState {
  const { dailyHourUtc: h, dailyMinuteUtc: m, weeklyDayUtc: d } = resets;
  if (!Number.isInteger(h) || h < 0 || h > 23) throw new Error("dailyHourUtc must be 0-23");
  if (!Number.isInteger(m) || m < 0 || m > 59) throw new Error("dailyMinuteUtc must be 0-59");
  if (!Number.isInteger(d) || d < 0 || d > 6) throw new Error("weeklyDayUtc must be 0-6");
  return { ...s, resets: { ...resets } };
}

export function isDone(s: AppState, activity: Activity, subjectId: string, now: Date): boolean {
  return isCompleteNow(s.completions[completionKey(activity.id, subjectId)], activity.cadence, now, s.resets);
}

export function toggleDone(s: AppState, activityId: string, subjectId: string, now: Date): AppState {
  const activity = s.activities.find((a) => a.id === activityId);
  if (!activity) throw new Error(`Unknown activity ${activityId}`);
  const key = completionKey(activityId, subjectId);
  const completions = { ...s.completions };
  if (isDone(s, activity, subjectId, now)) delete completions[key];
  else completions[key] = now.toISOString();
  return { ...s, completions };
}

export interface TaskRow {
  activity: Activity;
  subjectId: string;
  subjectName: string;
  done: boolean;
  resetsAt: Date | null;
}

/** Flatten activities x characters into checklist rows. */
export function buildChecklist(s: AppState, now: Date): TaskRow[] {
  const rows: TaskRow[] = [];
  for (const activity of s.activities) {
    const resetsAt = nextReset(activity.cadence, now, s.resets);
    if (activity.scope === "account") {
      rows.push({ activity, subjectId: ACCOUNT_SUBJECT, subjectName: "Account", done: isDone(s, activity, ACCOUNT_SUBJECT, now), resetsAt });
    } else {
      for (const c of s.characters) {
        rows.push({ activity, subjectId: c.id, subjectName: c.name, done: isDone(s, activity, c.id, now), resetsAt });
      }
    }
  }
  return rows;
}

export function progress(rows: TaskRow[]): { done: number; total: number } {
  return { done: rows.filter((r) => r.done).length, total: rows.length };
}
