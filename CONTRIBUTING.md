# Contributing

Thanks for helping. This is an independent project, not affiliated with Blizzard Entertainment. Read [AGENTS.md](AGENTS.md) and [docs/GOVERNANCE.md](docs/GOVERNANCE.md) first; they apply to humans and AI agents alike.

## Status

Pre-MVP. Code contributions are premature until the toolchain ADR is accepted (see [WIP.md](WIP.md)). Documentation fixes, compliance research (with primary-source citations), and design feedback are welcome now.

## Rules

- Code and test data must be **original** or license-compatible with GPL-3.0-only. No Blizzard assets, game files, Wowhead or other scraped data, or unlicensed datasets.
- Test fixtures must be synthetic.
- Never commit secrets, tokens, account IDs, or real character exports.
- Do not add ads, payment, or funding links.
- Changes touching legal/compliance boundaries need an ADR and owner approval.

## Workflow

1. Open an issue (use the templates) or comment on an existing one.
2. Branch from `main`; use Conventional Commits.
3. Open a PR using the template; CI must pass.
4. By contributing you agree your contribution is licensed under GPL-3.0-only (inbound = outbound). Sign off commits with `git commit -s` (Developer Certificate of Origin, https://developercertificate.org/).

## Conduct

Be respectful and constructive. Harassment or discrimination is not tolerated; the owner may remove content or contributors at their discretion.
