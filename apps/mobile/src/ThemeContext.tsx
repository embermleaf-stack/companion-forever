// SPDX-License-Identifier: GPL-3.0-only
import { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { PALETTES, resolveTheme, type Palette, type ThemeMode, type ThemePref } from "./theme";

export interface Theme {
  mode: ThemeMode;
  colors: Palette;
}

export const ThemeContext = createContext<Theme>({ mode: "dark", colors: PALETTES.dark });

/** Resolve the stored choice against the system scheme ("auto" follows the phone's setting). */
export function useResolvedTheme(pref: ThemePref): Theme {
  const system = useColorScheme();
  const mode = resolveTheme(pref, system);
  return useMemo<Theme>(() => ({ mode, colors: PALETTES[mode] }), [mode]);
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
