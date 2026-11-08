# Naming review: "Forever Companion" / "Companion Forever"

**Status:** Preliminary. Owner decision pending. Docs only; no Accepted decision is changed.
**Date checked:** 2026-11-08 (all sources below unless stated otherwise).
**Tier:** Opus (compliance research).

> **Not legal advice.** This is desk research by an AI agent. It is not a trademark clearance, not a legal opinion, and it does not say that any name is "safe", "compliant" or "approved". Trademark rights depend on jurisdiction, use and registrations that web searches cannot see. A qualified trademark professional should run a clearance search before any public launch.

Copyright does not protect names or short phrases, so the question is trademark law plus store and API naming rules.

## Summary

- **Risk rating: HIGH** for "Forever Companion", **MEDIUM-HIGH** for "Companion Forever" as a public product name. Both are fine as an internal codename and repository name for now.
- **Finding 1. "Forever" is now a Blizzard World of Warcraft product name.** Blizzard sells "World of Warcraft®: Forever" (launch 4 Nov 2026) and its own news post shortens it to "WoW: Forever". This settles the HANDOFF question about an edition called "Forever" (see section 1.4). "Forever" by itself is not on Blizzard's published list of marks, but a WoW-related app named "Forever ..." points straight at that Blizzard product.
- **Finding 2. "Forever Companion" plus WoW reads like an official Blizzard app.** Blizzard's own retired app was the "WoW Companion App". "Forever" + "Companion" in a WoW app reads as "the WoW: Forever companion app", the kind of implied relationship that Blizzard's API Terms §2(m)/§4 and Trademark Usage Guidelines forbid, and that Google Play's Impersonation policy and Apple guideline 4.1/5.2.1 police.
- **Finding 3. The name is already crowded in this exact niche.** A CurseForge WoW addon called **"Forever Companion"** (ShadowlessStudios, "Your companion for the entire World of Warcraft Forever journey", 7,662 downloads) exists. At least six GitHub projects from Oct-Nov 2026 use "Forever Companion" for WoW: Forever tools, and one (`daddler/Companion-Forever`) describes itself as a continuation of the Companion App for WoW: Forever. Outside gaming, "Forever Companion" was used by Forever Voices AI for adult AI-companion chatbots, and by a Reno-area pet end-of-life veterinary service.
- **Recommendation:** do not launch publicly under either "Forever Companion" or "Companion Forever". Pick a distinctive name that contains neither "Forever" nor "Companion" (shortlist in section 5). Keep the existing package id `io.github.embermleaf.companionforever`, which users do not see as a brand. Before launch, have a professional run a clearance search on the chosen name.

## 1. Blizzard Entertainment

### 1.1 Blizzard Developer API Terms of Use

Source: https://www.blizzard.com/en-us/legal/a2989b50-5f16-43b1-abec-2ae17cc09dd6/blizzard-developer-api-terms-of-use (last updated 1 Oct 2019; read 2026-11-08).

- §2(m) "Blizzard Is The Source Of The Data, But Does Not Endorse Applications": "You shall clearly and conspicuously identify Blizzard in Your Application as the source of the Data, and You shall do it in such a way which makes it not appear that Blizzard is endorsing or affiliated with Your Application." And: "Additionally, Your Application shall not contain any of Blizzard's trademarks as a part of its title or URL."
- §4 (Independent Contractors): "You agree not to make any other public statements that assert or imply any other relationship with Blizzard, unless You have Blizzard's prior written approval."

Neither "Forever Companion" nor "Companion Forever" contains "World of Warcraft", "WoW", "Warcraft", "Blizzard" or "Battle.net". So the literal §2(m) rule, no Blizzard trademark in the title or URL, is not broken by the words themselves, as far as the published list shows. The open question is whether "Forever" is or becomes a Blizzard mark (section 1.4). If it does, a title using "Forever" could break §2(m). Separately, a "Forever ... Companion" name for a WoW app risks implying a relationship, which §2(m) and §4 do not allow. **UNVERIFIED:** whether Blizzard claims "Forever" as a mark.

### 1.2 Blizzard Trademark Usage Guidelines

Source: https://www.blizzard.com/legal/38fd0408-8431-469a-99bc-2cd9eb9462c8 ("Blizzard Entertainment Trademark Usage Guidelines"; no date shown on the page; read 2026-11-08).

- Listed "Blizzard Marks" include "Blizzard Entertainment", "World of Warcraft" and the WoW expansion titles up to "Battle for Azeroth". The list looks old: it does not list "WoW", "Warcraft" on its own, "Battle.net", "Companion", or anything containing "Forever". **A short list does not mean those words are unprotected.** Blizzard may hold registrations or common-law rights in marks that are not listed (UNVERIFIED).
- Do not "use a Blizzard Mark in any manner than implies a relationship with, sponsorship, or endorsement by Blizzard" without written authorization.
- Do not use a Blizzard Mark in your website's domain name. Do not apply to register a product name that includes a Blizzard Mark or a variation of one. Do not use the marks together with your own name or another trademark.
- The page does not mention app names.
- The guidelines say the fan site, community esports and custom-map policies permit use of Blizzard Marks under this policy. A current standalone fan-site policy text was **not found** (UNVERIFIED). Blizzard's older Legal FAQ (https://us.blizzard.com/legal/28d5ebbf-c245-4408-8ba9-043dd5f056bf/faq-prawny, seen only through a search snippet; page not read) says Blizzard does "not condone the use of our product names in other domain names" because of customer confusion.

### 1.3 The retired official "WoW Companion App"

Source: https://worldofwarcraft.blizzard.com/en-gb/news/24061010 ("The WoW Companion App Retiring", dated "April 24th"; year not shown on the page, 2024 per press coverage, UNVERIFIED from the primary source). Blizzard called the product the "WoW Companion App". Support ended "with the release of The War Within™ pre-expansion content update".

What this means: in WoW, "Companion" carries a specific, recent association with Blizzard's own official app. Whether Blizzard holds or kept a registration for "WOW COMPANION" or similar is **UNVERIFIED**. "Companion app" is also a widely used generic phrase for game apps.

### 1.4 Is there a WoW product called "Forever"? Yes (primary source)

Source: https://news.blizzard.com/en-us/article/24302498/pre-purchase-the-world-of-warcraft-forever-collectors-edition (read 2026-11-08; marked "[Updated 9/24]", no publication date shown).

- The page title uses "World of Warcraft®: Forever Collector's Edition". The body says the game "launches globally on November 4, 2026, at 3:00 p.m. PST" and calls it "WoW: Forever". It also uses "Warcraft Forever Collection". The collector's edition includes a physical "companion journal" (not an app).
- Secondary sources only, not relied on: Wikipedia "World of Warcraft: Forever"; Variety; Windows Central (reveal at BlizzCon 2026, separate MMO branch alongside Retail and Classic).
- **Mark status UNVERIFIED.** No record of a "WORLD OF WARCRAFT: FOREVER", "WOW FOREVER" or "FOREVER" application by Blizzard turned up in web search. That is not proof none exists: new filings may not be indexed, and Blizzard has filed for expansion names before (e.g. "Warlords of Draenor", 2013, per press). The owner or counsel must check the USPTO and EUIPO directly (section 2.4).
- **API availability for WoW: Forever** (namespaces, endpoints) was not part of this review and stays **UNVERIFIED**, as recorded in README and HANDOFF.

## 2. Existing uses of the name

### 2.1 Same niche (WoW: Forever tools), the strongest conflict

| Name | Where | Notes |
|---|---|---|
| "Forever Companion" | CurseForge addon, https://www.curseforge.com/wow/addons/forever-companion | Author ShadowlessStudios; "Your companion for the entire World of Warcraft Forever journey"; 7,662 downloads; last updated 30 Sep 2026; licence "All Rights Reserved"; beta; slash command `/fc`. Read 2026-11-08. |
| ForeverCompanion | GitHub `darksolis/ForeverCompanion` | In-game companion addon ("Vexa"). |
| ForeverCompanion | GitHub `grifmang/ForeverCompanion` | "A native WoW Forever companion for group quests, crafting materials, gold budgets and Legacy plans." |
| forever-companion | GitHub `RIPRODUCTIONS/forever-companion` | "Free offline second-screen guide for WoW: Forever ... Fan project." |
| forever-companion | GitHub `rossmlucarelli/forever-companion` | Claude-based coach for WoW: Forever. |
| wow-forever-companion | GitHub `ZRCEKO/wow-forever-companion` | WoW Forever knowledge/economy tool. |
| Companion-Forever | GitHub `daddler/Companion-Forever` | German: "Weiterführung der Companion App für die neue Spieleversion von World of Warcraft: Forever" (continuation of the Companion App for WoW: Forever). Same concept and same name as this project. |
| ForeverCompanion, Forever-companion- | GitHub (`nassimbouzid95-design`, `tonygrischke-art`, `szh101`, `qaqms`) | Unclear or unrelated purpose. |

GitHub results came from `gh search repos` on 2026-11-08. Several of these projects are only weeks old. None was found on Google Play or the Apple App Store under that exact name, but store search coverage here is weak (**UNVERIFIED**).

What this means: players will already meet several unrelated "Forever Companion" tools, so the name cannot work as a distinctive brand for this project. If the CurseForge author builds goodwill under the name, they may hold unregistered (common-law, e.g. US) rights through first use. That is a priority question (**UNVERIFIED**).

### 2.2 AI-companion apps

- "Forever Companion" by Forever Voices AI: AI girlfriend/boyfriend chatbots of influencers, adult-only, paid per minute, run through Telegram bots (e.g. `@ForeverCompanionBot`). Source: Decrypt, https://decrypt.co/154705/here-are-the-ai-celebrities-you-can-date-right-now (secondary, read via search snippet; whether the service is still running is UNVERIFIED). Directory listings for "Forever Voices: Companion" also exist.
- Many AI "companion" apps (e.g. EverFriends on the App Store) make "companion" in a store title read as "AI chatbot" to many users. That creates confusion and a reputation risk for a family-friendly tracker that could be confused with an adult chatbot brand.

### 2.3 Other uses

- "Forever Companion": a Reno, Nevada area veterinary end-of-life pet care business (2news.com, secondary). Different goods and services, low conflict.
- "Companions Forever": pet memorial businesses in Bell Buckle, TN and Tulsa, OK (directory listings, secondary). Low conflict.
- "FOREVER" word marks are registered in the US by other owners, e.g. Forever, Inc. (class 41 reg. 8249305; reg. 4598177) and Hachette Book Group (reg. 7559823). Sources are aggregator sites (trademarkelite.com, trademarkdir.com), not USPTO records. **UNVERIFIED.** "Forever" is a crowded, weak element.

### 2.4 Registries: not searched directly (JavaScript-only). The owner must search these by hand

Web search found no "FOREVER COMPANION" or "COMPANION FOREVER" application or registration. That proves nothing: the official databases are JavaScript applications this agent could not query. **Do not read any registry status into this review.**

Search each phrase exactly and as a word combination: "FOREVER COMPANION", "COMPANION FOREVER", "FOREVER", "WOW FOREVER", "WORLD OF WARCRAFT FOREVER", "WOW COMPANION". Check classes **9** (downloadable software, mobile apps), **41** (entertainment, online game information), **42** (SaaS, non-downloadable software) and **28** (games, toys):

- USPTO Trademark Search: https://tmsearch.uspto.gov/ (status details via TSDR, https://tsdr.uspto.gov/)
- EUIPO eSearch plus: https://euipo.europa.eu/eSearch/
- TMview (EU and national offices): https://www.tmdn.org/tmview/
- WIPO Global Brand Database: https://branddb.wipo.int/
- UK IPO: https://trademarks.ipo.gov.uk/ipo-tmtext
- Also search by owner "Blizzard Entertainment" in each database, sorted by filing date, for any 2025-2026 "Forever" filings.

## 3. Platform rules

- **Google Play, Metadata** (https://support.google.com/googleplay/android-developer/answer/9898842): "Your app title must be 30 characters or less." No emojis or repeated special characters, no ALL CAPS unless part of the brand, no ranking, price or promotional text in the title. Metadata must not be "misleading, improperly formatted, non-descriptive, irrelevant". "Don't use a celebrity's name or a brand's logo without permission."
- **Google Play, Impersonation** (https://support.google.com/googleplay/android-developer/answer/9888374): "Don't imply that your app is related to or authorized by someone that it isn't." Example violation: "App titles and icons that are so similar to those of existing products or services that users may be misled."
- **Google Play, Intellectual Property** (https://support.google.com/googleplay/android-developer/answer/9888072): "We don't allow apps that infringe on others' trademarks." Apps that use another party's marks in a way likely to cause confusion "may be suspended". Rights holders are told to contact the developer first, then use Google's trademark complaint form.
- **Apple App Store Review Guidelines** (https://developer.apple.com/app-store/review/guidelines/):
  - 2.3.7: "Choose a unique app name ... don't try to pack any of your metadata with trademarked terms, popular app names ... App names must be limited to 30 characters."
  - 4.1(a)/(b)/(c): no minor changes to another app's name; impersonation can lead to removal; "You cannot use another developer's icon, brand, or product name in your app's icon or name, without approval from the developer."
  - 5.2.1: no "misleading, false, or copycat representations, names, or metadata".
  - Apple's guideline 4.1(c) is relevant to the CurseForge addon and GitHub projects named "Forever Companion".
- **Length:** "Forever Companion" (17 characters) and "Companion Forever" (17) both fit within 30. Adding a descriptor, e.g. "X: Character Tracker", must also fit.
- **Expo/EAS:** no naming policy affects the display name. `apps/mobile/app.json` (checked 2026-11-08) has `name: "Companion Forever"`, `slug: "companion-forever"`, `scheme: "companionforever"`, `android.package` and `ios.bundleIdentifier` = `io.github.embermleaf.companionforever` (the Accepted decision in DECISIONS.md, 2026-11-07). The package id cannot change after the first Play upload, but users do not see it as a brand. Changing the public display name later does not require changing the package id. **This review does not propose changing the package id.**

## 4. Risk assessment

Ratings are the agent's judgement, not a legal conclusion.

| Risk | "Forever Companion" | "Companion Forever" | Reasons |
|---|---|---|---|
| Implied Blizzard affiliation (API ToU §2(m)/§4, Blizzard guidelines, Play Impersonation, Apple 5.2.1) | **High** | **Medium-High** | Combines Blizzard's current product subtitle "Forever" with "Companion", the word from Blizzard's retired "WoW Companion App". Reads as "the official WoW: Forever companion app". The word-order swap helps only a little. |
| Conflict with prior users in the same niche | **High** | **Medium** | The identical name is used for a WoW: Forever addon (CurseForge) and several GitHub tools. `daddler/Companion-Forever` uses the swapped name for the same concept. Possible priority of unregistered rights (US common law); EU/UK rights depend mainly on registration (UNVERIFIED). |
| Registered marks | Unknown | Unknown | Registries not searched (section 2.4). "FOREVER" alone is registered by others in some classes (aggregator data, UNVERIFIED). |
| Confusion with AI-companion apps | Medium | Medium | "Forever Companion" was an adult AI-chatbot brand (Forever Voices). "Companion" in a store title signals "AI companion" to many users. |
| Distinctiveness / enforceability of your own brand | Low distinctiveness | Low distinctiveness | "Companion" is descriptive or generic for game apps; "forever" is common and laudatory. Together, in this niche, it describes "a companion for Forever". You would find it hard to stop others using it, and others are already using it. |
| Store rejection or takedown | Medium | Low-Medium | A complaint by Blizzard or a prior user under the Play IP/Impersonation policies or Apple 4.1/5.2 could cause suspension or a forced rename after launch, when rebranding costs the most. |

Jurisdiction notes: none confirmed. US: unregistered first-use rights can exist (Lanham Act §43(a)), so the CurseForge addon's earlier use matters. EU/UK: registration matters more, so search EUIPO, TMview and UK IPO. All **UNVERIFIED** pending professional advice.

## 5. Recommendation and alternatives

1. **Keep `companion-forever` as the internal codename and repository name** for now. It is already in package ids, the URL scheme and docs. Changing it is a separate decision.
2. **Do not use "Forever Companion" publicly.** Of the two, "Companion Forever" is less bad but still not recommended, for the reasons in section 4.
3. **Choose a distinctive public name** with no "Forever", no "Companion", no "WoW", "Warcraft", "Azeroth", "Hearth" (too close to Hearthstone) or "Battle". Describe compatibility only in the store description and in plain words, e.g. "for World of Warcraft players", and check that wording against §2(m) and the guidelines before use.

Shortlist. These fit the existing hawthorn/lantern/journal visual identity (STYLE-GUIDE.md). Only an exact-phrase GitHub repository search was run (2026-11-08). Store, web, domain and trademark availability are all **UNVERIFIED**:

| Candidate | Characters | GitHub exact-name hits (2026-11-08) | Notes |
|---|---|---|---|
| Hawthorn Ledger | 15 | none found | Uses the signature hawthorn motif; "ledger" suggests a tracker. |
| Hawthorn Journal | 16 | none found | Softer; fits the "adventurer's journal" style. |
| Thornbook | 9 | none found | Short, coined; check the app stores for e-book apps. |
| Waymark Journal | 15 | none found | "Waymark" is a general English word; check map/hiking apps. |
| Lanternwatch | 12 | 3 small repositories | Matches the lantern icon; prior hits need a closer look. |

Avoided after a quick check: "Lantern Ledger" (5+ repositories), "Trailkeeper" (5+), "Wayfarer Ledger" (3, including a releases repository), "Questwright" (4), "Emberleaf" (5+, and close to the owner's handle).

Disclaimer wording already in use, which should appear in the store description, the About screen and the website: "Independent fan-made tool. Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment." (Final wording still needs owner approval, see WIP.) A disclaimer reduces confusion but does not cure a confusing name.

## 6. Cheap steps for the owner (in order)

1. Shortlist 2-3 names (section 5 or your own).
2. Run your own knock-out search in USPTO, EUIPO eSearch, TMview, WIPO Brand DB and UK IPO (section 2.4), classes 9/41/42/28, for each candidate and for "FOREVER" filings by Blizzard.
3. Search Google Play and the App Store in a browser for each candidate (exact and close variants), plus CurseForge, Wago and GitHub.
4. Check domain and handle availability: `.app`/`.com`/`.dev`, GitHub organisation, store developer name, and any social handles you plan to use.
5. Before public launch, pay a qualified trademark professional for a clearance search and opinion on the chosen name in your launch markets. Consider registering it in class 9 later if budget allows (owner decision; no funding implications assumed).
6. Record the outcome as an ADR (branding/trademark is a **Protected** area under GOVERNANCE.md), then rename the display name (`app.json` `name`, store listing, README) without changing the package id.

## Hawthorn Journal (owner choice 2026-11-08)

The owner chose "Hawthorn Journal" as the public app name (codename and package id unchanged). That name has its own review: [NAMING-REVIEW-hawthorn-journal.md](NAMING-REVIEW-hawthorn-journal.md) (Preliminary, not legal advice; agent rating MEDIUM, driven by a Class 9 "HAWTHORN" game-software filing by Near Studios Inc.). The proposed decision is [ADR-0007](adr/0007-public-app-name.md) (Proposed).

## Sources (all read or searched 2026-11-08)

Primary: Blizzard Developer API Terms (§2(m), §4); Blizzard Trademark Usage Guidelines; Blizzard News "Pre-Purchase the World of Warcraft®: Forever Collector's Edition"; WoW News "The WoW Companion App Retiring"; Google Play Metadata, Impersonation and Intellectual Property help pages; Apple App Store Review Guidelines; `apps/mobile/app.json`; CurseForge "Forever Companion" addon page; GitHub repository search via `gh`.
Secondary (context only): Decrypt (Forever Voices); 2news.com (Reno vet service); trademarkelite.com and trademarkdir.com ("FOREVER" registrations); Wikipedia, Variety and Windows Central (WoW: Forever); Blizzard Legal FAQ (search snippet only).
