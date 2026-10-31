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
import { seoTitle } from "@/lib/seo-title";

/**
 * Teknisk jämförelse av hembatterier: hur våra fem och konkurrenternas
 * batterier är byggda – cellkemi, spänning, DC/DC-omvandlare, verkningsgrad,
 * garanti och säkerhet. Varje uppgift kommer från tillverkarens datablad,
 * manual eller garantivillkor, från en myndighet eller forskningsinstitut,
 * eller – där tillverkaren inte publicerar uppgiften – från namngiven press.
 * Där ingen källa finns står det "anges inte". Kontrollerat 2026-10-31.
 */
const PATH = "/tjanster/batterier/teknisk-jamforelse";
const UPDATED = "2026-10-31";
const TITLE = "Hembatterier 2026: så är de byggda – cellkemi, spänning och verkningsgrad";
const DESCRIPTION =
  "Teknisk jämförelse av 16 hembatterier: Eway, SAJ HS3, Enershare, SigenStor och Fox ESS CQ7 mot Homevolt, Tesla Powerwall 3, Huawei, BYD, Sungrow, Growatt, Pixii, SolarEdge och sonnen. LFP eller NMC, högspänning i serie eller optimerare, verkningsgrad, garanti och säkerhet – med källor.";

export const metadata = {
  title: seoTitle(TITLE),
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} – Optimera Energi`, description: DESCRIPTION, url: PATH, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SOURCES = [
  // Våra batterier
  { title: "UNIV7600 (H) – produktblad", publisher: "Eway Energy", url: "https://optimeraenergi.se/produktblad/eway-univ7600.pdf" },
  { title: "UNIV7600(HP) – installations- och användarmanual B4", publisher: "Eway Energy Technology (Wuhan)", url: "https://api.energygroup.se/wp-content/uploads/2026/02/Eway-UNIV7600HP-Installations-Anvandarmanual.pdf" },
  { title: "HS3 Three Phase All-in-One – datablad", publisher: "SAJ", url: "https://optimeraenergi.se/produktblad/saj-hs3.pdf" },
  { title: "BU3-5.0-TV2-PRO – batterimodul, datablad V2.1", publisher: "SAJ", url: "https://www.saj-electric.com/hubfs/EU%20Doc/HS3%20Battery%20Module%20-EN-04.pdf" },
  { title: "HS3 – användarmanual (EU)", publisher: "SAJ", url: "https://sp.saj-electric.com/hubfs/Guides%20and%20Manuals/HS3/HS3-S/HS3-(3K-6K)-S2-(W%2cG)-(B%2cP)X_User_Manual_en_EU.pdf" },
  { title: "Limited Warranty for HS3 residential product (EU)", publisher: "SAJ", url: "https://saj-electric.com/hubfs/crm-properties-file-values/SAJ_Limited_Warranty_for_HS3_residential_product_EU.pdf" },
  { title: "Battery Core – datablad", publisher: "Enershare", url: "https://optimeraenergi.se/produktblad/enershare-battery-core.pdf" },
  { title: "CORE Series Battery Operating Manual V1.4", publisher: "Enershare", url: "https://api.energygroup.se/wp-content/uploads/2025/08/241214_CORE_Series_Battery_Operating_Manual_V1.4_EN.pdf" },
  { title: "SigenStor BAT 6.0/10.0 – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/916/" },
  { title: "Sigen Energy Controller – datablad", publisher: "Sigenergy", url: "https://b2b.aprilice.com/se_sv/mpattachment/file/download/id/604/" },
  { title: "Factory Limited Warranty for SigenStor (Europa)", publisher: "Sigenergy", url: "https://portal.segen.co.uk/reseller/docs/Sigenergy%20Sigenstor.pdf" },
  { title: "Factory Limited Warranty for SigenStor (AU/NZ, 2025-06-10)", publisher: "Sigenergy", url: "https://zelora.com.au/hubfs/Product%20Library/Batteries/SigEnergy/Warranty/Sigenergy_300625_LimitedWarrantyCombined.pdf" },
  { title: "CQ7 Hochvolt-Batterie – Datenblatt (EU, V1.1)", publisher: "Fox ESS", url: "https://de.fox-ess.com/Public/Uploads/uploadfile/files/20260602/DECQ7DatasheetV1.120260602.pdf" },
  { title: "CQ Series User Manual V1.0.5", publisher: "Fox ESS", url: "https://www.fox-ess.com/Public/Uploads/uploadfile/files/20260828/ENCQ6CQ7ManualV1.0.5.pdf" },
  { title: "CQ Batterij Garantiebeleid V3.1", publisher: "Fox ESS", url: "https://nl.fox-ess.com/Public/Uploads/uploadfile/files/20260902/NLCQBATTERYWARRANTY20260818.pdf" },
  // Konkurrenter
  { title: "Homevolt – produktsida", publisher: "Tibber", url: "https://tibber.com/se/homevolt" },
  { title: "Tibber och Polarium lanserar batteri för hemmabruk (2023-06-01)", publisher: "Realtid", url: "https://www.realtid.se/samhalle/tibber-och-polarium-lanserar-batteri-for-hemmabruk/" },
  { title: "Långtidstest: Tibber Homevolt (2025-03-26)", publisher: "M3", url: "https://www.m3.se/article/2557820/tibber-homevolt-hembatteri-test.html" },
  { title: "Powerwall 3 – datasheet (2026)", publisher: "Tesla", url: "https://energylibrary.tesla.com/docs/Public/EnergyStorage/Powerwall/3/Datasheet/en-uk/Powerwall-3-Datasheet-EN.pdf" },
  { title: "Powerwall Warranty – European Warranty Region, Rev 1.16 (2025-12-03)", publisher: "Tesla", url: "https://energylibrary.tesla.com/docs/Public/EnergyStorage/Powerwall/General/Warranty/en-emea/Powerwall-Warranty-EN.pdf" },
  { title: "LUNA2000-7/14/21-S1 – specifikationer", publisher: "Huawei", url: "https://solar.huawei.com/en/products/LUNA2000-7-14-21-S1/specs" },
  { title: "Battery-Box Premium HVS – datasheet V1.4", publisher: "BYD", url: "https://www.bydbatterybox.com/uploads/downloads/241212_Datasheet_Battery-Box%20HVS_V1.4_EN-675a34b4e7bfb.pdf" },
  { title: "Battery-Box Premium HVS & HVM – Limited Warranty Europe", publisher: "BYD", url: "https://www.bydbatterybox.com/uploads/downloads/BCU2.0_BYD%20Battery-Box%20Premium%20HVS&HVM%20Limited%20Warranty-Europe-EN-V1.0-67eb5bb39ed39.pdf" },
  { title: "SBR064–256 – datasheet V1.4", publisher: "Sungrow", url: "https://midsummer.ie/pdfs/en-ds-sbr064-096-sbr128-sbr160-sbr192-sbr224-sbr256-datasheet-v14-20230418.pdf" },
  { title: "SBH200–400 – datasheet V3", publisher: "Sungrow", url: "https://www.solarquotes.com.au/wp-content/uploads/2024/05/sungrow-sbh-datasheet.pdf" },
  { title: "APX HV Battery – datasheet (2024-05)", publisher: "Growatt", url: "https://solarproof.com.au/datasheets/battery_datasheet_APX_HV_Battery-S0_(MIN-XH)_Datasheet_EN_202405.pdf" },
  { title: "APX 5.0–30.0P-S2 – Benutzerhandbuch V1.0", publisher: "Growatt", url: "https://www.offgridtec.com/media/product_attachements/Growatt_APX%20HV%20Batteriesystem_Benutzerhandbuch.pdf" },
  { title: "Pixii Home – datasheet (2024-02-12)", publisher: "Pixii", url: "https://cdn.abicart.com/shop/ws7/129907/art11/205410211-a438da-Pixii-Home-datasheet_2024-02-12_Ver.2.0_Pixii_Home.www.amss.se.pdf" },
  { title: "Home Battery 400V – datasheet", publisher: "SolarEdge", url: "https://portal.segen.co.uk/reseller/docs/se-solaredge-home-battery-400v-datasheet-eng.pdf" },
  { title: "Home Battery (High Voltage) – Emergency Response Guide v2.1", publisher: "SolarEdge", url: "https://ressupply.com/documents/solaredge/Energy_Bank_MSDS.pdf" },
  { title: "sonnenBatterie 10 performance – datablad (maj 2024)", publisher: "sonnen", url: "https://media.sonnengroup.com/363aa7e7-ea1d-43ee-a24b-1b6bf33fb858-sv" },
  { title: "SMILE-G3-BAT-10.1P – datasheet", publisher: "Alpha ESS", url: "https://solarproof.com.au/datasheets/battery_datasheet_Datasheet_EN_SMILE-G3-BAT-10.1P_V01.08022023.pdf" },
  { title: "Force H1/H2 – datasheet", publisher: "Pylontech", url: "https://solarics.de/cdn/shop/files/Force-H1_Force-H2_DS_EN.pdf" },
  // Säkerhet och återkallelser
  { title: "Sigenergy Energy Controllers – voluntary recall notice", publisher: "Clean Energy Council (Australien)", url: "https://cleanenergycouncil.org.au/getmedia/5184a1e4-1492-4303-85ef-8be3034ce1dc/sigenergy-energy-controllers-voluntary-recall-cec-approved-models.pdf" },
  { title: "Sigenergy points to installation practices for product recall (2025-11-24)", publisher: "pv magazine Australia", url: "https://www.pv-magazine-australia.com/2025/11/24/sigenergy-points-to-installation-practices-for-product-recall/" },
  // Kemi och verkningsgrad
  { title: "Battery thermal runaway and fire", publisher: "RISE", url: "https://www.ri.se/en/energy-and-electrification/energy-storage/batteries/expertise/battery-thermal-runaway-and-fire" },
  { title: "Risk profile for Li-ion LFP batteries (2024-12-18)", publisher: "Ineris", url: "https://www.ineris.fr/sites/default/files/contribution/Documents/IDE03%20-%20Op%C3%A9ration%20D%20-%20Profil%20de%20risque%20des%20batteries%20LFP%20v1.pdf" },
  { title: "Schöberl m.fl.: Modeling the variability of thermal runaway behavior – NMC-811 and LFP, Journal of Power Sources 668 (2026)", publisher: "KIT / TUM", url: "https://publikationen.bibliothek.kit.edu/1000190474" },
  { title: "Stromspeicher-Inspektion 2025", publisher: "HTW Berlin", url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-Stromspeicher-Inspektion-2025.pdf" },
  { title: "Brandcellsindelning – PBL kunskapsbanken", publisher: "Boverket", url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/" },
];

const FAQ = [
  {
    q: "Vad är skillnaden mellan ett högspänningsbatteri och ett batteri med optimerare?",
    a: "I ett högspänningsbatteri kopplas modulerna i serie så att stacken ger flera hundra volt direkt till växelriktaren, utan någon omvandling i batteriet. Eway, Enershare, Fox ESS CQ7, BYD Battery-Box och Sungrow SBR/SBH är byggda så. I ett batteri med optimerare har varje modul en egen DC/DC-omvandlare som lyfter en låg modulspänning till det växelriktaren vill ha; modulerna parallellkopplas och kan blandas i ålder och storlek. SAJ HS3, Sigenergy SigenStor, Huawei LUNA2000 och Growatt APX är byggda så. HTW Berlin har mätt att de inbyggda omvandlarna kan sänka batteriets verkningsgrad kraftigt.",
  },
  {
    q: "Är Sigenergy SigenStor ett lågspänningsbatteri?",
    a: "Modulerna är lågspänning: Sigenergy beskriver dem som \"low voltage\" och garantivillkorens testspänningar ligger på 15–33 V. Varje modul har en inbyggd optimerare (\"battery optimizer inside\") som lyfter spänningen, och modulerna matar Energy Controller med 300–600 V på enfas eller 600–900 V på trefas. Sigenergy publicerar ingen verkningsgrad för själva batteriet.",
  },
  {
    q: "Vilka hembatterier har NMC-celler?",
    a: "Homevolt beskrivs som NMC i Realtid och M3; Tibber själva anger inte kemin på sina sidor. SolarEdge Home Battery 400V har celler med koboltoxid, mangandioxid och nickeloxid enligt SolarEdges räddningsguide, alltså en NMC-typ. Alla våra fem batterier och de flesta andra i jämförelsen har LFP-celler. Teslas eget datablad för Powerwall 3 anger ingen kemi.",
  },
  {
    q: "Är LFP säkrare än NMC?",
    a: "LFP är mer termiskt stabilt. Ineris anger ordningen LCO < NCA < NMC < LFP för termisk stabilitet och maxtemperaturer på 399 °C för LFP mot 835–998 °C för NMC vid termisk rusning, och forskare vid KIT och TUM bedömer att spridning mellan celler genom värmeledning är osannolik för LFP. RISE såg i sina tester att LFP-celler avger gas långsammare och i mindre mängd. Men LFP är inte riskfritt: Ineris mätte ungefär lika stor total värmeutveckling per Wh för båda kemierna, och LFP-röken kan ha högre andel vätefluorid. Därför gäller samma placeringsregler.",
  },
  {
    q: "Är Homevolt säkert, och har det brunnit?",
    a: "Vi hittade inga rapporter från MSB, Elsäkerhetsverket, räddningstjänster eller svensk och norsk press som namnger Homevolt i en brand, och ingen återkallelse. Homevolt beskrivs som NMC i press, och Tibber rekommenderar placering utomhus; inomhus bara under 20 kWh i ett ventilerat utrymme som inte är bostadsrum. Tibbers \"batteriblad\" är namnet på utbyggnadsmodulen, inte en uppgift om cellformat.",
  },
  {
    q: "Varför skiljer sig verkningsgraden mellan batterierna?",
    a: "Varje omvandlingssteg kostar energi. HTW Berlin mätte i sin test 2025 i snitt 95,7 % verkningsgrad för själva batteriet, men det sämsta systemet låg på 87,9 %, vilket HTW bland annat förklarar med de DC/DC-omvandlare som sitter inbyggda i batteriet. Teslas datablad visar samma sak: 97,5 % från solceller direkt till huset, men 89 % när elen går via batteriet. Av batterierna i jämförelsen anger Enershare och BYD minst 96 %, Fox ESS över 95 %, sonnen 95,9 % och SolarEdge över 94,5 %. Eway, SAJ, Sigenergy, Huawei, Sungrow och Growatt anger ingen verkningsgrad för batteriet.",
  },
  {
    q: "Vad betyder garantin i praktiken?",
    a: "Alla i jämförelsen har 10 års garanti, men villkoren skiljer sig. Fox ESS, Sigenergy och Tesla (i de länder som omfattas) garanterar 70 % av kapaciteten, Tesla 80 % i vissa länder, SAJ och BYD 60 %. De flesta sätter också ett tak i genomströmning, till exempel 26,9 MWh per Fox-modul eller 3,06 MWh per kWh för SAJ. Teslas garantidokument för Europa listar inte Sverige bland länderna. Eway, Enershare och Tibber anger 10 år utan att publicera kapacitetsvillkor i de dokument vi hittat.",
  },
  {
    q: "Vilket batteri rekommenderar Optimera Energi?",
    a: "Vill du ha högst verkningsgrad och enklast uppbyggnad rekommenderar vi ett högspänningsbatteri i serie: Eway för mycket kapacitet per modul, Fox ESS CQ7 för stora system som får stå utomhus och Enershare för små steg. SAJ HS3 och SigenStor väljer vi när kunden vill ha allt-i-ett med inbyggd växelriktare på liten yta, och vi säger då också att de bygger på optimerare. Vi är märkesoberoende, så passar ett annat batteri huset bättre säger vi det.",
  },
];

export default function TechnicalBatteryComparisonPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          url: PATH,
          type: "TechArticle",
          datePublished: UPDATED,
          dateModified: UPDATED,
          sources: SOURCES,
          keywords: [
            "högspänningsbatteri eller lågspänningsbatteri",
            "hembatteri LFP eller NMC",
            "Homevolt eller Eway",
            "Tesla Powerwall 3 eller Eway",
            "Huawei LUNA2000 eller Eway",
            "BYD Battery-Box eller SAJ HS3",
            "Sigenergy SigenStor nackdelar",
            "Fox ESS CQ7 eller Sigenergy",
            "hembatteri verkningsgrad",
            "bästa hembatteri 2026",
            "är Homevolt säkert",
          ],
          articleSection: "Batterier",
        })}
      />

      <section className="container-edge pt-12 md:pt-20 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Batterier", href: "/tjanster/batterier" },
            { name: "Jämförelse", href: "/tjanster/batterier/jamforelse" },
            { name: "Teknisk jämförelse", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Batteri · Teknisk jämförelse</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.12]">
            Så är hembatterierna{" "}
            <span className="italic font-serif text-indigo">byggda.</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
            Cellkemi, spänning, omvandlare, verkningsgrad, garanti och
            säkerhet för våra fem batterier och elva av konkurrenternas. Varje
            uppgift kommer från tillverkarens dokument, en myndighet eller ett
            forskningsinstitut; där tillverkaren inte publicerar uppgiften står
            det så.
          </p>
          <div className="mt-6">
            <LastUpdated date={UPDATED} label="Uppdaterad" />
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <AnswerBox question="Vad skiljer hembatterierna åt under skalet?">
          <p>
            <strong>
              Två saker avgör mer än märket: cellkemin och hur modulerna är
              kopplade. Nästan alla hembatterier som säljs i Sverige har
              LFP-celler; Homevolt och SolarEdge Home Battery 400V är
              NMC-typ. Eway, Enershare, Fox ESS CQ7, BYD och Sungrow kopplar
              modulerna i serie till högspänning utan omvandlare i batteriet.
              SAJ HS3, Sigenergy SigenStor, Huawei LUNA2000 och Growatt APX
              bygger på lågspänningsmoduler med en DC/DC-optimerare i varje
              modul.
            </strong>{" "}
            Optimerarna gör att moduler kan blandas, men varje omvandling
            kostar verkningsgrad: HTW Berlin har mätt system ner till 87,9 %
            och pekar på just de inbyggda omvandlarna.
          </p>
        </AnswerBox>
      </Section>

      <Section
        eyebrow="Tre sätt att bygga"
        title={<>Högspänning i serie, optimerare – eller 48 volt.</>}
        intro="Ett hembatteri är många celler på cirka 3,2 volt. Hur de kopplas ihop avgör hur många omvandlingssteg elen passerar på väg till huset."
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              t: "Högspänning i serie",
              k: "Eway · Enershare · Fox ESS CQ7 · BYD · Sungrow · Pylontech",
              b: "Modulerna kopplas i serie så att stacken ger 150–900 V likspänning direkt till hybridväxelriktaren. En styrenhet (BMS) övervakar hela strängen. Inga omvandlare i batteriet – Enershare skriver \"No DC/DC\" och anger minst 96 % verkningsgrad, BYD minst 96 %, Fox ESS över 95 %. Alla moduler i en stack måste vara lika och laddas som en enhet.",
            },
            {
              t: "Lågspänningsmoduler med optimerare",
              k: "SAJ HS3 · Sigenergy SigenStor · Huawei LUNA2000 · Growatt APX",
              b: "Varje modul är ett lågspänningspaket – SAJ 16 celler (≈ 51 V), Growatt 51,2 V, Sigenergy med testspänningar på 15–33 V – med en egen DC/DC-omvandlare som lyfter spänningen till 380–900 V. Modulerna parallellkopplas och kan blandas i ålder och storlek, och styras var för sig. Priset är ett omvandlingssteg till i varje modul; SAJ, Sigenergy, Huawei och Growatt publicerar ingen verkningsgrad för batteriet.",
            },
            {
              t: "48 volt eller inbyggd växelriktare",
              k: "Pixii Home · Tesla Powerwall 3 · Homevolt · sonnen · Alpha ESS",
              b: "Pixii Home arbetar på 48 V och kopplas till växelström via egna omvandlare. Tesla, Homevolt och sonnen har växelriktaren inbyggd i batteriet; Teslas expansionspaket arbetar på 52–92 V, och Tesla anger 89 % verkningsgrad från solceller via batteriet till huset mot 97,5 % direkt. Homevolt anger över 97 % \"utfallseffektivitet\" utan att beskriva uppbyggnaden.",
            },
          ].map((c) => (
            <li key={c.t} className="rounded-3xl border border-ink/10 bg-bone p-7">
              <h3 className="font-display text-2xl tracking-display-tight">{c.t}</h3>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">{c.k}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{c.b}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 max-w-3xl rounded-2xl border border-indigo/25 bg-indigo/[0.04] p-5 text-[14.5px] leading-relaxed text-ink/75">
          <strong>Vad mätningarna säger.</strong> HTW Berlin testar hembatterier
          varje år. I Stromspeicher-Inspektion 2025 låg batteriernas
          verkningsgrad i snitt på 95,7 %, men det sämsta systemet nådde bara
          87,9 %, vilket HTW bland annat förklarar med de DC/DC-omvandlare som
          sitter inbyggda i batteriet: utjämningen av spänningsskillnader ger
          extra omvandlingsförluster som kan sänka batteriets verkningsgrad
          kraftigt. Skillnaden mellan 96 och 88 % är ungefär 8 kWh förlorade
          per 100 kWh som passerar batteriet.
        </div>
      </Section>

      <Section
        eyebrow="Cellkemi"
        title={<>LFP eller NMC.</>}
        intro="Namnen kommer från katodmaterialet: litiumjärnfosfat respektive nickel, mangan och kobolt. Skillnaden syns mest i hur cellen beter sig när något går fel."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-ink/10 bg-bone p-7 text-[15px] leading-relaxed text-ink/75 space-y-3">
            <h3 className="font-display text-2xl tracking-display-tight">Vad forskningen säger</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Ineris</strong> (franska statens riskinstitut, 2024) rangordnar
                termisk stabilitet LCO &lt; NCA &lt; NMC &lt; LFP och anger
                maxtemperaturer vid termisk rusning på 399 °C för LFP mot 835–998 °C
                för NMC. Men LFP är &quot;inte i sig säkert&quot;: den totala
                värmeutvecklingen per Wh var ungefär lika (38,9 mot 39,2 kJ/Wh), och
                LFP-röken kan ha högre andel vätefluorid.
              </li>
              <li>
                <strong>KIT och TUM</strong> (Journal of Power Sources, 2026) bedömer att
                spridning av termisk rusning genom värmeledning mellan celler är
                osannolik med LFP, medan den för NMC-811 beror starkt på hur mycket
                massa cellen förlorar.
              </li>
              <li>
                <strong>RISE</strong> såg i släcktester att LFP-celler är betydligt mer
                motståndskraftiga, med långsammare gasutveckling och mindre total
                gasmängd än NCA, LCO och NMC.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-bone p-7 text-[15px] leading-relaxed text-ink/75 space-y-3">
            <h3 className="font-display text-2xl tracking-display-tight">Vilka batterier har vilken kemi</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>LFP enligt tillverkaren:</strong> Eway, SAJ HS3, Enershare,
                SigenStor, Fox ESS CQ7, Huawei LUNA2000, BYD Battery-Box (egna
                celler), Sungrow SBR/SBH (prismatiska), Growatt APX, Pixii Home,
                sonnenBatterie 10, Alpha ESS Smile-G3.
              </li>
              <li>
                <strong>NMC-typ:</strong> Homevolt beskrivs som NMC i Realtid och M3 –
                Tibber anger inte kemin på sina egna sidor. SolarEdge Home Battery
                400V innehåller koboltoxid, mangandioxid och nickeloxid enligt
                SolarEdges räddningsguide.
              </li>
              <li>
                <strong>Anges inte av tillverkaren:</strong> Tesla Powerwall 3 – Teslas
                datablad och garanti nämner ingen kemi; uppgiften LFP kommer från
                tredje part. Pylontech Force H2 – kemin är inte läsbar i det datablad
                vi hittat.
              </li>
              <li>
                Cellformat och celltillverkare publiceras sällan. SAJ och Fox ESS anger
                prismatiska celler via IEC-beteckningen; Eway nämner cellpartner som
                Gotion och EVE i sin företagspresentation utan att knyta dem till en
                produkt. Tibbers &quot;batteriblad&quot; är namnet på utbyggnadsmodulen,
                inte en uppgift om cellformat.
              </li>
            </ul>
            <p>
              Mer i Batteriskolan:{" "}
              <Link href="/batteriskolan/lfp-nmc-och-natriumjon" className="text-indigo underline underline-offset-2">LFP eller NMC</Link>.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Våra fem" title={<>Batterierna vi installerar.</>}>
        <ComparisonTable
          columns={["Batteri", "Cellkemi", "Uppbyggnad", "Spänning", "Verkningsgrad (batteri)", "Garanti", "Placering"]}
          rows={[
            {
              label: "Eway UNIV7600",
              cells: [
                "LFP. Cellformat och leverantör anges inte",
                "Högspänning i serie, ingen DC/DC. 24 celler per modul, 7,68 kWh",
                "76,8 V per modul; 2–8 moduler ger 153,6–614,4 V nominellt",
                "Anges inte",
                "10 år. ≥ 8 000 cykler (0,3C, 25 °C, 30–90 %, till 70 %). Kapacitetsvillkor publiceras inte",
                "IP65 enligt produktbladet; manualen anger inomhus",
              ],
            },
            {
              label: "SAJ HS3 (BU3-5.0)",
              cells: [
                "LFP, prismatiska celler (IEC-beteckning IFpP51/161/120)",
                "Lågspänningsmodul (16 celler, ≈ 51 V) med DC/DC-optimerare i varje modul; parallellkopplas. 5,0 kWh, 4,8 användbart",
                "380–500 V ut från optimeraren (450 V nominellt)",
                "Anges inte (växelriktaren max 98,0 %)",
                "10 år, 60 % av nominell energi eller 3,06 MWh per kWh. 5,5 år utan internet",
                "IP65, inne eller ute. Självuppvärmning och brandskyddssystem i batteriet",
              ],
            },
            {
              label: "Enershare Battery Core",
              cells: [
                "LFP. Cellformat och leverantör anges inte",
                "Högspänning i serie, \"No DC/DC\". 3,2 kWh per modul",
                "64 V per modul; 3–8 moduler ger 192–512 V nominellt, BMS 120–600 V",
                "≥ 96 %",
                "10 år enligt databladet; villkor publiceras inte",
                "IP65, skyddad utomhusplacering utan direkt sol, −10 till +55 °C",
              ],
            },
            {
              label: "Sigenergy SigenStor BAT 10.0",
              cells: [
                "LFP, 314 Ah-celler. Format och leverantör anges inte",
                "Lågspänningsmodul med inbyggd optimerare (\"battery optimizer inside\"); parallellkopplas. 9 kWh, 100 % urladdningsdjup",
                "Testspänningar 22,5–32,85 V per modul; 300–600 V (enfas) eller 600–900 V (trefas) till Energy Controller",
                "Anges inte (växelriktaren max 98,0–98,4 %)",
                "10 år, ≥ 70 % eller 26,68 MWh. 5 år om systemet är offline mer än ett år. 10 000 cykler enligt celltillverkaren, till 60 %",
                "IP66, −20 till +55 °C",
              ],
            },
            {
              label: "Fox ESS CQ7",
              cells: [
                "LFP, prismatiska celler, 18 i serie per modul (IFpP53/150/120)",
                "Högspänning i serie. 7,02 kWh per modul, 90 % urladdningsdjup",
                "57,6 V per modul; 2–14 moduler ger 115–806 V nominellt (104–920 V)",
                "> 95 % (25 °C, 0,3C)",
                "10 år, ≥ 70 % eller 26,9 MWh per modul, kräver registrering. ≥ 6 000 cykler till 70 %",
                "IP65, utomhus utan direkt regn och sol. Aerosolsläckare i varje modul",
              ],
            },
          ]}
          caption="Teknisk jämförelse av Eway, SAJ HS3, Enershare, SigenStor och Fox ESS CQ7: cellkemi, uppbyggnad, spänning, verkningsgrad, garanti och placering."
          footnote="Enligt tillverkarnas datablad, manualer och garantivillkor, kontrollerat 31 oktober 2026. Eway: produktbladet anger IP65 och inbyggd aerosolsläckning, medan manualen anger inomhusplacering och inte nämner släckning – vi har bett Eway om besked."
        />
      </Section>

      <Section eyebrow="Konkurrenterna" title={<>Batterierna andra säljer.</>}>
        <ComparisonTable
          columns={["Batteri", "Cellkemi", "Uppbyggnad", "Spänning", "Verkningsgrad (batteri)", "Garanti", "Placering"]}
          rows={[
            {
              label: "Homevolt (Tibber)",
              cells: [
                "NMC enligt Realtid och M3; Tibber anger inte kemin",
                "Inbyggd växelriktare 6 kW. 6,6 kWh, utbyggbar till 13,3 kWh. Uppbyggnad anges inte",
                "Anges inte",
                "> 97 % \"utfallseffektivitet\" enligt Tibber",
                "10 år, 6 000 cykler. Kvarvarande kapacitet anges inte av Tibber",
                "IP65. Tibber rekommenderar utomhus; inomhus bara under 20 kWh i ventilerat utrymme som inte är bostadsrum",
              ],
            },
            {
              label: "Tesla Powerwall 3",
              cells: [
                "Anges inte i Teslas datablad eller garanti",
                "Inbyggd växelriktare. 13,5 kWh användbart. Intern lågspänning: expansionspaket 52–92 V",
                "52–92 V (expansionspaket)",
                "89 % sol → batteri → hus; 97,5 % sol → hus direkt",
                "10 år, 80 % i t.ex. Tyskland och Nederländerna, 70 % i t.ex. Italien och Spanien. Sverige finns inte med i garantidokumentets lista över länder",
                "IP67, inne eller ute, −20 till +50 °C",
              ],
            },
            {
              label: "Huawei LUNA2000-S1",
              cells: [
                "LFP",
                "Lågspänningsmoduler med inbyggd optimerare (\"built-in energy optimizer\", 3,5 kW per modul). 5 eller 6,9 kWh per modul",
                "350–560 V (enfas) eller 600–980 V (trefas) till växelriktaren; modulspänning anges inte",
                "Anges inte",
                "\"Upp till 15 år\" enligt Huaweis marknadssida",
                "IP66, −20 till +55 °C",
              ],
            },
            {
              label: "BYD Battery-Box Premium HVS/HVM",
              cells: [
                "LFP, egna celler",
                "Högspänning i serie, ingen DC/DC. HVS 2,56 kWh per modul, HVM 2,76 kWh",
                "HVS 102,4 V per modul; 2–5 moduler ger 204,8–512 V. HVM 3–8 moduler, 153,6–409,6 V",
                "≥ 96 %",
                "10 år, 60 % av användbar energi eller genomströmning (HVS 12.8: 38,53 MWh)",
                "IP55, inne eller ute, −10 till +50 °C",
              ],
            },
            {
              label: "Sungrow SBR / SBH",
              cells: [
                "LFP, prismatiska celler",
                "Högspänning i serie. SBR 3,2 kWh per modul, SBH 5,0 kWh. 100 % urladdningsdjup",
                "SBR096 192 V; SBH 281,6–563,2 V",
                "Anges inte",
                "10 år",
                "IP55, inne eller ute",
              ],
            },
            {
              label: "Growatt APX",
              cells: [
                "LFP (\"cobalt free\")",
                "Lågspänningsmoduler (51,2 V) med DC/DC-omvandlare i varje modul till 380 V; 1–6 parallellt. 5 kWh, 90 % urladdningsdjup",
                "330–450 V ut; system 450 V (enfas) eller 650 V (trefas)",
                "Anges inte",
                "10 år",
                "IP66, −10 till +50 °C",
              ],
            },
            {
              label: "Pixii Home",
              cells: [
                "LFP",
                "Lågspänning 48 V, AC-kopplad med egna omvandlare 10–20 kW. 10–20 kWh, 80 % effektiv kapacitet",
                "48 V",
                "Anges inte",
                "4 000 cykler vid 80 % urladdning; > 80 % efter 10 år",
                "IP55, drift +5 till +45 °C",
              ],
            },
            {
              label: "SolarEdge Home Battery 400V",
              cells: [
                "NMC-typ: koboltoxid, mangandioxid och nickeloxid enligt räddningsguiden",
                "Högspänning, DC-kopplad. 9,7 kWh, 100 % urladdningsdjup",
                "350–450 V",
                "> 94,5 % (topp)",
                "10 år",
                "IP55, inne eller ute, −10 till +50 °C",
              ],
            },
            {
              label: "sonnenBatterie 10 performance",
              cells: [
                "LFP",
                "Inbyggd växelriktare. 11 kWh nominellt, 10 användbart per enhet",
                "Anges inte",
                "95,9 % (batteri), växelriktare max 97,2 %",
                "10 år eller 10 000 cykler",
                "IP30, inomhus, −5 till +45 °C",
              ],
            },
            {
              label: "Alpha ESS Smile-G3",
              cells: [
                "LFP",
                "Lågspänningsmoduler 96 V, 1–6 parallellt. 10,1 kWh, 95 % urladdningsdjup",
                "96 V (90–108 V)",
                "Anges inte",
                "10 år; 8 000 cykler",
                "IP65",
              ],
            },
            {
              label: "Pylontech Force H2",
              cells: [
                "Kemin är inte läsbar i databladet",
                "Högspänning i serie. 3,55 kWh per modul, 2–4 moduler",
                "96 V per modul; 192–384 V",
                "Anges inte",
                "Designlivslängd 15 år; 90 % urladdningsdjup",
                "IP55, 0 till +50 °C",
              ],
            },
          ]}
          caption="Teknisk jämförelse av Homevolt, Tesla Powerwall 3, Huawei LUNA2000, BYD Battery-Box, Sungrow SBR/SBH, Growatt APX, Pixii Home, SolarEdge Home Battery, sonnenBatterie 10, Alpha ESS och Pylontech Force H2."
          footnote="Enligt tillverkarnas datablad, manualer och garantivillkor där de finns, kontrollerat 31 oktober 2026. Homevolts cellkemi kommer från Realtid och M3 eftersom Tibber inte publicerar den."
        />
      </Section>

      <Section
        eyebrow="Säkerhet"
        title={<>Bränder, återkallelser och placering.</>}
      >
        <div className="max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-ink/75">
          <p>
            <strong>Sigenergy</strong> återkallade i november 2025 frivilligt
            enfasiga Energy Controllers på 8, 10 och 12 kW med snabbkopplade
            AC-kontakter i Australien, efter risk för överhettning och brand i
            kontakten. Återkallelsen gäller styrenheten, inte batterimodulerna,
            och Sigenergy pekar på installationsutförandet; åtgärden är
            programvara som begränsar effekten, byte av kontakt och två års
            extra garanti. De trefasiga enheter som installeras i Sverige
            omfattas inte enligt listan från Clean Energy Council.
          </p>
          <p>
            <strong>Homevolt.</strong> Vi hittade inga rapporter från MSB,
            Elsäkerhetsverket, räddningstjänster eller svensk och norsk press
            som namnger Homevolt i en brand, och ingen återkallelse. De
            batteribränder som rapporterats i svensk press anger inte märke.
          </p>
          <p>
            <strong>Placering.</strong> Boverkets regler om brandcellsindelning
            gäller oavsett kemi: mer än 20 kWh i samma utrymme ska som
            utgångspunkt stå i en egen brandcell. Tibber går längre för
            Homevolt och rekommenderar utomhusplacering. Fox ESS CQ7 har
            aerosolsläckare i varje modul, SAJ HS3 ett brandskyddssystem i
            batteriet, och Eways produktblad anger aerosolsläckning. Mer i{" "}
            <Link href="/batteriskolan/brandsakerhet-och-placering" className="text-indigo underline underline-offset-2">brandsäkerhet och placering</Link>.
          </p>
        </div>
      </Section>

      <Section eyebrow="Vår slutsats" title={<>Så väljer vi.</>}>
        <div className="max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-ink/75">
          <p>
            Vi rekommenderar i första hand LFP-celler och högspänning i serie:
            färrast omvandlingssteg, dokumenterad verkningsgrad och den
            stabilaste kemin. Det är därför Eway är vårt vanligaste val, Fox
            ESS CQ7 vårt val för stora system som får stå utomhus och Enershare
            vårt val när kunden vill bygga ut i små steg.
          </p>
          <p>
            SAJ HS3 och Sigenergy SigenStor bygger på lågspänningsmoduler med
            optimerare. De är bra när kunden vill ha växelriktare och batteri
            i en enhet på liten yta, eller vill kunna blanda moduler senare,
            och vi säger då också att tillverkarna inte publicerar batteriets
            verkningsgrad. Priset efter grönt avdrag och vad batteriet ska
            göra i just ditt hus avgör till slut. Jämför storlekar och pris i{" "}
            <Link href="/tjanster/batterier/jamforelse" className="text-indigo underline underline-offset-2">batterijämförelsen</Link>{" "}
            och räkna på återbetalningen i{" "}
            <Link href="/kalkylator" className="text-indigo underline underline-offset-2">kalkylatorn</Link>.
          </p>
        </div>
      </Section>

      <Section eyebrow="Vanliga frågor" title={<>Frågor om hur batterierna fungerar.</>}>
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
            { href: "/tjanster/batterier/jamforelse", label: "Jämför våra fem batterier", desc: "Kapacitet, moduler, mått och vem varje batteri passar för." },
            { href: "/batteriskolan/lfp-nmc-och-natriumjon", label: "LFP eller NMC", desc: "Batterikemin förklarad." },
            { href: "/batteriskolan/verkningsgrad", label: "Verkningsgrad", desc: "Var förlusterna uppstår." },
            { href: "/batteriskolan/vaxelriktare-hybrid-ac-dc", label: "Hybridväxelriktare, AC eller DC", desc: "Så kopplas batteriet till huset." },
          ]}
        />
        <CtaBlock
          className="mt-10"
          title="Vi går igenom vilket batteri som passar ditt hus."
          primaryHref="/offert?tjanst=batterier"
        />
        <p className="mt-6 text-[13.5px] text-ink/55">
          Funderar du på laddbox också?{" "}
          <Link href="/tjanster/laddboxar/jamforelse" className="text-indigo underline underline-offset-2 inline-flex items-center gap-1">
            Åtta laddboxar jämförda <ArrowRight size={13} />
          </Link>
        </p>
      </Section>
    </>
  );
}
