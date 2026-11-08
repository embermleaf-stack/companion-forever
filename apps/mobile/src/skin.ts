// SPDX-License-Identifier: GPL-3.0-only
// Registry of full-screen painted skins. Same conventions as art.ts: job id, alt text, provisional, enabled flag.
// DEFAULT: nothing is enabled, so the app renders its drawn UI (Background + Panel). To use real art, drop the
// files into assets/art/skin/ (see icons-and-imagery/SCREEN-SKIN-SPEC.md), point `source` at them and set
// `enabled: true`. Text and controls always stay native; skins never contain text.
// EXPO_PUBLIC_SKIN_DEMO=1 (build time) force-enables entries marked `placeholder: true`, for screenshots only.
import type { ImageSourcePropType } from "react-native";
import type { Insets } from "./skinLayout";

declare const process: { env: Record<string, string | undefined> };

export type ScreenId = "checklist" | "characters" | "activities" | "settings" | "about" | "onboarding";

export interface SkinImage {
  source: ImageSourcePropType;
  /** Pixel size of the source file. */
  width: number;
  height: number;
}

export interface NineSliceSkin extends SkinImage {
  /** Source cap thickness in source pixels (same on all four sides). */
  slice: number;
  /** Cap thickness to draw, in dp. */
  cap: number;
  /** dp from the box edge that content must stay clear of (the painted border's visual thickness). Default: cap. */
  clearance?: number;
}

export interface SkinBase {
  job: string;
  /** Decorative; alt text is for the art log only (the images are hidden from accessibility). */
  alt: string;
  provisional: true;
  /** True for generated stand-ins that must never ship as final art. */
  placeholder: boolean;
  enabled: boolean;
  note?: string;
}

export interface ScreenSkinDef extends SkinBase {
  /** Cover-fitted full-screen background. `anchor` picks which part survives cropping (0..1 per axis). */
  background: SkinImage & { anchor: { x: number; y: number } };
  /** Optional ornamental frame drawn over the content window (9-slice). */
  frame?: NineSliceSkin;
  /** Content window as fractions of the content area (below header/tabs, above disclaimer). */
  contentInsets: Insets;
}

export interface PanelSkinDef extends SkinBase {
  image: NineSliceSkin;
  /** Minimum inner padding in dp so text clears the painted border (the panel's own padding is kept if larger). */
  padding: number;
}

export interface DividerSkinDef extends SkinBase {
  image: SkinImage | null;
}

const DEMO = process.env.EXPO_PUBLIC_SKIN_DEMO === "1";

const PH_BG: SkinImage = { source: require("../assets/art/skin/placeholder-bg.png"), width: 1080, height: 2400 };
const PH_FRAME: NineSliceSkin = { source: require("../assets/art/skin/placeholder-frame.png"), width: 512, height: 512, slice: 96, cap: 22, clearance: 10 };
const PH_PANEL: NineSliceSkin = { source: require("../assets/art/skin/placeholder-panel.png"), width: 192, height: 192, slice: 40, cap: 14, clearance: 6 };

function placeholderScreen(id: ScreenId): ScreenSkinDef {
  return {
    job: `SKIN-${id}`,
    alt: "Placeholder dark ink background with bronze corner brackets and an ornamental border (not final art).",
    provisional: true,
    placeholder: true,
    enabled: false,
    background: { ...PH_BG, anchor: { x: 0.5, y: 0.5 } },
    frame: PH_FRAME,
    contentInsets: { top: 0.005, right: 0.01, bottom: 0.005, left: 0.01 },
    note: "Generated stand-in; replace with real art per SCREEN-SKIN-SPEC.md.",
  };
}

export const SCREEN_SKINS: Record<ScreenId, ScreenSkinDef> = {
  checklist: placeholderScreen("checklist"),
  characters: placeholderScreen("characters"),
  activities: placeholderScreen("activities"),
  settings: placeholderScreen("settings"),
  about: placeholderScreen("about"),
  onboarding: placeholderScreen("onboarding"),
};

export const PANEL_SKIN: PanelSkinDef = {
  job: "SKIN-panel",
  alt: "Placeholder slate panel with bronze border (not final art).",
  provisional: true,
  placeholder: true,
  enabled: false,
  image: PH_PANEL,
  padding: 12,
};

export const DIVIDER_SKIN: DividerSkinDef = {
  job: "SKIN-divider",
  alt: "Divider line.",
  provisional: true,
  placeholder: false,
  enabled: false,
  image: null,
  note: "Reserved; no divider art yet.",
};

const on = (s: SkinBase) => s.enabled || (DEMO && s.placeholder);

/** Skin for a screen, or null when disabled (caller renders the drawn UI). */
export function getScreenSkin(id: ScreenId): ScreenSkinDef | null {
  const s = SCREEN_SKINS[id];
  return on(s) ? s : null;
}

/** Panel sprite skin, or null when disabled. */
export function getPanelSkin(): PanelSkinDef | null {
  return on(PANEL_SKIN) ? PANEL_SKIN : null;
}
