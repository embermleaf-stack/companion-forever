# Companion Forever

> **Codename:** companion-forever · **Status:** planning / pre-MVP · **License:** GNU GPL-3.0-only

An independent, free and open-source **native mobile app (Android first, iOS later)** for tracking World of Warcraft characters, quests, and recurring activities. Initial research targets the game experience referred to as **Forever**; support and API coverage are **unverified** and must be established before implementation claims.

**Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment.** World of Warcraft, Battle.net, and associated names and artwork are the property of their respective owners. This repository does not grant rights to Blizzard content or API data.

## Start here (humans and AI agents)

1. [HANDOFF.md](HANDOFF.md) — current status, next actions, blockers, and session resumption.
2. [AGENTS.md](AGENTS.md) and [docs/GOVERNANCE.md](docs/GOVERNANCE.md) — contributor rules and authority.
3. [DECISIONS.md](DECISIONS.md) — durable decisions.
4. [WIP.md](WIP.md) — active work.
5. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — proposed system architecture.
6. [docs/LICENSING.md](docs/LICENSING.md) — source restrictions and release gates.

Governance documents now exist, but the architecture is a proposal. Do not assume a documented design is implemented. See also [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [docs/CANARIES.md](docs/CANARIES.md).

## Vision

A mobile-first activity planner and character dashboard that recaptures the useful **information and planning** aspects of the discontinued WoW Companion App, without automating gameplay or impersonating Blizzard's official services.

**Potential features:** character roster, gear and achievement summaries, daily/weekly checklist, quest-chain planning, multi-character progress, reset reminders, and optional local-addon synchronization. Availability depends on authorized data sources and game-specific capabilities.

## Proposed architecture (not implemented)

```text
Android / iOS app (TypeScript, React Native + Expo; proposed in ADR-0005)
   <--> Companion API (TypeScript) <--> PostgreSQL
                           |
                     provider adapters
                      /            \
             Blizzard OAuth/API   permitted local snapshots
                                      ^
                               optional WoW Lua addon
                                      |
                              user-controlled sync agent
```

The product is a native app distributed via Google Play (and later the App Store), not a website or PWA. Any website is only an About page redirecting to the store listings. Shared logic lives in `packages/core`; `apps/web` (the earlier PWA prototype) will become the About page. See [ADR-0005](docs/adr/0005-native-mobile-app.md) (Proposed).

The addon cannot perform arbitrary network requests from within the WoW sandbox. SavedVariables snapshots require a separately installed, user-controlled sync process and must respect save timing. No gameplay automation, protected-function bypass, credential collection, client modification, or scraping.

## Data and licensing boundaries

- Original project code is licensed under **GPL-3.0-only**; this does **not** license Blizzard trademarks, art, game assets, API data, or third-party databases.
- Register any API-connected application with Blizzard and comply with its current developer terms, including applicable retention, attribution, security, and non-monetization conditions.
- Never scrape Wowhead, Blizzard websites, or game clients; never import third-party datasets without explicit permission and documented provenance.
- Do not commit API keys, access tokens, player data, copyrighted game assets, or licensed catalog exports.
- Keep the application free, with no advertisements, paid features, or paid access to API-derived data.
- Funding links are **not enabled** pending review of Blizzard's API monetization restrictions and the chosen funding provider's terms.
- Validate actual API support before promising Forever, Retail, or Classic compatibility.
- Obtain legal review before any production deployment involving Blizzard data. This project does not claim legal clearance.

## Milestones

- **M0 — Compliance and feasibility:** verify game/product naming, Blizzard API coverage, permissions, addon capabilities, trademark and funding constraints.
- **M1 — Foundation:** governance, ADRs, CI, test canaries, schemas, and original synthetic fixtures.
- **M2 — Read-only character dashboard:** approved OAuth/API integration only.
- **M3 — Activity planner:** resets, manual checklists, and rights-cleared quest metadata.
- **M4 — Optional addon sync:** user-controlled, consent-based, with safe snapshot ingestion.
- **M5 — Public beta:** security, privacy, accessibility, legal and compliance review.

## Contributing

Issues and pull requests are welcome once contribution guidelines and tests are in place. All code and test data must be original or compatible with the project's license; contributions must not introduce protected Blizzard content or unapproved external datasets.

## License

Original project code: [GNU General Public License v3.0 only](LICENSE) (SPDX: `GPL-3.0-only`). Third-party content remains under its owners' terms.
