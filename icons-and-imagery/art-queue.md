# Art generation queue

The Day/Night theme set is listed first (owner: recommended first, 2026-11-08). Otherwise ordered by value to the Android app first, then marketing. Each job cites its brief in [ICONS.md](ICONS.md) or [IMAGERY.md](IMAGERY.md). Every prompt needs the [STYLE-GUIDE.md](STYLE-GUIDE.md) palette and this negative prompt where the tool supports one:

`logo, text, watermark, signature, existing game character, orc, tauren, murloc, lion crest, wolf crest, red versus blue factions, flaming border, glowing blue rune, hearthstone, photorealistic, 3d render, lens flare, blurry, extra fingers, low contrast, brand name, named artist, film still, recognizable character`

If the tool has no negative-prompt field, append `Avoid: <the same list>` to the prompt. Whether the Firefly UI has a negative-prompt field is UNVERIFIED.

Credit cost for every job is UNVERIFIED. Log actual cost in [credit-ledger.md](credit-ledger.md).

Rule: generated output is concept material only. Finals for the app icon and SVG icons are human-drawn or human-edited (see ICONS.md and the README rules).

## Day/Night theme set (recommended first)

Owner direction (2026-11-08): a light ("day") and a dark ("night") theme with the same pastoral scene. Brief: [SCREEN-SKIN-BRIEF.md](SCREEN-SKIN-BRIEF.md#daynight-theme-set-recommended-first). Prompts and the shared negative prompt: [prompts-copy-paste.md](prompts-copy-paste.md#daynight-theme-set-recommended-first). Make THEME-D-BG first so THEME-N-BG can match it. Tool terms and output ownership are UNVERIFIED for every job. Each output needs a provenance entry before merge. Contrast checks are in the brief.

- [ ] **THEME-D-BG: Day background** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 1080x2400 `bg-day.png`, opaque, 9:20 portrait; pale calm centre for ink text (mean luminance at least 0.45; darkest centre pixel at least 0.214); small cottage at the lower right edge with dark windows and a chimney smoke curl. Credit cost: UNVERIFIED.
  > #THEME-D-BG day background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral anime-fantasy scene in watercolor and gouache with clean ink linework and soft colour fills. Daytime, warm sun from the upper left. Top band: soft cumulus clouds over rolling hills. Bottom band: a wildflower meadow and a winding dirt footpath. A small cottage on a hillside at the lower right edge, beside the footpath, with dark windows and a thin chimney smoke curl. A hawthorn bush with sparse red berries fills the lower left corner. Painted detail only at the edges and top and bottom bands. The centre is a large, calm, pale parchment-cream wash with almost no detail, bright enough for ink text. Palette: Old Vellum, soft sky blue, Leaf green, berry red, Aged Bronze, Candle gold touches. Survives 16:9 to 21:9 cropping. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **THEME-N-BG: Night background, same composition** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 1080x2400 `bg-night.png`, opaque, 9:20 portrait; same layout as THEME-D-BG; dark centre for vellum text (mean at most 0.12; brightest centre pixel at most 0.121); same cottage position as THEME-D-BG, with warm glowing windows, and lanterns on posts lighting the footpath. Same cottage position in both. Matching tip (UNVERIFIED): use the day image as an image reference, or vary with "same composition at night". Credit cost: UNVERIFIED.
  > #THEME-N-BG night background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral anime-fantasy scene in watercolor and gouache with clean ink linework and soft colour fills. Same composition as day: clouds and hills top, meadow and footpath bottom. Night-time: a deep starry sky above. A small cottage on a hillside at the lower right edge, beside the footpath, with warm glowing windows. A hawthorn bush with sparse red berries fills the lower left corner. Small lanterns on posts light the footpath. Painted detail only at the edges and top and bottom bands. The centre is a large, calm, very dark slate wash with almost no detail, dark enough for light text. Palette: Ink Night, Slate Ledger, Dusk Teal, starlight, Leaf green, berry red, Candle gold lantern glints. Survives 16:9 to 21:9 cropping. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **THEME-D-FRAME: Day frame, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 512x512 `frame-day.png`, transparent; 96 px slices; transparent centre. Credit cost: UNVERIFIED.
  > #THEME-D-FRAME day frame, 9-slice
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Pale carved wood and brass with thin sparse hawthorn sprigs (3 to 5 small round red berries each) in all four corners only. Straight edges of plain pale carved wood with one thin brass line, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: pale oak, Aged Bronze, Leaf green hawthorn leaves, berry red, Candle gold highlight in the ornaments only. Transparent background. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **THEME-N-FRAME: Night frame, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 512x512 `frame-night.png`, transparent; 96 px slices; transparent centre. Credit cost: UNVERIFIED.
  > #THEME-N-FRAME night frame, 9-slice
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Aged bronze and dark hawthorn sprig ornaments, thin sparse hawthorn sprigs (3 to 5 small round red berries each), in all four corners only, with a few small lantern-shaped studs at the corners and mid-edges. Straight edges of plain bronze with a thin double line, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: Aged Bronze, dark Leaf green hawthorn leaves, berry red, Candle gold on the lantern studs only. Transparent background. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **THEME-D-PANEL: Day panel, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 192x192 `panel-day.png`, transparent outside the border; 40 px slices; opaque parchment centre (passes the day contrast test). Credit cost: UNVERIFIED.
  > #THEME-D-PANEL day panel, 9-slice
  > Square card panel frame, 192 by 192, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Warm parchment card with a thin Aged Bronze border line, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. The centre is a flat, even, warm parchment fill, fully opaque, pale enough for dark ink text. Transparent outside the rounded border. Palette: Old Vellum, Aged Bronze, faint Leaf green and berry red only in the corners, as thin sparse hawthorn sprigs (3 to 5 small round red berries each). Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **THEME-N-PANEL: Night panel, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 192x192 `panel-night.png`, transparent outside the border; 40 px slices; opaque slate centre (passes the night contrast test). Credit cost: UNVERIFIED.
  > #THEME-N-PANEL night panel, 9-slice
  > Square card panel frame, 192 by 192, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Dark slate card with a thin Aged Bronze border line, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. The centre is a flat, even Slate Ledger fill, fully opaque, dark enough for light parchment text. Transparent outside the rounded border. Palette: Slate Ledger, Aged Bronze, tiny Candle gold dots in the corners only. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **THEME-D-BTN: Day button variants** (optional, spec only; no prompt yet). Parchment variants of the dark button sprites, for light mode. Generate or hand-author later, after THEME-D-BG and THEME-N-BG are approved. See SCREEN-SKIN-BRIEF.md, Day/Night.

Owner workflow: generate the six images (THEME-D-BG, THEME-N-BG, THEME-D-FRAME, THEME-N-FRAME, THEME-D-PANEL, THEME-N-PANEL) into Downloads, then tell Claude which file is which job.

## Android app (priority)

- [ ] **ART-001: App icon concept variants** (ICONS.md §1). Target: 1024×1024 concept, then the 512 master is hand-built. Final files: `apps/mobile` icon set (512 maskable and 192). Credit cost: UNVERIFIED.
  > #ART-001 app icon concept variants
  > Hand-painted pastoral fantasy app icon in gouache and watercolor, clean expressive linework, soft color fills: a small bronze lantern with a leaf-shaped ember flame hanging from a curling vine, centered on a deep ink-navy rounded square. Warm candle glow, simple strong silhouette. Palette: Ember orange, Leaf green, Aged Bronze, Candle gold. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces
  Maskable: keep essentials in the central 80%, full square filled with `#14171F`.

- [ ] **ART-002: Empty state, no characters** (IMAGERY.md §3, `empty-characters.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > #ART-002 empty state, no characters
  > Hand-painted pastoral fantasy illustration in watercolor and gouache: an empty leather satchel hanging on a wooden peg beside a quill, warm lantern light. Palette: Old Vellum, Aged Bronze, Leaf green. Transparent background. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-003: Empty state, no activities** (`empty-activities.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > #ART-003 empty state, no activities
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills: a blank parchment scroll unrolling, a small lantern weighing down one end. Palette: Old Vellum, Aged Bronze. Transparent background. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-004: Empty state, everything complete** (`empty-checklist-done.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > #ART-004 empty state, everything complete
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills: a sleeping fox curled beside a banked ember fire. Palette: Ember orange, Old Vellum. Transparent background. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-005: Error state** (`error-generic.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > #ART-005 error state
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills: a snapped quill and a spilled ink pot, friendly not alarming. Palette: Old Vellum, soft Rust accents. Transparent background. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, handwriting, cursive, numbers, legible writing, figures, people, faces

- [ ] **ART-006: Offline notice** (`offline.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > #ART-006 offline notice
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills: a lantern on a grassy hill beside a closed wooden signpost at dusk. Palette: Dusk Teal, Candle gold. Transparent background. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-007: Onboarding panel 1, Add your characters** (IMAGERY.md §4.1). Target: 800×600. Credit cost: UNVERIFIED.
  > #ART-007 onboarding panel 1, add your characters
  > Hand-painted pastoral fantasy illustration in watercolor and gouache: a traveler's sketch of an open roster page on a desk, a quill and a small lantern beside it. Warm Old Vellum parchment tones, Aged Bronze accents. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-008: Onboarding panel 2, Plan your day and week** (IMAGERY.md §4.2). Target: 800×600. Credit cost: UNVERIFIED.
  > #ART-008 onboarding panel 2, plan your day and week
  > Hand-painted pastoral fantasy illustration in watercolor and gouache: an hourglass with ember sand beside an open ledger, warm late-afternoon light from the upper left. Palette: Old Vellum, Ember, Aged Bronze. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-009: Onboarding panel 3, Your data stays with you** (IMAGERY.md §4.3). Target: 800×600. Credit cost: UNVERIFIED.
  > #ART-009 onboarding panel 3, your data stays with you
  > Hand-painted pastoral fantasy illustration in watercolor and gouache: a bronze lockbox with a leaf-shaped keyhole on a wooden shelf, warm late-afternoon light. Palette: Aged Bronze, Old Vellum, Leaf green. Original design. --ar 4:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-010: Parchment background texture, light** (IMAGERY.md §2). Target: 1024×1024 seamless tile. Low contrast so 4.5:1 text contrast holds. Credit cost: UNVERIFIED.
  > #ART-010 parchment background texture, light
  > Seamless tile of subtle aged Old Vellum paper grain with faint hand-drawn compass lines, watercolor texture, very low contrast. Pastoral hand-painted fantasy, original design. --ar 1:1 --tile --no text, letters, words, logo, watermark, signature, vignette, central motif, bright lines, scratches, stains, dark spots, figures, people

- [ ] **ART-011: Parchment background texture, dark** (IMAGERY.md §2 dark variant). Target: 1024×1024 seamless tile on Slate Ledger `#1F2430`. Credit cost: UNVERIFIED.
  > #ART-011 parchment background texture, dark
  > Seamless tile of subtle paper grain on deep Slate Ledger blue-grey (#1F2430) with faint hand-drawn compass lines, watercolor texture, very low contrast. Pastoral hand-painted fantasy, original design. --ar 1:1 --tile --no text, letters, words, logo, watermark, signature, vignette, central motif, bright lines, scratches, stains, dark spots, figures, people

- [ ] **ART-012: Character placeholder avatars 1 to 6** (ICONS.md §4). Target: 128 px. Output is raster, so use only as concept; final avatars are SVG, hand-drawn. Credit cost: UNVERIFIED.
  > #ART-012 character placeholder avatars 1 to 6
  > Six neutral, faceless, class-agnostic silhouettes of travelers in hand-painted gouache style with clean expressive linework: hooded traveler, cloaked wanderer with staff, plain helmed figure, bard with lute, scout with bow, robed scholar. Palette: Old Vellum, Aged Bronze. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, faces, horns

## Marketing (after the app assets)

- [ ] **ART-013: Hero banner, wide** (IMAGERY.md §1). Target: 2400×900 `final/hero.webp`, plus 1200×450. Subject on right third; left 40% kept calm for overlay text. Credit cost: UNVERIFIED.
  > #ART-013 hero banner, wide
  > Wide hand-painted pastoral fantasy illustration in watercolor and gouache of a cartographer's study at late afternoon: arched window onto towering soft cumulus clouds, rolling meadows with wind-swept grass, a winding footpath, a distant stone watchtower, bronze lantern and trail-map ledger on a desk. Warm light, calm empty space on the left. Original design. --ar 8:3 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-014: Social preview** (IMAGERY.md §5). Target: 1280×640 `final/social-preview.png`. Left 45% reserved for title text added in post. Disclaimer added in post, not generated. Credit cost: UNVERIFIED.
  > #ART-014 social preview
  > Hand-painted pastoral fantasy scene in watercolor and gouache: a lantern-lit footpath at dusk, towering soft cumulus clouds, rolling meadows with wind-swept grass, a stone watchtower on a distant hill, small bronze lantern lower right. Calm empty space on the left half, warm ember light. Original design. --ar 2:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-015: Reset-timer strip, empty trail** (IMAGERY.md §6). Target: 600×120 `final/reset-trail-empty.png`. Credit cost: UNVERIFIED.
  > #ART-015 reset-timer strip, empty trail
  > Horizontal strip of a winding dirt footpath across rolling meadows, hand-painted watercolor and gouache with clean expressive linework, warm light, transparent or plain background. Original design. --ar 5:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

- [ ] **ART-016: Reset-timer lantern sprite** (IMAGERY.md §6). Target: 120×120 `final/reset-lantern.png`, transparent. Credit cost: UNVERIFIED.
  > #ART-016 reset-timer lantern sprite
  > Single small bronze lantern with an ember flame, hand-painted watercolor and gouache with clean expressive linework, centered, transparent background. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, photorealistic, 3d render, lens flare

## UI kit (optional; see UI-KIT-BRIEF.md)

Shared negative prompt for these jobs is in [UI-KIT-BRIEF.md](UI-KIT-BRIEF.md#shared-rules). The app already ships hand-authored SVG/RN button art, so each job below is optional and swappable through the registry in `src/art.ts`. Tool terms and output ownership are UNVERIFIED for every job.

- [ ] **UI-001: Button sprites, primary, secondary, danger; normal, pressed, disabled** (UI-KIT-BRIEF.md, UI-001). Target: 768x384 `ui-btn-sheet.png`, transparent, 3x3 grid of 256x128 cells; 9-slice caps 24/20 px. Credit cost: UNVERIFIED.
  > #UI-001 button sprites, primary, secondary, danger
  > Hand-painted pastoral fantasy UI button set in watercolor and gouache: three rounded-rectangle buttons side by side with soft wash fills and clean expressive ink outlines, thin Aged Bronze double-line edge, soft inner shadow. Left to right: primary button in Ember orange, secondary button in Aged Bronze with slate, danger button in muted Rust. Top row normal, middle row pressed (slightly darker, inset shadow), bottom row disabled (desaturated, flat, pale vellum). Fixed 3 by 3 grid, even spacing, transparent background. Each button is symmetric with a flat empty centre. Original design. --ar 2:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, photorealistic, 3d render, lens flare

- [ ] **UI-002: Panel and card border with corner ornaments (9-slice)** (UI-KIT-BRIEF.md, UI-002). Target: 96x96 `ui-panel-9slice.png`, transparent centre; 24 px caps. Credit cost: UNVERIFIED.
  > #UI-002 panel and card border with corner ornaments
  > Hand-painted pastoral fantasy panel frame in gouache and watercolor: a rounded card border with clean expressive ink linework and a soft Aged Bronze fill, Old Vellum inner edge, small thin sparse hawthorn sprigs (3 to 5 small round red berries each) ornaments in the four corners, simple rivets along the straight edges. Flat, straight-on view, symmetric on all four sides, straight edges that repeat cleanly along each side. Transparent empty centre, flat. Palette: Slate Ledger, Aged Bronze, Leaf green hawthorn leaves, berry red accents, Candle highlight only in the corner ornaments. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **UI-003: Ornamental divider rule** (UI-KIT-BRIEF.md, UI-003). Target: 512x32 `ui-divider.png`, transparent; 64 px caps, 1 px repeating centre. Credit cost: UNVERIFIED. Post-processing: output will be about 5:1; Claude crops, removes background and slices it into a 3-part divider (left cap, tiling line, centre ornament, right cap).
  > #UI-003 ornamental divider rule
  > Hand-painted pastoral fantasy ornamental divider rule in watercolor and gouache: a thin horizontal line of Aged Bronze with a small thin sparse hawthorn sprig at the centre (3 to 5 small round red berries) and a tiny Ember dot, tapering to fine ends, clean expressive ink linework, soft wash fill. Straight, horizontal, perfectly symmetric left to right, centred on a transparent background. One row only. Palette: Aged Bronze, Leaf green, berry red, Ember dot. Original design. --ar 5:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **UI-004: Tab-bar item frames, active and inactive** (UI-KIT-BRIEF.md, UI-004). Target: 512x160 `ui-tab-sheet.png`, transparent, two 256x160 cells; 9-slice caps 20/16 px. Credit cost: UNVERIFIED.
  > #UI-004 tab-bar item frames, active and inactive
  > Hand-painted pastoral fantasy tab-bar item frames in gouache and watercolor: two rounded tab shapes side by side on a fixed grid. Left tab is active: taller, with a rounded top, filled with Old Vellum parchment, a warm Candle gold glow along the top edge and a soft Ember underline. Right tab is inactive: slightly shorter, flat Slate Ledger with a thin Aged Bronze outline. Clean expressive ink linework, soft wash fills, flat empty centres for icons, symmetric shapes, transparent background. Original design. --ar 16:5 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, photorealistic, 3d render, lens flare

- [ ] **UI-005: Checkbox and toggle sprites, on and off** (UI-KIT-BRIEF.md, UI-005). Target: 512x256 `ui-control-sheet.png`, transparent, 2x2 grid of 256x128 cells; boxes 64x64, toggles 112x56. Credit cost: UNVERIFIED.
  > #UI-005 checkbox and toggle sprites, on and off
  > Hand-painted pastoral fantasy checkbox and toggle set in gouache and watercolor on a fixed 2 by 2 grid. Top left: an empty square checkbox with an Aged Bronze outline. Top right: the same box filled Leaf green with a clean ink check mark. Bottom left: a pill toggle in the off state, Slate track, small bronze knob on the left. Bottom right: the on state, Ember track, Candle gold knob on the right. Clean expressive ink linework, soft wash fills, flat, symmetric, transparent background, each item centred in its cell. The check mark and knob position show the state by shape. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, photorealistic, 3d render, lens flare

- [ ] **UI-006: Seamless dark parchment and slate background tile** (UI-KIT-BRIEF.md, UI-006). Target: 512x512 `bg-slate-tile.png`, opaque, seamless on all four edges, dark variant only. Credit cost: UNVERIFIED.
  > #UI-006 seamless dark parchment and slate background tile
  > Seamless tile of a dark parchment and slate background in watercolor and gouache: subtle Slate Ledger paper grain with faint wash mottling and barely visible hand-drawn compass lines, very low contrast, deep blue-grey with a faint warm vellum tint. Edges match exactly on all four sides so the tile repeats without seams. Uniform value, watercolor paper texture only. Original design. --ar 1:1 --tile --no text, letters, words, logo, watermark, signature, vignette, central motif, bright lines, scratches, stains, dark spots, figures, people

## Screen skins (optional; see SCREEN-SKIN-BRIEF.md)

Shared negative prompt for SKIN jobs is in [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008). Each job is optional and swappable; the app falls back to its drawn UI when no skin file exists. Tool terms and output ownership are UNVERIFIED for every job. Technical asset specs: [SCREEN-SKIN-SPEC.md](SCREEN-SKIN-SPEC.md).

- [ ] **SKIN-001: Checklist full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-001). Target: 1080x2400 `skin-checklist-bg.png`, opaque, 9:20 portrait; painted edges and bands only, calm dark centre. Credit cost: UNVERIFIED.
  > #SKIN-001 checklist full-screen background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A meadow with wind-swept grass, a winding dirt footpath, a wooden lantern post in the lower left corner, thin sparse hawthorn branches with 3 to 5 small round red berries each framing the top corners, a distant stone watchtower in the top band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, berry red, Aged Bronze, Candle gold glints on lanterns only. Survives 16:9 to 21:9 cropping. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **SKIN-002: Characters full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-002). Target: 1080x2400 `skin-characters-bg.png`, opaque, 9:20 portrait; campfire and cottage glow at corners, calm dark centre. Credit cost: UNVERIFIED.
  > #SKIN-002 characters full-screen background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A stone cottage with a warm lit window glowing in the lower left corner, a small campfire ember ring in the lower right corner, a hay bale and low wooden fence along the bottom band, rolling meadow and a few distant trees in the top corners. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **SKIN-003: Activities full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-003). Target: 1080x2400 `skin-activities-bg.png`, opaque, 9:20 portrait; trail and lantern posts at edges, calm dark centre. Credit cost: UNVERIFIED.
  > #SKIN-003 activities full-screen background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A row of wooden signposts and lantern posts receding along the left and right edges beside a winding footpath, a hand-drawn trail map pinned to a post in the top corner, wildflowers and grass in the bottom band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **SKIN-004: Settings full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-004). Target: 1080x2400 `skin-settings-bg.png`, opaque, 9:20 portrait; workshop shelf and brass tools at edges, calm dark centre. Credit cost: UNVERIFIED.
  > #SKIN-004 settings full-screen background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A wooden workshop shelf with brass tools, coiled rope and clay jars along the left and right edges, a hanging lantern in the upper right corner, a folded paper plan pinned at the top, a low bench of tools in the bottom band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **SKIN-005: About full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-005). Target: 1080x2400 `skin-about-bg.png`, opaque, 9:20 portrait; hilltop tower vista in top band, calm below. Credit cost: UNVERIFIED.
  > #SKIN-005 about full-screen background
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only in the top band: a hilltop stone watchtower and a distant castle on a ridge under towering soft cumulus clouds in an open pale-to-blue sky, fading into slate. Below the top band the image is a calm, dark slate wash with only faint grass at the bottom edge. Palette: Ink Night, Slate Ledger, Old Vellum, Leaf green, Aged Bronze, Candle gold on the tower windows only. Original design. --ar 9:20 --no text, letters, words, logo, watermark, signature, figures, people, faces, frames, borders, ui buttons, photorealistic, 3d render, lens flare, recognizable character, existing game character

- [ ] **SKIN-006: Ornate frame, 9-slice** (SCREEN-SKIN-BRIEF.md, SKIN-006). Target: 512x512 `skin-frame-9slice.png`, transparent; 96 px slices; flat transparent centre, bronze/hawthorn corners. Credit cost: UNVERIFIED.
  > #SKIN-006 ornate frame, 9-slice
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral fantasy style in watercolor and gouache with clean expressive ink linework. Bronze and thin sparse hawthorn sprigs (3 to 5 small round red berries each) ornaments in all four corners only. Thin Aged Bronze double-line edges along the straight sides, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: Aged Bronze, Leaf green, berry red, Candle gold highlight in the ornaments only, a soft Ember accent. Transparent background. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **SKIN-007: Panel, 9-slice** (SCREEN-SKIN-BRIEF.md, SKIN-007). Target: 192x192 `skin-panel-9slice.png`, transparent; 40 px slices; flat transparent centre. Credit cost: UNVERIFIED.
  > #SKIN-007 panel, 9-slice
  > Square card panel frame, 192 by 192, hand-painted pastoral fantasy style in watercolor and gouache with clean expressive ink linework. A rounded card border in soft Aged Bronze wash, Old Vellum inner edge, a small thin sparse hawthorn sprigs (3 to 5 small round red berries each) in each corner only, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. Transparent centre, flat. Palette: Slate Ledger, Aged Bronze, Leaf green, berry red, Candle gold in the corner ornaments only. Original design. --ar 1:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare

- [ ] **SKIN-008: Divider rule** (SCREEN-SKIN-BRIEF.md, SKIN-008). Target: 1024x48 `skin-divider.png`, transparent; horizontal stretch; hawthorn sprig with berries at centre. Credit cost: UNVERIFIED. Post-processing: output will be about 5:1; Claude crops, removes background and slices it into a 3-part divider (left cap, tiling line, centre ornament, right cap).
  > #SKIN-008 divider rule
  > Horizontal ornamental divider rule, 1024 by 48, hand-painted watercolor and gouache with clean expressive ink linework. A thin Aged Bronze line with a small thin sparse hawthorn sprig at the centre (3 to 5 small round red berries) and a tiny Ember dot, tapering to fine ends. Straight, horizontal, perfectly symmetric left to right, one row only, centred vertically on a fully transparent background. Palette: Aged Bronze, Leaf green, berry red, Ember dot. Original design. --ar 5:1 --no text, letters, words, logo, watermark, signature, figures, people, faces, flame, dragon scales, glow, gloss, shadows, berry clusters, photorealistic, 3d render, lens flare
