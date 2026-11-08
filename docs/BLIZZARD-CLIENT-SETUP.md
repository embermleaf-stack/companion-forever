# Blizzard developer client setup (owner checklist)

Status: draft for the owner. Related: [ADR-0006](adr/0006-blizzard-account-login.md) (Proposed). Nothing here has been run against Blizzard; every Blizzard-side detail below is **UNVERIFIED** until you read the developer portal in a browser. This is not legal advice or a compliance finding.

## 1. Before you register

- Read the current Blizzard Developer API Terms and the portal guides (OAuth, Authorization Code Flow, WoW Profile APIs) in a browser. Note: does the token endpoint accept a PKCE exchange without a client secret (finding F3)? Which redirect URI forms are allowed (F7)? Token lifetime (F6)? Exact profile endpoint and namespace (F5)?
- Decide to accept or reject ADR-0006. The feature stays OFF until you do.

## 2. Register the client

1. Sign in at the developer portal with your own account and create a client (portal: "Access > Clients").
2. **Name:** a name with no Blizzard marks (terms section 2(m)), for example "Companion Forever".
3. **Redirect URI:** `companionforever://bnet-callback` (the app scheme from `apps/mobile/app.json`, path from `DEFAULT_REDIRECT_URI`). If the portal only accepts HTTPS redirects, stop and tell the agent: the design then needs the handoff fallback (ADR option A1) or an HTTPS App Link page.
4. **Scope:** `wow.profile`.
5. Do **not** request `openid` unless needed.
6. The portal will show a client id and a client secret. **The secret must never go into this repository, the app config or the APK.** The PKCE path does not use it. If the exchange only works with the secret, that is the answer to F3: stop, and use the backend fallback (a secret in a host's secret store) instead of embedding it.

## 3. Where to put the client id

- The client id is not a secret, but still keep it out of Git unless you explicitly OK committing it.
- Put it in a local, git-ignored environment when building, for example `apps/mobile/.env.local` (confirm it is git-ignored first):

```
EXPO_PUBLIC_BNET_CLIENT_ID=<your client id>
EXPO_PUBLIC_BNET_AUTHORIZE_URL=<authorize endpoint from the portal/OIDC discovery>
EXPO_PUBLIC_BNET_TOKEN_URL=<token endpoint>
EXPO_PUBLIC_BNET_PROFILE_URL=<full account character list URL for your region>
```

- `EXPO_PUBLIC_*` values are embedded in the app bundle, so never put a secret there. Optional: `EXPO_PUBLIC_BNET_REDIRECT_URI` (default `companionforever://bnet-callback`).
- The hostnames are deliberately not in the source, so the canary C-03 allowlist is unchanged. Adding the real hosts to the repo (docs, tests) would need your sign-off on a C-03 allowlist change.

## 4. Turn the feature on for your own testing

1. In `apps/mobile/src/config.ts` set `FEATURE_BATTLENET = true` **locally only; do not commit it**.
2. Build a dev or release build for the emulator only (`emulator-5554`), not a published build.
3. Without a configured client the section shows "Status: not configured in this build".

## 5. Manual test script (emulator)

1. Open Settings. The "Battle.net import" section shows "signed out". Press "Sign in with Battle.net".
2. A Chrome Custom Tab opens on Blizzard's page (not inside the app). Confirm there is no password field in the app itself. Sign in and grant access.
3. Expected: the app returns, "Signed in." If instead the message is "Sign-in not available yet", the secret-less exchange was rejected (F3 answered: PKCE is not usable as-is). Record the result in WIP.md. If the browser does not return to the app, the redirect form was rejected or not handled (F7).
4. Press "Import characters". The Characters tab shows your characters with an "imported" tag and the attribution text. Record the count only, no names or ids, in WIP.md.
5. Close and reopen the app: characters and sign-in status persist.
6. Press "Disconnect Battle.net". Confirm: imported characters are gone, manually added ones remain, status is "signed out".
7. Sign in again, then wait until the token expires (or ask the agent to shorten the expiry in a local build): Import shows "Your Battle.net session expired".
8. Backup test: sign in and import, run `adb -s emulator-5554 shell bmgr backupnow --all` (or `bmgr` as available), uninstall the app, reinstall, and confirm there is no token and no imported characters.
9. Export a backup from Settings and confirm the file contains no imported characters and no token.
10. Do not commit screenshots or logs that show account data.

## 6. Still needed from you before any release

- Privacy policy text and Play Data safety answers; attribution wording approval (pending in WIP.md); trademark view on the words "Battle.net" in UI text.
- LICENSING.md row review for the Blizzard API terms; qualified legal review (HANDOFF boundary 9).
- Canaries C-11 (no client secret in the app) and C-12 (no WebView or password field in auth) and the C-03 host allowlist decision.
