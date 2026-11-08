# Blizzard developer client setup (owner checklist)

Status: draft for the owner (updated 2026-11-08). Related: [ADR-0006](adr/0006-blizzard-account-login.md) (Proposed), [ADR-0007](adr/0007-public-app-name.md) (Proposed; public name "Hawthorn Ledger"). Nothing here has been run against Blizzard; every Blizzard-side detail below is **UNVERIFIED** until you read the developer portal in a browser. This is not legal advice or a compliance finding.

Names used below: the public app name is **Hawthorn Ledger** (owner direction 2026-11-08, not yet Accepted). The codename `companion-forever` and the package id `io.github.embermleaf.companionforever` are unchanged.

## What we learned (2026-11-08)

- **F7 answered by the portal form:** the Battle.net "Create Client" form accepts only redirect URLs that start with `https://` or `http://`. Custom app schemes such as `companionforever://bnet-callback` are **not accepted**. So the Blizzard redirect must be an HTTPS page.
- **New redirect plan:** an HTTPS callback page on GitHub Pages reads the authorization result (`code`, `state`, or an error) from its query string and hands it to the app through the app scheme `companionforever://bnet-callback?code=...&state=...`. The app then performs the PKCE token exchange itself.
- **Not yet live:** GitHub Pages is not enabled for this repository as of 2026-11-08. The owner must enable it (Settings > Pages > Source = GitHub Actions) before the callback URL works.
- **Fallback:** if Blizzard rejects the PKCE exchange without a client secret (F3), use the backend handoff in ADR-0006 option A1. The secret then lives only in a host secret store, never in the app.
- **App code not yet changed:** `apps/mobile` still defaults the redirect to `companionforever://bnet-callback` (`DEFAULT_REDIRECT_URI`). The authorize request must send the HTTPS URL registered here, so the app default and the callback page need a code change before the first real test. This doc does not make that change.

## 1. Before you register

- Read the current Blizzard Developer API Terms and the portal guides (OAuth, Authorization Code Flow, WoW Profile APIs) in a browser. Note: does the token endpoint accept a PKCE exchange without a client secret (finding F3)? Token lifetime (F6)? Exact profile endpoint and namespace (F5)?
- Enable GitHub Pages for `embermleaf-stack/companion-forever` (Source = GitHub Actions) and confirm the callback page loads at the URL in step 2 below, before you save the Blizzard client.
- Decide to accept or reject ADR-0006. The feature stays OFF until you do.

## 2. Register the client

1. Sign in at the developer portal with your own account and create a client (portal: "Access > Clients").
2. Fill the form with these values:

| Field | Value |
|---|---|
| Client Name | `Hawthorn Ledger Dev` |
| Redirect URLs | `https://embermleaf-stack.github.io/companion-forever/bnet-callback` |
| Service URL | `https://github.com/embermleaf-stack/companion-forever` |
| Intended Use | `Free, open-source, independent Android app (not affiliated with Blizzard) that lets a player sign in with their own Battle.net account to import their World of Warcraft character list for personal checklist planning. Calls are made from the player's device to the Blizzard API with the player's own token. Character data is stored only on the device, is refreshed or deleted within 30 days, and is deleted on disconnect. No ads, no paid features, no data sales.` |

   - The Service URL field may instead take "I do not have a service URL" if the portal rejects the GitHub link. Record which option you used.
   - The Client Name has no Blizzard marks (terms section 2(m)). Do not add "WoW", "Warcraft" or "Forever" to it.
3. Scope: `wow.profile`.
4. Do **not** request `openid` unless needed.
5. Save. The portal then shows a Client ID and a Client Secret.

## 3. Handle the client id and client secret

- **Client ID:** not a secret, but keep it out of Git unless you explicitly OK committing it.
- **Client Secret:** never paste it into chat, Git, the app config, a store listing, or the APK. Keep it in your password manager only.
- **PKCE should not need the secret.** If the exchange only works with the secret, that is the answer to F3: stop, and use the backend fallback (ADR-0006 A1). The secret then goes only into a host secret store (for example a server environment variable), never into the app.
- Put the client id in a local, git-ignored environment when building, for example `apps/mobile/.env.local` (confirm it is git-ignored first):

```
EXPO_PUBLIC_BNET_CLIENT_ID=<your client id>
EXPO_PUBLIC_BNET_AUTHORIZE_URL=<authorize endpoint from the portal/OIDC discovery>
EXPO_PUBLIC_BNET_TOKEN_URL=<token endpoint>
EXPO_PUBLIC_BNET_PROFILE_URL=<full account character list URL for your region>
EXPO_PUBLIC_BNET_REDIRECT_URI=https://embermleaf-stack.github.io/companion-forever/bnet-callback
```

- `EXPO_PUBLIC_*` values are embedded in the app bundle, so never put a secret there.
- The hostnames are deliberately not in the source, so the canary C-03 allowlist is unchanged. Adding the real hosts to the repo (docs, tests) would need your sign-off on a C-03 allowlist change.
- The callback page must not load third-party scripts, must not log or store the query string, and must not contain any secret.

## 4. Turn the feature on for your own testing

1. In `apps/mobile/src/config.ts` set `FEATURE_BATTLENET = true` **locally only; do not commit it**.
2. Build a dev or release build for the emulator only (`emulator-5554`), not a published build.
3. Without a configured client the section shows "Status: not configured in this build".

## 5. Manual test script (emulator)

1. Open Settings. The "Battle.net import" section shows "signed out". Press "Sign in with Battle.net".
2. A Chrome Custom Tab opens on Blizzard's page (not inside the app). Confirm there is no password field in the app itself. Sign in and grant access.
3. Blizzard redirects to the HTTPS callback page. Confirm the page loads and then hands off to the app (if the browser does not redirect on its own, the page shows a button to open the app; record which happened).
4. Expected: the app returns, "Signed in." If instead the message is "Sign-in not available yet", the secret-less exchange was rejected (F3 answered: PKCE is not usable as-is). If the callback page loads but the app does not open, the app-scheme handoff is not working (record the browser and device). If Blizzard refuses the redirect at the form, F7 is confirmed again. Record the result in WIP.md.
5. Press "Import characters". The Characters tab shows your characters with an "imported" tag and the attribution text. Record the count only, no names or ids, in WIP.md.
6. Close and reopen the app: characters and sign-in status persist.
7. Press "Disconnect Battle.net". Confirm: imported characters are gone, manually added ones remain, status is "signed out".
8. Sign in again, then wait until the token expires (or ask the agent to shorten the expiry in a local build): Import shows "Your Battle.net session expired".
9. Backup test: sign in and import, run `adb -s emulator-5554 shell bmgr backupnow --all` (or `bmgr` as available), uninstall the app, reinstall, and confirm there is no token and no imported characters.
10. Export a backup from Settings and confirm the file contains no imported characters and no token.
11. Do not commit screenshots or logs that show account data, and do not commit the callback URL with a real `code` in it.

## 6. Still needed from you before any release

- Privacy policy text and Play Data safety answers; attribution wording approval (pending in WIP.md); trademark view on the words "Battle.net" in UI text.
- The public name "Hawthorn Ledger" is not Accepted yet (ADR-0007 checklist: registry and store checks, owner acceptance).
- LICENSING.md row review for the Blizzard API terms; qualified legal review (HANDOFF boundary 9).
- Canaries C-11 (no client secret in the app) and C-12 (no WebView or password field in auth) and the C-03 host allowlist decision (the GitHub Pages callback host is a new host to allowlist).
