# Art generation queue

The Day/Night theme set is listed first (owner: recommended first, 2026-11-08). Otherwise ordered by value to the Android app first, then marketing. Each job cites its brief in [ICONS.md](ICONS.md) or [IMAGERY.md](IMAGERY.md). Every prompt needs the [STYLE-GUIDE.md](STYLE-GUIDE.md) palette and this negative prompt where the tool supports one:

`logo, text, watermark, signature, existing game character, orc, tauren, murloc, lion crest, wolf crest, red versus blue factions, flaming border, glowing blue rune, hearthstone, photorealistic, 3d render, lens flare, blurry, extra fingers, low contrast, brand name, named artist, film still, recognizable character`

If the tool has no negative-prompt field, append `Avoid: <the same list>` to the prompt. Whether the Firefly UI has a negative-prompt field is UNVERIFIED.

Credit cost for every job is UNVERIFIED. Log actual cost in [credit-ledger.md](credit-ledger.md).

Rule: generated output is concept material only. Finals for the app icon and SVG icons are human-drawn or human-edited (see ICONS.md and the README rules).

## Day/Night theme set (recommended first)

Owner direction (2026-11-08): a light ("day") and a dark ("night") theme with the same pastoral scene. Brief: [SCREEN-SKIN-BRIEF.md](SCREEN-SKIN-BRIEF.md#daynight-theme-set-recommended-first). Prompts and the shared negative prompt: [prompts-copy-paste.md](prompts-copy-paste.md#daynight-theme-set-recommended-first). Make THEME-D-BG first so THEME-N-BG can match it. Tool terms and output ownership are UNVERIFIED for every job. Each output needs a provenance entry before merge. Contrast checks are in the brief.

- [ ] **THEME-D-BG: Day background** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 1080x2400 `bg-day.png`, opaque, 9:20 portrait; pale calm centre for ink text (mean luminance at least 0.45; darkest centre pixel at least 0.214). Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral anime-fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Daytime, warm late-morning sun from the upper left. Top band: towering soft cumulus clouds in an open pale-blue sky over rolling hills. Bottom band: a wildflower meadow with wind-swept grass and a winding dirt footpath. Painted detail only at the edges, the corners and the top and bottom bands. The centre is a large, calm, pale parchment-cream wash with almost no detail, bright enough for dark ink text. Palette: Old Vellum, soft sky blue, Leaf green, Aged Bronze, Candle gold touches. Detail must survive cropping to 16:9 through 21:9. No people, no figures, no text, no letters, no logo, no watermark. Original design.

- [ ] **THEME-N-BG: Night background, same composition** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 1080x2400 `bg-night.png`, opaque, 9:20 portrait; same layout as THEME-D-BG; dark centre for vellum text (mean at most 0.12; brightest centre pixel at most 0.121). Matching tip (UNVERIFIED): use the day image as an image reference, or vary with "same composition at night". Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral anime-fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. The same composition as the daytime scene: soft clouds and hills in the top band, a wildflower meadow and winding footpath in the bottom band. Night-time: a deep starry sky above, lantern glow along the footpath, a warm cottage window glowing at one edge. Painted detail only at the edges, the corners and the top and bottom bands. The centre is a large, calm, very dark slate wash with almost no detail, dark enough for light text. Palette: Ink Night, Slate Ledger, Dusk Teal, pale starlight, Candle gold lantern glints. Detail must survive cropping to 16:9 through 21:9. No people, no figures, no text, no letters, no logo, no watermark. Original design.

- [ ] **THEME-D-FRAME: Day frame, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 512x512 `frame-day.png`, transparent; 96 px slices; transparent centre. Credit cost: UNVERIFIED.
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Pale carved wood and brass with leaf vines in all four corners only. Straight edges of plain pale carved wood with one thin brass line, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: pale oak, Aged Bronze, Leaf green vines, Candle gold highlight in the ornaments only. No flame, no dragon-scale border, no glow, no gloss. Transparent background. Original design, no text, no letters, no figures.

- [ ] **THEME-N-FRAME: Night frame, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 512x512 `frame-night.png`, transparent; 96 px slices; transparent centre. Credit cost: UNVERIFIED.
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Aged bronze and dark vine ornaments in all four corners only, with a few small lantern-shaped studs at the corners and mid-edges. Straight edges of plain bronze with a thin double line, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: Aged Bronze, dark Leaf green vines, Candle gold on the lantern studs only. No flame, no dragon-scale border, no glow, no gloss. Transparent background. Original design, no text, no letters, no figures.

- [ ] **THEME-D-PANEL: Day panel, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 192x192 `panel-day.png`, transparent outside the border; 40 px slices; opaque parchment centre (passes the day contrast test). Credit cost: UNVERIFIED.
  > Square card panel frame, 192 by 192, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Warm parchment card with a thin Aged Bronze border line, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. The centre is a flat, even, warm parchment fill with no texture or marks, fully opaque, pale enough for dark ink text. Transparent outside the rounded border. Palette: Old Vellum, Aged Bronze, faint Leaf green only in the corners. Original design, no text, no letters, no figures.

- [ ] **THEME-N-PANEL: Night panel, 9-slice** (SCREEN-SKIN-BRIEF.md, Day/Night). Target: 192x192 `panel-night.png`, transparent outside the border; 40 px slices; opaque slate centre (passes the night contrast test). Credit cost: UNVERIFIED.
  > Square card panel frame, 192 by 192, hand-painted pastoral anime-fantasy style in watercolor and gouache with clean expressive ink linework. Dark slate card with a thin Aged Bronze border line, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. The centre is a flat, even Slate Ledger fill with no texture or marks, fully opaque, dark enough for light parchment text. Transparent outside the rounded border. Palette: Slate Ledger, Aged Bronze, tiny Candle gold dots in the corners only. Original design, no text, no letters, no figures.

- [ ] **THEME-D-BTN: Day button variants** (optional, spec only; no prompt yet). Parchment variants of the dark button sprites, for light mode. Generate or hand-author later, after THEME-D-BG and THEME-N-BG are approved. See SCREEN-SKIN-BRIEF.md, Day/Night.

Owner workflow: generate the six images (THEME-D-BG, THEME-N-BG, THEME-D-FRAME, THEME-N-FRAME, THEME-D-PANEL, THEME-N-PANEL) into Downloads, then tell Claude which file is which job.

## Android app (priority)

- [ ] **ART-001: App icon concept variants** (ICONS.md §1). Target: 1024×1024 concept, then the 512 master is hand-built. Final files: `apps/mobile` icon set (512 maskable and 192). Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy app icon in gouache, clean expressive linework, soft color fills, of a small bronze lantern with a leaf-shaped ember flame, hanging from a curling vine, centered on a deep ink-navy rounded square, warm candle glow, simple strong silhouette, original design, no text.
  Maskable: keep essentials in the central 80%, full square filled with `#14171F`.

- [ ] **ART-002: Empty state, no characters** (IMAGERY.md §3, `empty-characters.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache of an empty leather satchel hanging on a wooden peg beside a quill, warm lantern light, transparent background, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-003: Empty state, no activities** (`empty-activities.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills, of a blank parchment scroll unrolling, a small lantern weighing down one end, transparent background, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-004: Empty state, everything complete** (`empty-checklist-done.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills, of a sleeping fox curled beside a banked ember fire, transparent background, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-005: Error state** (`error-generic.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills, of a snapped quill and a spilled ink pot, friendly not alarming, transparent background, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-006: Offline notice** (`offline.png`). Target: 480×360 PNG, transparent. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache, clean expressive linework, soft color fills, of a lantern on a grassy hill beside a closed wooden signpost at dusk, transparent background, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-007: Onboarding panel 1, Add your characters** (IMAGERY.md §4.1). Target: 800×600. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache of a traveler's sketch of an open roster page on a desk, a quill and a small lantern beside it, warm parchment tones, pastoral hand-painted fantasy, original design, no text, no people.

- [ ] **ART-008: Onboarding panel 2, Plan your day and week** (IMAGERY.md §4.2). Target: 800×600. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache of an hourglass with ember sand beside an open ledger, warm late-afternoon light, original design, no text, no people.

- [ ] **ART-009: Onboarding panel 3, Your data stays with you** (IMAGERY.md §4.3). Target: 800×600. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy illustration in watercolor and gouache of a bronze lockbox with a leaf-shaped keyhole on a wooden shelf, warm late-afternoon light, original design, no text, no people.

- [ ] **ART-010: Parchment background texture, light** (IMAGERY.md §2). Target: 1024×1024 seamless tile. Low contrast so 4.5:1 text contrast holds. Credit cost: UNVERIFIED.
  > Seamless tile of subtle aged Old Vellum paper grain with faint hand-drawn compass lines, very low contrast, pastoral hand-painted fantasy, watercolor texture, original design, no text.

- [ ] **ART-011: Parchment background texture, dark** (IMAGERY.md §2 dark variant). Target: 1024×1024 seamless tile on Slate Ledger `#1F2430`. Credit cost: UNVERIFIED.
  > Seamless tile of subtle paper grain on deep slate blue-grey with faint hand-drawn compass lines, very low contrast, pastoral hand-painted fantasy, watercolor texture, original design, no text.

- [ ] **ART-012: Character placeholder avatars 1 to 6** (ICONS.md §4). Target: 128 px. Output is raster, so use only as concept; final avatars are SVG, hand-drawn. Credit cost: UNVERIFIED.
  > Six neutral, faceless, class-agnostic silhouettes of travelers in a hand-painted gouache style with clean expressive linework: hooded traveler, cloaked wanderer with staff, plain helmed figure (no horns), bard with lute, scout with bow, robed scholar. Original design, no text.

## Marketing (after the app assets)

- [ ] **ART-013: Hero banner, wide** (IMAGERY.md §1). Target: 2400×900 `final/hero.webp`, plus 1200×450. Subject on right third; left 40% kept calm for overlay text. Credit cost: UNVERIFIED.
  > Wide hand-painted pastoral fantasy illustration in watercolor and gouache of a cartographer's study at late afternoon, arched window onto towering soft cumulus clouds, lush rolling meadows with wind-swept grass and a winding footpath, distant stone watchtower on a hill, bronze lantern and open trail-map ledger on a wooden desk, gentle warm light, clean expressive ink linework with soft color fills, calm negative space on the left, original design, no text, no people.

- [ ] **ART-014: Social preview** (IMAGERY.md §5). Target: 1280×640 `final/social-preview.png`. Left 45% reserved for title text added in post. Disclaimer added in post, not generated. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy scene in watercolor and gouache of a lantern-lit footpath at dusk, towering soft cumulus clouds, lush rolling meadows with wind-swept grass, a stone watchtower on a distant hill, a bronze lantern icon small in the lower right, calm empty space on the left half, warm ember light, original design, no text, no people, no logos.

- [ ] **ART-015: Reset-timer strip, empty trail** (IMAGERY.md §6). Target: 600×120 `final/reset-trail-empty.png`. Credit cost: UNVERIFIED.
  > Horizontal strip of a winding dirt footpath across rolling meadows, hand-painted watercolor and gouache style with clean expressive linework, warm light, transparent or plain background, original design, no text, no people.

- [ ] **ART-016: Reset-timer lantern sprite** (IMAGERY.md §6). Target: 120×120 `final/reset-lantern.png`, transparent. Credit cost: UNVERIFIED.
  > Single small bronze lantern with an ember flame, hand-painted watercolor and gouache style with clean expressive linework, transparent background, single object centered, original design, no text.

## UI kit (optional; see UI-KIT-BRIEF.md)

Shared negative prompt for these jobs is in [UI-KIT-BRIEF.md](UI-KIT-BRIEF.md#shared-rules). The app already ships hand-authored SVG/RN button art, so each job below is optional and swappable through the registry in `src/art.ts`. Tool terms and output ownership are UNVERIFIED for every job.

- [ ] **UI-001: Button sprites, primary, secondary, danger; normal, pressed, disabled** (UI-KIT-BRIEF.md, UI-001). Target: 768x384 `ui-btn-sheet.png`, transparent, 3x3 grid of 256x128 cells; 9-slice caps 24/20 px. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy UI button set in watercolor and gouache: three rounded-rectangle buttons side by side with soft wash fills and clean expressive ink outlines, thin Aged Bronze double-line edge, soft inner shadow. Left to right: primary button in Ember orange, secondary button in Aged Bronze with slate, danger button in muted Rust. Top row normal, middle row pressed (slightly darker, inset shadow), bottom row disabled (desaturated, flat, pale vellum). Fixed 3 by 3 grid, even spacing, transparent background. Each button is symmetric with a flat empty centre and nothing inside it. Original design, no text, no letters, no figures.

- [ ] **UI-002: Panel and card border with corner ornaments (9-slice)** (UI-KIT-BRIEF.md, UI-002). Target: 96x96 `ui-panel-9slice.png`, transparent centre; 24 px caps. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy panel frame in gouache and watercolor: a rounded card border with clean expressive ink linework and a soft Aged Bronze fill, Old Vellum inner edge, small leaf-and-vine ornaments in the four corners, simple rivets along the straight edges. Flat, straight-on view, symmetric on all four sides, straight edges that repeat cleanly along each side. Transparent empty centre, flat, nothing inside the frame. Palette: Slate Ledger, Aged Bronze, Leaf green accents, Candle highlight only in the corner ornaments. Original design, no text, no letters, no figures.

- [ ] **UI-003: Ornamental divider rule** (UI-KIT-BRIEF.md, UI-003). Target: 512x32 `ui-divider.png`, transparent; 64 px caps, 1 px repeating centre. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy ornamental divider rule in watercolor and gouache: a thin horizontal line of Aged Bronze with a small leaf sprig at the centre and a tiny Ember dot, tapering to fine ends, clean expressive ink linework, soft wash fill. Straight, horizontal, perfectly symmetric left to right, centred on a transparent background. One row only, nothing else on the canvas. Palette: Aged Bronze, Leaf green, Ember dot. Original design, no text, no letters, no figures.

- [ ] **UI-004: Tab-bar item frames, active and inactive** (UI-KIT-BRIEF.md, UI-004). Target: 512x160 `ui-tab-sheet.png`, transparent, two 256x160 cells; 9-slice caps 20/16 px. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy tab-bar item frames in gouache and watercolor: two rounded tab shapes side by side on a fixed grid. Left tab is active: taller, with a rounded top, filled with Old Vellum parchment, a warm Candle gold glow along the top edge and a soft Ember underline. Right tab is inactive: slightly shorter, flat Slate Ledger with a thin Aged Bronze outline and no glow. Clean expressive ink linework, soft wash fills, flat empty centres for icons, symmetric shapes, transparent background. Original design, no text, no letters, no figures.

- [ ] **UI-005: Checkbox and toggle sprites, on and off** (UI-KIT-BRIEF.md, UI-005). Target: 512x256 `ui-control-sheet.png`, transparent, 2x2 grid of 256x128 cells; boxes 64x64, toggles 112x56. Credit cost: UNVERIFIED.
  > Hand-painted pastoral fantasy checkbox and toggle set in gouache and watercolor on a fixed 2 by 2 grid. Top left: an empty square checkbox with an Aged Bronze outline. Top right: the same box filled Leaf green with a clean ink check mark. Bottom left: a pill toggle in the off state, Slate track, small bronze knob on the left. Bottom right: the on state, Ember track, Candle gold knob on the right. Clean expressive ink linework, soft wash fills, flat, symmetric, transparent background, each item centred in its cell. The check mark and knob position show the state by shape. Original design, no text, no letters, no figures.

- [ ] **UI-006: Seamless dark parchment and slate background tile** (UI-KIT-BRIEF.md, UI-006). Target: 512x512 `bg-slate-tile.png`, opaque, seamless on all four edges, dark variant only. Credit cost: UNVERIFIED.
  > Seamless tile of a dark parchment and slate background in watercolor and gouache: subtle Slate Ledger paper grain with faint wash mottling and barely visible hand-drawn compass lines, very low contrast, deep blue-grey with a faint warm vellum tint. Edges match exactly on all four sides so the tile repeats without seams. Uniform value, no vignette, no focal object, no bright spots, watercolor paper texture only. Original design, no text, no letters, no figures, no logo.

## Screen skins (optional; see SCREEN-SKIN-BRIEF.md)

Shared negative prompt for SKIN jobs is in [prompts-copy-paste.md](prompts-copy-paste.md#screen-skins-skin-001-to-skin-008). Each job is optional and swappable; the app falls back to its drawn UI when no skin file exists. Tool terms and output ownership are UNVERIFIED for every job. Technical asset specs: [SCREEN-SKIN-SPEC.md](SCREEN-SKIN-SPEC.md).

- [ ] **SKIN-001: Checklist full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-001). Target: 1080x2400 `skin-checklist-bg.png`, opaque, 9:20 portrait; painted edges and bands only, calm dark centre. Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A meadow with wind-swept grass, a winding dirt footpath, a wooden lantern post in the lower left corner, oak leaves framing the top corners, a distant stone watchtower in the top band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. No figures in focus areas. Original design, no text, no letters, no logo, no watermark.

- [ ] **SKIN-002: Characters full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-002). Target: 1080x2400 `skin-characters-bg.png`, opaque, 9:20 portrait; campfire and cottage glow at corners, calm dark centre. Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A stone cottage with a warm lit window glowing in the lower left corner, a small campfire ember ring in the lower right corner, a hay bale and low wooden fence along the bottom band, rolling meadow and a few distant trees in the top corners. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. No figures in focus areas. Original design, no text, no letters, no logo, no watermark.

- [ ] **SKIN-003: Activities full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-003). Target: 1080x2400 `skin-activities-bg.png`, opaque, 9:20 portrait; trail and lantern posts at edges, calm dark centre. Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A row of wooden signposts and lantern posts receding along the left and right edges beside a winding footpath, a hand-drawn trail map pinned to a post in the top corner, wildflowers and grass in the bottom band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. No figures in focus areas. Original design, no text, no letters, no logo, no watermark.

- [ ] **SKIN-004: Settings full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-004). Target: 1080x2400 `skin-settings-bg.png`, opaque, 9:20 portrait; workshop shelf and brass tools at edges, calm dark centre. Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only at the edges, the corners and the top and bottom bands. A wooden workshop shelf with brass tools, coiled rope and clay jars along the left and right edges, a hanging lantern in the upper right corner, a folded paper plan pinned at the top, a low bench of tools in the bottom band. The centre is a large, calm, dark slate wash with almost no detail. Palette: Ink Night, Slate Ledger, Old Vellum touches, Leaf green, Aged Bronze, Candle gold glints on lanterns only. Detail must survive cropping to 16:9 through 21:9. No figures in focus areas. Original design, no text, no letters, no logo, no watermark.

- [ ] **SKIN-005: About full-screen background** (SCREEN-SKIN-BRIEF.md, SKIN-005). Target: 1080x2400 `skin-about-bg.png`, opaque, 9:20 portrait; hilltop tower vista in top band, calm below. Credit cost: UNVERIFIED.
  > Full-height portrait phone background, 9 by 20, hand-painted pastoral fantasy scene in watercolor and gouache with clean expressive ink linework and soft colour fills. Warm lantern light from the upper left. Painted detail only in the top band: a hilltop stone watchtower and a distant castle on a ridge under towering soft cumulus clouds in an open pale-to-blue sky, fading into slate. Below the top band the image is a calm, dark slate wash with only faint grass at the bottom edge and no focal object. Palette: Ink Night, Slate Ledger, Old Vellum, Leaf green, Aged Bronze, Candle gold on the tower windows only. Original design, no text, no letters, no logo, no watermark.

- [ ] **SKIN-006: Ornate frame, 9-slice** (SCREEN-SKIN-BRIEF.md, SKIN-006). Target: 512x512 `skin-frame-9slice.png`, transparent; 96 px slices; flat transparent centre, bronze/vine/leaf corners. Credit cost: UNVERIFIED.
  > Square ornate picture frame for a phone screen, 512 by 512, hand-painted pastoral fantasy style in watercolor and gouache with clean expressive ink linework. Bronze, vine and leaf ornaments in all four corners only. Thin Aged Bronze double-line edges along the straight sides, repeating cleanly along each side so they stretch without seams. Perfectly symmetric on all four sides, flat straight-on view. The centre is fully transparent and empty. Palette: Aged Bronze, Leaf green, Candle gold highlight in the ornaments only, a soft Ember accent. No flame or dragon-scale border, no glow, no gloss. Transparent background. Original design, no text, no letters, no figures.

- [ ] **SKIN-007: Panel, 9-slice** (SCREEN-SKIN-BRIEF.md, SKIN-007). Target: 192x192 `skin-panel-9slice.png`, transparent; 40 px slices; flat transparent centre. Credit cost: UNVERIFIED.
  > Square card panel frame, 192 by 192, hand-painted pastoral fantasy style in watercolor and gouache with clean expressive ink linework. A rounded card border in soft Aged Bronze wash, Old Vellum inner edge, a small leaf-and-vine ornament in each corner only, plain straight edges that repeat cleanly along each side. Perfectly symmetric on all four sides, flat straight-on view. Transparent centre, flat, nothing inside. Palette: Slate Ledger, Aged Bronze, Leaf green, Candle gold in the corner ornaments only. Original design, no text, no letters, no figures.

- [ ] **SKIN-008: Divider rule** (SCREEN-SKIN-BRIEF.md, SKIN-008). Target: 1024x48 `skin-divider.png`, transparent; horizontal stretch; leaf sprig at centre. Credit cost: UNVERIFIED.
  > Horizontal ornamental divider rule, 1024 by 48, hand-painted watercolor and gouache with clean expressive ink linework. A thin Aged Bronze line with a small leaf sprig at the centre and a tiny Ember dot, tapering to fine ends. Straight, horizontal, perfectly symmetric left to right, one row only, centred vertically on a fully transparent background, nothing else on the canvas. Palette: Aged Bronze, Leaf green, Ember dot. Original design, no text, no letters, no figures.
