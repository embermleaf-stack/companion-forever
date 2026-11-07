# ADR-0003: TypeScript PWA + API + PostgreSQL with provider adapters

- **Status:** Proposed. Partially superseded by ADR-0005 (pending acceptance)
- **Date:** 2026-11-07
- **Decider:** pending owner
- **Class:** Architectural

## Context

Mobile-first, accessible, free companion; data from approved APIs and optional user-controlled addon snapshots. See [ARCHITECTURE.md](../ARCHITECTURE.md).

## Decision (proposed)

TypeScript for PWA and backend, PostgreSQL persistence, provider-adapter interface with provenance metadata, optional Lua addon + local sync agent. Start with a no-Blizzard-data prototype.

## Alternatives considered

SQLite/local-only app (simpler, no hosting, weaker multi-device sync); native mobile apps (higher cost, store policies).

## Consequences

Requires hosting and privacy/deletion obligations. Toolchain choices (package manager, framework, test runner) still open.
