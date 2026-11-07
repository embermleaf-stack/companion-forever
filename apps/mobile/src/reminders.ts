// SPDX-License-Identifier: GPL-3.0-only
// Pure reminder-time computation. No I/O, no React Native imports.
import { nextReset, type ResetConfig } from "@companion/core";

const DAY_MS = 86_400_000;

export interface Reminder {
  /** When the local notification should fire. */
  at: Date;
  /** The reset instant this reminder warns about. */
  resetAt: Date;
  /** "weekly" wins when a weekly reset coincides with a daily one. */
  kind: "daily" | "weekly";
}

export interface ReminderOptions {
  leadMinutes: number;
  /** How many upcoming daily resets to cover (default 7). */
  dailyCount?: number;
  /** How many upcoming weekly resets to cover (default 2). */
  weeklyCount?: number;
}

/**
 * Upcoming reminder times, sorted ascending, all strictly after `now`.
 * Reminders whose fire time has already passed are skipped.
 */
export function computeReminders(cfg: ResetConfig, now: Date, opts: ReminderOptions): Reminder[] {
  const lead = opts.leadMinutes * 60_000;
  const dailyCount = opts.dailyCount ?? 7;
  const weeklyCount = opts.weeklyCount ?? 2;
  const byReset = new Map<number, Reminder>();

  const firstDaily = nextReset("daily", now, cfg);
  const firstWeekly = nextReset("weekly", now, cfg);
  if (firstDaily) {
    for (let i = 0; i < dailyCount; i++) {
      const resetAt = new Date(firstDaily.getTime() + i * DAY_MS);
      byReset.set(resetAt.getTime(), { at: new Date(resetAt.getTime() - lead), resetAt, kind: "daily" });
    }
  }
  if (firstWeekly) {
    for (let i = 0; i < weeklyCount; i++) {
      const resetAt = new Date(firstWeekly.getTime() + i * 7 * DAY_MS);
      byReset.set(resetAt.getTime(), { at: new Date(resetAt.getTime() - lead), resetAt, kind: "weekly" });
    }
  }
  return [...byReset.values()]
    .filter((r) => r.at.getTime() > now.getTime())
    .sort((a, b) => a.at.getTime() - b.at.getTime());
}

export function reminderText(r: Reminder, leadMinutes: number): { title: string; body: string } {
  const what = r.kind === "weekly" ? "Weekly reset" : "Daily reset";
  return {
    title: `${what} soon`,
    body: `Your ${r.kind} reset (as you configured it) is in about ${leadMinutes} minutes.`,
  };
}
