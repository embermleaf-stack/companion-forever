# Security policy

## Status

Pre-MVP; no deployed service. This policy will be expanded before any public deployment (see release gates in [docs/LICENSING.md](docs/LICENSING.md)).

## Reporting a vulnerability

Use GitHub private vulnerability reporting: **Security → Report a vulnerability** on https://github.com/embermleaf-stack/companion-forever (the owner must enable it in repository settings). Do not open public issues for vulnerabilities, and do not include real credentials or player data in reports.

## If a secret is committed

1. Revoke/rotate the secret immediately.
2. Notify the owner.
3. Remove from history only after rotation (history rewrite is secondary to revocation).

## Scope notes

Never test against Blizzard systems or other users' accounts. Research must respect Blizzard's terms.
