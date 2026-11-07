# Negative canary tests

Each forbidden capability gets a test that **fails when the violation is present**. A canary is only valid once it has been demonstrated to fail on a deliberate violation (record the evidence below). Canaries may not be removed, skipped, or exempted without an Accepted ADR.

| ID | Forbidden capability | Intended check | Status | Failure demonstrated |
|---|---|---|---|---|
| C-01 | Committed secrets/tokens | Secret scan over repo and history | Planned (CI placeholder) | No |
| C-02 | Protected game assets in repo | Block extensions/paths (`.blp`, `.m2`, `.mpq`, `.casc`, etc.) and unlisted binary assets | Planned | No |
| C-03 | Scraping | Static check: no HTTP client calls to non-allowlisted hosts | Planned | No |
| C-04 | Monetization | Static check: no ad SDKs, payment SDKs, or paywall flags in app code | Planned | No |
| C-05 | Active funding link without clearance | `.github/FUNDING.yml` has no uncommented entries unless `docs/SPONSORSHIP.md` records clearance | **Implemented** in CI | No |
| C-06 | Gameplay automation / input injection | Static check for input-synthesis APIs and protected-function patterns in addon code | Planned | No |
| C-07 | Client modification/instrumentation | Check for memory-access / injection libraries | Planned | No |
| C-08 | Personal data fixtures | Fixtures must be flagged `synthetic: true`; reject real-looking character exports | Planned | No |
| C-09 | Trademark misuse in branding | Check for "official", Blizzard logos, or endorsement phrasing | Planned | No |
| C-10 | Incompatible dependency license | License checker against allowlist | Planned | No |

## Procedure to validate a canary

1. Introduce a deliberate violation on a throwaway branch.
2. Confirm the check fails; paste the run link/output under "Evidence".
3. Revert; confirm it passes.
4. Mark "Failure demonstrated: Yes" with date.

## Evidence

_None yet._
