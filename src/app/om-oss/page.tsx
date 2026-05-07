import Link from "next/link";
import { Section } from "@/components/site/Section";
import { HousecallStrip } from "@/components/home/HousecallStrip";

export const metadata = {
  title: "Om oss",
  description:
    "Familjär service, kompromisslös ingenjörskonst. Möt teamet bakom Optimera.",
};

const team = [
  {
    name: "Petter Lindqvist",
    role: "Grundare · Auktoriserad elinstallatör",
    bio:
      "13 år som driftsättare på SolarEdge och Vattenfall. Tröttnade på offerter med dolda påslag och startade istället en firma där priset på offerten är priset på fakturan.",
    color: "from-[#3F5236] to-[#1A1A17]",
  },
  {
    name: "Ronja Eklund",
    role: "VD · Energiingenjör",
    bio:
      "Civilingenjör från KTH med inriktning energisystem. Bygger energistudien som följer dig genom hela din installation och 25 år framåt.",
    color: "from-[#E9B949] to-[#B86F3C]",
  },
  {
    name: "Albin Norén",
    role: "Förste montör · Tak­specialist",
    bio:
      "Lärling i 4:e generation. Vet exakt var infästningarna ska sitta – och bakar dessutom kanelbullarna som följer med på hembesöken.",
    color: "from-[#0a3a4e] to-[#0E0E0C]",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-4xl">
          <div className="eyebrow">Om Optimera</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[96px] tracking-display-tight leading-[0.95]">
            En elfirma som
            <br />
            <span className="italic font-serif text-indigo">tar av sig skorna.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-ink/70 text-xl leading-relaxed">
            Vi grundades 2026 på en idé så enkel att den nästan är pinsam: att
            den första elfirman som installerar hela energiomställningen under
            ett tak också borde vara den firman du vill bjuda in i ditt eget
            tak. Med fika. Och allt.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Vad vi tror på"
        title={
          <>
            Vad vi gör
            <br />
            <span className="italic font-serif">annorlunda.</span>
          </>
        }
        intro="Vi har sett branschen från insidan, och valt att bygga ett bolag på det vi själva saknat hos andra. Fyra principer som styr varje hembesök, offert och installation."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Belief
            n="01"
            title="Genuinitet, vi säger nej när vi måste"
            body="Vi finns inte för att sälja paket. Bra rådgivning är inte alltid bekväm rådgivning. När vi tycker att du borde vänta, dimensionera mindre, eller satsa på värmepump istället för fler paneler, då säger vi det. Det är därför vi finns."
          />
          <Belief
            n="02"
            title="Förståelse innan lösning"
            body="Innan vi pratar lösning vill vi förstå er situation. Vi räknar på er förbrukning, kartlägger ert hus, och ser om lösningen passar er. Först då lägger vi ett konkret förslag, med en klar förklaring av varför andra alternativ inte når lika långt."
          />
          <Belief
            n="03"
            title="Hand-plockat sortiment"
            body="Vi kan installera vilket märke som helst. Men vi har valt det vi säljer efter hundratals tester. Inte det dyraste. Inte det billigaste. Det som ger mest värde för pengarna utan att tumma på 25-årsperspektivet."
          />
          <Belief
            n="04"
            title="Erfarenhet från branschens bästa"
            body="En kompetent skara elektriker, projektörer, ekonomer och säljare med rötter i Sveriges mest välrenommerade bolag inom solenergi, batterilager och el. Vi tar med oss de insikter som avgör skillnaden mellan en bra och en utmärkt installation. Resultatet är ett enkelt löfte: våra kunder ska vara branschens nöjdaste."
          />
        </div>
      </Section>

      <Section eyebrow="Familjen" title={<>Tre människor som bor i ditt elskåp.</>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((m) => (
            <article
              key={m.name}
              className="rounded-3xl border border-ink/10 overflow-hidden bg-bone"
            >
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${m.color} relative`}
              >
                <div className="absolute inset-0 mix-blend-overlay opacity-25 bg-grain bg-grain-sm" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-bone">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone/70">
                    {m.role}
                  </div>
                  <div className="font-display text-2xl tracking-display-tight mt-1">
                    {m.name}
                  </div>
                </div>
              </div>
              <div className="p-7">
                <p className="text-ink/70 text-[14.5px] leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Bakom kulisserna"
        title={<>En vanlig vecka hos oss.</>}
        intro="Vi dokumenterar riktigt arbete från riktiga hem. Här är teamet i full gång."
      >
        <HousecallStrip />
      </Section>

      <Section eyebrow="Hur vi byggs" title={<>Vår bana framåt.</>}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Roadmap
            year="2026"
            title="Stockholm – rotsystemet"
            body="Vi öppnar med eget montageteam i Hammarby Sjöstad. 80 hembesök under första halvåret."
          />
          <Roadmap
            year="2027"
            title="Mälardalen"
            body="Vi expanderar till Uppsala, Västerås och Eskilstuna med rullande servicebilar."
          />
          <Roadmap
            year="2028"
            title="Egen energihandlare"
            body="Vi blir balansansvarig partner och ger våra kunder spotpris utan påslag."
          />
          <Roadmap
            year="2030"
            title="Norrland"
            body="Bergvärme + vindkomplement i hela Norrland. Egen utbildningsskola för installatörer."
          />
        </div>
      </Section>

      <Section>
        <div className="rounded-[28px] bg-ink text-bone p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
                Kom förbi
              </div>
              <h3 className="mt-4 font-display text-4xl md:text-6xl tracking-display-tight leading-tight">
                Hammarby Sjöstad – fika på fredagar.
              </h3>
              <p className="mt-6 max-w-md text-bone/70 leading-relaxed">
                Vi har öppet hus varje fredag mellan 14–17. Inga bokningar,
                bara dyk in – det finns alltid kaffe.
              </p>
            </div>
            <div className="font-mono text-[13px] text-bone/75 leading-relaxed space-y-1">
              <div>Heliosgatan 26</div>
              <div>120 30 Stockholm</div>
              <div className="pt-3">hej@optimeraenergi.se</div>
              <div>+46 (0)8 123 45 67</div>
              <div className="pt-6">
                <Link
                  href="/offert"
                  className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 text-ink hover:bg-sun-deep transition"
                >
                  Boka hembesök
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Belief({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-cream/70 p-8">
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

function Roadmap({
  year,
  title,
  body,
}: {
  year: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-bone p-7">
      <div className="font-display text-4xl tracking-display-tight">{year}</div>
      <h4 className="mt-3 font-display text-xl tracking-display-tight">
        {title}
      </h4>
      <p className="mt-3 text-ink/65 text-[14px] leading-relaxed">{body}</p>
    </div>
  );
}
