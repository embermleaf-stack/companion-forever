# Screen skin brief: full-screen backgrounds and 9-slice frames (optional)

Status: proposed, 2026-11-08. Docs only. No art has been generated for this brief. Not a legal clearance: the output terms and ownership of any generator are UNVERIFIED (see "Tool terms" below).

Owner direction (2026-11-08): a prettier, full-sprite look for the app: painted full-screen backgrounds per screen, ornate frames, panels and a divider. Pastoral hand-painted anime-fantasy, watercolor and gouache, warm lantern light. Palette is Emberleaf from [STYLE-GUIDE.md](STYLE-GUIDE.md).

Technical asset specs (slice insets, final file names, registry keys, rasterization) live in [SCREEN-SKIN-SPEC.md](SCREEN-SKIN-SPEC.md), which is written separately. Where a size here and a size there disagree, the spec is the technical source and this brief must be corrected to match. Always supply [STYLE-GUIDE.md](STYLE-GUIDE.md) with each prompt.

Job ids are SKIN-001 to SKIN-008 (one per item below). Queue entries live in [art-queue.md](art-queue.md) and copy-paste prompts in [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008). Related optional kit: [UI-KIT-BRIEF.md](UI-KIT-BRIEF.md).

## Why this exists, and the fallback

The app already runs with drawn UI and hand-authored sprites, so nothing below is required.

- With no skin file present, every screen uses its existing drawn UI. The app must work with no skin art at all.
- A skin is added by placing the file and pointing its registry entry at it (`apps/mobile/src/art.ts`, and `apps/web/src/art.ts` where relevant). Keep alt text. To revert, set the entry's `enabled` flag to `false` or delete the file reference.
- If a generated result fails the checklist below, do not use it. Keep the drawn UI.

## Screen map

| Job | Item | Size (px) | Purpose |
|---|---|---|---|
| SKIN-001 | Checklist background | 1080 x 2400 | Full-screen portrait background behind the checklist |
| SKIN-002 | Characters background | 1080 x 2400 | Full-screen portrait background behind Characters |
| SKIN-003 | Activities background | 1080 x 2400 | Full-screen portrait background behind Activities |
| SKIN-004 | Settings background | 1080 x 2400 | Full-screen portrait background behind Settings |
| SKIN-005 | About background | 1080 x 2400 | Full-screen portrait background behind About |
| SKIN-006 | Ornate frame, 9-slice | 512 x 512 | Frame for hero cards and screen headers; 96 px slices |
| SKIN-007 | Panel, 9-slice | 192 x 192 | Card and panel surround; 40 px slices |
| SKIN-008 | Divider rule | 1024 x 48 | Section separator; horizontal stretch |

All sizes are the exact export sizes. "9-slice" means the image is split into nine regions: the corners stay fixed, the edges stretch or repeat, and the centre stays as it is. The 9:20 portrait size is the reference phone aspect; the painted detail must survive cropping to 16:9 through 21:9.

## Shared rules

- **Shared negative prompt** (paste into the separate negative field, or append as `Avoid: ...` if the tool has none). It is also in [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008):

  `text, letters, logo, watermark, signature, UI buttons, figures in focus areas, faces, photorealistic, 3d render, glossy highlights, lens flare, glowing drop shadow, flaming border, dragon-scale border, brand name, named artist, film still, recognizable character, existing game character, game or studio trade dress`

  "Low contrast" is deliberately left out. The backgrounds need a dark, calm centre, and that is written into each prompt instead.
- **Style:** pastoral hand-painted anime-fantasy look, watercolor and gouache, clean expressive ink linework, soft colour fills, warm lantern light from the upper left. No gloss, no glow halos, no 3D, no lens flare.
- **Palette (Emberleaf):** ink `#14171F`, slate `#1F2430`, vellum `#E8DCC0`, ember `#E0702B`, leaf `#5E9E5A`, bronze `#B58A4A`, candle `#F6D98A`.
- **Focus areas stay empty:** the centre of every background has no figures, no buttons, no text and no focal object. Painted detail lives at the edges, corners and top or bottom bands.
- **Names:** never name an artist, studio, film or game in a prompt, filename or note. Describe the look only.
- **Original design only.** Reject anything that resembles an existing game's screen, frame, ornament, UI, logo or characters, including any Blizzard or World of Warcraft imagery or trade dress. When in doubt, regenerate or drop it.
- **No baked-in text.** Titles and labels are drawn by the app, never by the image.
- **Grids are a request, not a guarantee.** Generators do not honour pixel sizes. Generate at any size, then crop, resize and slice to the exact sizes above.
- **Staging only.** Outputs go to `icons-and-imagery/staging/` with the job id in the name (for example `SKIN-001_checklist_v1.png`). Nothing moves to `final/` or `apps/*` without a provenance entry and owner approval.

## Items

### SKIN-001: Checklist full-screen background

- **Purpose:** the full-screen background behind the checklist screen. Text sits on the calm centre.
- **Output:** `skin-checklist-bg.png` (suggested name; final name per the spec), 1080 x 2400 px, opaque, 9:20 portrait. Painted detail only at the edges, corners and top and bottom bands.
- **Prompt:** copy the `SKIN-001` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:**
  - [ ] Centre is a large, calm, dark, low-contrast slate wash with no focal object
  - [ ] Body text `#E8DCC0` on the centre reaches at least 4.5:1 (see "Contrast" below)
  - [ ] Edges and bands carry the painted detail; corners are not cluttered
  - [ ] Detail survives a crop to 16:9 through 21:9 (check by cropping, not by eye)
  - [ ] No figures in the centre area; no text, letters or logo anywhere

### SKIN-002: Characters full-screen background

- **Purpose:** background behind the Characters screen. A different scene from SKIN-001 so screens are recognisable.
- **Output:** `skin-characters-bg.png` (suggested name), 1080 x 2400 px, opaque, 9:20 portrait. Campfire and cottage window glow at the corners.
- **Prompt:** copy the `SKIN-002` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** all SKIN-001 checks; the warm glow sits in the corners and does not spill into the centre; the scene is clearly different from SKIN-001.

### SKIN-003: Activities full-screen background

- **Purpose:** background behind Activities. Trail and lantern posts run along the edges.
- **Output:** `skin-activities-bg.png` (suggested name), 1080 x 2400 px, opaque, 9:20 portrait.
- **Prompt:** copy the `SKIN-003` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** all SKIN-001 checks; posts and footpath stay on the left and right edges, not across the centre.

### SKIN-004: Settings full-screen background

- **Purpose:** background behind Settings. Workshop shelf and brass tools at the edges.
- **Output:** `skin-settings-bg.png` (suggested name), 1080 x 2400 px, opaque, 9:20 portrait.
- **Prompt:** copy the `SKIN-004` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** all SKIN-001 checks; the shelf and tools stay on the edges; the toggles and rows in the centre stay readable.

### SKIN-005: About full-screen background

- **Purpose:** background behind About. A hilltop tower vista fills the top band; the rest is calm.
- **Output:** `skin-about-bg.png` (suggested name), 1080 x 2400 px, opaque, 9:20 portrait.
- **Prompt:** copy the `SKIN-005` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** all SKIN-001 checks; the vista stays in the top band; below it the image fades to a calm slate wash.

### SKIN-006: Ornate frame, 9-slice

- **Purpose:** frame for hero cards and screen headers. The centre is transparent so content sits inside.
- **Output:** `skin-frame-9slice.png` (suggested name), 512 x 512 px, transparent. Bronze, vine and leaf ornaments in the four corners. Slice with 96 px on every side (the spec states the exact insets). The straight edges repeat or stretch.
- **Prompt:** copy the `SKIN-006` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:**
  - [ ] Centre (the region left after the 96 px slices) is fully transparent and empty
  - [ ] Left and right edges are identical mirror images; top and bottom edges likewise
  - [ ] Each straight edge tiles or stretches with no visible seam (offset test, see Post-processing)
  - [ ] Corner ornaments are symmetric and fit inside the 96 px corner regions
  - [ ] No flame, dragon-scale border, glow or gloss

### SKIN-007: Panel, 9-slice

- **Purpose:** card and panel surround, used under content blocks.
- **Output:** `skin-panel-9slice.png` (suggested name), 192 x 192 px, transparent centre. Slice with 40 px on every side (the spec states the exact insets), leaving a 112 x 112 px flat centre.
- **Prompt:** copy the `SKIN-007` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** all SKIN-006 frame checks, scaled to the 40 px slices; the panel reads at phone scale without the ornaments turning to mush.

### SKIN-008: Divider rule

- **Purpose:** section separator in lists and on About.
- **Output:** `skin-divider.png` (suggested name), 1024 x 48 px, transparent. Horizontal stretch: end caps fixed, the centre column repeats across the width. The leaf sprig sits at the exact centre. End-cap width is set in the spec.
- **Prompt:** copy the `SKIN-008` block from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008).
- **Acceptance:** perfectly symmetric left to right; one row only; the centre column repeats with no seam; nothing else on the canvas.

## Contrast

Body text is Old Vellum `#E8DCC0`. Measured against the centre of each background, it must reach at least 4.5:1 (WCAG 2.x relative-luminance formula).

- The vellum text has relative luminance about 0.72. For 4.5:1 the centre must have relative luminance of about 0.12 or less.
- Hand-calculated (not run in a tool): Ink Night `#14171F` gives about 13.2:1; Slate Ledger `#1F2430` about 11.4:1. Both pass with room to spare.
- Check the real output: sample the centre region of each finished background and compute the ratio. Record the result in the provenance entry. A background that fails is rejected, not darkened by hand without re-checking.

## Post-processing (all items)

Firefly connector capabilities are limited: it can crop, resize, expand and adjust existing images, and remove a background. It cannot generate images from text. Generation must be done by the owner in an external tool (the Firefly web app, another tool with an API, or a human illustrator). Before any connector call, run `adobe_mandatory_init` as the connector instructions require.

1. Crop to the exact size (1080 x 2400, 512 x 512, 192 x 192, 1024 x 48). Scale down with Lanczos or bicubic.
2. For backgrounds (SKIN-001 to SKIN-005): check the centre for contrast (see "Contrast") and check the crops to 16:9 and 21:9 keep the painted detail.
3. For 9-slice items (SKIN-006, SKIN-007) and the divider (SKIN-008): remove any background that is not transparent, check for halo fringing, and check the insets match the spec.
4. Seam test for SKIN-006, SKIN-007 edges and SKIN-008: offset the image by half its width and height and look for seams. Fix seams by hand; do not accept a result that shows one.
5. Optional: quantize to 8-bit PNG if the file is over 300 KB (the image-file limit in [IMAGERY.md](IMAGERY.md)).
6. Export PNG to `icons-and-imagery/staging/` only. Log the tool and job in [credit-ledger.md](credit-ledger.md) and each output in [provenance.md](provenance.md).

## Acceptance checklist (all items)

- [ ] Centre is calm (backgrounds) or flat and transparent (9-slice items)
- [ ] Edges are decorative (backgrounds) or clean and seamless (9-slice items)
- [ ] No baked-in text, letters, logos, watermarks or UI buttons
- [ ] Symmetric frames: left and right match, top and bottom match
- [ ] Contrast of `#E8DCC0` text on the centre is at least 4.5:1, measured
- [ ] Palette matches the Emberleaf values in [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [ ] Nothing from the "do not" list in [STYLE-GUIDE.md](STYLE-GUIDE.md); no game or studio trade dress
- [ ] Provenance entry filled from [PROVENANCE-TEMPLATE.md](PROVENANCE-TEMPLATE.md) in [provenance.md](provenance.md), alt text written
- [ ] Owner approval recorded before anything reaches `final/` or `apps/*`

## Tool terms (UNVERIFIED)

Terms, output ownership and commercial use depend on the generator. The status of Adobe Firefly is recorded in [docs/ART-PIPELINE.md](../docs/ART-PIPELINE.md): commercial use is stated generally, but output ownership is UNVERIFIED and the Generative AI Additional Terms were not read. Every output of this brief needs a provenance entry with:

- the tool, model and version, and the date generated (for an external tool, the name of the tool and the version shown in it, or UNVERIFIED);
- the prompt used, verbatim;
- the terms URL, the date checked and the operative clause (or UNVERIFIED);
- the human edits;
- the similarity check and reviewer;
- alt text;
- owner approval, with date.

An output with no completed entry must not be merged. This brief does not claim that any output is cleared, compliant or approved.

## Owner workflow (five steps)

1. **Generate.** In your external tool, paste the prompt from [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008) and the shared negative prompt. Generate one job at a time.
2. **Drop in Downloads.** Save the best result to your Downloads folder and keep the file name or note the job id (for example `SKIN-001`).
3. **Tell Claude.** Say which job it is (SKIN-001 to SKIN-008) and which file in Downloads.
4. **Claude crops, validates and registers.** Claude crops to the exact size, runs the checks above (contrast on the centre, seam test, symmetry), saves the file to `icons-and-imagery/staging/`, drafts the provenance entry and the registry entry with the flag off. You still need to supply the tool name and terms you read.
5. **Review in place.** Look at the result in the app or the preview, then approve or reject. Only approved results move on, and the registry flag is turned on only after your approval.

Nothing in this workflow is committed or published without your say-so.
