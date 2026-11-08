# Provenance log

One entry per generated or delivered asset, using [PROVENANCE-TEMPLATE.md](PROVENANCE-TEMPLATE.md). An asset without a completed entry must not be merged.

Entries are appended below this line.

## icon-expand-test.png (staging only, test of tooling; not for merge)

- **Date generated:** 2026-11-07
- **Created by:** AI tool (Adobe Firefly MCP connector, `image_generative_expand`; model/version not reported)
- **Prompt (verbatim) / brief used:** The tool exposes no prompt parameter, so the intended brief ("soft dusk-teal gradient sky, rolling moss-green hills, painterly, no text, no people, no logos") could not be sent. Only expandPixels left 398, right 398 (1024x1024 -> 1820x1024, 16:9).
- **Reference images used:** Input is our own original `apps/web/public/icon.svg`, rasterized to 1024x1024 PNG locally (Edge headless).
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked yet)
- **Human edits:** none
- **Similarity check:** not done
- **Alt text:** Lantern with leaf-shaped flame on a dark navy field, extended wider with plain dark background.
- **Reviewed by / approved by owner (date):** PENDING

## ART-001-midjourney-1.png and derived staging/icon-1024.png, adaptive-foreground-1024.png, icon-512.png, icon-192.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07
- **Created by:** AI tool: Midjourney (inferred from the file name pattern; OWNER TO CONFIRM tool, plan and prompt used). Run by the owner, not by an agent.
- **Prompt (verbatim) / brief used:** Per `prompts-copy-paste.md` ART-001 (owner-run); actual prompt used by the owner UNCONFIRMED: "Hand-painted pastoral fantasy app icon in gouache and watercolor, clean expressive linework, soft color fills: a small bronze lantern with a leaf-shaped ember flame hanging from a curling vine, centered on a deep ink-navy rounded square. Warm candle glow, simple strong silhouette. Palette: Ember orange, Leaf green, Aged Bronze, Candle gold. Original design, no text."
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked yet; plan unknown)
- **Human edits:** Agent-made, mechanical only: centered 700x700 crop (x/y 162..862) to remove the lighter navy margin and rounded-square corners, then bicubic resize to 1024/512/192. Dominant edge color roughly #161C22 (corners/top edge; bottom-center edge is warm glow, about #582715). No repainting.
- **Similarity check:** Visual inspection only by an AI agent, which cannot search image databases: a single bronze hanging lantern with an orange flame and warm glow, on a dark vignette, with a curling bronze hanger. No recognizable game, film or logo asset is evident, and no text. Limits: this is not a reverse-image search or a legal review; a human check is still required.
- **Observed deviations from brief:** hanger is a bronze curl, not a green vine; flame is not strictly leaf-shaped; dark vignette rather than flat navy; no green in the palette; lantern is tall and fills about 94% of the cropped height.
- **Alt text:** A bronze lantern with a curling hanger glows with an orange flame against a dark background.
- **Reviewed by / approved by owner (date):** PENDING

## Safe-zone expansion of staging/icon-1024.png -> expand-1600.png, adaptive-foreground-1024.png, icon-1024/512/192-safe.png, icon-safe-mask-preview.png (candidate; staging only)

- **Date generated:** 2026-11-07
- **Created by:** Adobe Firefly connector (MCP), tool `image_generative_expand`, run by an AI agent; plus local System.Drawing bicubic resize. Method: CONNECTOR (no local fallback needed).
- **Prompt (verbatim) / brief used:** The tool has no prompt parameter. Only expandPixels left/right/top/bottom 288 each (1024 -> 1600, seed 120464, requestId 9959c8f8-59dd-4f54-87fd-c8702c0763f4). Intent: continue the dark navy/charcoal vignette (about #161C22) so the lantern fills about 62-64% of the frame.
- **Reference images used:** the owner-supplied staging/icon-1024.png (itself derived from ART-001, see entry above), uploaded to Adobe Creative Cloud storage as cf-icon-1024.png.
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked yet)
- **Human edits:** expand-1600.png downscaled locally to 1024/512/192 (no other change). adaptive-foreground-1024.png and icon-1024-safe.png are the same image (opaque dark background, no transparency).
- **Visual check (agent, not a legal review):** expanded border looks seamless: no seams, no hallucinated objects, tone matches. Lantern hardware spans about y 320-1310 of 1600 (about 62% of height); glow-inclusive bbox by threshold is about 68% (554x700 px at 1024). Hardware sits inside the 66% safe circle in the mask preview; faint outer glow slightly exceeds it, which is harmless.
- **Limits:** the tool offers no prompt; seed-dependent; output is RGB without alpha.
- **Alt text:** A bronze lantern with an orange flame glows against a dark navy background, centered with generous margin.
- **Reviewed by / approved by owner (date):** PENDING

## ART-002-empty-characters-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Satchel on a wooden peg with a quill and a lit lantern; ivy leaves. Not a legal review; human check still required.
- **Alt text:** An empty brown leather satchel hangs from a wooden post beside a feather quill and a glowing lantern.
- **Reviewed by / approved by owner (date):** PENDING

## ART-003-empty-activities-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Blank parchment scroll unrolling, lantern at the lower right. Not a legal review; human check still required.
- **Alt text:** A blank parchment scroll unrolls beside a weathered lantern.
- **Reviewed by / approved by owner (date):** PENDING

## ART-004-empty-checklist-done-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Sleeping red fox curled beside embers and smoke. Not a legal review; human check still required.
- **Alt text:** A red fox sleeps curled beside a banked ember fire with a wisp of smoke.
- **Reviewed by / approved by owner (date):** PENDING

## ART-005-error-generic-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Quill with snapped-off nib and spilled ink pot. Ink-pot label contains legible cursive text reading approximately 'Error' (unwanted; text is forbidden). Not a legal review; human check still required.
- **Alt text:** A feather quill with a broken nib lies by a spilled ink pot.
- **Reviewed by / approved by owner (date):** PENDING

## ART-006-offline-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Lantern hanging from a post on a grassy hill at dusk beside a blank wooden signpost. Not a legal review; human check still required.
- **Alt text:** A lantern glows on a grassy hill at dusk beside a wooden signpost.
- **Reviewed by / approved by owner (date):** PENDING

## ART-007-onboard-1-characters-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Open ledger with illegible pseudo-handwriting, quill, lantern, coin stacks on a desk; a hanging cloak (no person) at top. Not a legal review; human check still required.
- **Alt text:** An open handwritten ledger with a quill and a lit lantern on a wooden desk.
- **Reviewed by / approved by owner (date):** PENDING

## ART-008-onboard-2-plan-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Hourglass with ember-colored sand beside an open ruled ledger, leaf sprigs. Not a legal review; human check still required.
- **Alt text:** An hourglass with amber sand stands beside an open ledger in warm light.
- **Reviewed by / approved by owner (date):** PENDING

## ART-009-onboard-3-data-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Green-bronze lockbox with leaf relief and a heart-shaped padlock on a wooden shelf. Not a legal review; human check still required.
- **Alt text:** A leaf-carved bronze and green lockbox with a heart-shaped padlock sits on a wooden shelf.
- **Reviewed by / approved by owner (date):** PENDING

## ART-010-tex-parchment-light-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Aged parchment with faint compass roses and lines (candidate tile; not seamless). Not a legal review; human check still required.
- **Alt text:** Faint compass rose lines on aged parchment.
- **Reviewed by / approved by owner (date):** PENDING

## ART-011-tex-parchment-dark-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Blue-teal textured paper with a large chalk-like compass rose (candidate tile; not seamless, high contrast). Not a legal review; human check still required.
- **Alt text:** A chalk-line compass rose on dark blue textured paper.
- **Reviewed by / approved by owner (date):** PENDING

## ART-012-avatars-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Sheet of 8 cloaked/hooded figures (brief asked for 6); one helm has horns (forbidden); includes a lute bard and an archer. Not a legal review; human check still required.
- **Alt text:** Eight cloaked silhouette travelers in watercolor, some with a staff, lute or bow.
- **Reviewed by / approved by owner (date):** PENDING

## ART-013-hero-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Arched window onto towering cumulus, meadow, path, distant watchtower; lantern and map on a desk. Square 1024, not wide. Not a legal review; human check still required.
- **Alt text:** A study window overlooks towering clouds, green meadows, a footpath and a distant stone tower, with a lantern and map on the desk.
- **Reviewed by / approved by owner (date):** PENDING

## ART-014-social-preview-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Footpath through windswept grass toward a hilltop watchtower under glowing cumulus; small lantern lower right. Square 1024, not 2:1. Not a legal review; human check still required.
- **Alt text:** A lantern-lit footpath winds through wind-swept grass toward a stone watchtower under glowing clouds at dusk.
- **Reviewed by / approved by owner (date):** PENDING

## ART-015-reset-trail-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Winding dirt path across green meadows; artwork occupies only the middle band of a white square, with ragged white margins. Not a legal review; human check still required.
- **Alt text:** A winding dirt footpath crosses rolling green meadows under a pale sky.
- **Reviewed by / approved by owner (date):** PENDING

## ART-016-reset-lantern-midjourney.png (candidate; staging only, not for merge)

- **Date generated:** 2026-11-07 (date delivered by owner; generation date UNCONFIRMED)
- **Created by:** AI tool, owner-run image generator; the file-name pattern suggests Midjourney. OWNER TO CONFIRM tool, version and plan.
- **Prompt (verbatim) / brief used:** Per the matching job in `art-queue.md` / `prompts-copy-paste.md`; owner pasted the job title into the prompt (file name shows it). Actual prompt UNCONFIRMED.
- **Reference images used:** none known (OWNER TO CONFIRM)
- **Tool/output license terms:** UNVERIFIED (no URL/clause checked; plan unknown)
- **Human edits:** none. Delivered as 1024x1024 RGB PNG, no alpha channel. See `REVIEW-2026-11-07.md`.
- **Similarity check:** Limited: visual inspection only by an AI agent, which cannot search image databases or run reverse-image search. No game, film or logo asset recognized and no watermark seen. Observed: Single weathered lantern with orange flame on opaque white background. Not a legal review; human check still required.
- **Alt text:** A weathered metal lantern with a glowing orange flame.
- **Reviewed by / approved by owner (date):** PENDING

## Integration (2026-11-07): provisionally approved by owner 2026-11-07, final decision pending in-place review

All art loads through one registry per app: `apps/mobile/src/art.ts` and `apps/web/src/art.ts` (each entry: job id, asset, alt text, `provisional: true`, `enabled` flag). Setting `enabled: false` removes the art and the UI falls back to text only. Tool unconfirmed; output license UNVERIFIED.

Used (processed files in `apps/mobile/assets/art/`, `apps/web/public/art/`):
- ART-002: Characters empty state (background removed locally by flood fill plus edge matte, 256-color quantized, 800x600).
- ART-003: Activities empty state and Checklist "Nothing to track yet" (same method).
- ART-004: Checklist all-complete state (background removed with the Adobe Firefly connector `image_remove_background`, quantized, 800x600; smoke is cut flat at the top edge).
- ART-007, 008, 009: first-launch onboarding panels 1-3 (4:3 crop, 800x600 JPEG; 007 cropped from the top to keep the lantern).
- ART-013: About page hero (web only), 1024x384 crop (y 400), low resolution, temporary.
- ART-015: reset-countdown strip background in Checklist, 1024x205 crop, darkened by an overlay for contrast.
- ART-016: reset-countdown lantern icon (120x120 plus @2x 240x240) in the strip and on completed rows.
- ART-014: cropped to 1024x512 as `icons-and-imagery/final/social-preview-draft.png`; not wired anywhere.

Disabled, no pixels shipped in `apps/`: ART-005 (legible "Error" text), ART-006 (the app has no network access or connectivity check, so no offline state exists), ART-010, ART-011 (not seamless, contrast), ART-012 (eight figures, one horned).

## UI-BTN: button sprites (btn-primary, -primary-pressed, -secondary, -secondary-pressed, -danger, -danger-pressed, -disabled) (2026-11-07)

- **Created by:** hand-authored original SVG (AI agent under owner direction), generated by `icons-and-imagery/final/build-button-sprites.mjs`. No AI image generator, no third-party art, no game assets.
- **Files:** SVG sources `icons-and-imagery/final/btn-*.svg`; PNG rasters (1x/2x/3x, 48x48 logical, 14px 9-slice caps) in `apps/mobile/assets/art/ui/`. Rasterized with `@resvg/resvg-js` run from a scratch directory (build-time only; not an app dependency).
- **License:** GPL-3.0-only (original work). Registered in `apps/mobile/src/art.ts` (keys `btn*`, `provisional: true`).
- **Similarity check:** none beyond design intent (beveled bronze frame, corner studs, simple gradients); no known game UI was referenced. Not a legal review.
- **Alt text:** decorative frame; the button's own accessibility label is used.
- **Reviewed by / approved by owner (date):** PENDING

## UI-TOGGLE: checkbox and switch sprites (toggle-box-off/on, toggle-switch-off/on) (2026-11-07)

- **Created by:** hand-authored original SVG (AI agent under owner direction), generated by `icons-and-imagery/final/build-toggle-sprites.mjs`. No AI image generator, no third-party art, no game assets.
- **Files:** SVG sources `icons-and-imagery/final/toggle-*.svg`; PNG rasters (1x/2x/3x; box 32x32, switch 56x32 logical) in `apps/mobile/assets/art/ui/`. Rasterized with `@resvg/resvg-js` from a scratch directory (build-time only).
- **Used in:** Checklist row checkbox (`ToggleBoxGraphic`) and Settings reminders switch (`ToggleSwitch`) in `apps/mobile/src/ui.tsx`. Registered in `apps/mobile/src/art.ts` (keys `toggle*`, `provisional: true`). The native RN `Switch` was replaced by a Pressable with `accessibilityRole="switch"`, checked state and label; state is also shown by thumb position and an adjacent "On/Off" text, not color alone.
- **License:** GPL-3.0-only (original work). Similarity check: none beyond design intent (bronze frame, ember/leaf fill). Not a legal review.
- **Reviewed by / approved by owner (date):** PENDING

## SKIN-PLACEHOLDER: screen-skin pipeline stand-ins (placeholder-bg 1080x2400, placeholder-frame 512x512, placeholder-panel 192x192) (2026-11-08)

- **PLACEHOLDER, NOT FINAL ART.** Disabled by default (`enabled: false` in `apps/mobile/src/skin.ts`); shown only in builds with `EXPO_PUBLIC_SKIN_DEMO=1`.
- **Created by:** hand-authored original SVG (AI agent under owner direction), generated by `icons-and-imagery/final/build-skin-placeholders.mjs`. No AI image generator, no third-party art, no game assets.
- **Files:** SVG sources `icons-and-imagery/final/skin-placeholder-{bg,frame,panel}.svg`; PNG rasters in `apps/mobile/assets/art/skin/placeholder-*.png` (rasterized with `@resvg/resvg-js` from a scratch directory, build-time only).
- **License:** GPL-3.0-only (original work). Spec for real art: `icons-and-imagery/SCREEN-SKIN-SPEC.md`.
- **Alt text:** decorative; hidden from accessibility.
- **Reviewed by / approved by owner (date):** PENDING

## Regen batch integration (2026-11-08): ART-005 v3, 010, 011, 012, 013, 014, 015

- **Tool:** Midjourney (owner-confirmed). **Plan and output license terms: UNVERIFIED** (no URL/clause checked). **Approval: provisional** (owner said "integrate" 2026-11-08; final decision pending in-place review). Prompts: not recorded here (owner-run). Similarity check: visual inspection by an AI agent only; no logo, character, game art or legible text recognized. Not a legal review.
- **Sources:** `icons-and-imagery/staging/regen/ART-0xx-n.png` (git-ignored) and `icons-and-imagery/midjourney-originals/ART-005_v3_fountain-pen_5c1ce9fd_3.png` (git-ignored). Processing by Jimp (scratch scripts, not in repo).

| Job | Source file | Processing | Output | Alt text |
|---|---|---|---|---|
| ART-005 error | `ART-005_v3_fountain-pen_5c1ce9fd_3.png` (1024x1024) | crop x0 y90 1024x768 (4:3; drops inkwell at top right), bicubic to 960x720, JPEG q82 | `apps/mobile/assets/art/art-005.jpg` (171 KB). No legible text (faint lines are abstract). Shown beside the message line after a failed state change (e.g. adding a character with no name). | A feather pen with a broken nib and ink splatter on paper |
| ART-013 hero | `ART-013-1.png` (1792x672) | bicubic to 1200x450, JPEG q80 | `apps/web/public/art/art-013-hero.jpg`, `apps/mobile/assets/art/art-013-hero.jpg` (72 KB each). Web About hero and mobile About screen. | A golden-hour painting of a small stone watchtower on a distant hill above a winding path, seen past a ruined stone archway. |
| ART-014 social preview | `ART-014-0.png` (1536x768, black bars) | content rows 63..704 found by row luminance; cropped rows 64..703 and columns 128..1407 = 1280x640 (tower and lantern kept). Edge rows mean luminance 158 (top) and 65 (bottom), not near black | `icons-and-imagery/final/social-preview.png` (1.3 MB; over GitHub's 1 MB limit) and `social-preview.jpg` (169 KB, q88). Not referenced by apps/web or README (nothing to update). | A painted stone watchtower on a grassy hill at dusk, with a glowing lantern in the grass. |
| ART-015 trail | `ART-015-2.png` (2448x496) | crop x24 y8 2400x480 (5:1), bicubic to 1200x240, JPEG q80 | `apps/mobile/assets/art/art-015.jpg` (88 KB). Reset strip background under the existing rgba(20,23,31,0.78) overlay. | A winding pale dirt path crosses green and golden meadow hills under a soft sky. |
| ART-012 avatars | `ART-012-1.png` (1904x640) | six figures found by column projection (exactly six; no horns; figure 3's hood has a small pointed peak, not a horn); each cropped to its bounding box, scaled to fit 256 px, centered on a 320x320 flat cream (240,234,224) tile; the sheet's paper texture is replaced by flat cream via a luminance ramp (215 to 150) | `apps/mobile/assets/art/avatars/avatar-1..6.png` (40-47 KB each). **Kept on cream, not transparent:** the silhouettes are near-black and the app is dark, so transparency would make them invisible. Assigned in Characters by FNV-1a hash of the character id (`avatarKeyFor` in `art.ts`), so a character keeps its avatar. | Dark silhouettes (alt per entry in `art.ts`); decorative in the list. |
| ART-010 light texture | `ART-010-3.png` (1024x1024) | tiled 3x3 and inspected; wrap-edge diff 4.49 (columns) and 4.03 (rows) vs typical adjacent 3.95 and 4.07 | **Not shipped.** Seamless at the edges, but repetition of blotches is visible, and the app has no light surface. | n/a |
| ART-011 dark texture | `ART-011-2.png` (1024x1024) | 3x3 tile check: wrap-edge diff 12.06 / 11.70 vs typical 12.69 / 12.61 (seamless); mild visible repetition of dark blocks. Wrap-aware downscale to 512x512, JPEG q85 | `apps/mobile/assets/art/texture-dark.jpg` (86 KB), drawn repeated at opacity 0.08 in the default `Background` only (the skin system is untouched and off by default). | Soft mottled dark slate-blue paper texture. |

- **Texture contrast (computed over every pixel, worst case, including the 6% ember glow at the top):** at opacity 0.08, body text #E8DCC0 min 11.04:1, Candle #F6D98A 10.88:1, 80%-opacity text 7.60:1, header Candle on header tint 11.11:1, Ember #E0702B 4.67:1 (baseline without texture: 13.16, 12.98, 5.56). Opacity 0.12 would drop Ember to 4.39, so 0.08 is used.
- **Defect found and fixed while testing:** adding a character with an empty name crashed the app (a throw inside a `setState` updater). `run` in `apps/mobile/src/App.tsx` now evaluates the change eagerly against a state ref so the error shows as a message.
- **Reviewed by / approved by owner (date):** PENDING
