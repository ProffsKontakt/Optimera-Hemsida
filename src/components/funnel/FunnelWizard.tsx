"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Check,
  ClipboardList,
  Home,
  Layers,
  Phone,
  PlugZap,
  Sun,
} from "lucide-react";
import { FUNNEL_PRODUCTS, type Funnel } from "@/lib/funnels";
import { collectAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { CalendarPicker, type SlotSelection } from "@/components/offert/CalendarPicker";

/**
 * Steg-baserad offert-wizard (mobil-först). Flöde:
 *   1. Dina behov      – välj produkter (multi-select-kort med foto)
 *   2. Hur vill du gå vidare? – "fyll i nu" (rekommenderas) eller "bara kontakt"
 *   3. Om ditt hem     – boende + kontaktsätt (+ kalender) [hoppas över i snabbspåret]
 *   4. Kontakt         – namn/telefon/e-post + skicka
 *
 * Skickar till samma /api/offert som vanliga formuläret -> leads hamnar i
 * Optimera Hub (Supabase) med variantens leadsource, och tacksidan
 * /offert/klar fyrar generate_lead precis som vanligt.
 */

// Komponent-referenser så samma ikon kan renderas stor (kort-plattan)
// och liten där det behövs.
const PRODUCT_ICONS: Record<
  string,
  React.ComponentType<{ size?: number | string }>
> = {
  solpaneler: Sun,
  batterier: BatteryCharging,
  "batteri-utbyggnad": Layers,
  laddboxar: PlugZap,
};

const HOUSING = ["Villa", "Radhus", "Fritidshus", "Lantbruk", "Brf / styrelse"];

type Path = "full" | "quick";
type Step = "behov" | "vag" | "hem" | "kontakt";

export function FunnelWizard({ funnel }: { funnel: Funnel }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("behov");
  const [products, setProducts] = useState<string[]>([]);
  const [path, setPath] = useState<Path>("full");
  const [boende, setBoende] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState<"hembesok" | "telefon">("telefon");
  const [slot, setSlot] = useState<SlotSelection | null>(null);
  const [meddelande, setMeddelande] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Snabbspåret hoppar över "Om ditt hem" -> 3 steg i stället för 4.
  const steps: Step[] = useMemo(
    () => (path === "quick" ? ["behov", "vag", "kontakt"] : ["behov", "vag", "hem", "kontakt"]),
    [path],
  );
  const stepIndex = steps.indexOf(step);

  const STEP_TITLES: Record<Step, string> = {
    behov: "Dina behov",
    vag: "Hur vill du gå vidare?",
    hem: "Om ditt hem",
    kontakt: "Kontaktuppgifter",
  };

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_start", { form: "funnel", variant: funnel.slug });
    }
  }

  function goTo(next: Step) {
    setError(null);
    setStep(next);
    trackEvent("funnel_step_view", {
      variant: funnel.slug,
      step: next,
      step_index: steps.indexOf(next) + 1,
    });
    // Wizarden kan vara längre än viewporten på mobil - börja varje steg
    // uppifrån så rubriken alltid syns.
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    if (step === "behov") {
      if (products.length === 0) {
        setError("Välj minst ett alternativ för att gå vidare.");
        return;
      }
      goTo("vag");
    } else if (step === "vag") {
      goTo(path === "quick" ? "kontakt" : "hem");
    } else if (step === "hem") {
      if (contactMethod === "hembesok" && !slot) {
        setError("Välj en dag och tid för hembesöket, eller byt till telefonkontakt.");
        return;
      }
      goTo("kontakt");
    }
  }

  function back() {
    const prev = steps[stepIndex - 1];
    if (prev) goTo(prev);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const namn = String(fd.get("namn") ?? "");
    const telefon = String(fd.get("telefon") ?? "");
    const epost = String(fd.get("epost") ?? "");
    const adress = String(fd.get("adress") ?? "");
    const isHembesok = path === "full" && contactMethod === "hembesok";
    const body = {
      namn,
      telefon,
      epost,
      adress: adress || undefined,
      meddelande: meddelande || undefined,
      boende: boende ?? undefined,
      contactMethod: isHembesok ? "hembesok" : "telefon",
      slot: isHembesok ? slot : null,
      services: products,
      funnel: funnel.slug,
      attribution: collectAttribution(),
    };
    try {
      const res = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      trackEvent("funnel_submit", {
        variant: funnel.slug,
        services: products.join(","),
        path,
      });
      try {
        sessionStorage.setItem(
          "oe_offert_confirmation",
          JSON.stringify({
            method: isHembesok ? "hembesok" : "telefon",
            services: products.join(","),
            slot: isHembesok ? slot : null,
            email: epost,
            phone: telefon,
          }),
        );
      } catch {
        /* privat läge */
      }
      router.push("/offert/klar");
    } catch {
      setError("Något krånglade. Mejla oss på hej@optimeraenergi.se så löser vi det.");
      setSubmitting(false);
    }
  }

  return (
    <div ref={topRef} className="mx-auto w-full max-w-xl scroll-mt-24">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-indigo">
          Steg {stepIndex + 1} av {steps.length}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/45">
          {STEP_TITLES[step]}
        </span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-indigo" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <div className="mt-8">
        {step === "behov" && (
          <StepBehov
            funnel={funnel}
            products={products}
            onToggle={(key) => {
              markStarted();
              setProducts((cur) =>
                cur.includes(key) ? cur.filter((x) => x !== key) : [...cur, key],
              );
              setError(null);
            }}
          />
        )}

        {step === "vag" && (
          <StepVag path={path} onSelect={(p) => setPath(p)} />
        )}

        {step === "hem" && (
          <StepHem
            boende={boende}
            setBoende={setBoende}
            contactMethod={contactMethod}
            setContactMethod={(m) => {
              setContactMethod(m);
              setError(null);
            }}
            slot={slot}
            setSlot={setSlot}
            meddelande={meddelande}
            setMeddelande={setMeddelande}
          />
        )}

        {step === "kontakt" ? (
          <form onSubmit={onSubmit}>
            <StepKontakt quick={path === "quick"} />
            {error && <ErrorBox>{error}</ErrorBox>}
            <div className="sticky bottom-4 mt-8">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-6 py-4 text-base font-medium text-bone shadow-lg shadow-indigo/25 hover:bg-indigo/90 transition disabled:opacity-50"
              >
                {submitting ? "Skickar…" : "Skicka – kostnadsfritt"}
                <ArrowRight size={16} />
              </button>
            </div>
            <BackLink onClick={back} />
            <p className="mt-5 text-[12.5px] text-ink/55 leading-relaxed">
              Vi hör av oss inom 24 timmar. Genom att skicka godkänner du att vi
              kontaktar dig om din förfrågan – inget annat.{" "}
              <a href="/integritet" className="underline">
                Integritetspolicy
              </a>
              .
            </p>
          </form>
        ) : (
          <>
            {error && <ErrorBox>{error}</ErrorBox>}
            <div className="sticky bottom-4 mt-8">
              <button
                onClick={next}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-6 py-4 text-base font-medium text-bone shadow-lg shadow-indigo/25 hover:bg-indigo/90 transition"
              >
                Fortsätt <ArrowRight size={16} />
              </button>
            </div>
            {stepIndex > 0 && <BackLink onClick={back} />}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Steg 1: Dina behov ---------- */

function StepBehov({
  funnel,
  products,
  onToggle,
}: {
  funnel: Funnel;
  products: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl tracking-display-tight">
        {funnel.headline}
      </h1>
      <p className="mt-3 text-ink/65 text-[15px] leading-relaxed">{funnel.intro}</p>

      <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-indigo/20 bg-indigo/5 px-4 py-3">
        <div>
          <div className="text-[13.5px] font-medium">Välj ett eller flera alternativ</div>
          <div className="text-[12.5px] text-ink/55">
            Du kan kombinera, t.ex. solpaneler och batteri.
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-bone border border-ink/10 px-3 py-1 font-mono text-[11px] text-ink/70">
          {products.length} valda
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {FUNNEL_PRODUCTS.map((p) => {
          const on = products.includes(p.key);
          const Icon = PRODUCT_ICONS[p.key] ?? Sun;
          return (
            <button
              type="button"
              key={p.key}
              onClick={() => onToggle(p.key)}
              aria-pressed={on}
              className={`group overflow-hidden rounded-3xl border text-left transition ${
                on
                  ? "border-indigo ring-2 ring-indigo/30"
                  : "border-ink/10 hover:border-ink/30"
              }`}
            >
              {/* Ikon-platta: stor ikon på brand-gradient i stället för foto. */}
              <div
                className={`relative grid aspect-[5/3] place-items-center bg-gradient-to-br ${p.fallback}`}
              >
                <span
                  className={`grid h-16 w-16 place-items-center rounded-full bg-bone/15 text-bone transition-transform duration-300 ${
                    on ? "scale-105" : "group-active:scale-90"
                  }`}
                >
                  <Icon size={30} />
                </span>
                <span
                  className={`absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full border transition ${
                    on
                      ? "bg-indigo border-indigo text-bone"
                      : "bg-bone/70 border-ink/15 text-transparent backdrop-blur"
                  }`}
                >
                  <Check size={14} />
                </span>
              </div>
              <div className="bg-cream/60 p-3.5">
                <div className="text-[13.5px] font-medium leading-snug">
                  {p.title}
                </div>
                <div className="mt-1 text-[12px] text-ink/55">{p.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Steg 2: Hur vill du gå vidare? ---------- */

function StepVag({ path, onSelect }: { path: Path; onSelect: (p: Path) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl tracking-display-tight">
        Hur vill du gå vidare?
      </h2>
      <p className="mt-3 text-ink/65 text-[15px] leading-relaxed">
        Välj hur mycket du vill fylla i nu – båda vägarna leder till en
        kostnadsfri offert.
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <PathCard
          active={path === "full"}
          onClick={() => onSelect("full")}
          badge="Rekommenderas"
          icon={<ClipboardList size={16} />}
          title="Fyll i uppgifter nu"
          sub="Ca 1 minut · korta steg"
          points={[
            "Snabbare och smidigare möte",
            "Vi har underlaget redan vid första kontakten",
            "Mer träffsäkert prisförslag",
          ]}
        />
        <PathCard
          active={path === "quick"}
          onClick={() => onSelect("quick")}
          icon={<Phone size={16} />}
          title="Bara kontaktuppgifter"
          sub="Ca 20 sekunder"
          points={[
            "Vi ringer och går igenom frågorna med dig",
            "Något längre väg till färdig offert",
          ]}
        />
      </div>
      <p className="mt-4 text-[12.5px] text-ink/55">
        Du kan byta väg när som helst – inget är bindande.
      </p>
    </div>
  );
}

function PathCard({
  active,
  onClick,
  badge,
  icon,
  title,
  sub,
  points,
}: {
  active: boolean;
  onClick: () => void;
  badge?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  points: string[];
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-3xl border p-5 text-left transition ${
        active ? "border-indigo ring-2 ring-indigo/30 bg-indigo/5" : "border-ink/10 hover:border-ink/30 bg-cream/50"
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-sun px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink">
          {badge}
        </span>
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`grid h-8 w-8 place-items-center rounded-full ${
              active ? "bg-indigo text-bone" : "bg-ink/8 text-ink/70"
            }`}
          >
            {icon}
          </span>
          <div>
            <div className="text-[14.5px] font-medium leading-tight">{title}</div>
            <div className="text-[12px] text-ink/55">{sub}</div>
          </div>
        </div>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
            active ? "bg-indigo border-indigo text-bone" : "border-ink/20 text-transparent"
          }`}
        >
          <Check size={13} />
        </span>
      </div>
      <ul className="mt-4 space-y-1.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[13px] text-ink/70 leading-snug">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo" />
            {p}
          </li>
        ))}
      </ul>
    </button>
  );
}

/* ---------- Steg 3: Om ditt hem ---------- */

function StepHem({
  boende,
  setBoende,
  contactMethod,
  setContactMethod,
  slot,
  setSlot,
  meddelande,
  setMeddelande,
}: {
  boende: string | null;
  setBoende: (b: string) => void;
  contactMethod: "hembesok" | "telefon";
  setContactMethod: (m: "hembesok" | "telefon") => void;
  slot: SlotSelection | null;
  setSlot: (s: SlotSelection | null) => void;
  meddelande: string;
  setMeddelande: (m: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl tracking-display-tight">
        Om ditt hem.
      </h2>

      <div className="mt-5">
        <div className="text-[13px] text-ink/65 mb-2">Vad för slags hem?</div>
        <div className="flex flex-wrap gap-2">
          {HOUSING.map((h) => (
            <button
              type="button"
              key={h}
              onClick={() => setBoende(h)}
              aria-pressed={boende === h}
              className={`rounded-full border px-4 py-2 text-[13.5px] transition ${
                boende === h
                  ? "bg-ink text-bone border-ink"
                  : "bg-cream/50 border-ink/15 hover:border-ink/40"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[13px] text-ink/65 mb-2">Hur vill du bli kontaktad?</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setContactMethod("telefon")}
            aria-pressed={contactMethod === "telefon"}
            className={`rounded-2xl border px-4 py-3.5 text-left transition ${
              contactMethod === "telefon"
                ? "bg-ink text-bone border-ink"
                : "bg-cream/50 border-ink/15 hover:border-ink/40"
            }`}
          >
            <Phone size={15} className="mb-1.5 opacity-70" />
            <div className="text-[14px] font-medium leading-tight">Vi ringer upp</div>
            <div className={`text-[12px] mt-0.5 ${contactMethod === "telefon" ? "text-bone/65" : "text-ink/55"}`}>
              Nästa vardag
            </div>
          </button>
          <button
            type="button"
            onClick={() => setContactMethod("hembesok")}
            aria-pressed={contactMethod === "hembesok"}
            className={`rounded-2xl border px-4 py-3.5 text-left transition ${
              contactMethod === "hembesok"
                ? "bg-ink text-bone border-ink"
                : "bg-cream/50 border-ink/15 hover:border-ink/40"
            }`}
          >
            <Home size={15} className="mb-1.5 opacity-70" />
            <div className="text-[14px] font-medium leading-tight">Boka hembesök</div>
            <div className={`text-[12px] mt-0.5 ${contactMethod === "hembesok" ? "text-bone/65" : "text-ink/55"}`}>
              Välj dag och tid
            </div>
          </button>
        </div>
      </div>

      {contactMethod === "hembesok" && (
        <div className="mt-5">
          <div className="text-[13px] text-ink/65 mb-2">När ska vi komma över?</div>
          <CalendarPicker value={slot} onChange={setSlot} />
        </div>
      )}

      <div className="mt-6">
        <label className="block">
          <span className="block text-[13px] text-ink/65 mb-2">
            Något vi bör veta? (frivilligt)
          </span>
          <textarea
            value={meddelande}
            onChange={(e) => setMeddelande(e.target.value)}
            rows={3}
            placeholder="T.ex. takets ålder, befintlig anläggning, tidsfönster…"
            className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3 text-[15px] outline-none focus:border-ink/50 transition"
          />
        </label>
      </div>
    </div>
  );
}

/* ---------- Steg 4: Kontakt ---------- */

function StepKontakt({ quick }: { quick: boolean }) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl tracking-display-tight">
        {quick ? "Vi hör av oss." : "Nästan klart."}
      </h2>
      <p className="mt-3 text-ink/65 text-[15px] leading-relaxed">
        {quick
          ? "Lämna dina uppgifter så ringer vi upp och går igenom resten tillsammans."
          : "Fyll i dina uppgifter så återkommer vi med nästa steg."}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <Field name="namn" label="Namn" autoComplete="name" required />
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
        <Field name="epost" label="E-post" type="email" autoComplete="email" required />
        <Field name="adress" label="Adress (frivilligt)" autoComplete="street-address" />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  inputMode,
  pattern,
  title,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  title?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] text-ink/65 mb-1.5">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        inputMode={inputMode}
        pattern={pattern}
        title={title}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-ink/15 bg-cream/50 px-4 py-3.5 text-[16px] outline-none focus:border-ink/50 transition invalid:[&:not(:placeholder-shown):not(:focus)]:border-copper/60"
      />
    </label>
  );
}

/* ---------- Småkomponenter ---------- */

function ErrorBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-2xl border border-copper/40 bg-copper/10 px-4 py-3 text-[13.5px] text-copper">
      {children}
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-ink/60 hover:text-ink transition"
    >
      <ArrowLeft size={14} /> Tillbaka
    </button>
  );
}
