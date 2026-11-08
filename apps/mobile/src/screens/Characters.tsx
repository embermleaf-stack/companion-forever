// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { addCharacter, removeCharacter, type AppState } from "@companion/core";
import type { Run } from "../App";
import { Button, Card, Field, H2 } from "../ui";
import { colors } from "../theme";
import { BLIZZARD_ATTRIBUTION } from "../format";
import { EmptyState } from "../ArtImage";

export function CharactersScreen({ state, run }: { state: AppState; run: Run }) {
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");
  const [className, setClassName] = useState("");
  const [level, setLevel] = useState("");

  function submit() {
    const lv = Number(level);
    run((s) =>
      addCharacter(s, {
        name,
        realm: realm.trim() || undefined,
        className: className.trim() || undefined,
        level: Number.isInteger(lv) && lv > 0 ? lv : undefined,
      }),
    );
    if (name.trim()) {
      setName("");
      setRealm("");
      setClassName("");
      setLevel("");
    }
  }

  return (
    <View>
      <H2>Characters</H2>
      {state.characters.length === 0 ? (
        <EmptyState art="emptyCharacters" title="No characters yet" body="Add one below to start tracking. Everything stays on this device." />
      ) : null}
      <Field label="Name" value={name} onChangeText={setName} maxLength={60} />
      <Field label="Realm" value={realm} onChangeText={setRealm} maxLength={60} />
      <Field label="Class" value={className} onChangeText={setClassName} maxLength={60} />
      <Field label="Level" value={level} onChangeText={setLevel} keyboardType="numeric" maxLength={4} />
      <Button fullWidth label="Add character" onPress={submit} />
      {state.characters.map((c) => (
        <Card key={c.id}>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}>
            {c.name}
            {c.source === "blizzard" ? <Text style={{ color: colors.highlight, fontSize: 12, fontWeight: "400" }}>{"  imported"}</Text> : null}
          </Text>
          <Text style={{ color: colors.text, opacity: 0.8, marginBottom: 6 }}>
            {[c.realm, c.className, c.level ? `Lv ${c.level}` : ""].filter(Boolean).join(" · ")}
          </Text>
          <Button
            fullWidth
            label={`Remove ${c.name}`}
            variant="plain"
            onPress={() =>
              Alert.alert(`Remove ${c.name}?`, "Its completion history is removed too.", [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => run((s) => removeCharacter(s, c.id)) },
              ])
            }
          />
        </Card>
      ))}
      {state.characters.some((c) => c.source === "blizzard") ? (
        <Text style={{ color: colors.text, opacity: 0.8, fontSize: 12, marginTop: 8 }}>{BLIZZARD_ATTRIBUTION}</Text>
      ) : null}
    </View>
  );
}
