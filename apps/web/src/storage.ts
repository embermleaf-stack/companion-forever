// SPDX-License-Identifier: GPL-3.0-only
import { emptyState, exportState, parseState, type AppState } from "@companion/core";

const KEY = "companion-forever:state:v1";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return parseState(JSON.parse(raw));
  } catch {
    return emptyState();
  }
}

export function saveState(s: AppState): void {
  try {
    localStorage.setItem(KEY, exportState(s));
  } catch {
    /* storage unavailable or full; app keeps working in memory */
  }
}
