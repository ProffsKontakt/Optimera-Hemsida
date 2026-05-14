import Script from "next/script";
import { LegalLayout, H2, H3, P, UL } from "@/components/site/LegalLayout";

export const metadata = {
  title: "Cookies",
  description:
    "Hur Optimera Energi Sverige AB använder cookies på optimeraenergi.se.",
};

const COOKIEBOT_CBID = process.env.NEXT_PUBLIC_COOKIEBOT_CBID;

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Juridik"
      title="Cookie-policy"
      updatedAt="2026-05-09"
    >
      <P>
        Optimera Energi Sverige AB använder cookies och liknande tekniker
        på optimeraenergi.se. Här beskriver vi vilka cookies vi använder,
        i vilket syfte och hur du kan styra dem.
      </P>

      <H2>Vad är en cookie?</H2>
      <P>
        En cookie är en liten textfil som sparas i din webbläsare när du
        besöker en webbplats. Cookies används för att webbplatsen ska
        fungera, för att kunna känna igen dig vid återbesök och för att
        samla in data om hur webbplatsen används.
      </P>

      <H2>Vilka cookies vi använder</H2>
      {COOKIEBOT_CBID ? (
        <>
          <P>
            Listan nedan uppdateras automatiskt av Cookiebot och visar
            alltid de cookies som faktiskt sätts på optimeraenergi.se.
          </P>
          <div id="CookieDeclaration-wrapper" className="mt-4">
            <Script
              id="CookieDeclaration"
              src={`https://consent.cookiebot.com/${COOKIEBOT_CBID}/cd.js`}
              strategy="afterInteractive"
            />
          </div>
        </>
      ) : (
        <>
          <H3>Strikt nödvändiga cookies</H3>
          <P>
            Behövs för att webbplatsen ska fungera och kan inte stängas av.
          </P>
          <UL>
            <li>
              <strong>oe_admin</strong> – håller administratörer inloggade i
              den interna sektionen. Sätts bara om du loggar in på{" "}
              <code className="font-mono text-[13px]">/admin/login</code>.
            </li>
          </UL>

          <H3>Funktionella cookies / lokal lagring</H3>
          <UL>
            <li>
              <strong>localStorage</strong> – kalkylatorns konfiguration
              sparas i din webbläsare så att du inte tappar dina val om du
              laddar om sidan.
            </li>
          </UL>

          <H3>Analys</H3>
          <P>
            Vi använder för närvarande inga tredjepartsanalyser eller
            marknadsföringscookies. Om vi gör det i framtiden kommer vi att
            be om ditt samtycke först.
          </P>
        </>
      )}

      <H2>Hur du styr cookies</H2>
      {COOKIEBOT_CBID && (
        <P>
          Du kan när som helst ändra eller återkalla ditt samtycke via{" "}
          <a
            className="text-indigo underline"
            href="javascript:Cookiebot.renew()"
          >
            cookie-inställningarna
          </a>
          .
        </P>
      )}
      <P>
        Du kan även rensa eller blockera cookies via inställningarna
        i din webbläsare. Tänk på att vissa funktioner (t.ex. den interna
        admin-sektionen) inte fungerar utan strikt nödvändiga cookies.
      </P>
      <UL>
        <li>
          <a
            className="text-indigo underline"
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            className="text-indigo underline"
            href="https://support.mozilla.org/sv/kb/aktivera-och-inaktivera-cookies-webbplatsernas-installningar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            className="text-indigo underline"
            href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
      </UL>

      <H2>Frågor</H2>
      <P>
        Mejla{" "}
        <a className="text-indigo underline" href="mailto:hej@optimeraenergi.se">
          hej@optimeraenergi.se
        </a>{" "}
        så svarar vi.
      </P>
    </LegalLayout>
  );
}
