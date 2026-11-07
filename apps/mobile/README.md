# @companion/mobile

Expo (React Native, TypeScript) Android-first app. Proposed in ADR-0005. Reuses `@companion/core`. No network calls, analytics, ads, or Blizzard API.

## Commands

- `npm run typecheck -w @companion/mobile` (also part of root `npm run typecheck`)
- `npx expo export --platform android` (run in this folder; bundle check)
- `npx expo start --android` (needs an emulator or device)
- Unit tests live in `test/` and run with the root `npm test`.

## Layout

- `src/persistence.ts`: AsyncStorage-backed state/prefs using core `parseState`/`exportState`; storage is injected (`KeyValueStorage`) so it is unit-tested without React Native.
- `src/reminders.ts`: pure function computing reminder times before the next daily/weekly reset. `src/reminderScheduler.ts` is the thin expo-notifications wrapper. Reminders are opt-in (off by default), local only, and rescheduled on start and on any setting or reset-schedule change.
- `src/screens/*`: Checklist, Characters, Activities, Settings, About. Navigation is a simple tab state (no navigation library).
- `metro.config.js`: watches the workspace and maps core's `./x.js` imports to `./x.ts`.

## Known gaps / TODO

- App icon and adaptive icon are not set in `app.json` (TODO). `apps/web/public/icon.svg` is the reference design; export PNGs from it by hand or via an approved asset pipeline. No binary art is committed.
- `android.package` is a placeholder (`org.example.companionforever`); the owner must choose the real id before any store build.
- Not run on a device or emulator yet; only typecheck, unit tests, and a Metro bundle were verified.
- Exact-time notifications are not requested; Android may deliver reminders a few minutes late (best effort).
- Dependency licenses for Expo/React Native packages still need the C-10 check.
