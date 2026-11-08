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
