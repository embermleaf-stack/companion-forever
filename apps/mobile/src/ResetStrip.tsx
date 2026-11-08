// SPDX-License-Identifier: GPL-3.0-only
import { Image, Text, View } from "react-native";
import { useTheme } from "./ThemeContext";
import { formatRemaining } from "./format";
import { ArtImage } from "./ArtImage";
import { getArt } from "./art";

/**
 * Reset countdown strip: lantern icon (ART-016) over a meadow-trail background (ART-015) darkened for
 * contrast. Falls back to a plain surface strip when either piece of art is disabled.
 */
export function ResetStrip({ target, now }: { target: Date; now: Date }) {
  const { colors } = useTheme();
  const trail = getArt("resetTrail");
  const text = `Next reset: ${formatRemaining(target, now).replace("Resets in ", "in ")}`;
  return (
    <View
      accessible
      accessibilityRole="timer"
      accessibilityLabel={text}
      style={{
        minHeight: 56,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        overflow: "hidden",
        marginBottom: 8,
        justifyContent: "center",
      }}
    >
      {trail ? (
        <>
          <Image
            source={trail.source}
            resizeMode="cover"
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
          />
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.stripOverlay }} />
        </>
      ) : null}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 8 }}>
        <ArtImage art="resetLantern" width={40} height={40} decorative style={{ marginRight: 10 }} />
        <Text style={{ color: colors.stripText, fontSize: 16, fontWeight: "700", flexShrink: 1 }}>{text}</Text>
      </View>
    </View>
  );
}
