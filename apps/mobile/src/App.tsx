// SPDX-License-Identifier: GPL-3.0-only
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addActivity,
  addCharacter,
  buildChecklist,
  emptyState,
  progress,
  SyntheticProvider,
  toggleDone,
  type AppState,
} from "@companion/core";
import { createPersistence, DEFAULT_PREFS, type Prefs } from "./persistence";
import { cancelReminders, rescheduleReminders } from "./reminderScheduler";
import { colors } from "./theme";
import { Button } from "./ui";
import { ChecklistScreen } from "./screens/Checklist";
import { CharactersScreen } from "./screens/Characters";
import { ActivitiesScreen } from "./screens/Activities";
import { SettingsScreen } from "./screens/Settings";
import { AboutScreen } from "./screens/About";
import { DISCLAIMER } from "./format";

const persistence = createPersistence(AsyncStorage);

type Tab = "Checklist" | "Characters" | "Activities" | "Settings" | "About";
const TABS: Tab[] = ["Checklist", "Characters", "Activities", "Settings", "About"];

export type Run = (fn: (s: AppState) => AppState) => void;

function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

export default function App() {
  useEffect(() => {
    // Fill the window behind system bars (incl. the Android nav bar area) with the app background.
    SystemUI.setBackgroundColorAsync(colors.bg).catch(() => undefined);
  }, []);
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.bg }}>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [state, setState] = useState<AppState>(emptyState);
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<Tab>("Checklist");
  const [message, setMessage] = useState("");
  const now = useNow();

  useEffect(() => {
    let alive = true;
    (async () => {
      const [s, p] = await Promise.all([persistence.loadState(), persistence.loadPrefs()]);
      if (!alive) return;
      setState(s);
      setPrefsState(p);
      setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Never write before the initial load finishes, or we would clobber saved data.
  useEffect(() => {
    if (loaded) void persistence.saveState(state);
  }, [state, loaded]);

  // Opt-in reminders: schedule only when enabled; cancel everything otherwise.
  useEffect(() => {
    if (!loaded) return;
    if (prefs.remindersEnabled) {
      rescheduleReminders(state.resets, prefs.reminderLeadMinutes).catch(() => setMessage("Could not schedule reminders."));
    } else {
      cancelReminders().catch(() => undefined);
    }
  }, [loaded, prefs.remindersEnabled, prefs.reminderLeadMinutes, state.resets]);

  const setPrefs = useCallback((p: Prefs) => {
    setPrefsState(p);
    void persistence.savePrefs(p);
  }, []);

  const run: Run = useCallback((fn) => {
    try {
      setState((s) => fn(s));
      setMessage("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Something went wrong");
    }
  }, []);

  const rows = useMemo(() => buildChecklist(state, now), [state, now]);
  const { done, total } = progress(rows);

  async function loadSample() {
    const chars = await new SyntheticProvider().listCharacters();
    run((s) => {
      let n = s;
      for (const c of chars) n = addCharacter(n, c);
      n = addActivity(n, { title: "Example daily task", cadence: "daily", scope: "character" });
      n = addActivity(n, { title: "Example weekly task", cadence: "weekly", scope: "character" });
      n = addActivity(n, { title: "Example account task", cadence: "weekly", scope: "account" });
      return n;
    });
  }

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <Text accessibilityRole="header" style={{ color: colors.highlight, fontSize: 24, fontWeight: "700" }}>
          Companion Forever
        </Text>
      </View>

      <View accessibilityRole="tablist" style={{ flexDirection: "row", paddingHorizontal: 8 }}>
        {TABS.map((t) => (
          <Button
            key={t}
            label={t}
            role="tab"
            selected={tab === t}
            variant="tab"
            onPress={() => setTab(t)}
          />
        ))}
      </View>

      <Text
        accessibilityLiveRegion="polite"
        style={{ color: colors.highlight, paddingHorizontal: 16, minHeight: message ? undefined : 0 }}
      >
        {message}
      </Text>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {!loaded ? (
          <Text style={{ color: colors.text }}>Loading...</Text>
        ) : tab === "Checklist" ? (
          <ChecklistScreen
            rows={rows}
            done={done}
            total={total}
            now={now}
            onToggle={(a, s) => run((st) => toggleDone(st, a, s, new Date()))}
          />
        ) : tab === "Characters" ? (
          <CharactersScreen state={state} run={run} />
        ) : tab === "Activities" ? (
          <ActivitiesScreen state={state} run={run} />
        ) : tab === "Settings" ? (
          <SettingsScreen
            state={state}
            run={run}
            setState={setState}
            setMessage={setMessage}
            prefs={prefs}
            setPrefs={setPrefs}
            loadSample={loadSample}
          />
        ) : (
          <AboutScreen />
        )}
      </ScrollView>

      <Text style={{ color: colors.text, fontSize: 12, padding: 12, textAlign: "center", opacity: 0.85 }}>
        {DISCLAIMER}
      </Text>
    </SafeAreaView>
  );
}
