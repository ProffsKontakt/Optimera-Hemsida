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
const UPDATED = "2026-10-31";
const TITLE = "Bästa hembatteri 2026: Eway, SAJ HS3, Enershare, SigenStor och Fox ESS jämförda";
const DESCRIPTION =
  "Vi jämför de fem hembatterier vi installerar – kapacitet, modulstorlek, växelriktare, cellkemi, mått och vem varje batteri passar för.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} – Optimera Energi`, description: DESCRIPTION, url: PATH, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SOURCES = [
  { title: "UNIV7600 (H) – produktblad", publisher: "Eway Energy", url: "https://optimeraenergi.se/produktblad/eway-univ7600.pdf" },
  { title: "HS3 Three Phase All-in-One (HS3-5-12K-T2) – datablad", publisher: "SAJ", url: "https://optimeraenergi.se/produktblad/saj-hs3.pdf" },
  { title: "Battery Core – High Voltage Stack Battery", publisher: "Enershare", url: "https://optimeraenergi.se/produktblad/enershare-battery-core.pdf" },
  { title: "SigenStor BAT 6.0/10.0 – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/916/" },
  { title: "SigenStor EC (Energy Controller) – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/604/" },
  { title: "UNIV7600(HP) – installations- och användarmanual B4", publisher: "Eway Energy Technology (Wuhan)", url: "https://api.energygroup.se/wp-content/uploads/2026/02/Eway-UNIV7600HP-Installations-Anvandarmanual.pdf" },
  { title: "BU3-5.0-TV2-PRO – batterimodul, datablad V2.1", publisher: "SAJ", url: "https://www.saj-electric.com/hubfs/EU%20Doc/HS3%20Battery%20Module%20-EN-04.pdf" },
  { title: "HS3 – användarmanual (EU)", publisher: "SAJ", url: "https://sp.saj-electric.com/hubfs/Guides%20and%20Manuals/HS3/HS3-S/HS3-(3K-6K)-S2-(W%2cG)-(B%2cP)X_User_Manual_en_EU.pdf" },
  { title: "Limited Warranty for HS3 residential product (EU)", publisher: "SAJ", url: "https://saj-electric.com/hubfs/crm-properties-file-values/SAJ_Limited_Warranty_for_HS3_residential_product_EU.pdf" },
  { title: "CORE Series Battery Operating Manual V1.4", publisher: "Enershare", url: "https://api.energygroup.se/wp-content/uploads/2025/08/241214_CORE_Series_Battery_Operating_Manual_V1.4_EN.pdf" },
  { title: "Factory Limited Warranty for SigenStor (Europa)", publisher: "Sigenergy", url: "https://portal.segen.co.uk/reseller/docs/Sigenergy%20Sigenstor.pdf" },
  { title: "CQ7 Hochvolt-Batterie – Datenblatt (EU, V1.1)", publisher: "Fox ESS", url: "https://de.fox-ess.com/Public/Uploads/uploadfile/files/20260602/DECQ7DatasheetV1.120260602.pdf" },
  { title: "CQ Series User Manual V1.0.5", publisher: "Fox ESS", url: "https://www.fox-ess.com/Public/Uploads/uploadfile/files/20260828/ENCQ6CQ7ManualV1.0.5.pdf" },
  { title: "CQ Batterij Garantiebeleid V3.1", publisher: "Fox ESS", url: "https://nl.fox-ess.com/Public/Uploads/uploadfile/files/20260902/NLCQBATTERYWARRANTY20260818.pdf" },
  { title: "CQ7 Inverter Compatibility List", publisher: "Fox ESS", url: "https://au.fox-ess.com/Public/Uploads/uploadfile/files/20260721/CQ7InverterCompatibilityList20260528.pdf" },
  { title: "Brandcellsindelning – PBL kunskapsbanken", publisher: "Boverket", url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/" },
];

const FAQ = [
  {
    q: "Vilket hembatteri är bäst 2026?",
    a: "Det finns inget batteri som är bäst för alla. Eway ger mycket kapacitet per modul och fri styrning, SAJ HS3 är ett tunt allt-i-ett med inbyggd växelriktare för 10–20 kWh, Enershare byggs ut i små steg om 3,2 kWh, SigenStor är ett allt-i-ett med inbyggd växelriktare upp till 54 kWh per stack och Fox ESS CQ7 är premiumalternativet som rymmer upp till 98,28 kWh i en stack. Vilket som passar beror på hur mycket kapacitet huset behöver, om du redan har en växelriktare och var batteriet ska stå.",
  },
  {
    q: "Vad är skillnaden mellan inbyggd och extern växelriktare?",
    a: "SAJ HS3 och SigenStor har växelriktaren inbyggd överst i stacken, så solceller och batteri styrs av samma enhet och allt sitter på ett ställe. Eway och Enershare kopplas till en separat hybridväxelriktare – hos oss Solis S6 eller Solinteg – vilket ger större frihet att välja växelriktare och styrning. Fox ESS CQ7 kopplas till Fox ESS egen hybridväxelriktare, H3 Smart eller H3 Pro.",
  },
  {
    q: "Kan jag bygga ut batteriet senare?",
    a: "Ja, alla fem är modulära. Eway byggs ut med moduler på 7,68 kWh upp till åtta per stapel, Enershare med moduler på 3,2 kWh upp till åtta per torn, SigenStor med moduler på 9 kWh upp till sex per stack och Fox ESS CQ7 med moduler på 7,02 kWh upp till 14 per stack. SAJ HS3 tar en till tre moduler på 5 kWh per stack, och 20 kWh byggs med en separat stack för den fjärde modulen. Fråga oss om hur länge tillverkaren säljer kompatibla moduler innan du räknar med en utbyggnad långt fram.",
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
    q: "Vilken garanti har batterierna?",
    a: "Alla fem har 10 års garanti från tillverkaren, men villkoren skiljer sig. Fox ESS och Sigenergy garanterar minst 70 % av kapaciteten eller en viss genomströmning i kWh, SAJ garanterar 60 % eller 3,06 MWh per kWh, och Eway och Enershare anger 10 år utan att publicera kapacitetsvillkor i de dokument vi hittat. SAJ kortar garantin till 5,5 år om batteriet inte är uppkopplat, och Sigenergy till 5 år om systemet är offline mer än ett år. Exakta villkor står i offerten.",
  },
  {
    q: "Vad är skillnaden mellan högspänningsbatteri och batteri med optimerare?",
    a: "Eway, Enershare och Fox ESS kopplar modulerna i serie så att stacken ger flera hundra volt direkt till växelriktaren. SAJ HS3 och SigenStor använder lågspänningsmoduler som var och en har en DC/DC-omvandlare som lyfter spänningen, och modulerna parallellkopplas. Serielösningen har färre omvandlingssteg, optimerarna gör att moduler kan blandas och styras var för sig.",
  },
  {
    q: "Vilken cellkemi har batterierna?",
    a: "Alla fem använder LFP, litiumjärnfosfat. LFP tål många laddcykler och har lägre brandrisk än många andra litiumkemier, men samma placeringsregler gäller som för andra litiumjonbatterier.",
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
            "Fox ESS CQ7",
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
            Fem hembatterier,{" "}
            <span className="italic font-serif text-indigo">jämförda.</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
            Eway, SAJ HS3, Enershare, Sigenergy SigenStor och Fox ESS CQ7 är
            batterierna vi installerar oftast. Här är skillnaderna som spelar roll när du
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
            inbyggd växelriktare upp till 54 kWh per stack. Fox ESS CQ7 är
            premiumalternativet: upp till 98,28 kWh i en stack och klassad för
            att stå utomhus. Alla fem har LFP-celler.
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
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            ["Eway", "23,04 kWh", "3 moduler"],
            ["SAJ HS3", "20 kWh", "3 + 1 moduler"],
            ["Enershare", "19,2 kWh", "6 moduler"],
            ["SigenStor", "18 kWh", "2 moduler"],
            ["Fox ESS CQ7", "21,06 kWh", "3 moduler"],
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
            {
              label: "Fox ESS CQ7",
              cells: [
                "14,04–98,28 kWh i en stack",
                "7,02 kWh, 2–14 per stack (en master och slavmoduler)",
                "Extern: Fox ESS H3 Smart eller H3 Pro",
                "LFP, högspänning",
                "Anges inte i produktbladet",
                "660 × 360 mm; 2 moduler 42 cm, sedan 15,5 cm per modul (14 moduler: 228 cm)",
              ],
            },
          ]}
          caption="Jämförelse av fem hembatterier: kapacitet, modulstorlek, växelriktare, cellkemi, cykellivslängd och mått."
          footnote="Mått och cykeltal enligt tillverkarnas produktblad (B × D, och höjd för hela stacken). Cykeltalen gäller under tillverkarnas testvillkor. Garantivillkoren för varje batteri står i offerten."
        />
      </Section>

      <Section
        eyebrow="Så är de byggda"
        title={<>Högspänning i serie – eller lågspänning med optimerare.</>}
        intro="Alla fem har LFP-celler, men de är kopplade på två olika sätt. Eway, Enershare och Fox ESS kopplar modulerna i serie till en hög likspänning som växelriktaren använder direkt. SAJ och SigenStor bygger på lågspänningsmoduler som var och en har en DC/DC-omvandlare (optimerare) som lyfter spänningen; modulerna parallellkopplas och kan blandas i ålder och storlek. Uppgifterna kommer från tillverkarnas manualer och garantivillkor."
      >
        <ComparisonTable
          columns={["Batteri", "Modul", "Stack", "DC/DC-omvandlare", "Verkningsgrad (batteri)", "Garanti"]}
          rows={[
            {
              label: "Eway (Easyway)",
              cells: [
                "24 celler i serie, 76,8 V, 7,68 kWh",
                "2–8 moduler i serie: 153,6–614,4 V nominellt, styrbox 120–750 V",
                "Nej – äkta högspänning i serie",
                "Anges inte",
                "10 år enligt manualen. ≥ 8 000 cykler (0,3C, 25 °C, 30–90 % laddning, till 70 %)",
              ],
            },
            {
              label: "SAJ HS3 (BU3-5.0)",
              cells: [
                "16 prismatiska celler i serie (≈ 51 V), 5,0 kWh varav 4,8 användbart",
                "Modulerna parallellkopplas; optimeraren ger 380–500 V (450 V nominellt)",
                "Ja – en optimerare i varje modul",
                "Anges inte (växelriktaren max 98,0 %)",
                "10 år, 60 % av nominell energi eller 3,06 MWh per kWh. Utan internet bara 5,5 år",
              ],
            },
            {
              label: "Enershare Energy Core",
              cells: [
                "64 V, 3,2 kWh",
                "3–8 moduler i serie: 192–512 V nominellt, BMS 120–600 V",
                "Nej – tillverkaren anger \"No DC/DC\"",
                "≥ 96 %",
                "10 år enligt databladet",
              ],
            },
            {
              label: "Sigenergy SigenStor (BAT 10.0)",
              cells: [
                "Lågspänningsmodul med 314 Ah-celler, 9 kWh; garantivillkorens testspänningar ligger på 22,5–32,85 V",
                "Modulerna parallellkopplas; optimeraren ger 300–600 V (enfas) eller 600–900 V (trefas)",
                "Ja – \"battery optimizer inside\" i varje modul",
                "Anges inte (växelriktaren max 98,0–98,4 %)",
                "10 år, ≥ 70 % eller 26,68 MWh genomströmning. 5 år om systemet är offline mer än ett år",
              ],
            },
            {
              label: "Fox ESS CQ7",
              cells: [
                "18 prismatiska celler i serie, 57,6 V, 7,02 kWh",
                "2–14 moduler i serie: 115–806 V nominellt (104–920 V)",
                "Nej – äkta högspänning i serie",
                "> 95 % (25 °C, 0,3C)",
                "10 år, ≥ 70 % eller 26,9 MWh per modul. Kräver registrering. ≥ 6 000 cykler till 70 %",
              ],
            },
          ]}
          caption="Uppbyggnad av fem hembatterier: celler per modul, stackspänning, DC/DC-omvandlare, verkningsgrad och tillverkarens garanti."
          footnote="Enligt tillverkarnas manualer, datablad och garantivillkor, kontrollerat 31 oktober 2026. Där tillverkaren inte anger batteriets egen verkningsgrad står det så – siffran för växelriktaren säger inget om förlusterna i batteriet."
        />
        <div className="mt-6 max-w-3xl space-y-3 text-[14.5px] leading-relaxed text-ink/70">
          <p>
            <strong>Vad skillnaden betyder.</strong> Varje DC/DC-omvandling är ett
            steg till där energi går förlorad som värme, både vid laddning och
            urladdning. Enershare marknadsför sin serielösning just med
            &quot;No DC/DC, high efficiency&quot;, och Fox ESS anger över 95 %
            verkningsgrad för batteriet. SAJ och Sigenergy anger ingen
            verkningsgrad för själva batteriet, så där går det inte att jämföra
            med siffror. Fördelen med optimerarna är att moduler kan blandas i
            ålder och storlek och styras var för sig.
          </p>
          <p>
            Mer om cellkemin i{" "}
            <Link href="/batteriskolan/lfp-nmc-och-natriumjon" className="text-indigo underline underline-offset-2">LFP eller NMC</Link>, och om
            förlusterna i{" "}
            <Link href="/batteriskolan/verkningsgrad" className="text-indigo underline underline-offset-2">verkningsgrad</Link>.
            Hur våra batterier står sig mot Homevolt, Tesla Powerwall 3, Huawei,
            BYD och de andra i tekniken finns i{" "}
            <Link href="/tjanster/batterier/teknisk-jamforelse" className="text-indigo underline underline-offset-2">den tekniska jämförelsen</Link>.
          </p>
        </div>
      </Section>

      <Section eyebrow="Vilket passar dig?" title={<>Fem batterier, fem olika styrkor.</>}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              t: "Eway",
              k: "Mycket kapacitet, fri styrning",
              b: "Välj Eway om du vill ha mycket kWh per modul och vill kunna välja växelriktare och styrsystem själv – Solis, GoodWe, Growatt och Solinteg fungerar enligt tillverkaren. Moduler på 7,68 kWh gör att även stora batterier ryms i en stapel, upp till 61,44 kWh, och produktbladet anger inbyggt brandsläckningssystem (aerosol).",
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
            {
              t: "Fox ESS CQ7",
              k: "Premium, upp till 98 kWh",
              b: "Välj Fox ESS CQ7 om du vill ha ett premiumbatteri som kan växa med huset. Modulerna är på 7,02 kWh och upp till 14 ryms i en stack, alltså 98,28 kWh. Batteriet är klassat IP65 och får stå både inomhus och utomhus, och det kopplas till Fox ESS egen hybridväxelriktare H3 Smart eller H3 Pro.",
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
            { href: "/tjanster/batterier/teknisk-jamforelse", label: "Så är hembatterierna byggda", desc: "Våra fem mot Homevolt, Powerwall 3, Huawei, BYD med flera." },
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
