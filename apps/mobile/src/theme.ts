// SPDX-License-Identifier: GPL-3.0-only
// Theme tokens. The ONLY place colour literals live (besides the sprite build scripts in icons-and-imagery/final).
// Dark ("night") palette from icons-and-imagery/STYLE-GUIDE.md ("Emberleaf"); light ("day") is a parchment variant.
// Contrast of every text/background pair is asserted in test/theme.test.ts (WCAG 4.5:1 text, 3:1 UI borders).

export type ThemeMode = "light" | "dark";
/** User choice. "auto" follows the phone's system setting. */
export type ThemePref = "auto" | "light" | "dark";

export const THEME_PREFS: readonly ThemePref[] = ["auto", "light", "dark"];
export const DEFAULT_THEME_PREF: ThemePref = "auto";

/** Validate a stored value; anything unknown becomes "auto". */
export function parseThemePref(input: unknown): ThemePref {
  return input === "light" || input === "dark" || input === "auto" ? input : DEFAULT_THEME_PREF;
}

/** Pure resolution: an explicit choice wins; "auto" follows the system scheme (unknown/null -> dark, the original look). */
export function resolveTheme(pref: ThemePref, system: string | null | undefined): ThemeMode {
  if (pref === "light" || pref === "dark") return pref;
  return system === "light" ? "light" : "dark";
}

export interface Palette {
  /** Base behind everything (visible only while loading or when art is off). */
  bg: string;
  /** Panel / input fill. */
  surface: string;
  text: string;
  /** Secondary text (solid or alpha). */
  textDim: string;
  accent: string;
  ok: string;
  border: string;
  /** Headings. */
  highlight: string;
  teal: string;
  danger: string;
  onAccent: string;
  placeholder: string;
  /** Button label colours (see sprites in art.ts). */
  btnPrimaryFg: string;
  btnSecondaryFg: string;
  btnDangerFg: string;
  btnDisabledFg: string;
  /** Header / tab bar backing over painted art, and over the drawn fallback background. */
  barPainted: string;
  barPlain: string;
  /** Footer disclaimer backing over painted art, its text colour. */
  footPainted: string;
  footText: string;
  /** Backing chip for text sitting directly on painted art. */
  chip: string;
  /** Reset-strip photo overlay and its text (strip is always a darkened photo). */
  stripOverlay: string;
  stripText: string;
  /** Panel decoration. */
  panelSheen: string;
  ornament: string;
  /** Drawn-background glow/vignette: "r,g,b" and max alphas. */
  glowRgb: string;
  vignetteRgb: string;
  glowAlpha: number;
  vignetteAlpha: number;
  /** Opacity of the dark paper texture (0 = none). */
  textureOpacity: number;
  /** Status bar icon style. */
  statusBar: "light" | "dark";
}

export const DARK: Palette = {
  bg: "#14171F", // Ink Night
  surface: "#1F2430", // Slate Ledger
  text: "#E8DCC0", // Old Vellum
  textDim: "rgba(232,220,192,0.8)",
  accent: "#E0702B", // Ember
  ok: "#5E9E5A", // Leaf
  border: "#B58A4A", // Aged Bronze
  highlight: "#F6D98A", // Candle
  teal: "#2E5E6B", // Dusk Teal
  danger: "#B5432F", // Rust
  onAccent: "#14171F",
  placeholder: "#B58A4A",
  btnPrimaryFg: "#14171F",
  btnSecondaryFg: "#E8DCC0",
  btnDangerFg: "#E8DCC0",
  btnDisabledFg: "#B3AA92",
  barPainted: "rgba(31,36,48,0.75)",
  barPlain: "rgba(31,36,48,0.6)",
  footPainted: "rgba(31,36,48,0.8)",
  footText: "rgba(232,220,192,0.85)",
  chip: "rgba(31,36,48,0.8)",
  stripOverlay: "rgba(20,23,31,0.78)",
  stripText: "#E8DCC0",
  panelSheen: "rgba(246,217,138,0.18)",
  ornament: "#F6D98A",
  glowRgb: "224,112,43",
  vignetteRgb: "0,0,0",
  glowAlpha: 0.06,
  vignetteAlpha: 0.2,
  textureOpacity: 0.08,
  statusBar: "light",
};

export const LIGHT: Palette = {
  bg: "#EADFC0",
  surface: "#F6EDD3",
  text: "#1E1D26",
  textDim: "#46434D",
  accent: "#B8531A",
  ok: "#3F7A3C",
  border: "#8A6630",
  highlight: "#7A3510",
  teal: "#2E5E6B",
  danger: "#8E2F1F",
  onAccent: "#14171F",
  placeholder: "#6E5426",
  btnPrimaryFg: "#14171F",
  btnSecondaryFg: "#1E1D26",
  btnDangerFg: "#4A150C",
  btnDisabledFg: "#55503F",
  barPainted: "rgba(246,237,211,0.9)",
  barPlain: "rgba(246,237,211,0.75)",
  footPainted: "rgba(246,237,211,0.9)",
  footText: "#1E1D26",
  chip: "rgba(246,237,211,0.9)",
  stripOverlay: "rgba(20,23,31,0.78)",
  stripText: "#E8DCC0",
  panelSheen: "rgba(255,255,255,0.55)",
  ornament: "#8A6630",
  glowRgb: "224,112,43",
  vignetteRgb: "0,0,0",
  glowAlpha: 0.1,
  vignetteAlpha: 0.06,
  textureOpacity: 0,
  statusBar: "dark",
};

export const PALETTES: Record<ThemeMode, Palette> = { dark: DARK, light: LIGHT };

/** Minimum touch target in dp. */
export const TOUCH = 48;
