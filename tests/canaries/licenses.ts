// SPDX-License-Identifier: GPL-3.0-only
// Pure checker for canary C-10 (incompatible dependency license). Policy: docs/LICENSING.md.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Verdict = "allowed" | "allowed-with-note" | "needs-adr" | "violation";
export interface LicenseException { package: string; version: string; license: string; reason: string; reviewedBy: string; date: string }
export interface LicenseViolation { canary: "C-10"; package: string; version: string; license: string; detail: string }
export interface LockPackage { version?: string; license?: unknown; link?: boolean }
export interface Lockfile { packages?: Record<string, LockPackage> }

const ALLOWED = new Set(["MIT", "BSD-2-Clause", "BSD-3-Clause", "ISC", "Apache-2.0", "0BSD", "CC0-1.0", "BlueOak-1.0.0",
  "Python-2.0", "Unlicense", "LGPL-3.0", "GPL-3.0", "CC-BY-4.0"]);
const NOTE = new Set(["MPL-2.0"]);
const rank: Record<Verdict, number> = { allowed: 0, "allowed-with-note": 1, "needs-adr": 2, violation: 3 };

/** Strip SPDX -only/-or-later/+ suffixes so GPL-3.0-only == GPL-3.0. Only version 3 of (L)GPL is allowed. */
function canon(id: string): string {
  return id.replace(/\+$/, "").replace(/-(only|or-later)$/, "");
}

function classifyId(raw: string): Verdict {
  const id = canon(raw);
  if (ALLOWED.has(id)) return "allowed";
  if (NOTE.has(id)) return "allowed-with-note";
  if (/^AGPL-/i.test(id)) return "needs-adr"; // ADR-0004 required
  return "violation"; // GPL-2.0, proprietary, unknown
}

/** Classify an SPDX expression. OR: best branch; AND: worst branch. Anything unparseable is a violation. */
export function classifyLicense(expr: unknown): Verdict {
  if (typeof expr !== "string" || !expr.trim()) return "violation";
  if (/^SEE LICENSE IN/i.test(expr.trim()) || /^UNLICENSED$/i.test(expr.trim())) return "violation";
  const tokens = expr.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);
  let i = 0;
  const parseOr = (): Verdict => {
    let best = parseAnd();
    while (tokens[i] === "OR") { i++; const v = parseAnd(); if (rank[v] < rank[best]) best = v; }
    return best;
  };
  const parseAnd = (): Verdict => {
    let worst = parseAtom();
    while (tokens[i] === "AND") { i++; const v = parseAtom(); if (rank[v] > rank[worst]) worst = v; }
    return worst;
  };
  const parseAtom = (): Verdict => {
    const t = tokens[i++];
    if (t === undefined || t === ")" || t === "AND" || t === "OR" || t === "WITH") throw new Error("bad expr");
    if (t === "(") { const v = parseOr(); if (tokens[i++] !== ")") throw new Error("bad expr"); return v; }
    const v = classifyId(t);
    if (tokens[i] === "WITH") i += 2; // exception clause: judged on base license
    return v;
  };
  try {
    const v = parseOr();
    return i === tokens.length ? v : "violation";
  } catch { return "violation"; }
}

const nameOf = (key: string) => key.replace(/^.*node_modules\//, "");

/** Fallback license source: installed package.json (reader is injectable for tests). */
export type ReadInstalled = (key: string) => unknown;
export const installedReader = (root: string): ReadInstalled => (key) => {
  const p = join(root, key, "package.json");
  if (!existsSync(p)) return undefined;
  try {
    const j = JSON.parse(readFileSync(p, "utf8"));
    return j.license ?? (Array.isArray(j.licenses) ? j.licenses.map((l: { type: string }) => l.type).join(" OR ") : undefined);
  } catch { return undefined; }
};

export function checkLockfile(lock: Lockfile, exceptions: LicenseException[] = [], readInstalled: ReadInstalled = () => undefined): LicenseViolation[] {
  const out: LicenseViolation[] = [];
  for (const [key, pkg] of Object.entries(lock.packages ?? {})) {
    if (key === "" || pkg.link) continue; // root and workspace symlinks
    const name = nameOf(key);
    const version = pkg.version ?? "";
    const license = pkg.license ?? readInstalled(key);
    const verdict = classifyLicense(license);
    if (verdict === "allowed" || verdict === "allowed-with-note") continue;
    const shown = typeof license === "string" ? license : String(license ?? "(missing)");
    const ex = exceptions.find((e) => e.package === name && e.version === version && e.license === shown);
    if (ex && ex.reason && ex.reviewedBy && ex.date) continue;
    out.push({ canary: "C-10", package: name, version, license: shown,
      detail: verdict === "needs-adr" ? "AGPL requires an Accepted ADR (ADR-0004) before use" : "license not permitted by docs/LICENSING.md; add a reviewed exception or remove" });
  }
  return out;
}

/** Packages allowed only with a recorded note (MPL-2.0), for the record. */
export function notedPackages(lock: Lockfile): string[] {
  return Object.entries(lock.packages ?? {}).filter(([k, p]) => k && !p.link && classifyLicense(p.license) === "allowed-with-note")
    .map(([k, p]) => `${nameOf(k)}@${p.version}`);
}
