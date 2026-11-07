# Icon briefs

Always supply [STYLE-GUIDE.md](STYLE-GUIDE.md) and its negative prompt along with these.

## 1. App icon (priority 1)

- **Files:** `apps/web/public/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon.svg`, plus `final/app-icon.svg` master.
- **Concept:** a lantern with a small oak leaf-shaped flame, hanging from a curl of vine, on an Ink Night rounded-square. Ember flame, Aged Bronze lantern frame, Candle highlight.
- **Maskable:** keep all essential art inside the central 80% safe zone; fill the full square with Ink Night background.
- **Prompt:** "Flat-painterly app icon of a small bronze lantern with a leaf-shaped ember flame, hanging from a curling vine, centered on a deep ink-navy rounded square, warm candle glow, simple strong silhouette, hand-inked outline, storybook fantasy, original design, no text."
- **Alt text:** "Companion Forever app icon: a lantern with a leaf-shaped flame."

## 2. Cadence icons (24, 32, 64 px; SVG preferred)

| File | Meaning | Concept |
|---|---|---|
| `cadence-daily.svg` | resets every day | rising sun over a short horizon line |
| `cadence-weekly.svg` | resets every week | seven-notch moon/phase wheel |
| `cadence-once.svg` | one-time | single bronze key |
| `state-done.svg` | complete | checked leaf (leaf shape with check cut-out) |
| `state-todo.svg` | incomplete | empty outlined leaf |
| `reset-clock.svg` | time until reset | hourglass with ember sand |

Done vs. todo must differ by **shape** (filled+check vs. outline), not only color.

## 3. Activity category icons (64 px, rounded-square frame)

Generic categories for the user's checklist. Not tied to any game's specific content.

| File | Category | Concept |
|---|---|---|
| `cat-quest.svg` | Quests | scroll with a wax seal |
| `cat-dungeon.svg` | Group content | arched stone doorway with lantern |
| `cat-crafting.svg` | Crafting | anvil and small hammer |
| `cat-gathering.svg` | Gathering | satchel with herbs |
| `cat-exploration.svg` | Exploration | compass rose over a trail |
| `cat-social.svg` | Social/guild | two overlapping lanterns |
| `cat-collection.svg` | Collections | glass display jar with a feather |
| `cat-economy.svg` | Economy | coin purse |
| `cat-events.svg` | Events | pennant flag on a pole |
| `cat-custom.svg` | Custom | blank journal page with a quill |

## 4. Character placeholder avatars (128 px)

Neutral, class-agnostic silhouettes so users are not shown any game's classes: `avatar-1.svg` … `avatar-6.svg` — hooded traveler, cloaked wanderer with staff, helmed figure (plain helm, no horns), bard with lute, scout with bow, robed scholar. Faces hidden; simple, not resembling any named character.

## 5. UI glyphs (24 px, 2 px stroke, single color, `currentColor`)

`add`, `remove`, `settings`, `export`, `import`, `character`, `checklist`, `calendar`, `bell`, `info`, `warning`, `external-link`. Provide as one SVG sprite `ui-sprite.svg`. A standard open-license icon set may be used instead only if its license is recorded in provenance.

## Acceptance checklist

- [ ] Reads at 24 px as a silhouette
- [ ] Palette from Style Guide
- [ ] Nothing on the "Do not" list
- [ ] Provenance entry filled
- [ ] Alt text provided
