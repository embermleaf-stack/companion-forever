// SPDX-License-Identifier: GPL-3.0-only
export function formatRemaining(target: Date | null, now: Date): string {
  if (!target) return "Never resets";
  const ms = Math.max(0, target.getTime() - now.getTime());
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 48) return `Resets in ${Math.floor(h / 24)}d ${h % 24}h`;
  return `Resets in ${h}h ${m}m`;
}

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const DISCLAIMER =
  "Independent fan-made tool. Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment.";
