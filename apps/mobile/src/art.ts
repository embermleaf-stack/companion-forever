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
    source: null,
    alt: "A feather quill with a broken nib lies by a spilled ink pot.",
    provisional: true,
    enabled: false,
    note: "Disabled: legible 'Error' text on the ink-pot label. Text-only error message is used.",
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
    alt: "Faint compass rose lines on aged parchment.",
    provisional: true,
    enabled: false,
    note: "Disabled: not seamless, contrast below 4.5:1 in places.",
  },
  {
    key: "textureDark",
    job: "ART-011",
    source: null,
    alt: "Faint compass rose lines on dark slate-blue paper.",
    provisional: true,
    enabled: false,
    note: "Disabled: not seamless, light scratches fail contrast.",
  },
  {
    key: "avatars",
    job: "ART-012",
    source: null,
    alt: "Sheet of hooded and helmed adventurer silhouettes.",
    provisional: true,
    enabled: false,
    note: "Disabled: eight figures instead of six, one horned. Characters show text only.",
  },
  {
    key: "resetTrail",
    job: "ART-015",
    source: require("../assets/art/art-015.jpg"),
    alt: "A winding dirt path crosses green meadow hills.",
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
] as const satisfies readonly ArtEntry[];

export type ArtKey = (typeof ART_ENTRIES)[number]["key"];

export const ART: Record<ArtKey, ArtEntry> = Object.fromEntries(ART_ENTRIES.map((e) => [e.key, e])) as Record<
  ArtKey,
  ArtEntry
>;

/** Returns the entry only when it is enabled and has pixels; otherwise null (caller shows text only). */
export function getArt(key: ArtKey): (ArtEntry & { source: ImageSourcePropType }) | null {
  const e = ART[key];
  return e.enabled && e.source !== null ? (e as ArtEntry & { source: ImageSourcePropType }) : null;
}
