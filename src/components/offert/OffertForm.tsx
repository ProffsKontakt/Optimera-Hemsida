"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Plus } from "lucide-react";
import { VISIBLE_SERVICES } from "@/lib/services";
import { collectAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

type Defaults = Record<string, string | null>;

/**
 * Offertformuläret på /offert – medvetet kort för att konvertera:
 * tre obligatoriska fält (namn, telefon, e-post), valfria tjänsteval och ett
 * valfritt meddelande. Ingen kalender – vi ringer upp nästa vardag och bokar
 * hembesöket i telefon. Den som vill välja tid själv kan göra det i
 * stegformuläret på /offert-start.
 *
 * Skickar samma payload till /api/offert som tidigare (contactMethod
 * "telefon", slot null) och går vidare till /offert/klar, där generate_lead
 * och Meta Lead skickas.
 */
export function OffertForm({ defaults }: { defaults: Defaults }) {
  const router = useRouter();
  const validDefault =
    defaults.tjanst && VISIBLE_SERVICES.some((s) => s.slug === defaults.tjanst)
      ? defaults.tjanst
      : null;
  const [services, setServices] = useState<string[]>(
    validDefault ? [validDefault] : [],
  );
  const [showMessage, setShowMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form_start: mikro-konvertering vid första interaktionen med formuläret.
  // Fyras exakt en gång per sidladdning (trigger i GTM, funnel-steg i Ads).
  const formStarted = useRef(false);
  function onFirstInteraction() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_start", { form: "offert" });
  }

  function toggle(slug: string) {
    setServices((cur) =>
      cur.includes(slug) ? cur.filter((x) => x !== slug) : [...cur, slug],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const text = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v.trim() : "";
    };
    const namn = text("namn");
    const telefon = text("telefon");
    const epost = text("epost");
    const meddelande = text("meddelande");
    const body = {
      namn,
      telefon,
      epost,
      meddelande: meddelande || undefined,
      services,
      contactMethod: "telefon",
      slot: null,
      config: {
        panel: defaults.panel,
        antalPaneler: defaults.n,
        växelriktare: defaults.inv,
        batteri: defaults.bat,
        batterikWh: defaults.batkwh,
        värmepump: defaults.pump,
        laddbox: defaults.chrg,
        ems: defaults.ems,
      },
      // Annons-attribution (gclid/UTM/GA4 client_id) följer med in i CRM:et
      // så att köp kan rapporteras tillbaka till Google Ads/GA4.
      attribution: collectAttribution(),
    };
    try {
      const res = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      // Bekräftelsedetaljer till tacksidan, som har en egen URL (/offert/klar)
      // och därmed ett eget page_view som kan användas som konvertering.
      try {
        sessionStorage.setItem(
          "oe_offert_confirmation",
          JSON.stringify({
            method: "telefon",
            services: services.join(","),
            slot: null,
            // För Enhanced Conversions på tacksidan (hashas där, skickas bara
            // vid marknadsföringssamtycke).
            email: epost,
            phone: telefon,
          }),
        );
      } catch {
        // sessionStorage kan kasta i privat läge, ignorera
      }
      router.push("/offert/klar");
    } catch {
      setError(
        "Något krånglade när vi skulle skicka. Försök igen, ring oss på 076 305 37 32 eller mejla hej@optimeraenergi.se.",
      );
      setSubmitting(false);
    }
  }

  const config = Object.entries({
    Panel: defaults.panel,
    Antal: defaults.n,
    Växelriktare: defaults.inv,
    Batteri: defaults.bat,
    "Batteri kWh": defaults.batkwh,
    Värmepump: defaults.pump,
    Laddbox: defaults.chrg,
    Vindkraft: defaults.wind,
    EMS: defaults.ems,
  }).filter(([, v]) => !!v);

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      className="rounded-[28px] border border-ink/10 bg-bone p-6 shadow-sm sm:p-8"
    >
      <fieldset>
        <legend className="mb-2.5 text-[14px] font-medium">
          Vad är du intresserad av?{" "}
          <span className="hidden font-normal text-ink/50 sm:inline">
            Välj gärna flera
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {VISIBLE_SERVICES.map((s) => {
            const on = services.includes(s.slug);
            return (
              <button
                type="button"
                key={s.slug}
                onClick={() => toggle(s.slug)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[14px] transition ${
                  on
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/15 bg-cream/50 hover:border-ink/40"
                }`}
              >
                {on && <Check size={14} aria-hidden />}
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          name="namn"
          label="Namn"
          autoComplete="name"
          required
          minLength={2}
          className="sm:col-span-2"
        />
        {/* 7–15 siffror (mellanslag, bindestreck, parenteser och inledande +
            tillåts) – samma regel som servern. ()-. escapas eftersom
            webbläsare kompilerar pattern med v-flaggan. */}
        <Field
          name="telefon"
          label="Telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          pattern="\+?(?:[\s\(\)\.\-]*\d){7,15}[\s\(\)\.\-]*"
          title="Ange ett giltigt telefonnummer, t.ex. 070-123 45 67"
          required
        />
        <Field
          name="epost"
          label="E-post"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      {showMessage ? (
        <label className="mt-3 block">
          <span className="mb-1.5 block text-[13px] text-ink/65">
            Meddelande (frivilligt)
          </span>
          <textarea
            name="meddelande"
            rows={3}
            autoFocus
            placeholder="T.ex. takets ålder, om du redan har solceller eller vilken värme huset har."
            className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[16px] outline-none transition focus:border-ink/50"
          />
        </label>
      ) : (
        <button
          type="button"
          onClick={() => setShowMessage(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] text-ink/60 transition hover:text-ink"
        >
          <Plus size={14} aria-hidden /> Lägg till ett meddelande
        </button>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-6 py-4 text-base font-medium text-bone shadow-lg shadow-indigo/25 transition hover:bg-indigo/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Skickar…" : "Få kostnadsfri offert"}
        {!submitting && <ArrowRight size={16} aria-hidden />}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-ink/55">
        Vi ringer dig nästa vardag. Genom att skicka godkänner du att vi
        kontaktar dig om din förfrågan – inget annat.{" "}
        <a href="/integritet" className="underline">
          Integritetspolicy
        </a>
        .
      </p>

      {config.length > 0 && (
        <div className="mt-6 rounded-2xl border border-ink/10 bg-cream/60 p-4">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
            Från kalkylatorn – följer med din förfrågan
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink/75">
            {config.map(([k, v]) => (
              <span key={k}>
                <span className="text-ink/50">{k}:</span> {v}
              </span>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  minLength,
  inputMode,
  pattern,
  title,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  title?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] text-ink/65">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        inputMode={inputMode}
        pattern={pattern}
        title={title}
        autoComplete={autoComplete}
        // Osynlig platshållare: gör att :placeholder-shown gäller för tomma
        // fält, så den röda ramen bara syns när något felaktigt skrivits.
        placeholder=" "
        className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3.5 text-[16px] outline-none transition focus:border-ink/50 invalid:[&:not(:placeholder-shown):not(:focus)]:border-copper/60"
      />
    </label>
  );
}
