// SPDX-License-Identifier: GPL-3.0-only
// Provider adapter contract. Every provider must declare provenance and rights status.
import type { Character } from "./types.js";

export type RightsStatus = "original" | "user-supplied" | "licensed" | "api-authorized";

export interface Provenance {
  source: string;
  rights: RightsStatus;
  /** Where the compliance basis is documented (e.g. docs/LICENSING.md row). */
  reference: string;
  /** Max retention in days for provider-collected data; undefined = not provider data. */
  retentionDays?: number;
}

export interface CharacterProvider {
  readonly id: string;
  readonly provenance: Provenance;
  listCharacters(): Promise<Omit<Character, "id">[]>;
}

/** Returns nothing; characters are entered by the user. */
export class ManualProvider implements CharacterProvider {
  readonly id = "manual";
  readonly provenance: Provenance = {
    source: "User entry",
    rights: "user-supplied",
    reference: "docs/ARCHITECTURE.md#components",
  };
  async listCharacters() {
    return [];
  }
}

/** Original synthetic fixtures for demos and tests. Not game data. */
export class SyntheticProvider implements CharacterProvider {
  readonly id = "synthetic";
  readonly provenance: Provenance = {
    source: "Original synthetic fixtures",
    rights: "original",
    reference: "fixtures/README.md",
  };
  async listCharacters() {
    return [
      { name: "Testwarden", realm: "Examplia", className: "Sample Class A", level: 10 },
      { name: "Fixturebard", realm: "Examplia", className: "Sample Class B", level: 20 },
    ];
  }
}
