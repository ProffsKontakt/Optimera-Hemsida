"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/services";

type Defaults = Record<string, string | null>;

const housingTypes = ["Villa", "Radhus", "Fritidshus", "Lantbruk", "Brf / styrelse"];
const timelines = [
  "Så snart som möjligt",
  "Inom 3 månader",
  "Senare i år",
  "Bara nyfiken just nu",
];

export function OffertForm({ defaults }: { defaults: Defaults }) {
  const [services, setServices] = useState<string[]>(
    defaults.tjanst ? [defaults.tjanst] : ["solpaneler"],
  );
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const body = {
      ...payload,
      services,
      config: {
        panel: defaults.panel,
        antalPaneler: defaults.n,
        växelriktare: defaults.inv,
        batteri: defaults.bat,
        värmepump: defaults.pump,
        laddbox: defaults.chrg,
        vindsnurra: defaults.wind,
        ems: defaults.ems,
      },
    };
    try {
      const res = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
    } catch (err) {
      setError(
        "Något krånglade. Mejla oss på hej@klokatankar.se så löser vi det.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[28px] border border-ink/10 bg-cream/70 p-12 max-w-2xl">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-moss text-bone">
          <Check size={20} />
        </div>
        <h2 className="mt-6 font-display text-4xl tracking-display-tight">
          Tack — vi hörs.
        </h2>
        <p className="mt-4 text-ink/70 leading-relaxed">
          Vi har fått din förfrågan och hör av oss inom 24 timmar med förslag
          på datum för hembesök. Under tiden — håll utkik efter ett mejl från
          ronja@klokatankar.se.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card>
          <FieldHead n="01" title="Vad vill du installera?" />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {SERVICES.map((s) => {
              const on = services.includes(s.slug);
              return (
                <button
                  type="button"
                  key={s.slug}
                  onClick={() =>
                    setServices((cur) =>
                      cur.includes(s.slug)
                        ? cur.filter((x) => x !== s.slug)
                        : [...cur, s.slug],
                    )
                  }
                  className={[
                    "rounded-2xl border px-4 py-3 text-left transition",
                    on
                      ? "bg-ink text-bone border-ink"
                      : "bg-cream/50 border-ink/15 hover:border-ink/40",
                  ].join(" ")}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">
                    {s.badge}
                  </div>
                  <div className="font-display text-lg tracking-display-tight mt-1">
                    {s.name}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <FieldHead n="02" title="Vad för slags hem?" />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {housingTypes.map((h) => (
              <RadioCard name="boende" key={h} value={h} label={h} />
            ))}
          </div>
        </Card>

        <Card>
          <FieldHead n="03" title="Tidsperspektiv" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {timelines.map((t) => (
              <RadioCard name="tid" key={t} value={t} label={t} />
            ))}
          </div>
        </Card>

        <Card>
          <FieldHead n="04" title="Kontakt" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="namn" label="Namn" required />
            <Input name="telefon" label="Telefon" required />
            <Input name="epost" label="E-post" type="email" required />
            <Input name="adress" label="Adress" />
          </div>
          <Textarea
            name="meddelande"
            label="Berätta lite mer (frivilligt)"
            placeholder="T.ex. takets ålder, befintlig värmekälla, drömlösning, tidsfönster, allergier för kanelbullar…"
            className="mt-4"
          />
        </Card>

        <p className="text-[12.5px] text-ink/55 leading-relaxed max-w-2xl">
          Genom att skicka in godkänner du att vi kontaktar dig om din förfrågan.
          Vi använder inte dina uppgifter för något annat. Läs vår{" "}
          <a href="/integritet" className="underline">
            integritetspolicy
          </a>
          .
        </p>

        {error && (
          <div className="rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
            {error}
          </div>
        )}

        <button
          disabled={submitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {submitting ? "Skickar…" : "Skicka förfrågan"}
          <ArrowRight size={16} />
        </button>
      </div>

      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-[28px] border border-ink/10 bg-cream/70 p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
              Det här ingår alltid
            </div>
            <ul className="mt-4 space-y-3 text-[14.5px] text-ink/80">
              {[
                "Hembesök inom 14 dagar",
                "Drönarbesiktning av tak",
                "Digital tvilling i 3D",
                "Tydlig prislista — utan asterisker",
                "Fika från lokala bagerier",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 grid h-4 w-4 place-items-center rounded-full bg-amber text-ink">
                    <Check size={10} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {(defaults.panel || defaults.bat || defaults.pump) && (
            <div className="rounded-[28px] border border-ink/10 bg-bone p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Din konfiguration från kalkylatorn
              </div>
              <div className="mt-4 space-y-2 text-[13px] font-mono text-ink/75">
                {Object.entries({
                  Panel: defaults.panel,
                  Antal: defaults.n,
                  Växelriktare: defaults.inv,
                  Batteri: defaults.bat,
                  Värmepump: defaults.pump,
                  Laddbox: defaults.chrg,
                  Vindsnurra: defaults.wind,
                  EMS: defaults.ems,
                })
                  .filter(([, v]) => !!v)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <span className="text-ink/55">{k}</span>
                      <span className="text-right">{v}</span>
                    </div>
                  ))}
              </div>
              <p className="mt-5 text-[12.5px] text-ink/55">
                Vi tar med din konfiguration som utgångspunkt för hembesöket.
              </p>
            </div>
          )}
        </div>
      </aside>
    </form>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-bone p-7">
      {children}
    </div>
  );
}

function FieldHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
        {n}
      </span>
      <h3 className="font-display text-2xl tracking-display-tight">{title}</h3>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] text-ink/65 mb-2">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-[13px] text-ink/65 mb-2">{label}</span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
      />
    </label>
  );
}

function RadioCard({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} className="peer sr-only" />
      <span className="block rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[14px] hover:border-ink/40 peer-checked:bg-ink peer-checked:text-bone peer-checked:border-ink transition">
        {label}
      </span>
    </label>
  );
}
