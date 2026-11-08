// SPDX-License-Identifier: GPL-3.0-only
// Original, hand-authored LIGHT ("day") parchment variants of the button, checkbox and switch sprites
// (apps/mobile GameButton / ToggleBoxGraphic / ToggleSwitch). Same geometry and 9-slice caps as the dark set
// (build-button-sprites.mjs, build-toggle-sprites.mjs). Writes *-light.svg here and *-light[@2x|@3x].png to
// apps/mobile/assets/art/ui/. Usage: node build-light-sprites.mjs [dir-containing-node_modules/@resvg/resvg-js]
// The rasterizer is a build-time tool only (not an app dependency).
import { writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outPng = resolve(here, "../../apps/mobile/assets/art/ui");
mkdirSync(outPng, { recursive: true });
const req = createRequire(resolve(process.argv[2] ?? here, "noop.js"));
const { Resvg } = req("@resvg/resvg-js");

const S = 48;
const btns = {
  "btn-primary-light": { top: "#F6A765", bot: "#E7873F", frame: "#7A5A28", hi: "#FFF1C4", glow: "#FFFFFF", glowOp: 0.3, stud: "#FFF1C4" },
  "btn-primary-pressed-light": { top: "#E98A45", bot: "#D2631F", frame: "#5E4318", hi: "#FFD9A8", glow: "#FFFFFF", glowOp: 0.1, stud: "#FFD9A8", inset: true },
  "btn-secondary-light": { top: "#FBF4DF", bot: "#EADFC0", frame: "#8A6630", hi: "#FFFFFF", glow: "#FFFFFF", glowOp: 0.4, stud: "#8A6630" },
  "btn-secondary-pressed-light": { top: "#E3D5AE", bot: "#D6C698", frame: "#5E4318", hi: "#F6EDD3", glow: "#FFFFFF", glowOp: 0.1, stud: "#5E4318", inset: true },
  "btn-danger-light": { top: "#EFC2B4", bot: "#E0A18D", frame: "#8E2F1F", hi: "#FFF1EA", glow: "#FFFFFF", glowOp: 0.3, stud: "#8E2F1F" },
  "btn-danger-pressed-light": { top: "#D98E78", bot: "#CC7C65", frame: "#5A1C10", hi: "#F3C9BA", glow: "#FFFFFF", glowOp: 0.05, stud: "#5A1C10", inset: true },
  "btn-disabled-light": { top: "#DDD3BC", bot: "#D2C8B0", frame: "#A39A82", hi: "#EFE6CF", glow: "#FFFFFF", glowOp: 0, stud: "#A39A82" },
};

function btn(name, p) {
  const studs = [[7, 7], [41, 7], [7, 41], [41, 41]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="${p.stud}"/><circle cx="${x - 0.4}" cy="${y - 0.4}" r="0.6" fill="#FFFFFF" fill-opacity="0.6"/>`)
    .join("");
  const inset = p.inset ? `<rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="none" stroke="#000000" stroke-opacity="0.3" stroke-width="2"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <title>${name}</title>
  <!-- Original hand-authored artwork, GPL-3.0-only. 9-slice: 14px caps. -->
  <defs>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.top}"/><stop offset="1" stop-color="${p.bot}"/></linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.glow}" stop-opacity="${p.glowOp}"/><stop offset="0.5" stop-color="${p.glow}" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="1" y="1" width="46" height="46" rx="10" fill="${p.frame}"/>
  <rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="url(#fill)"/>
  <rect x="2.5" y="2.5" width="43" height="43" rx="8.5" fill="url(#glow)"/>
  <path d="M12 3.4H36" stroke="${p.hi}" stroke-opacity="0.9" stroke-width="1" stroke-linecap="round"/>
  <rect x="4.5" y="4.5" width="39" height="39" rx="6.5" fill="none" stroke="${p.hi}" stroke-opacity="0.45" stroke-width="0.8"/>
  <path d="M12 44.6H36" stroke="#000000" stroke-opacity="0.25" stroke-width="1" stroke-linecap="round"/>
  ${inset}${studs}
</svg>
`;
}

const head = (name, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <title>${name}</title>
  <!-- Original hand-authored artwork, GPL-3.0-only. -->
`;

function box(on) {
  const top = on ? "#5E9E5A" : "#FBF4DF";
  const bot = on ? "#3F7A3C" : "#EADFC0";
  return (
    head(on ? "toggle-box-on-light" : "toggle-box-off-light", 32, 32) +
    `  <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs>
  <rect x="1" y="1" width="30" height="30" rx="7" fill="#7A5A28"/>
  <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" fill="url(#f)"/>
  <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.8"/>
` +
    (on ? `  <path d="M9 16.5 14 21.5 23.5 10.5" fill="none" stroke="#FFF8E0" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>\n` : "") +
    `</svg>\n`
  );
}

function sw(on) {
  const top = on ? "#F6A765" : "#D6C698";
  const bot = on ? "#E7873F" : "#E3D5AE";
  const cx = on ? 40 : 16;
  return (
    head(on ? "toggle-switch-on-light" : "toggle-switch-off-light", 56, 32) +
    `  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient>
    <linearGradient id="k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EADFC0"/></linearGradient>
  </defs>
  <rect x="1" y="3" width="54" height="26" rx="13" fill="#7A5A28"/>
  <rect x="2.5" y="4.5" width="51" height="23" rx="11.5" fill="url(#t)"/>
  <circle cx="${cx}" cy="16" r="11" fill="#000000" fill-opacity="0.25"/>
  <circle cx="${cx}" cy="15.5" r="10" fill="url(#k)" stroke="#7A5A28" stroke-width="1"/>
  <circle cx="${cx}" cy="15.5" r="6" fill="none" stroke="#7A5A28" stroke-opacity="0.35" stroke-width="0.8"/>
  <circle cx="${cx}" cy="15.5" r="2" fill="${on ? "#D2631F" : "#7A5A28"}"/>
</svg>\n`
  );
}

const out = [];
for (const [n, p] of Object.entries(btns)) out.push([n, btn(n, p), S]);
out.push(["toggle-box-off-light", box(false), 32], ["toggle-box-on-light", box(true), 32], ["toggle-switch-off-light", sw(false), 56], ["toggle-switch-on-light", sw(true), 56]);
for (const [name, text, w] of out) {
  writeFileSync(resolve(here, `${name}.svg`), text);
  for (const [suffix, scale] of [["", 1], ["@2x", 2], ["@3x", 3]]) {
    writeFileSync(resolve(outPng, `${name}${suffix}.png`), new Resvg(text, { fitTo: { mode: "width", value: w * scale } }).render().asPng());
  }
}
console.log("done", out.length, "sprites");
