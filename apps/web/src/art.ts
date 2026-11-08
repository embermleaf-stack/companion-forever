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
    alt: "A painted view through an arched window: tall summer clouds over green meadow, a winding path, a small stone watchtower, and a lantern on the sill.",
    provisional: true,
    enabled: true,
    width: 1024,
    height: 384,
    note: "Temporary 1024x384 crop of a square source; low resolution for wide screens. Regenerate at 2400x900.",
  },
};
