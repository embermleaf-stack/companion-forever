# WIP — active work

**Updated:** 2026-11-07

## In progress

- Governance and project infrastructure scaffold (this change set): AGENTS, GOVERNANCE, DECISIONS, ADRs, ARCHITECTURE, LICENSING, CANARIES, CONTRIBUTING, SECURITY, templates, CI skeleton. **Uncommitted until owner reviews.**

## Next (ordered)

1. Owner reviews and commits the scaffold; enable branch protection and GitHub secret scanning/Dependabot in repo settings (cannot be done from files).
2. Primary-source audit (HANDOFF item 2): Blizzard API terms, trademark policy, addon policy; record URL, date, clause, test in `docs/LICENSING.md`.
3. Resolve "Forever" naming ambiguity and verify what Blizzard exposes.
4. Owner decision on ADR-0003 and ADR-0004.
5. Choose toolchain (package manager, test runner), then replace the placeholder canary and CI steps with real ones.
6. Synthetic fixtures and schema.

## Blocked

- Funding: awaiting Sponsors enrollment and written compliance clearance (ADR-0002).
- Real API integration: awaiting M0 compliance results.

## Evidence log

- 2026-11-07: Files created only; no tests or CI have been run. CI workflow is untested until first push.
