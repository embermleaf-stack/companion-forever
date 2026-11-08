// SPDX-License-Identifier: GPL-3.0-only
// Production wiring (React Native only). Tests build the pieces directly with fakes.
import * as Crypto from "expo-crypto";
import type { AuthConfig } from "./config";
import type { FetchLike } from "./auth";
import { BattleNetProvider } from "./provider";
import { signIn } from "./signIn";
import { createSecureTokenStore } from "./secureTokenStore";
import { openAuthSession } from "./webAuth";

export function createBattleNetServices(config: AuthConfig | null) {
  const tokenStore = createSecureTokenStore();
  const fetchFn = ((url, init) => fetch(url, init)) as FetchLike;
  return {
    configured: config !== null,
    tokenStore,
    signIn: () =>
      signIn({ config, random: (n) => Crypto.getRandomBytes(n), fetch: fetchFn, openAuthSession, tokenStore }),
    provider: () =>
      config
        ? new BattleNetProvider({
            fetch: fetchFn,
            getToken: () => tokenStore.getToken(),
            profileUrl: config.profileUrl,
            onSignedOut: () => tokenStore.clear(),
          })
        : null,
  };
}
