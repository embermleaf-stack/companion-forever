// SPDX-License-Identifier: GPL-3.0-only
// Build-time feature flags and injected configuration. Nothing here is a secret.
import { authConfigFromEnv, type AuthConfig } from "./battlenet/config";

declare const process: { env: Record<string, string | undefined> };

/**
 * Battle.net import (ADR-0006, status Proposed). OFF by default; a local build turns it on with
 * EXPO_PUBLIC_FEATURE_BATTLENET=1. Do not turn on in a release build
 * before the owner accepts the ADR and the legal review is recorded.
 */
export const FEATURE_BATTLENET = process.env.EXPO_PUBLIC_FEATURE_BATTLENET === "1";

/**
 * Auth config comes only from EXPO_PUBLIC_BNET_* environment variables at build time. Absent by
 * default, so no hostnames or client ids are committed. A client SECRET must never be put here.
 */
export function getAuthConfig(): AuthConfig | null {
  return authConfigFromEnv({
    clientId: process.env.EXPO_PUBLIC_BNET_CLIENT_ID,
    authorizeUrl: process.env.EXPO_PUBLIC_BNET_AUTHORIZE_URL,
    tokenUrl: process.env.EXPO_PUBLIC_BNET_TOKEN_URL,
    profileUrl: process.env.EXPO_PUBLIC_BNET_PROFILE_URL,
    redirectUri: process.env.EXPO_PUBLIC_BNET_REDIRECT_URI,
    mode: process.env.EXPO_PUBLIC_BNET_MODE,
    backendBaseUrl: process.env.EXPO_PUBLIC_BNET_BACKEND_URL,
  });
}
