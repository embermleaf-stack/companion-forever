// SPDX-License-Identifier: GPL-3.0-only
// BattleNetProvider: lists the signed-in player's characters. Fetch, token source and clock are injected.
import { mapProfileResponse, type Character, type CharacterProvider, type Provenance } from "@companion/core";
import type { FetchLike } from "./auth";
import { BattleNetError } from "./errors";

export interface BattleNetProviderDeps {
  fetch: FetchLike;
  getToken: () => Promise<string | null>;
  profileUrl: string;
  now?: () => Date;
  /** Called when the API says the token is no longer valid (401), so the caller can wipe it. */
  onSignedOut?: () => Promise<void> | void;
}

const DEFAULT_BACKOFF_MS = 60_000;
const MAX_BACKOFF_MS = 15 * 60_000;

export class BattleNetProvider implements CharacterProvider {
  readonly id = "battlenet";
  // "api-authorized" must not ship in a release until the docs/LICENSING.md review is signed off (ADR-0006).
  readonly provenance: Provenance = {
    source: "Blizzard Battle.net API (user-authorized)",
    rights: "api-authorized",
    reference: "docs/LICENSING.md#source-register",
    retentionDays: 30,
  };
  private blockedUntil = 0;

  constructor(private readonly deps: BattleNetProviderDeps) {}

  /** Single request, no automatic retries. After a 429 further calls are refused locally until the back-off ends. */
  async listCharacters(): Promise<Omit<Character, "id">[]> {
    const now = (this.deps.now ?? (() => new Date()))();
    const nowMs = now.getTime();
    if (nowMs < this.blockedUntil) throw new BattleNetError("rate-limited", "Rate limited.", this.blockedUntil - nowMs);
    const token = await this.deps.getToken();
    if (!token) throw new BattleNetError("signed-out", "Not signed in.");
    let res;
    try {
      res = await this.deps.fetch(this.deps.profileUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
    } catch {
      throw new BattleNetError("network", "Could not reach the character service.");
    }
    if (res.status === 401) {
      await this.deps.onSignedOut?.();
      throw new BattleNetError("signed-out", "Session expired.");
    }
    if (res.status === 429) {
      const ra = Number(res.headers?.get("Retry-After"));
      const ms = Number.isFinite(ra) && ra > 0 ? Math.min(ra * 1000, MAX_BACKOFF_MS) : DEFAULT_BACKOFF_MS;
      this.blockedUntil = nowMs + ms;
      throw new BattleNetError("rate-limited", "Rate limited.", ms);
    }
    if (!res.ok) throw new BattleNetError("http", `Character service error (${res.status}).`);
    let list;
    try {
      list = mapProfileResponse(await res.text());
    } catch {
      throw new BattleNetError("malformed", "The character service returned an unreadable response.");
    }
    const importedAt = now.toISOString();
    return list.map((c) => ({ ...c, source: "blizzard" as const, importedAt }));
  }
}
