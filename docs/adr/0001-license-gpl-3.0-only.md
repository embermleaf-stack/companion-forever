# ADR-0001: Original code licensed GPL-3.0-only

- **Status:** Accepted
- **Date:** 2026-11-07
- **Decider:** owner (commit 36fb14d)
- **Class:** Protected

## Context

The project is intended as free, open-source software. See HANDOFF.md.

## Decision

Original project code is licensed under GNU GPL v3.0 **only** (not "or later"). The license does not extend to Blizzard trademarks, art, assets, API data, or third-party databases.

## Consequences

Dependencies must be GPL-3.0-compatible. Network-service coverage is addressed separately in ADR-0004 (Proposed). Source files carry `SPDX-License-Identifier: GPL-3.0-only`.
