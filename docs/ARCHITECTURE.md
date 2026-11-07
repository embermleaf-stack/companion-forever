# Architecture (proposed — not implemented)

**Status:** Proposed; see [ADR-0003](adr/0003-proposed-architecture.md) (PWA element partially superseded by [ADR-0005](adr/0005-native-mobile-app.md), pending acceptance). Nothing here is built.

## Components

```text
Android / iOS app (TypeScript) <--> Companion API (TypeScript) <--> PostgreSQL
                           |
                     provider adapters
                      /            \
             Blizzard OAuth/API   permitted local snapshots
                                      ^
                               optional WoW Lua addon
                                      |
                              user-controlled sync agent
```

- **Mobile app:** native Android first, iOS later; proposed React Native + Expo in `apps/mobile` reusing `packages/core` ([ADR-0005](adr/0005-native-mobile-app.md), Proposed). Accessible (WCAG 2.2 AA target as a guide), local-first, works offline for manual checklists, local notifications for reset reminders.
- **Website:** About page only (`apps/web`), redirecting to the Google Play / App Store listings. Not the product.
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
