// SPDX-License-Identifier: GPL-3.0-only
// Data minimization for the account character list response. The response shape is taken from
// the provider's documentation and is UNVERIFIED (ADR-0006 F5): this mapper reads only the
// allowlisted fields below and drops everything else (account ids, guild, faction, etc.).

export interface ImportedCharacter {
  name: string;
  realm: string;
  className: string;
  level: number;
  blizzardId: string;
}

const MAX_CHARACTERS = 1000;
const MAX_STR = 100;

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function nameOf(v: unknown): string | undefined {
  // Localized objects look like { name: "..." } or a plain string.
  const s = typeof v === "string" ? v : isObj(v) && typeof v.name === "string" ? v.name : undefined;
  if (s === undefined) return undefined;
  const t = s.trim();
  return t.length > 0 && t.length <= MAX_STR ? t : undefined;
}

/**
 * Map a parsed profile response to the minimal character list. Throws on a structurally invalid
 * response. Individual malformed entries are skipped, not trusted. An account with no characters
 * yields an empty list.
 */
export function mapProfileResponse(input: unknown): ImportedCharacter[] {
  let json = input;
  if (typeof input === "string") {
    try {
      json = JSON.parse(input);
    } catch {
      throw new Error("malformed JSON in profile response");
    }
  }
  if (!isObj(json)) throw new Error("profile response must be an object");
  const accounts = json.wow_accounts;
  if (!Array.isArray(accounts)) throw new Error("profile response missing wow_accounts");
  const out: ImportedCharacter[] = [];
  const seen = new Set<string>();
  for (const acct of accounts) {
    if (!isObj(acct) || !Array.isArray(acct.characters)) continue;
    for (const ch of acct.characters) {
      if (!isObj(ch)) continue;
      const name = nameOf(ch.name);
      const realm = nameOf(ch.realm);
      const className = nameOf(ch.playable_class);
      const level = ch.level;
      const id = typeof ch.id === "number" && Number.isSafeInteger(ch.id) && ch.id > 0 ? String(ch.id) : undefined;
      if (!name || !realm || !className || id === undefined) continue;
      if (typeof level !== "number" || !Number.isInteger(level) || level < 1 || level > 1000) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ name, realm, className, level, blizzardId: id });
      if (out.length >= MAX_CHARACTERS) return out;
    }
  }
  return out;
}
