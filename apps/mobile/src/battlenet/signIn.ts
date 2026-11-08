// SPDX-License-Identifier: GPL-3.0-only
// Sign-in orchestration (system browser only; never a WebView or an in-app password field).
import { buildAuthorizeUrl, exchangeCode, parseRedirect, type FetchLike } from "./auth";
import { codeChallengeS256, createCodeVerifier, createState, type RandomBytes } from "./pkce";
import type { AuthConfig } from "./config";
import { BattleNetError } from "./errors";
import type { TokenStore } from "./tokenStore";
import { NotConfiguredHandoffBackend, type HandoffBackend, type OpenAuthSession } from "./handoff";

export interface SignInDeps {
  config: AuthConfig | null;
  random: RandomBytes;
  fetch: FetchLike;
  openAuthSession: OpenAuthSession;
  tokenStore: TokenStore;
  /** Fallback mode only. Defaults to a stub that throws "not configured". */
  handoffBackend?: HandoffBackend;
}

export async function signIn(deps: SignInDeps): Promise<void> {
  const { config } = deps;
  if (!config) throw new BattleNetError("not-configured", "Battle.net sign-in is not configured.");
  const verifier = createCodeVerifier(deps.random);
  const state = createState(deps.random);

  if (config.mode === "handoff") {
    const backend = deps.handoffBackend ?? new NotConfiguredHandoffBackend();
    const token = await backend.signIn({ config, verifier, state, openAuthSession: deps.openAuthSession });
    await deps.tokenStore.setToken(token.accessToken, token.expiresInSec);
    return;
  }

  const url = buildAuthorizeUrl(config, codeChallengeS256(verifier), state);
  const result = await deps.openAuthSession(url, config.redirectUri);
  if (result.type !== "success") throw new BattleNetError("cancelled", "Sign-in cancelled.");
  const code = parseRedirect(result.url, state);
  const token = await exchangeCode(config, code, verifier, deps.fetch);
  await deps.tokenStore.setToken(token.accessToken, token.expiresInSec);
}
