// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { DEFAULT_RESET_CONFIG, isCompleteNow, lastDailyReset, lastWeeklyReset, nextReset } from "../src/index.js";

const cfg = DEFAULT_RESET_CONFIG; // 15:00 UTC, weekly Tuesday (2)
const d = (s: string) => new Date(s);

describe("reset math", () => {
  it("daily: before reset time uses previous day", () => {
    expect(lastDailyReset(d("2026-11-07T14:59:00Z"), cfg).toISOString()).toBe("2026-11-06T15:00:00.000Z");
  });
  it("daily: at/after reset uses today", () => {
    expect(lastDailyReset(d("2026-11-07T15:00:00Z"), cfg).toISOString()).toBe("2026-11-07T15:00:00.000Z");
  });
  it("weekly: 2026-11-07 is Saturday; last Tuesday reset is 11-03", () => {
    expect(lastWeeklyReset(d("2026-11-07T10:00:00Z"), cfg).toISOString()).toBe("2026-11-03T15:00:00.000Z");
  });
  it("weekly: Tuesday before reset time uses previous Tuesday", () => {
    expect(lastWeeklyReset(d("2026-11-03T14:00:00Z"), cfg).toISOString()).toBe("2026-10-27T15:00:00.000Z");
  });
  it("next reset is one period after last", () => {
    expect(nextReset("daily", d("2026-11-07T10:00:00Z"), cfg)?.toISOString()).toBe("2026-11-07T15:00:00.000Z");
    expect(nextReset("weekly", d("2026-11-07T10:00:00Z"), cfg)?.toISOString()).toBe("2026-11-10T15:00:00.000Z");
    expect(nextReset("once", d("2026-11-07T10:00:00Z"), cfg)).toBeNull();
  });
  it("handles month/year boundaries", () => {
    expect(lastDailyReset(d("2027-01-01T01:00:00Z"), cfg).toISOString()).toBe("2026-12-31T15:00:00.000Z");
  });
  it("completion expires after reset", () => {
    const done = "2026-11-07T10:00:00Z";
    expect(isCompleteNow(done, "daily", d("2026-11-07T14:00:00Z"), cfg)).toBe(true);
    expect(isCompleteNow(done, "daily", d("2026-11-07T15:00:00Z"), cfg)).toBe(false);
  });
  it("once never expires; future/garbage timestamps are not complete", () => {
    expect(isCompleteNow("2020-01-01T00:00:00Z", "once", d("2026-11-07T00:00:00Z"), cfg)).toBe(true);
    expect(isCompleteNow("2030-01-01T00:00:00Z", "once", d("2026-11-07T00:00:00Z"), cfg)).toBe(false);
    expect(isCompleteNow("nope", "daily", d("2026-11-07T00:00:00Z"), cfg)).toBe(false);
    expect(isCompleteNow(undefined, "daily", d("2026-11-07T00:00:00Z"), cfg)).toBe(false);
  });
  it("toggle then render with the same instant shows done", () => {
    const at = d("2026-11-07T10:00:00Z");
    expect(isCompleteNow(at.toISOString(), "daily", at, cfg)).toBe(true);
  });
  it("stale 'now' one second earlier still shows done (clock-skew tolerance)", () => {
    const at = d("2026-11-07T10:00:00Z");
    expect(isCompleteNow(at.toISOString(), "daily", new Date(at.getTime() - 1000), cfg)).toBe(true);
    expect(isCompleteNow(at.toISOString(), "daily", new Date(at.getTime() - 4 * 60_000), cfg)).toBe(true);
    expect(isCompleteNow(at.toISOString(), "daily", new Date(at.getTime() - 6 * 60_000), cfg)).toBe(false);
  });
  it("a timestamp one day ahead is still not complete", () => {
    const now = d("2026-11-07T10:00:00Z");
    expect(isCompleteNow("2026-11-08T10:00:00Z", "daily", now, cfg)).toBe(false);
    expect(isCompleteNow("2026-11-08T10:00:00Z", "once", now, cfg)).toBe(false);
  });
});
