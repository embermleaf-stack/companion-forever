# Style guide — "Emberleaf" high-fantasy look

Working visual identity (internal codename only; final public branding awaits trademark review). The feel: a well-worn adventurer's journal and map-room — warm, hand-crafted, slightly storybook — not a copy of any existing game.

## Mood words

Warm lantern light, aged parchment, inked margins, forged bronze, moss and ember, hand-painted, quietly heroic, welcoming, a little whimsical. Readable first, ornate second.

## Palette (original; adjust within these families)

| Role | Name | Hex |
|---|---|---|
| Background deep | Ink Night | `#14171F` |
| Surface | Slate Ledger | `#1F2430` |
| Parchment | Old Vellum | `#E8DCC0` |
| Primary accent | Ember | `#E0702B` |
| Secondary accent | Leaf | `#5E9E5A` |
| Metal | Aged Bronze | `#B58A4A` |
| Highlight | Candle | `#F6D98A` |
| Cool shadow | Dusk Teal | `#2E5E6B` |
| Danger | Rust | `#B5432F` |

Avoid making the dominant color a saturated royal/cyan blue paired with gold; that combination reads as a specific commercial brand. Keep Ember and Leaf as the signature pair.

## Shapes and construction

- **Icon frames:** rounded squares with a thin double-line border in Aged Bronze and a soft inner shadow. Do **not** use flame-wreathed or ornate dragon-scale borders.
- **Corners and flourishes:** simple hawthorn-sprig corner motifs with small red berries, rivets, and stitched edges.
- **Silhouette first:** every icon must read as a one-color silhouette at 24 px.
- **Line weight:** consistent 2 px at 64 px canvas; slightly uneven, hand-inked feel allowed.
- **Perspective:** flat or gentle 3/4 view; no photorealism.

## Lighting and rendering

Single warm key light from upper left, cool rim light from below right. Soft painterly shading with visible but subtle brush texture. No glossy 3D, no lens flare, no HDR glow.

## Typography direction (for any lettering inside art)

Avoid lettering in art where possible. If needed: a humanist serif with calligraphic touches. Do not imitate any game's logotype. The text "World of Warcraft", "Blizzard", "Battle.net" must never appear.

## Motifs to prefer (original)

Lantern, quill and ledger, compass rose, sprouting acorn, ember-lit hearth, signpost, rune-less abstract sigils, hourglass, lockbox, satchel, clover, trail map, bridge, standing stone circle (generic), moth, fox, heron, oak leaf. **Signature plant motif: hawthorn sprig with small round red berries** (thin, sparse, 3 to 5 berries per sprig).

## Pastoral hand-painted direction (owner request, 2026-11-07)

Layered onto the Emberleaf palette and mood above. This describes the look only. No living artist, studio, film, or game is a reference for it.

- **Painting:** watercolor and gouache-style painted backgrounds with soft wash edges and faint paper texture. Foreground objects get cleaner, flatter fills.
- **Linework:** clean, expressive ink lines of varying weight, with soft color fills inside them. No heavy outlines, no glossy highlights.
- **Sky:** towering soft cumulus clouds over an open, pale-to-blue sky; generous sky area.
- **Land:** lush rolling meadows, wind-swept grass leaning in one direction, small groves of trees, distant hills.
- **Light:** gentle warm late-afternoon sun from the upper left, soft shadows, low contrast. No harsh rays, no lens effects.
- **Cozy rural details:** stone cottages with slate or thatched roofs, hanging lanterns, dirt footpaths, hay bales, wooden signposts, low fences.
- **Adventure-world vibe (generic fantasy only):** cloth banners, stone watchtowers, tavern lanterns, hand-drawn trail maps, standing stone circles, distant castles on hills.
- **Mood and scale:** calm, unhurried, hopeful. Where a person appears, they are small and distant against a grand landscape. Many briefs still specify no people.

## Do not (hard list)

- No orcs, humans-vs-orcs faction iconography, tauren, murlocs, or other creatures/races defined by an existing game; no generic "horned helm on crossed axes" or "lion/wolf head crest" faction emblems.
- No two-faction red/blue split compositions.
- No skull-and-flame, swirling portal, or glowing-blue-rune treatments that evoke a specific game's UI.
- No gear icons modeled on existing named items; no hearthstone-like glowing stone; no flask-with-swirl potion icons in the iconic style of any game.
- No class icons or class color-coding schemes taken from any game. Use neutral "Sample Class" glyphs if needed.
- No Blizzard, Activision, Battle.net, Wowhead, or other third-party logos or text.
- No real people, no real screenshots.
- No watermarks, signatures, or tool logos in output.
- **Never name a living artist, animation studio, film, or video game** in prompts, filenames, reference lists, or notes. Adobe's tools also forbid artist names in prompts.
- Do not recreate any recognizable film or game character, creature, vehicle, building, or composition.
- Explicitly avoid: soot-like fuzzy sprites; large gentle forest-spirit creatures; flying castles or airships as set pieces; bus-like creature vehicles; any faction crest or zone taken from a game.
- No reference images from any film or game, including as style references, mood boards, or inpainting sources.

## Negative prompt (paste with generation prompts)

`logo, text, watermark, signature, existing game character, orc, tauren, murloc, lion crest, wolf crest, red versus blue factions, flaming border, glowing blue rune, hearthstone, photorealistic, 3d render, lens flare, blurry, extra fingers, low contrast, brand name, named artist, film still, recognizable character`

## Accessibility

- Text over imagery must reach 4.5:1 contrast; supply an overlay-safe version.
- Never encode meaning in color alone; icons for done/not-done must differ in shape.
- Respect reduced-motion: no animated assets required.
