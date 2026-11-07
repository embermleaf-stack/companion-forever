# HANDOFF — Companion Forever

**Updated:** 2026-11-07
**Project phase:** planning / pre-MVP
**Repository:** https://github.com/embermleaf-stack/companion-forever
**Public distribution:** intended, not yet production-approved
**Code license:** GPL-3.0-only for original project code

## Resume instructions (mandatory)

Read, in order: `HANDOFF.md`, `README.md`, `AGENTS.md`, `docs/GOVERNANCE.md`, `DECISIONS.md`, `WIP.md`, and relevant ADRs. Some files may not yet exist; record missing governance files as setup work rather than assuming their contents. Inspect current repository and open issues before editing. Never infer successful implementation from a plan. At session end, update HANDOFF and WIP with evidence and next steps.

## Mission

Create an independent, accessible, free, open-source, mobile-first character and activity companion for World of Warcraft. Reproduce useful *planning and tracking* functionality of the discontinued official Companion App, not restricted remote gameplay actions. The working codename is `companion-forever`; public product branding requires separate trademark review.

## Verified repository state at handoff

- Public GitHub repository exists, default branch `main`.
- README initially contained only the project heading; a project README is being established.
- Offline-first prototype exists (core library, PWA, canary tests); no API integration, rights-cleared quest catalog, or addon sync exists. See WIP.md for evidence.
- Original code license chosen: GNU GPL v3.0 **only**, not 'or later'.
- Funding provider/account not yet selected; no payment link approved.
- The exact status, existence, and API availability of any game edition named 'Forever' must be independently verified. Do not treat earlier conversational claims as validated research.

## Architecture proposal (subject to ADR approval)

- TypeScript mobile-first PWA, accessible desktop experience.
- TypeScript backend with provider adapters, PostgreSQL persistence.
- Blizzard OAuth / developer APIs only for authorized server-side reads; verify namespaces and endpoint behavior.
- Optional Lua addon writes supported SavedVariables; user-controlled local sync agent reads snapshots after game save and uploads with explicit consent.
- Quest and activity catalog uses only original, licensed, or explicitly authorized data. Keep provider provenance and version metadata.
- Separate read-only data collection, derived task recommendations, and user-entered checklist state.
- No in-game automation, remote mission collection, botting, combat logic, protected API bypass, or client instrumentation.

## Non-negotiable boundaries

1. Never import Blizzard art, game files, Wowhead data, or other protected content into this public repository without documented rights.
2. No scraping of game clients, third-party sites, or Blizzard web pages; use approved APIs and rights-cleared material.
3. No API secrets, user tokens, account identifiers, character exports, or personal data in Git.
4. No ads, paywalls, sale of API data, or monetization of Blizzard API-derived functionality.
5. No funding buttons until the terms and funding arrangements are reviewed; donations are **not automatically safe** under the API terms.
6. API caching/retention, attribution, privacy, deletion, security, and incident procedures must be implemented from current contractual requirements, not assumed.
7. Avoid implying affiliation or endorsement; choose public branding after trademark review.
8. Implement negative canary tests for each forbidden capability; tests must be shown to fail on deliberate violations.
9. Do not claim legal approval or guaranteed non-infringement. Seek qualified legal review before production use of Blizzard APIs.
10. AI agents may propose decisions but must not silently change legal/compliance boundaries or rewrite durable decisions.

## Immediate work queue

1. Create `AGENTS.md`, `DECISIONS.md`, `WIP.md`, `docs/GOVERNANCE.md`, `docs/ARCHITECTURE.md`, `docs/LICENSING.md`, `docs/CANARIES.md`, and ADR directory.
2. Conduct primary-source audit of current Blizzard developer API terms, trademark policy, game addon policy, and game-specific API support. Cite source URL, date checked, exact operative clause, and compliance test.
3. Resolve the 'Forever' product naming ambiguity and verify what Blizzard officially exposes.
4. Decide whether GPL-3.0-only covers all original components, or whether an AGPL variant is desired for network-hosted server code; changes require owner approval.
5. Define synthetic data fixtures, schema, CI, secret scanning, dependency license checks, and contribution process.
6. Clarify whether GitHub Sponsors, Ko-fi, Open Collective, or other funding can be used without violating Blizzard's API terms. Seek written clarification where necessary.
7. Prototype a no-Blizzard-data UI before any real API integration.

## Acceptance gates for first external release

- Legal/compliance review completed and documented.
- Confirmed authorized API integration and permitted retention rules.
- Trademark-safe public branding and unambiguous independent-project disclaimer.
- Security and privacy policy, data deletion flow, accessible UX.
- Provenance manifest for every third-party source.
- Negative canary suite, CI and dependency audit passing.
- No unauthorized copyrighted assets, scraping, automation, or monetization.

## Session-end handoff template

Record: date, branch/commit, files changed, tests run with results, decisions made, new risks, unresolved questions, and exact next task. Never mark a test as passing unless it was actually executed.
