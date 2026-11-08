// SPDX-License-Identifier: GPL-3.0-only
// Single registry for raster art on the About page. PROVISIONAL: owner approved 2026-11-07 for in-place review;
// tool unconfirmed, output license UNVERIFIED (icons-and-imagery/provenance.md). Set `enabled: false` to remove it;
// the page then falls back to the plain text header.
export interface WebArt {
  id: string;
  job: string;
  /** Path relative to the page (files live in public/art). */
  src: string;
  alt: string;
  provisional: true;
  enabled: boolean;
  width: number;
  height: number;
  note?: string;
}

export const ART: { hero: WebArt } = {
  hero: {
    id: "hero",
    job: "ART-013",
    src: "./art/art-013-hero.jpg",
    alt: "A golden-hour painting of a small stone watchtower on a distant hill above a winding path, seen past a ruined stone archway.",
    provisional: true,
    enabled: true,
    width: 1200,
    height: 450,
    note: "ART-013 v1 regen: 1792x672 original downscaled to 1200x450 (2400x900 not available).",
  },
};
