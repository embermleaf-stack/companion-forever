// SPDX-License-Identifier: GPL-3.0-only
import type { Cadence, ResetConfig } from "./types.js";

const DAY_MS = 86_400_000;
/** Completions this far ahead of `now` are treated as clock skew / a stale `now`; beyond it they are rejected. */
export const CLOCK_SKEW_TOLERANCE_MS = 5 * 60_000;

/** Most recent daily reset instant at or before `now`. */
export function lastDailyReset(now: Date, cfg: ResetConfig): Date {
  const t = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    cfg.dailyHourUtc,
    cfg.dailyMinuteUtc,
  );
  return new Date(t <= now.getTime() ? t : t - DAY_MS);
}

/** Most recent weekly reset instant at or before `now`. */
export function lastWeeklyReset(now: Date, cfg: ResetConfig): Date {
  const daily = lastDailyReset(now, cfg);
  const diff = (daily.getUTCDay() - cfg.weeklyDayUtc + 7) % 7;
  return new Date(daily.getTime() - diff * DAY_MS);
}

export function lastReset(cadence: Cadence, now: Date, cfg: ResetConfig): Date | null {
  if (cadence === "daily") return lastDailyReset(now, cfg);
  if (cadence === "weekly") return lastWeeklyReset(now, cfg);
  return null; // "once" never resets
}

export function nextReset(cadence: Cadence, now: Date, cfg: ResetConfig): Date | null {
  const last = lastReset(cadence, now, cfg);
  if (!last) return null;
  return new Date(last.getTime() + (cadence === "daily" ? 1 : 7) * DAY_MS);
}

/** A completion counts only if it happened since the most recent reset. */
export function isCompleteNow(
  completedAt: string | undefined,
  cadence: Cadence,
  now: Date,
  cfg: ResetConfig,
): boolean {
  if (!completedAt) return false;
  const t = Date.parse(completedAt);
  if (Number.isNaN(t) || t > now.getTime() + CLOCK_SKEW_TOLERANCE_MS) return false;
  const last = lastReset(cadence, now, cfg);
  return last === null ? true : t >= last.getTime();
}
