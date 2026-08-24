import { LegalLayout, H2, H3, P, UL } from "@/components/site/LegalLayout";

export const metadata = {
  title: "Villkor",
  description:
    "Allmänna villkor för Optimera Energilösningar i Mälardalen AB:s tjänster och webbplats.",
  alternates: { canonical: "/villkor" },
};

export default function VillkorPage() {
  return (
    <LegalLayout
      eyebrow="Juridik"
      title="Allmänna villkor"
      updatedAt="2026-05-09"
    >
      <P>
        Dessa allmänna villkor gäller mellan dig som kund och Optimera Energi
        Sverige AB (org.nr 559375-2206), nedan kallat "Optimera". Genom att
        beställa en tjänst, ingå avtal eller besöka optimeraenergi.se
        accepterar du villkoren nedan.
      </P>

      <H2>1. Bolagsuppgifter</H2>
      <P>
        Optimera Energilösningar i Mälardalen AB, Vallgatan 9, 170 67 Solna. Org.nr
        559375-2206. F-skatt registrerad. Mejla{" "}
        <a className="text-indigo underline" href="mailto:hej@optimeraenergi.se">
          hej@optimeraenergi.se
        </a>{" "}
        eller ring 076 305 37 32 vid frågor.
      </P>

      <H2>2. Offert och avtal</H2>
      <P>
        En offert från Optimera är giltig i 30 dagar om inget annat anges.
        Avtal mellan dig och oss uppstår först när du skriftligen accepterat
        offerten eller signerat installationsavtalet. Beräkningar gjorda i
        vår kalkylator är estimat och utgör inte ett bindande pris förrän
        offert lämnats.
      </P>

      <H2>3. Pris och betalning</H2>
      <UL>
        <li>
          Offerten anger totalpris inklusive moms efter eventuella avdrag
          (grön teknik / ROT) baserat på de förutsättningar du uppgett.
        </li>
        <li>
          Optimera ansöker om grön teknik-avdrag eller ROT-avdrag i ditt
          namn när du har rätt till det och godkänt det skriftligen.
        </li>
        <li>
          Faktura skickas vid leveranstillfälle eller delfaktureras enligt
          avtal. Betalningstid 14 dagar om inget annat avtalats.
        </li>
        <li>
          Vid försenad betalning utgår dröjsmålsränta enligt räntelagen
          samt påminnelseavgift enligt inkassolagen.
        </li>
      </UL>

      <H2>4. Ångerrätt</H2>
      <P>
        Som privatperson har du 14 dagars ångerrätt enligt distansavtalslagen
        från det att avtalet ingåtts. Ångerrätten gäller inte om du
        uttryckligen begärt att vi ska påbörja arbetet inom ångerfristen och
        arbetet är fullgjort. Vid utnyttjande av ångerrätten ska du kontakta
        oss skriftligen via mejl.
      </P>

      <H2>5. Installation och leverans</H2>
      <UL>
        <li>
          Installationsdatum bekräftas senast 14 dagar innan arbetet
          påbörjas.
        </li>
        <li>
          Du ansvarar för att fastigheten är tillgänglig och att vi har
          tillgång till el och vatten under installationsarbetet.
        </li>
        <li>
          Ändringar i förutsättningarna efter att avtalet ingåtts kan leda
          till tilläggskostnader, vilka faktureras separat efter
          överenskommelse.
        </li>
      </UL>

      <H2>6. Garantier</H2>
      <P>
        Optimera lämnar fem (5) års garanti på utfört arbete. Garantitiden
        på installerad utrustning gäller enligt respektive tillverkares
        garantivillkor (vanligtvis 10–30 år beroende på produkt). Garantin
        omfattar inte skador orsakade av yttre påverkan, felaktigt nyttjande
        eller bristande underhåll.
      </P>

      <H2>7. Reklamation</H2>
      <P>
        Reklamation ska ske utan oskäligt dröjsmål från det att fel
        upptäckts, dock senast två månader därefter. Konsumenter har även
        rätt enligt konsumenttjänstlagen att reklamera fel inom tre år.
      </P>

      <H2>8. Ansvar</H2>
      <P>
        Optimera ansvarar för skada som vi orsakat genom vårdslöshet i
        utförandet av tjänsten. Optimeras totala ansvar är begränsat till
        det avtalade priset för tjänsten, om inget annat följer av
        tvingande lag.
      </P>

      <H2>9. Force majeure</H2>
      <P>
        Optimera är befriat från ansvar för förseningar eller bristfällig
        leverans som beror på omständigheter utanför vår kontroll
        (leverantörsbrist, myndighetsbeslut, naturhändelser, m.m.).
      </P>

      <H2>10. Tvist</H2>
      <P>
        Tvister med anledning av detta avtal ska i första hand lösas i
        samråd. Kommer parterna inte överens kan tvisten avgöras av
        Allmänna reklamationsnämnden (ARN) eller allmän domstol med Solna
        tingsrätt som första instans.
      </P>

      <H3>Ändringar</H3>
      <P>
        Vi förbehåller oss rätten att uppdatera dessa villkor. Datumet högst
        upp visar när villkoren senast ändrades.
      </P>
    </LegalLayout>
  );
}
