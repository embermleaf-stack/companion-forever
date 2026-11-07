// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import * as S from "./scan";

const root = resolve(__dirname, "../..");
const repo = S.collectFiles(root);
const f = (path: string, content = "") => [{ path, content }];

describe("canary scanner sanity", () => {
  it("scans real source files", () => {
    expect(repo.some((x) => x.path.startsWith("packages/"))).toBe(true);
    expect(repo.some((x) => x.path.startsWith("apps/"))).toBe(true);
    expect(repo.some((x) => x.path === ".github/FUNDING.yml")).toBe(true);
  });
});

const cases: Array<[string, (x: S.SourceFile[]) => S.Violation[], S.SourceFile[]]> = [
  ["C-02", S.scanC02, f("packages/x/model.m2")],
  ["C-03", S.scanC03, f("packages/core/src/x.ts", 'fetch("https://www.wowhead.com/item=1")')],
  ["C-04", S.scanC04, f("apps/web/src/x.ts", 'import Stripe from "stripe";')],
  ["C-05", S.scanC05, f(".github/FUNDING.yml", "# c\ngithub: someone\n")],
  ["C-06", S.scanC06, f("apps/web/src/x.ts", "SendInput(keys)")],
  ["C-07", S.scanC07, f("packages/core/src/x.ts", "ReadProcessMemory(h)")],
  ["C-08", S.scanC08, f("fixtures/a.json", '{"name":"x"}')],
  ["C-09", S.scanC09, f("apps/web/src/x.tsx", "<h1>Official Blizzard Logo</h1>")],
];

describe.each(cases)("%s", (id, scan, bad) => {
  it("passes on the real repository", () => {
    expect(scan(repo)).toEqual([]);
  });
  it("fails on a deliberate violation", () => {
    const v = scan(bad);
    expect(v.length).toBeGreaterThan(0);
    expect(v[0].canary).toBe(id);
  });
});

describe("canary edge cases", () => {
  it("C-03 allows documented hosts", () => {
    expect(S.scanC03(f("apps/web/public/icon.svg",
      'xmlns="http://www.w3.org/2000/svg" http://localhost:5173 https://github.com/embermleaf-stack/companion-forever'))).toEqual([]);
  });
  it("C-05 ignores comment-only FUNDING.yml", () => {
    expect(S.scanC05(f(".github/FUNDING.yml", "# github: x\n\n"))).toEqual([]);
  });
  it("C-08 accepts synthetic fixtures and rejects non-JSON", () => {
    expect(S.scanC08(f("fixtures/a.json", '{"synthetic":true}'))).toEqual([]);
    expect(S.scanC08(f("fixtures/b.json", "not json")).length).toBe(1);
  });
  it("C-09 allows negated disclaimers", () => {
    expect(S.scanC09(f("apps/web/src/x.tsx", "Not affiliated with, endorsed by Blizzard"))).toEqual([]);
  });
  it("C-09 allows 'unofficial'", () => {
    expect(S.scanC09(f("apps/web/src/x.tsx", "An unofficial fan project"))).toEqual([]);
  });
});
