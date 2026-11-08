// SPDX-License-Identifier: GPL-3.0-only
// Shown only when FEATURE_BATTLENET is on. Plain-text labels; no Blizzard/Battle.net logos.
import { useEffect, useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import { disconnectProvider, mergeImported, type AppState } from "@companion/core";
import type { Run } from "../App";
import { createBattleNetServices } from "../battlenet/services";
import { userMessage } from "../battlenet/errors";
import { getAuthConfig } from "../config";
import { BLIZZARD_ATTRIBUTION } from "../format";
import { Button, H2, P, Panel } from "../ui";
import { colors } from "../theme";

export function BattleNetSection({ state, run, setMessage }: { state: AppState; run: Run; setMessage: (m: string) => void }) {
  const config = useMemo(() => getAuthConfig(), []);
  const svc = useMemo(() => createBattleNetServices(config), [config]);
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const imported = state.characters.filter((c) => c.source === "blizzard").length;

  useEffect(() => {
    let alive = true;
    svc.tokenStore.getToken().then(
      (t) => alive && setSignedIn(t !== null),
      () => undefined,
    );
    return () => {
      alive = false;
    };
  }, [svc]);

  async function doSignIn() {
    setBusy(true);
    try {
      await svc.signIn();
      setSignedIn(true);
      setMessage("Signed in.");
    } catch (e) {
      setMessage(userMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function doImport() {
    const provider = svc.provider();
    if (!provider) return setMessage(userMessage(undefined));
    setBusy(true);
    try {
      const list = await provider.listCharacters();
      const now = new Date();
      const input = list
        .filter((c) => c.blizzardId)
        .map((c) => ({ name: c.name, realm: c.realm ?? "", className: c.className ?? "", level: c.level ?? 1, blizzardId: c.blizzardId ?? "" }));
      run((s) => mergeImported(s, input, now));
      setMessage(list.length === 0 ? "No characters found on this account." : `Imported ${list.length} characters.`);
    } catch (e) {
      if ((e as { kind?: string }).kind === "signed-out") setSignedIn(false);
      setMessage(userMessage(e));
    } finally {
      setBusy(false);
    }
  }

  function disconnect() {
    Alert.alert("Disconnect Battle.net?", "This signs out and deletes all imported characters and their history from this device. Characters you added by hand are kept.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Disconnect",
        style: "destructive",
        onPress: () => {
          void svc.tokenStore.clear();
          setSignedIn(false);
          run((s) => disconnectProvider(s));
          setMessage("Disconnected. Imported data deleted.");
        },
      },
    ]);
  }

  return (
    <Panel>
      <H2>Battle.net import</H2>
      <P dim>Optional. Sign in with your own account in your browser to import your characters. Imported data stays on this device, is removed after 30 days unless refreshed, and is deleted when you disconnect or uninstall.</P>
      <Text style={{ color: colors.text, marginBottom: 8 }}>
        {!config ? "Status: not configured in this build" : signedIn ? `Status: signed in (${imported} imported)` : "Status: signed out"}
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Button label="Sign in with Battle.net" onPress={() => void doSignIn()} disabled={busy || !config || signedIn} />
        <Button label="Import characters" onPress={() => void doImport()} disabled={busy || !signedIn} />
        <Button label="Disconnect Battle.net (deletes imported data)" onPress={disconnect} variant="danger" />
      </View>
      <P dim>{BLIZZARD_ATTRIBUTION}</P>
    </Panel>
  );
}
