// SPDX-License-Identifier: GPL-3.0-only
// Synthetic only: a fake provider server implemented as an injected fetch. No real hosts, ids or secrets.
import { describe, expect, it } from "vitest";
import {
  addCharacter,
  applyRetention,
  disconnectProvider,
  emptyState,
  mergeImported,
  removeApiDerived,
  type AppState,
} from "@companion/core";
import { buildAuthorizeUrl, exchangeCode, parseRedirect, type FetchLike } from "../src/battlenet/auth";
import { authConfigFromEnv, type AuthConfig } from "../src/battlenet/config";
import { BattleNetError, userMessage } from "../src/battlenet/errors";
import { base64url, codeChallengeS256, createCodeVerifier, createState, sha256 } from "../src/battlenet/pkce";
import { BattleNetProvider } from "../src/battlenet/provider";
import { signIn, type SignInDeps } from "../src/battlenet/signIn";
import { createTokenStore, TOKEN_KEY, type SecretBackend } from "../src/battlenet/tokenStore";
import { createPersistence, type KeyValueStorage } from "../src/persistence";

const config: AuthConfig = {
  mode: "pkce",
  clientId: "synthetic-client-id",
  authorizeUrl: "https://localhost/authorize",
  tokenUrl: "https://localhost/token",
  profileUrl: "https://localhost/profile",
  redirectUri: "companionforever://bnet-callback",
  scopes: ["wow.profile"],
};

let counter = 0;
const seqRandom = (n: number) => Uint8Array.from({ length: n }, (_, i) => (i * 7 + ++counter) & 255);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function q(url: string): Record<string, any> {
  const out: Record<string, string> = {};
  for (const p of url.split("?")[1]?.split("&") ?? []) {
    const [k, v] = p.split("=");
    out[decodeURIComponent(k!)] = decodeURIComponent(v ?? "");
  }
  return out;
}

const res = (status: number, body: unknown, headers: Record<string, string> = {}) => ({
  status,
  ok: status >= 200 && status < 300,
  headers: { get: (n: string) => headers[n] ?? null },
  text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
});

const PROFILE = {
  wow_accounts: [
    {
      id: 1,
      characters: [
        { name: "Testwarden", id: 11, realm: { name: "Examplia" }, playable_class: { name: "Sample Class A" }, level: 10, guild: "x" },
        { name: "Fixturebard", id: 12, realm: { name: "Examplia" }, playable_class: { name: "Sample Class B" }, level: 20 },
      ],
    },
  ],
};

function memSecrets(): SecretBackend & { data: Record<string, string> } {
  const data: Record<string, string> = {};
  return {
    data,
    get: async (k) => data[k] ?? null,
    set: async (k, v) => { data[k] = v; },
    remove: async (k) => { delete data[k]; },
  };
}

describe("PKCE helpers", () => {
  it("matches the RFC 7636 Appendix B vector", () => {
    expect(codeChallengeS256("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")).toBe("E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
  });
  it("sha256 known answers (empty, abc, multi-block)", () => {
    const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
    expect(hex(sha256(new Uint8Array()))).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(hex(sha256(Uint8Array.from([97, 98, 99])))).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    const s = "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq";
    expect(hex(sha256(Uint8Array.from([...s].map((c) => c.charCodeAt(0)))))).toBe("248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1");
  });
  it("base64url has no padding or unsafe characters", () => {
    expect(base64url(Uint8Array.from([251, 255, 254]))).toBe("-__-");
    expect(base64url(Uint8Array.from([1]))).toBe("AQ");
  });
  it("verifier length and charset are RFC 7636 compliant", () => {
    for (const n of [32, 48, 96]) {
      const v = createCodeVerifier(seqRandom, n);
      expect(v.length).toBeGreaterThanOrEqual(43);
      expect(v.length).toBeLessThanOrEqual(128);
      expect(v).toMatch(/^[A-Za-z0-9\-._~]+$/);
    }
    expect(createCodeVerifier(seqRandom, 96)).toHaveLength(128);
    expect(() => createCodeVerifier(seqRandom, 31)).toThrow();
    expect(() => createCodeVerifier(seqRandom, 97)).toThrow();
    expect(() => createCodeVerifier(() => new Uint8Array(5))).toThrow();
  });
  it("state is random-sourced and differs between calls", () => {
    expect(createState(seqRandom)).not.toBe(createState(seqRandom));
    expect(() => createState(() => new Uint8Array(3))).toThrow();
  });
});

describe("authorize URL and redirect parsing", () => {
  it("builds the URL only from injected config, with S256", () => {
    const u = buildAuthorizeUrl(config, "CH", "ST");
    expect(u.startsWith("https://localhost/authorize?")).toBe(true);
    expect(q(u)).toEqual({
      response_type: "code", client_id: "synthetic-client-id", redirect_uri: "companionforever://bnet-callback",
      scope: "wow.profile", state: "ST", code_challenge: "CH", code_challenge_method: "S256",
    });
  });
  it("accepts a matching redirect", () => {
    expect(parseRedirect("companionforever://bnet-callback?code=abc&state=ST", "ST")).toBe("abc");
  });
  it("rejects missing or mismatched state, error params and missing code", () => {
    const kind = (url: string, st = "ST") => { try { parseRedirect(url, st); } catch (e) { return (e as BattleNetError).kind; } return "ok"; };
    expect(kind("x://y?code=abc")).toBe("state-mismatch");
    expect(kind("x://y?code=abc&state=OTHER")).toBe("state-mismatch");
    expect(kind("x://y?code=abc&state=ST", "")).toBe("state-mismatch");
    expect(kind("x://y?error=access_denied&state=ST")).toBe("denied");
    expect(kind("x://y?error=access_denied&state=BAD")).toBe("state-mismatch");
    expect(kind("x://y?state=ST")).toBe("invalid-redirect");
    expect(kind("x://y")).toBe("state-mismatch");
  });
});

describe("exchangeCode", () => {
  it("posts a form body with the PKCE fields and no client secret", async () => {
    let seen: { url: string; init?: { method?: string; headers?: Record<string, string>; body?: string } } | undefined;
    const f: FetchLike = async (url, init) => { seen = { url, init }; return res(200, { access_token: "T", expires_in: 3600 }); };
    expect(await exchangeCode(config, "CODE", "VER", f)).toEqual({ accessToken: "T", expiresInSec: 3600 });
    expect(seen?.url).toBe("https://localhost/token");
    expect(seen?.init?.method).toBe("POST");
    expect(seen?.init?.headers?.["Content-Type"]).toBe("application/x-www-form-urlencoded");
    expect(q("?" + seen?.init?.body)).toEqual({
      grant_type: "authorization_code", code: "CODE", redirect_uri: "companionforever://bnet-callback",
      client_id: "synthetic-client-id", code_verifier: "VER",
    });
    expect(seen?.init?.body).not.toContain("secret");
    expect(seen?.init?.headers?.Authorization).toBeUndefined();
  });
  it("maps 400 and 401 to pkce-not-supported-or-invalid with a friendly message", async () => {
    for (const st of [400, 401]) {
      const err = await exchangeCode(config, "C", "V", async () => res(st, { error: "invalid_client" })).catch((e) => e);
      expect(err).toBeInstanceOf(BattleNetError);
      expect(err.kind).toBe("pkce-not-supported-or-invalid");
      expect(userMessage(err)).toMatch(/not available yet/);
      expect(err.message).not.toContain("invalid_client");
    }
  });
  it("handles 5xx, network failure, malformed and incomplete bodies", async () => {
    const k = (f: FetchLike) => exchangeCode(config, "C", "V", f).catch((e) => e.kind);
    expect(await k(async () => res(503, ""))).toBe("http");
    expect(await k(async () => { throw new Error("offline"); })).toBe("network");
    expect(await k(async () => res(200, "{nope"))).toBe("malformed");
    expect(await k(async () => res(200, { access_token: "T" }))).toBe("malformed");
    expect(await k(async () => res(200, { access_token: "T", expires_in: -1 }))).toBe("malformed");
  });
});

describe("token store", () => {
  it("returns the token before expiry minus 60s and wipes it after", async () => {
    let t = new Date("2026-12-01T00:00:00Z").getTime();
    const b = memSecrets();
    const s = createTokenStore(b, () => new Date(t));
    await s.setToken("TOK", 3600);
    expect(await s.getToken()).toBe("TOK");
    t += 3600_000 - 61_000;
    expect(await s.getToken()).toBe("TOK");
    t += 2_000; // now inside the 60s margin
    expect(await s.getToken()).toBeNull();
    expect(b.data[TOKEN_KEY]).toBeUndefined();
  });
  it("wipes corrupt values and clears on request; survives backend errors", async () => {
    const b = memSecrets();
    b.data[TOKEN_KEY] = "garbage";
    const s = createTokenStore(b);
    expect(await s.getToken()).toBeNull();
    expect(b.data[TOKEN_KEY]).toBeUndefined();
    await s.setToken("T", 100);
    await s.clear();
    expect(await s.getToken()).toBeNull();
    const broken = createTokenStore({ get: async () => { throw new Error("x"); }, set: async () => {}, remove: async () => { throw new Error("y"); } });
    expect(await broken.getToken()).toBeNull();
    await expect(broken.clear()).resolves.toBeUndefined();
  });
});

describe("config", () => {
  it("is absent by default and requires every field", () => {
    expect(authConfigFromEnv({})).toBeNull();
    expect(authConfigFromEnv({ clientId: "a", authorizeUrl: "b", tokenUrl: "c" })).toBeNull();
    const c = authConfigFromEnv({ clientId: "a", authorizeUrl: "b", tokenUrl: "c", profileUrl: "d" });
    expect(c?.mode).toBe("pkce");
    expect(c?.redirectUri).toBe("companionforever://bnet-callback");
    expect(authConfigFromEnv({ clientId: "a", authorizeUrl: "b", tokenUrl: "c", profileUrl: "d", mode: "handoff" })).toBeNull();
  });
});

describe("BattleNetProvider", () => {
  const mk = (f: FetchLike, token: string | null = "TOK", extra: Partial<ConstructorParameters<typeof BattleNetProvider>[0]> = {}) =>
    new BattleNetProvider({ fetch: f, getToken: async () => token, profileUrl: config.profileUrl, now: () => new Date("2026-12-01T00:00:00Z"), ...extra });
  it("has api provenance with a 30-day retention", () => {
    const p = mk(async () => res(200, PROFILE));
    expect(p.id).toBe("battlenet");
    expect(p.provenance.retentionDays).toBe(30);
  });
  it("maps characters, tagging source and importedAt, sending a bearer token", async () => {
    let auth: string | undefined;
    const p = mk(async (_u, init) => { auth = init?.headers?.Authorization; return res(200, PROFILE); });
    const out = await p.listCharacters();
    expect(auth).toBe("Bearer TOK");
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual({
      name: "Testwarden", realm: "Examplia", className: "Sample Class A", level: 10, blizzardId: "11",
      source: "blizzard", importedAt: "2026-12-01T00:00:00.000Z",
    });
    expect(JSON.stringify(out)).not.toContain("guild");
  });
  it("returns an empty list for an empty account", async () => {
    expect(await mk(async () => res(200, { wow_accounts: [] })).listCharacters()).toEqual([]);
  });
  it("401 -> signed-out and calls onSignedOut", async () => {
    let wiped = 0;
    const err = await mk(async () => res(401, ""), "TOK", { onSignedOut: () => { wiped++; } }).listCharacters().catch((e) => e);
    expect(err.kind).toBe("signed-out");
    expect(wiped).toBe(1);
  });
  it("no token -> signed-out without any request", async () => {
    let calls = 0;
    const err = await mk(async () => { calls++; return res(200, PROFILE); }, null).listCharacters().catch((e) => e);
    expect(err.kind).toBe("signed-out");
    expect(calls).toBe(0);
  });
  it("429 backs off locally: no retry storm, honours Retry-After, resumes after", async () => {
    let calls = 0;
    let t = new Date("2026-12-01T00:00:00Z").getTime();
    const p = mk(async () => { calls++; return calls === 1 ? res(429, "", { "Retry-After": "30" }) : res(200, PROFILE); }, "TOK", { now: () => new Date(t) });
    const e1 = await p.listCharacters().catch((e) => e);
    expect([e1.kind, e1.retryAfterMs]).toEqual(["rate-limited", 30_000]);
    for (let i = 0; i < 5; i++) expect((await p.listCharacters().catch((e) => e)).kind).toBe("rate-limited");
    expect(calls).toBe(1);
    t += 31_000;
    expect(await p.listCharacters()).toHaveLength(2);
    expect(calls).toBe(2);
  });
  it("429 without a header uses the default back-off", async () => {
    const e = await mk(async () => res(429, "")).listCharacters().catch((x) => x);
    expect(e.retryAfterMs).toBe(60_000);
  });
  it("malformed JSON, wrong shape, 500 and network errors are typed", async () => {
    const k = (f: FetchLike) => mk(f).listCharacters().catch((e) => e.kind);
    expect(await k(async () => res(200, "{bad"))).toBe("malformed");
    expect(await k(async () => res(200, { nope: 1 }))).toBe("malformed");
    expect(await k(async () => res(500, ""))).toBe("http");
    expect(await k(async () => { throw new Error("offline"); })).toBe("network");
  });
});

/** Fake provider server: authorize is simulated by the fake browser, token and profile by fetch. */
function fakeServer(opts: { rejectExchange?: number } = {}) {
  const issued: { code: string; challenge: string } | { code?: undefined } = {};
  const log: string[] = [];
  const tokens = new Map<string, number>(); // token -> expires at (ms)
  let clock = new Date("2026-12-01T00:00:00Z").getTime();
  const fetchFn: FetchLike = async (url, init) => {
    log.push(`${init?.method ?? "GET"} ${url}`);
    if (url === config.tokenUrl) {
      if (opts.rejectExchange) return res(opts.rejectExchange, { error: "invalid_request" });
      const b = q("?" + init?.body);
      const ok =
        b.grant_type === "authorization_code" && b.code === issued.code && b.client_id === config.clientId &&
        !("client_secret" in b) && "challenge" in issued && codeChallengeS256(b.code_verifier) === issued.challenge;
      if (!ok) return res(400, { error: "invalid_grant" });
      const tok = "synthetic-token-" + log.length;
      tokens.set(tok, clock + 3600_000);
      return res(200, { access_token: tok, token_type: "bearer", expires_in: 3600 });
    }
    if (url === config.profileUrl) {
      const tok = init?.headers?.Authorization?.replace("Bearer ", "") ?? "";
      const exp = tokens.get(tok);
      return exp !== undefined && exp > clock ? res(200, PROFILE) : res(401, "");
    }
    return res(404, "");
  };
  const browser = (mode: "ok" | "wrong-state" | "denied" | "cancel") => async (url: string, redirect: string) => {
    if (mode === "cancel") return { type: "cancel" as const };
    const a = q(url);
    expect(a.redirect_uri).toBe(redirect);
    const code = "code-" + a.state.slice(0, 6);
    Object.assign(issued, { code, challenge: a.code_challenge });
    if (mode === "denied") return { type: "success" as const, url: `${redirect}?error=access_denied&state=${encodeURIComponent(a.state)}` };
    const st = mode === "wrong-state" ? "forged" : a.state;
    return { type: "success" as const, url: `${redirect}?code=${code}&state=${encodeURIComponent(st)}` };
  };
  return { fetchFn, browser, log, advance: (ms: number) => { clock += ms; }, now: () => new Date(clock) };
}

describe("end to end against the fake server", () => {
  function setup(opts: { rejectExchange?: number } = {}) {
    const server = fakeServer(opts);
    const secrets = memSecrets();
    const tokenStore = createTokenStore(secrets, server.now);
    const deps = (mode: "ok" | "wrong-state" | "denied" | "cancel"): SignInDeps => ({
      config, random: seqRandom, fetch: server.fetchFn, openAuthSession: server.browser(mode), tokenStore,
    });
    const provider = () =>
      new BattleNetProvider({ fetch: server.fetchFn, getToken: () => tokenStore.getToken(), profileUrl: config.profileUrl, now: server.now, onSignedOut: () => tokenStore.clear() });
    return { server, secrets, tokenStore, deps, provider };
  }

  it("success: sign in, import, cache, then disconnect purges everything", async () => {
    const { secrets, tokenStore, deps, provider } = setup();
    await signIn(deps("ok"));
    expect(await tokenStore.getToken()).toMatch(/^synthetic-token-/);
    const imported = await provider().listCharacters();
    let s: AppState = addCharacter(emptyState(), { name: "Manual One" }, () => "man");
    s = mergeImported(s, imported as never, new Date("2026-12-01T00:00:00Z"), (() => { let n = 0; return () => `id${++n}`; })());
    expect(s.characters.map((c) => [c.name, c.source ?? "manual"])).toEqual([["Manual One", "manual"], ["Testwarden", "blizzard"], ["Fixturebard", "blizzard"]]);

    // cached on device through the normal persistence layer, never containing the token
    const store: KeyValueStorage & { data: Record<string, string> } = { data: {}, getItem: async (k) => store.data[k] ?? null, setItem: async (k, v) => { store.data[k] = v; }, removeItem: async (k) => { delete store.data[k]; } };
    const p = createPersistence(store);
    await p.saveState(s);
    expect(Object.values(store.data).join("")).not.toContain("synthetic-token");
    expect((await p.loadState()).characters).toHaveLength(3);

    // exported backups carry no API-derived data
    expect(removeApiDerived(s.characters).map((c) => c.id)).toEqual(["man"]);

    // disconnect: token wiped, API-derived data removed, manual kept
    await tokenStore.clear();
    const after = disconnectProvider(s);
    await p.saveState(after);
    expect(secrets.data[TOKEN_KEY]).toBeUndefined();
    expect((await p.loadState()).characters.map((c) => c.id)).toEqual(["man"]);
  });

  it("wrong state is rejected and no token is stored or requested", async () => {
    const { server, tokenStore, deps } = setup();
    const err = await signIn(deps("wrong-state")).catch((e) => e);
    expect(err.kind).toBe("state-mismatch");
    expect(await tokenStore.getToken()).toBeNull();
    expect(server.log).toEqual([]);
  });

  it("denied consent and cancel", async () => {
    const { server, tokenStore, deps } = setup();
    expect((await signIn(deps("denied")).catch((e) => e)).kind).toBe("denied");
    expect((await signIn(deps("cancel")).catch((e) => e)).kind).toBe("cancelled");
    expect(await tokenStore.getToken()).toBeNull();
    expect(server.log).toEqual([]);
  });

  it("400 on exchange -> 'not available yet', nothing stored, manual entry still works", async () => {
    const { tokenStore, deps } = setup({ rejectExchange: 400 });
    const err = await signIn(deps("ok")).catch((e) => e);
    expect(err.kind).toBe("pkce-not-supported-or-invalid");
    expect(userMessage(err)).toBe("Sign-in not available yet. You can keep adding characters manually.");
    expect(await tokenStore.getToken()).toBeNull();
    expect(addCharacter(emptyState(), { name: "Typed by hand" }).characters).toHaveLength(1);
  });

  it("expired token: provider reports signed-out and the stored token is wiped", async () => {
    const { server, secrets, tokenStore, deps, provider } = setup();
    await signIn(deps("ok"));
    server.advance(3600_000 - 30_000); // inside the 60s margin
    const err = await provider().listCharacters().catch((e) => e);
    expect(err.kind).toBe("signed-out");
    expect(secrets.data[TOKEN_KEY]).toBeUndefined();
    expect(await tokenStore.getToken()).toBeNull();
  });

  it("server-side 401 on a token the client still thought valid wipes it", async () => {
    const { secrets, tokenStore, provider } = setup();
    await tokenStore.setToken("unknown-token", 3600);
    const err = await provider().listCharacters().catch((e) => e);
    expect(err.kind).toBe("signed-out");
    expect(secrets.data[TOKEN_KEY]).toBeUndefined();
  });

  it("not configured: sign-in throws and does nothing; handoff mode uses the throwing stub", async () => {
    const { server, deps } = setup();
    expect((await signIn({ ...deps("ok"), config: null }).catch((e) => e)).kind).toBe("not-configured");
    expect((await signIn({ ...deps("ok"), config: { ...config, mode: "handoff", backendBaseUrl: "https://localhost/b" } }).catch((e) => e)).kind).toBe("not-configured");
    expect(server.log).toEqual([]);
  });
});

describe("purge-on-start logic", () => {
  it("load -> applyRetention removes expired API data (and its completions) and keeps manual data", async () => {
    const old = new Date("2026-10-01T00:00:00Z");
    const now = new Date("2026-12-01T00:00:00Z");
    let s = addCharacter(emptyState(), { name: "Manual" }, () => "man");
    s = mergeImported(s, [{ name: "Old", realm: "R", className: "C", level: 5, blizzardId: "9" }], old, () => "api");
    s = { ...s, completions: { "a::api": old.toISOString(), "a::man": old.toISOString() } };
    const data: Record<string, string> = {};
    const store: KeyValueStorage = { getItem: async (k) => data[k] ?? null, setItem: async (k, v) => { data[k] = v; }, removeItem: async (k) => { delete data[k]; } };
    const p = createPersistence(store);
    await p.saveState(s);
    const loaded = applyRetention(await p.loadState(), now);
    expect(loaded.characters.map((c) => c.id)).toEqual(["man"]);
    expect(Object.keys(loaded.completions)).toEqual(["a::man"]);
    // fresh data is retained
    const fresh = applyRetention(mergeImported(emptyState(), [{ name: "N", realm: "R", className: "C", level: 5, blizzardId: "1" }], now, () => "x"), now);
    expect(fresh.characters).toHaveLength(1);
  });
});
