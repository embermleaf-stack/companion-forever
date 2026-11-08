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
