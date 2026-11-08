// SPDX-License-Identifier: GPL-3.0-only
import { Pressable, Text, View } from "react-native";
import type { buildChecklist } from "@companion/core";
import { TOUCH, colors } from "../theme";
import { H2, P, Panel } from "../ui";
import { formatRemaining } from "../format";
import { ArtImage, EmptyState } from "../ArtImage";
import { getArt } from "../art";
import { ResetStrip } from "../ResetStrip";

export function ChecklistScreen(props: {
  rows: ReturnType<typeof buildChecklist>;
  done: number;
  total: number;
  now: Date;
  onToggle: (activityId: string, subjectId: string) => void;
}) {
  const { rows, done, total, now } = props;
  if (rows.length === 0) {
    return (
      <EmptyState
        art="emptyActivities"
        title="Nothing to track yet"
        body="Add characters and activities, or load the sample data in Settings."
      />
    );
  }
  const allDone = total > 0 && done === total;
  const nextReset = rows.reduce<Date | null>((acc, r) => (r.resetsAt && (!acc || r.resetsAt < acc) ? r.resetsAt : acc), null);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <View>
      <H2>Today and this week</H2>
      {nextReset ? <ResetStrip target={nextReset} now={now} /> : null}
      {allDone ? (
        <EmptyState art="checklistDone" title="All done for now" body="Every task is complete. Rest by the fire until the next reset." />
      ) : null}
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Checklist progress"
        accessibilityValue={{ min: 0, max: 100, now: pct, text: `${done} of ${total} complete` }}
        style={{ height: 14, borderRadius: 7, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, overflow: "hidden" }}
      >
        <View style={{ width: `${pct}%`, height: "100%", backgroundColor: colors.ok }} />
      </View>
      <P>
        {done} of {total} complete ({pct}%)
      </P>
      {rows.map((r) => {
        const status = r.done ? "Done" : "Not done";
        const meta = `${r.subjectName} · ${r.activity.cadence} · ${r.done ? formatRemaining(r.resetsAt, now) : status}`;
        return (
          <Panel key={`${r.activity.id}-${r.subjectId}`} padding={0} borderColor={r.done ? colors.ok : colors.border} borderWidth={r.done ? 2 : 1.5}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityLabel={`${r.activity.title}, ${r.subjectName}, ${r.activity.cadence}`}
            accessibilityState={{ checked: r.done }}
            accessibilityHint={r.done ? "Double tap to mark as not done" : "Double tap to mark as done"}
            onPress={() => props.onToggle(r.activity.id, r.subjectId)}
            style={{
              minHeight: TOUCH,
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
            }}
          >
            <Text style={{ color: r.done ? colors.ok : colors.text, fontSize: 24, width: 36 }} importantForAccessibility="no">
              {r.done ? "✔" : "○"}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600", textDecorationLine: r.done ? "line-through" : "none" }}>
                {r.activity.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {r.done && getArt("resetLantern") ? (
                  <ArtImage art="resetLantern" width={20} height={20} decorative style={{ marginRight: 4 }} />
                ) : null}
                <Text style={{ color: colors.text, opacity: 0.8, fontSize: 13, flexShrink: 1 }}>{meta}</Text>
              </View>
            </View>
          </Pressable>
          </Panel>
        );
      })}
    </View>
  );
}
