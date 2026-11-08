# Negative canary tests

Each forbidden capability gets a test that **fails when the violation is present**. A canary is only valid once it has been demonstrated to fail on a deliberate violation (record the evidence below). Canaries may not be removed, skipped, or exempted without an Accepted ADR.

| ID | Forbidden capability | Intended check | Status | Failure demonstrated |
|---|---|---|---|---|
| C-01 | Committed secrets/tokens | Secret scan over repo and history | Planned (CI placeholder) | No |
| C-02 | Protected game assets in repo | Block extensions/paths (`.blp`, `.m2`, `.mpq`, `.casc`, etc.) and unlisted binary assets | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-03 | Scraping | Static check: no HTTP client calls to non-allowlisted hosts | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-04 | Monetization | Static check: no ad SDKs, payment SDKs, or paywall flags in app code | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-05 | Active funding link without clearance | `.github/FUNDING.yml` has no uncommented entries unless `docs/SPONSORSHIP.md` records clearance | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-06 | Gameplay automation / input injection | Static check for input-synthesis APIs and protected-function patterns in addon code | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-07 | Client modification/instrumentation | Check for memory-access / injection libraries | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-08 | Personal data fixtures | Fixtures must be flagged `synthetic: true`; reject real-looking character exports | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-09 | Trademark misuse in branding | Check for "official", Blizzard logos, or endorsement phrasing | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |
| C-10 | Incompatible dependency license | License checker against allowlist (tests/canaries/licenses.ts; reviewed exceptions in license-exceptions.json) | Implemented (Vitest, tests/canaries) | Yes (automated, 2026-11-07) |

## Procedure to validate a canary

1. Introduce a deliberate violation on a throwaway branch.
2. Confirm the check fails; paste the run link/output under "Evidence".
3. Revert; confirm it passes.
4. Mark "Failure demonstrated: Yes" with date.

## Evidence

2026-11-07: `npx vitest run` — tests/canaries/canaries.test.ts, 22 tests passed (43 total across repo). Each of C-02..C-09 has a "passes on the real repository" test and a "fails on a deliberate violation" test using in-memory violating files (automated; not a throwaway-branch run). C-01 remains Planned (CI).

2026-11-07: C-10 added. `npx vitest run`: 6 files, 89 tests passed (tests/canaries/licenses.test.ts: 40 tests). The real package-lock.json (602 entries) passes with zero exceptions. Deliberate violations (GPL-2.0-only, proprietary, UNLICENSED, SEE LICENSE IN, missing license, AGPL-3.0 needing ADR-0004) fail in-memory. Automated; not a throwaway-branch run. Owner sign-off on the policy is not recorded.
