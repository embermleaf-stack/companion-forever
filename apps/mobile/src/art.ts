// SPDX-License-Identifier: GPL-3.0-only
// Single registry for ALL raster art shown in the app.
//
// Every entry is PROVISIONAL: owner approved on 2026-11-07 for in-place review only. The generator tool is
// unconfirmed and the output license is UNVERIFIED (see icons-and-imagery/provenance.md). To remove or swap
// a piece of art, change `enabled` or `source` here; nothing else in the app references art files directly.
// A disabled entry has `source: null`, ships no pixels, and the UI falls back to text only.
import type { ImageSourcePropType } from "react-native";

export interface ArtEntry {
  /** Registry key. */
  key: string;
  /** Source job id from icons-and-imagery/art-queue.md. */
  job: string;
  /** Bundled asset (require) or null when disabled. */
  source: ImageSourcePropType | null;
  /** Alt text (from provenance.md). */
  alt: string;
  provisional: true;
  enabled: boolean;
  /** Why it is disabled, when it is. */
  note?: string;
}

const ART_ENTRIES = [
  {
    key: "emptyCharacters",
    job: "ART-002",
    source: require("../assets/art/art-002.png"),
    alt: "An empty brown leather satchel hangs from a wooden post beside a feather quill and a glowing lantern.",
    provisional: true,
    enabled: true,
  },
  {
    key: "emptyActivities",
    job: "ART-003",
    source: require("../assets/art/art-003.png"),
    alt: "A blank parchment scroll unrolls beside a weathered lantern.",
    provisional: true,
    enabled: true,
  },
  {
    key: "checklistDone",
    job: "ART-004",
    source: require("../assets/art/art-004.png"),
    alt: "A red fox sleeps curled beside a banked ember fire with a wisp of smoke.",
    provisional: true,
    enabled: true,
  },
  {
    key: "errorGeneric",
    job: "ART-005",
    // 960x720 JPEG (v3 fountain pen, cropped 4:3; no legible text). Shown beside the message line when a state change throws.
    source: require("../assets/art/art-005.jpg"),
    alt: "A feather pen with a broken nib and ink splatter on paper",
    provisional: true,
    enabled: true,
  },
  {
    key: "offline",
    job: "ART-006",
    source: null,
    alt: "A lantern glows on a grassy hill at dusk beside a wooden signpost.",
    provisional: true,
    enabled: false,
    note: "Not shipped: the app makes no network calls and has no connectivity check, so there is no offline state to show.",
  },
  {
    key: "onboard1",
    job: "ART-007",
    source: require("../assets/art/art-007.jpg"),
    alt: "An open handwritten ledger with a quill and a lit lantern on a wooden desk.",
    provisional: true,
    enabled: true,
  },
  {
    key: "onboard2",
    job: "ART-008",
    source: require("../assets/art/art-008.jpg"),
    alt: "An hourglass with amber sand stands beside an open ledger in warm light.",
    provisional: true,
    enabled: true,
  },
  {
    key: "onboard3",
    job: "ART-009",
    source: require("../assets/art/art-009.jpg"),
    alt: "A leaf-carved bronze and green lockbox with a heart-shaped padlock sits on a wooden shelf.",
    provisional: true,
    enabled: true,
  },
  {
    key: "textureLight",
    job: "ART-010",
    source: null,
    alt: "Soft mottled aged-parchment texture.",
    provisional: true,
    enabled: false,
    note: "Seamless at the tile edges, but the app is dark-themed and has no light surface to put it on; a cream texture would fail contrast with the light text. Not shipped.",
  },
  {
    key: "textureDark",
    job: "ART-011",
    // 512x512 wrap-aware downscale of the 1024 tile; drawn repeated at TEXTURE_DARK_OPACITY under all content.
    source: require("../assets/art/texture-dark.jpg"),
    alt: "Soft mottled dark slate-blue paper texture.",
    provisional: true,
    enabled: true,
    note: "Decoration only, opacity 0.08 (worst-case text contrast 11.0:1 for body text, 4.67:1 for ember).",
  },
  {
    key: "avatar1",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-1.png"),
    alt: "Hooded figure in a long cloak, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "avatar2",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-2.png"),
    alt: "Round-headed figure in a scarf and cloak, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "avatar3",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-3.png"),
    alt: "Hooded traveler holding a tall staff, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "avatar4",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-4.png"),
    alt: "Short-haired child in a cape, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "avatar5",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-5.png"),
    alt: "Hooded figure with a satchel strap, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "avatar6",
    job: "ART-012",
    source: require("../assets/art/avatars/avatar-6.png"),
    alt: "Figure carrying a lantern, drawn as a dark silhouette.",
    provisional: true,
    enabled: true,
  },
  {
    key: "resetTrail",
    job: "ART-015",
    // 1200x240 (5:1) JPEG; darkened by an overlay in ResetStrip.tsx for text contrast.
    source: require("../assets/art/art-015.jpg"),
    alt: "A winding pale dirt path crosses green and golden meadow hills under a soft sky.",
    provisional: true,
    enabled: true,
  },
  {
    key: "aboutHero",
    job: "ART-013",
    // 1200x450 (8:3) JPEG shown above the About panel.
    source: require("../assets/art/art-013-hero.jpg"),
    alt: "A golden-hour painting of a small stone watchtower on a distant hill above a winding path, seen past a ruined stone archway.",
    provisional: true,
    enabled: true,
  },
  {
    key: "resetLantern",
    job: "ART-016",
    // 120x120 with an @2x (240x240) sibling; Metro picks the right density.
    source: require("../assets/art/art-016-reset-lantern.png"),
    alt: "A weathered iron lantern with a flickering flame.",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnPrimary",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-primary.svg
    source: require("../assets/art/ui/btn-primary.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnPrimaryPressed",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-primary-pressed.svg
    source: require("../assets/art/ui/btn-primary-pressed.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnSecondary",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-secondary.svg
    source: require("../assets/art/ui/btn-secondary.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnSecondaryPressed",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-secondary-pressed.svg
    source: require("../assets/art/ui/btn-secondary-pressed.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnDanger",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-danger.svg
    source: require("../assets/art/ui/btn-danger.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnDangerPressed",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-danger-pressed.svg
    source: require("../assets/art/ui/btn-danger-pressed.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "btnDisabled",
    job: "UI-BTN",
    // 48x48 9-slice (14px caps) with @2x/@3x siblings; original SVG in icons-and-imagery/final/btn-disabled.svg
    source: require("../assets/art/ui/btn-disabled.png"),
    alt: "Button frame",
    provisional: true,
    enabled: true,
  },
  {
    key: "toggleBoxOff",
    job: "UI-TOGGLE",
    // 32x32 with @2x/@3x siblings; original SVG in icons-and-imagery/final/toggle-box-off.svg
    source: require("../assets/art/ui/toggle-box-off.png"),
    alt: "Toggle graphic",
    provisional: true,
    enabled: true,
  },
  {
    key: "toggleBoxOn",
    job: "UI-TOGGLE",
    // 32x32 with @2x/@3x siblings; original SVG in icons-and-imagery/final/toggle-box-on.svg
    source: require("../assets/art/ui/toggle-box-on.png"),
    alt: "Toggle graphic",
    provisional: true,
    enabled: true,
  },
  {
    key: "toggleSwitchOff",
    job: "UI-TOGGLE",
    // 56x32 with @2x/@3x siblings; original SVG in icons-and-imagery/final/toggle-switch-off.svg
    source: require("../assets/art/ui/toggle-switch-off.png"),
    alt: "Toggle graphic",
    provisional: true,
    enabled: true,
  },
  {
    key: "toggleSwitchOn",
    job: "UI-TOGGLE",
    // 56x32 with @2x/@3x siblings; original SVG in icons-and-imagery/final/toggle-switch-on.svg
    source: require("../assets/art/ui/toggle-switch-on.png"),
    alt: "Toggle graphic",
    provisional: true,
    enabled: true,
  },
] as const satisfies readonly ArtEntry[];

export type ArtKey = (typeof ART_ENTRIES)[number]["key"];

export const ART: Record<ArtKey, ArtEntry> = Object.fromEntries(ART_ENTRIES.map((e) => [e.key, e])) as Record<
  ArtKey,
  ArtEntry
>;

/** Opacity of the dark texture drawn under all content (contrast verified at this value; see provenance.md). */
export const TEXTURE_DARK_OPACITY = 0.08;

const AVATAR_KEYS = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"] as const satisfies readonly ArtKey[];

/** Stable avatar for a character: FNV-1a hash of its id (falling back to name) picks one of the six avatars. */
export function avatarKeyFor(seed: string): ArtKey {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return AVATAR_KEYS[h % AVATAR_KEYS.length]!;
}

/** Returns the entry only when it is enabled and has pixels; otherwise null (caller shows text only). */
export function getArt(key: ArtKey): (ArtEntry & { source: ImageSourcePropType }) | null {
  const e = ART[key];
  return e.enabled && e.source !== null ? (e as ArtEntry & { source: ImageSourcePropType }) : null;
}
