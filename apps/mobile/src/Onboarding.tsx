// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { colors } from "./theme";
import { Button } from "./ui";
import { ArtImage } from "./ArtImage";
import type { ArtKey } from "./art";
import { getScreenSkin } from "./skin";

export const ONBOARDING_PANELS: { art: ArtKey; title: string; body: string }[] = [
  { art: "onboard1", title: "Track your characters", body: "Add the characters you play and keep a simple roster, all in one place." },
  { art: "onboard2", title: "Plan daily and weekly tasks", body: "List what repeats each day or week. The checklist shows what is done and when it resets." },
  { art: "onboard3", title: "Your data stays with you", body: "Everything is stored on this device. No account, no ads, no tracking. You can export a backup any time." },
];

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const { width } = useWindowDimensions();
  const p = ONBOARDING_PANELS[i]!;
  const last = i === ONBOARDING_PANELS.length - 1;
  const imgW = Math.min(width - 32, 400);
  // Over the painted background the text block gets a backing (alpha from the contrast table in provenance.md).
  const painted = getScreenSkin("onboarding") !== null;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, alignItems: "center" }}>
      <ArtImage art={p.art} width={imgW} style={{ borderRadius: 8 }} />
      <View
        style={{
          alignItems: "center",
          alignSelf: "stretch",
          marginTop: 12,
          padding: 12,
          borderRadius: 8,
          backgroundColor: painted ? "rgba(31,36,48,0.8)" : "transparent",
        }}
      >
      <Text
        accessibilityRole="header"
        style={{ color: colors.highlight, fontSize: 24, fontWeight: "700", textAlign: "center" }}
      >
        {p.title}
      </Text>
      <Text style={{ color: colors.text, fontSize: 16, marginTop: 8, textAlign: "center" }}>{p.body}</Text>
      <Text
        accessibilityLabel={`Step ${i + 1} of ${ONBOARDING_PANELS.length}`}
        accessibilityLiveRegion="polite"
        style={{ color: colors.text, marginTop: 12, fontSize: 14 }}
      >
        {ONBOARDING_PANELS.map((_, k) => (k === i ? "●" : "○")).join(" ")}  ({i + 1}/{ONBOARDING_PANELS.length})
      </Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {i > 0 ? <Button label="Back" variant="plain" onPress={() => setI(i - 1)} /> : null}
        {last ? <Button label="Get started" onPress={onDone} /> : <Button label="Next" onPress={() => setI(i + 1)} />}
        {!last ? <Button label="Skip intro" variant="plain" onPress={onDone} /> : null}
      </View>
    </ScrollView>
  );
}
