# AI-search / AEO / GEO – implementation

_Senast uppdaterad: 2026-07-07_

Det här dokumentet beskriver den tekniska och strukturella AI-search-uppgraderingen
av optimeraenergi.se. Målet är ökad synlighet i answer engines – ChatGPT Search,
Google AI Overviews / AI Mode, Bing Copilot, Perplexity och Claude Search – när
svenska villaägare frågar om solcellsbatterier, grönt avdrag, batteristorlek, pris
och installatörer.

Arbetet är gjort som en **förbättring av den befintliga sajten**, inte en
nybyggnation. Befintlig design, befintliga komponenter och befintlig data
återanvänds genomgående; nytt skapas bara där det saknades.

---

## 1. Stack (kontext)

| Område | Värde |
| --- | --- |
| Ramverk | Next.js 14.2.15 (App Router) |
| Språk | TypeScript, React 18 |
| Styling | Tailwind CSS (design-tokens i `tailwind.config.ts` + `globals.css`) |
| Rendering | Övervägande **statiskt prerenderad** (SSG) – viktiga texter finns i initial HTML |
| Metadata | Next.js Metadata API (per-route `metadata` / `generateMetadata`) |
| Hosting | Vercel |
| Domän | https://optimeraenergi.se (`NEXT_PUBLIC_SITE_URL`) |

Alla informationssidor är statiska (`○ (Static)` i build-outputen), vilket betyder
att crawlers som inte kör JavaScript ändå ser hela innehållet.

---

## 2. Vad som redan fanns (utgångsläge)

Sajten hade redan en ovanligt stark teknisk SEO-grund:

- **`src/app/robots.ts`** – dynamisk robots med AI-crawlers explicit tillåtna.
- **`src/app/sitemap.ts`** – dynamisk sitemap med hårdkodade `lastmod`-datum.
- **`src/components/seo/JsonLd.tsx`** – rik uppsättning Schema.org-hjälpare
  (Organization, LocalBusiness/ElectricalContractor, WebSite, BreadcrumbList,
  Service, FAQPage, VideoObject, CollectionPage, AboutPage, ContactPage,
  ReserveAction).
- **`src/app/layout.tsx`** – global metadata (title-template, description, Open
  Graph, Twitter, canonical, robots, verification, `metadataBase`).
- **`public/llms.txt`** – redan skapad med företagsfakta och viktiga sidor.
- **Per-route metadata** på tjänster, kalkylator, om oss, offert, batteri- och
  solceller-stadssidor.
- **FAQ-data** per tjänst och på kalkylatorn (men se gap nedan).
- **Säkerhetshuvuden** (HSTS, X-Content-Type-Options m.fl.) i `next.config.mjs`.

### Gap-analys

| Område | Status före | Problem | Åtgärd | Prioritet |
| --- | --- | --- | --- | --- |
| robots.txt | Fanns | Saknade nyare Anthropic-bots (Claude-SearchBot, Claude-User) och explicit Googlebot/Bingbot | La till dem + Meta-ExternalAgent m.fl. | Hög |
| sitemap.xml | Fanns | Saknade nya pelarsidor | La till `/solcellsbatteri`, `/metodik`, `/fragor-och-svar` | Hög |
| schema | Fanns | Saknade `Article`/`TechArticle` för innehållssidor | La till `articleSchema()`-hjälpare | Medel |
| FAQ-rendering | Fanns (delvis) | Svaren renderades **client-only** (`{open && …}`) → saknades i initial HTML; på kalkylatorn fanns FAQ bara som schema utan synlig text | Refaktorerade `Disclosure` så svaret alltid finns i server-HTML; gjorde kalkylatorns FAQ synlig | **Hög (GEO)** |
| solcellsbatteri-sida | Saknades | Sajten hade `/tjanster/batterier` men ingen sida på det dominerande sökordet "solcellsbatteri" | Skapade pelarsidan `/solcellsbatteri` | **Hög** |
| FAQ-hub | Saknades | Ingen samlad frågor-och-svar-sida | Skapade `/fragor-och-svar` | Medel |
| Metodik / trust | Saknades | Ingen sida som förklarar hur ni arbetar (E-E-A-T) | Skapade `/metodik` | Medel |
| AEO-block | Saknades | Inga återanvändbara "kort svar"/"key takeaways"/jämförelse-block | Byggde `src/components/seo/aeo.tsx` | Hög |
| Internlänkning | Delvis | Batteri-touchpoints länkade inte till en central batterihubb | Korslänkar från tjänst-, stads- och kalkylatorsidor med beskrivande ankartext | Medel |
| Synliga brödsmulor | Saknades | Bara breadcrumb-**schema**, ingen synlig navigering | `Breadcrumbs`-komponent (synlig + schema) | Låg |

---

## 3. Vad som ändrades och skapades

### Härdning (crawlbarhet + rendering)

- **`src/app/robots.ts`** – utökad crawler-lista: `Googlebot`, `Bingbot`,
  `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`,
  `Claude-SearchBot`, `Claude-User`, `anthropic-ai`, `PerplexityBot`,
  `Perplexity-User`, `Google-Extended`, `GoogleOther`, `FacebookBot`,
  `Meta-ExternalAgent`, `Amazonbot`, `DuckAssistBot`, `Applebot-Extended`,
  `Bytespider`, `cohere-ai`. Alla tillåts (`allow: /`) med samma disallow-lista
  (`/admin`, `/api`, `/studio`). Pekar på `sitemap.xml`.
- **`src/components/site/Disclosure.tsx`** – FAQ-svaret renderas nu **alltid** i
  DOM:en (höjden clippas när panelen är kollapsad, barnen finns kvar i
  server-HTML). Tidigare låg svaret bakom `{open && …}` och saknades helt i
  initial HTML – då kunde AI-motorer bara läsa svaret via JSON-LD, aldrig som
  synlig, citerbar passage. Ingen opacity-döljning används (undviker
  "hidden text"-heuristiker).

### Nya återanvändbara AEO-komponenter (`src/components/seo/aeo.tsx`)

Alla server-renderade, riktig HTML, matchar designsystemet:

| Komponent | Syfte |
| --- | --- |
| `AnswerBox` | "Kort svar" nära toppen – led med fetstilt kärnmening som AI citerar |
| `KeyTakeaways` | Punktlista med det viktigaste |
| `ComparisonTable` | Semantisk `<table>` med `<th scope>`, horisontellt scrollbar |
| `ProsCons` | "När passar detta / När passar det inte" |
| `FaqBlock` | Synliga frågor/svar (via `Disclosure`) + FAQPage-schema i ett anrop |
| `RelatedPages` | Intern länkning med beskrivande ankartext |
| `LastUpdated` | Synlig "senast uppdaterad" med maskinläsbar `<time>` |
| `Breadcrumbs` | Synliga brödsmulor + BreadcrumbList-schema |
| `MethodologyCallout` | Förklarar hur en siffra/rekommendation tas fram (E-E-A-T) |
| `CtaBlock` | Återanvänd offert-CTA |

### Nya sidor

| URL | Typ | Innehåll |
| --- | --- | --- |
| `/solcellsbatteri` | Pelarsida (viktigast) | Kort svar, key takeaways, pris, grönt avdrag, jämförelsetabell (Easyway/SAJ HS3/Emaldo), när passar/passar inte, dimensionering, stödtjänster, FAQ, relaterat, CTA. Schema: TechArticle + Service + FAQPage + BreadcrumbList |
| `/fragor-och-svar` | FAQ-hub | ~19 frågor i 5 kategorier. Ett samlat FAQPage-schema + CollectionPage |
| `/metodik` | Trust / E-E-A-T | Sex principer + köpguide "så utvärderar du en installatör". Schema: Article + AboutPage + BreadcrumbList |

### Förbättrade befintliga sidor

- **`src/app/kalkylator/page.tsx`** – statisk förklaringstext ("så fungerar
  kalkylatorn"), key takeaways, metodik-callout, **synlig FAQ** (matchar schemat),
  relaterade sidor och tydlig CTA till offert. Brödsmulor tillagda.
- **`src/app/tjanster/[slug]/page.tsx`** – batteri-tjänsten korslänkar till
  `/solcellsbatteri` med beskrivande ankartext.
- **`src/app/batteri/[stad]/page.tsx`** – stadssidorna korslänkar till
  `/solcellsbatteri`.
- **`src/components/site/Footer.tsx`** – `Solcellsbatteri` under Tjänster;
  `Metodik` och `Frågor & svar` under Företaget.
- **`src/components/seo/JsonLd.tsx`** – ny `articleSchema()`-hjälpare.
- **`src/app/sitemap.ts`** – nya sidor + bumpade lastmod för kalkylatorn.
- **`public/llms.txt`** – nya sidor tillagda (endast befintliga URL:er).

---

## 4. Hur systemen fungerar (för framtida underhåll)

### Metadata
Global default i `src/app/layout.tsx` (`metadataBase`, title-template
`%s · Optimera Energi`, OG, Twitter). Varje sida exporterar egen `metadata`
(eller `generateMetadata`) med **unik** title, description och `alternates.canonical`.
Canonical anges alltid relativt (t.ex. `/solcellsbatteri`) – `metadataBase` gör
den absolut.

### Schema.org / JSON-LD
Alla scheman byggs i `src/components/seo/JsonLd.tsx` och renderas via
`<JsonLd data={…} />`. Organization + WebSite ligger globalt i layouten. Sid-
specifika scheman läggs i respektive `page.tsx`. `@id`-referenser knyter ihop
noderna (t.ex. `#organization`, `#website`, `#localbusiness`) så motorerna ser
dem som samma entitet.

**Regel:** schema ska matcha synligt innehåll. `FaqBlock` gör det automatiskt
(synlig FAQ + schema från samma data). Fabricera aldrig adress, betyg, priser
eller certifieringar i schema.

### Sitemap
`src/app/sitemap.ts` genererar `/sitemap.xml`. Statiska sidor listas explicit;
dynamiska (`/tjanster/[slug]`, `/solceller/[stad]`, `/batteri/[stad]`,
publicerade guider) mappas från data. `lastmod` är hårdkodat per route i
`LAST_MOD` – **bumpa bara när innehållet faktiskt ändras** (annars devalveras
signalen).

### robots.txt
`src/app/robots.ts` genererar `/robots.txt`. Lägg nya AI-crawlers i
`AI_CRAWLERS`-arrayen. Lägg aldrig blockerande regler mot publika sidor; håll
disallow till `/admin`, `/api`, `/studio`.

---

## 5. Så lägger du till en ny AI-search-sida

1. Skapa `src/app/<slug>/page.tsx`.
2. Exportera `metadata` med unik title, description, `alternates.canonical`, OG.
3. Importera block från `@/components/seo/aeo` och bygg sidan i denna ordning:
   `Breadcrumbs` → H1 → `AnswerBox` + `KeyTakeaways` → brödtext →
   `ComparisonTable`/`ProsCons` där relevant → `FaqBlock` → `RelatedPages` →
   `CtaBlock`. Lägg `LastUpdated` i heron.
4. Lägg schema via `<JsonLd data={articleSchema({…})} />` (+ `serviceSchema` om
   kommersiell). `Breadcrumbs` och `FaqBlock` emitterar sina scheman själva.
5. Lägg URL:en i `src/app/sitemap.ts` (+ ett `LAST_MOD`-datum).
6. Länka till sidan från relevanta befintliga sidor med **beskrivande** ankartext
   (inte "läs mer"), och lägg den i `Footer.tsx` om den är viktig.
7. Lägg URL:en i `public/llms.txt`.
8. Kör `npm run typecheck` och `npm run build`.

Använd **bara verifierad företagsdata** (priser, avdrag, specifikationer). Källor:
`src/lib/catalog.ts`, batteri-stadssidorna, kalkylatorns FAQ, `public/llms.txt`.

---

## 6. TODO – kräver manuell faktagranskning

- [ ] **Grönt avdrag-procent (48,5 %)** för batteri används konsekvent på sajten.
  Verifiera mot Skatteverkets aktuella nivå för "lagring av egenproducerad el"
  (den lagstadgade skattereduktionen för grön teknik är 50 % 2023→). Om siffran
  ska ändras – ändra på ett ställe i taget och håll den konsekvent
  (`/solcellsbatteri`, `/fragor-och-svar`, `/kalkylator`, batteri-stadssidor,
  `llms.txt`, `catalog.ts`).
- [ ] **`/om-oss`**: "Medarbetare: 3 (växer till 8)" i bolagsfakta-rutan
  motsäger rubriken "Sju människor" och `numberOfEmployees: 7` i schemat.
  Rätta till en konsekvent siffra (påverkar entity-resolution i AI-sök).
- [ ] **Prisspann** på `/solcellsbatteri` (70 000–200 000 kr) är hämtade från
  batteri-stadssidorna. Bekräfta att spannen fortfarande stämmer mot aktuell
  prislista innan de marknadsförs brett.
- [ ] **Organization-namn i Bolagsverket**: schemat noterar att namnbytet till
  "Optimera Energi Sverige AB" är inskickat men inte processat (Allabolag-slug
  pekar ännu på gamla namnet). Uppdatera `sameAs`-URL när slug bytts.
- [ ] **Recensioner/betyg**: inget `AggregateRating`-schema finns (medvetet – vi
  fabricerar inte betyg). Lägg till äkta omdömen (t.ex. Google/Trustpilot) när de
  finns, så kan `Review`/`AggregateRating` läggas till.
- [ ] **OG-bild per sida**: nya sidor ärver den globala `opengraph-image`.
  Överväg sidspecifika OG-bilder för `/solcellsbatteri`.

---

## 7. Rekommenderad nästa sprint

1. **`/solcellsbatteri/pris` och `/solcellsbatteri/gront-avdrag`** som egna sidor
   om pelarsidan börjar ranka – bryt ut sektionerna med `#pris`/`#gront-avdrag`
   till fullständiga sidor och länka pelaren ↔ undersidor (hub-and-spoke).
2. **`/batterikalkylator`** – en batterifokuserad landningssida runt den
   befintliga `CalcConfigurator` (återanvänd komponenten, differentiera copy och
   canonical mot `/kalkylator`).
3. **Guide-artiklar** – utnyttja den befintliga `/guider`-infrastrukturen för
   "batteristorlek räkna ut", "solcellsbatteri lönsamhet" osv, med samma
   AEO-block.
4. **Riktiga omdömen** → `Review`/`AggregateRating`-schema.
5. **Interna mätningar** – följ upp AI-referraltrafik (ChatGPT/Perplexity som
   källa) i GA4 och testa prompterna i `docs/ai-search-prompts.md` månadsvis.
