"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Home, Phone } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { collectAttribution } from "@/lib/attribution";
import { CalendarPicker, type SlotSelection } from "./CalendarPicker";

type Defaults = Record<string, string | null>;
type ContactMethod = "hembesok" | "telefon";

const housingTypes = ["Villa", "Radhus", "Fritidshus", "Lantbruk", "Brf / styrelse"];

export function OffertForm({ defaults }: { defaults: Defaults }) {
  const router = useRouter();
  const [services, setServices] = useState<string[]>(
    defaults.tjanst ? [defaults.tjanst] : ["solpaneler"],
  );
  const [contactMethod, setContactMethod] = useState<ContactMethod>("hembesok");
  const [slot, setSlot] = useState<SlotSelection | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (contactMethod === "hembesok" && !slot) {
      setError("Välj en dag och tid för hembesöket innan du skickar.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const body = {
      ...payload,
      services,
      contactMethod,
      slot: contactMethod === "hembesok" ? slot : null,
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
      // så att Sentinel HQ kan rapportera tillbaka köp till Google Ads/GA4.
      attribution: collectAttribution(),
    };
    try {
      const res = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      // Spara bekräftelsedetaljer för tack-sidan, navigera sedan till en
      // DEDIKERAD URL (/offert/klar). Den distinkta URL:en ger ett eget
      // page_view i GA4 som kan användas som Key event / konvertering, och
      // generate_lead-eventet skickas där.
      try {
        sessionStorage.setItem(
          "oe_offert_confirmation",
          JSON.stringify({
            method: contactMethod,
            services: services.join(","),
            slot: contactMethod === "hembesok" ? slot : null,
            // För Enhanced Conversions på tacksidan (hashas där, skickas
            // bara vid marknadsföringssamtycke).
            email: typeof payload.epost === "string" ? payload.epost : "",
            phone: typeof payload.telefon === "string" ? payload.telefon : "",
          }),
        );
      } catch {
        // sessionStorage kan kasta i privat läge, ignorera
      }
      router.push("/offert/klar");
    } catch (err) {
      setError(
        "Något krånglade. Mejla oss på hej@optimeraenergi.se så löser vi det.",
      );
      setSubmitting(false);
    }
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
          <FieldHead n="03" title="Hur vill ni bli kontaktade?" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ContactMethodCard
              icon={<Home size={18} />}
              eyebrow="Hembesök"
              title="Vi kommer förbi"
              body="Drönarbesiktning, 3D-modell av huset, raka besked på plats. Tar 45–60 min."
              active={contactMethod === "hembesok"}
              onClick={() => setContactMethod("hembesok")}
            />
            <ContactMethodCard
              icon={<Phone size={18} />}
              eyebrow="Telefonkontakt"
              title="Vi ringer upp"
              body="Vi ringer er nästa vardag och stämmer av vad ni funderar på, utan att boka tid direkt."
              active={contactMethod === "telefon"}
              onClick={() => setContactMethod("telefon")}
            />
          </div>
        </Card>

        {contactMethod === "hembesok" && (
          <Card>
            <FieldHead n="04" title="När vill ni installera?" />
            <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
              Välj dag och tid – kalendern visar lediga slottar för hembesök
              de kommande tre veckorna. Vi ringer dagen innan och bekräftar.
            </p>
            <div className="mt-4">
              <CalendarPicker value={slot} onChange={setSlot} />
            </div>
          </Card>
        )}

        <Card>
          <FieldHead
            n={contactMethod === "hembesok" ? "05" : "04"}
            title="Kontakt"
          />
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
                "Hembesök på en tid ni själva väljer",
                "Drönarbesiktning av tak",
                "1:1 kopia av ert hus i 3D",
                "Alltid samma pris som står på offerten",
                "Fika från lokala bagerier",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 grid h-4 w-4 place-items-center rounded-full bg-sun text-ink">
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
                  "Batteri kWh": defaults.batkwh,
                  Värmepump: defaults.pump,
                  Laddbox: defaults.chrg,
                  Vindkraft: defaults.wind,
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

function ContactMethodCard({
  icon,
  eyebrow,
  title,
  body,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-2xl border p-5 text-left transition",
        active
          ? "bg-ink text-bone border-ink"
          : "bg-cream/50 border-ink/15 hover:border-ink/40",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <span
          className={[
            "grid h-7 w-7 place-items-center rounded-full",
            active ? "bg-bone/20 text-bone" : "bg-ink/8 text-ink/70",
          ].join(" ")}
        >
          {icon}
        </span>
        <span
          className={[
            "font-mono text-[10px] uppercase tracking-[0.16em]",
            active ? "text-bone/65" : "text-ink/55",
          ].join(" ")}
        >
          {eyebrow}
        </span>
      </div>
      <div className="mt-3 font-display text-xl tracking-display-tight leading-tight">
        {title}
      </div>
      <p
        className={[
          "mt-2 text-[13.5px] leading-relaxed",
          active ? "text-bone/75" : "text-ink/65",
        ].join(" ")}
      >
        {body}
      </p>
    </button>
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
