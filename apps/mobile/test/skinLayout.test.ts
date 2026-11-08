// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { computeContentRect, computeCoverRect, computeNineSlice } from "../src/skinLayout";

const insets = { top: 0.05, right: 0.06, bottom: 0.04, left: 0.06 };
// [w, h] in dp. 1080x2400 @3x = 360x800.
const SIZES: [number, number][] = [
  [360, 640],
  [411, 891],
  [412, 915],
  [360, 800],
  [1080 / 3, 2400 / 3],
];

describe("computeContentRect", () => {
  it.each(SIZES)("fits inside %ix%i with fractional insets", (w, h) => {
    const r = computeContentRect(w, h, insets);
    expect(r.x).toBeCloseTo(w * 0.06);
    expect(r.y).toBeCloseTo(h * 0.05);
    expect(r.x + r.w).toBeCloseTo(w * 0.94);
    expect(r.y + r.h).toBeCloseTo(h * 0.96);
  });
  it("clamps to the safe area (status bar 24, gesture bar 20)", () => {
    const r = computeContentRect(360, 640, { top: 0, right: 0, bottom: 0, left: 0 }, { top: 24, right: 0, bottom: 20, left: 0 });
    expect(r).toEqual({ x: 0, y: 24, w: 360, h: 596 });
  });
  it("never goes negative", () => {
    const r = computeContentRect(100, 100, { top: 0.9, right: 0.9, bottom: 0.9, left: 0.9 });
    expect(r.w).toBe(0);
    expect(r.h).toBe(0);
  });
});

describe("computeCoverRect", () => {
  it.each(SIZES)("covers %ix%i with the 1080x2400 background and no gaps", (w, h) => {
    const r = computeCoverRect(1080, 2400, w, h);
    expect(r.w).toBeGreaterThanOrEqual(w - 1e-6);
    expect(r.h).toBeGreaterThanOrEqual(h - 1e-6);
    expect(r.x).toBeLessThanOrEqual(1e-6);
    expect(r.y).toBeLessThanOrEqual(1e-6);
    expect(r.x + r.w).toBeGreaterThanOrEqual(w - 1e-6);
    expect(r.y + r.h).toBeGreaterThanOrEqual(h - 1e-6);
    expect(r.w / r.h).toBeCloseTo(1080 / 2400);
  });
  it("360x640 (9:16, wider than 9:20) crops vertically only", () => {
    const r = computeCoverRect(1080, 2400, 360, 640);
    expect(r.w).toBeCloseTo(360);
    expect(r.x).toBeCloseTo(0);
    expect(r.h).toBeCloseTo(800);
    expect(r.y).toBeCloseTo(-80);
  });
  it("anchor top keeps the top edge; bottom keeps the bottom edge", () => {
    expect(computeCoverRect(1080, 2400, 360, 640, { x: 0.5, y: 0 }).y).toBeCloseTo(0);
    const b = computeCoverRect(1080, 2400, 360, 640, { x: 0.5, y: 1 });
    expect(b.y + b.h).toBeCloseTo(640);
  });
  it("a screen taller than 9:20 (9:21) crops horizontally", () => {
    const r = computeCoverRect(1080, 2400, 360, 840);
    expect(r.h).toBeCloseTo(840);
    expect(r.w).toBeGreaterThan(360);
    expect(r.x).toBeLessThan(0);
  });
});

describe("computeNineSlice", () => {
  it("returns nothing when the box is smaller than two caps", () => {
    expect(computeNineSlice(30, 100, 512, 512, 96, 16)).toEqual([]);
    expect(computeNineSlice(100, 20, 512, 512, 96, 16)).toEqual([]);
  });
  it.each(SIZES)("frame 512/96 at %ix%i: 9 pieces tile the box with 1px overlaps", (w, h) => {
    const cap = 24;
    const p = computeNineSlice(w, h, 512, 512, 96, cap);
    expect(p).toHaveLength(9);
    expect(p[0]!.dest).toEqual({ x: 0, y: 0, w: cap + 1, h: cap + 1 });
    expect(p[8]!.dest).toEqual({ x: w - cap, y: h - cap, w: cap, h: cap });
    expect(Math.max(...p.map((q) => q.dest.x + q.dest.w))).toBeCloseTo(w);
    expect(Math.max(...p.map((q) => q.dest.y + q.dest.h))).toBeCloseTo(h);
    // corner source (96px) is drawn at cap dp, so the whole image is scaled by cap/slice
    expect(p[0]!.image.w).toBeCloseTo(512 * (cap / 96));
    expect(p[0]!.image.x).toBeCloseTo(0);
  });
  it("panel 192/40 at 328x120 with cap 14: center stretches, corners keep scale", () => {
    const p = computeNineSlice(328, 120, 192, 192, 40, 14);
    expect(p).toHaveLength(9);
    expect(p[4]!.image.w).toBeCloseTo(192 * (300 / 112));
    expect(p[0]!.image.w).toBeCloseTo(192 * (14 / 40));
  });
  it("reproduces the existing 48px button layout (cap 14, slice 14)", () => {
    const p = computeNineSlice(200, 48, 48, 48, 14, 14);
    expect(p[0]!.image).toEqual({ x: -0, y: -0, w: 48, h: 48 });
    expect(p[1]!.dest).toEqual({ x: 14, y: 0, w: 172 + 1, h: 15 });
    expect(p[1]!.image.w).toBeCloseTo(48 * (172 / 20));
  });
});

describe("SKIN-002 characters background (1080x2400, anchor y 0.5)", () => {
  it.each([[360, 640], [360, 800], [411, 891], [412, 915], [360, 840]] as [number, number][])("keeps at least 80%% of the height visible at %ix%i", (w, h) => {
    const r = computeCoverRect(1080, 2400, w, h, { x: 0.5, y: 0.5 });
    const visibleH = Math.min(h, r.h) / r.h;
    expect(r.y).toBeLessThanOrEqual(0);
    expect(visibleH).toBeGreaterThanOrEqual(0.8);
    // top and bottom crops are equal, so lantern and campfire lose the same amount
    expect(-r.y).toBeCloseTo(r.h - h + r.y);
  });
});
