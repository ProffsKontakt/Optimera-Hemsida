import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";

export const metadata = {
  title: "Om oss – Vision, team och bolagsresan",
  description:
    "Optimera Energi Sverige AB grundades på enkel ärlighet. Möt teamet bakom installationerna och läs om vägen mot den kompletta energileverantören.",
  alternates: { canonical: "/om-oss" },
  openGraph: {
    title: "Om oss – Optimera Energi",
    description:
      "Vision, team och vägen mot den kompletta energileverantören.",
    url: "/om-oss",
    type: "website",
  },
};

const TEAM = [
  {
    name: "Viktor Tiberg",
    role: "Grundare och VD",
    email: "viktor@optimeraenergi.se",
    phone: "0763053732",
    color: "from-[#3648C3] to-[#0E0E0C]",
    bio:
      "Driver bolaget framåt och håller siffrorna ärliga. Tror att det bästa kvittot på en bra installation är när kunden ringer för att tipsa grannen.",
  },
  {
    name: "Julian Nordgren",
    role: "Grundare och Operativ Chef",
    email: "julian@optimeraenergi.se",
    phone: "0769470058",
    color: "from-[#FFDD6C] to-[#B86F3C]",
    bio:
      "Operativ ryggrad. Plockar upp telefonen, dimensionerar systemet, mejlar din offert och dyker upp vid första installationen.",
  },
  {
    name: "Moltas Roslund",
    role: "Sales Operations",
    email: "moltas@optimeraenergi.se",
    phone: "0705340154",
    color: "from-[#0a3a4e] to-[#1A1A17]",
    bio:
      "Bygger säljprocessen så ingen kund glöms bort. Är personen som ringer dig dagen innan installationen och säger exakt vilka som dyker upp.",
  },
];

const TIMELINE = [
  {
    year: "2026",
    title: "Vi grundades på rak ärlighet.",
    body:
      "Tre personer från branschens största bolag bestämde sig för att göra det vi själva saknade: en installatör som tar hand om kunden hela vägen.",
  },
  {
    year: "2026",
    title: "Eget montageteam i Stockholm.",
    body:
      "Inga underentreprenörer för det vi själva kan. När du ringer oss tre år efter installationen är det samma personer som svarar.",
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-4xl">
          <div className="eyebrow">Om Optimera Energi</div>
          <h1 className="mt-5 font-display text-[44px] md:text-[88px] tracking-display-tight leading-[0.95]">
            En elfirma som
            <br />
            <span className="italic font-serif text-indigo">
              tar hand om dig.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
            Optimera Energi Sverige AB grundades på en enkel idé: branschen
            behöver en installatör som faktiskt finns kvar dagen efter
            kontraktet är skrivet.
          </p>
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

      {/* Värderingar (kvar som tidigare) */}
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
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        title={<>Tre människor som svarar i telefonen.</>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEAM.map((m) => (
            <article
              key={m.email}
              className="rounded-3xl border border-ink/10 overflow-hidden bg-bone flex flex-col"
            >
              <div className={`aspect-[4/5] bg-gradient-to-br ${m.color} relative`}>
                <div className="absolute inset-0 mix-blend-overlay opacity-25 bg-grain bg-grain-sm" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-bone">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/75">
                    {m.role}
                  </div>
                  <div className="font-display text-2xl tracking-display-tight mt-1">
                    {m.name}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                <p className="text-ink/70 text-[14.5px] leading-relaxed">
                  {m.bio}
                </p>
                <div className="mt-auto pt-4 border-t border-ink/10 space-y-2 text-[13.5px]">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-2 text-ink/70 hover:text-indigo transition break-all"
                  >
                    <Mail size={13} className="shrink-0" />
                    {m.email}
                  </a>
                  <a
                    href={`tel:+46${m.phone.replace(/^0/, "")}`}
                    className="flex items-center gap-2 text-ink/70 hover:text-indigo transition"
                  >
                    <Phone size={13} className="shrink-0" />
                    {formatPhone(m.phone)}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Bilder från installationer */}
      <Section
        eyebrow="En vanlig vecka"
        title={<>Färdiga batteriinstallationer hos våra kunder.</>}
        intro="Vi dokumenterar varje arbete vi släpper ifrån oss. När vi är klara ska elskåpet vara snyggare än när vi kom."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            "Pylontech-stack inomhus, Bromma",
            "Easyway-installation, Vaxholm",
            "SAJ HS3 + 14 paneler, Lidingö",
            "Enershare 25,6 kWh, Saltsjöbaden",
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

      {/* Tidslinje – Vår väg mot den kompletta energileverantören */}
      <Section
        eyebrow="Bolagsresan"
        title={<>Vår väg mot den kompletta energileverantören.</>}
        intro="Hur vi byggs år för år. Allt i tjänst av att förtjäna ditt förtroende."
      >
        <ol className="relative border-l-2 border-ink/10 ml-3 md:ml-6 space-y-10">
          {TIMELINE.map((step, i) => (
            <li key={i} className="pl-6 md:pl-10 relative">
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ring-4 ring-bone"
                style={{
                  background:
                    "linear-gradient(180deg, #3648C3 0%, #FFDD6C 100%)",
                }}
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
      <Section>
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
