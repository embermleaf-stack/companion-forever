// SPDX-License-Identifier: GPL-3.0-only
// FALLBACK INTERFACE ONLY (ADR-0006 option A1). No backend exists. Selected by AuthConfig.mode = "handoff".
// Kept as a seam so a token-exchange backend can be added later without touching the UI.
import type { AuthConfig } from "./config";
import { BattleNetError } from "./errors";

export type AuthSessionResult = { type: "success"; url: string } | { type: "cancel" | "dismiss" };
/** Opens the URL in the system browser and resolves when it redirects to `redirectUri`. */
export type OpenAuthSession = (url: string, redirectUri: string) => Promise<AuthSessionResult>;

export interface HandoffBackend {
  /** Runs the backend-terminated flow and returns a user access token. */
  signIn(args: {
    config: AuthConfig;
    verifier: string;
    state: string;
    openAuthSession: OpenAuthSession;
  }): Promise<{ accessToken: string; expiresInSec: number }>;
}

/** Stub: there is no backend. */
export class NotConfiguredHandoffBackend implements HandoffBackend {
  async signIn(): Promise<{ accessToken: string; expiresInSec: number }> {
    throw new BattleNetError("not-configured", "Backend sign-in is not configured.");
  }
}
