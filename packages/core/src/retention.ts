// SPDX-License-Identifier: GPL-3.0-only
// Retention enforcement for API-derived records (ADR-0006, Blizzard terms 30-day TTL, finding F11).
// Pure: no I/O, the clock is injected.
import type { AppState, Character } from "./types.js";
import { defaultIdGen } from "./store.js";

export const DEFAULT_RETENTION_DAYS = 30;
const DAY_MS = 86_400_000;

/** True for records that came from a provider API (and are therefore subject to the TTL). */
export function isApiDerived(c: Character): boolean {
  return c.source !== undefined && c.source !== "manual";
}

/**
 * Remove API-derived records whose `importedAt` is at least `retentionDays` old (age >= TTL is
 * expired). Records with a missing, unparseable or far-future timestamp are removed too (fail
 * closed). Manual records are never touched. Returns the same array instance when nothing changed.
 */
export function purgeExpired(
  characters: Character[],
  now: Date,
  retentionDays: number = DEFAULT_RETENTION_DAYS,
): Character[] {
  const nowMs = now.getTime();
  if (Number.isNaN(nowMs)) return characters; // cannot judge age without a valid clock
  const ttl = retentionDays * DAY_MS;
  const keep = characters.filter((c) => {
    if (!isApiDerived(c)) return true;
    const t = c.importedAt === undefined ? NaN : Date.parse(c.importedAt);
    if (Number.isNaN(t)) return false;
    // Future-dated beyond 5 minutes of skew is untrustworthy: treat as expired.
    if (t - nowMs > 5 * 60_000) return false;
    return nowMs - t < ttl;
  });
  return keep.length === characters.length ? characters : keep;
}

/** Remove every API-derived record (sign-out / disconnect / de-link). Manual records are kept. */
export function removeApiDerived(characters: Character[]): Character[] {
  return characters.filter((c) => !isApiDerived(c));
}

/**
 * State-level retention: purge expired API-derived characters and the completion history that
 * belonged to them. Returns the same state object when nothing changed.
 */
export function applyRetention(s: AppState, now: Date, retentionDays: number = DEFAULT_RETENTION_DAYS): AppState {
  const kept = purgeExpired(s.characters, now, retentionDays);
  if (kept === s.characters) return s;
  return dropCharacters(s, kept);
}

/** Disconnect / de-link: delete every API-derived character and its completion history. */
export function disconnectProvider(s: AppState): AppState {
  const kept = removeApiDerived(s.characters);
  return kept.length === s.characters.length ? s : dropCharacters(s, kept);
}

function dropCharacters(s: AppState, kept: Character[]): AppState {
  const keepIds = new Set(kept.map((c) => c.id));
  const gone = s.characters.filter((c) => !keepIds.has(c.id)).map((c) => `::${c.id}`);
  const completions = Object.fromEntries(
    Object.entries(s.completions).filter(([k]) => !gone.some((suffix) => k.endsWith(suffix))),
  );
  return { ...s, characters: kept, completions };
}

export interface ImportedInput {
  name: string;
  realm: string;
  className: string;
  level: number;
  blizzardId: string;
}

/**
 * Merge a fresh import into state. Existing blizzard records matched by blizzardId are updated in
 * place (keeping id and completion history) and re-stamped; new ones are added; blizzard records no
 * longer on the account are deleted (existence check, F11). Manual records are never modified.
 */
export function mergeImported(
  s: AppState,
  imported: ImportedInput[],
  now: Date,
  idGen: () => string = defaultIdGen,
): AppState {
  const importedAt = now.toISOString();
  const byBid = new Map(imported.map((i) => [i.blizzardId, i]));
  const have = new Set<string>();
  const characters: Character[] = [];
  for (const c of s.characters) {
    if (!isApiDerived(c)) {
      characters.push(c);
      continue;
    }
    const fresh = c.blizzardId !== undefined ? byBid.get(c.blizzardId) : undefined;
    if (!fresh) continue; // no longer on the account (or untraceable): delete
    have.add(fresh.blizzardId);
    characters.push({ ...c, ...pick(fresh), source: "blizzard", importedAt });
  }
  for (const i of imported) {
    if (have.has(i.blizzardId)) continue;
    characters.push({ id: idGen(), ...pick(i), source: "blizzard", importedAt });
  }
  return dropCharacters(s, characters);
}

function pick(i: ImportedInput) {
  return { name: i.name, realm: i.realm, className: i.className, level: i.level, blizzardId: i.blizzardId };
}
