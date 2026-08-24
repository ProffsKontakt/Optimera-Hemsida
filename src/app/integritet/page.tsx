import { LegalLayout, H2, H3, P, UL } from "@/components/site/LegalLayout";

export const metadata = {
  title: "Integritetspolicy",
  description:
    "Så hanterar Optimera Energilösningar i Mälardalen AB dina personuppgifter enligt GDPR.",
  alternates: { canonical: "/integritet" },
};

export default function IntegritetPage() {
  return (
    <LegalLayout
      eyebrow="Juridik"
      title="Integritetspolicy"
      updatedAt="2026-05-09"
    >
      <P>
        Optimera Energilösningar i Mälardalen AB (org.nr 559375-2206), Vallgatan 9, 170 67
        Solna, är personuppgiftsansvarig för behandling av dina
        personuppgifter när du kontaktar oss, begär offert eller besöker
        optimeraenergi.se. Den här integritetspolicyn beskriver vilka
        uppgifter vi samlar in, varför vi gör det och vilka rättigheter du
        har enligt EU:s dataskyddsförordning (GDPR).
      </P>

      <H2>Vilka uppgifter vi samlar in</H2>
      <P>
        Vi samlar in uppgifter du själv lämnar till oss, samt teknisk data
        från ditt besök på vår webbplats. Konkret kan det handla om:
      </P>
      <UL>
        <li>Namn, telefonnummer, e-postadress och bostadsadress.</li>
        <li>
          Information om ditt hus och dina energibehov som du lämnar via
          offertformulär eller hembesök.
        </li>
        <li>
          Konfigurationen du gjort i vår kalkylator (val av paneler,
          batteri, värmepump etc.) som vi använder som utgångspunkt för
          offerten.
        </li>
        <li>
          Teknisk data: IP-adress, webbläsare, sidor du besökt, samt
          tidpunkter, för att kunna drifta sajten och förebygga missbruk.
        </li>
      </UL>

      <H2>Varför vi behandlar uppgifterna</H2>
      <UL>
        <li>
          <strong>Avtal och offert.</strong> För att kunna ta fram en
          offert, planera ett hembesök och utföra den installation du
          beställt. Rättslig grund: avtal.
        </li>
        <li>
          <strong>Kundservice och uppföljning.</strong> För att kunna
          besvara frågor, hantera garantiärenden och följa upp installerade
          system. Rättslig grund: berättigat intresse.
        </li>
        <li>
          <strong>Bokföring och regelefterlevnad.</strong> För att uppfylla
          krav i bokföringslagen och annan tvingande lagstiftning. Rättslig
          grund: rättslig förpliktelse.
        </li>
        <li>
          <strong>Förbättring av tjänsten.</strong> För att utveckla våra
          produkter, processer och rådgivning. Rättslig grund: berättigat
          intresse.
        </li>
      </UL>

      <H2>Hur länge vi sparar uppgifterna</H2>
      <P>
        Personuppgifter sparas så länge det är nödvändigt för respektive
        ändamål, eller så länge svensk lag kräver. Bokföringsmaterial
        sparas i minst sju år enligt bokföringslagen. Offertdata och
        kunduppgifter sparas i max fem år efter senaste kontakt om du inte
        är kund hos oss; under hela kundrelationen plus tio år om du är
        kund (för garantier och uppföljning av installation).
      </P>

      <H2>Vilka vi delar uppgifterna med</H2>
      <P>
        Vi delar uppgifter med betrodda underleverantörer som hjälper oss
        drifta verksamheten. Det kan vara:
      </P>
      <UL>
        <li>
          E-post- och kommunikationsplattformar (t.ex. Resend, Google
          Workspace).
        </li>
        <li>Hosting- och webbplattform (Vercel).</li>
        <li>CRM- och ärendehantering (vårt interna system KT Central).</li>
        <li>
          Bokförings- och faktureringsleverantörer (anlitade revisorer
          och bokföringssystem).
        </li>
        <li>
          Tillverkare av installerad utrustning, för registrering av
          garantier.
        </li>
      </UL>
      <P>
        Alla underleverantörer är skyldiga genom personuppgiftsbiträdesavtal
        att behandla dina uppgifter på ett säkert sätt och bara för det
        ändamål de fått dem.
      </P>

      <H2>Överföring utanför EU/EES</H2>
      <P>
        Vissa av våra leverantörer (t.ex. molntjänster) kan ha resurser
        utanför EU/EES. När så sker säkerställer vi adekvat skyddsnivå med
        EU-kommissionens standardklausuler eller motsvarande.
      </P>

      <H2>Dina rättigheter</H2>
      <UL>
        <li>
          Rätt att begära ut ett registerutdrag över de uppgifter vi har om
          dig.
        </li>
        <li>Rätt att få felaktiga uppgifter rättade.</li>
        <li>
          Rätt att begära radering (dock med begränsningar för t.ex.
          bokföringsmaterial).
        </li>
        <li>Rätt att invända mot direktmarknadsföring.</li>
        <li>
          Rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).
        </li>
      </UL>

      <H2>Kontakt i dataskyddsfrågor</H2>
      <P>
        Mejla <a className="text-indigo underline" href="mailto:hej@optimeraenergi.se">hej@optimeraenergi.se</a>{" "}
        eller ring 076 305 37 32 så hjälper vi dig.
      </P>

      <H3>Ändringar i policyn</H3>
      <P>
        Vi uppdaterar policyn vid behov. Datumet högst upp visar när den
        senast ändrades. Vid större förändringar informerar vi dig via
        e-post om vi har ditt samtycke.
      </P>
    </LegalLayout>
  );
}
