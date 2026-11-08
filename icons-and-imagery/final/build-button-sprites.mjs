// SPDX-License-Identifier: GPL-3.0-only
// Original, hand-authored 9-slice button sprites for apps/mobile (GameButton). Generates the SVG sources in this
// folder (btn-*.svg) and rasterizes them to apps/mobile/assets/art/ui/btn-*.png (1x/2x/3x).
// Usage: node build-button-sprites.mjs [path-to-node_modules-containing-@resvg/resvg-js]
// The rasterizer is a build-time tool only (not an app dependency): `npm i @resvg/resvg-js` in a scratch dir.
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outPng = resolve(here, "../../apps/mobile/assets/art/ui");
mkdirSync(outPng, { recursive: true });
const req = createRequire(resolve(process.argv[2] ?? here, "noop.js"));
const { Resvg } = req("@resvg/resvg-js");

const S = 48; // logical size; 9-slice caps are 14 on every side (see apps/mobile/src/ui.tsx GameButton)

// Fill gradients are vertical so stretching the center slice horizontally/vertically stays seamless.
const sprites = {
  "btn-primary": { top: "#F2873F", bot: "#D2631F", frame: "#B58A4A", hi: "#F6D98A", glow: "#FFC98A", glowOp: 0.35, stud: "#F6D98A" },
  "btn-primary-pressed": { top: "#F7A15F", bot: "#EE8442", frame: "#F6D98A", hi: "#FFF1C4", glow: "#FFFFFF", glowOp: 0.25, stud: "#FFF1C4", inset: true },
  "btn-secondary": { top: "#2A3040", bot: "#1B202B", frame: "#B58A4A", hi: "#D2AE72", glow: "#F6D98A", glowOp: 0.1, stud: "#D2AE72" },
  "btn-secondary-pressed": { top: "#3A4258", bot: "#2D3446", frame: "#F6D98A", hi: "#F6D98A", glow: "#F6D98A", glowOp: 0.18, stud: "#F6D98A", inset: true },
  "btn-danger": { top: "#A8412E", bot: "#7E2A1B", frame: "#B58A4A", hi: "#D49A6A", glow: "#E08B6B", glowOp: 0.25, stud: "#E8C08A" },
  "btn-danger-pressed": { top: "#6A2316", bot: "#5A1C10", frame: "#D49A6A", hi: "#E8C08A", glow: "#000000", glowOp: 0.0, stud: "#E8C08A", inset: true },
  "btn-disabled": { top: "#2B303B", bot: "#242934", frame: "#5E5A52", hi: "#6E695E", glow: "#FFFFFF", glowOp: 0, stud: "#6E695E" },
};

function svg(name, p) {
  const studs = [[7, 7], [41, 7], [7, 41], [41, 41]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${p.stud}"/><circle cx="${x - 0.4}" cy="${y - 0.4}" r="0.6" fill="#FFFFFF" fill-opacity="0.5"/>`)
    .join("");
  const inset = p.inset
    ? `<rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="none" stroke="#000000" stroke-opacity="0.35" stroke-width="2"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <title>${name}</title>
  <!-- Original hand-authored artwork, GPL-3.0-only. 9-slice: 14px caps. -->
  <defs>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.top}"/><stop offset="1" stop-color="${p.bot}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.glow}" stop-opacity="${p.glowOp}"/><stop offset="0.5" stop-color="${p.glow}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="46" height="46" rx="10" fill="${p.frame}"/>
  <rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="url(#fill)"/>
  <rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="url(#glow)"/>
  <path d="M12 3.4H36" stroke="${p.hi}" stroke-opacity="0.8" stroke-width="1" stroke-linecap="round"/>
  <rect x="4.5" y="4.5" width="39" height="39" rx="6.5" fill="none" stroke="${p.hi}" stroke-opacity="0.35" stroke-width="0.8"/>
  <path d="M12 44.6H36" stroke="#000000" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
  ${inset}${studs}
</svg>
`;
}

for (const [name, p] of Object.entries(sprites)) {
  const text = svg(name, p);
  writeFileSync(resolve(here, `${name}.svg`), text);
  for (const [suffix, scale] of [["", 1], ["@2x", 2], ["@3x", 3]]) {
    const png = new Resvg(text, { fitTo: { mode: "width", value: S * scale } }).render().asPng();
    writeFileSync(resolve(outPng, `${name}${suffix}.png`), png);
  }
}
console.log("done", Object.keys(sprites).length, "sprites");
