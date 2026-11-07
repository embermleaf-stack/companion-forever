// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import type { ResetConfig } from "@companion/core";
import { computeReminders } from "../src/reminders";

// Daily 15:00 UTC, weekly on Tuesday (2).
const cfg: ResetConfig = { dailyHourUtc: 15, dailyMinuteUtc: 0, weeklyDayUtc: 2 };
const iso = (d: Date) => d.toISOString();

describe("computeReminders", () => {
  it("fires lead minutes before the next daily reset", () => {
    // Mon 2026-11-09 10:00Z
    const r = computeReminders(cfg, new Date("2026-11-09T10:00:00Z"), { leadMinutes: 30, dailyCount: 1, weeklyCount: 0 });
    expect(r.map((x) => iso(x.at))).toEqual(["2026-11-09T14:30:00.000Z"]);
    expect(r[0]!.kind).toBe("daily");
    expect(iso(r[0]!.resetAt)).toBe("2026-11-09T15:00:00.000Z");
  });

  it("skips a reminder whose time already passed", () => {
    const r = computeReminders(cfg, new Date("2026-11-09T14:45:00Z"), { leadMinutes: 30, dailyCount: 2, weeklyCount: 0 });
    expect(r.map((x) => iso(x.at))).toEqual(["2026-11-10T14:30:00.000Z"]);
  });

  it("marks the weekly reset as weekly and dedupes the coinciding daily one", () => {
    // Tue 2026-11-10 15:00Z is the weekly reset.
    const r = computeReminders(cfg, new Date("2026-11-09T10:00:00Z"), { leadMinutes: 30, dailyCount: 3, weeklyCount: 1 });
    expect(r).toHaveLength(3);
    const tue = r.find((x) => iso(x.resetAt) === "2026-11-10T15:00:00.000Z");
    expect(tue?.kind).toBe("weekly");
  });

  it("returns sorted, strictly-future times and respects defaults", () => {
    const now = new Date("2026-11-09T10:00:00Z");
    const r = computeReminders(cfg, now, { leadMinutes: 60 });
    expect(r.length).toBeGreaterThan(0);
    for (let i = 0; i < r.length; i++) {
      expect(r[i]!.at.getTime()).toBeGreaterThan(now.getTime());
      if (i > 0) expect(r[i]!.at.getTime()).toBeGreaterThan(r[i - 1]!.at.getTime());
    }
    expect(r.filter((x) => x.kind === "weekly")).toHaveLength(2);
    expect(r).toHaveLength(8); // 7 daily slots + the second weekly reset beyond that window
  });
});
