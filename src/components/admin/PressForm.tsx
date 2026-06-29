"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Trash2 } from "lucide-react";
import type { PressRelease } from "@/lib/press";

export type PressFormMode = "new" | "edit";

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,80}[a-z0-9])?$/;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/é/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 82);
}

// Team-presets som snabb-väljare för mediakontakt. Du kan ändå skriva
// över alla fält fritt om någon annan ska stå som kontakt på en specifik
// release.
const TEAM_PRESETS = [
  {
    id: "viktor",
    name: "Viktor Tiberg",
    title: "Grundare och VD",
    email: "viktor@optimeraenergi.se",
    phone: "076 305 37 32",
  },
  {
    id: "julian",
    name: "Julian Nordgren",
    title: "Grundare och Operativ Chef",
    email: "julian@optimeraenergi.se",
    phone: "",
  },
  {
    id: "moltas",
    name: "Moltas Roslund",
    title: "Sales Operations",
    email: "moltas@optimeraenergi.se",
    phone: "070 534 01 54",
  },
] as const;

export function PressForm({
  mode,
  initial,
}: {
  mode: PressFormMode;
  initial?: PressRelease;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [lede, setLede] = useState(initial?.lede ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [authorName, setAuthorName] = useState(initial?.author.name ?? TEAM_PRESETS[0].name);
  const [authorTitle, setAuthorTitle] = useState(initial?.author.title ?? TEAM_PRESETS[0].title);
  const [authorEmail, setAuthorEmail] = useState(initial?.author.email ?? TEAM_PRESETS[0].email);
  const [authorPhone, setAuthorPhone] = useState(initial?.author.phone ?? TEAM_PRESETS[0].phone);
  const [quoteText, setQuoteText] = useState(initial?.quote?.text ?? "");
  const [quoteAttr, setQuoteAttr] = useState(initial?.quote?.attribution ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [featuredUntil, setFeaturedUntil] = useState<string | null>(
    initial?.featuredUntil ?? null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched && mode === "new") {
      setSlug(slugify(v));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const payload = {
      slug,
      title,
      date,
      lede,
      body,
      author: {
        name: authorName,
        title: authorTitle,
        email: authorEmail,
        phone: authorPhone,
      },
      ...(quoteText && quoteAttr
        ? { quote: { text: quoteText, attribution: quoteAttr } }
        : {}),
      featured,
      ...(featured && featuredUntil ? { featuredUntil } : {}),
    };
    try {
      const res = await fetch("/api/admin/press", {
        method: mode === "new" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Något gick fel");
        setSubmitting(false);
        return;
      }
      router.push("/admin/press?ok=1");
    } catch (err) {
      setError(String(err));
      setSubmitting(false);
    }
  }

  async function onDelete() {
    if (!initial) return;
    if (!confirm(`Ta bort "${initial.title}"? Detta går inte att ångra utan att läsa Git-historiken.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/press?slug=${encodeURIComponent(initial.slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Borttagning misslyckades");
        setDeleting(false);
        return;
      }
      router.push("/admin/press?deleted=1");
    } catch (err) {
      setError(String(err));
      setDeleting(false);
    }
  }

  const slugValid = SLUG_RE.test(slug);

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <Field label="Rubrik" hint="Användbar för Google + delning. Max ~120 tecken.">
        <input
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
        />
      </Field>

      <Field
        label="Slug"
        hint={
          slugValid
            ? `URL: /press/${slug}`
            : "Små bokstäver, siffror eller bindestreck. Max 82 tecken."
        }
      >
        <input
          required
          value={slug}
          disabled={mode === "edit"}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] font-mono outline-none focus:border-ink/50 transition disabled:opacity-50"
        />
      </Field>

      <Field label="Datum" hint="ISO 8601 (yyyy-mm-dd). Visas i artikelhuvudet.">
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
        />
      </Field>

      <Field label="Ingress (lede)" hint="2-3 meningar. Visas i listor + som meta-description.">
        <textarea
          required
          rows={3}
          value={lede}
          onChange={(e) => setLede(e.target.value)}
          className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition leading-relaxed"
        />
      </Field>

      <Field label="Brödtext" hint="Stycken separeras med blank rad. Inget HTML än så länge.">
        <textarea
          required
          rows={14}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition leading-relaxed font-serif"
        />
      </Field>

      <fieldset className="rounded-3xl border border-ink/10 bg-cream/40 p-6 space-y-4">
        <legend className="px-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
          Mediakontakt
        </legend>

        <div>
          <div className="text-[13px] text-ink/65 mb-2">Snabbval</div>
          <div className="flex flex-wrap gap-2">
            {TEAM_PRESETS.map((p) => {
              const active = authorEmail === p.email;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setAuthorName(p.name);
                    setAuthorTitle(p.title);
                    setAuthorEmail(p.email);
                    setAuthorPhone(p.phone);
                  }}
                  className={[
                    "rounded-full border px-4 py-2 text-[13px] transition",
                    active
                      ? "bg-ink text-bone border-ink"
                      : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                  ].join(" ")}
                >
                  {p.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        <Field label="Namn">
          <input
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </Field>
        <Field label="Titel">
          <input
            required
            value={authorTitle}
            onChange={(e) => setAuthorTitle(e.target.value)}
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </Field>
        <Field label="E-post">
          <input
            required
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </Field>
        <Field label="Telefon" hint="Visas på artikelsidan och i tel:-länken.">
          <input
            required
            type="tel"
            value={authorPhone}
            onChange={(e) => setAuthorPhone(e.target.value)}
            placeholder="076 305 37 32"
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </Field>
      </fieldset>

      <fieldset className="rounded-3xl border border-ink/10 bg-cream/40 p-6 space-y-4">
        <legend className="px-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
          Pull-quote (frivilligt)
        </legend>
        <Field label="Citat">
          <textarea
            rows={3}
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            placeholder="Ett citat som lyfts fram visuellt i artikeln."
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition leading-relaxed"
          />
        </Field>
        <Field label="Citatets ursprung">
          <input
            value={quoteAttr}
            onChange={(e) => setQuoteAttr(e.target.value)}
            placeholder="t.ex. Viktor Tiberg, grundare och VD"
            className="w-full rounded-2xl border border-ink/15 bg-bone px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </Field>
      </fieldset>

      <FeaturedBlock
        featured={featured}
        featuredUntil={featuredUntil}
        onToggleFeatured={(v) => {
          setFeatured(v);
          if (v && !featuredUntil) {
            // Default vid första aktiveringen: 1 vecka
            setFeaturedUntil(daysFromNow(7));
          }
        }}
        onSetUntil={setFeaturedUntil}
      />

      {error && (
        <div className="rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting || !slugValid}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? "Committar..."
            : mode === "new"
            ? "Publicera"
            : "Spara ändringar"}
          <ArrowRight size={16} />
        </button>
        {mode === "edit" && initial && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/5 px-6 py-3.5 text-sm font-medium text-copper hover:bg-copper/10 transition disabled:opacity-50"
          >
            <Trash2 size={14} />
            {deleting ? "Tar bort..." : "Ta bort"}
          </button>
        )}
      </div>

      <p className="text-[12.5px] text-ink/55 leading-relaxed">
        Publicering eller redigering genererar en commit till repo:t, vilket
        triggar en Vercel-deploy. Releasen är live på optimeraenergi.se inom
        ~1-2 minuter.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[13.5px] font-medium text-ink/80 mb-1.5">
        {label}
      </span>
      {children}
      {hint && (
        <span className="block mt-1.5 text-[12px] text-ink/55">{hint}</span>
      )}
    </label>
  );
}

// =================== Banner-styrning ===================

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  // Behåll lokal tid men nollställ minutprecision till 23:59 så hela
  // utgångsdagen är inkluderad.
  d.setHours(23, 59, 0, 0);
  return d.toISOString();
}

const DURATION_PRESETS: { id: string; label: string; days: number | null }[] = [
  { id: "1d", label: "1 dag", days: 1 },
  { id: "7d", label: "1 vecka", days: 7 },
  { id: "14d", label: "2 veckor", days: 14 },
  { id: "30d", label: "1 månad", days: 30 },
  { id: "open", label: "Tills jag stänger av", days: null },
];

function FeaturedBlock({
  featured,
  featuredUntil,
  onToggleFeatured,
  onSetUntil,
}: {
  featured: boolean;
  featuredUntil: string | null;
  onToggleFeatured: (v: boolean) => void;
  onSetUntil: (v: string | null) => void;
}) {
  const untilDate = featuredUntil ? new Date(featuredUntil) : null;
  const untilLabel = untilDate
    ? untilDate.toLocaleString("sv-SE", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  return (
    <fieldset className="rounded-3xl border border-ink/10 bg-cream/40 p-6 space-y-5">
      <legend className="px-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
        Banderoll på startsidan
      </legend>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => onToggleFeatured(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-ink/20"
        />
        <span>
          <span className="block text-[14.5px] font-medium text-ink">
            Visa som banderoll
          </span>
          <span className="block text-[12.5px] text-ink/55 mt-0.5">
            Sticky-rad ovanför navbar på alla sidor med titel och länk till
            pressmeddelandet. Besökare kan stänga den per webbläsare.
          </span>
        </span>
      </label>

      {featured && (
        <div className="space-y-3">
          <div className="text-[13px] text-ink/65">Hur länge?</div>
          <div className="flex flex-wrap gap-2">
            {DURATION_PRESETS.map((p) => {
              const isOpen = p.days === null;
              const active = isOpen
                ? !featuredUntil
                : featuredUntil != null &&
                  Math.abs(
                    Date.parse(featuredUntil) -
                      Date.parse(daysFromNow(p.days!)),
                  ) <
                    60 * 60 * 1000; // tolerans 1h
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    onSetUntil(isOpen ? null : daysFromNow(p.days!))
                  }
                  className={[
                    "rounded-full border px-4 py-2 text-[13px] transition",
                    active
                      ? "bg-ink text-bone border-ink"
                      : "bg-bone text-ink/75 border-ink/15 hover:border-ink/40",
                  ].join(" ")}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
          <div className="text-[12.5px] text-ink/55">
            {featuredUntil
              ? `Försvinner ${untilLabel}.`
              : "Ingen auto-utgång. Avmarkera checkboxen ovan när det inte längre är aktuellt."}
          </div>
        </div>
      )}
    </fieldset>
  );
}
