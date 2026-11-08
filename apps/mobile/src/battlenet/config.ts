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
  /** Custom-scheme redirect (scheme declared in app.json). The redirect forms the provider accepts are UNVERIFIED. */
  redirectUri: string;
  scopes: string[];
  /** Only for mode "handoff": the backend base URL. */
  backendBaseUrl?: string;
}

export const APP_SCHEME = "companionforever";
export const DEFAULT_REDIRECT_URI = `${APP_SCHEME}://bnet-callback`;
export const DEFAULT_SCOPES = ["wow.profile"];

/** Build a config from a plain key/value source; returns null unless everything required is present. */
export function authConfigFromEnv(env: Record<string, string | undefined>): AuthConfig | null {
  const clientId = env.clientId?.trim();
  const authorizeUrl = env.authorizeUrl?.trim();
  const tokenUrl = env.tokenUrl?.trim();
  const profileUrl = env.profileUrl?.trim();
  if (!clientId || !authorizeUrl || !tokenUrl || !profileUrl) return null;
  const mode: AuthMode = env.mode === "handoff" ? "handoff" : "pkce";
  const backendBaseUrl = env.backendBaseUrl?.trim() || undefined;
  if (mode === "handoff" && !backendBaseUrl) return null;
  return {
    mode,
    clientId,
    authorizeUrl,
    tokenUrl,
    profileUrl,
    redirectUri: env.redirectUri?.trim() || DEFAULT_REDIRECT_URI,
    scopes: DEFAULT_SCOPES,
    ...(backendBaseUrl ? { backendBaseUrl } : {}),
  };
}
