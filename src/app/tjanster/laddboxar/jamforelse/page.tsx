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
 * Sju laddboxar jämförda: Zaptec Go 2, Easee Up, Easee Max, Easee Core,
 * DEFA Power, Fox ESS A022K, Charge Amps Halo och SAJ:s laddmodul i HS3.
 * Allt tekniskt kommer från tillverkarnas produktblad, manualer och
 * hjälpsidor, regler från Elsäkerhetsverket och Skatteverket. Uppgifterna
 * kontrollerades 2026-10-31 och står i källistan längst ned. Inga priser
 * per märke – totalpriset med installation tas fram i offerten.
 */
const PATH = "/tjanster/laddboxar/jamforelse";
const UPDATED = "2026-10-31";
const TITLE = "Bästa laddboxen 2026: Zaptec, Easee, DEFA, Fox ESS, Charge Amps och SAJ jämförda";
const DESCRIPTION =
  "Zaptec Go 2, Easee Up, Max och Core, DEFA Power, Fox ESS A022K, Charge Amps Halo och SAJ HS3:s laddmodul jämförda: effekt, jordfelsskydd, MID-mätare, solladdning, IT-nät, OCPP, mått och garanti enligt produktbladen.";

export const metadata = {
  title: seoTitle(TITLE),
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} – Optimera Energi`, description: DESCRIPTION, url: PATH, type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SOURCES = [
  { title: "Zaptec Go 2 – produktblad (sv-SE)", publisher: "Zaptec", url: "https://help.zaptec.com/objects/sa-migration-assets/aaffa4be-5f88-4e9a-9a9e-c16298de05c7/d6e1dee8614efc7c5c451192b76b7bf700bd8d5b6f90d38d08ffcd570f42808c.pdf" },
  { title: "Zaptec Go 2 – dokument och manualer", publisher: "Zaptec", url: "https://help.zaptec.com/documentation/zaptec-go-2-documents-and-manuals?lang=sv" },
  { title: "Jordfelsbrytarskydd för Zaptec Go och Go 2", publisher: "Zaptec", url: "https://help.zaptec.com/installation/earth-fault-protection-zaptec-go-and-zaptec-go-2?lang=sv" },
  { title: "Solladdning med Zaptec Sense", publisher: "Zaptec", url: "https://help.zaptec.com/smart-charging/how-to-use-solar-charging-with-zaptec-sense?lang=sv" },
  { title: "Eco-läge i Zaptec-appen", publisher: "Zaptec", url: "https://help.zaptec.com/smart-charging/eco-mode-in-the-zaptec-app-how-it-works-and-how-to-get-started?lang=sv" },
  { title: "Trefasladdning på IT-nät", publisher: "Zaptec", url: "https://help.zaptec.com/charging/how-to-allow-3-phase-charging-on-it-grids-for-zaptec-pro-and-zaptec-go-2?lang=sv" },
  { title: "Installera flera Zaptec Go", publisher: "Zaptec", url: "https://help.zaptec.com/installation/how-to-install-multiple-zaptec-go?lang=sv" },
  { title: "Zaptec-garanti", publisher: "Zaptec", url: "https://help.zaptec.com/documentation/zaptec-guarantee?lang=sv" },
  { title: "Charge Up – produktsida", publisher: "Easee", url: "https://easee.com/sv/produkter/elbilsladdare/charge-up/" },
  { title: "Charge Up – produktblad", publisher: "Easee", url: "https://download.easee.com/m/3813f75ac7110a42/original/-SV-Charge-Up-Productsheet.pdf" },
  { title: "Charge Up – installationsguide", publisher: "Easee", url: "https://download.easee.com/m/523140189b5e7134/original/SV_ChargeUp_InstallationGuide.pdf" },
  { title: "Up – funktionsbeskrivning av jordfelsbrytaren", publisher: "Easee", url: "https://download.easee.com/m/760e21f6e3053379/original/SV_Up_RCD-Functional-Description.pdf" },
  { title: "Charge Max – produktblad (v1.03)", publisher: "Easee", url: "https://download.easee.com/m/6cf774f196989678/original/-SV-Charge-Max-Productsheet.pdf" },
  { title: "Charge Max – installationsguide", publisher: "Easee", url: "https://download.easee.com/m/52629747bfc408d0/original/SV_ChargeMax_InstallationGuide.pdf" },
  { title: "Charge Core – produktblad", publisher: "Easee", url: "https://download.easee.com/m/58584b822afffc54/original/SV_Charge_Core_Productsheet.pdf" },
  { title: "Charge Core – installer guide", publisher: "Easee", url: "https://download.easee.com/m/1d34f8e3211a88b9/original/EN_Charge_Core_InstallerGuide.pdf" },
  { title: "What are the differences between the Easee chargers?", publisher: "Easee Support", url: "https://support.easee.com/hc/en-gb/articles/15915437771921" },
  { title: "Smart laddning", publisher: "Easee Support", url: "https://support.easee.com/hc/sv/articles/33123627163281" },
  { title: "DEFA Power – produktblad (SE, E07)", publisher: "DEFA", url: "https://www.defa.com/content/uploads/Documentation/EV-Charging/DEFA-Power/Product-sheet/715000-Product-sheet_DEFA-Power-SE.pdf" },
  { title: "DEFA Power – user manual (E06)", publisher: "DEFA", url: "https://kundeservice.lyse.no/hc/no/article_attachments/20134590740369" },
  { title: "A-serien EV-laddare – datablad (SV, V1.0)", publisher: "Fox ESS", url: "https://se.fox-ess.com/Public/Uploads/uploadfile/files/20260629/SVAV2.0EVChargerAEBDatasheetV1.020260320.pdf" },
  { title: "Energy Management System (DLB / PV linkage) – manual V1.0.4", publisher: "Fox ESS", url: "https://www.fox-ess.com/Public/Uploads/uploadfile/files/20251202/ENDLBSLBUserManualV1.0.420250827.pdf" },
  { title: "Smart Energy Management Solution V1.3", publisher: "Fox ESS", url: "https://au.fox-ess.com/Public/Uploads/uploadfile/files/20260721/PVStorageEVCintegrateSolution.pdf" },
  { title: "EV Charger Warranty Policy V2.0", publisher: "Fox ESS Germany GmbH", url: "https://au.fox-ess.com/Public/Uploads/uploadfile/files/20251219/EVChargerWarrantyPolicyAUV2.0.pdf" },
  { title: "Halo – produktblad", publisher: "Charge Amps", url: "https://www.chargeamps.com/app/uploads/2026/05/ChargeAmps_Halo_SV_260520.pdf" },
  { title: "Halo – installationsmanual", publisher: "Charge Amps", url: "https://www.chargeamps.com/app/uploads/2026/01/Charge-Amps-Halo-Installation-Manual_rev.05_sv_se.pdf" },
  { title: "Garantivillkor", publisher: "Charge Amps", url: "https://www.chargeamps.com/warranty-policy/" },
  { title: "HS3 Three Phase All-in-One (HS3-5-12K-T2) – datablad", publisher: "SAJ", url: "https://optimeraenergi.se/produktblad/saj-hs3.pdf" },
  { title: "HS3 EV Charger – datasheet V1.0", publisher: "SAJ", url: "https://www.saj-electric.com/hubfs/Europe%20Region%202%20document/Datasheet/Residential/UK%20IE/HS3%20EV%20Charger_Datasheet_en_EU.pdf" },
  { title: "HS3-(3K-12K)-T2 – user manual (EU/AU)", publisher: "SAJ", url: "https://saj-electric.com/hubfs/crm-properties-file-values/HS3-(3K-12K)-T2-(W%2c%20G)-(B%2cP)X_User_Manual_EU_AU-1.pdf" },
  { title: "BU3-5.0-TV2-PRO – batterimodul, datablad V2.1", publisher: "SAJ", url: "https://www.saj-electric.com/hubfs/EU%20Doc/HS3%20Battery%20Module%20-EN-04.pdf" },
  { title: "Easee AS tvingas säljstoppa elbilsladdare", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/lag-och-ratt/forsaljningsforbud-och-andra-atgarder/forsaljningsforbud/2023/2023-03-17-easee-as-tvingas-saljstoppa-elbilsladdare" },
  { title: "Beslut 22EV1261-73 (2024-04-19)", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/download/18.61e3166919c985b82d68995/1772712663153/22EV1261-73_Beslut.pdf" },
  { title: "Installera din laddningspunkt", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-elbilsladdare/installera-din-laddningspunkt" },
  { title: "Så fungerar skattereduktion för grön teknik", publisher: "Skatteverket", url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html" },
  { title: "Godkända arbeten – grön teknik", publisher: "Skatteverket", url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html" },
];

const FAQ = [
  {
    q: "Vilken laddbox är bäst 2026?",
    a: "Det beror på vad du behöver. Zaptec Go 2, Easee Max och DEFA Power har MID-godkänd elmätare som duger för att få ersättning för tjänstebilsladdning. Easee Up och Easee Max har jordfelsbrytaren inbyggd. DEFA Power och Charge Amps Halo har fast kabel. Fox ESS A022K passar den som redan har Fox ESS växelriktare och batteri, och SAJ:s laddmodul den som har ett SAJ HS3. Alla utom Charge Amps Halo och SAJ laddar 22 kW på trefas.",
  },
  {
    q: "Vilken laddbox är bäst för tjänstebil?",
    a: "En laddbox med MID-godkänd elmätare, eftersom mätvärdena då är godkända för debitering. Zaptec Go 2 och Easee Max har MID klass B, och DEFA Power har MID klass B med display. Easee Up och Easee Core har en inbyggd mätare på ±2 % som inte är MID-godkänd – Easee skriver själva att Core inte kan användas där ersättning önskas.",
  },
  {
    q: "Behöver jag en extra jordfelsbrytare till laddboxen?",
    a: "Elsäkerhetsverket anger att varje laddningspunkt ska ha en egen jordfelsbrytare och inte sitta under husets gemensamma. Zaptec Go 2, DEFA Power, Fox ESS A022K och Charge Amps Halo har inbyggd 6 mA DC-detektering men kräver en separat jordfelsbrytare typ A. Easee Up, Max och Core har jordfelsbrytare typ A inbyggd, men Easee kräver ändå en extern om kretsen inte är byggd i klass II och bara matar laddboxen. Elektrikern avgör vad som krävs i ditt hus.",
  },
  {
    q: "Vilken laddbox laddar på överskottet från solcellerna?",
    a: "Easee behöver tillbehöret Equalizer för solladdning. Zaptecs egen solladdning via Sense erbjuds inte i Sverige, så Zaptec Go 2 styrs mot solöverskott via ett externt system över OCPP eller API. DEFA Power har PowerSmart som laddar när Nord Pool-priset är lågt; solstyrning sker via DEFA Balancer. Fox ESS A022K har Green- och Economic-läge som kräver Fox ESS elmätare och växelriktare. Charge Amps Halo har Green Charging. SAJ:s laddmodul styrs av HS3-systemet. Vi kopplar ihop laddboxen med solceller och batteri när vi installerar.",
  },
  {
    q: "Vad är skillnaden mellan Easee Up, Max och Core?",
    a: "Up och Max är för hemmet, Core för flerbostadshus, arbetsplatser och parkeringar. Enligt Easee skiljer sig Up och Max bara på elmätaren: Max har MID klass B med display, Up har en mätare som inte är MID-godkänd. Core saknar också MID men kan lastbalansera över 100 laddare på samma krets utan extra hårdvara, mot tre för Up och Max.",
  },
  {
    q: "Fungerar laddboxen på IT-nät?",
    a: "Easee Up, Max och Core laddar trefas upp till 12,7 kW på IT-nät. Zaptec Go 2 är inställd på enfas på IT-nät, men trefas upp till 12,7 kW kan aktiveras. DEFA Power anger TN, IT och TT. Charge Amps Halo laddar bara enfas på IT-nät. Fox ESS A022K anger 3L/N/PE 400 V i databladet, och SAJ:s laddmodul 230/400 V.",
  },
  {
    q: "Vad är V2G och vilka laddboxar är förberedda?",
    a: "V2G, vehicle-to-grid, betyder att bilen kan mata tillbaka el till huset eller nätet. Det kräver bil, laddbox och regelverk som stödjer det, och är ännu inte i bruk för villor i Sverige. Easee Max och DEFA Power anger stöd för ISO 15118, och Fox ESS A022K är enligt databladet förberedd för V2G i hårdvaran.",
  },
  {
    q: "Hur fungerar laddboxen i SAJ HS3?",
    a: "SAJ:s laddmodul CU2-11K sitter i samma stack som batteriet och växelriktaren och får växelström från växelriktaren. Solel och batteri går alltså som likström in i växelriktaren, som gör växelström till huset och bilen. Modulen laddar 11 kW på trefas (16 A) med en typ 2-kabel på 5 meter och styrs i SAJ:s app Elekeeper. Växelriktarens märkeffekt, 5–12 kW beroende på modell, är taket för vad sol och batteri kan leverera till hus och bil tillsammans.",
  },
  {
    q: "Får jag grönt avdrag för laddbox?",
    a: "Ja. Skattereduktionen för grön teknik är 50 % av arbete och material för en laddningspunkt, högst 50 000 kr per person och år. Vid fast pris räknas 97 % av priset som arbete och material, så avdraget blir 48,5 % av totalpriset. Laddboxen ska ha typ 2-uttag, bara användas av hushållet och vara förberedd för mätning. Arbete i elcentralen ger inte avdrag.",
  },
];

/** Korten under "Vilken passar dig?". */
const PICKS = [
  {
    t: "Zaptec Go 2",
    k: "MID-mätare och 4G",
    b: "Välj Zaptec Go 2 om laddningen ska kunna debiteras – mätaren är MID klass B – och du vill ha 4G så att boxen fungerar där wifi inte når. Eco-läget laddar de billigaste timmarna enligt Nord Pool. Kräver separat jordfelsbrytare typ A. 22 kW på trefas.",
  },
  {
    t: "Easee Up",
    k: "Jordfelsbrytaren inbyggd",
    b: "Välj Easee Up om du vill ha jordfelsbrytaren inbyggd och trefas även på IT-nät (12,7 kW). Med Easee Equalizer laddar den på solöverskott och skyddar huvudsäkringen. Mätaren är inte MID-godkänd.",
  },
  {
    t: "Easee Max",
    k: "Som Up, med MID-mätare",
    b: "Välj Easee Max om du vill ha Easee Up med MID klass B-mätare och display – enligt Easee är det den enda skillnaden. Anges som V2G-redo (ISO 15118).",
  },
  {
    t: "Easee Core",
    k: "För BRF och arbetsplats",
    b: "Välj Easee Core till flerbostadshus, parkeringar eller arbetsplatser: över 100 laddare kan lastbalansera på samma krets utan extra hårdvara. Saknar MID-mätare och kan därför inte användas där ersättning för laddningen önskas, skriver Easee.",
  },
  {
    t: "DEFA Power",
    k: "Fast kabel, display och MID",
    b: "Välj DEFA Power om du vill ha fast kabel (6 m), display, MID klass B-mätare och OCPP 2.0.1 i samma box. Dynamisk lastbalansering och fasrotation är inbyggd och fungerar utan molnuppkoppling. PowerSmart laddar när Nord Pool-priset är lågt. Kräver separat jordfelsbrytare typ A.",
  },
  {
    t: "Fox ESS A022K",
    k: "För Fox ESS-systemet",
    b: "Välj Fox ESS A022K om du har eller planerar Fox ESS växelriktare (H3 Smart, H3 Pro eller H3) och batteriet CQ7. Då delar laddbox och växelriktare samma elmätare, och Green-läget laddar enbart på solöverskott. IP65, förberedd för V2G, finns med fast kabel (6 m) eller uttag. Kräver separat jordfelsbrytare. Garanti 3 år.",
  },
  {
    t: "Charge Amps Halo",
    k: "Fast kabel och extra uttag",
    b: "Välj Halo om du vill ha fast kabel på 7,5 meter och ett extra vanligt eluttag på boxen. Laddar upp till 11 kW på trefas eller 7,4 kW på enfas, tål IP66 och −35 °C, ansluts via wifi eller nätverkskabel. Enfas på IT-nät. Kräver separat jordfelsbrytare typ A.",
  },
  {
    t: "SAJ HS3 laddmodul",
    k: "Inbyggd i batteristacken",
    b: "Välj SAJ:s laddmodul om du har eller köper ett SAJ HS3: laddaren på 11 kW sitter i samma stack som batteri och växelriktare, utan separat box på väggen. Typ 2-kabel på 5 meter, styrs i samma app som batteriet.",
  },
];

export default function ChargerComparisonPage() {
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
            "bästa laddbox 2026",
            "Zaptec Go 2 eller Easee",
            "Zaptec Go 2 vs Easee Max",
            "Easee Core eller Easee Max",
            "DEFA Power",
            "Fox ESS A022K",
            "Charge Amps Halo",
            "SAJ HS3 laddbox",
            "laddbox MID-mätare tjänstebil",
            "laddbox solöverskott",
            "jämför laddbox",
          ],
          articleSection: "Laddboxar",
        })}
      />

      <section className="container-edge pt-12 md:pt-20 pb-4">
        <Breadcrumbs
          items={[
            { name: "Hem", href: "/" },
            { name: "Laddboxar", href: "/tjanster/laddboxar" },
            { name: "Jämförelse", href: PATH },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="eyebrow">Laddbox · Jämförelse</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[80px] tracking-display-tight leading-[1.12]">
            Åtta laddboxar,{" "}
            <span className="italic font-serif text-indigo">jämförda.</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
            Zaptec Go 2, Easee Up, Max och Core, DEFA Power, Fox ESS A022K,
            Charge Amps Halo och laddmodulen i SAJ HS3. Här är skillnaderna som
            spelar roll i en villa: jordfelsskydd, energimätare, solladdning,
            elnätet och hur laddaren hänger ihop med solceller och batteri.
          </p>
          <div className="mt-6">
            <LastUpdated date={UPDATED} label="Uppdaterad" />
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <AnswerBox question="Vilken laddbox ska jag välja?">
          <p>
            <strong>
              Behöver du MID-godkänd mätare, till exempel för tjänstebil: Zaptec
              Go 2, Easee Max eller DEFA Power. Vill du ha jordfelsbrytaren
              inbyggd: Easee Up eller Max. Vill du ha fast kabel: DEFA Power
              eller Charge Amps Halo. Har du Fox ESS eller SAJ HS3 i huset:
              deras egna laddare, som delar mätare och app med batteriet.
            </strong>{" "}
            Alla utom Charge Amps Halo (11 kW) och SAJ:s modul (11 kW) laddar
            22 kW på trefas. Easee Core är gjord för flerbostadshus och
            arbetsplatser, inte för en enskild villa.
          </p>
        </AnswerBox>
      </Section>

      <Section eyebrow="Jämförelse" title={<>Det som avgör valet.</>}>
        <ComparisonTable
          columns={["Laddbox", "Max effekt", "Anslutning", "Jordfelsskydd", "Energimätare", "Sol och elpris", "Uppkoppling", "Garanti"]}
          rows={[
            {
              label: "Zaptec Go 2",
              cells: [
                "22 kW trefas (32 A), 7,4 kW enfas. IT-nät: enfas som standard, trefas 12,7 kW kan aktiveras",
                "Typ 2-uttag, kabeln kan låsas fast",
                "Inbyggd 6 mA DC-detektering. Separat jordfelsbrytare typ A 30 mA krävs",
                "MID klass B",
                "Eco-läge laddar billigaste timmarna (Nord Pool). Solladdning via externt system (OCPP/API) – Zaptecs egen finns inte i Sverige. Zaptec Sense skyddar huvudsäkringen",
                "4G, wifi, Bluetooth, RFID. OCPP 1.6J",
                "5 år",
              ],
            },
            {
              label: "Easee Up",
              cells: [
                "22 kW trefas (TN), 12,7 kW trefas (IT), 1,4–7,4 kW enfas",
                "Typ 2-uttag, kabeln kan låsas fast",
                "Inbyggd jordfelsbrytare typ A 30 mA + 6 mA DC. Extern krävs ändå om kretsen inte är klass II och bara matar boxen",
                "Inbyggd (±2 %), inte MID",
                "Smart laddning med pristak. Solladdning och skydd av huvudsäkringen kräver Easee Equalizer",
                "LTE-M, wifi, Bluetooth, RFID/NFC. OCPP 1.6J",
                "5 år",
              ],
            },
            {
              label: "Easee Max",
              cells: [
                "22 kW trefas (TN), 12,7 kW trefas (IT), 1,4–7,4 kW enfas",
                "Typ 2-uttag, kabeln kan låsas fast",
                "Som Easee Up",
                "MID klass B (±1 %) med display",
                "Som Easee Up. Anges som V2G-redo (ISO 15118)",
                "LTE-M, wifi, Bluetooth, RFID/NFC. OCPP 1.6J",
                "5 år",
              ],
            },
            {
              label: "Easee Core",
              cells: [
                "22 kW trefas (TN), 12,7 kW trefas (IT), 1,4–7,4 kW enfas",
                "Typ 2-uttag",
                "Som Easee Up",
                "Inbyggd (±2 %), inte MID – kan inte användas där ersättning önskas, enligt Easee",
                "Lastbalansering över 100 laddare på samma krets. Solladdning och huvudsäkring kräver Equalizer",
                "LTE-M (eSIM), wifi, Bluetooth, RFID/NFC. OCPP 1.6J",
                "5 år",
              ],
            },
            {
              label: "DEFA Power",
              cells: [
                "Upp till 22 kW, 6–32 A. TN, IT och TT",
                "Fast typ 2-kabel 6 m. Display 69 × 69 mm",
                "Inbyggd 6 mA DC-detektering. Separat jordfelsbrytare typ A krävs",
                "MID klass B (±1 %)",
                "PowerSmart laddar när Nord Pool-priset är lågt. Dynamisk lastbalansering och fasrotation inbyggd, oberoende av molnet. DEFA Balancer för huvudsäkringen",
                "4G, wifi (2,4/5 GHz), Ethernet, Bluetooth, RFID/NFC. OCPP 2.0.1, ISO 15118",
                "5 år",
              ],
            },
            {
              label: "Fox ESS A022K",
              cells: [
                "22 kW trefas (32 A), 400 V ±20 %",
                "Fast typ 2-kabel 6 m eller typ 2-uttag",
                "Inbyggd 30 mA AC + 6 mA DC-detektering. Separat jordfelsbrytare krävs (typ A eller B enligt lokala regler)",
                "Anges inte i databladet (mätnoggrannhet ≤ 2 %)",
                "Green-läge (bara solöverskott) och Economic-läge kräver Fox ESS elmätare och växelriktare. Dynamisk lastbalansering via elmätare",
                "Wifi, Ethernet, Bluetooth, 4G (eget SIM), RFID. OCPP 1.6J/2.0.1, Modbus. Förberedd för V2G",
                "3 år från installation, kräver registrering",
              ],
            },
            {
              label: "Charge Amps Halo",
              cells: [
                "11 kW trefas (16 A) eller 7,4 kW enfas (32 A). Enfas på IT-nät",
                "Fast typ 2-kabel 7,5 m, plus Schuko-uttag",
                "Inbyggd 6 mA DC-detektering. Separat jordfelsbrytare typ A krävs",
                "Anges inte",
                "Green Charging för solladdning. Lastbalansering via Amp Guard",
                "Wifi, Ethernet. OCPP 1.6J",
                "5 år",
              ],
            },
            {
              label: "SAJ HS3 laddmodul (CU2-11K)",
              cells: [
                "11 kW trefas (16 A). Matas från HS3-växelriktaren",
                "Typ 2-kabel 5 m. Sitter i batteristacken",
                "Inbyggt jordfelsskydd, certifierad enligt IEC 62955",
                "Inbyggd mätning, 2 %",
                "Styrs av HS3-systemet: sol, batteri och laddning i samma app (Elekeeper), schemalagd laddning",
                "Wifi 2,4 GHz",
                "Enligt SAJ:s garantivillkor",
              ],
            },
          ]}
          caption="Jämförelse av åtta laddboxar: effekt, anslutning, jordfelsskydd, energimätare, sol- och elprisstyrning, uppkoppling och garanti."
          footnote="Enligt tillverkarnas produktblad, manualer och hjälpsidor, kontrollerat 31 oktober 2026. Totalpriset med installation står i offerten."
        />
      </Section>

      <Section eyebrow="Mått och tålighet" title={<>Storlek, skydd och temperatur.</>}>
        <ComparisonTable
          columns={["Laddbox", "Mått (B × H × D)", "Vikt", "Kapsling", "Drifttemperatur"]}
          rows={[
            { label: "Zaptec Go 2", cells: ["239 × 178 × 73 mm", "1,6 kg", "IP54, IK10", "−30 till +50 °C"] },
            { label: "Easee Up", cells: ["256 × 193 × 106 mm", "1,5 kg", "IP54 (bakplatta IP22), IK10", "−30 till +40 °C"] },
            { label: "Easee Max", cells: ["256 × 193 × 106 mm", "1,6 kg", "IP54, IK10", "−30 till +40 °C"] },
            { label: "Easee Core", cells: ["256 × 193 × 106 mm", "1,5 kg", "IP54 (bakplatta IP22), IK10", "−30 till +40 °C"] },
            { label: "DEFA Power", cells: ["350 × 167 × 113 mm", "2,5 kg + 3,5 kg kabel", "IP55 (fäste IP44), IK10", "−30 till +40 °C med MID-mätning, annars −40 till +50 °C"] },
            { label: "Fox ESS A022K", cells: ["320 × 190 × 130 mm (kabel), 320 × 190 × 144,5 mm (uttag)", "≤ 6,3 kg (kabel), ≤ 3,2 kg (uttag)", "IP65 (uttag IP55), IK08", "−30 till +50 °C"] },
            { label: "Charge Amps Halo", cells: ["262 × 159 × 203 mm", "4 kg", "IP66 (kontakt IP44), IK10", "−35 till +45 °C"] },
            { label: "SAJ HS3 laddmodul", cells: ["695 × 160 × 170 mm, som ett lager i stacken", "9 kg", "IP54 (stacken i övrigt IP65)", "−30 till +50 °C"] },
          ]}
          caption="Mått, vikt, kapslingsklass och drifttemperatur för åtta laddboxar."
        />
      </Section>

      <Section eyebrow="Vilken passar dig?" title={<>Åtta laddare, åtta olika styrkor.</>}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PICKS.map((c) => (
            <li key={c.t} className="rounded-3xl border border-ink/10 bg-bone p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">{c.k}</div>
              <h3 className="mt-3 font-display text-2xl tracking-display-tight">{c.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{c.b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Laddare i batteristacken"
        title={<>Så får SAJ:s laddmodul sin ström.</>}
        intro="SAJ HS3 är ett allt-i-ett med växelriktare, batterimoduler och en laddmodul för elbil i samma stack. Så här hänger delarna ihop, enligt SAJ:s datablad och manual."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-ink/10 bg-bone p-7 space-y-4 text-[15px] leading-relaxed text-ink/75">
            <ol className="list-decimal space-y-3 pl-5">
              <li>
                <strong>Solceller och batteri ger likström.</strong> Panelerna går in på
                växelriktarens två MPPT-ingångar. Batterimodulerna (5 kWh styck) har var
                sin DC/DC-optimerare som ger 380–500 V till växelriktaren, och varje modul
                lämnar högst 7,9 A.
              </li>
              <li>
                <strong>Växelriktaren gör växelström.</strong> HS3-växelriktaren finns i
                5–12 kW och levererar växelström till huset – och till laddmodulen. SAJ
                skriver i manualen att växelriktaren &quot;provides power to the EV
                charger&quot; när laddmodulen är monterad.
              </li>
              <li>
                <strong>Laddmodulen laddar bilen.</strong> CU2-11K sitter mellan batteri och
                växelriktare i stacken, kopplas in utan kablage och laddar 11 kW på trefas
                (16 A) genom en typ 2-kabel på 5 meter. Modulen har eget jordfelsskydd
                enligt IEC 62955 och en verkningsgrad på minst 99 %, eftersom den bara
                fördelar växelström.
              </li>
              <li>
                <strong>Nätet fyller på.</strong> Räcker inte sol och batteri hämtas resten
                från elnätet genom samma anslutning. Räknat ur databladet ger två
                batterimoduler cirka 7 kW och tre cirka 10,5 kW, och växelriktarens
                märkeffekt är taket för vad sol och batteri kan leverera till hus och bil
                tillsammans.
              </li>
            </ol>
          </div>
          <div className="rounded-3xl border border-indigo/25 bg-indigo/[0.04] p-7 text-[15px] leading-relaxed text-ink/75 space-y-4">
            <p>
              <strong>Vad det betyder i praktiken.</strong> Fördelen är att allt styrs i
              en app, Elekeeper, med schemalagd laddning och solel, batteri och bil i
              samma system, och att ingen separat laddbox behövs på väggen. Begränsningen
              är effekten: 11 kW i stället för 22, och vid snabb laddning tar bilen det
              mesta av det växelriktaren kan ge.
            </p>
            <p>
              SAJ:s dokument anger inte om modulen kan ladda bilen från sol och batteri
              vid strömavbrott, eller exakt hur effekten fördelas mellan hus och bil. Det
              går vi igenom vid hembesöket.
            </p>
            <p>
              <Link href="/tjanster/batterier/jamforelse" className="text-indigo underline underline-offset-2 inline-flex items-center gap-1">
                Så är SAJ HS3 byggt jämfört med de andra batterierna <ArrowRight size={13} />
              </Link>
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Fox ESS-systemet"
        title={<>A022K tillsammans med H3 och CQ7.</>}
        intro="Fox ESS laddbox är gjord för att sitta ihop med Fox ESS egen växelriktare och batteri. Så här fungerar kopplingen enligt Fox ESS manualer."
      >
        <ul className="max-w-3xl space-y-3 text-[15.5px] leading-relaxed text-ink/75">
          <li>
            <strong>En elmätare för allt.</strong> Laddboxen kopplas med RS485 till
            Fox ESS elmätare (DTSU666) och växelriktaren, och växelriktaren delar
            mätaren med laddboxen. Fungerar med H3 Smart, H3 Pro och H3.
          </li>
          <li>
            <strong>Green och Economic.</strong> I Green-läge laddar bilen bara när
            solcellerna ger mer än huset använder (minst 6 A över). I Economic-läge
            prioriteras solel och nätet fyller på. Produktionsdata går från
            växelriktaren till laddboxen via mätaren.
          </li>
          <li>
            <strong>Batteri till bil.</strong> I FoxCloud ställer du in hur mycket
            batteriet får ladda bilen med, och lägsta urladdning för Green-läge
            (50 W med H3 Smart och H3 Pro).
          </li>
          <li>
            <strong>Utan Fox-växelriktare</strong> fungerar A022K som en vanlig
            laddbox med dynamisk lastbalansering via elmätaren (gräns 10–300 A),
            OCPP 1.6J eller 2.0.1 och Modbus. Solladdning med andra växelriktare
            anges inte i dokumenten.
          </li>
        </ul>
      </Section>

      <Section eyebrow="Bra att veta" title={<>Easee och Elsäkerhetsverket.</>}>
        <div className="max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-ink/75">
          <p>
            I mars 2023 förbjöd Elsäkerhetsverket försäljning av Easees äldre
            modeller Home och Charge, bland annat för att jordfelsskyddet inte
            uppfyllde standarden och manualen inte angav att en jordfelsbrytare
            ska sitta före laddaren. Easee drog senare tillbaka sitt
            överklagande, och myndigheten krävde ingen åtgärd på laddare som
            redan var installerade.
          </p>
          <p>
            Beslutet gällde Home och Charge. Easee Up, Max och Core har en inbyggd
            jordfelsbrytare typ A och DC-detektering enligt IEC 62955.
          </p>
        </div>
      </Section>

      <Section eyebrow="Installation" title={<>Så installeras laddboxen.</>}>
        <ul className="max-w-3xl space-y-3 text-[15.5px] leading-relaxed text-ink/75">
          <li>
            <strong>Egen jordfelsbrytare.</strong> Elsäkerhetsverket anger att
            varje laddningspunkt ska ha en egen jordfelsbrytare, inte sitta
            under husets gemensamma.
          </li>
          <li>
            <strong>Registrerad elektriker.</strong> Installationen ska göras av
            ett elinstallationsföretag som är registrerat hos
            Elsäkerhetsverket.
          </li>
          <li>
            <strong>Grönt avdrag.</strong> 50 % av arbete och material, vid fast
            pris 48,5 % av totalpriset, högst 50 000 kr per person och år.
            Arbete i elcentralen ger inte avdrag.
          </li>
        </ul>
      </Section>

      <Section eyebrow="Vanliga frågor" title={<>Frågor om att välja laddbox.</>}>
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
            { href: "/tjanster/laddboxar", label: "Laddbox hemma – så installerar vi", desc: "Lastbalansering, egen säkring och styrning mot elpriset." },
            { href: "/guider/installera-laddbox-hemma", label: "Vad kostar det att installera en laddbox?", desc: "Kostnad och krav 2026." },
            { href: "/guider/ladda-elbil-hemma-kostnad", label: "Vad kostar det att ladda elbilen hemma?", desc: "Elpris, nätavgift och laddbox." },
            { href: "/tjanster/batterier/jamforelse", label: "Jämför hembatterierna", desc: "Eway, SAJ HS3, Enershare, SigenStor och Fox ESS CQ7." },
          ]}
        />
        <CtaBlock
          className="mt-10"
          title="Vi hjälper dig välja rätt laddbox för ditt hus."
          primaryHref="/offert?tjanst=laddboxar"
        />
      </Section>
    </>
  );
}
