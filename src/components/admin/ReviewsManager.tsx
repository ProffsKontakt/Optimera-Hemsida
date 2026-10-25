"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RefreshCw,
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

type RecoReview = Review & { date: string; url?: string };

/** Samma omdöme? Namnet + början av texten (texterna kan vara lätt rättade). */
function sameReview(a: { author: string; text: string }, b: { author: string; text: string }) {
  const norm = (t: string) => t.toLowerCase().replace(/[^a-zåäö0-9]/g, "").slice(0, 32);
  return a.author.trim() === b.author.trim() && norm(a.text) === norm(b.text);
}

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
  // Import från Reco: de senaste omdömena som inte redan finns i listan.
  const [reco, setReco] = useState<RecoReview[] | null>(null);
  const [recoBusy, setRecoBusy] = useState(false);
  const [recoMsg, setRecoMsg] = useState<string | null>(null);

  const isAdded = (r: RecoReview) =>
    reviews.some((x) => x.id === r.id || sameReview(x, r));
  const newFromReco = (reco ?? []).filter((r) => !isAdded(r));

  async function fetchReco() {
    setRecoBusy(true);
    setRecoMsg(null);
    try {
      const res = await fetch("/api/admin/reviews/reco", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setRecoMsg(data.error ?? "Kunde inte hämta från Reco.");
        setReco(null);
      } else {
        setReco(data.reviews);
        setRecoMsg(
          data.count
            ? `Reco: ${data.average} av 5 från ${data.count} omdömen. Antalet och betyget på sajten uppdateras automatiskt.`
            : null,
        );
      }
    } catch {
      setRecoMsg("Nätverksfel.");
    } finally {
      setRecoBusy(false);
    }
  }

  function importReco(list: RecoReview[]) {
    setOk(false);
    setReviews((cur) => {
      const used = new Set(cur.map((r) => r.id));
      const added = list.map(({ date: _date, url: _url, ...r }) => {
        let id = r.id;
        let n = 2;
        while (used.has(id)) id = `${r.id}-${n++}`;
        used.add(id);
        return { ...r, id, visible: true };
      });
      // Nyaste först – de hamnar överst i karusellen.
      return [...added, ...cur];
    });
  }

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
      <section className="rounded-3xl border border-indigo/20 bg-indigo/[0.04] p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl tracking-display-tight">Nya omdömen på Reco</h2>
            <p className="mt-1 text-[13px] text-ink/60">
              Hämtar de fem senaste från er Reco-profil och visar dem som inte finns här än.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchReco}
            disabled={recoBusy}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone px-4 py-2.5 text-[13.5px] text-ink/80 hover:text-ink hover:border-ink/40 transition disabled:opacity-40"
          >
            {recoBusy ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Hämta från Reco
          </button>
        </div>
        {recoMsg && <p className="mt-3 text-[13px] text-ink/60">{recoMsg}</p>}
        {reco && newFromReco.length === 0 && (
          <p className="mt-3 text-[13.5px] text-moss">
            <Check size={14} className="inline -mt-0.5 mr-1" />
            Alla de senaste omdömena på Reco finns redan i listan.
          </p>
        )}
        {newFromReco.length > 0 && (
          <div className="mt-4 space-y-3">
            {newFromReco.map((r) => (
              <div key={r.id + r.date} className="rounded-2xl border border-ink/10 bg-bone p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[14px]">
                    <span className="font-medium">{r.author}</span>
                    <span className="text-ink/50">
                      {" · "}
                      {r.date.slice(0, 10)}
                      {r.rating ? ` · ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}` : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => importReco([r])}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink text-bone px-3.5 py-1.5 text-[12.5px]"
                  >
                    <Download size={13} /> Lägg till
                  </button>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75 line-clamp-4">{r.text}</p>
              </div>
            ))}
            {newFromReco.length > 1 && (
              <button
                type="button"
                onClick={() => importReco(newFromReco)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13px] text-ink/75 hover:text-ink hover:border-ink/40 transition"
              >
                <Download size={13} /> Lägg till alla {newFromReco.length}
              </button>
            )}
            <p className="text-[12.5px] text-ink/50">
              Tillagda omdömen hamnar överst i listan nedan och visas på sajten först när du sparat.
              Läs igenom texten och rätta ev. stavfel innan du sparar.
            </p>
          </div>
        )}
      </section>

      <p className="mt-8 text-[13.5px] text-ink/60">
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
