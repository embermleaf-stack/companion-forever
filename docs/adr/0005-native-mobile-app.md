# ADR-0005: Native mobile app (Android first, iOS later)

- **Status:** Proposed
- **Date:** 2026-11-07
- **Decider:** pending owner
- **Class:** Architectural

## Context

The owner clarified the product form: Companion Forever is a **native Android app** (iOS later), distributed through Google Play (and later the Apple App Store). It is not a website or PWA. Any website is only an About page that redirects to the store listings. The existing `apps/web` React PWA prototype was a misread of the requirement; it becomes the About page only. `packages/core` (pure TypeScript: reset math, checklist store, validation, provider contract) is platform-independent and reusable.

This partially supersedes the "PWA" element of [ADR-0003](0003-proposed-architecture.md) (the API/PostgreSQL/provider-adapter elements are not addressed here). ADR-0003 listed "native mobile apps" as an alternative citing cost and store policies; those concerns now apply directly.

## Decision (proposed)

Build `apps/mobile` with **React Native + Expo (TypeScript)**, reusing `packages/core`. Local-first storage on device; local notifications for reset reminders. `apps/web` is reduced to a static About page linking to store listings. Android first; iOS after Android is stable.

## Options considered

| Option | Pros | Cons |
|---|---|---|
| **React Native + Expo (recommended)** | Reuses `packages/core` and TypeScript skills unchanged; one codebase for Android and iOS; Expo provides notifications, storage, and build tooling | Dependency on Expo/RN release cadence; native modules may need dev builds; licenses to be verified |
| Flutter | Single codebase, strong UI toolkit | Dart: `packages/core` must be rewritten or bridged; separate toolchain |
| Native Kotlin (Android) + Swift (iOS) | Best platform fidelity and access | Two codebases; `packages/core` rewritten twice; highest cost; slower iOS parity |

## Consequences

- `apps/web` UI is ported to React Native; the web app is converted to an About page.
- Store distribution brings policy obligations: Google Play Developer Program Policies, Apple App Store Review Guidelines (iOS phase), privacy labels / Data safety form, and content rating. Contents of these policies are **not yet verified**; a store-policy audit is required (see [LICENSING.md](../LICENSING.md)).
- Independence/trademark disclaimer and the no-ads, no-paywall, funding-on-hold boundaries must be reflected in store listings; store review may interact with these (to be assessed, not assumed).
- Expo/React Native licenses (believed MIT) must be verified and recorded; dependency license check (C-10) applies.
- Whether a backend is still needed (ADR-0003) remains open; the local-first design allows an offline-only first release.
- Developer account fees, signing keys, and key custody are new operational concerns (keys never in Git).
- Requires owner decision before implementation beyond scaffolding.
