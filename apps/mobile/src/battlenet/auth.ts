// SPDX-License-Identifier: GPL-3.0-only
// OAuth authorization-code + PKCE (RFC 7636) building blocks. All I/O is injected.
// Whether Blizzard accepts secret-less PKCE exchanges is the open question F3 in ADR-0006:
// the first real test with the owner's client settles it. A 400/401 on exchange is mapped to
// "pkce-not-supported-or-invalid" so the UI can say "Sign-in not available yet".
import type { AuthConfig } from "./config";
import { BattleNetError } from "./errors";

export type FetchLike = (
  url: string,
  init?: { method?: string; headers?: Record<string, string>; body?: string },
) => Promise<{ status: number; ok: boolean; headers?: { get(name: string): string | null }; text(): Promise<string> }>;

const enc = encodeURIComponent;
const form = (pairs: [string, string][]) => pairs.map(([k, v]) => `${enc(k)}=${enc(v)}`).join("&");

export function buildAuthorizeUrl(config: AuthConfig, codeChallenge: string, state: string, scopes: string[] = config.scopes): string {
  const q = form([
    ["response_type", "code"],
    ["client_id", config.clientId],
    ["redirect_uri", config.redirectUri],
    ["scope", scopes.join(" ")],
    ["state", state],
    ["code_challenge", codeChallenge],
    ["code_challenge_method", "S256"],
  ]);
  return `${config.authorizeUrl}${config.authorizeUrl.includes("?") ? "&" : "?"}${q}`;
}

function decode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

function parseQuery(url: string): Record<string, string> {
  const hashless = url.split("#")[0] ?? "";
  const i = hashless.indexOf("?");
  const out: Record<string, string> = Object.create(null);
  if (i < 0) return out;
  for (const part of hashless.slice(i + 1).split("&")) {
    if (!part) continue;
    const eq = part.indexOf("=");
    const k = decode(eq < 0 ? part : part.slice(0, eq));
    if (!(k in out)) out[k] = eq < 0 ? "" : decode(part.slice(eq + 1));
  }
  return out;
}

/** Validate the redirect and return the authorization code. Never echoes the code or state in errors. */
export function parseRedirect(url: string, expectedState: string): string {
  const q = parseQuery(url);
  if (!expectedState || q.state === undefined || q.state !== expectedState)
    throw new BattleNetError("state-mismatch", "Sign-in response did not match this request.");
  if (q.error !== undefined) throw new BattleNetError("denied", "Sign-in was not completed.");
  if (!q.code) throw new BattleNetError("invalid-redirect", "Sign-in response had no authorization code.");
  return q.code;
}

export interface TokenResponse {
  accessToken: string;
  expiresInSec: number;
}

/** Exchange the code. Sends no client secret (public client). */
export async function exchangeCode(config: AuthConfig, code: string, verifier: string, fetchFn: FetchLike): Promise<TokenResponse> {
  const body = form([
    ["grant_type", "authorization_code"],
    ["code", code],
    ["redirect_uri", config.redirectUri],
    ["client_id", config.clientId],
    ["code_verifier", verifier],
  ]);
  let res;
  try {
    res = await fetchFn(config.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body,
    });
  } catch {
    throw new BattleNetError("network", "Could not reach the sign-in service.");
  }
  if (res.status === 400 || res.status === 401)
    throw new BattleNetError("pkce-not-supported-or-invalid", "The sign-in service rejected the request.");
  if (!res.ok) throw new BattleNetError("http", `Sign-in service error (${res.status}).`);
  let json: unknown;
  try {
    json = JSON.parse(await res.text());
  } catch {
    throw new BattleNetError("malformed", "Sign-in service returned an unreadable response.");
  }
  const o = json as Record<string, unknown> | null;
  const tok = o?.access_token;
  const exp = o?.expires_in;
  if (typeof tok !== "string" || !tok || typeof exp !== "number" || !Number.isFinite(exp) || exp <= 0)
    throw new BattleNetError("malformed", "Sign-in service returned an unexpected response.");
  return { accessToken: tok, expiresInSec: Math.floor(exp) };
}
