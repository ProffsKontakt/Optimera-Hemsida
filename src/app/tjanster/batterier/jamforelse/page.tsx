import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";
import {
  AnswerBox,
  Breadcrumbs,
  ComparisonTable,
  CtaBlock,
  FaqBlock,
  LastUpdated,
  RelatedPages,
} from "@/components/seo/aeo";
import { BatteryLineupLazy } from "@/components/3d/BatteryLineupLazy";

/**
 * Jämförelse av batterierna i vårt kärnsortiment. Allt tekniskt kommer från
 * tillverkarnas datablad (eller, för Enershare, återförsäljarnas datablad)
 * och står i källistan längst ned. Inga priser per märke – priset tas fram i
 * offerten utifrån huset.
 */
const PATH = "/tjanster/batterier/jamforelse";
const UPDATED = "2026-10-27";
const TITLE = "Bästa hembatteri 2026: Eway, SAJ HS3, Enershare och SigenStor jämförda";
const DESCRIPTION =
  "Vi jämför de fyra hembatterier vi installerar – kapacitet, modulstorlek, växelriktare, cellkemi, mått och vem varje batteri passar för.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} – Optimera Energi`, description: DESCRIPTION, url: PATH, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SOURCES = [
  { title: "UNIV7600 (H) – produktblad", publisher: "Eway Energy", url: "https://azlloxmrudplfsfajlqq.supabase.co/storage/v1/object/public/product-images/documents/1f8c6dd3-95b8-4607-b02b-8ee1cf47045a.pdf" },
  { title: "HS3 Three Phase All-in-One (HS3-5-12K-T2) – datablad", publisher: "SAJ", url: "https://azlloxmrudplfsfajlqq.supabase.co/storage/v1/object/public/product-images/docs/wp-migrering/2026/03/HS3-5-12K-T2_datasheet_en_North_EU-1.pdf" },
  { title: "Battery Core – High Voltage Stack Battery", publisher: "Enershare", url: "https://azlloxmrudplfsfajlqq.supabase.co/storage/v1/object/public/product-images/docs/wp-migrering/2025/08/Enershare-Battery-core-2508.pdf" },
  { title: "SigenStor BAT 6.0/10.0 – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/916/" },
  { title: "SigenStor EC (Energy Controller) – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/604/" },
  { title: "Brandcellsindelning – PBL kunskapsbanken", publisher: "Boverket", url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/" },
];

const FAQ = [
  {
    q: "Vilket hembatteri är bäst 2026?",
    a: "Det finns inget batteri som är bäst för alla. Eway ger mycket kapacitet per modul och fri styrning, SAJ HS3 är ett tunt allt-i-ett med inbyggd växelriktare för 10–20 kWh, Enershare byggs ut i små steg om 3,2 kWh och SigenStor är ett allt-i-ett med inbyggd växelriktare upp till 54 kWh per stack. Vilket som passar beror på hur mycket kapacitet huset behöver, om du redan har en växelriktare och var batteriet ska stå.",
  },
  {
    q: "Vad är skillnaden mellan inbyggd och extern växelriktare?",
    a: "SAJ HS3 och SigenStor har växelriktaren inbyggd överst i stacken, så solceller och batteri styrs av samma enhet och allt sitter på ett ställe. Eway och Enershare kopplas till en separat hybridväxelriktare – hos oss Solis S6 eller Solinteg – vilket ger större frihet att välja växelriktare och styrning.",
  },
  {
    q: "Kan jag bygga ut batteriet senare?",
    a: "Ja, alla fyra är modulära. Eway byggs ut med moduler på 7,68 kWh upp till åtta per stapel, Enershare med moduler på 3,2 kWh upp till åtta per torn och SigenStor med moduler på 9 kWh upp till sex per stack. SAJ HS3 tar en till tre moduler på 5 kWh per stack, och 20 kWh byggs med en separat stack för den fjärde modulen. Fråga oss om hur länge tillverkaren säljer kompatibla moduler innan du räknar med en utbyggnad långt fram.",
  },
  {
    q: "Behöver batteriet stå i en egen brandcell?",
    a: "Batterier på sammanlagt mer än 20 kWh i samma utrymme ska enligt Boverkets regler som utgångspunkt stå i en egen brandcell. Gränsen gäller summan i utrymmet, inte varje stack. Under 20 kWh gäller tillverkarens anvisningar. Vi går igenom placeringen vid hembesöket.",
  },
  {
    q: "Hur stort batteri behöver jag?",
    a: "Vår tumregel är årsförbrukningen i kWh delad med 200–275, ungefär så många dygn per år som elen är dyr och batteriet gör full nytta. En villa som använder 15 000 kWh per år landar då på cirka 55–75 kWh. Andra bedömare varnar för att överdimensionera, så vi loggar din timförbrukning innan vi föreslår storlek.",
  },
  {
    q: "Vilken cellkemi har batterierna?",
    a: "Alla fyra använder LFP, litiumjärnfosfat. LFP tål många laddcykler och har lägre brandrisk än många andra litiumkemier, men samma placeringsregler gäller som för andra litiumjonbatterier.",
  },
];

export default function BatteryComparisonPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          url: PATH,
          datePublished: UPDATED,
          dateModified: UPDATED,
          sources: SOURCES,
          keywords: [
            "bästa hembatteri 2026",
            "jämför hembatterier",
            "Eway batteri",
            "Easyway batteri",
            "SAJ HS3",
            "Enershare Energy Core",
            "Sigenergy SigenStor",
            "solcellsbatteri jämförelse",
          ],
          articleSection: "Batterier",
        })}
      />

      <section className="container-edge pt-12 md:pt-20 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Batterier", href: "/tjanster/batterier" },
            { name: "Jämförelse", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Batteri · Jämförelse</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.12]">
            Fyra hembatterier,{" "}
            <span className="italic font-serif text-indigo">jämförda.</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
            Eway, SAJ HS3, Enershare och Sigenergy SigenStor är batterierna vi
            installerar oftast. Här är skillnaderna som spelar roll när du
            väljer: kapacitet, hur de byggs ut, växelriktaren och var de får
            plats.
          </p>
          <div className="mt-6">
            <LastUpdated date={UPDATED} label="Uppdaterad" />
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <AnswerBox question="Vilket hembatteri ska jag välja?">
          <p>
            <strong>
              Välj efter hur mycket kapacitet huset behöver, om du redan har en
              växelriktare och var batteriet ska stå – inte efter märket.
            </strong>{" "}
            Eway ger mycket kapacitet per modul och fri styrning via en extern
            växelriktare. SAJ HS3 är ett tunt allt-i-ett med inbyggd
            växelriktare för 10–20 kWh. Enershare byggs ut i små steg om
            3,2 kWh upp till 25,6 kWh per torn. SigenStor är ett allt-i-ett med
            inbyggd växelriktare upp till 54 kWh per stack. Alla fyra har
            LFP-celler.
          </p>
        </AnswerBox>
      </Section>

      <Section
        eyebrow="Så stora är de"
        title={<>Sida vid sida, vid cirka 20 kWh.</>}
        intro="Ritade i samma skala efter tillverkarnas mått där de finns och produktbilderna i övrigt. Dra för att vrida."
      >
        <div className="relative aspect-[16/10] md:aspect-[16/8] rounded-[28px] border border-ink/10 overflow-hidden bg-cream">
          <BatteryLineupLazy />
        </div>
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["Eway", "23,04 kWh", "3 moduler"],
            ["SAJ HS3", "20 kWh", "3 + 1 moduler"],
            ["Enershare", "19,2 kWh", "6 moduler"],
            ["SigenStor", "18 kWh", "2 moduler"],
          ].map(([n, k, m]) => (
            <li key={n} className="rounded-2xl border border-ink/10 bg-bone px-4 py-3">
              <div className="font-display text-lg tracking-display-tight">{n}</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                {k} · {m}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-ink/55">
          Från vänster till höger i bilden. Höjderna är ungefärliga.
        </p>
      </Section>

      <Section eyebrow="Jämförelse" title={<>Fakta, märke för märke.</>}>
        <ComparisonTable
          columns={["Batteri", "Kapacitet", "Modul", "Växelriktare", "Cellkemi", "Cykler", "Mått"]}
          rows={[
            {
              label: "Eway (Easyway)",
              cells: [
                "15,36–61,44 kWh per stapel",
                "7,68 kWh, 2–8 per stapel",
                "Extern: Solis S6 eller Solinteg",
                "LFP",
                "≥ 8 000",
                "660 × 450 mm; 25 cm + 14,2 cm per modul (8 moduler: 138,6 cm)",
              ],
            },
            {
              label: "SAJ HS3",
              cells: [
                "10, 15 eller 20 kWh",
                "5 kWh, 1–3 per stack – 20 kWh blir två stackar",
                "Inbyggd, 12 kW",
                "LFP",
                "Anges inte i produktbladet",
                "695 × 170 mm; 10 kWh 140 cm, 15 kWh 177 cm",
              ],
            },
            {
              label: "Enershare Energy Core",
              cells: [
                "9,6–25,6 kWh per torn, fler torn parallellt",
                "3,2 kWh, 3–8 per torn",
                "Extern: Solis S6 eller Solinteg",
                "LFP, högspänning",
                "Anges inte i produktbladet",
                "650 × 260 mm; 3 moduler 80 cm, 8 moduler 167,5 cm",
              ],
            },
            {
              label: "Sigenergy SigenStor",
              cells: [
                "9–54 kWh per stack",
                "9 kWh, 1–6 per stack",
                "Inbyggd (Energy Controller)",
                "LFP",
                "10 000",
                "Modul 767 × 270 × 265 mm, Energy Controller 700 × 300 × 260 mm",
              ],
            },
          ]}
          caption="Jämförelse av fyra hembatterier: kapacitet, modulstorlek, växelriktare, cellkemi, cykellivslängd och mått."
          footnote="Mått och cykeltal enligt tillverkarnas produktblad (B × D, och höjd för hela stacken). Cykeltalen gäller under tillverkarnas testvillkor. Garantivillkoren för varje batteri står i offerten."
        />
      </Section>

      <Section eyebrow="Vilket passar dig?" title={<>Fyra batterier, fyra olika styrkor.</>}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              t: "Eway",
              k: "Mycket kapacitet, fri styrning",
              b: "Välj Eway om du vill ha mycket kWh per modul och vill kunna välja växelriktare och styrsystem själv – Solis, GoodWe, Growatt och Solinteg fungerar enligt tillverkaren. Moduler på 7,68 kWh gör att även stora batterier ryms i en stapel, upp till 61,44 kWh, och modulerna har inbyggt brandsläckningssystem.",
              href: "/tjanster/batterier/easyway",
              link: "Därför rekommenderar vi ofta Eway",
            },
            {
              t: "SAJ HS3",
              k: "Tunt allt-i-ett",
              b: "Välj SAJ HS3 om du vill ha växelriktare och batteri i en enhet och behöver 10–20 kWh. Bara 170 mm djup, så den passar mot en vägg där utrymmet är trångt. SAJ anger också en inbyggd laddmodul för elbil på 11 kW.",
            },
            {
              t: "Enershare",
              k: "Bygg ut i små steg",
              b: "Välj Enershare om du vill börja mindre och bygga ut i steg om 3,2 kWh. Ett torn rymmer upp till 25,6 kWh, och flera torn kan kopplas parallellt. Kopplas till Solis eller Solinteg.",
            },
            {
              t: "SigenStor",
              k: "Allt-i-ett upp till 54 kWh",
              b: "Välj SigenStor om du vill ha ett system med inbyggd växelriktare och stor kapacitet i en stack. Modulerna är på 9 kWh, och Sigenergy anger 10 000 laddcykler och 100 % urladdningsdjup.",
            },
          ].map((c) => (
            <li key={c.t} className="rounded-3xl border border-ink/10 bg-bone p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">{c.k}</div>
              <h3 className="mt-3 font-display text-2xl tracking-display-tight">{c.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{c.b}</p>
              {c.href && (
                <Link href={c.href} className="mt-4 inline-flex items-center gap-2 text-[14.5px] text-indigo hover:underline underline-offset-2">
                  {c.link} <ArrowRight size={15} />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-ink/55">
          Vi är märkesoberoende och säljer även bland annat Sungrow och Growatt.
          Passar ett annat batteri ditt hus bättre säger vi det.
        </p>
      </Section>

      <Section eyebrow="Vanliga frågor" title={<>Frågor om att välja batteri.</>}>
        <FaqBlock items={FAQ} />
      </Section>

      <Section eyebrow="Källor" title={<>Här kommer uppgifterna ifrån.</>}>
        <ul className="max-w-3xl space-y-2 text-[14.5px] text-ink/70">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-indigo underline underline-offset-2">
                {s.title}
              </a>{" "}
              – {s.publisher}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <RelatedPages
          links={[
            { href: "/solcellsbatteri", label: "Solcellsbatteri – pris, storlek och lönsamhet", desc: "Allt om batteri till solceller på en sida." },
            { href: "/tjanster/batterier/easyway", label: "Varför vi ofta rekommenderar Eway", desc: "Hårdvara och styrning, var för sig." },
            { href: "/batteriskolan", label: "Batteriskolan", desc: "Hembatteriets koncept förklarade ett i taget." },
            { href: "/kalkylator", label: "Kalkylatorn", desc: "Bygg sol, batteri och laddbox i 3D." },
          ]}
        />
        <CtaBlock
          className="mt-10"
          title="Vi hjälper dig välja rätt batteri för ditt hus."
          primaryHref="/offert?tjanst=batterier"
        />
      </Section>
    </>
  );
}
