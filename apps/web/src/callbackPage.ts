// SPDX-License-Identifier: GPL-3.0-only
// Entry for bnet-callback/index.html. No storage, no network, no logging of the query string.
import { buildAppLink, buildIntentLink, describeResult, parseCallback } from "./callback";
import "./callback.css";

const r = parseCallback(window.location.search);
const app = buildAppLink(r);
const intent = buildIntentLink(r);

document.getElementById("status")!.textContent = describeResult(r);
if (r.kind === "error" && r.errorDescription) {
  const el = document.getElementById("detail")!;
  el.textContent = r.errorDescription;
  el.hidden = false;
}

if (app && intent) {
  const open = document.getElementById("open") as HTMLAnchorElement;
  const plain = document.getElementById("plain") as HTMLAnchorElement;
  const isAndroid = /Android/i.test(navigator.userAgent);
  open.href = isAndroid ? intent : app;
  plain.href = app;
  document.getElementById("actions")!.hidden = false;
  // Keep the one-time code out of the address bar/history before handing off.
  try {
    window.history.replaceState(null, "", window.location.pathname);
  } catch {
    /* ignore */
  }
  window.location.replace(app);
}
