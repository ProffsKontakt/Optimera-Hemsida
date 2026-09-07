import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import { getTeam } from "@/lib/team";
import { getMedia } from "@/lib/media";
import {
  JsonLd,
  localBusinessSchema,
  aboutPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";

export const metadata = {
  title: "Om oss · Optimera Energi – elfirman som tar hand om dig",
  description:
    "Möt teamet bakom Optimera Energilösningar i Mälardalen AB. Tre människor i Solna som installerar solpaneler, batterier, värmepumpar och laddboxar – och som finns kvar dagen efter kontraktet är skrivet.",
  alternates: { canonical: "/om-oss" },
  openGraph: {
    title: "Om oss – Optimera Energi",
    description:
      "Tre människor i Solna som installerar sol, batteri, värme och laddboxar – och som finns kvar dagen efter kontraktet är skrivet.",
    url: "/om-oss",
    type: "website",
  },
};

const TIMELINE = [
  {
    year: "2026",
    title: "Vi grundades på rak ärlighet.",
    body:
      "Tre personer från branschens största bolag bestämde sig för att göra det vi själva saknade: en installatör som tar hand om kunden hela vägen.",
  },
  {
    year: "2026",
    title: "Kvalitetssäkrade installationer.",
    body:
      "Varje jobb utförs av noggrant utvalda, certifierade installatörer som vi tar fullt ansvar för. Ringer du oss tre år efter installationen är det fortfarande vi som svarar.",
  },
  {
    year: "2027",
    title: "Mälardalen och fasta avtal med tillverkare.",
    body:
      "Vi har redan skaffat oss djupa relationer med leverantörerna vi tror på. Det betyder bättre garantier och snabbare service när något krånglar.",
  },
  {
    year: "2028",
    title: "Egen energihandel utan dolda påslag.",
    body:
      "När vi blir balansansvarig partner kan vi ge våra kunder spotpris utan påslag och en transparent ekonomi i din egen produktion.",
  },
  {
    year: "2030",
    title: "Sveriges mest rekommenderade installatör.",
    body:
      "Målet är inte att bli störst. Målet är att 9 av 10 kunder vill skicka oss vidare till vänner och grannar.",
  },
];

// LocalBusiness berikat med founder + employee + foundingDate-data
// specifikt för /om-oss. Spreadar bas-schemat och lägger Person-arrays.
// Byggs från getTeam() så admin-redigeringar (/admin/team) slår igenom.
function teamLocalBusinessSchema(team: ReturnType<typeof getTeam>) {
  return {
    ...localBusinessSchema,
    founder: team
      .filter((m) => m.role.includes("Grundare"))
      .map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        email: m.email,
        ...(m.phone ? { telephone: telHref(m.phone) } : {}),
      })),
    employee: team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      email: m.email,
      ...(m.phone ? { telephone: telHref(m.phone) } : {}),
    })),
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      name: "Solna, Sverige",
    },
    numberOfEmployees: team.length,
  };
}

// Rubriken räknas från teamlistan så den aldrig ljuger när teamet ändras.
const COUNT_WORDS = [
  "Noll", "En", "Två", "Tre", "Fyra", "Fem", "Sex", "Sju", "Åtta", "Nio",
  "Tio", "Elva", "Tolv",
];

export default function AboutPage() {
  const team = getTeam();
  const countWord = COUNT_WORDS[team.length] ?? String(team.length);
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={teamLocalBusinessSchema(team)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ])}
      />

      {/* Hero – text + snapshot-kort */}
      <section className="container-edge pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow">Om Optimera Energi</div>
            <h1 className="mt-5 font-display text-[44px] md:text-[80px] lg:text-[88px] tracking-display-tight leading-[0.95]">
              En elfirma som
              <br />
              <span className="italic font-serif text-indigo">
                tar hand om dig.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed">
              Optimera Energilösningar i Mälardalen AB grundades på en enkel idé: branschen
              behöver en installatör som faktiskt finns kvar dagen efter
              kontraktet är skrivet.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-ink/10 bg-bone p-7 md:p-8">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 mb-5">
                Bolagsfakta
              </div>
              <dl className="space-y-3.5 text-[14px]">
                <FactRow k="Juridiskt namn" v="Optimera Energilösningar i Mälardalen AB" />
                <FactRow k="Org.nummer" v="559375-2206" />
                <FactRow k="Säte" v="Vallgatan 9, Solna" />
                <FactRow k="Grundat" v="2026" />
                {/* Dynamisk från TEAM så siffran aldrig driftar mot rubriken
                    "Sju människor..." och numberOfEmployees i schemat. */}
                <FactRow k="Medarbetare" v={String(team.length)} />
                <FactRow k="Auktorisation" v="F-skatt · BAS-U · SEK" />
              </dl>
              <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65">
                <Tag>Solpaneler</Tag>
                <Tag>Batterilager</Tag>
                <Tag>Värmepumpar</Tag>
                <Tag>Laddboxar</Tag>
              </div>
            </div>
          </aside>
        </div>

        {/* Stats-rad */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
          <Stat n="0" label="Dolda påslag på offerten" />
          <Stat n="25 år" label="Garanti på installationen" />
          <Stat n="4,8/5" label="Betyg på Reco" />
          <Stat n="9/10" label="Mål: kunder rekommenderar oss" />
        </div>
      </section>

      {/* Vår vision */}
      <Section
        eyebrow="Vår vision"
        title={
          <>
            Den varma kanelbullen
            <br />
            <span className="italic font-serif text-indigo">
              i en kall vinterstorm.
            </span>
          </>
        }
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-5 text-ink/75 text-[16px] md:text-[17px] leading-relaxed">
            <p>
              Efter att ha jobbat i solcells- och energibranschen länge har
              vi sett samma sak gång på gång: bolag som fular sig med
              installationer och säljer på så mycket som möjligt för att
              maxa marginalen, oavsett om kunden faktiskt behöver det.
              Människor som vill göra något för miljön förtjänar bättre
              än så.
            </p>
            <p>
              Vår vision är att vara installatören som tar hand om dig.
              Allt ska kännas bra från första kontakt till sista inkopplade
              kontakt. Vi ringer dagen innan, vi förklarar varje siffra på
              offerten, vi finns kvar år efter installationen.
            </p>
            <p>
              Solcells- och batteribranschen har länge varit som en kall
              vinterstorm man slänger sig ut i när man vill göra något för
              sig själv eller miljön. Vi ska vara känslan av en varm
              kanelbulle mitt i den stormen. Familjär service kombinerat
              med ingenjörskonst som håller i 25 år.
            </p>
          </div>
          <div className="lg:col-span-5">
            <BrandPanel>
              <div className="space-y-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  Det här är löftet
                </div>
                <ul className="space-y-3 text-[15px] text-ink/80 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                    <span>Priset på offerten är priset på fakturan.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                    <span>
                      Vi säger nej till installationer som inte passar dig.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                    <span>
                      Du har en fast kontaktperson från första mejl till
                      sista uppföljning.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo shrink-0" />
                    <span>
                      Garantin på vårt arbete gäller även när du sålt huset.
                    </span>
                  </li>
                </ul>
              </div>
            </BrandPanel>
          </div>
        </div>
      </Section>

      {/* Värderingar */}
      <Section
        eyebrow="Vad vi tror på"
        title={
          <>
            Vad vi gör
            <br />
            <span className="italic font-serif text-indigo">annorlunda.</span>
          </>
        }
        intro="Fyra principer som styr varje hembesök, offert och installation."
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Belief
            n="01"
            title="Genuinitet, vi säger nej när vi måste"
            body="Vi finns inte för att sälja paket. När vi tycker att du borde vänta, dimensionera mindre, eller satsa på värmepump istället för fler paneler, då säger vi det. Det är därför vi finns."
          />
          <Belief
            n="02"
            title="Förståelse innan lösning"
            body="Innan vi pratar lösning vill vi förstå er situation. Vi räknar på er förbrukning, kartlägger ert hus, och ser om lösningen passar er. Först då lägger vi ett konkret förslag."
          />
          <Belief
            n="03"
            title="Hand-plockat sortiment"
            body="Vi kan installera vilket märke som helst. Men vi har valt det vi säljer efter hundratals tester. Inte det dyraste. Inte det billigaste. Det som ger mest värde för pengarna utan att tumma på 25-årsperspektivet."
          />
          <Belief
            n="04"
            title="Erfarenhet från branschens bästa"
            body="En kompetent skara elektriker, projektörer, ekonomer och säljare med rötter i Sveriges mest välrenommerade bolag inom solenergi och el. Vi tar med oss det som avgör skillnaden mellan en bra och en utmärkt installation."
          />
        </div>
      </Section>

      {/* Team */}
      <Section
        eyebrow="Teamet"
        title={<>{countWord} människor som svarar i telefonen.</>}
        intro="Du får aldrig en växel eller en chatt-bot. Du pratar med en av oss, varje gång."
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {team.map((m) => {
            const photo = getMedia(`team:${m.id}`);
            return (
            <article
              key={m.email}
              className="rounded-3xl border border-ink/10 overflow-hidden bg-bone flex flex-col"
            >
              <div className={`aspect-[4/5] bg-gradient-to-br ${m.color} relative`}>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.url}
                    alt={photo.alt || m.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 mix-blend-overlay opacity-25 bg-grain bg-grain-sm" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3 md:p-5 text-bone">
                  <div className="font-mono text-[9px] md:text-[10.5px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-bone/75 truncate">
                    {m.role}
                  </div>
                  <div className="font-display text-base md:text-2xl tracking-display-tight mt-0.5 md:mt-1 leading-tight">
                    {m.name}
                  </div>
                </div>
              </div>
              <div className="p-3.5 md:p-7 flex flex-col gap-3 md:gap-4 flex-1">
                {/* Bion döljs på mobil (2-kolumnsläget) – annars blir det
                    ett jäkla skrollande. */}
                <p className="hidden md:block text-ink/70 text-[14.5px] leading-relaxed">
                  {m.bio}
                </p>
                <div className="mt-auto md:pt-4 md:border-t md:border-ink/10">
                  {/* Mobil: kompakta ikon-knappar. */}
                  <div className="flex gap-2 md:hidden">
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Mejla ${m.name}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/70 active:bg-ink/5"
                    >
                      <Mail size={14} />
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:${telHref(m.phone)}`}
                        aria-label={`Ring ${m.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/70 active:bg-ink/5"
                      >
                        <Phone size={14} />
                      </a>
                    )}
                  </div>
                  {/* Desktop: fulla kontaktrader. */}
                  <div className="hidden md:block space-y-2 text-[13.5px]">
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-2 text-ink/70 hover:text-indigo transition break-all"
                    >
                      <Mail size={13} className="shrink-0" />
                      {m.email}
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:${telHref(m.phone)}`}
                        className="flex items-center gap-2 text-ink/70 hover:text-indigo transition"
                      >
                        <Phone size={13} className="shrink-0" />
                        {formatPhone(m.phone)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </Section>

      {/* Bilder från installationer */}
      <Section
        eyebrow="En vanlig vecka"
        title={<>Färdiga batteriinstallationer hos våra kunder.</>}
        intro="Vi dokumenterar varje arbete vi släpper ifrån oss. När vi är klara ska elskåpet vara snyggare än när vi kom."
        className="!py-16 md:!py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            "Easyway 23 kWh inomhus, Bromma",
            "Easyway-installation, Vaxholm",
            "SAJ HS3 + 14 paneler, Lidingö",
            "Emaldo Power Store 25,6 kWh, Saltsjöbaden",
          ].map((caption, i) => (
            <figure
              key={i}
              className="aspect-[4/5] rounded-2xl overflow-hidden border border-ink/10 bg-gradient-to-br from-cream to-bone relative"
            >
              <div className="absolute inset-0 bg-grain bg-grain-sm opacity-40" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-[12.5px] text-ink/75 leading-snug bg-gradient-to-t from-bone via-bone/85 to-transparent">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-[12.5px] text-ink/50 max-w-2xl leading-relaxed">
          Bilderna byts ut till riktiga foton från våra senaste
          installationer löpande. Vill du att din installation ska få vara
          med? Säg till.
        </p>
      </Section>

      {/* Tidslinje */}
      <Section
        eyebrow="Bolagsresan"
        title={<>Vår väg mot den kompletta energileverantören.</>}
        intro="Hur vi byggs år för år. Allt i tjänst av att förtjäna ditt förtroende."
        className="!py-16 md:!py-20"
      >
        <ol className="relative border-l-2 border-ink/10 ml-3 md:ml-6 space-y-10">
          {TIMELINE.map((step, i) => (
            <li key={i} className="pl-6 md:pl-10 relative">
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ring-4 ring-bone bg-indigo"
                aria-hidden
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                {step.year}
              </div>
              <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-display-tight leading-snug">
                {step.title}
              </h3>
              <p className="mt-3 max-w-2xl text-ink/70 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CTA-panel: Kom förbi */}
      <Section className="!py-16 md:!py-20">
        <BrandPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Kom förbi
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-tight">
                Vallgatan 9, Solna.
              </h3>
              <p className="mt-5 max-w-md text-ink/70 leading-relaxed">
                Säg till om du vill titta in. Vi öppnar gärna upp kontoret för
                en kopp kaffe och ett rakt samtal om vad du funderar på.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/kontakt" className="btn-primary justify-center">
                Se kontaktuppgifter <ArrowRight size={16} />
              </Link>
              <Link href="/offert" className="btn-ghost justify-center">
                Eller boka hembesök
              </Link>
            </div>
          </div>
        </BrandPanel>
      </Section>
    </>
  );
}

function FactRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/8 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-ink/55 shrink-0">{k}</dt>
      <dd className="text-ink/85 text-right">{v}</dd>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/15 bg-cream/60 px-2.5 py-1">
      {children}
    </span>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-bone p-5 md:p-7">
      <div className="font-display text-3xl md:text-4xl tracking-display-tight leading-none">
        {n}
      </div>
      <div className="mt-2 text-[12.5px] text-ink/60 leading-snug">
        {label}
      </div>
    </div>
  );
}

function Belief({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-cream/40 p-7 md:p-8">
      <div className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
        ÖVERTYGELSE {n}
      </div>
      <h3 className="mt-4 font-display text-2xl tracking-display-tight leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-ink/65 text-[14.5px] leading-relaxed">{body}</p>
    </div>
  );
}

function formatPhone(p: string): string {
  if (p.length === 10) {
    return `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6, 8)} ${p.slice(8)}`;
  }
  return p;
}

/** tel:-href som tål både "07x…" och redan internationellt "+46 …". */
function telHref(p: string): string {
  const digits = p.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+46${digits.replace(/^0/, "")}`;
}
