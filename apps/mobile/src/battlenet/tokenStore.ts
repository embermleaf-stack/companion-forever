// SPDX-License-Identifier: GPL-3.0-only
// Access-token storage. The token lives ONLY behind a SecretBackend (expo-secure-store in the app):
// never AsyncStorage, never exports, never logs. No refresh token is assumed or stored.

export interface SecretBackend {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

export interface TokenStore {
  /** Valid token or null. An expired token is wiped as a side effect. */
  getToken(): Promise<string | null>;
  setToken(accessToken: string, expiresInSec: number): Promise<void>;
  clear(): Promise<void>;
}

export const TOKEN_KEY = "companion-forever.bnet.token";
/** Treat the token as expired this long before its real expiry. */
export const EXPIRY_MARGIN_MS = 60_000;

export function createTokenStore(backend: SecretBackend, now: () => Date = () => new Date()): TokenStore {
  const clear = async () => {
    try {
      await backend.remove(TOKEN_KEY);
    } catch {
      /* nothing more can be done; the token is not used after clear is requested */
    }
  };
  return {
    async getToken() {
      let raw: string | null;
      try {
        raw = await backend.get(TOKEN_KEY);
      } catch {
        return null;
      }
      if (!raw) return null;
      try {
        const o = JSON.parse(raw) as { t?: unknown; e?: unknown };
        if (typeof o.t === "string" && o.t && typeof o.e === "number" && now().getTime() < o.e - EXPIRY_MARGIN_MS) return o.t;
      } catch {
        /* fall through to wipe */
      }
      await clear();
      return null;
    },
    async setToken(accessToken, expiresInSec) {
      await backend.set(TOKEN_KEY, JSON.stringify({ t: accessToken, e: now().getTime() + expiresInSec * 1000 }));
    },
    clear,
  };
}
