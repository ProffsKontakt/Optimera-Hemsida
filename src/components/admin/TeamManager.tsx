"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  color: string;
  bio: string;
  visible?: boolean;
};

/** Slugga ett namn till ett stabilt id (förnamn, gemener, a-z0-9-). */
function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .split(/\s+/)[0]
      .replace(/å|ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/é/g, "e")
      .replace(/[^a-z0-9-]/g, "") || "medlem"
  );
}

export function TeamManager({ initial }: { initial: Member[] }) {
  const [team, setTeam] = useState<Member[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  function update(i: number, patch: Partial<Member>) {
    setOk(false);
    setTeam((cur) => cur.map((m, j) => (j === i ? { ...m, ...patch } : m)));
  }

  function move(i: number, dir: -1 | 1) {
    setOk(false);
    setTeam((cur) => {
      const j = i + dir;
      if (j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function remove(i: number) {
    if (!confirm(`Ta bort ${team[i].name} från teamet?`)) return;
    setOk(false);
    setTeam((cur) => cur.filter((_, j) => j !== i));
  }

  function add() {
    setOk(false);
    setTeam((cur) => [
      ...cur,
      {
        id: "",
        name: "",
        role: "Säljare",
        email: "",
        phone: "",
        color: "",
        bio: "",
        visible: true,
      },
    ]);
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    // Fyll i saknade id:n från namnet + gör dubbletter unika.
    const used = new Set<string>();
    const prepared = team.map((m) => {
      let id = m.id || slugify(m.name);
      let n = 2;
      while (used.has(id)) id = `${m.id || slugify(m.name)}-${n++}`;
      used.add(id);
      return { ...m, id };
    });
    try {
      const res = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team: prepared }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMsg(data?.error ?? `Något gick fel (HTTP ${res.status}).`);
      } else {
        setTeam(data.team);
        setOk(true);
        setMsg(
          "Sparat – live på /om-oss efter deploy (1–2 min). Foto-slots för nya medlemmar dyker upp under Media efter deployen.",
        );
      }
    } catch {
      setMsg("Nätverksfel.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="space-y-5">
        {team.map((m, i) => (
          <div
            key={i}
            className={`rounded-3xl border p-5 md:p-6 transition ${
              m.visible === false
                ? "border-ink/10 bg-bone opacity-60"
                : "border-ink/10 bg-cream/40"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${m.color || "from-ink/20 to-ink/40"}`}
                  aria-hidden
                />
                <div className="font-display text-lg tracking-display-tight truncate">
                  {m.name || "Ny medlem"}
                </div>
                {m.id && (
                  <code className="font-mono text-[10px] text-ink/40 hidden sm:inline">
                    team:{m.id}
                  </code>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {/* Visa/dölj: dold person ligger kvar i databasen men
                    renderas aldrig på /om-oss – inte ens i HTML-koden. */}
                <button
                  type="button"
                  onClick={() => update(i, { visible: m.visible === false })}
                  title={
                    m.visible === false
                      ? "Dold på om-oss – klicka för att visa"
                      : "Visas på om-oss – klicka för att dölja"
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition ${
                    m.visible === false
                      ? "border-ink/15 text-ink/50 hover:text-ink"
                      : "border-moss/30 bg-moss/10 text-moss"
                  }`}
                >
                  {m.visible === false ? <EyeOff size={13} /> : <Eye size={13} />}
                  {m.visible === false ? "Dold" : "Visas"}
                </button>
                <IconBtn label="Flytta upp" onClick={() => move(i, -1)} disabled={i === 0}>
                  <ArrowUp size={14} />
                </IconBtn>
                <IconBtn
                  label="Flytta ner"
                  onClick={() => move(i, 1)}
                  disabled={i === team.length - 1}
                >
                  <ArrowDown size={14} />
                </IconBtn>
                <IconBtn label="Ta bort" onClick={() => remove(i)} danger>
                  <Trash2 size={14} />
                </IconBtn>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Namn" value={m.name} onChange={(v) => update(i, { name: v })} />
              <Field label="Roll" value={m.role} onChange={(v) => update(i, { role: v })} />
              <Field
                label="E-post"
                value={m.email}
                onChange={(v) => update(i, { email: v })}
                placeholder="namn@optimeraenergi.se"
              />
              <Field
                label="Telefon (valfritt, visas på om-oss)"
                value={m.phone}
                onChange={(v) => update(i, { phone: v })}
                placeholder="07x xxx xx xx"
              />
            </div>
            <label className="mt-3 block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                Kort bio (visas på kortet)
              </span>
              <textarea
                value={m.bio}
                onChange={(e) => update(i, { bio: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-bone px-3 py-2 text-[14px] outline-none focus:border-indigo"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-[13.5px] text-ink/75 hover:text-ink hover:border-ink/40 transition"
        >
          <Plus size={14} /> Lägg till medlem
        </button>
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-bone px-5 py-2.5 text-[13.5px] disabled:opacity-40"
        >
          {busy ? (
            <Loader2 size={14} className="animate-spin" />
          ) : ok ? (
            <Check size={14} />
          ) : (
            <Save size={14} />
          )}
          Spara teamet
        </button>
      </div>
      {msg && (
        <p className={`mt-3 text-[13px] ${ok ? "text-moss" : "text-ink/60"}`}>{msg}</p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-ink/15 bg-bone px-3 py-2 text-[14px] outline-none focus:border-indigo"
      />
    </label>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-8 w-8 place-items-center rounded-full border transition disabled:opacity-30 ${
        danger
          ? "border-copper/40 text-copper hover:bg-copper/10"
          : "border-ink/15 text-ink/65 hover:text-ink hover:border-ink/40"
      }`}
    >
      {children}
    </button>
  );
}
