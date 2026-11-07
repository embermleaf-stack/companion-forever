// SPDX-License-Identifier: GPL-3.0-only
// Thin wrapper over expo-notifications. All timing logic lives in reminders.ts.
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import type { ResetConfig } from "@companion/core";
import { computeReminders, reminderText } from "./reminders";

const CHANNEL_ID = "reset-reminders";

/** Cancel every reminder this app scheduled. */
export async function cancelReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** Ask for notification permission. Returns true if granted. */
export async function ensurePermission(): Promise<boolean> {
  const cur = await Notifications.getPermissionsAsync();
  if (cur.status === "granted") return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === "granted";
}

/**
 * Replace all scheduled reminders with the upcoming set. Returns how many were
 * scheduled. Call whenever the setting, lead time or reset schedule changes,
 * and on app start (one-shot notifications are rescheduled to stay ahead).
 */
export async function rescheduleReminders(cfg: ResetConfig, leadMinutes: number, now = new Date()): Promise<number> {
  await cancelReminders();
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Reset reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const list = computeReminders(cfg, now, { leadMinutes });
  for (const r of list) {
    const { title, body } = reminderText(r, leadMinutes);
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.at, channelId: CHANNEL_ID },
    });
  }
  return list.length;
}
