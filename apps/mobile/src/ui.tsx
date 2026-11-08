// SPDX-License-Identifier: GPL-3.0-only
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View, type AccessibilityRole, type StyleProp, type TextInputProps, type ViewStyle } from "react-native";
import { TOUCH, type ThemeMode } from "./theme";
import { useTheme } from "./ThemeContext";
import { getArt, type ArtKey } from "./art";
import { getPanelSkin, getScreenSkin, type NineSliceSkin, type ScreenId } from "./skin";
import { computeContentRect, computeCoverRect, computeNineSlice } from "./skinLayout";

type Variant = "primary" | "plain" | "danger" | "tab";

const SLICE = 14; // cap size in logical px
const SLICE_SRC = 48; // sprite size in logical px

/**
 * 9-slice renderer built from plain Views and Images (RN's capInsets is not reliable on Android).
 * Corners keep their size; edges and center stretch to the measured size. Layout math: skinLayout.ts.
 * Defaults are the 48px button sprites (14px caps); skins pass their own image and slice sizes.
 */
function NineSlice(props: { art?: ArtKey; skin?: NineSliceSkin }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const entry = props.art ? getArt(props.art) : null;
  const source = props.skin ? props.skin.source : entry?.source;
  const fill = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as const;
  if (!source) return null;
  const srcW = props.skin?.width ?? SLICE_SRC;
  const srcH = props.skin?.height ?? SLICE_SRC;
  const slice = props.skin?.slice ?? SLICE;
  const cap = props.skin?.cap ?? SLICE;
  const pieces = computeNineSlice(size.w, size.h, srcW, srcH, slice, cap).map((p, i) => (
    <View key={i} style={{ position: "absolute", left: p.dest.x, top: p.dest.y, width: p.dest.w, height: p.dest.h, overflow: "hidden" }}>
      <Image source={source} resizeMode="stretch" style={{ position: "absolute", left: p.image.x, top: p.image.y, width: p.image.w, height: p.image.h }} />
    </View>
  ));
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

type Look = "primary" | "secondary" | "danger";
type SpriteSet = { normal: ArtKey; pressed: ArtKey; disabled: ArtKey };
/** Sprite keys per theme (dark set and the light parchment set; label colours come from the palette). */
const SPRITES: Record<ThemeMode, Record<Look, SpriteSet>> = {
  dark: {
    primary: { normal: "btnPrimary", pressed: "btnPrimaryPressed", disabled: "btnDisabled" },
    secondary: { normal: "btnSecondary", pressed: "btnSecondaryPressed", disabled: "btnDisabled" },
    danger: { normal: "btnDanger", pressed: "btnDangerPressed", disabled: "btnDisabled" },
  },
  light: {
    primary: { normal: "btnPrimaryLight", pressed: "btnPrimaryPressedLight", disabled: "btnDisabledLight" },
    secondary: { normal: "btnSecondaryLight", pressed: "btnSecondaryPressedLight", disabled: "btnDisabledLight" },
    danger: { normal: "btnDangerLight", pressed: "btnDangerPressedLight", disabled: "btnDisabledLight" },
  },
};

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
  /** Stretch to the container width with no right margin (aligns with inputs/panels). */
  fullWidth?: boolean;
  /** Equal-width tab cell: flex 1, tight padding, text shrinks to fit. */
  tab?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { mode, colors } = useTheme();
  const look = props.look ?? "primary";
  const set = SPRITES[mode][look];
  const fg = look === "primary" ? colors.btnPrimaryFg : look === "danger" ? colors.btnDangerFg : colors.btnSecondaryFg;
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
      style={[
        { minHeight: TOUCH, minWidth: TOUCH, marginRight: 6, marginBottom: 6, flexGrow: 0, flexShrink: 0 },
        props.fullWidth && { marginRight: 0, alignSelf: "stretch" },
        props.tab && { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, marginRight: 3, marginBottom: 0 },
        props.style,
      ]}
    >
      {({ pressed }) => (
        <>
          <NineSlice art={props.disabled ? set.disabled : pressed ? set.pressed : set.normal} />
          <View style={{ flex: 1, minHeight: TOUCH, justifyContent: "center", alignItems: "center", paddingHorizontal: props.tab ? 2 : props.compact ? 10 : 16 }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={props.tab}
              minimumFontScale={0.7}
              style={{
                color: props.disabled ? colors.btnDisabledFg : fg,
                fontWeight: props.selected || props.checked ? "800" : "600",
                fontSize: props.tab ? 12 : props.compact ? 14 : 15,
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
  fullWidth?: boolean;
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
      tab={v === "tab"}
      fullWidth={props.fullWidth}
    />
  );
}

/** Sprite checkbox graphic (32dp). Decorative: the enclosing Pressable carries role, label and checked state. */
export function ToggleBoxGraphic({ checked }: { checked: boolean }) {
  const { mode, colors } = useTheme();
  const L = mode === "light";
  const entry = getArt(checked ? (L ? "toggleBoxOnLight" : "toggleBoxOn") : L ? "toggleBoxOffLight" : "toggleBoxOff");
  if (!entry) {
    return (
      <Text style={{ color: checked ? colors.ok : colors.text, fontSize: 24, width: 32, textAlign: "center" }}>{checked ? "✔" : "○"}</Text>
    );
  }
  return <Image source={entry.source} accessible={false} importantForAccessibility="no" style={{ width: 32, height: 32 }} />;
}

/** Sprite switch (56x32 graphic, 48dp-high target). Same a11y contract as RN Switch: role switch, checked state, label. */
export function ToggleSwitch(props: { value: boolean; onValueChange: (v: boolean) => void; label: string; hint?: string }) {
  const { mode, colors } = useTheme();
  const L = mode === "light";
  const entry = getArt(props.value ? (L ? "toggleSwitchOnLight" : "toggleSwitchOn") : L ? "toggleSwitchOffLight" : "toggleSwitchOff");
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      accessibilityState={{ checked: props.value }}
      onPress={() => props.onValueChange(!props.value)}
      style={{ minHeight: TOUCH, minWidth: TOUCH + 8, justifyContent: "center", alignItems: "center" }}
    >
      {entry ? (
        <Image source={entry.source} accessible={false} importantForAccessibility="no" style={{ width: 56, height: 32 }} />
      ) : (
        <Text style={{ color: colors.text, fontWeight: "700" }}>{props.value ? "On" : "Off"}</Text>
      )}
    </Pressable>
  );
}

/**
 * Backing chip for text that sits directly on the painted background (alpha from the contrast table in
 * provenance.md). Empty on the drawn Background, where the base colour already gives enough contrast.
 */
export function useBacking(): ViewStyle {
  const { mode, colors } = useTheme();
  if (!getScreenSkin("checklist", mode)) return {};
  return { backgroundColor: colors.chip, alignSelf: "flex-start", paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, overflow: "hidden" };
}

export function H2({ children }: { children: string }) {
  const { colors } = useTheme();
  const backing = useBacking();
  return (
    <Text accessibilityRole="header" style={[{ color: colors.highlight, fontSize: 20, fontWeight: "700", marginTop: 12, marginBottom: 8 }, backing]}>
      {children}
    </Text>
  );
}

export function P({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  const { colors } = useTheme();
  const backing = useBacking();
  return <Text style={[{ color: dim ? colors.textDim : colors.text, marginBottom: 8, fontSize: 15 }, backing]}>{children}</Text>;
}

/** Screen background: ink base with a faint ember glow at the top and a darker vignette at the bottom. */
export function Background({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const deco = { position: "absolute", left: 0, right: 0 } as const;
  // Stepped gradient (many thin low-alpha strips) so there are no visible hard band edges.
  const N = 24;
  const top = Array.from({ length: N }, (_, i) => ({ i, a: (colors.glowAlpha * (N - i)) / N }));
  const bot = Array.from({ length: 12 }, (_, i) => ({ i, a: (colors.vignetteAlpha * (12 - i)) / 12 }));
  const tex = colors.textureOpacity > 0 ? getArt("textureDark") : null;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {tex ? (
        <Image
          source={tex.source}
          resizeMode="repeat"
          accessible={false}
          importantForAccessibility="no"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: colors.textureOpacity }}
        />
      ) : null}
      {top.map((t) => (
        <View key={`t${t.i}`} pointerEvents="none" importantForAccessibility="no-hide-descendants" style={[deco, { top: t.i * 12, height: 12, backgroundColor: `rgba(${colors.glowRgb},${t.a.toFixed(4)})` }]} />
      ))}
      {bot.map((t) => (
        <View key={`b${t.i}`} pointerEvents="none" importantForAccessibility="no-hide-descendants" style={[deco, { bottom: t.i * 12, height: 12, backgroundColor: `rgba(${colors.vignetteRgb},${t.a.toFixed(4)})` }]} />
      ))}
      {children}
    </View>
  );
}

/**
 * Full-screen painted background for a screen id, or the drawn Background when no skin is enabled.
 * The image is cover-fitted (any aspect ratio) and anchored; it sits under everything and is hidden from a11y.
 */
export function ScreenBackground({ screen, children }: { screen: ScreenId; children: React.ReactNode }) {
  const { mode, colors } = useTheme();
  const skin = getScreenSkin(screen, mode);
  const [box, setBox] = useState({ w: 0, h: 0 });
  if (!skin) return <Background>{children}</Background>;
  const r = computeCoverRect(skin.background.width, skin.background.height, box.w, box.h, skin.background.anchor);
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.bg, overflow: "hidden" }}
      onLayout={(e) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
    >
      {box.w > 0 ? (
        <Image
          source={skin.background.source}
          resizeMode="stretch"
          accessible={false}
          importantForAccessibility="no"
          style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h }}
        />
      ) : null}
      {children}
    </View>
  );
}

/**
 * Content window for a screen: the optional painted frame sits at the skin's contentInsets and children
 * (a ScrollView) are laid out inside it, clear of the border. With no skin it is a plain flex:1 View.
 */
export function ScreenFrame({ screen, children }: { screen: ScreenId; children: React.ReactNode }) {
  const { mode } = useTheme();
  const skin = getScreenSkin(screen, mode);
  const [box, setBox] = useState({ w: 0, h: 0 });
  if (!skin) return <View style={{ flex: 1 }}>{children}</View>;
  const r = computeContentRect(box.w, box.h, skin.contentInsets);
  const c = skin.frame ? (skin.frame.clearance ?? skin.frame.cap) : 0;
  return (
    <View style={{ flex: 1 }} onLayout={(e) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
      {box.w > 0 && skin.frame ? (
        <View pointerEvents="none" style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, zIndex: 1 }}>
          <NineSlice skin={skin.frame} />
        </View>
      ) : null}
      <View style={{ position: "absolute", left: r.x + c, top: r.y + c, width: Math.max(0, r.w - 2 * c), height: Math.max(0, r.h - 2 * c) }}>
        {children}
      </View>
    </View>
  );
}

const CORNER = 8;
function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const { colors } = useTheme();
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
        borderColor: colors.ornament,
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
  const { colors } = useTheme();
  const skin = getPanelSkin();
  if (skin) {
    // Sprite panel: the painted 9-slice replaces fill, border and corner ornaments. A caller that manages its own
    // padding (0) keeps full control, so only the 9-slice is drawn behind it.
    const pad = props.padding === 0 ? 0 : Math.max(props.padding ?? 12, skin.padding);
    return (
      <View style={[{ padding: pad, marginBottom: 8 }, props.style]}>
        <NineSlice skin={skin.image} />
        {props.children}
      </View>
    );
  }
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
      <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 8, right: 8, height: 1, backgroundColor: colors.panelSheen }} />
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
  const { colors } = useTheme();
  const backing = useBacking();
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={[{ color: colors.text, marginBottom: 4 }, backing]}>{label}</Text>
      <TextInput
        {...rest}
        accessibilityLabel={label}
        placeholderTextColor={colors.placeholder}
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
  const { colors } = useTheme();
  const backing = useBacking();
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={[{ color: colors.text, marginBottom: 4 }, backing]}>{props.label}</Text>
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
  const { colors } = useTheme();
  const backing = useBacking();
  const step = props.step ?? 1;
  const set = (v: number) => props.onChange(Math.min(props.max, Math.max(props.min, v)));
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={[{ color: colors.text, marginBottom: 4 }, backing]}>{props.label}</Text>
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
