// SPDX-License-Identifier: GPL-3.0-only
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppState as RNAppState, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addActivity,
  addCharacter,
  applyRetention,
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
import { Button, ScreenBackground, ScreenFrame } from "./ui";
import { ArtImage } from "./ArtImage";
import type { ScreenId } from "./skin";
import { Onboarding } from "./Onboarding";
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

function useNow(intervalMs = 30_000): [Date, (d: Date) => void] {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return [now, setNow];
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
  // Latest committed state, so `run` can evaluate a change eagerly and catch validation errors (a throw inside a
  // setState updater would surface during render and crash the app).
  const stateRef = useRef(state);
  stateRef.current = state;
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);
  const [onboarded, setOnboarded] = useState(true); // true until loaded so the intro never flashes for returning users
  const [tab, setTab] = useState<Tab>("Checklist");
  const [message, setMessage] = useState("");
  // True only for errors thrown by a state change (run); shows the error illustration beside the message.
  const [errorArt, setErrorArt] = useState(false);
  const [now, setNow] = useNow();

  useEffect(() => {
    let alive = true;
    (async () => {
      const [s, p, ob] = await Promise.all([persistence.loadState(), persistence.loadPrefs(), persistence.loadOnboardingDone()]);
      if (!alive) return;
      // 30-day TTL purge of API-derived data (ADR-0006) on every start.
      setState(applyRetention(s, new Date()));
      setPrefsState(p);
      setOnboarded(ob);
      setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Same purge whenever the app returns to the foreground (works offline).
  useEffect(() => {
    const sub = RNAppState.addEventListener("change", (st) => {
      if (st === "active") setState((s) => applyRetention(s, new Date()));
    });
    return () => sub.remove();
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
      const next = fn(stateRef.current);
      stateRef.current = next;
      setState(next);
      setMessage("");
      setErrorArt(false);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Something went wrong");
      setErrorArt(true);
    }
  }, []);

  const finishOnboarding = useCallback(() => {
    setOnboarded(true);
    void persistence.saveOnboardingDone(true);
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

  const screenId: ScreenId = loaded && !onboarded ? "onboarding" : (tab.toLowerCase() as ScreenId);

  return (
    <ScreenBackground screen={screenId}>
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ padding: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: "rgba(31,36,48,0.6)" }}>
        <Text accessibilityRole="header" style={{ color: colors.highlight, fontSize: 24, fontWeight: "700" }}>
          Companion Forever
        </Text>
      </View>

      {loaded && !onboarded ? <Onboarding onDone={finishOnboarding} /> : (
      <>
      <View
        accessibilityRole="tablist"
        style={{ flexDirection: "row", flexGrow: 0, flexShrink: 0, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: "rgba(31,36,48,0.6)", paddingLeft: 8, paddingRight: 5, paddingVertical: 4 }}
      >
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

      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: message ? 4 : 0, height: message ? undefined : 0, overflow: "hidden" }}>
        {message && errorArt ? <ArtImage art="errorGeneric" width={64} height={48} style={{ marginRight: 10, borderRadius: 4 }} /> : null}
        <Text accessibilityLiveRegion="polite" style={{ color: colors.highlight, flexShrink: 1 }}>
          {message}
        </Text>
      </View>

      <ScreenFrame screen={screenId}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingTop: 8 }}>
        {!loaded ? (
          <Text style={{ color: colors.text }}>Loading...</Text>
        ) : tab === "Checklist" ? (
          <ChecklistScreen
            rows={rows}
            done={done}
            total={total}
            now={now}
            onToggle={(a, s) => {
              // Use one instant for both the stored completion and rendering so the toggle shows immediately.
              const at = new Date();
              setNow(at);
              run((st) => toggleDone(st, a, s, at));
            }}
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
            setMessage={(m: string) => {
              setMessage(m);
              setErrorArt(false);
            }}
            prefs={prefs}
            setPrefs={setPrefs}
            loadSample={loadSample}
          />
        ) : (
          <AboutScreen />
        )}
      </ScrollView>
      </ScreenFrame>
      </>
      )}

      <Text style={{ color: colors.text, fontSize: 12, padding: 12, textAlign: "center", opacity: 0.85 }}>
        {DISCLAIMER}
      </Text>
    </SafeAreaView>
    </ScreenBackground>
  );
}
