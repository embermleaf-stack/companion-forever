# Art generation queue

Ordered by value to the Android app first, then marketing. Each job cites its brief in [ICONS.md](ICONS.md) or [IMAGERY.md](IMAGERY.md). Every prompt needs the [STYLE-GUIDE.md](STYLE-GUIDE.md) palette and this negative prompt where the tool supports one:

`logo, text, watermark, signature, existing game character, orc, tauren, murloc, lion crest, wolf crest, red versus blue factions, flaming border, glowing blue rune, hearthstone, photorealistic, 3d render, lens flare, blurry, extra fingers, low contrast, brand name, named artist, film still, recognizable character`

If the tool has no negative-prompt field, append `Avoid: <the same list>` to the prompt. Whether the Firefly UI has a negative-prompt field is UNVERIFIED.

Credit cost for every job is UNVERIFIED. Log actual cost in [credit-ledger.md](credit-ledger.md).

Rule: generated output is concept material only. Finals for the app icon and SVG icons are human-drawn or human-edited (see ICONS.md and the README rules).

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
