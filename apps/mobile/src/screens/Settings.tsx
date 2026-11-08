// SPDX-License-Identifier: GPL-3.0-only
import { Alert, Switch, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { exportState, importState, setResetConfig, type AppState } from "@companion/core";
import type { Run } from "../App";
import { MAX_LEAD_MINUTES, MIN_LEAD_MINUTES, type Prefs } from "../persistence";
import { ensurePermission } from "../reminderScheduler";
import { Button, Choice, H2, P, Panel, Stepper } from "../ui";
import { DAYS } from "../format";
import { TOUCH, colors } from "../theme";

const MAX_IMPORT_BYTES = 1_000_000;

export function SettingsScreen(props: {
  state: AppState;
  run: Run;
  setState: (s: AppState) => void;
  setMessage: (m: string) => void;
  prefs: Prefs;
  setPrefs: (p: Prefs) => void;
  loadSample: () => Promise<void>;
}) {
  const { state, run, setState, setMessage, prefs, setPrefs } = props;
  const r = state.resets;

  async function exportBackup() {
    try {
      const file = new File(Paths.cache, "companion-forever-backup.json");
      file.create({ overwrite: true });
      file.write(exportState(state));
      if (!(await Sharing.isAvailableAsync())) {
        setMessage("Sharing is not available on this device.");
        return;
      }
      await Sharing.shareAsync(file.uri, { mimeType: "application/json", dialogTitle: "Save backup" });
    } catch (e) {
      setMessage(`Export failed: ${e instanceof Error ? e.message : "unknown error"}`);
    }
  }

  async function importBackup() {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "application/json", copyToCacheDirectory: true });
      if (res.canceled) return;
      const asset = res.assets[0];
      if (!asset) return;
      const file = new File(asset.uri);
      if (file.size > MAX_IMPORT_BYTES) throw new Error("File too large");
      setState(importState(await file.text()));
      setMessage("Imported.");
    } catch (e) {
      setMessage(`Import failed: ${e instanceof Error ? e.message : "invalid file"}`);
    }
  }

  async function toggleReminders(on: boolean) {
    if (on && !(await ensurePermission())) {
      setMessage("Notification permission was not granted, so reminders stay off.");
      return;
    }
    setMessage("");
    setPrefs({ ...prefs, remindersEnabled: on });
  }

  function deleteAll() {
    Alert.alert("Delete all data?", "This removes all characters, activities and history from this device. It cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setState({ ...state, characters: [], activities: [], completions: {} }),
      },
    ]);
  }

  return (
    <View>
      <Panel>
      <H2>Reset schedule</H2>
      <P dim>Set these to match your game. The defaults are placeholders, not official times. All times are UTC.</P>
      <Stepper label="Daily reset hour (UTC)" value={r.dailyHourUtc} min={0} max={23}
        onChange={(v) => run((s) => setResetConfig(s, { ...s.resets, dailyHourUtc: v }))} />
      <Stepper label="Daily reset minute" value={r.dailyMinuteUtc} min={0} max={59} step={5}
        onChange={(v) => run((s) => setResetConfig(s, { ...s.resets, dailyMinuteUtc: v }))} />
      <Choice
        label="Weekly reset day"
        value={r.weeklyDayUtc}
        onChange={(v) => run((s) => setResetConfig(s, { ...s.resets, weeklyDayUtc: v }))}
        options={DAYS.map((d, i) => ({ value: i, label: d }))}
      />

      </Panel>

      <Panel>
      <H2>Reminders</H2>
      <P dim>Optional. Schedules a local notification shortly before the next daily and weekly reset you set above. Off by default.</P>
      <View style={{ flexDirection: "row", alignItems: "center", minHeight: TOUCH, marginBottom: 8 }}>
        <Text style={{ color: colors.text, flex: 1, fontSize: 16 }}>Remind me before resets: {prefs.remindersEnabled ? "On" : "Off"}</Text>
        <Switch
          accessibilityLabel="Remind me before resets"
          accessibilityRole="switch"
          value={prefs.remindersEnabled}
          onValueChange={toggleReminders}
          trackColor={{ false: colors.surface, true: colors.ok }}
          thumbColor={colors.text}
          style={{ minHeight: TOUCH, minWidth: TOUCH }}
        />
      </View>
      <Stepper label="Minutes before reset" value={prefs.reminderLeadMinutes} min={MIN_LEAD_MINUTES} max={MAX_LEAD_MINUTES} step={5}
        onChange={(v) => setPrefs({ ...prefs, reminderLeadMinutes: v })} />

      </Panel>

      <Panel>
      <H2>Your data</H2>
      <P dim>Everything is stored only on this device. Export a backup to move it between devices.</P>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Button label="Export backup" onPress={exportBackup} />
        <Button label="Import backup" onPress={importBackup} />
        <Button label="Load sample data" onPress={() => void props.loadSample()} variant="plain" />
        <Button label="Delete all data" onPress={deleteAll} variant="danger" />
      </View>
      </Panel>
    </View>
  );
}
