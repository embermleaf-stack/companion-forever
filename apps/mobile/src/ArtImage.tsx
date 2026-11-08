// SPDX-License-Identifier: GPL-3.0-only
import { Image, Text, View, type ImageStyle, type StyleProp } from "react-native";
import { colors } from "./theme";
import { Panel } from "./ui";
import { getArt, type ArtKey } from "./art";

/** Renders registry art, or nothing when the entry is disabled. Alt text comes from the registry. */
export function ArtImage(props: {
  art: ArtKey;
  width: number;
  /** Defaults to 3/4 of width (4:3 art). */
  height?: number;
  /** Mark purely decorative (hidden from screen readers) when adjacent text already says the same. */
  decorative?: boolean;
  style?: StyleProp<ImageStyle>;
}) {
  const a = getArt(props.art);
  if (!a) return null;
  const height = props.height ?? Math.round((props.width * 3) / 4);
  return (
    <Image
      source={a.source}
      resizeMode="contain"
      accessible={!props.decorative}
      accessibilityRole={props.decorative ? undefined : "image"}
      accessibilityLabel={props.decorative ? undefined : a.alt}
      importantForAccessibility={props.decorative ? "no-hide-descendants" : "yes"}
      style={[{ width: props.width, height }, props.style]}
    />
  );
}

/** Illustrated empty state; shows text only when the art is disabled. */
export function EmptyState(props: { art: ArtKey; title: string; body: string; children?: React.ReactNode }) {
  return (
    <Panel padding={16} style={{ alignItems: "center", marginTop: 12 }}>
      <ArtImage art={props.art} width={240} style={{ marginBottom: 8 }} />
      <Text accessibilityRole="header" style={{ color: colors.highlight, fontSize: 18, fontWeight: "700", textAlign: "center" }}>
        {props.title}
      </Text>
      <Text style={{ color: colors.text, fontSize: 15, textAlign: "center", marginTop: 4 }}>{props.body}</Text>
      {props.children}
    </Panel>
  );
}
