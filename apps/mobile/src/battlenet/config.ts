// SPDX-License-Identifier: GPL-3.0-only
// Auth configuration is injected at build/run time. Nothing about hosts, client ids or secrets is
// hard-coded in the repository (hard boundary 3; canary C-03). By default the config is ABSENT.

export type AuthMode = "pkce" | "handoff";

export interface AuthConfig {
  /** "pkce" (primary, ADR-0006 option B) or "handoff" (fallback A1 via a backend; interface only). */
  mode: AuthMode;
  /** OAuth client id. Not a secret, but supplied via app config/env only. No client secret ever exists in the app. */
  clientId: string;
  authorizeUrl: string;
  tokenUrl: string;
  /** Full URL of the account character list endpoint. */
  profileUrl: string;
  /**
   * HTTPS callback page registered with the provider. Sent in /authorize AND in the token exchange
   * (must be identical). The provider form accepts only http(s) redirect URLs. Env-supplied only.
   */
  redirectUri: string;
  /** App-scheme URL the callback page hands the result to; the in-app browser session watches for it. */
  returnUrl: string;
  scopes: string[];
  /** Only for mode "handoff": the backend base URL. */
  backendBaseUrl?: string;
}

export const APP_SCHEME = "companionforever";
export const DEFAULT_RETURN_URL = `${APP_SCHEME}://bnet-callback`;
export const DEFAULT_SCOPES = ["wow.profile"];

/** Build a config from a plain key/value source; returns null unless everything required is present. */
export function authConfigFromEnv(env: Record<string, string | undefined>): AuthConfig | null {
  const clientId = env.clientId?.trim();
  const authorizeUrl = env.authorizeUrl?.trim();
  const tokenUrl = env.tokenUrl?.trim();
  const profileUrl = env.profileUrl?.trim();
  const redirectUri = env.redirectUri?.trim();
  if (!clientId || !authorizeUrl || !tokenUrl || !profileUrl || !redirectUri) return null;
  const mode: AuthMode = env.mode === "handoff" ? "handoff" : "pkce";
  const backendBaseUrl = env.backendBaseUrl?.trim() || undefined;
  if (mode === "handoff" && !backendBaseUrl) return null;
  return {
    mode,
    clientId,
    authorizeUrl,
    tokenUrl,
    profileUrl,
    redirectUri,
    returnUrl: DEFAULT_RETURN_URL,
    scopes: DEFAULT_SCOPES,
    ...(backendBaseUrl ? { backendBaseUrl } : {}),
  };
}
