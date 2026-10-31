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
 * Zaptec Go 2 mot Easee Up, plus Charge Amps Halo – laddboxarna vi
 * installerar. Allt tekniskt kommer från tillverkarnas produktblad och
 * hjälpsidor, regler från Elsäkerhetsverket och Skatteverket. Uppgifterna
 * kontrollerades 2026-10-31 och står i källistan längst ned. Inga priser
 * per märke – totalpriset med installation tas fram i offerten.
 */
const PATH = "/tjanster/laddboxar/jamforelse";
const UPDATED = "2026-10-31";
const TITLE = "Zaptec Go 2 eller Easee Up – vilken laddbox ska jag välja?";
const DESCRIPTION =
  "Zaptec Go 2, Easee Up och Charge Amps Halo jämförda: effekt, jordfelsskydd, MID-mätare, solladdning, IT-nät, mått och garanti enligt tillverkarnas produktblad.";

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
  { title: "Smart laddning", publisher: "Easee", url: "https://support.easee.com/hc/sv/articles/33123627163281" },
  { title: "Halo – produktblad", publisher: "Charge Amps", url: "https://www.chargeamps.com/app/uploads/2026/05/ChargeAmps_Halo_SV_260520.pdf" },
  { title: "Halo – installationsmanual", publisher: "Charge Amps", url: "https://www.chargeamps.com/app/uploads/2026/01/Charge-Amps-Halo-Installation-Manual_rev.05_sv_se.pdf" },
  { title: "Garantivillkor", publisher: "Charge Amps", url: "https://www.chargeamps.com/warranty-policy/" },
  { title: "Easee AS tvingas säljstoppa elbilsladdare", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/lag-och-ratt/forsaljningsforbud-och-andra-atgarder/forsaljningsforbud/2023/2023-03-17-easee-as-tvingas-saljstoppa-elbilsladdare" },
  { title: "Beslut 22EV1261-73 (2024-04-19)", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/download/18.61e3166919c985b82d68995/1772712663153/22EV1261-73_Beslut.pdf" },
  { title: "Installera din laddningspunkt", publisher: "Elsäkerhetsverket", url: "https://elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-elbilsladdare/installera-din-laddningspunkt" },
  { title: "Så fungerar skattereduktion för grön teknik", publisher: "Skatteverket", url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html" },
  { title: "Godkända arbeten – grön teknik", publisher: "Skatteverket", url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html" },
];

const FAQ = [
  {
    q: "Vilken laddbox är bäst, Zaptec Go 2 eller Easee Up?",
    a: "Båda laddar upp till 22 kW på trefas, har typ 2-uttag, IP54 och 5 års garanti. Zaptec Go 2 har MID-certifierad energimätare, 4G-uppkoppling och Eco-läge som laddar de billigaste timmarna enligt Nord Pool. Easee Up har en inbyggd jordfelsbrytare typ A och laddar trefas även på IT-nät. Vilken som passar beror på om du behöver MID-mätare, vilket elnät huset har och om laddboxen ska styras mot solceller.",
  },
  {
    q: "Behöver jag en extra jordfelsbrytare till laddboxen?",
    a: "Elsäkerhetsverket anger att varje laddningspunkt ska ha en egen jordfelsbrytare och inte sitta under husets gemensamma. Zaptec Go 2 och Charge Amps Halo har inbyggd 6 mA DC-detektering men kräver en separat jordfelsbrytare typ A. Easee Up har en jordfelsbrytare typ A inbyggd, men Easee kräver ändå en extern om inte kretsen är byggd i klass II och bara matar laddboxen. Elektrikern avgör vad som krävs i ditt hus.",
  },
  {
    q: "Kan laddboxen ladda på överskottet från solcellerna?",
    a: "Zaptecs egen solladdning via Zaptec Sense erbjuds inte i Sverige, så Zaptec Go 2 behöver ett externt styrsystem via OCPP eller API för att ladda på solöverskott. Easee Up laddar på solöverskott med tillbehöret Easee Equalizer, och Charge Amps Halo med Green Charging. Vi kopplar ihop laddboxen med solceller och batteri när vi installerar.",
  },
  {
    q: "Vad är en MID-mätare och behöver jag det?",
    a: "MID är EU:s direktiv för mätinstrument. En MID-certifierad energimätare är godkänd för debitering, vilket kan spela roll om arbetsgivaren ska ersätta laddningen av en tjänstebil. Zaptec Go 2 har en MID-certifierad mätare (klass B). Easee Up har en inbyggd mätare som inte är MID-godkänd – Easees modell Charge Max har MID.",
  },
  {
    q: "Fungerar laddboxen på IT-nät?",
    a: "Ja, alla tre fungerar på IT-nät, men med olika effekt. Easee Up laddar trefas upp till 12,7 kW på IT-nät. Zaptec Go 2 är inställd på enfas på IT-nät, men trefas upp till 12,7 kW kan aktiveras. Charge Amps Halo laddar bara enfas på IT-nät.",
  },
  {
    q: "Får jag grönt avdrag för laddbox?",
    a: "Ja. Skattereduktionen för grön teknik är 50 % av arbete och material för en laddningspunkt, högst 50 000 kr per person och år. Vid fast pris räknas 97 % av priset som arbete och material, så avdraget blir 48,5 % av totalpriset. Laddboxen ska ha typ 2-uttag, bara användas av hushållet och vara förberedd för mätning. Arbete i elcentralen ger inte avdrag.",
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
            "Zaptec Go 2 eller Easee",
            "Zaptec Go 2 vs Easee Up",
            "bästa laddbox 2026",
            "jämför laddbox",
            "Easee Up",
            "Zaptec Go 2",
            "Charge Amps Halo",
            "laddbox villa",
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
            Zaptec Go 2 eller Easee Up,{" "}
            <span className="italic font-serif text-indigo">jämförda.</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
            Zaptec Go 2 och Easee Up är de laddboxar vi installerar oftast, och
            Charge Amps Halo är alternativet med fast kabel. Här är skillnaderna
            som spelar roll i en villa: jordfelsskydd, energimätare,
            solladdning och elnätet.
          </p>
          <div className="mt-6">
            <LastUpdated date={UPDATED} label="Uppdaterad" />
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <AnswerBox question="Zaptec Go 2 eller Easee Up – vilken ska jag välja?">
          <p>
            <strong>
              Välj Zaptec Go 2 om du behöver en MID-certifierad energimätare
              eller vill ha 4G-uppkoppling. Välj Easee Up om huset har IT-nät
              eller om du vill ha jordfelsbrytaren inbyggd i boxen.
            </strong>{" "}
            Båda laddar upp till 22 kW på trefas, har typ 2-uttag, klarar IP54
            och IK10 och har 5 års garanti. Ingen av dem laddar på solöverskott
            utan tillbehör eller externt styrsystem.
          </p>
        </AnswerBox>
      </Section>

      <Section eyebrow="Jämförelse" title={<>Fakta, sida vid sida.</>}>
        <ComparisonTable
          columns={["", "Zaptec Go 2", "Easee Up"]}
          rows={[
            { label: "Max effekt, trefas (TN-nät)", cells: ["22 kW (32 A)", "22 kW (32 A)"] },
            { label: "Enfas", cells: ["7,4 kW (32 A)", "1,4–7,4 kW (6–32 A)"] },
            {
              label: "IT-nät",
              cells: ["Enfas som standard, trefas upp till 12,7 kW kan aktiveras", "Trefas 2,4–12,7 kW"],
            },
            { label: "Anslutning", cells: ["Typ 2-uttag, kabeln kan låsas fast", "Typ 2-uttag, kabeln kan låsas fast"] },
            {
              label: "Jordfelsskydd",
              cells: [
                "Inbyggd 6 mA DC-detektering. Kräver separat jordfelsbrytare typ A 30 mA.",
                "Inbyggd jordfelsbrytare typ A 30 mA och 6 mA DC-detektering. Extern behövs ändå om kretsen inte är byggd i klass II och bara matar laddboxen.",
              ],
            },
            { label: "Energimätare", cells: ["MID-certifierad (klass B)", "Inbyggd, inte MID-godkänd"] },
            {
              label: "Lastbalansering",
              cells: [
                "Upp till 3 boxar delar effekten. Skydd av huvudsäkringen kräver Zaptec Sense.",
                "Upp till 3 boxar på samma krets. Skydd av huvudsäkringen kräver Easee Equalizer.",
              ],
            },
            {
              label: "Solladdning",
              cells: [
                "Zaptecs egen solladdning finns inte i Sverige – kräver externt styrsystem via OCPP eller API",
                "Med Easee Equalizer",
              ],
            },
            {
              label: "Billiga timmar",
              cells: ["Eco-läge väljer de billigaste timmarna enligt Nord Pool", "Smart laddning med ett pristak du väljer"],
            },
            {
              label: "Uppkoppling",
              cells: ["4G, wifi, Bluetooth, RFID. OCPP 1.6J", "LTE-M, wifi, Bluetooth, RFID/NFC. OCPP 1.6J"],
            },
            { label: "Mått och vikt", cells: ["239 × 178 × 73 mm, 1,6 kg", "256 × 193 × 106 mm, 1,5 kg"] },
            { label: "Tålighet", cells: ["IP54, IK10, −30 till +50 °C", "IP54, IK10, −30 till +40 °C"] },
            { label: "Garanti", cells: ["5 år", "5 år"] },
          ]}
          caption="Jämförelse av Zaptec Go 2 och Easee Up: effekt, IT-nät, jordfelsskydd, energimätare, lastbalansering, solladdning, uppkoppling, mått och garanti."
          footnote="Enligt tillverkarnas produktblad och hjälpsidor, kontrollerat 31 oktober 2026. Totalpriset med installation står i offerten."
        />
      </Section>

      <Section eyebrow="Vilken passar dig?" title={<>Tre laddboxar, tre styrkor.</>}>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              t: "Zaptec Go 2",
              k: "MID-mätare och 4G",
              b: "Välj Zaptec Go 2 om laddningen ska kunna debiteras, till exempel för en tjänstebil – energimätaren är MID-certifierad. Boxen har 4G och fungerar även där wifi inte når, och Eco-läget laddar de billigaste timmarna enligt Nord Pool. Den behöver en separat jordfelsbrytare typ A.",
            },
            {
              t: "Easee Up",
              k: "Jordfelsbrytare inbyggd",
              b: "Välj Easee Up om huset har IT-nät – den laddar trefas upp till 12,7 kW där – eller om du vill ha jordfelsbrytaren inbyggd. Med Easee Equalizer laddar den på solöverskott och skyddar huvudsäkringen. Mätaren är inte MID-godkänd.",
            },
            {
              t: "Charge Amps Halo",
              k: "Fast kabel och extra uttag",
              b: "Välj Halo om du vill ha en fast kabel på 7,5 meter och ett extra vanligt eluttag på boxen. Den laddar upp till 11 kW på trefas eller 7,4 kW på enfas, tål IP66 och −35 °C och ansluts via wifi eller nätverkskabel. På IT-nät laddar den bara enfas.",
            },
          ].map((c) => (
            <li key={c.t} className="rounded-3xl border border-ink/10 bg-bone p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">{c.k}</div>
              <h3 className="mt-3 font-display text-2xl tracking-display-tight">{c.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{c.b}</p>
            </li>
          ))}
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
            Beslutet gällde Home och Charge. Easee Up har en inbyggd
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
            { href: "/kalkylator", label: "Kalkylatorn", desc: "Bygg sol, batteri och laddbox i 3D." },
          ]}
        />
        <CtaBlock
          className="mt-10"
          title="Vi hjälper dig välja rätt laddbox för ditt hus."
          primaryHref="/offert?tjanst=laddboxar"
        />
        <p className="mt-6 text-[13.5px] text-ink/55">
          Funderar du på batteri också?{" "}
          <Link href="/tjanster/batterier/jamforelse" className="text-indigo underline underline-offset-2 inline-flex items-center gap-1">
            Jämför hembatterierna <ArrowRight size={13} />
          </Link>
        </p>
      </Section>
    </>
  );
}
