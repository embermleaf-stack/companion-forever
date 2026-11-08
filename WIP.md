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

## Update: Battle.net import scaffolding, PKCE primary, flag OFF (2026-11-07) — nothing works against real Blizzard yet

- Branch main, uncommitted (orchestrator reviews before commit). Owner direction recorded in ADR-0006 (still Proposed): login wanted, temporary token, characters cached locally only and purged with the app; owner cannot register the client yet, so PKCE (option B) is the primary path and the backend handoff (A1) is only a config-selected interface with a throwing stub.
- **Nothing here has talked to Blizzard.** All behaviour is covered by unit tests against a synthetic fake server (injected fetch/clock/random). Feature flag `FEATURE_BATTLENET` (`apps/mobile/src/config.ts`) is false; AuthConfig is absent unless `EXPO_PUBLIC_BNET_*` env vars are set at build time. No hostnames, client id or secret in Git; canary C-03 unchanged and green.
- Core (`packages/core`): `Character.source/importedAt/blizzardId` (optional; old saved data still loads), `purgeExpired`, `removeApiDerived`, `applyRetention`, `disconnectProvider`, `mergeImported`, `mapProfileResponse` (response shape UNVERIFIED, fields minimized), fixture `fixtures/battlenet/profile-user-wow.synthetic.json`.
- Mobile (`apps/mobile/src/battlenet/`): `pkce.ts` (own SHA-256, RFC 7636 vector test), `auth.ts` (buildAuthorizeUrl, parseRedirect, exchangeCode with no client secret; 400/401 -> `pkce-not-supported-or-invalid` -> "Sign-in not available yet"), `tokenStore.ts` + `secureTokenStore.ts` (expo-secure-store; expiry minus 60 s; no refresh), `provider.ts` (BattleNetProvider: 401, 429 local back-off, malformed, empty), `signIn.ts`, `handoff.ts` (fallback stub), `webAuth.ts` (expo-web-browser, system browser only), `services.ts` wiring. UI: `screens/BattleNetSection.tsx` (Settings, flag-gated), "imported" tag and attribution in Characters, attribution in About (flag-gated). Purge runs at start and on foreground. Backup export and import drop API-derived records.
- Dependencies added (all MIT, C-10 green): expo-secure-store, expo-web-browser, expo-crypto. `app.json`: `android.allowBackup=false`, `scheme=companionforever`, plugins added.
- Tests actually run 2026-11-07: `npm run typecheck` clean; `npx vitest run` 8 files, 144 tests passed (core retention 20, mobile battlenet 30; all canaries green); `npx expo export --platform android` ok. **Not run:** device or emulator (no UI check of the new section; flag off so it is invisible anyway), backup/reinstall test of allowBackup, anything against Blizzard.
- **Owner approval pending:** attribution wording (`BLIZZARD_ATTRIBUTION` in `apps/mobile/src/format.ts`) and the plain-text "Sign in with Battle.net" label.
- Known gaps: Settings "Delete all data" does not yet clear the stored token (tokens expire; wire it when the flag goes live). Redirect handling relies on openAuthSessionAsync with the custom scheme; whether Blizzard accepts that redirect form is UNVERIFIED. expo-linking not added (not needed).
- Owner-only actions still needed: register developer client (`docs/BLIZZARD-CLIENT-SETUP.md`), read portal guides to settle F3-F7 (PKCE without secret, scopes, endpoint, lifetime, redirect forms), decide the ADR, hosting only if the A1 fallback is needed, approve canaries C-11/C-12 and any C-03 allowlist change, privacy policy/Data safety, LICENSING.md review, qualified legal review. Nothing is marked compliant.
- Next task: owner registers the client, then follow section 5 of `docs/BLIZZARD-CLIENT-SETUP.md` on emulator-5554 and record the F3/F7 answers.

## Update: screen-skin system and art briefs (2026-11-08)

- Added full-screen skin system (apps/mobile/src/skin.ts, skinLayout.ts, ScreenBackground/ScreenFrame in ui.tsx). All skins disabled by default; EXPO_PUBLIC_SKIN_DEMO=1 enables placeholder skins only. Verified: typecheck clean, vitest 167/167, emulator screenshots (demo and flag-off). Placeholders are programmatic stand-ins, not final art.
- Known: EXPO_PUBLIC_* is baked in at bundle time and Gradle caches the bundle (delete android/app/build bundle+asset outputs to change the flag); nested panel-in-frame borders look busy; content hard-cut at frame bottom; ~10MB decoded bitmap per 1080x2400 background (prefer a shared background).
- Briefs for owner-generated art: icons-and-imagery/UI-KIT-BRIEF.md (UI-001..006) and SCREEN-SKIN-BRIEF.md (SKIN-001..008); specs in SCREEN-SKIN-SPEC.md.
- Raw Midjourney downloads moved to icons-and-imagery/midjourney-originals/ (git-ignored; output terms UNVERIFIED). Owner confirmed Midjourney as the tool (2026-11-08); plan/license terms still unchecked.
- New art in staging/regen/ reviewed: 010, 011, 012, 013, 015 good; 014 has black bars (needs crop/expand); 005 usable, owner requesting a broken-fountain-pen redo. Not yet integrated.
- Phone: last installed build is the pre-skin arm64 build (installed, never launched); reinstall after next verified change.

## Update: Midjourney regen batch integrated; crash fix; day/night brief (2026-11-08)

- Integrated (provisional, Midjourney, license UNVERIFIED): ART-005 error pen (960x720), ART-013 hero (1200x450, web+mobile About), ART-014 social preview (1280x640; PNG 1.3MB, JPG 169KB for GitHub), ART-015 trail (1200x240), ART-012 six avatars (320x320, hashed per character), ART-011 dark texture at opacity 0.08 (contrast >= 4.67 for ember worst case; 0.08 is the ceiling). ART-010 light texture left disabled until a light theme exists. Details in provenance.md "Regen batch integration (2026-11-08)".
- Fixed crash: "Add character" with an empty name threw inside a setState updater (`run` in App.tsx); now evaluated against a state ref and shown as a message with the error art.
- Verified: typecheck clean, vitest 167/167, expo export and web build OK, emulator screenshots (checklist, characters, about, error). arm64 build (built after the last source change) installed on the phone, never launched.
- Added day/night theme set to SCREEN-SKIN-BRIEF.md (THEME-D/N BG, FRAME, PANEL). Theme system (light palette, parchment buttons, system-follow + override) not started.
- Next: theme system; owner generates six day/night images; then register skins; wire Settings "Delete all data" to clear the Battle.net token; owner registers Blizzard client.

## Update: art prompts and divider (2026-11-08)

- All 36 paste-ready prompts (ART, THEME, UI, SKIN) now start with job id + title and end with `--ar N:N` (Midjourney ignores ratios written in words; earlier outputs came back square for that reason). Plant ornaments are now hawthorn sprigs with small, sparse red berries (signature motif, STYLE-GUIDE.md). THEME day/night backgrounds include a small cottage in the same place (lit windows and lantern posts at night) and a hawthorn bush.
- SKIN-008 divider (Midjourney, hawthorn sprig) processed with Adobe background removal and sliced into left/centre/right caps plus a tiling line in staging/regen (git-ignored). Not wired into the app yet.
- THEME-D-BG first attempt arrived square (1024x1024) and without the cottage; owner is regenerating with --ar 9:20.
- UI-005 stays 1:1 (2x2 grid), though the brief's sheet size says 512x256; fix the size text if the layout changes.

## Update: prompt format (2026-11-08)

- Every art prompt block is now two lines: `#JOB-ID short title` (tag so downloaded file names begin with the job id) and the prompt, ending ` --ar N:N [--tile] --no <list>`. Exclusions moved from the description to the Midjourney `--no` list (negative words in the description were read as positives). Copy only the two lines inside the fence; paste mistakes (heading/fence characters after `--ar`) caused the "Aspect ratio should be of the format width:height" error. 36 prompts, copies identical across prompts-copy-paste.md, art-queue.md, UI-KIT-BRIEF.md.
- SKIN-001 candidates reviewed (originals in midjourney-originals, git-ignored): v1 (736x1632, 9:20, dark, cream strips ~30px each side, no baked border) preferred after crop; v2 (816x1456, 9:16) has a baked bronze rectangle that would misalign across aspect ratios. Pending: crop v1, regenerate day theme from it.

## Update: painted dark background wired in (2026-11-08)

- SKIN-001 (Midjourney, upscaled then downscaled to 1080x2400 JPEG q65, ~430 KB) is now the shared background for all six screens (apps/mobile/src/skin.ts; drawn Background stays as fallback; placeholder skins only with EXPO_PUBLIC_SKIN_DEMO=1). Provisional; license UNVERIFIED. Text readability measured on worst pixel: header/tabs 5.03-5.11:1, footer 4.86:1, onboarding 6.1-6.2:1, headings/labels about 5.9:1, via backing alphas 0.75-0.8 and text chips. Muted #B9AE93 and ember are not used directly on the painting.
- Verified: typecheck clean, vitest 167/167, expo export OK, emulator screenshots (onboarding, checklist, activities, settings, about). Characters with a list of characters not viewed after the change. arm64 build installed on the owner's phone, never launched.
- Open: frame art (SKIN-006/007), divider wiring (SKIN-008 parts in staging/regen), day theme (THEME-D-BG regenerate with --ar 9:20), light-mode palette and parchment buttons, Blizzard client registration (owner), Delete-all-data token wipe.

## Update: Characters background (SKIN-002) wired (2026-11-08)

- Characters screen now uses its own painting (bg-characters.jpg, 1080x2400 JPEG q65, 188 KB; Midjourney, upscaled, cropped of cream paper edges, provisional, license UNVERIFIED); other screens keep the night meadow (SKIN-001). Worst-pixel contrast with backing: header/tabs 5.0, message line 10.3, footer 5.05, headings/labels 6.0 (alphas unchanged). Verified: typecheck clean, vitest 172/172, expo export OK, emulator screenshots (characters empty/with two characters, checklist). arm64 build installed on phone, never launched.
- SKIN-003 (activities) candidate: richer forest-at-night painting with one signpost per side (approved by owner pending upscale; not yet wired). SKIN-004 old-prompt candidate (workshop shelves) reviewed; new richer prompts for SKIN-004/005 given to owner.
- Observed: character avatars show as cream squares on the dark UI; consider circular/transparent avatars.
- Note for owner: Midjourney filenames contain the account name; it is stripped from all committed files.

## Naming review: Forever Companion, Preliminary (2026-11-08)

- New `docs/NAMING-REVIEW-forever-companion.md` (Status: Preliminary; not legal advice; docs only, not committed; no Accepted decision changed; package id unchanged).
- Agent risk rating: HIGH for "Forever Companion", MEDIUM-HIGH for "Companion Forever" as a public name. Reasons: Blizzard sells "World of Warcraft®: Forever" ("WoW: Forever", launched 2026-11-04, Blizzard News primary source), which settles the HANDOFF "Forever" edition question as a name (API coverage still UNVERIFIED); "Companion" echoes Blizzard's retired "WoW Companion App"; a CurseForge WoW addon named "Forever Companion" plus about six GitHub WoW: Forever tools (one named "Companion-Forever") already exist; "Forever Companion" was also an adult AI-chatbot brand.
- Trademark registries (USPTO, EUIPO, TMview, WIPO, UK IPO) not searched (JavaScript-only); owner must search by hand. Recommendation: choose a distinctive public name without "Forever"/"Companion" (shortlist in the doc), then a professional clearance search, then an ADR (Protected area).
- Next: owner picks candidates and runs registry/store/domain searches; decision recorded as an ADR.

## Naming review: Hawthorn Journal, Preliminary (2026-11-08)

- Owner chose public name "Hawthorn Journal" (codename and package id unchanged). New `docs/NAMING-REVIEW-hawthorn-journal.md` (Preliminary, not legal advice), linked from the Forever Companion review; new `docs/adr/0007-public-app-name.md` (**Proposed**, Protected). Docs only, not committed; no app code or display strings changed.
- Agent rating: MEDIUM overall. Low for Blizzard marks/§2(m) (no listed mark; avoid "Encounter Journal"/"Adventure Guide" in copy), exact-name conflicts, store fit, domains (exact .com/.app/.dev no DNS; GitHub `hawthornjournal` free). Main risk: international registration HAWTHORN WO0000001879894 by Near Studios Inc., Class 9 game software incl. mobile (seen via UK IPO journal search text; page 403, UNVERIFIED), for their cozy RPG *Hawthorn* (Steam, TBA). `hawthorn.app` taken by a hiking app.
- Owner-only: WIPO IR 1879894, USPTO/EUIPO/TMview/UK IPO searches (steps in the review §4 and ADR-0007 checklist), store/domain/handle checks, professional knock-out. If HAWTHORN is live for Class 9 mobile games in launch markets, use a fallback (Thornbook, Waymark Journal, Hedgerow Journal).
- Next: owner runs the checks and accepts or rejects ADR-0007; only then rename display strings (file list in the ADR).

## Light (day) theme (2026-11-08, uncommitted)

- Added Auto/Light/Dark theme: `src/theme.ts` (tokens, `resolveTheme`, `parseThemePref`), `src/ThemeContext.tsx`, pref persisted as `Prefs.theme` (unknown -> auto), Settings "Appearance" section, tokens applied in ui/App/screens/Onboarding/ResetStrip (no colour literals outside theme.ts), status bar follows theme, `app.json` userInterfaceStyle "automatic" (build script syncs an existing android/ strings.xml).
- Day art: interim `bg-day.jpg` for all screens in light mode; 11 original light sprites (`build-light-sprites.mjs`). Contrast tables in `icons-and-imagery/provenance.md`.
- Tests run: `npm run typecheck` clean; `npx vitest run` 181 passed (10 files); `npx expo export --platform android` OK; x86_64 build installed on emulator and checked in light, dark, Auto-follows-system, forced Light/Dark; arm64-v8a installed on the owner's phone (not launched).
- Open: owner to replace bg-day.jpg with a properly upscaled file; splash screen is still dark in light mode; day Characters shares the day painting.

## Update: art batch filed; day background upscaled (2026-11-08)

- Day background (THEME-D-BG, tower and clouds) replaced by the upscaled version (1080x2400 JPEG q65, 184 KB); splash backdrop (UI-010) staged (splash-backdrop.jpg, 310 KB). Also staged but not yet wired: bg-night-tower.jpg (THEME-N-BG), bg-activities.jpg (SKIN-003), bg-settings.jpg (SKIN-004), frame-hawthorn.png (SKIN-006 cutout, 9-slice corner 270 px). Candidates in originals (git-ignored): SKIN-007 panel, SKIN-008 plain divider, UI-007/a/b banners, UI-008 buttons (6 not 9; prompt rewritten with 'exactly nine'), UI-009 lantern flicker (10 frames), all with white or black backgrounds needing cutouts.
- Naming: owner chose 'Hawthorn Journal' as working public name; ADR-0007 is Proposed; main risk is a possible 'HAWTHORN' Class 9 mark (Near Studios) UNVERIFIED; owner to search registries. App display name unchanged until confirmed.
- Next rounds: (1) wire night-tower/activities/settings backgrounds, frame, divider; (2) title banner + splash animation (needs name); (3) panels and wide buttons; app icon (hawthorn sprig) pending owner art.

## Update: public name now Hawthorn Ledger (docs only, 2026-11-08, uncommitted)

- Owner direction: public name is **Hawthorn Ledger** (not Hawthorn Journal, not Forever/Companion Forever). Codename and package id unchanged. ADR-0007 stays **Proposed**; manual registry checks not done. Owner accepts the residual Near Studios HAWTHORN risk (owner risk acceptance, not a finding that it is gone). New open check: "Ledger" vs LEDGER word mark (Class 42, UNVERIFIED), Ledger wallet brand, accounting apps.
- Files: `docs/BLIZZARD-CLIENT-SETUP.md` rewritten (HTTPS redirect per F7, GitHub Pages callback, exact form values, secret handling); `docs/adr/0007-public-app-name.md` (owner note, options, decision, checklist, files list for Ledger); `docs/NAMING-REVIEW-hawthorn-journal.md` (update section, UK IPO journal URL as corroboration, contents not read); `docs/NAMING-REVIEW-forever-companion.md` (section renamed to Ledger). No app code, app.json, or art changed. Not committed. Tests: none run (docs only).
- Not updated on purpose: `icons-and-imagery/ICONS.md` alt text still says "Companion Forever" (display name not yet changed; ADR-0007 says change only when Accepted). `docs/adr/0006` attribution example still "Companion Forever". No "Hawthorn Journal" found in icons-and-imagery prompts or wordmark notes.
- **Blocker for Blizzard test:** `apps/mobile` still uses `companionforever://bnet-callback` as the redirect. The app code must switch to the HTTPS callback page (and handle the app-scheme handoff) before the first real sign-in. GitHub Pages is not enabled yet (owner). Blizzard client not registered yet (owner; client secret stays out of chat and Git).
- Next: owner enables GitHub Pages (Source = GitHub Actions) and registers the Blizzard client with the values in BLIZZARD-CLIENT-SETUP.md; owner runs the Ledger registry/store checks in ADR-0007; then an agent changes the callback code (separate task, Sonnet tier, with the boundary review).
