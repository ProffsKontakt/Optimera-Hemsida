import { organizationSchema } from "@/components/seo/JsonLd";
import { SOLAR_CATEGORIES, allQuestions } from "@/lib/solcellsfragor";
import { BATTERY_GROUPS, allConcepts } from "@/lib/batteriskolan";
import { publishedGuides } from "@/lib/guides";
import { getGuideContent } from "@/lib/guide-content";
import { publishedNews } from "@/lib/news";
import { VISIBLE_SERVICES, type ServiceSlug } from "@/lib/services";
import { RECO } from "@/lib/reco";

/**
 * /llms.txt – sajten sammanfattad för AI-assistenter (llmstxt.org).
 *
 * Genereras från samma data som sidorna (ersatte den statiska filen i
 * public/ i okt 2026, som hann bli inaktuell och inte listade en enda
 * sida i kunskapsbanken). Varje fråga, koncept och guide listas med sitt
 * korta svar – en AI som läser filen får svaret direkt och en sida att
 * citera. Uppdateras automatiskt när rutinerna lägger till sidor.
 *
 * Inga siffror om våra egna erbjudanden här – de står på respektive sida
 * med sina förutsättningar.
 */
export const dynamic = "force-static";

const BASE = "https://optimeraenergi.se";

const SERVICE_LINES: Record<ServiceSlug, string> = {
  solpaneler: "solcellsanläggningar på villatak, dimensionerade efter takets läge och hushållets förbrukning",
  batterier: "batterilager för egen solel, flytt av förbrukning till billiga timmar och lägre effekttoppar",
  vaermepumpar: "bergvärme, luft-vattenvärmepumpar och frånluftsvärmepumpar",
  laddboxar: "laddboxar för elbil med lastbalansering mot husets säkringar",
};

/** En rad per sida: rubrik, länk och kort svar. Radbrytningar i svaret plattas till. */
const item = (title: string, href: string, answer: string, updated?: string) =>
  `- [${title}](${BASE}${href}): ${answer.replace(/\s+/g, " ").trim()}${updated ? ` (Uppdaterad ${updated}.)` : ""}`;

export function GET() {
  const org = organizationSchema;
  const questions = allQuestions();
  const concepts = allConcepts();
  const guides = publishedGuides();
  const out: string[] = [];
  const push = (...l: string[]) => out.push(...l);

  push(
    "# Optimera Energi",
    "",
    `> Optimera Energi (${org.legalName}, org.nr 559375-2206) installerar solpaneler, batterilager, värmepumpar och laddboxar för villaägare i Stockholmsområdet – för dig som vill Optimera din energianvändning. Kontor i Solna. Installationerna görs av noggrant utvalda installatörer, och priset på offerten är priset på fakturan. Kunskapsbanken nedan svarar på vanliga frågor om solceller, batterier, värmepumpar, laddboxar, elpris och avdrag, alltid med källor.`,
    "",
    "## Företagsinformation",
    "",
    `- Juridiskt namn: ${org.legalName} (tidigare Optimera Energi Sverige AB)`,
    "- Organisationsnummer: 559375-2206",
    `- Adress: ${org.address.streetAddress}, ${org.address.postalCode} ${org.address.addressLocality}`,
    "- Telefon: 076 305 37 32",
    `- E-post: ${org.email}`,
    "- Tjänsteområde: Stockholms län (elområde SE3)",
    `- Omdömen: ${RECO.average} av 5 på Reco (${RECO.count} omdömen): ${RECO.url}`,
    ...org.sameAs.map((u) => `- ${u}`),
    "",
    "## Tjänster",
    "",
    ...VISIBLE_SERVICES.map((s) => `- [${s.name}](${BASE}/tjanster/${s.slug}): ${SERVICE_LINES[s.slug]}.`),
    "",
    "## Kunskapsbank",
    "",
    `Samlingssida med sökfunktion: ${BASE}/kunskapsbank. Varje sida börjar med ett kort svar och listar sina källor (Skatteverket, Energimyndigheten, Ei, Svenska kraftnät m.fl.).`,
    "",
    `### Solcellsfrågor (${questions.length} frågor)`,
  );
  for (const c of SOLAR_CATEGORIES) {
    const qs = questions.filter((q) => q.category === c.slug);
    if (!qs.length) continue;
    push("", `#### ${c.title}`, "");
    for (const q of qs) push(item(q.question, `/solcellsfragor/${q.slug}`, q.shortAnswer, q.updatedAt));
  }

  push("", `### Batteriskolan (${concepts.length} koncept)`);
  for (const g of BATTERY_GROUPS) {
    const cs = concepts.filter((c) => c.group === g.slug);
    if (!cs.length) continue;
    push("", `#### ${g.title}`, "");
    for (const c of cs) push(item(c.title, `/batteriskolan/${c.slug}`, c.shortAnswer, c.updatedAt));
  }

  push("", "### Guider", "");
  for (const g of guides) {
    const content = getGuideContent(g.slug);
    push(item(g.title, `/guider/${g.slug}`, content?.answer ?? g.excerpt, g.updatedAt));
  }

  push(
    "",
    "### Nyheter",
    "",
    `Energinyheter och elpolitik ur ett villaägarperspektiv, ny artikel var tredje dag: ${BASE}/nyheter`,
    "",
    ...publishedNews()
      .slice(0, 8)
      .map((n) => `- [${n.title}](${BASE}/nyheter/${n.slug}) (${n.publishedAt})`),
    "",
    "## Viktiga sidor",
    "",
    `- [Kalkylator](${BASE}/kalkylator): bygg sol, batteri och laddbox i 3D och se riktningen på investering och återbetalning`,
    `- [Solcellsbatteri till villa](${BASE}/solcellsbatteri): pris, storlek, avdrag och när ett batteri passar`,
    `- [Frågor och svar](${BASE}/fragor-och-svar): hembesök, garanti, märken och hur vi arbetar`,
    `- [Metodik](${BASE}/metodik): hur vi väljer produkter, sätter pris och dimensionerar`,
    `- [Om oss](${BASE}/om-oss): teamet och vem du ska kontakta`,
    `- [Begär offert eller hembesök](${BASE}/offert)`,
    `- [Kontakt](${BASE}/kontakt)`,
    "",
    "## Juridik",
    "",
    `- [Integritetspolicy](${BASE}/integritet)`,
    `- [Villkor](${BASE}/villkor)`,
    `- [Cookies](${BASE}/cookies)`,
    "",
  );

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
