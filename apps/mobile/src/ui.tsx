// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View, type AccessibilityRole, type StyleProp, type TextInputProps, type ViewStyle } from "react-native";
import { TOUCH, colors } from "./theme";
import { getArt, type ArtKey } from "./art";

type Variant = "primary" | "plain" | "danger" | "tab";

const SLICE = 14; // cap size in logical px
const SLICE_SRC = 48; // sprite size in logical px

/**
 * 9-slice renderer built from plain Views and Images (RN's capInsets is not reliable on Android).
 * Corners keep their pixel size; edges and center stretch to the measured size.
 */
function NineSlice({ art }: { art: ArtKey }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const entry = getArt(art);
  const fill = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as const;
  if (!entry) return null;
  const { w, h } = size;
  // Each non-last piece is clipped 1px wider/taller so neighbours overlap (no sub-pixel seam lines).
  // Segments as [destStart, destEnd, srcStart, srcEnd] per axis.
  const seg = (n: number): [number, number, number, number][] => [
    [0, SLICE, 0, SLICE],
    [SLICE, n - SLICE, SLICE, SLICE_SRC - SLICE],
    [n - SLICE, n, SLICE_SRC - SLICE, SLICE_SRC],
  ];
  const pieces: React.ReactNode[] = [];
  if (w >= SLICE * 2 && h >= SLICE * 2) {
    seg(h).forEach(([y0, y1, sy0, sy1], i) => {
      seg(w).forEach(([x0, x1, sx0, sx1], j) => {
        const sx = (x1 - x0) / (sx1 - sx0);
        const sy = (y1 - y0) / (sy1 - sy0);
        pieces.push(
          <View key={`${i}${j}`} style={{ position: "absolute", left: x0, top: y0, width: x1 - x0 + (j < 2 ? 1 : 0), height: y1 - y0 + (i < 2 ? 1 : 0), overflow: "hidden" }}>
            <Image
              source={entry.source}
              resizeMode="stretch"
              style={{ position: "absolute", left: -sx0 * sx, top: -sy0 * sy, width: SLICE_SRC * sx, height: SLICE_SRC * sy }}
            />
          </View>,
        );
      });
    });
  }
  return (
    <View
      pointerEvents="none"
      importantForAccessibility="no-hide-descendants"
      style={fill}
      onLayout={(e) => setSize({ w: Math.round(e.nativeEvent.layout.width), h: Math.round(e.nativeEvent.layout.height) })}
    >
      {pieces}
    </View>
  );
}

type SpriteSet = { normal: ArtKey; pressed: ArtKey; fg: string };
const SPRITES: Record<"primary" | "secondary" | "danger", SpriteSet> = {
  primary: { normal: "btnPrimary", pressed: "btnPrimaryPressed", fg: colors.onAccent }, // ink on ember >= 5:1
  secondary: { normal: "btnSecondary", pressed: "btnSecondaryPressed", fg: colors.text },
  danger: { normal: "btnDanger", pressed: "btnDangerPressed", fg: colors.text },
};
const DISABLED_FG = "#B3AA92"; // on #2B303B >= 6:1

/** Sprite-framed button: normal / pressed / disabled states, 48dp target, a11y role/label/state preserved. */
export function GameButton(props: {
  label: string;
  onPress: () => void;
  look?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  role?: AccessibilityRole;
  selected?: boolean;
  checked?: boolean;
  hint?: string;
  glyph?: string;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const set = SPRITES[props.look ?? "primary"];
  const state: { selected?: boolean; checked?: boolean; disabled?: boolean } = {};
  if (props.selected !== undefined) state.selected = props.selected;
  if (props.checked !== undefined) state.checked = props.checked;
  if (props.disabled) state.disabled = true;
  return (
    <Pressable
      accessibilityRole={props.role ?? "button"}
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      accessibilityState={Object.keys(state).length ? state : undefined}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[{ minHeight: TOUCH, minWidth: TOUCH, marginRight: 6, marginBottom: 6, flexGrow: 0, flexShrink: 0 }, props.style]}
    >
      {({ pressed }) => (
        <>
          <NineSlice art={props.disabled ? "btnDisabled" : pressed ? set.pressed : set.normal} />
          <View style={{ flex: 1, minHeight: TOUCH, justifyContent: "center", alignItems: "center", paddingHorizontal: props.compact ? 10 : 16 }}>
            <Text
              numberOfLines={1}
              style={{
                color: props.disabled ? DISABLED_FG : set.fg,
                fontWeight: props.selected || props.checked ? "800" : "600",
                fontSize: props.compact ? 14 : 15,
              }}
            >
              {props.glyph ?? props.label}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

export function Button(props: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  role?: AccessibilityRole;
  selected?: boolean;
  hint?: string;
  disabled?: boolean;
  /** Visible text when it should differ from the accessibility label. */
  glyph?: string;
}) {
  const v = props.variant ?? "primary";
  const look = v === "danger" ? "danger" : v === "primary" || (v === "tab" && props.selected) ? "primary" : "secondary";
  return (
    <GameButton
      label={props.label}
      onPress={props.onPress}
      look={look}
      role={props.role}
      selected={props.selected}
      hint={props.hint}
      disabled={props.disabled}
      glyph={props.glyph}
      compact={v === "tab"}
    />
  );
}

export function H2({ children }: { children: string }) {
  return (
    <Text accessibilityRole="header" style={{ color: colors.highlight, fontSize: 20, fontWeight: "700", marginTop: 12, marginBottom: 8 }}>
      {children}
    </Text>
  );
}

export function P({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return <Text style={{ color: colors.text, opacity: dim ? 0.8 : 1, marginBottom: 8, fontSize: 15 }}>{children}</Text>;
}

/** Screen background: ink base with a faint ember glow at the top and a darker vignette at the bottom. */
export function Background({ children }: { children: React.ReactNode }) {
  const deco = { position: "absolute", left: 0, right: 0 } as const;
  // Stepped gradient (many thin low-alpha strips) so there are no visible hard band edges.
  const N = 24;
  const top = Array.from({ length: N }, (_, i) => ({ i, a: (0.06 * (N - i)) / N }));
  const bot = Array.from({ length: 12 }, (_, i) => ({ i, a: (0.2 * (12 - i)) / 12 }));
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {top.map((t) => (
        <View key={`t${t.i}`} pointerEvents="none" importantForAccessibility="no-hide-descendants" style={[deco, { top: t.i * 12, height: 12, backgroundColor: `rgba(224,112,43,${t.a.toFixed(4)})` }]} />
      ))}
      {bot.map((t) => (
        <View key={`b${t.i}`} pointerEvents="none" importantForAccessibility="no-hide-descendants" style={[deco, { bottom: t.i * 12, height: 12, backgroundColor: `rgba(0,0,0,${t.a.toFixed(4)})` }]} />
      ))}
      {children}
    </View>
  );
}

const CORNER = 8;
function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const top = pos[0] === "t";
  const left = pos[1] === "l";
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        [top ? "top" : "bottom"]: 3,
        [left ? "left" : "right"]: 3,
        width: CORNER,
        height: CORNER,
        borderColor: colors.highlight,
        opacity: 0.55,
        borderTopWidth: top ? 1 : 0,
        borderBottomWidth: top ? 0 : 1,
        borderLeftWidth: left ? 1 : 0,
        borderRightWidth: left ? 0 : 1,
        borderTopLeftRadius: top && left ? 3 : 0,
        borderTopRightRadius: top && !left ? 3 : 0,
        borderBottomLeftRadius: !top && left ? 3 : 0,
        borderBottomRightRadius: !top && !left ? 3 : 0,
      }}
    />
  );
}

/** Framed panel: slate fill, bronze border, inner highlight line and small corner ornaments (plain Views). */
export function Panel(props: {
  children?: React.ReactNode;
  /** Inner padding; 0 lets the child manage its own (e.g. a full-width Pressable). */
  padding?: number;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: props.borderColor ?? colors.border,
          borderWidth: props.borderWidth ?? 1.5,
          borderRadius: 10,
          padding: props.padding ?? 12,
          marginBottom: 8,
          overflow: "hidden",
        },
        props.style,
      ]}
    >
      <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 8, right: 8, height: 1, backgroundColor: "rgba(246,217,138,0.18)" }} />
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      {props.children}
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <Panel>{children}</Panel>;
}

export function Field(props: { label: string } & Pick<TextInputProps, "value" | "onChangeText" | "keyboardType" | "maxLength">) {
  const { label, ...rest } = props;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: colors.text, marginBottom: 4 }}>{label}</Text>
      <TextInput
        {...rest}
        accessibilityLabel={label}
        placeholderTextColor={colors.border}
        style={{
          minHeight: TOUCH,
          color: colors.text,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
        }}
      />
    </View>
  );
}

/** Choice chips. Selected state uses a check mark and bold text, not color alone. */
export function Choice<T extends string | number>(props: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: colors.text, marginBottom: 4 }}>{props.label}</Text>
      <View accessibilityRole="radiogroup" accessibilityLabel={props.label} style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {props.options.map((o) => {
          const sel = o.value === props.value;
          return (
            <GameButton
              key={String(o.value)}
              label={o.label}
              glyph={sel ? `✔ ${o.label}` : o.label}
              role="radio"
              checked={sel}
              look={sel ? "primary" : "secondary"}
              compact
              onPress={() => props.onChange(o.value)}
            />
          );
        })}
      </View>
    </View>
  );
}

/** - / + stepper for bounded integers. */
export function Stepper(props: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  const step = props.step ?? 1;
  const set = (v: number) => props.onChange(Math.min(props.max, Math.max(props.min, v)));
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: colors.text, marginBottom: 4 }}>{props.label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button glyph="-" label={`Decrease ${props.label}`} onPress={() => set(props.value - step)} variant="plain" />
        <Text accessibilityLabel={`${props.label}: ${props.value}`} style={{ color: colors.text, minWidth: 48, textAlign: "center", fontSize: 18, fontWeight: "700" }}>
          {props.value}
        </Text>
        <Button glyph="+" label={`Increase ${props.label}`} onPress={() => set(props.value + step)} variant="plain" />
      </View>
    </View>
  );
}
