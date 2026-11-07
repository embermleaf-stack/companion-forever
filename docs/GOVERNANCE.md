# Governance

**Status:** initial draft, 2026-11-07. Adopted by owner on merge.

## Roles

- **Owner / maintainer:** `embermleaf-stack`. Final authority on scope, license, legal/compliance boundaries, funding, and branding.
- **Contributors:** humans proposing changes via pull request.
- **AI agents:** act on behalf of a contributor or the owner. They may propose; they do not hold decision authority ([AGENTS.md](../AGENTS.md)).

## Decision classes

| Class | Examples | Who decides | Record |
|---|---|---|---|
| **Protected** | License, Blizzard API/data boundaries, funding/monetization, branding/trademark, privacy & data retention, adding canary exemptions | Owner only, after documented review | ADR (Accepted) + `DECISIONS.md` |
| **Architectural** | Stack, data model, provider adapters, hosting | Owner approves; contributors/agents propose | ADR |
| **Routine** | Bug fixes, refactors, docs, tests | Reviewer approval on PR | PR history |

## ADR process

1. Copy `docs/adr/0000-template.md` to the next number.
2. Set status `Proposed`; open a PR.
3. Owner sets `Accepted`, `Rejected`, or `Superseded by ADR-NNNN`. Never edit an Accepted ADR's decision; supersede it.
4. Add a one-line entry to `DECISIONS.md`.

## Compliance changes

Any change that touches a Hard Boundary requires: cited primary source (URL, date checked, clause), a compliance test or canary ([CANARIES.md](CANARIES.md)), and owner sign-off. "Seems fine" is not a review. Legal review is required before production use of Blizzard data; this project does not claim legal clearance.

## Review requirements

- All changes to `main` go through a PR once branch protection is on.
- CODEOWNERS routes protected files (governance, licensing, funding, canaries, CI) to the owner.
- CI (secret scan, license check, canary suite) must pass before merge.

## Handoff discipline

`HANDOFF.md` is the resumption point; `WIP.md` is active work; `DECISIONS.md` is the durable index. They must be updated at the end of each session.

## Amendments

This document changes by PR approved by the owner.
