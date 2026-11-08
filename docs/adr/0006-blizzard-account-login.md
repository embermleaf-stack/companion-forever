# ADR-0006: Blizzard (Battle.net) account login for character import

- **Status:** Proposed
- **Date:** 2026-11-07
- **Decider:** pending owner
- **Class:** Protected (Blizzard API/data boundary, privacy and data retention, hosting) and Architectural

> Not legal advice. Nothing here is a compliance finding or legal clearance. Claims are tagged with their source; anything not read on a primary source is marked **UNVERIFIED**.

## Context

The owner wants the Android app ([ADR-0005](0005-native-mobile-app.md)) to let a player sign in with their Battle.net account and import the World of Warcraft characters on that account, instead of typing them in. Today the app has only `ManualProvider` and `SyntheticProvider` (`packages/core/src/provider.ts`).

Hard boundaries that apply (AGENTS.md): no secrets/tokens/personal data in Git (3), no monetization of API-derived features (4), no credential collection (6: the app must never see a Blizzard password), no scraping (2), no implied affiliation (7), no claims of legal clearance (8). HANDOFF.md boundary 6 requires caching, retention, attribution, privacy and deletion rules to come from the current contractual terms.

### Primary-source findings (all checked 2026-11-07)

Sources:

- **[TOU]** Blizzard Developer API Terms of Use, https://www.blizzard.com/en-us/legal/a2989b50-5f16-43b1-abec-2ae17cc09dd6/blizzard-developer-api-terms-of-use. Page states "Last updated: October 1, 2019". Sub-clause letters below follow the page's §14 survival references, because the rendered page does not show the letters. Treat each letter as approximate until the owner confirms it against the page.
- **[OIDC]** Battle.net OpenID discovery document, https://oauth.battle.net/.well-known/openid-configuration (official machine-readable metadata).
- **[PORTAL]** Developer portal guides: https://community.developer.battle.net/documentation/guides/using-oauth, `.../using-oauth/authorization-code-flow`, `.../getting-started`, `.../world-of-warcraft/profile-apis`. **These pages render their content with JavaScript, so a plain fetch returned only the page shell. Their contents could not be read and are UNVERIFIED.** The owner should read them in a browser (owner action 1).
- **[PLAY]** Google Play Console Help, "Provide information for Google Play's Data safety section", https://support.google.com/googleplay/android-developer/answer/10787469.
- **[EXPO]** Expo SecureStore docs, https://docs.expo.dev/versions/latest/sdk/securestore/.
- **[CF]** Cloudflare Workers pricing, https://developers.cloudflare.com/workers/platform/pricing/.

| # | Question | Finding | Source / clause | Status |
|---|---|---|---|---|
| F1 | Endpoints | issuer `https://oauth.battle.net`; `authorization_endpoint` `/authorize`; `token_endpoint` `/token`; `userinfo_endpoint` `/userinfo`; `revocation_endpoint` `/revoke`; introspection and device-authorization endpoints are also listed | [OIDC] | Verified (metadata only) |
| F2 | Grant types | `grant_types_supported` lists `authorization_code`, `client_credentials`, `implicit`, `refresh_token`, `device_code`, token-exchange and several Blizzard-specific grants. The metadata does not say which grants a third-party developer client may use | [OIDC] | Listed; availability to our client **UNVERIFIED** |
| F3 | PKCE / public clients | `code_challenge_methods_supported` and `token_endpoint_auth_methods_supported` are **absent** from the discovery document. No official statement that PKCE or public (secret-less) clients are supported was found. Community forum threads (not staff and not primary) suggest the token endpoint expects client credentials via HTTP Basic | [OIDC]; forum threads us.forums.blizzard.com/t/388 and /t/11513 (non-authoritative) | **UNVERIFIED: assume not supported** |
| F4 | Scopes | `scopes_supported` is absent from [OIDC]. That `wow.profile` (and `openid`) exist and that `wow.profile` is the scope for the account character list is **UNVERIFIED** (portal unreadable) | [OIDC], [PORTAL] | **UNVERIFIED** |
| F5 | Account character list endpoint | Believed to be `GET https://{region}.api.blizzard.com/profile/user/wow` with namespace `profile-{region}` and a user token carrying `wow.profile`. Not read on a primary source | [PORTAL] | **UNVERIFIED** |
| F6 | Token lifetime / refresh | Believed to be about 24 h with no refresh token for third-party auth-code clients. Not read on a primary source. [OIDC] lists a `refresh_token` grant but does not say who can use it | [PORTAL], [OIDC] | **UNVERIFIED** |
| F7 | Redirect URI rules (HTTPS only? custom schemes? exact match?) | Not read | [PORTAL] | **UNVERIFIED** |
| F8 | Client secret confidentiality | "You shall keep Your API Key confidential, and not share it with any third party." Report a compromised key immediately. §1 defines the API Key as "one or more OAuth clients ('API Key') provided to You by Blizzard" | [TOU] §2(l), §1 | Verified text. Our reading (shipping the secret in an APK would share it with every user) is an interpretation, not a legal finding |
| F9 | Passwords | "You shall not collect, store or otherwise intercept a player's Blizzard password" | [TOU] §2(p)(iii) | Verified text |
| F10 | Privacy | "You must post a privacy policy governing the use of the Data". Players must be informed if personal information is collected, used or stored. "You will strictly abide by Your privacy policy" | [TOU] §2(p) | Verified text |
| F11 | Retention / caching | "You must implement a maximum 30-day TTL (time-to-live) policy for all Data obtained through our APIs." WoW developers may refresh "by validating through an API if a character ID still exists"; if it does not, "delete the character information associated with that ID and not display that information" | [TOU] §2(s) | Verified text |
| F12 | De-linking / deletion | If a player asks to have their account de-linked (directly, via Blizzard, or otherwise), stop using that player's data and "delete all copies of the individual's Data" | [TOU] §11(c) | Verified text |
| F13 | Rate limit | "thirty-six thousand (36,000) calls to the Blizzard Developer API per hour". Third-party services may not be used to make additional requests on your behalf. Exceeding the limit can lead to suspension | [TOU] §2(r) | Verified text. A per-second limit is **UNVERIFIED** |
| F14 | Attribution / branding | "clearly and conspicuously identify Blizzard in Your Application as the source of the Data", without appearing to be endorsed or affiliated. No Blizzard trademarks in the application's title or URL. Trademark use needs prior written approval | [TOU] §2(m), §4 | Verified text |
| F15 | Monetization | No "Premium" for-pay feature versions, no charging for download or access, no donation interstitials before functionality, no video ads before a feature. No use of the APIs or Data for marketing. No selling or transferring Data, including derived data | [TOU] §2(b), §2(h), §2(i) | Verified text |
| F16 | Mobile apps | The terms do not address mobile apps specifically. §2 refers to "client libraries, desktop applications, services and daemons such as websites and web services" | [TOU] §2 | Verified text: mobile is neither named nor excluded |
| F17 | Termination | Blizzard may change, suspend or discontinue the API "at any time for any reason, without notice". On termination, stop using the API and Data and delete it | [TOU] §11(a) | Verified text |
| F18 | Distribution to users | Data may be provided to "end users for their personal use via Your Application" | [TOU] §2 | Verified text |
| F19 | Play "collection" | "'Collect' means transmitting data from your app off a user's device." Data "only processed locally on the user's device and not sent off device" need not be declared. Ephemeral in-memory processing may be exempt, but not if used for profiles. Sending to the developer's own server counts as collection. A deletion-request mechanism must be declared | [PLAY] | Verified text |
| F20 | Token storage | On Android, SecureStore values "are stored in SharedPreferences, encrypted with Android's Keystore system". Not preserved on uninstall. Cannot be restored from Auto Backup. Do not rely on it as the only copy of irreplaceable data | [EXPO] | Verified text |
| F21 | Free hosting | Workers Free: "100,000 per day" requests, "10 milliseconds of CPU time per invocation". The paid plan has a $5/month minimum. Behaviour when the free limit is exceeded is not stated for Workers | [CF] | Verified text. Cloudflare is a proprietary service; only our code would be open source |

## Options

### (A) Authorization-code flow in the system browser (Custom Tabs) with a minimal token-exchange backend that holds the client secret

The app opens `oauth.battle.net/authorize` in a Custom Tab (Expo `expo-web-browser` / `expo-auth-session`; library licenses to verify under C-10). It never opens a WebView and never shows its own password field (F9). A small backend holds the client secret (F8) and exchanges the code.

Recommended shape, **A1: backend-terminated redirect with a one-time handoff.** It is designed so the backend does not depend on PKCE support (F3):

1. The app creates a random `verifier` and calls `POST /start` with `S256(verifier)`. The backend returns a signed, short-lived `state` that binds the challenge, a nonce and an expiry (HMAC with a backend-only key).
2. The app opens `https://oauth.battle.net/authorize?client_id=…&redirect_uri=https://<backend>/callback&response_type=code&scope=wow.profile&state=…` in a Custom Tab. The user signs in on Blizzard's page. The app never sees the password.
3. Blizzard redirects to `https://<backend>/callback?code&state`. The backend verifies the `state` signature and expiry, exchanges the code with the client secret (HTTP Basic, F3), and stores the access token **encrypted in memory/KV for at most 60 seconds**, keyed by a random one-time `handoff` id that is bound to the challenge.
4. The backend redirects to an Android **App Link** (verified HTTPS on the same backend host, which serves `/.well-known/assetlinks.json`) carrying only `handoff`.
5. The app calls `POST /redeem {handoff, verifier}`. The backend checks `S256(verifier)`, returns the token once, and deletes the handoff.
6. The app calls the Blizzard profile API directly with the user token and keeps the token in SecureStore until it expires. The backend never sees character data.

Why not the simpler "app receives the code and posts it to the backend" design? Without PKCE at Blizzard, a code intercepted from a custom-scheme redirect could be redeemed by anyone through our backend. A1 means an intercepted app redirect yields only a useless `handoff` id.

A stateless variant, A2, avoids KV: the app sends an ephemeral public key in `/start`, and the backend returns the token encrypted to that key in the App Link redirect. It is more complex and is listed only as a fallback if KV is unavailable.

- Pros: the secret never leaves the backend (F8). The password never touches our code (F9). The backend stores no long-lived data and no character data. It is small (about 150 lines) and portable.
- Cons: it needs hosting, a domain for App Links, and incident handling for the secret. It is a single point of failure for sign-in, but not for the app, which still works offline and manually. Redirect URI rules (F7) are UNVERIFIED.

### (B) Backend-less PKCE public client

The app performs the auth-code flow with PKCE and exchanges the code itself without a secret.

- Valid **only if** Blizzard officially supports public clients with PKCE. That is **UNVERIFIED** and the discovery metadata does not advertise it (F3).
- Embedding the client secret in the APK to make this work is **rejected**: the secret is extractable, which would share it with every user (F8 reading).
- If Blizzard confirms in writing that public PKCE clients are supported, B becomes the preferred option (no hosting, no secret custody).

### (C) No login: manual character lookup using public / client-credentials data

The user types name and realm. A backend proxy holding the secret uses a client-credentials token to fetch public profile data. Whether public character profile endpoints accept client-credentials tokens is **UNVERIFIED** [PORTAL].

- Pros: no user account linkage and no user tokens.
- Cons: still needs a backend and secret custody. The proxy is an anonymous relay that spends our shared 36,000/hour quota (F13), so abuse is harder to control. It cannot list "my characters". It adds little over manual entry.

### (D) Do nothing

Keep `ManualProvider`. No Blizzard data, no API terms obligations, no backend.

- Pros: zero compliance surface. Already implemented.
- Cons: the owner's requested feature is absent.

## Decision (proposed)

**Not decided; owner decision required.** The agent's recommendation is at the end.

## Design details (apply to A; mostly also to B)

### Token handling

- Request only the scope needed for the character list (expected `wow.profile`, F4 UNVERIFIED). **Do not request `openid`** unless needed, so we do not receive BattleTag or account id claims.
- Keep the access token only in `expo-secure-store` (Keystore-backed, F20). Never put it in AsyncStorage, logs, crash reports, exports, or the existing JSON import/export feature.
- Exclude SecureStore from Android Auto Backup (`configureAndroidBackup: false`, F20).
- On expiry (F6 UNVERIFIED, assume about 24 h with no refresh), prompt the user to sign in again. Do not use a background refresh.
- On sign-out: call `/revoke` (F1) through the backend, since whether revocation needs client auth is UNVERIFIED. Then delete the SecureStore entry and all imported character data.

### Data minimization, retention and offline behaviour

- Map the response to `{ name, realm, className, level }` (the existing `Character` shape) plus the Blizzard character id, which is used only for the §2(s) existence check. Drop account ids, guild and other fields at the parsing boundary.
- Store imported characters on device only, tagged `source: blizzard`, with `importedAt`. **Purge or re-validate any Blizzard-sourced record older than 30 days** (F11). The purge runs at app start and on resume, so it also works offline.
- Offline: imported characters stay usable until their 30-day TTL expires, then they are deleted, not shown (F11). User-entered checklist state is user data and is kept. Only API-derived fields are purged, and the character can be converted to a manual entry if the user re-types it. **Whether the user may keep a manually re-typed copy is a question for the owner/legal review.**
- No server-side storage of tokens beyond the 60-second handoff, and no character data on the backend. The backend logs no codes, tokens or IP addresses beyond what the hosting platform logs by default (Cloudflare platform logging to be reviewed).
- De-link (F12): in-app "Disconnect Battle.net" wipes everything. We hold no server copies, so a Blizzard-initiated de-link request has nothing to delete server-side. Document this in the privacy policy.

### Provider adapter fit (`packages/core`)

- New `BattleNetProvider implements CharacterProvider` in `apps/mobile` (it needs network and secure storage), with `id = "battlenet"` and:
  - `provenance = { source: "Blizzard Battle.net API (user-authorized)", rights: "api-authorized", reference: "docs/LICENSING.md#source-register", retentionDays: 30 }`.
  - `rights: "api-authorized"` must not be used in a release until the LICENSING.md row for the Blizzard API terms is reviewed and signed off by the owner.
- Core addition (small, testable): a pure `purgeExpired(characters, now, provenance)` helper that enforces `retentionDays`, plus a `source`/`importedAt` field on `Character`. HTTP and auth stay out of core.
- The adapter takes an injected `fetch` so tests use synthetic fixtures only.

### Attribution and branding (F14, AGENTS.md boundary 7)

- Text near imported data and in About: "Character data provided by Blizzard Entertainment via the Battle.net API. Companion Forever is an independent project and is not affiliated with or endorsed by Blizzard Entertainment." Exact wording is for the owner to approve.
- Sign-in button is plain text, "Sign in with Battle.net". No Blizzard or Battle.net logos (§4). Trademark usage of "Battle.net" in UI text is to be covered by the pending trademark review.
- No Blizzard marks in the app title, package id or backend hostname (§2(m)). For example, the worker must **not** be named `battlenet-…`.

### Monetization (F15)

The app has no ads, no paywall, and no donation interstitials. Funding stays off (ADR-0002); §2(h) and §2(b) interplay with any future funding remains unresolved, per SPONSORSHIP.md. The login feature must never be gated.

### Backend hosting (owner constraint: free / open source)

| Host | Cost | Notes |
|---|---|---|
| Cloudflare Workers Free (+ KV for handoff) | $0 at 100,000 requests/day (F21) | Secrets via platform secret store (never in Git). The `workers.dev` host can serve `assetlinks.json` for App Links. Proprietary platform; our code stays GPL (ADR-0004 decides whether AGPL applies) |
| Deno Deploy / Vercel / Netlify functions free tiers | $0 (limits **UNVERIFIED**) | Similar model; not researched |
| Self-hosted (owner's machine or a VPS) | VPS costs money; home hosting needs an exposed HTTPS endpoint | Fully open stack, highest operational burden |

Expected load is tiny: about 3 requests per sign-in, with sign-in at most daily. Blizzard API calls go device-to-Blizzard and count against the single 36,000/hour client quota (F13). The app limits re-imports to a manual pull plus at most one automatic refresh per day.

### Threat model

| Threat | Mitigation |
|---|---|
| Password phishing / credential capture by the app | Custom Tabs only; no WebView for auth; no password fields (canary C-12 proposed) |
| Client secret leaked (repo, APK, logs) | Secret only in host secret store; C-01 secret scan; canary C-11 proposed (no `client_secret` / secret-looking literals in `apps/`); rotation runbook; notify Blizzard if compromised (F8) |
| Auth code interception (malicious app claims the redirect) | Redirect terminates at the backend over HTTPS; app receives only the one-time `handoff`, redeemable only with the app's `verifier` (A1); verified App Links instead of a custom scheme |
| CSRF / login mix-up | HMAC-signed, expiring `state` bound to the app's challenge |
| Backend used as an exchange oracle or for quota abuse | `/start` and `/redeem` rate-limited; handoff TTL 60 s and single use; backend never proxies data API calls; optional Play Integrity check (UNVERIFIED cost/terms) |
| Token theft on device | SecureStore/Keystore; excluded from backup; never exported; wiped on sign-out |
| Over-retention | 30-day purge (F11) tested with fixed clocks; deletion on de-link (F12) |
| Backend compromise | Holds no user data at rest beyond 60 s handoffs; secret rotation; minimal dependencies |
| Blizzard terminates or changes API (F17) | Feature flag; app degrades to manual mode; delete Data on termination |

### Google Play Data safety implications (not a determination)

- The access token passes through our backend during the handoff, so by the [PLAY] definition it is probably "collected" (sent to our own server), even if only briefly. Whether the ephemeral exemption applies is for the owner/legal review to decide.
- Character data goes Blizzard to device only. Under [PLAY] this is plausibly not "collected" by us, but the owner should confirm the declaration and not rely on this reading.
- Declare: encrypted in transit (HTTPS); deletion available in-app ("Disconnect Battle.net"); no sharing; no ads; no tracking.
- A privacy policy URL is needed for both Play and [TOU] §2(p) (F10). It can be hosted on the About page.

### Test plan (synthetic fixtures only; C-08 applies)

1. Fixtures `fixtures/battlenet/profile-user-wow.synthetic.json` (flag `synthetic: true`, invented names such as "Testwarden"/"Examplia", invented ids). Shape modelled on the documented response once F5 is verified. **No real API responses are committed.**
2. Core unit tests: `purgeExpired` at day 29/30/31 boundaries; field minimization drops non-allowlisted fields; existence-check failure deletes the record (F11).
3. Adapter tests with injected `fetch`: success, 401 (expired token, prompts re-login), 429 (back-off), malformed JSON, and an empty account.
4. Backend tests (Miniflare or plain unit tests): bad or expired `state` rejected; `/redeem` with a wrong verifier rejected; handoff single-use and expired after 60 s; secret never present in any response or log line.
5. Canaries (proposed, owner sign-off needed): **C-11** no client secret or secret-like literal in `apps/`; **C-12** no WebView pointed at `oauth.battle.net` and no password input in auth screens. **C-03** allowlist addition for `oauth.battle.net`, `*.api.blizzard.com` and the backend host, which is a boundary change needing owner sign-off. Each canary must be shown failing on a deliberate violation.
6. Manual emulator test with the owner's own test client and account. Results are recorded in WIP as evidence; no tokens or screenshots containing account data are committed.

## Owner-only actions

1. Read the four [PORTAL] guides in a browser and confirm or correct F3–F7: PKCE support, scopes, profile endpoint, token lifetime/refresh, redirect URI rules. Optionally ask Blizzard developer support whether public PKCE clients are supported.
2. Confirm the [TOU] sub-clause letters and that the October 1, 2019 version is current. Record a reviewed row in `docs/LICENSING.md`.
3. Decide A / B / C / D (and accept or reject this ADR).
4. Register a Battle.net developer client at https://community.developer.battle.net/access/clients under the owner's account. Choose a client name with no Blizzard marks (§2(m)).
5. Set the redirect URI to the chosen backend callback (for example `https://<name>.<account>.workers.dev/callback`).
6. Approve the hosting provider (Cloudflare Workers Free proposed) and create the account. Store the client id, secret and HMAC key **only** in the host's secret store; never in Git, chat or CI logs.
7. Generate the release signing key fingerprint for `assetlinks.json` (key custody per ADR-0005).
8. Approve canaries C-11/C-12 and the C-03 host allowlist change.
9. Approve the attribution/disclaimer wording and the privacy policy text. Complete the Play Data safety form.
10. Decide ADR-0004 (AGPL for the backend) before backend code is published.
11. Arrange qualified legal review before production use of Blizzard data (HANDOFF boundary 9).

## Recommendation (agent, not a decision)

1. **Now:** keep D (manual) as the shipping default. Do owner actions 1–2 first, because the key technical facts (F3–F7) are UNVERIFIED.
2. **If Blizzard confirms public PKCE clients:** choose **B** (no backend, no secret custody, lowest cost).
3. **Otherwise:** choose **A1** on Cloudflare Workers Free, behind a feature flag. Implement the core retention helper and synthetic-fixture tests first, then the backend, then the app flow.
4. **Do not choose C.** It needs the same backend as A, creates an anonymous quota-spending relay, and adds little over manual entry.

## Open questions for the owner

1. Does Blizzard support PKCE/public clients, and which redirect URI forms are accepted (F3, F7)?
2. Is a Cloudflare (proprietary platform) free tier acceptable under the "free/open source" constraint, or must the backend be self-hostable only?
3. After the 30-day TTL, may a user keep a manually re-typed copy of a character that was originally imported?
4. Which regions (US/EU/KR/TW) should be supported at launch?
5. Should sign-in be allowed before the legal review, for the owner's own testing only, using a non-public build?
6. Is "Sign in with Battle.net" acceptable wording pending trademark review?

## Consequences

- Choosing A or B moves Blizzard API integration from "blocked" to "in progress" and triggers HANDOFF boundaries 3, 6 and 9: privacy policy, deletion flow, retention enforcement and legal review before release.
- A adds an operational service, secret custody and an incident process.
- New canaries C-11/C-12 and a C-03 allowlist change are needed (proposed, not added).
- The rights status of the LICENSING.md Blizzard API row must move from UNREVIEWED to reviewed before any release.
