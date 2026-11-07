// SPDX-License-Identifier: GPL-3.0-only
import { beforeEach, describe, expect, it } from "vitest";
import { emptyState } from "@companion/core";
import { loadState, saveState } from "../src/storage";

function stubStorage(): Map<string, string> {
  const m = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
  return m;
}

describe("storage", () => {
  let m: Map<string, string>;
  beforeEach(() => { m = stubStorage(); });

  it("returns empty state when nothing saved", () => {
    expect(loadState()).toEqual(emptyState());
  });
  it("round-trips saved state", () => {
    const s = emptyState();
    saveState(s);
    expect(m.size).toBe(1);
    expect(loadState()).toEqual(s);
  });
  it("falls back to empty on corrupt data", () => {
    m.set([...m.keys()][0] ?? "companion-forever:state:v1", "{not json");
    expect(loadState()).toEqual(emptyState());
  });
  it("does not throw when storage is unavailable", () => {
    delete (globalThis as any).localStorage;
    expect(() => saveState(emptyState())).not.toThrow();
    expect(loadState()).toEqual(emptyState());
  });
});
