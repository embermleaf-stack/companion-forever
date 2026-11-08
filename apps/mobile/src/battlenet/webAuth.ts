// SPDX-License-Identifier: GPL-3.0-only
// System-browser auth session (Android Custom Tabs via expo-web-browser). Never a WebView.
import * as WebBrowser from "expo-web-browser";
import type { OpenAuthSession } from "./handoff";

export const openAuthSession: OpenAuthSession = async (url, redirectUri) => {
  const r = await WebBrowser.openAuthSessionAsync(url, redirectUri);
  return r.type === "success" ? { type: "success", url: r.url } : { type: r.type === "cancel" ? "cancel" : "dismiss" };
};
