// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { checkLockfile, classifyLicense, installedReader, notedPackages, type LicenseException, type Lockfile } from "./licenses";

const root = resolve(__dirname, "../..");
const lock: Lockfile = JSON.parse(readFileSync(resolve(root, "package-lock.json"), "utf8"));
const exceptions: LicenseException[] = JSON.parse(readFileSync(resolve(__dirname, "license-exceptions.json"), "utf8"));
const mk = (license: unknown, name = "bad-pkg"): Lockfile => ({ packages: { "": {}, [`node_modules/${name}`]: { version: "1.0.0", license } } });

describe("C-10 real repository", () => {
  it("lockfile is non-trivial", () => {
    expect(Object.keys(lock.packages ?? {}).length).toBeGreaterThan(100);
  });
  it("passes on the real repository (with reviewed exceptions)", () => {
    expect(checkLockfile(lock, exceptions)).toEqual([]);
  });
  it("passes using installed package.json fallback reader too", () => {
    expect(checkLockfile(lock, exceptions, installedReader(root))).toEqual([]);
  });
  it("every exception has reason, reviewer and date", () => {
    for (const e of exceptions) { expect(e.reason).toBeTruthy(); expect(e.reviewedBy).toBeTruthy(); expect(e.date).toMatch(/^\d{4}-\d{2}-\d{2}$/); }
  });
  it("records MPL-2.0 packages as allowed-with-note", () => {
    expect(notedPackages(lock).length).toBeGreaterThan(0);
  });
});

describe("C-10 classification", () => {
  it.each(["MIT", "Apache-2.0", "GPL-3.0-only", "GPL-3.0-or-later", "LGPL-3.0-only", "CC-BY-4.0", "(MIT OR CC0-1.0)",
    "(BSD-3-Clause OR GPL-2.0)", "MIT AND ISC", "MIT AND (ISC OR GPL-2.0-only)"])("allows %s", (l) => {
    expect(["allowed", "allowed-with-note"]).toContain(classifyLicense(l));
  });
  it("MPL-2.0 is allowed with a note", () => expect(classifyLicense("MPL-2.0")).toBe("allowed-with-note"));
  it.each(["GPL-2.0-only", "GPL-2.0", "proprietary", "UNLICENSED", "SEE LICENSE IN LICENSE.txt", "MIT AND GPL-2.0-only",
    "GPL-2.0-only OR Proprietary", "LGPL-2.1", "CC-BY-NC-4.0", "", undefined, null, 42, "MIT OR", "(MIT"])("rejects %s", (l) => {
    expect(classifyLicense(l)).toBe("violation");
  });
  it("AGPL needs ADR-0004", () => {
    expect(classifyLicense("AGPL-3.0")).toBe("needs-adr");
    expect(classifyLicense("AGPL-3.0-only")).toBe("needs-adr");
  });
});

describe("C-10 fails on deliberate violations", () => {
  it.each(["GPL-2.0-only", "proprietary", "UNLICENSED", "SEE LICENSE IN EULA", undefined])("flags %s", (l) => {
    const v = checkLockfile(mk(l));
    expect(v).toHaveLength(1);
    expect(v[0].canary).toBe("C-10");
  });
  it("flags AGPL-3.0 as needing ADR-0004", () => {
    expect(checkLockfile(mk("AGPL-3.0"))[0].detail).toContain("ADR-0004");
  });
  it("a complete reviewed exception suppresses; a mismatched version does not", () => {
    const ex: LicenseException = { package: "bad-pkg", version: "1.0.0", license: "UNLICENSED", reason: "test", reviewedBy: "pending-owner", date: "2026-11-07" };
    expect(checkLockfile(mk("UNLICENSED"), [ex])).toEqual([]);
    expect(checkLockfile(mk("UNLICENSED"), [{ ...ex, version: "2.0.0" }])).toHaveLength(1);
  });
  it("falls back to installed license when lock lacks one, and flags missing", () => {
    expect(checkLockfile(mk(undefined), [], () => "MIT")).toEqual([]);
    expect(checkLockfile(mk(undefined), [], () => undefined)).toHaveLength(1);
  });
});
