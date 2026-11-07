// SPDX-License-Identifier: GPL-3.0-only
// Pure scanners for negative canaries C-02..C-09. See docs/CANARIES.md.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export interface SourceFile { path: string; content: string }
export interface Violation { canary: string; path: string; detail: string }

const norm = (p: string) => p.replace(/\\/g, "/");
const isCode = (p: string) => /\.(ts|tsx|js|jsx|mjs|cjs|html|css|json|webmanifest|svg|lua|toc|xml)$/i.test(p);
const inDir = (p: string, d: string) => norm(p).startsWith(d + "/");
const isManifest = (p: string) => /(^|\/)package(-lock)?\.json$/.test(p);
const isAppSource = (p: string) => (inDir(p, "packages") || inDir(p, "apps")) && isCode(p) && !isManifest(p);

/** Directories/files legitimately listing forbidden terms, plus build output. */
const SKIP = [/(^|\/)node_modules\//, /(^|\/)dist\//, /^docs\//, /^icons-and-imagery\//, /^tests\/canaries\//,
  /^AGENTS\.md$/, /^README\.md$/, /^HANDOFF\.md$/, /^\.git\//];

export function collectFiles(root: string): SourceFile[] {
  const out: SourceFile[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const st = statSync(full);
      const rel = norm(relative(root, full));
      if (SKIP.some((r) => r.test(rel + (st.isDirectory() ? "/" : "")))) continue;
      if (st.isDirectory()) { walk(full); continue; }
      const binary = /\.(png|jpe?g|gif|ico|woff2?|webp)$/i.test(name) || st.size > 2_000_000;
      out.push({ path: rel, content: binary ? "" : readFileSync(full, "utf8") });
    }
  };
  for (const d of ["packages", "apps", "fixtures", ".github", "tests"]) {
    try { walk(join(root, d)); } catch { /* dir may not exist */ }
  }
  return out;
}

const lines = (c: string) => c.split(/\r?\n/);

function lineScan(files: SourceFile[], canary: string, re: RegExp, allowNegated = false): Violation[] {
  const v: Violation[] = [];
  for (const f of files)
    lines(f.content).forEach((l, i) => {
      const m = re.exec(l);
      if (m && allowNegated && /\b(not|no|never)\b[^.]*$/i.test(l.slice(0, m.index))) return;
      if (m) v.push({ canary, path: f.path, detail: `line ${i + 1}: ${m[0]}` });
    });
  return v;
}

// C-02 protected game assets
const FORBIDDEN_EXT = /\.(blp|m2|mpq|casc|adt|wdt|wmo|dbc|db2|skin|anim|bls)$/i;
export function scanC02(files: SourceFile[]): Violation[] {
  return files.filter((f) => FORBIDDEN_EXT.test(f.path))
    .map((f) => ({ canary: "C-02", path: f.path, detail: "protected game asset extension" }));
}

// C-03 scraping / non-allowlisted hosts
export const ALLOWED_HOSTS = ["localhost", "127.0.0.1", "www.w3.org", "github.com/embermleaf-stack"];
export function scanC03(files: SourceFile[]): Violation[] {
  const v: Violation[] = [];
  for (const f of files.filter((f) => isAppSource(f.path))) {
    for (const m of f.content.matchAll(/https?:\/\/([^\s"'`)<>\\]+)/gi)) {
      const hp = m[1];
      const ok = ALLOWED_HOSTS.some((h) => hp === h || hp.startsWith(h + "/") || hp.startsWith(h + ":"));
      if (!ok) v.push({ canary: "C-03", path: f.path, detail: `non-allowlisted URL: ${m[0]}` });
    }
  }
  return v;
}

// C-04 monetization
const MONEY = /\b(adsbygoogle|googletag|google-?adsense|admob|doubleclick|stripe|paypal|braintree|paddle|lemonsqueezy|revenuecat|patreon|ko-fi|buymeacoffee|isPremium|paywall|subscriptionRequired|premiumOnly)\b/i;
export function scanC04(files: SourceFile[]): Violation[] {
  return lineScan(files.filter((f) => isAppSource(f.path) || /(^|\/)package\.json$/.test(f.path)), "C-04", MONEY);
}

// C-05 funding
export function scanC05(files: SourceFile[]): Violation[] {
  const f = files.find((x) => norm(x.path) === ".github/FUNDING.yml");
  if (!f) return [];
  return lines(f.content).filter((l) => !/^\s*(#|$)/.test(l))
    .map((l) => ({ canary: "C-05", path: f.path, detail: `active line: ${l.trim()}` }));
}

// C-06 input synthesis / automation
const INPUT = /\b(SendInput|keybd_event|mouse_event|SetCursorPos|PostMessage|robotjs|nut-js|nutjs|pyautogui|AutoHotkey|xdotool|SecureActionButtonTemplate|CastSpellByName|RunMacroText|UseAction|TargetUnit)\b|dispatchEvent\(\s*new (Keyboard|Mouse)Event/;
export function scanC06(files: SourceFile[]): Violation[] {
  return lineScan(files.filter((f) => isAppSource(f.path) || /\.(lua|toc)$/i.test(f.path)), "C-06", INPUT);
}

// C-07 memory access / injection
const INJECT = /\b(ReadProcessMemory|WriteProcessMemory|VirtualAllocEx|CreateRemoteThread|SetWindowsHookEx|LoadLibraryA|ptrace|frida|node-ffi|ffi-napi|koffi|memoryjs|DLL_PROCESS_ATTACH)\b/i;
export function scanC07(files: SourceFile[]): Violation[] {
  return lineScan(files.filter((f) => isAppSource(f.path) || /(^|\/)package\.json$/.test(f.path)), "C-07", INJECT);
}

// C-08 fixtures must be synthetic
export function scanC08(files: SourceFile[]): Violation[] {
  const v: Violation[] = [];
  for (const f of files.filter((f) => inDir(f.path, "fixtures") && /\.(json|ya?ml)$/i.test(f.path))) {
    let ok: boolean;
    if (/\.json$/i.test(f.path)) {
      try { ok = (JSON.parse(f.content) as { synthetic?: unknown })?.synthetic === true; } catch { ok = false; }
    } else ok = /^synthetic:\s*true\s*$/m.test(f.content);
    if (!ok) v.push({ canary: "C-08", path: f.path, detail: "missing `synthetic: true`" });
    if (/battletag|#\d{4,5}\b|access_token|client_secret/i.test(f.content))
      v.push({ canary: "C-08", path: f.path, detail: "looks like real account/character export" });
  }
  return v;
}

// C-09 trademark misuse in app-facing strings
const TM = /(?<![A-Za-z])official(?![A-Za-z])|blizzard[ -]logo|(endorsed|approved|sponsored|certified) by blizzard|in partnership with blizzard/i;
export function scanC09(files: SourceFile[]): Violation[] {
  return lineScan(files.filter((f) => (inDir(f.path, "apps") || inDir(f.path, "packages")) && isCode(f.path) && !isManifest(f.path) && !/\.test\.tsx?$/.test(f.path)), "C-09", TM, true);
}
