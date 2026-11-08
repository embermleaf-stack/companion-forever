// SPDX-License-Identifier: GPL-3.0-only
// Original, hand-authored checkbox and switch sprites for apps/mobile (ToggleBox / ToggleSwitch in src/ui.tsx).
// Generates SVG sources here (toggle-*.svg) and rasterizes to apps/mobile/assets/art/ui/ (1x/2x/3x).
// Usage: node build-toggle-sprites.mjs [dir-containing-node_modules/@resvg/resvg-js]   (build-time tool only)
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outPng = resolve(here, "../../apps/mobile/assets/art/ui");
mkdirSync(outPng, { recursive: true });
const req = createRequire(resolve(process.argv[2] ?? here, "noop.js"));
const { Resvg } = req("@resvg/resvg-js");

const head = (name, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <title>${name}</title>
  <!-- Original hand-authored artwork, GPL-3.0-only. -->
`;

function box(on) {
  const top = on ? "#6DB068" : "#2A3040";
  const bot = on ? "#3F7A3C" : "#1B202B";
  return (
    head(on ? "toggle-box-on" : "toggle-box-off", 32, 32) +
    `  <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs>
  <rect x="1" y="1" width="30" height="30" rx="7" fill="#B58A4A"/>
  <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" fill="url(#f)"/>
  <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="#F6D98A" stroke-opacity="0.35" stroke-width="0.8"/>
  <path d="M9 3.4H23" stroke="#F6D98A" stroke-opacity="0.7" stroke-width="1" stroke-linecap="round"/>
` +
    (on ? `  <path d="M9 16.5 14 21.5 23.5 10.5" fill="none" stroke="#FFF1C4" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>\n` : "") +
    `</svg>\n`
  );
}

function sw(on) {
  const top = on ? "#F2873F" : "#1B202B";
  const bot = on ? "#D2631F" : "#2A3040";
  const cx = on ? 40 : 16;
  const thumbTop = on ? "#FFF1C4" : "#D2AE72";
  const thumbBot = on ? "#F6D98A" : "#B58A4A";
  return (
    head(on ? "toggle-switch-on" : "toggle-switch-off", 56, 32) +
    `  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient>
    <linearGradient id="k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${thumbTop}"/><stop offset="1" stop-color="${thumbBot}"/></linearGradient>
  </defs>
  <rect x="1" y="3" width="54" height="26" rx="13" fill="#B58A4A"/>
  <rect x="2.5" y="4.5" width="51" height="23" rx="11.5" fill="url(#t)"/>
  <path d="M14 5.6H42" stroke="#F6D98A" stroke-opacity="0.5" stroke-width="0.9" stroke-linecap="round"/>
  <circle cx="${cx}" cy="16" r="11" fill="#14171F" fill-opacity="0.45"/>
  <circle cx="${cx}" cy="15.5" r="10" fill="url(#k)" stroke="#8A6630" stroke-width="1"/>
  <circle cx="${cx}" cy="15.5" r="6" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="0.8"/>
  <circle cx="${cx}" cy="15.5" r="2" fill="${on ? "#D2631F" : "#8A6630"}"/>
</svg>\n`
  );
}

const sprites = { "toggle-box-off": [box(false), 32], "toggle-box-on": [box(true), 32], "toggle-switch-off": [sw(false), 56], "toggle-switch-on": [sw(true), 56] };
for (const [name, [text, w]] of Object.entries(sprites)) {
  writeFileSync(resolve(here, `${name}.svg`), text);
  for (const [suffix, scale] of [["", 1], ["@2x", 2], ["@3x", 3]]) {
    const png = new Resvg(text, { fitTo: { mode: "width", value: w * scale } }).render().asPng();
    writeFileSync(resolve(outPng, `${name}${suffix}.png`), png);
  }
}
console.log("done", Object.keys(sprites).length, "sprites");
