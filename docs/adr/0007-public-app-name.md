# ADR-0007: Public app name "Hawthorn Journal"

- **Status:** Proposed
- **Date:** 2026-11-08
- **Decider:** owner
- **Class:** Protected (branding/trademark)

> Not legal advice. Nothing here is a trademark clearance, a compliance finding or an approval. Evidence and sources: [NAMING-REVIEW-forever-companion.md](../NAMING-REVIEW-forever-companion.md) and [NAMING-REVIEW-hawthorn-journal.md](../NAMING-REVIEW-hawthorn-journal.md) (both Preliminary, checked 2026-11-08). Items not read on a primary source are marked **UNVERIFIED** there.

## Context

- DECISIONS.md (2026-11-07): "The public product name stays the codename 'Companion Forever' until trademark review." The Android package id `io.github.embermleaf.companionforever` is an Accepted decision and cannot change after the first Play upload.
- Branding/trademark is a Protected area (docs/GOVERNANCE.md): owner decides, after documented review, recorded as an Accepted ADR plus a DECISIONS.md row.
- Blizzard Developer API Terms §2(m): no Blizzard trademark in the app title or URL, and nothing that makes Blizzard appear to endorse or be affiliated with the app; §4: no implied relationship (https://www.blizzard.com/en-us/legal/a2989b50-5f16-43b1-abec-2ae17cc09dd6/blizzard-developer-api-terms-of-use, checked 2026-11-08). AGENTS.md hard boundary 7 (no implied affiliation) applies.
- Store rules: Google Play title 30 characters or less, Impersonation and IP policies; Apple 2.3.7, 4.1, 5.2.1 (URLs and quotes in the naming reviews).
- The first review rated "Forever Companion" HIGH and "Companion Forever" MEDIUM-HIGH. On 2026-11-08 the owner chose **"Hawthorn Journal"**. The second review rates it **MEDIUM** overall:
  - Blizzard marks / §2(m) / implied affiliation: Low. No listed Blizzard mark; "Journal" is a WoW UI feature word (Encounter Journal / Adventure Guide, `journal-*` API endpoints), not a listed mark.
  - Exact phrase: Low. No app, game, repository or brand found; exact-match domains show no DNS delegation; GitHub `hawthornjournal` free at check.
  - "Hawthorn" in games, Class 9: **Medium, High if confirmed.** International registration HAWTHORN WO0000001879894, Near Studios Inc., Class 9 game software including mobile (UK Trade Mark Journal 2025/043, seen via search text only, UNVERIFIED), for their cozy fantasy RPG *Hawthorn* (Steam app 3078150, release TBA).
  - Other "Hawthorn" brands (hawthorn.app hiking app, Hawthorn Football Club app, Hawthorn Games publisher): Low.
  - "Journal" crowding (Apple Journal, Day One, etc.): Low.
  - Store naming fit: Low (16 characters).

## Options

| Option | Summary | Assessment |
|---|---|---|
| A. **Hawthorn Journal** (owner's choice) | Public display name; codename and package id unchanged | Fits the hawthorn/lantern/journal art. No Blizzard mark. Main open risk: Near Studios HAWTHORN Class 9 mark and *Hawthorn* game. |
| B. Forever Companion | Earlier working name, reversed | **Rejected.** "Forever" is Blizzard's current product subtitle ("World of Warcraft®: Forever", "WoW: Forever"); "Companion" echoes Blizzard's retired "WoW Companion App"; same name used by a CurseForge WoW: Forever addon and several GitHub tools; former adult AI-chatbot brand. Rated HIGH. |
| C. Companion Forever | Current codename as public name | **Rejected** as public name for the same reasons (rated MEDIUM-HIGH; `daddler/Companion-Forever` uses it for the same concept). Kept as internal codename. |
| D. Fallbacks: Thornbook, Waymark Journal, Hedgerow Journal | Used if the owner's checks rate A as HIGH | No GitHub hits, no app found by web search (2026-11-08); store, domain and trademark status UNVERIFIED. They avoid "Hawthorn", so the Near Studios mark does not reach them. |

## Decision (proposed)

1. Adopt **"Hawthorn Journal"** as the public display name of the app, store listings and the About website.
2. The internal codename `companion-forever`, the repository name, the package/bundle id `io.github.embermleaf.companionforever`, the URL scheme `companionforever`, and storage keys stay unchanged.
3. **No display-name change is made in code, store text or art until the owner has completed the checklist below and changed this ADR to Accepted.** If the checks show the Near Studios HAWTHORN mark live or pending for Class 9 mobile game software in a launch market (US, EU, UK), the owner picks a fallback (option D) instead, unless a professional advises otherwise.
4. Store and About copy describe compatibility in plain words only, and do not use "Encounter Journal", "Adventure Guide", "companion journal", "WoW", "Warcraft", "Forever" or any Blizzard mark in the title or URL.

## Consequences

- Positive: removes the Blizzard-product echo ("Forever", "Companion") and the crowded-niche conflict; name matches the existing visual identity; no package-id change needed.
- Negative / risks: possible conflict with Near Studios' HAWTHORN mark and game (same class, overlapping audience, similar cozy art); "Journal" is weak and may set diary expectations for a checklist app; `hawthorn.app` domain is taken. A forced rename after launch would cost store ranking and reviews.
- Mitigations: owner registry checks before acceptance; professional knock-out search before public launch; icon and art kept clearly distinct from *Hawthorn*'s key art; descriptive store subtitle; existing "Independent fan-made tool. Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment." disclaimer (wording still needs owner approval).
- Compliance impact: none on API data handling. No new canary is required; a future optional canary could assert that the display name and store title contain no Blizzard mark (propose separately).

## Owner-only checklist (before Accepted)

- [ ] WIPO Brand DB (https://branddb.wipo.int/): open IR **1879894** (HAWTHORN, Near Studios Inc.); record designations, Class 9/41/42 goods, status.
- [ ] USPTO (https://tmsearch.uspto.gov/, TSDR https://tsdr.uspto.gov/): `HAWTHORN`, `HAWTHORN JOURNAL`, owner `Near Studios`, Classes 9/41/42/28.
- [ ] UK IPO (https://trademarks.ipo.gov.uk/ipo-tmtext) and the journal page https://www.ipo.gov.uk/t-tmj/tm-journals/2025-043/WO0000001879894.html.
- [ ] EUIPO eSearch plus (https://euipo.europa.eu/eSearch/) and TMview (https://www.tmdn.org/tmview/): `HAWTHORN`, `HAWTHORN JOURNAL`.
- [ ] Google Play and App Store browser search: `Hawthorn Journal`, `Hawthorn`; Steam, itch.io, CurseForge, Wago: `Hawthorn`.
- [ ] Domain: decide whether to register `hawthornjournal.app` (or `.com`/`.dev`); confirm availability at a registrar.
- [ ] Handles: GitHub org `hawthornjournal` (free at check), store developer name, any social handles.
- [ ] Professional trademark knock-out search or opinion for launch markets (before public launch; owner decides budget).
- [ ] Record results (date, database, query, hits) in this ADR; set Status to Accepted or choose a fallback; add a DECISIONS.md row superseding the 2026-11-07 naming row.
- [ ] Approve final disclaimer and attribution wording.

## Files and strings that change when Accepted (NOT edited now)

Display name only; identifiers stay.

| File | Current string | Change |
|---|---|---|
| `apps/mobile/app.json` | `"name": "Companion Forever"` | `"name": "Hawthorn Journal"`. **Keep** `"slug": "companion-forever"` (EAS project link), `"scheme": "companionforever"`, `ios.bundleIdentifier` and `android.package`. |
| `apps/mobile/src/App.tsx` line ~167 | header title text `Companion Forever` | `Hawthorn Journal` |
| `apps/mobile/src/format.ts` | `BLIZZARD_ATTRIBUTION`: "... Companion Forever is an independent project ..." | "... Hawthorn Journal is an independent project ..." (wording still owner-approved) |
| `apps/mobile/src/screens/About.tsx` | no app name found in the file today | Add/confirm the display name if the About screen shows one |
| `apps/web/index.html` | `<title>Companion Forever</title>`; meta description "Companion Forever is a free, open-source ..." | `Hawthorn Journal` in both |
| `apps/web/src/App.tsx` lines ~43, ~50, ~57 | `<h1>Companion Forever</h1>` (twice); "Companion Forever is a free, open-source ..." | `Hawthorn Journal`. **Keep** `GITHUB_URL`/`LICENSE_URL` (repository name unchanged). |
| `README.md` line 1 | `# Companion Forever` | `# Hawthorn Journal` plus a line "(codename: companion-forever)" |
| `HANDOFF.md` line 1 | `# HANDOFF — Companion Forever` | Optional: add public name; codename may stay |
| `.github/FUNDING.yml` line 1 | comment "Companion Forever — GitHub Sponsors configuration (INACTIVE)" | Comment text only; file stays inactive (ADR-0002) |
| `docs/BLIZZARD-CLIENT-SETUP.md` line 13 | example client name "Companion Forever" | "Hawthorn Journal" |
| `docs/adr/0006-blizzard-account-login.md` line 134 | attribution example with "Companion Forever" | Do not rewrite; note the rename in a follow-up if ADR-0006 is Accepted |
| `icons-and-imagery/ICONS.md` line 11 | alt text "Companion Forever app icon: ..." | "Hawthorn Journal app icon: ..." |
| `icons-and-imagery/UI-KIT-BRIEF.md` line ~215 | "Until that review is recorded, do not put a name into any prompt, file name or art." | Point to this ADR; banners stay text-free (UI-007 renders the name as live text) |
| Art in post-production | ART-014 social preview (title text added in post), splash/title banner text | Add "Hawthorn Journal" as text in post; never baked into generated art |
| Store listing text (not in repo yet) | n/a | Title "Hawthorn Journal" (<= 30 chars, optional descriptor), short/full description with plain compatibility wording and disclaimer |
| `DECISIONS.md` | 2026-11-07 naming row | New row recording the Accepted name (do not delete the old row) |

Unchanged on purpose: `package.json` `"name": "companion-forever"`, `apps/mobile/src/persistence.ts` storage keys (`companion-forever:*`; renaming would orphan saved data), `apps/mobile/src/battlenet/config.ts` `APP_SCHEME`, `apps/mobile/src/battlenet/tokenStore.ts` `TOKEN_KEY`, backup file name `companion-forever-backup.json` in `apps/mobile/src/screens/Settings.tsx` (optional rename later, harmless either way).
