# ADR-0004: Evaluate AGPL for network-hosted server code

- **Status:** Proposed
- **Date:** 2026-11-07
- **Decider:** pending owner
- **Class:** Protected

## Context

GPL-3.0 does not require source release for software only run as a network service. HANDOFF.md item 4 asks whether to use AGPL-3.0 for server components. ADR-0001 currently covers all original code as GPL-3.0-only.

## Options

1. Keep GPL-3.0-only everywhere (status quo).
2. AGPL-3.0-only for server code; GPL-3.0-only for client/addon.
3. AGPL-3.0-only for everything.

## Decision

None yet. Owner decision required; changing requires a new Accepted ADR superseding ADR-0001 in part, and must happen before outside contributions are accepted (relicensing later needs contributor consent).

## Consequences

AGPL discourages closed hosted forks but may deter some contributors and complicates dependency compatibility.
