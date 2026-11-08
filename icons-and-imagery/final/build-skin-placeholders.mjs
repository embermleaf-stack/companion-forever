// SPDX-License-Identifier: GPL-3.0-only
// PLACEHOLDER screen-skin art for apps/mobile (see icons-and-imagery/SCREEN-SKIN-SPEC.md). NOT final art.
// Generates SVG sources (skin-placeholder-*.svg here) and rasterizes PNGs to apps/mobile/assets/art/skin/.
// Usage: node build-skin-placeholders.mjs [dir-containing-node_modules/@resvg/resvg-js]
// The rasterizer is a build-time tool only (not an app dependency): `npm i @resvg/resvg-js` in a scratch dir.
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../../apps/mobile/assets/art/skin");
mkdirSync(out, { recursive: true });
const req = createRequire(resolve(process.argv[2] ?? here, "noop.js"));
const { Resvg } = req("@resvg/resvg-js");

// Palette matches apps/mobile/src/theme.ts (ink, slate, bronze, ember).
const INK = "#14171F";
const SLATE = "#1F2430";
const BRONZE = "#B58A4A";
const GOLD = "#F6D98A";
const EMBER = "#E0702B";

// Background 1080x2400 (9:20). Plain dark centre; detail only at corners/edges so any crop is safe.
const bg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400">
  <title>skin-placeholder-bg</title>
  <!-- PLACEHOLDER artwork, original, GPL-3.0-only. Not final art. -->
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1D2230"/><stop offset="0.5" stop-color="${INK}"/><stop offset="1" stop-color="#0D0F14"/>
    </linearGradient>
    <radialGradient id="e" cx="0.5" cy="0" r="0.8"><stop offset="0" stop-color="${EMBER}" stop-opacity="0.16"/><stop offset="1" stop-color="${EMBER}" stop-opacity="0"/></radialGradient>
    <pattern id="stripe" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="${EMBER}" fill-opacity="0.22"/>
    </pattern>
    <g id="corner">
      <path d="M0 0H260V28H28V260H0Z" fill="url(#stripe)"/>
      <path d="M40 40H210M40 40V210" stroke="${BRONZE}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="40" r="14" fill="${GOLD}" fill-opacity="0.7"/>
    </g>
  </defs>
  <rect width="1080" height="2400" fill="url(#g)"/>
  <rect width="1080" height="2400" fill="url(#e)"/>
  <use href="#corner"/>
  <use href="#corner" transform="translate(1080 0) scale(-1 1)"/>
  <use href="#corner" transform="translate(0 2400) scale(1 -1)"/>
  <use href="#corner" transform="translate(1080 2400) scale(-1 -1)"/>
</svg>
`;

// Frame 512x512, 96px slices. Edges are uniform along their length (stretch-safe); centre fully transparent.
const frame = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <title>skin-placeholder-frame</title>
  <!-- PLACEHOLDER artwork, original, GPL-3.0-only. Not final art. 9-slice, slices 96px. -->
  <rect x="14" y="14" width="484" height="484" rx="30" fill="none" stroke="${BRONZE}" stroke-width="8"/>
  <rect x="30" y="30" width="452" height="452" rx="20" fill="none" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="3"/>
  <g fill="${GOLD}" fill-opacity="0.9" stroke="${BRONZE}" stroke-width="3">
    <circle cx="48" cy="48" r="12"/><circle cx="464" cy="48" r="12"/><circle cx="48" cy="464" r="12"/><circle cx="464" cy="464" r="12"/>
  </g>
  <g stroke="${EMBER}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.8">
    <path d="M70 22H88M22 70V88M424 22H442M490 70V88M70 490H88M22 424V442M424 490H442M490 424V442"/>
  </g>
</svg>
`;

// Panel 192x192, 40px slices. Opaque-enough slate fill so text contrast matches the drawn Panel.
const panel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <title>skin-placeholder-panel</title>
  <!-- PLACEHOLDER artwork, original, GPL-3.0-only. Not final art. 9-slice, slices 40px. -->
  <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262C3B"/><stop offset="1" stop-color="${SLATE}"/></linearGradient></defs>
  <rect x="4" y="4" width="184" height="184" rx="26" fill="${BRONZE}"/>
  <rect x="10" y="10" width="172" height="172" rx="20" fill="url(#f)"/>
  <rect x="16" y="16" width="160" height="160" rx="15" fill="none" stroke="${GOLD}" stroke-opacity="0.3" stroke-width="2"/>
  <g fill="${GOLD}" fill-opacity="0.8"><circle cx="22" cy="22" r="4"/><circle cx="170" cy="22" r="4"/><circle cx="22" cy="170" r="4"/><circle cx="170" cy="170" r="4"/></g>
</svg>
`;

for (const [name, text, width] of [
  ["bg", bg, 1080],
  ["frame", frame, 512],
  ["panel", panel, 192],
]) {
  writeFileSync(resolve(here, `skin-placeholder-${name}.svg`), text);
  const png = new Resvg(text, { fitTo: { mode: "width", value: width } }).render().asPng();
  writeFileSync(resolve(out, `placeholder-${name}.png`), png);
  console.log(name, png.length, "bytes");
}
