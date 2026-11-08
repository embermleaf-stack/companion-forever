// SPDX-License-Identifier: GPL-3.0-only
export type BattleNetErrorKind =
  | "not-configured"
  | "cancelled"
  | "denied"
  | "state-mismatch"
  | "invalid-redirect"
  | "pkce-not-supported-or-invalid"
  | "signed-out"
  | "rate-limited"
  | "malformed"
  | "network"
  | "http";

/** Typed error. Messages are safe to show to the user and never contain tokens or codes. */
export class BattleNetError extends Error {
  constructor(
    readonly kind: BattleNetErrorKind,
    message: string,
    readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = "BattleNetError";
  }
}

export function userMessage(e: unknown): string {
  if (!(e instanceof BattleNetError)) return "Something went wrong.";
  switch (e.kind) {
    case "not-configured":
      return "Battle.net sign-in is not configured in this build.";
    case "pkce-not-supported-or-invalid":
      return "Sign-in not available yet. You can keep adding characters manually.";
    case "cancelled":
      return "Sign-in cancelled.";
    case "denied":
      return "Sign-in was not completed (access was not granted).";
    case "signed-out":
      return "Your Battle.net session expired. Please sign in again.";
    case "rate-limited":
      return "Too many requests. Please try again later.";
    default:
      return e.message;
  }
}
