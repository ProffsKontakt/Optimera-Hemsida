"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, Loader2, Check } from "lucide-react";

type Slot = {
  id: string;
  group: string;
  label: string;
  aspect: string;
  hint?: string;
};
type Entry = { url: string; alt: string; updatedAt?: string };

export function MediaManager({
  slots,
  initial,
}: {
  slots: Slot[];
  initial: Record<string, Entry>;
}) {
  const [entries, setEntries] = useState<Record<string, Entry>>(initial);

  const groups = Array.from(new Set(slots.map((s) => s.group)));

  return (
    <div className="mt-10 space-y-12">
      {groups.map((group) => (
        <section key={group}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-4">
            {group}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {slots
              .filter((s) => s.group === group)
              .map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  entry={entries[slot.id]}
                  onChange={(e) =>
                    setEntries((cur) => {
                      const next = { ...cur };
                      if (e) next[slot.id] = e;
                      else delete next[slot.id];
                      return next;
                    })
                  }
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SlotCard({
  slot,
  entry,
  onChange,
}: {
  slot: Slot;
  entry?: Entry;
  onChange: (entry: Entry | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState(entry?.alt ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const preview = localPreview ?? entry?.url ?? null;

  function pick(f: File | null) {
    setFile(f);
    setOk(false);
    setMsg(null);
    setLocalPreview(f ? URL.createObjectURL(f) : null);
  }

  async function save() {
    if (!file) {
      setMsg("Välj en bild först.");
      return;
    }
    setBusy(true);
    setMsg(null);
    const fd = new FormData();
    fd.append("slotId", slot.id);
    fd.append("alt", alt);
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Något gick fel.");
      } else {
        setOk(true);
        setMsg("Sparat – live på sajten efter deploy (1-2 min).");
        onChange({ url: data.url, alt: data.alt });
        setFile(null);
      }
    } catch {
      setMsg("Nätverksfel.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Ta bort bilden för "${slot.label}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/media?slotId=${encodeURIComponent(slot.id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onChange(null);
        setLocalPreview(null);
        setFile(null);
        setAlt("");
        setMsg("Borttagen.");
        setOk(false);
      } else {
        const d = await res.json();
        setMsg(d.error ?? "Kunde inte ta bort.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-cream/40 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-display text-lg tracking-display-tight leading-tight">
          {slot.label}
        </div>
        <code className="font-mono text-[10px] text-ink/40">{slot.id}</code>
      </div>
      {slot.hint && (
        <p className="mt-1 text-[12.5px] text-ink/55 leading-snug">{slot.hint}</p>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 block w-full overflow-hidden rounded-2xl border border-dashed border-ink/25 bg-bone hover:border-indigo/60 transition relative"
        style={{ aspectRatio: slot.aspect }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={alt || slot.label} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-ink/40 text-[13px] gap-2">
            <Upload size={18} />
            Klicka för att välja bild
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />

      <label className="mt-3 block">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
          Alt-text (för SEO + tillgänglighet)
        </span>
        <input
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder={`Beskriv bilden, t.ex. "${slot.label}"`}
          className="mt-1 w-full rounded-xl border border-ink/15 bg-bone px-3 py-2 text-[14px] outline-none focus:border-indigo"
        />
      </label>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={busy || !file}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-bone px-4 py-2 text-[13px] disabled:opacity-40"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : ok ? <Check size={14} /> : <Upload size={14} />}
          Spara
        </button>
        {entry?.url && (
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-2 text-[13px] text-ink/65 hover:text-ink hover:border-ink/40 transition disabled:opacity-40"
          >
            <Trash2 size={13} /> Ta bort
          </button>
        )}
      </div>
      {msg && (
        <p className={`mt-2 text-[12.5px] ${ok ? "text-moss" : "text-ink/60"}`}>{msg}</p>
      )}
    </div>
  );
}
