// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { addActivity, removeActivity, type AppState, type Cadence, type Scope } from "@companion/core";
import type { Run } from "../App";
import { Button, Card, Choice, Field, H2 } from "../ui";
import { colors } from "../theme";

export function ActivitiesScreen({ state, run }: { state: AppState; run: Run }) {
  const [title, setTitle] = useState("");
  const [cadence, setCadence] = useState<Cadence>("daily");
  const [scope, setScope] = useState<Scope>("character");

  function submit() {
    run((s) => addActivity(s, { title, cadence, scope }));
    if (title.trim()) setTitle("");
  }

  return (
    <View>
      <H2>Activities</H2>
      <Field label="Title" value={title} onChangeText={setTitle} maxLength={100} />
      <Choice
        label="Repeats"
        value={cadence}
        onChange={setCadence}
        options={[
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "once", label: "One time" },
        ]}
      />
      <Choice
        label="Applies to"
        value={scope}
        onChange={setScope}
        options={[
          { value: "character", label: "Each character" },
          { value: "account", label: "Whole account" },
        ]}
      />
      <Button label="Add activity" onPress={submit} />
      {state.activities.map((a) => (
        <Card key={a.id}>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}>{a.title}</Text>
          <Text style={{ color: colors.text, opacity: 0.8, marginBottom: 6 }}>
            {a.cadence} · {a.scope === "account" ? "account" : "per character"}
          </Text>
          <Button
            label={`Remove ${a.title}`}
            variant="plain"
            onPress={() =>
              Alert.alert(`Remove ${a.title}?`, "Its completion history is removed too.", [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => run((s) => removeActivity(s, a.id)) },
              ])
            }
          />
        </Card>
      ))}
    </View>
  );
}
