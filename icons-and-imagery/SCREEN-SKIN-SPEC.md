<!-- SPDX-License-Identifier: GPL-3.0-only -->
# Screen skin spec (full-screen painted sprites)

What an artist or image AI must deliver so a screen can be drawn from painted art instead of the app's drawn UI. The mechanism is in `apps/mobile/src/skin.ts` (registry), `skinLayout.ts` (pure math, unit-tested) and `ui.tsx` (`ScreenBackground`, `ScreenFrame`, `Panel`). With no skin enabled the app looks exactly as before.

Hard rules (same as `AGENTS.md`): original art only; no Blizzard or other protected content; **no text, numbers or logos baked into any image** (all text, buttons and checkboxes stay native for accessibility and 44dp targets); nothing that implies affiliation with Blizzard. Every file is logged in `provenance.md` (tool, prompt, license status) and stays `provisional: true` until the owner approves it.

## 1. Deliverables

| File (in `apps/mobile/assets/art/skin/`) | Size | Purpose |
|---|---|---|
| `bg-<screen>.png` | **1080 x 2400** (9:20 portrait) | Full-screen background. One per screen (`checklist`, `characters`, `activities`, `settings`, `about`, `onboarding`) or one shared file. |
| `frame-<screen>.png` | **512 x 512**, 9-slice, **96 px** slices | Optional ornamental border drawn over the content window. One shared frame is fine. |
| `panel.png` | **192 x 192**, 9-slice, **40 px** slices | Shared panel (cards, rows, settings groups). |
| `divider.png` (reserved) | 512 x 16 | Not wired yet. |

Format: PNG, 24-bit colour + 8-bit alpha (RGBA, sRGB, no interlace, no embedded colour profile needed). Backgrounds may be opaque (alpha 255 everywhere). **Max about 400 KB per file**; quantise or run through oxipng/pngquant if larger (a smooth 1080x2400 gradient is about 140 KB). Provide a 3x master only; the app scales down, no @2x/@3x siblings are needed for skins.

Naming: lowercase, hyphens, no spaces; `bg-checklist.png`, `frame-default.png`, `panel.png`.

## 2. Backgrounds (1080 x 2400)

The app fits the image with *cover* (fills the screen, crops overflow, never letterboxes), anchored at `background.anchor` (default centre). Real devices range from 16:9 (360x640) through 9:20 (360x800, 1080x2400@3x) to 9:21; the image must survive all of them.

Safe-zone diagram (described in text, 1080 wide x 2400 tall, origin top-left):

```
+--------------------------------------------------+  y=0
|  EDGE BAND  (decor allowed)            100 px     |
|  +--------------------------------------------+  |  y=100
|  |                                            |  |
|  |   CENTRE ZONE: calm, low-contrast, flat    |  |
|  |   colour or very soft texture ONLY.        |  |
|  |   x = 120 .. 960, y = 360 .. 2040          |  |
|  |   Text and cards sit here.                 |  |
|  |                                            |  |
|  +--------------------------------------------+  |  y=2300
|  EDGE BAND                                       |
+--------------------------------------------------+  y=2400
 x=0  (corners: 300x300 px decorative blocks)    x=1080
```

- Cropping: on 16:9 the top and bottom lose up to about 160 px each (visible area is 1080 x 1920 of the 2400); on 9:21 the sides lose up to about 40 px each. Treat the outer **160 px top/bottom and 60 px left/right** as "may be cropped": nothing essential (a character's face, a key prop) there.
- Decorative detail (vines, brackets, lantern glow, torches) only in the **corners (about 300 x 300 px)** and the thin **edge bands**. The centre zone is flat or a very soft vertical gradient so any aspect ratio crops cleanly and text stays readable.
- Contrast: body text is `#EFE6D2`-ish on the background; any pixel under text must keep at least **4.5:1** contrast with it (so keep the centre zone dark, luminance below about 12%). No busy texture, no high-contrast shapes behind the list area.
- Status bar (top ~72 px) and gesture bar (bottom ~72 px) overlay the art; do not put important detail there.
- The header and tab bar are drawn by the app over the top ~220 px; the disclaimer line over the bottom ~100 px. Plan for a quiet band there.
- Opaque, full bleed, no transparent edges, no baked border (the frame is separate).

## 3. Frame 9-slice (512 x 512, slices 96 px)

- Corners are the four 96 x 96 squares; they are drawn at `cap` dp (placeholder: 22 dp, i.e. scaled 22/96) and never stretched.
- Edge slices (96 px wide strips between the corners) are **stretched along their length**, so they must be uniform along that axis: no motif that would visibly stretch; repeat-free lines, solid colour, or a smooth gradient only. Put ornaments in the corners.
- The 320 x 320 centre is stretched in both axes and must be **fully transparent** (alpha 0) so content shows through.
- Transparency: the frame overlays the content, so only the border pixels have alpha > 0. Keep the border's visual thickness within about 40 px of the edge (it is drawn at `clearance` dp; content is laid out inside `clearance`, placeholder 10 dp).
- Slice seams: the app overlaps adjacent pieces by 1 px, but avoid anti-aliased hairlines exactly on the 96 px boundaries.

## 4. Panel 9-slice (192 x 192, slices 40 px)

- Corners 40 x 40 (drawn at `cap` dp, placeholder 14 dp). Edges 112 px strips stretched along their length. Centre 112 x 112 stretched in both axes: flat or a vertical-only gradient.
- The fill should be opaque enough (alpha >= 0.9) that text keeps **4.5:1** contrast whatever the background shows through; match the theme surface `#1F2430`.
- Transparent outside the rounded border so the background shows in the corners.

## 5. Wiring a delivered skin

1. Copy the files into `apps/mobile/assets/art/skin/` (keep names above).
2. In `apps/mobile/src/skin.ts` point `source` at the new files (for example change `PH_BG`'s `require(...)`), set `provisional: true`, `placeholder: false`, and set `enabled: true` for each screen (and for `PANEL_SKIN`). Adjust `contentInsets` (fractions of the content window below the header/tabs: `top/right/bottom/left`), `frame.cap` (dp drawn for the corner), `frame.clearance` (dp content keeps clear of the border), `background.anchor` (which part survives cropping: `{x:0.5,y:0}` keeps the top).
3. Log each file in `icons-and-imagery/provenance.md` (job `SKIN-<screen>`), and add alt text there (the images are hidden from screen readers).
4. Verify: `npm run typecheck`, `npx vitest run`, then a build and screenshots at 360x640, 360x800 and 412x915 (check the crop, text contrast and that nothing under the tab bar or content looks cut).
5. To switch off: set `enabled: false`; the drawn UI returns with no other change.

Preview of the pipeline without real art: build with `EXPO_PUBLIC_SKIN_DEMO=1`; this force-enables only entries marked `placeholder: true`.

## 6. Placeholder assets in the repo

`placeholder-bg.png`, `placeholder-frame.png`, `placeholder-panel.png` are generated by `icons-and-imagery/final/build-skin-placeholders.mjs` (SVG sources `skin-placeholder-*.svg`). They exist only to prove the pipeline. They are **not final art**, disabled by default, and must be replaced before any release that enables skins.
