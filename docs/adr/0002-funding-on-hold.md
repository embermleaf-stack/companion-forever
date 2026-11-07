# ADR-0002: Funding links disabled pending compliance clearance

- **Status:** Accepted
- **Date:** 2026-11-07
- **Decider:** owner (commits 2049306, 9170973)
- **Class:** Protected

## Context

Blizzard Developer API Terms §2(b) and §2(h) may restrict monetization related to API use. Whether voluntary repository-level sponsorship is permitted is unresolved. See [SPONSORSHIP.md](../SPONSORSHIP.md).

## Decision

`.github/FUNDING.yml` remains fully commented out. No funding links appear in the repo, app, or docs until the gates in SPONSORSHIP.md are met and documented.

## Consequences

CI canary C-05 enforces this. Reversing requires superseding this ADR with recorded clearance.
