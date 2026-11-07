// SPDX-License-Identifier: GPL-3.0-only
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  SyntheticProvider,
  addActivity,
  addCharacter,
  buildChecklist,
  exportState,
  importState,
  progress,
  removeActivity,
  removeCharacter,
  setResetConfig,
  toggleDone,
  type AppState,
  type Cadence,
  type Scope,
} from "@companion/core";
import { loadState, saveState } from "./storage";

type Tab = "checklist" | "characters" | "activities" | "settings";
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function formatRemaining(target: Date | null, now: Date): string {
  if (!target) return "Never resets";
  const ms = Math.max(0, target.getTime() - now.getTime());
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 48) return `Resets in ${Math.floor(h / 24)}d ${h % 24}h`;
  return `Resets in ${h}h ${m}m`;
}

export function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [tab, setTab] = useState<Tab>("checklist");
  const [message, setMessage] = useState<string>("");
  const now = useNow();

  useEffect(() => saveState(state), [state]);

  const rows = useMemo(() => buildChecklist(state, now), [state, now]);
  const { done, total } = progress(rows);

  function run(fn: (s: AppState) => AppState) {
    try {
      setState((s) => fn(s));
      setMessage("");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <div className="app">
      <header className="top">
        <img src="./icon.svg" alt="" width="36" height="36" />
        <h1>Companion Forever</h1>
      </header>

      <nav className="tabs" aria-label="Sections">
        {(["checklist", "characters", "activities", "settings"] as Tab[]).map((t) => (
          <button key={t} aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}>
            {t[0]!.toUpperCase() + t.slice(1)}
          </button>
        ))}
      </nav>

      <main>
        <p role="status" className="msg" aria-live="polite">{message}</p>
        {tab === "checklist" && (
          <Checklist rows={rows} done={done} total={total} now={now} onToggle={(a, s) => run((st) => toggleDone(st, a, s, new Date()))} />
        )}
        {tab === "characters" && <Characters state={state} run={run} />}
        {tab === "activities" && <Activities state={state} run={run} />}
        {tab === "settings" && <Settings state={state} run={run} setState={setState} setMessage={setMessage} />}
      </main>

      <footer>
        Independent fan-made tool. Not affiliated with, endorsed by, or sponsored by Blizzard Entertainment.
        All data stays in this browser. Free and open source (GPL-3.0-only).
      </footer>
    </div>
  );
}

function Checklist(props: {
  rows: ReturnType<typeof buildChecklist>;
  done: number;
  total: number;
  now: Date;
  onToggle: (activityId: string, subjectId: string) => void;
}) {
  const { rows, done, total, now } = props;
  if (rows.length === 0) {
    return <p className="empty">Nothing to track yet. Add characters and activities, or load the sample data in Settings.</p>;
  }
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <section aria-labelledby="cl">
      <h2 id="cl">Today and this week</h2>
      <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
        <span style={{ width: `${pct}%` }} />
      </div>
      <p>{done} of {total} complete</p>
      <ul className="list">
        {rows.map((r) => {
          const id = `${r.activity.id}-${r.subjectId}`;
          return (
            <li key={id}>
              <label htmlFor={id}>
                <input id={id} type="checkbox" checked={r.done} onChange={() => props.onToggle(r.activity.id, r.subjectId)} />
                <span className="title">
                  <span aria-hidden="true">{r.done ? "✔ " : "○ "}</span>
                  {r.activity.title}
                </span>
                <span className="meta">{r.subjectName} · {r.activity.cadence} · {r.done ? formatRemaining(r.resetsAt, now) : "Not done"}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Characters({ state, run }: { state: AppState; run: (fn: (s: AppState) => AppState) => void }) {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const level = Number(f.get("level"));
    run((s) =>
      addCharacter(s, {
        name: String(f.get("name") ?? ""),
        realm: String(f.get("realm") ?? "") || undefined,
        className: String(f.get("className") ?? "") || undefined,
        level: Number.isInteger(level) && level > 0 ? level : undefined,
      }),
    );
    e.currentTarget.reset();
  }
  return (
    <section>
      <h2>Characters</h2>
      <form onSubmit={submit} className="form">
        <label>Name <input name="name" required maxLength={60} /></label>
        <label>Realm <input name="realm" maxLength={60} /></label>
        <label>Class <input name="className" maxLength={60} /></label>
        <label>Level <input name="level" type="number" min={1} max={1000} /></label>
        <button type="submit">Add character</button>
      </form>
      <ul className="list">
        {state.characters.map((c) => (
          <li key={c.id}>
            <span className="title">{c.name}</span>
            <span className="meta">{[c.realm, c.className, c.level ? `Lv ${c.level}` : ""].filter(Boolean).join(" · ")}</span>
            <button onClick={() => confirm(`Remove ${c.name}?`) && run((s) => removeCharacter(s, c.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Activities({ state, run }: { state: AppState; run: (fn: (s: AppState) => AppState) => void }) {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    run((s) =>
      addActivity(s, {
        title: String(f.get("title") ?? ""),
        cadence: String(f.get("cadence")) as Cadence,
        scope: String(f.get("scope")) as Scope,
      }),
    );
    e.currentTarget.reset();
  }
  return (
    <section>
      <h2>Activities</h2>
      <form onSubmit={submit} className="form">
        <label>Title <input name="title" required maxLength={100} /></label>
        <label>Repeats
          <select name="cadence" defaultValue="daily">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="once">One time</option>
          </select>
        </label>
        <label>Applies to
          <select name="scope" defaultValue="character">
            <option value="character">Each character</option>
            <option value="account">Whole account</option>
          </select>
        </label>
        <button type="submit">Add activity</button>
      </form>
      <ul className="list">
        {state.activities.map((a) => (
          <li key={a.id}>
            <span className="title">{a.title}</span>
            <span className="meta">{a.cadence} · {a.scope === "account" ? "account" : "per character"}</span>
            <button onClick={() => confirm(`Remove ${a.title}?`) && run((s) => removeActivity(s, a.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Settings(props: {
  state: AppState;
  run: (fn: (s: AppState) => AppState) => void;
  setState: (s: AppState) => void;
  setMessage: (m: string) => void;
}) {
  const { state, run, setState, setMessage } = props;
  const fileRef = useRef<HTMLInputElement>(null);
  const r = state.resets;

  function download() {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "companion-forever-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 1_000_000) throw new Error("File too large");
      setState(importState(await file.text()));
      setMessage("Imported.");
    } catch (e) {
      setMessage(`Import failed: ${e instanceof Error ? e.message : "invalid file"}`);
    }
  }

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
    <section>
      <h2>Reset schedule</h2>
      <p className="note">Set these to match your game. The defaults are placeholders, not official times. All times are UTC.</p>
      <div className="form">
        <label>Daily reset hour (UTC)
          <input type="number" min={0} max={23} value={r.dailyHourUtc}
            onChange={(e) => run((s) => setResetConfig(s, { ...s.resets, dailyHourUtc: Number(e.target.value) }))} />
        </label>
        <label>Daily reset minute
          <input type="number" min={0} max={59} value={r.dailyMinuteUtc}
            onChange={(e) => run((s) => setResetConfig(s, { ...s.resets, dailyMinuteUtc: Number(e.target.value) }))} />
        </label>
        <label>Weekly reset day
          <select value={r.weeklyDayUtc}
            onChange={(e) => run((s) => setResetConfig(s, { ...s.resets, weeklyDayUtc: Number(e.target.value) }))}>
            {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
          </select>
        </label>
      </div>

      <h2>Your data</h2>
      <p className="note">Everything is stored only in this browser. Export a backup to move it between devices.</p>
      <div className="row">
        <button onClick={download}>Export backup</button>
        <button onClick={() => fileRef.current?.click()}>Import backup</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => upload(e.target.files?.[0])} />
        <button onClick={loadSample}>Load sample data</button>
        <button className="danger" onClick={() => confirm("Delete all data from this browser?") && setState({ ...state, characters: [], activities: [], completions: {} })}>
          Delete all data
        </button>
      </div>
    </section>
  );
}
