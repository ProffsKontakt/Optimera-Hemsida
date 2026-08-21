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

type Review = {
  id: string;
  author: string;
  place: string;
  text: string;
  rating?: number;
  visible: boolean;
};

function slugify(author: string): string {
  return (
    author
      .trim()
      .toLowerCase()
      .replace(/å|ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/é/g, "e")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "recension"
  );
}

export function ReviewsManager({ initial }: { initial: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  function update(i: number, patch: Partial<Review>) {
    setOk(false);
    setReviews((cur) => cur.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  function move(i: number, dir: -1 | 1) {
    setOk(false);
    setReviews((cur) => {
      const j = i + dir;
      if (j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function remove(i: number) {
    if (!confirm(`Ta bort recensionen från ${reviews[i].author}?`)) return;
    setOk(false);
    setReviews((cur) => cur.filter((_, j) => j !== i));
  }

  function add() {
    setOk(false);
    setReviews((cur) => [
      ...cur,
      { id: "", author: "", place: "", text: "", visible: true },
    ]);
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    const used = new Set<string>();
    const prepared = reviews.map((r) => {
      let id = r.id || slugify(r.author);
      let n = 2;
      while (used.has(id)) id = `${r.id || slugify(r.author)}-${n++}`;
      used.add(id);
      return { ...r, id };
    });
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: prepared }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Något gick fel.");
      } else {
        setReviews(data.reviews);
        setOk(true);
        setMsg("Sparat – live på sajten efter deploy (1–2 min).");
      }
    } catch {
      setMsg("Nätverksfel.");
    } finally {
      setBusy(false);
    }
  }

  const visibleCount = reviews.filter((r) => r.visible).length;

  return (
    <div className="mt-10">
      <p className="text-[13.5px] text-ink/60">
        {visibleCount} av {reviews.length} visas på sajten just nu.
      </p>
      <div className="mt-4 space-y-5">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`rounded-3xl border p-5 md:p-6 transition ${
              r.visible ? "border-ink/10 bg-cream/40" : "border-ink/10 bg-bone opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={() => update(i, { visible: !r.visible })}
                  title={r.visible ? "Visas på sajten – klicka för att dölja" : "Dold – klicka för att visa"}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] border transition ${
                    r.visible
                      ? "bg-moss/10 border-moss/30 text-moss"
                      : "border-ink/15 text-ink/50 hover:text-ink"
                  }`}
                >
                  {r.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  {r.visible ? "Visas" : "Dold"}
                </button>
                <span className="font-display text-lg tracking-display-tight truncate">
                  {r.author || "Ny recension"}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <IconBtn label="Flytta upp" onClick={() => move(i, -1)} disabled={i === 0}>
                  <ArrowUp size={14} />
                </IconBtn>
                <IconBtn
                  label="Flytta ner"
                  onClick={() => move(i, 1)}
                  disabled={i === reviews.length - 1}
                >
                  <ArrowDown size={14} />
                </IconBtn>
                <IconBtn label="Ta bort" onClick={() => remove(i)} danger>
                  <Trash2 size={14} />
                </IconBtn>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field
                label="Namn (som på Reco)"
                value={r.author}
                onChange={(v) => update(i, { author: v })}
                placeholder="T.ex. Hans B"
              />
              <Field
                label="Ort/datum · källa"
                value={r.place}
                onChange={(v) => update(i, { place: v })}
                placeholder="T.ex. Reco · augusti 2026"
              />
            </div>
            <label className="mt-3 block max-w-[180px]">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                Stjärnor (1–5, valfritt)
              </span>
              <input
                type="number"
                min={1}
                max={5}
                step={1}
                value={r.rating ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  update(i, {
                    rating: v === "" ? undefined : Math.min(5, Math.max(1, Number(v))),
                  });
                }}
                className="mt-1 w-full rounded-xl border border-ink/15 bg-bone px-3 py-2 text-[14px] outline-none focus:border-indigo"
              />
            </label>
            <label className="mt-3 block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                Recensionstext
              </span>
              <textarea
                value={r.text}
                onChange={(e) => update(i, { text: e.target.value })}
                rows={3}
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
          <Plus size={14} /> Lägg till recension
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
          Spara recensioner
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
