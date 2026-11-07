// SPDX-License-Identifier: GPL-3.0-only

export type Cadence = "daily" | "weekly" | "once";
export type Scope = "character" | "account";

/** User-entered character record. Contains no provider/Blizzard data. */
export interface Character {
  id: string;
  name: string;
  realm?: string;
  className?: string;
  level?: number;
  notes?: string;
}

/** A user-defined (or rights-cleared template) recurring activity. */
export interface Activity {
  id: string;
  title: string;
  cadence: Cadence;
  scope: Scope;
  notes?: string;
}

/**
 * Reset schedule. These values are USER-CONFIGURED. The defaults are
 * placeholders, not claims about any game's actual reset times.
 */
export interface ResetConfig {
  dailyHourUtc: number; // 0-23
  dailyMinuteUtc: number; // 0-59
  weeklyDayUtc: number; // 0 = Sunday .. 6 = Saturday
}

export const DEFAULT_RESET_CONFIG: ResetConfig = {
  dailyHourUtc: 15,
  dailyMinuteUtc: 0,
  weeklyDayUtc: 2,
};

/** completion key -> ISO timestamp of completion */
export type Completions = Record<string, string>;

export interface AppState {
  version: 1;
  characters: Character[];
  activities: Activity[];
  completions: Completions;
  resets: ResetConfig;
}

export const ACCOUNT_SUBJECT = "account";

export function completionKey(activityId: string, subjectId: string): string {
  return `${activityId}::${subjectId}`;
}
