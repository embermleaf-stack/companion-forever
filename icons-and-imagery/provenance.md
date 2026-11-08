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
