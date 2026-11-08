// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { DARK, LIGHT, PALETTES, parseThemePref, resolveTheme, type Palette } from "../src/theme";

describe("resolveTheme", () => {
  it("explicit choice wins over the system", () => {
    expect(resolveTheme("light", "dark")).toBe("light");
    expect(resolveTheme("dark", "light")).toBe("dark");
  });
  it("auto follows the system, unknown falls back to dark", () => {
    expect(resolveTheme("auto", "light")).toBe("light");
    expect(resolveTheme("auto", "dark")).toBe("dark");
    expect(resolveTheme("auto", null)).toBe("dark");
    expect(resolveTheme("auto", undefined)).toBe("dark");
  });
  it("parseThemePref validates", () => {
    expect(parseThemePref("light")).toBe("light");
    expect(parseThemePref("nope")).toBe("auto");
    expect(parseThemePref(undefined)).toBe("auto");
  });
});

type RGB = [number, number, number];
function parse(c: string): { rgb: RGB; a: number } {
  const m = /^rgba\((\d+),(\d+),(\d+),([\d.]+)\)$/.exec(c);
  if (m) return { rgb: [Number(m[1]), Number(m[2]), Number(m[3])], a: Number(m[4]) };
  const h = c.replace("#", "");
  return { rgb: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB, a: 1 };
}
function over(fg: string, bg: string): RGB {
  const f = parse(fg);
  const b = parse(bg).rgb;
  return f.rgb.map((v, i) => Math.round(v * f.a + b[i]! * (1 - f.a))) as RGB;
}
const lin = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (c: RGB) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
export function ratio(a: RGB, b: RGB) {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** [name, fg token, bg token(s) composited bottom-to-top, minimum]. Text 4.5, UI borders/fills 3. */
function pairs(p: Palette): [string, string, string[], number][] {
  return [
    ["text on surface", p.text, [p.surface], 4.5],
    ["textDim on surface", p.textDim, [p.surface], 4.5],
    ["heading on surface", p.highlight, [p.surface], 4.5],
    ["text on bg", p.text, [p.bg], 4.5],
    ["accent on surface", p.accent, [p.surface], 3],
    ["ok (progress/border) on surface", p.ok, [p.surface], 3],
    ["border on surface", p.border, [p.surface], 3],
    ["placeholder on surface", p.placeholder, [p.surface], 4.5],
    ["footer text on footer chip over bg", p.footText, [p.bg, p.footPainted], 4.5],
    ["strip text on strip overlay (over white worst case)", p.stripText, ["#FFFFFF", p.stripOverlay], 4.5],
    ["primary label on ember sprite end (#D2631F/#E7873F)", p.btnPrimaryFg, [LIGHT === p ? "#E7873F" : "#D2631F"], 4.5],
  ];
}

describe("palette contrast", () => {
  for (const [name, p] of Object.entries(PALETTES)) {
    it(`${name}: all pairs meet WCAG`, () => {
      const rows: string[] = [];
      for (const [label, fg, bgs, min] of pairs(p)) {
        const bg = bgs.reduce<RGB>((acc, layer) => over(layer, "#" + acc.map((v) => v.toString(16).padStart(2, "0")).join("")), parse(bgs[0]!).rgb);
        const fgc = over(fg, "#" + bg.map((v) => v.toString(16).padStart(2, "0")).join(""));
        const r = ratio(fgc, bg);
        rows.push(`${name}\t${label}\t${r.toFixed(2)}\t>=${min}`);
        expect(r, label).toBeGreaterThanOrEqual(min);
      }
      if (process.env.PRINT_CONTRAST) console.log(rows.join("\n"));
    });
  }
  it("palettes are distinct", () => {
    expect(DARK.surface).not.toBe(LIGHT.surface);
  });
});
