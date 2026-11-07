# Licensing, sources, and release gates

This is a tracking document, **not legal advice or clearance**.

## Project license

Original code: GNU GPL v3.0 only (`GPL-3.0-only`) — [LICENSE](../LICENSE), [ADR-0001](adr/0001-license-gpl-3.0-only.md). It does not license Blizzard trademarks, art, game assets, API data, or third-party databases.

## Source register

Every external source (API, dataset, library, asset) needs a row before use.

| Source | Type | Rights status | URL | Date checked | Operative clause | Compliance test | Owner sign-off |
|---|---|---|---|---|---|---|---|
| Blizzard Developer API Terms | API terms | **UNREVIEWED** (see `SPONSORSHIP.md` for §2(b), §2(h) notes) | https://www.blizzard.com/en-us/legal/a2989b50-5f16-43b1-abec-2ae17cc09dd6/blizzard-developer-api-terms-of-use | — | — | — | — |
| Blizzard trademark / brand policy | Policy | **UNREVIEWED** | — | — | — | — | — |
| Blizzard addon / UI policy | Policy | **UNREVIEWED** | — | — | — | — | — |

## Dependency policy

- Permitted: licenses compatible with GPL-3.0-only (MIT, BSD, ISC, Apache-2.0, LGPL-3.0, GPL-3.0, MPL-2.0 with care).
- Prohibited without ADR: proprietary, source-available, GPL-2.0-only, "no commercial use" licenses, unlicensed code.
- CI runs a license check once a package manifest exists (see `.github/workflows/ci.yml`).

## Release gates (first external release)

Copied from HANDOFF.md; all must be evidenced:

- [ ] Legal/compliance review completed and documented
- [ ] Authorized API integration and retention rules confirmed
- [ ] Trademark-safe branding and independent-project disclaimer
- [ ] Security and privacy policy, data deletion flow, accessible UX
- [ ] Provenance manifest for every third-party source
- [ ] Negative canary suite, CI, and dependency audit passing
- [ ] No unauthorized assets, scraping, automation, or monetization
