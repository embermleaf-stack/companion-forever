# Art pipeline

Status: proposed workflow, checked 2026-11-07. Not a legal clearance. The owner decides whether generated art is acceptable (see [icons-and-imagery/README.md](../icons-and-imagery/README.md) and [AGENTS.md](../AGENTS.md)).

## Purpose

Produce the original "Emberleaf" art in [icons-and-imagery/](../icons-and-imagery/) with an AI image generator inside a fixed free allowance, with a provenance record for every output and owner approval before anything reaches the app.

## Verified Firefly free-tier facts (checked 2026-11-07)

| Fact | Status | Source (date checked) |
|---|---|---|
| Free plan exists and gives "free daily generations" | VERIFIED | [Adobe Firefly plans page](https://www.adobe.com/products/firefly/plans.html) (2026-11-07): "You don't need a plan to get free daily generations across image, video, and audio"; "Limits refresh every day". |
| Free plan has "limited daily generations" | VERIFIED (no number) | [Adobe Firefly plans FAQ fragment](https://www.adobe.com/cc-shared/fragments/products/firefly/plans/faq) (2026-11-07): "Adobe Firefly offers a free plan with limited daily generations" |
| Monthly generative credits on free plan | UNVERIFIED | Official pages state no number. Third-party and community figures conflict (15 and 25 per month) and are not used. |
| Paid Standard tier: 2,000 generative credits | VERIFIED (paid tier only) | Plans FAQ fragment above (2026-11-07). Not relevant to the free plan. |
| Watermark on free-tier output | UNVERIFIED | Official pages do not state it. A 2023 community post describes a watermark; a 2025 user report says it was removed. Neither is official. |
| Content Credentials on output | VERIFIED (general, not tier-specific) | Plans FAQ fragment: "Adobe automatically attaches Content Credentials for transparency." (2026-11-07) |
| Resolution limits on free tier | UNVERIFIED | Not stated on any page checked. |
| Commercial use of Firefly outputs | VERIFIED (general, not tier-specific) | Plans FAQ fragment: "Outputs generated with Adobe Firefly AI models can be used for commercial purposes." (2026-11-07). Free-tier status is UNVERIFIED. |
| Output ownership | UNVERIFIED (search summary only) | A search summary cites the 2026 product terms as calling Output "your Content" and noting Output may not be protectable. The Generative AI Additional Terms PDF ([adobe.com/go/adobe-gen-ai-addl-terms](https://www.adobe.com/go/adobe-gen-ai-addl-terms)) could not be read (binary PDF, not rendered). Check it directly. |
| Beta-feature commercial restriction (older 2023 terms) | UNVERIFIED | Only in an older PDF version quoted in search results. Current status not confirmed. |
| Attribution required | UNVERIFIED | Only a forum reply says none is required. |

Also check: the [helpx Firefly FAQ](https://helpx.adobe.com/firefly/get-set-up/learn-the-basics/adobe-firefly-faq.html) returned HTTP 403 to automated fetch, and the terms PDF was binary and could not be rendered. A human should open them in a browser and record the clause text in `icons-and-imagery/provenance.md`.

## Workflow

1. **Generate only to `icons-and-imagery/staging/`.** That folder is git-ignored except `staging/README.md`. Nothing generated goes elsewhere.
2. **Log every output** in `icons-and-imagery/provenance.md` using [PROVENANCE-TEMPLATE.md](../icons-and-imagery/PROVENANCE-TEMPLATE.md). Fill in the tool, model/version, date, verbatim prompt, the license-terms URL and the operative clause (or mark UNVERIFIED), and the human edits made.
3. **Similarity check against existing game art.** Compare each output against Blizzard and other game art by a human reviewer, and record the reviewer and method in the provenance entry. Reject anything that resembles a recognizable existing character, logo, icon, or UI.
4. **No Blizzard references in prompts.** Do not prompt with "World of Warcraft", "Blizzard", "Battle.net", the names of its characters, factions, zones, or items, or "in the style of" any game. Use only the Style Guide palette and motifs and its negative prompt.
5. **Alt text required.** Every asset needs alt text in its provenance entry before review.
6. **Owner approval before final.** Move an asset to `icons-and-imagery/final/` or `apps/*/assets` only after the provenance entry is complete and the owner has approved it in writing. Record the date. The app icon final is human-drawn or human-edited.
7. **Credits.** Record each job in [credit-ledger.md](../icons-and-imagery/credit-ledger.md): date, job id, credits used, remaining if shown. Stop when the monthly allowance is exhausted, or when the free allowance is unknown and the tool's UI shows no remaining count.
8. **No auto-merge.** Generated art and its supporting files go through a PR that the owner reviews. Never merge them automatically.

## Recurring routine: `art-updates`

Each run:

1. Read `icons-and-imagery/art-queue.md` and take the next unchecked jobs in order, up to what the free allowance permits.
2. Before each job, read the remaining credits in `credit-ledger.md` and the tool's UI. Never exceed the free allowance. If either is unknown, stop and report.
3. Generate each job's output to `icons-and-imagery/staging/` only. Use the queue's prompt verbatim.
4. Log the job in `credit-ledger.md` and each output in `provenance.md`, with the similarity-check and alt-text fields filled or marked as pending.
5. Open a PR (branch from `main`, not `main`) containing only the log updates and any approved finals. Do not merge. Do not push to `main`.
6. Check the queue box only for jobs whose output has been logged, and note in `WIP.md` what remains.

The routine never publishes assets, never enables anything that costs money, and never edits compliance or licensing documents.
