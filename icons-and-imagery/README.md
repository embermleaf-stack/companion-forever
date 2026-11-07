# Icons and imagery — handoff briefs for an image-generation AI

These briefs are written to be given, one file at a time, to an image-generation AI (or a human illustrator). The goal is an **original high-fantasy look** for an independent companion app. It must feel at home next to fantasy-MMO tools without copying any existing game's art.

Files:

- [STYLE-GUIDE.md](STYLE-GUIDE.md) — palette, shapes, lighting, typography direction, and the hard "do not" list. **Give this to the AI with every other brief.**
- [ICONS.md](ICONS.md) — app icon, PWA icons, activity and cadence icons, UI glyphs.
- [IMAGERY.md](IMAGERY.md) — hero art, backgrounds, empty states, social preview.
- [PROVENANCE-TEMPLATE.md](PROVENANCE-TEMPLATE.md) — record to fill in for every delivered asset.

## Legal and compliance rules (binding)

These follow the repository's boundaries in [AGENTS.md](../AGENTS.md) and [docs/LICENSING.md](../docs/LICENSING.md).

1. **No Blizzard material as input.** Do not upload, link, or describe-by-name any Blizzard screenshot, icon, logo, or art as a reference. Do not prompt with "in the style of World of Warcraft", "Blizzard", or the names of its characters, factions, zones, or items.
2. **No look-alike of protected marks.** Avoid the specific devices listed in the Style Guide "Do not" section.
3. **Original output only.** Reject any result that resembles a recognizable existing character, logo, or icon. When in doubt, regenerate.
4. **Record provenance.** For each accepted asset, add a filled [PROVENANCE-TEMPLATE.md](PROVENANCE-TEMPLATE.md) entry in `provenance.md` (create it) with tool, model/version, date, prompt, license terms of the tool's output, and who reviewed it.
5. **Check the tool's terms.** The generator's terms must permit use of outputs in a GPL-3.0 open-source project and public redistribution. Note that copyright protection for purely AI-generated imagery is uncertain in many jurisdictions; the owner decides whether that is acceptable. Prefer human-edited or human-drawn finals for the app icon.
6. **No claim of affiliation.** Imagery must not suggest it is official, endorsed, or sponsored.
7. **Owner approval.** Assets are not merged until the owner approves them and the provenance entry exists.

## Delivery format

- Vector (SVG) where possible for icons; otherwise PNG with transparent background at the sizes listed.
- Put finished files under `apps/web/public/` (app icons) or `icons-and-imagery/final/` (everything else), named exactly as in the briefs.
- Keep source/prompt files under `icons-and-imagery/source/`.
- Every image needs alt text; supply it in the provenance entry.
