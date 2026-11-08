// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from "vitest";
import { buildAppLink, buildIntentLink, parseCallback } from "../src/callback";

describe("callback page helpers", () => {
  it("parses code and state and ignores everything else", () => {
    const r = parseCallback("?code=abc.DEF_1~-&state=xyz-9&utm=1&next=evil");
    expect(r).toEqual({ kind: "code", code: "abc.DEF_1~-", state: "xyz-9" });
    expect(buildAppLink(r)).toBe("companionforever://bnet-callback?code=abc.DEF_1~-&state=xyz-9");
  });
  it("rejects bad charset, overlong values, missing parts", () => {
    expect(parseCallback("?code=a%20b&state=s").kind).toBe("none");
    expect(parseCallback("?code=a/b&state=s").kind).toBe("none");
    expect(parseCallback("?code=" + "a".repeat(513) + "&state=s").kind).toBe("none");
    expect(parseCallback("?code=a&state=" + "s".repeat(257)).kind).toBe("none");
    expect(parseCallback("?code=a").kind).toBe("none");
    expect(parseCallback("").kind).toBe("none");
    expect(buildAppLink(parseCallback(""))).toBeNull();
    expect(buildIntentLink(parseCallback("?x=1"))).toBeNull();
  });
  it("first occurrence wins and malformed escapes do not throw", () => {
    expect(parseCallback("?code=a&code=b&state=s")).toEqual({ kind: "code", code: "a", state: "s" });
    expect(parseCallback("?code=%E0%A4%A&state=s").kind).toBe("none");
  });
  it("handles errors and sanitises the description", () => {
    const r = parseCallback("?error=access_denied&error_description=" + encodeURIComponent("User <b>said</b> no\n") + "&state=s1&code=zzz");
    expect(r.kind).toBe("error");
    if (r.kind === "error") {
      expect(r.error).toBe("access_denied");
      expect(r.errorDescription).not.toMatch(/[<>\n]/);
      expect(r.state).toBe("s1");
    }
    const link = buildAppLink(r)!;
    expect(link.startsWith("companionforever://bnet-callback?error=access_denied&")).toBe(true);
    expect(link).not.toContain("zzz");
    const bad = parseCallback("?error=bad%20value");
    expect(bad.kind === "error" && bad.error).toBe("error");
  });
  it("builds an Android intent link with fixed scheme, host and package", () => {
    const r = parseCallback("?code=c1&state=s1");
    expect(buildIntentLink(r)).toBe(
      "intent://bnet-callback?code=c1&state=s1#Intent;scheme=companionforever;package=io.github.embermleaf.companionforever;end",
    );
  });
  it("cannot redirect elsewhere or inject intent parts via crafted values", () => {
    expect(parseCallback("?code=a&state=b%26next%3Dhttp").kind).toBe("none");
    const link = buildIntentLink(parseCallback("?error=x&error_description=" + encodeURIComponent("a&code=evil#frag;end")))!;
    const [head, tail] = link.split("#Intent;");
    expect(head!.startsWith("intent://bnet-callback?")).toBe(true);
    expect(head!.includes("#") || head!.includes(";")).toBe(false);
    expect(tail).toBe("scheme=companionforever;package=io.github.embermleaf.companionforever;end");
  });
});
