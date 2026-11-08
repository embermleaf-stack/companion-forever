// SPDX-License-Identifier: GPL-3.0-only
import { Pressable, Text, TextInput, View, type AccessibilityRole, type TextInputProps } from "react-native";
import { TOUCH, colors } from "./theme";

type Variant = "primary" | "plain" | "danger" | "tab";

export function Button(props: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  role?: AccessibilityRole;
  selected?: boolean;
  hint?: string;
  /** Visible text when it should differ from the accessibility label. */
  glyph?: string;
}) {
  const v = props.variant ?? "primary";
  const bg = v === "primary" ? colors.accent : v === "danger" ? colors.danger : v === "tab" ? (props.selected ? colors.teal : "transparent") : colors.surface;
  const fg = v === "primary" ? colors.onAccent : colors.text;
  return (
    <Pressable
      accessibilityRole={props.role ?? "button"}
      accessibilityLabel={props.label}
      accessibilityHint={props.hint}
      accessibilityState={props.selected === undefined ? undefined : { selected: props.selected }}
      onPress={props.onPress}
      style={{
        minHeight: TOUCH,
        minWidth: TOUCH,
        paddingHorizontal: v === "tab" ? 12 : 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: props.selected ? colors.highlight : colors.border,
        backgroundColor: bg,
        marginRight: 6,
        marginBottom: v === "tab" ? 0 : 6,
        flexGrow: 0,
        flexShrink: 0,
        // Underline-style marker so selection is not conveyed by color alone.
        borderBottomWidth: props.selected ? 5 : 1,
      }}
    >
      <Text style={{ color: fg, fontWeight: v === "tab" && props.selected ? "800" : "600", fontSize: v === "tab" ? 14 : 15 }} numberOfLines={1}>
        {props.glyph ?? props.label}
      </Text>
    </Pressable>
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

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 8 }}>
      {children}
    </View>
  );
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
            <Pressable
              key={String(o.value)}
              accessibilityRole="radio"
              accessibilityLabel={o.label}
              accessibilityState={{ checked: sel }}
              onPress={() => props.onChange(o.value)}
              style={{
                minHeight: TOUCH,
                minWidth: TOUCH,
                paddingHorizontal: 12,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                borderWidth: sel ? 3 : 1,
                borderColor: sel ? colors.highlight : colors.border,
                backgroundColor: sel ? colors.teal : colors.surface,
                marginRight: 6,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: sel ? "700" : "400" }}>{sel ? `✔ ${o.label}` : o.label}</Text>
            </Pressable>
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
