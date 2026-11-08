// SPDX-License-Identifier: GPL-3.0-only
// Pure helpers for the Battle.net callback hand-off page. Reads only code/state/error/error_description
// from the query string and builds a link with a FIXED scheme and host (no open redirect).

export const APP_SCHEME = "companionforever";
export const APP_HOST = "bnet-callback";
export const ANDROID_PACKAGE = "io.github.embermleaf.companionforever";

const TOKEN = /^[A-Za-z0-9._~-]+$/;
const ERROR_CODE = /^[A-Za-z0-9_.-]+$/;
export const MAX_CODE = 512;
export const MAX_STATE = 256;
export const MAX_ERROR = 64;
export const MAX_ERROR_DESCRIPTION = 200;

export type CallbackResult =
  | { kind: "code"; code: string; state: string }
  | { kind: "error"; error: string; errorDescription?: string; state?: string }
  | { kind: "none" };

function decode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return "";
  }
}

/** First occurrence wins; unknown keys are never read. Accepts "?a=b" or "a=b". */
function pick(search: string, wanted: readonly string[]): Record<string, string> {
  const out: Record<string, string> = Object.create(null);
  const s = search.startsWith("?") ? search.slice(1) : search;
  for (const part of s.split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    const k = decode(eq < 0 ? part : part.slice(0, eq));
    if (!wanted.includes(k) || k in out) continue;
    out[k] = eq < 0 ? "" : decode(part.slice(eq + 1));
  }
  return out;
}

function token(v: string | undefined, max: number): string | undefined {
  return v !== undefined && v.length > 0 && v.length <= max && TOKEN.test(v) ? v : undefined;
}

function cleanText(v: string, max: number): string {
  // eslint-disable-next-line no-control-regex
  return v.replace(/[\u0000-\u001f\u007f<>]/g, " ").trim().slice(0, max);
}

export function parseCallback(search: string): CallbackResult {
  const q = pick(search, ["code", "state", "error", "error_description"]);
  const state = token(q.state, MAX_STATE);
  if (q.error !== undefined) {
    const error = q.error.length > 0 && q.error.length <= MAX_ERROR && ERROR_CODE.test(q.error) ? q.error : "error";
    const desc = q.error_description !== undefined ? cleanText(q.error_description, MAX_ERROR_DESCRIPTION) : "";
    return { kind: "error", error, ...(desc ? { errorDescription: desc } : {}), ...(state ? { state } : {}) };
  }
  const code = token(q.code, MAX_CODE);
  if (code && state) return { kind: "code", code, state };
  return { kind: "none" };
}

function queryOf(r: CallbackResult): string | null {
  const e = encodeURIComponent;
  if (r.kind === "code") return `code=${e(r.code)}&state=${e(r.state)}`;
  if (r.kind === "error") {
    const parts = [`error=${e(r.error)}`];
    if (r.errorDescription) parts.push(`error_description=${e(r.errorDescription)}`);
    if (r.state) parts.push(`state=${e(r.state)}`);
    return parts.join("&");
  }
  return null;
}

export function buildAppLink(r: CallbackResult): string | null {
  const q = queryOf(r);
  return q === null ? null : `${APP_SCHEME}://${APP_HOST}?${q}`;
}

export function buildIntentLink(r: CallbackResult): string | null {
  const q = queryOf(r);
  return q === null ? null : `intent://${APP_HOST}?${q}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};end`;
}

export function describeResult(r: CallbackResult): string {
  if (r.kind === "code") return "Sign-in finished. Opening Hawthorn Ledger...";
  if (r.kind === "error") return "Sign-in was not completed. You can close this page and try again from the app.";
  return "No sign-in result was found on this page. Start the sign-in from the Hawthorn Ledger app.";
}
