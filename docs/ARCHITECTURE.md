# Architecture (proposed — not implemented)

**Status:** Proposed; see [ADR-0003](adr/0003-proposed-architecture.md). Nothing here is built.

## Components

```text
PWA (TypeScript) <--> Companion API (TypeScript) <--> PostgreSQL
                           |
                     provider adapters
                      /            \
             Blizzard OAuth/API   permitted local snapshots
                                      ^
                               optional WoW Lua addon
                                      |
                              user-controlled sync agent
```

- **PWA:** mobile-first, accessible (WCAG 2.2 AA target), works offline for manual checklists.
- **Companion API:** auth, per-user data, provider orchestration. Server-side only access to Blizzard APIs.
- **Provider adapters:** one interface, multiple sources. Each adapter declares provenance, retention limits, and rights status. A no-Blizzard "manual/synthetic" provider ships first (M1/M2 prototype).
- **PostgreSQL:** separate tables/schemas for (a) provider-collected read-only data, (b) derived recommendations, (c) user-entered checklist state.
- **Addon + sync agent (M4, optional):** Lua addon writes SavedVariables only; the WoW sandbox cannot make network requests. A separately installed, user-controlled agent reads snapshots after the game saves and uploads with explicit consent.

## Principles

1. Read-only. No gameplay automation, remote actions, or client instrumentation.
2. Data separation: collected vs. derived vs. user-entered.
3. Provenance and version metadata on every catalog record.
4. Retention, deletion, and caching limits come from current Blizzard terms, enforced in code and tested.
5. Secrets via environment/secret store only; never in Git.
6. Free and ad-free: no feature gating by payment.

## Open questions

- Hosting model and whether server code should be AGPL (ADR-0004).
- Which Blizzard namespaces/endpoints exist for the target game (M0).
- Auth model for end users (Battle.net OAuth vs. local accounts).
