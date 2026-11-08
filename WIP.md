# WIP — active work

**Updated:** 2026-11-07

## Done this session (evidence)

- Core library `packages/core`: reset math, checklist store, strict validation, provider contract with provenance, synthetic/manual providers. Tests: 17 passing.
- Web app `apps/web` (React + Vite PWA, local-only storage, manual checklist, import/export, user-set reset times). `npm run typecheck`, `npm run build` passed; storage tests: 4 passing.
- Negative canaries C-02..C-09 as Vitest tests (22 tests), shown to fail on in-memory violations. C-01 (gitleaks) and C-10 (license check) still pending. Total run: 43 passing, `npx vitest run`, 2026-11-07.
- 17 hand-authored original SVG icons in `icons-and-imagery/final/` (valid XML). Image-model briefs in `icons-and-imagery/` for hero art and illustrations.
- Fix (2026-11-07, uncommitted): toggling a task now sets the UI `now` to the same Date used for the completion (`apps/mobile/src/App.tsx`), and core `isCompleteNow` tolerates up to 5 min of future skew (`CLOCK_SKEW_TOLERANCE_MS`; 1-day-ahead and garbage still rejected; 3 new tests in `packages/core/test/reset.test.ts`). Characters empty state moved above the form. Ran: `npm run typecheck` ok; `npx vitest run` 94 passing; `npx expo export --platform android` ok; emulator (Pixel_7_API34, Expo Go) screenshots `fix-*.png` in scratchpad: toggle shows done immediately, 5/5 shows all-done art at once, Characters empty state visible without scrolling.
- CI workflow written but **not yet run on GitHub**.

## Next (ordered)

1. Confirm first CI run on GitHub; fix failures.
2. Owner: enable branch protection, secret scanning, private vulnerability reporting; decide ADR-0003 (provisionally implemented) and ADR-0004.
3. Primary-source audit of Blizzard terms (M0), "Forever" naming check.
4. Component tests (needs jsdom/testing-library), accessibility audit, icon wiring into the UI.
5. Reminders (local notifications for resets), activity templates (original content only).
6. Dependency license check (C-10).

Product-form correction (ADR-0005, Proposed; owner decision pending):

7. Scaffold `apps/mobile` (Expo, React Native, TypeScript) reusing `packages/core`.
8. Port UI from `apps/web` to `apps/mobile`.
9. Convert `apps/web` to an About page redirecting to store listings.
10. Store-policy audit (Google Play policies, Data safety form, content rating; App Store for iOS); verify Expo/React Native licenses.

## Blocked

- Funding: awaiting Sponsors enrollment and written compliance clearance (ADR-0002).
- Real API integration: awaiting M0 compliance results.
- Hero/illustration art: needs an image model (owner to authorize Adobe connector or supply a key).

## Update: mobile scaffold (2026-11-07)

- `apps/mobile` (Expo/React Native, Android first) created: checklist, characters, activities, settings, About, opt-in reset reminders. Verified: root typecheck, 53 tests, web build, `expo export --platform android` all pass. **Not yet run on a device or emulator.**
- Placeholders: `android.package` (`org.example.companionforever`), no app icon. `apps/web` bumped to React 19 for Expo dependency hoisting.
- Next: emulator run, app icon (use `icons-and-imagery/`), C-10 license check, convert `apps/web` to About page.

## Update: emulator verified (2026-11-07)

- Android emulator (AVD Pixel_7_API34, Android 14) installed; app runs in Expo Go. Safe-area layout bugs fixed and confirmed by screenshot. 53 tests and typecheck pass.
- Next: app icon, real Android package id, tab bar polish, C-10 license check, About-page conversion of `apps/web`, Firefly authorization (owner) for art queue.

## Update: ADR-0006 Battle.net login (2026-11-07) — Proposed, awaiting owner decision

- Wrote `docs/adr/0006-blizzard-account-login.md` (Status: Proposed; docs only, no code, not committed). Options A (Custom Tabs + minimal token-exchange backend), B (PKCE public client), C (client-credentials lookup), D (manual only).
- Primary sources read 2026-11-07: Blizzard Developer API Terms (last updated 2019-10-01: 30-day TTL, 36,000 calls/hour, privacy policy, attribution, no password collection, API key confidentiality), oauth.battle.net OIDC discovery (no PKCE advertised), Play Data safety help, Expo SecureStore, Cloudflare Workers pricing.
- **UNVERIFIED:** developer-portal guides are JavaScript-rendered and could not be read, so PKCE support, scopes (`wow.profile`), the `/profile/user/wow` endpoint, token lifetime/refresh and redirect-URI rules are unconfirmed. Owner action 1 in the ADR.
- Recommendation: keep manual entry as the default. Use B if Blizzard confirms PKCE public clients, otherwise A1 (backend-terminated redirect with a one-time handoff) on Cloudflare Workers Free behind a feature flag. Reject C.
- Proposed (not added): canaries C-11 (no client secret in app) and C-12 (no WebView/password field in auth), plus a C-03 host allowlist change. All need owner sign-off.
- Next: owner reads portal guides, confirms ToU clause letters, decides the option; agents then add a `DECISIONS.md` row only after owner decision.

## Update: UI frames, backgrounds, button sprites; real-device install (2026-11-07)

- Branch main. Added `Background`, `Panel` (bronze frame, corner ornaments) and `GameButton` (9-slice sprites: primary/secondary/danger, normal/pressed/disabled) in `apps/mobile/src/ui.tsx`; used across all tabs. Original hand-authored SVG in `icons-and-imagery/final/btn-*.svg`, PNGs in `apps/mobile/assets/art/ui/`; provenance logged.
- Verified: `npm run typecheck` clean; `npx vitest run` 94/94; x86_64 release build run on emulator with screenshots of every tab; arm64 release APK installed (not launched) on the owner's Pixel and opened fine. Canary C-03 failure seen mid-session was a generated, git-ignored `apps/mobile/android/` folder; folder deleted, canary unchanged.
- Fixed: background banding, 1px seams inside 9-slice buttons.
- Known: full-width GameButtons end ~6dp short (marginRight 6); native Switch and row checkboxes not sprite-styled; Windows 260-char path limit breaks in-repo native builds (build from a short-path copy such as C:\cfb with `buildStagingDirectory`); tab row scrolls, About partly clipped.
- Added `icons-and-imagery/UI-KIT-BRIEF.md` (UI-001..006 AI-art prompts for the owner to generate; tool terms UNVERIFIED).
- Next: owner decision on ADR-0006 (Battle.net login) after reading portal guides; fix button width; sprite-style Switch/checkboxes; script for short-path builds.
