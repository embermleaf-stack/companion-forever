# Battle.net login: token-exchange Worker setup (owner steps)

Status: instructions only. Nothing here has been deployed. Written 2026-11-08.

## Why this is needed

A real test on 2026-11-08 showed Blizzard's token endpoint rejects a secret-less request:
`POST https://oauth.battle.net/token` with a bogus code, our Client ID and no secret returned
`invalid_client` (HTTP 401). So the PKCE-only route (ADR-0006 option B) does not work, and the app cannot
hold the client secret (anyone can extract it from an APK). A tiny server holds the secret and does the
code-for-token swap (ADR-0006 option A1). It stores no characters and logs no codes or tokens.

## Decisions already made

- Host: **Cloudflare Workers (free plan)**, same Cloudflare account as your other project is fine.
- **Do not** put it on the shop domain or its routes. Use its own `workers.dev` address (see the boundary 4 and
  coupling reasons in the chat summary: no store branding on API-derived functionality, and login must not break
  if that site changes).
- Worker name: `hawthorn-ledger-auth`. Never use "battlenet" or "blizzard" in the name or hostname (Blizzard API
  terms, see ADR-0006 branding section).

## Part 1: before touching Cloudflare (5 minutes)

1. **Regenerate the Blizzard client secret.** The old one was pasted into a chat. On
   https://develop.battle.net/access/clients open "Hawthorn Ledger Dev" and regenerate the secret.
   Put the new value only in `secrets/blizzard.local.env` (git-ignored) as `BLIZZARD_CLIENT_SECRET=`.
   Never paste it into chat, a commit, a screenshot or the app.
2. Keep the Client ID handy (public): `5ee2c9327785451890ce92b27045a0a1`.

## Part 2: Cloudflare dashboard

Do these in https://dash.cloudflare.com with your existing login.

1. Left menu: **Workers & Pages** > **Create** > **Create Worker**.
2. Name it exactly `hawthorn-ledger-auth`. Click **Deploy** (the default hello-world code is fine for now).
3. Note the address shown, `https://hawthorn-ledger-auth.<your-subdomain>.workers.dev`. If it is the
   first Worker on the account you will be asked to choose a `<your-subdomain>`; pick something neutral that does not
   include a Blizzard mark or your shop name.
4. **Create a KV namespace** (short-lived storage for the one-time hand-off, 60 seconds): **Storage & databases** >
   **KV** > **Create** > name `hawthorn-ledger-handoff`.
5. Open the Worker > **Settings** > **Bindings** > **Add** > **KV namespace**. Variable name `HANDOFF`, pick the
   namespace from step 4.
6. Worker > **Settings** > **Variables and Secrets** > **Add**. Add these as type **Secret** (not plain text):
   - `BLIZZARD_CLIENT_ID` = the Client ID above
   - `BLIZZARD_CLIENT_SECRET` = the NEW secret from Part 1
   - `STATE_HMAC_KEY` = a long random string you generate (for example run
     `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and paste the output)
7. Click **Deploy**.

## Part 3: Blizzard developer portal

Add (do not remove the old one yet) a second redirect URL to "Hawthorn Ledger Dev":

`https://hawthorn-ledger-auth.<your-subdomain>.workers.dev/callback`

It must be https and an exact match. Save. Remove the GitHub Pages callback only after the Worker flow works.

## Part 4: send me these (not secrets)

- The full `workers.dev` address.
- Confirmation that the KV binding is named `HANDOFF` and the three secrets exist (do not send values).
- The **SHA-256 fingerprint of the app signing certificate** if you have a release keystore. If not, say so; the
  debug build will use a different one and I will tell you how to list it. This is needed for Android App Links
  (the Worker serves `/.well-known/assetlinks.json`).

## Part 5: what I do after that

1. Write ADR-0008 (hosted token-exchange Worker, data handling, risks) and add the Worker source under a new
   `workers/auth/` folder with tests (synthetic fixtures only, no real secrets).
2. Give you one command to deploy it (`npx wrangler deploy`, after a one-time `npx wrangler login` on your machine).
3. Implement the app side (`handoff` mode already has the seam in `apps/mobile/src/battlenet/handoff.ts`), wire
   the Worker address in `apps/mobile/.env.local` (public value) and rebuild a flag-on test build.
4. You re-test sign-in and import on the phone.

## Still open before any public release (not part of this setup)

- Blizzard API terms: privacy policy URL, attribution text, 30-day data limit (already enforced in the app).
- Review Cloudflare's own default request logging (it can include IP addresses) and state it in the privacy policy.
- ADR-0006 and ADR-0007 are still Proposed; the Worker is test-only until the owner accepts them.
- No Blizzard marks or implied affiliation in the Worker name, hostname or responses.
