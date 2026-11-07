# AGENTS.md — Rules for AI agents and contributors

Applies to every AI agent and human editing this repository. Authority and decision process: [docs/GOVERNANCE.md](docs/GOVERNANCE.md).

## Session start

Read in order: `HANDOFF.md`, `README.md`, this file, `docs/GOVERNANCE.md`, `DECISIONS.md`, `WIP.md`, relevant `docs/adr/`. Inspect `git status`, recent commits, and open issues before editing. A plan is not an implementation: never infer that something works because it is documented.

## Session end

Update `HANDOFF.md` and `WIP.md` with: date, branch/commit, files changed, tests actually run and their results, decisions made, new risks, open questions, exact next task. Never record a test as passing unless it was executed.

## Hard boundaries (from HANDOFF.md; non-negotiable)

1. No Blizzard art, game files, Wowhead data, or other protected content without documented rights.
2. No scraping of game clients, third-party sites, or Blizzard web pages.
3. No API secrets, tokens, account identifiers, character exports, or personal data in Git.
4. No ads, paywalls, paid features, or monetization of API-derived functionality.
5. `.github/FUNDING.yml` stays inactive until `docs/SPONSORSHIP.md` gates are met and documented.
6. No gameplay automation, botting, protected-function bypass, client instrumentation, or credential collection.
7. No implied affiliation with or endorsement by Blizzard Entertainment.
8. No claims of legal clearance. Do not state that something is "compliant" or "approved" without a recorded review.

## What agents may and may not do

- **May:** implement approved work, propose ADRs, add tests/fixtures (synthetic only), fix bugs, update docs.
- **May not:** silently change a legal/compliance boundary, rewrite or delete an Accepted decision, change the license, enable funding, add a dependency with an incompatible license, or weaken/skip a canary test. Propose instead, via a new ADR with status `Proposed`, and flag it in `WIP.md`.
- When uncertain whether something touches a boundary, stop and ask the owner.

## Working conventions

- Small, reviewable commits; Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`).
- Branch from `main`; open a PR; do not push to `main` once branch protection is enabled.
- Test data is synthetic and original. Record provenance for every third-party source in `docs/PROVENANCE.md` (create when first needed).
- Cite primary sources (URL, date checked, clause) for any compliance claim.
- Each source file carries `SPDX-License-Identifier: GPL-3.0-only`.
