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
| Google Play Developer Program Policies | Store policy | **UNREVIEWED** | https://play.google.com/about/developer-content-policy/ (to verify) | — | — | — | — |
| Apple App Store Review Guidelines | Store policy | **UNREVIEWED** | https://developer.apple.com/app-store/review/guidelines/ (to verify) | — | — | — | — |
| Expo (SDK and tooling) | Library license | **MIT per installed package.json** (expo 58.0.23, @expo/cli 58.1.19, expo-status-bar 58.0.4); not a legal review | https://github.com/expo/expo | 2026-11-07 | `license` field in node_modules package.json | C-10 | Pending |
| React Native | Library license | **MIT per installed package.json** (react-native 0.88.1, react 19.3.0, metro 0.87.1, hermes-compiler 260318099.0.5); not a legal review | https://github.com/facebook/react-native | 2026-11-07 | `license` field in node_modules package.json | C-10 | Pending |

## Dependency policy

- Permitted: licenses compatible with GPL-3.0-only (MIT, BSD, ISC, Apache-2.0, LGPL-3.0, GPL-3.0, MPL-2.0 with care).
- Prohibited without ADR: proprietary, source-available, GPL-2.0-only, "no commercial use" licenses, unlicensed code.
- Canary C-10 (`tests/canaries/licenses.ts`, run by Vitest) classifies every package in `package-lock.json`. Allowed: MIT, BSD-2/3-Clause, ISC, Apache-2.0, 0BSD, CC0-1.0, BlueOak-1.0.0, Python-2.0, Unlicense, LGPL-3.0, GPL-3.0, CC-BY-4.0; MPL-2.0 allowed with a recorded note; AGPL needs ADR-0004. OR = any allowed branch; AND = all branches must be allowed. Anything else needs an entry in `tests/canaries/license-exceptions.json` (`reviewedBy: pending-owner` until the owner signs off).

## Release gates (first external release)

Copied from HANDOFF.md; all must be evidenced:

- [ ] Legal/compliance review completed and documented
- [ ] Authorized API integration and retention rules confirmed
- [ ] Trademark-safe branding and independent-project disclaimer
- [ ] Security and privacy policy, data deletion flow, accessible UX
- [ ] Provenance manifest for every third-party source
- [ ] Negative canary suite, CI, and dependency audit passing
- [ ] No unauthorized assets, scraping, automation, or monetization
- [ ] Store policy compliance (Google Play; Apple App Store for iOS) reviewed and documented
- [ ] Privacy labels / Google Play Data safety form completed and consistent with actual data handling
- [ ] Content rating questionnaire(s) completed
