// SPDX-License-Identifier: GPL-3.0-only
// expo-secure-store adapter (Android Keystore-backed; not restorable from Auto Backup, and
// android.allowBackup is false in app.json as well).
import * as SecureStore from "expo-secure-store";
import { createTokenStore, type SecretBackend, type TokenStore } from "./tokenStore";

export const secureBackend: SecretBackend = {
  get: (k) => SecureStore.getItemAsync(k),
  set: (k, v) => SecureStore.setItemAsync(k, v),
  remove: (k) => SecureStore.deleteItemAsync(k),
};

export function createSecureTokenStore(): TokenStore {
  return createTokenStore(secureBackend);
}
