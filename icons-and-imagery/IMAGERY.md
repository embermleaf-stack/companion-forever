# Imagery briefs

Always supply [STYLE-GUIDE.md](STYLE-GUIDE.md) and its negative prompt with these.

Use the pastoral hand-painted terms in [STYLE-GUIDE.md](STYLE-GUIDE.md#pastoral-hand-painted-direction-owner-request-2026-11-07). Negative prompt (in STYLE-GUIDE) includes "named artist, film still, recognizable character".

## 1. Hero banner — `final/hero.webp` (2400×900, plus 1200×450)

- **Scene:** a cozy cartographer's study at late afternoon seen through an arched window; a lantern and open trail-map ledger on a desk; towering soft clouds, rolling meadows, and a winding footpath outside; a distant stone watchtower on a hill; no characters.
- **Composition:** subject on right third; left 40% calm, low-detail, and low-contrast for overlaid text.
- **Prompt:** "Wide hand-painted pastoral fantasy illustration in watercolor and gouache of a cartographer's study at late afternoon, arched window onto towering soft cumulus clouds, lush rolling meadows with wind-swept grass and a winding footpath, distant stone watchtower on a hill, bronze lantern and open trail-map ledger on a wooden desk, gentle warm light, clean expressive ink linework with soft color fills, calm negative space on the left, original design, no text, no people."
- **Alt text:** "A lantern-lit study with a map ledger overlooking rolling hills at dusk."

## 2. App background texture — `final/bg-parchment.webp` (1024×1024, seamless tile)

Subtle Old Vellum paper grain with faint hand-drawn compass lines. Very low contrast (must not impair 4.5:1 text contrast). Provide a dark variant on Slate Ledger.

## 3. Empty-state illustrations (SVG or PNG 480×360, transparent)

| File | Used when | Concept |
|---|---|---|
| `empty-characters.png` | no characters yet | an empty satchel hanging on a peg, a quill beside it |
| `empty-activities.png` | no activities yet | a blank scroll unrolling with a lantern weighing one end |
| `empty-checklist-done.png` | everything complete | a sleeping fox beside a banked ember fire |
| `error-generic.png` | app error | a snapped quill and a spilled ink pot (friendly, not alarming) |
| `offline.png` | offline notice | a lantern on a hill with a closed signpost |

## 4. Onboarding panels (3 images, 800×600)

1. "Add your characters" — traveler's sketch of a roster page.
2. "Plan your day and week" — hourglass beside a ledger.
3. "Your data stays with you" — a lockbox with a leaf-shaped keyhole.

## 5. Social preview — `final/social-preview.png` (1280×640)

Hero-style art with the app lantern icon; reserve the left 45% for the title text added in post. Must include no Blizzard marks and no suggestion of endorsement. Add the disclaimer line in post: "Independent fan-made tool. Not affiliated with Blizzard Entertainment."

## 6. Reset-timer progress art (optional, 600×120)

Horizontal strip: a trail with a lantern traveling left to right as the reset approaches. Provide a clean empty trail and a lantern sprite separately so the UI can animate it (respecting reduced motion).

## Acceptance checklist

- [ ] No people, factions, or recognizable game imagery
- [ ] Left-side text safe zones respected where specified
- [ ] WebP/PNG under 300 KB each where possible
- [ ] Alt text and provenance entries filled
- [ ] Owner approval recorded
