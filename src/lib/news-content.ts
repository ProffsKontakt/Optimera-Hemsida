/**
 * Innehåll för publicerade nyhetsartiklar. Hålls separat från news.ts
 * (metadata) så att artikellistan är lätt att skanna och innehåll är
 * lätt att granska i PR-diffen innan godkännande.
 *
 * Struktur per artikel (samma som guide-content.ts):
 *   tldr      – 3 punkter, citerbara av AI-search ("Läget i korthet")
 *   sections  – H2-rubriker + brödtext + valfria bullets
 *   faq       – frågor/svar för FAQPage-schema och utfällbara block
 *
 * Redaktionella regler för nyhetsartiklarna:
 *   1. Partipolitiskt neutralt – vi beskriver linjer, vi tar inte ställning.
 *   2. Varje sakpåstående ska ha täckning i källorna i news.ts.
 *   3. Vallöften beskrivs som löften, aldrig som beslut.
 *   4. Där källor går isär sägs det rakt ut – det är en trovärdighetssignal.
 */

export type NewsSection = {
  h2: string;
  body: string[];
  bullets?: string[];
};

export type NewsContent = {
  tldr: string[];
  sections: NewsSection[];
  faq: { q: string; a: string }[];
};

const CONTENT: Record<string, NewsContent> = {
  "valet-2026-solceller-elpriser-en-vecka-kvar": {
    tldr: [
      "Grönt avdrag är i dag 14,55 % för solceller och 48,5 % för batteri och laddbox. Striden i valrörelsen gäller solstödet – batteriavdraget ifrågasätts inte i de partijämförelser som publicerats.",
      "60-öringen, skattereduktionen för såld överskottsel, försvann den 1 januari 2026 och har blivit valfråga. Sedan den 1 september går det samtidigt att söka nya Villaeffekten: 30 % av materialkostnaden, max 60 000 kr, för energieffektivisering i äldre småhus.",
      "Villaägarnas prognos pekar på cirka 3 100 kr i månaden i elkostnad för en Stockholmsvilla i vinter. Ny elproduktion – kärnkraft eller förnybart – tar år att bygga oavsett valutgång.",
    ],
    sections: [
      {
        h2: "Det här gäller just nu – oavsett hur valet går",
        body: [
          "Grönt avdrag ligger 2026 på 14,55 procent av totalkostnaden för solceller och 48,5 procent för batteri och laddbox, med ett tak på 50 000 kronor per person och år. Soldelen sänktes den 1 juli 2025, och den så kallade 60-öringen – skattereduktionen på 60 öre per kilowattimme för överskottsel du säljer till nätet – försvann helt vid årsskiftet.",
          "Sedan den 1 september går det också att söka det uppdaterade bidraget för energieffektivisering i småhus, ofta kallat Villaeffekten. Det ger 30 procent av materialkostnaden, som mest 60 000 kronor per hus, för åtgärder som isolering, nya fönster och värmepump. Bidraget gäller en- och tvåfamiljshus med värdeår före 1990 som inte är anslutna till fjärrvärme, och söks hos länsstyrelsen via Boverkets e-tjänst.",
        ],
        bullets: [
          "Solceller: 14,55 % grönt avdrag på totalkostnaden.",
          "Batteri och laddbox: 48,5 % grönt avdrag – oförändrat.",
          "60-öringen för såld överskottsel: borttagen sedan 1 januari 2026.",
          "Villaeffekten: 30 % av materialkostnaden, max 60 000 kr, sökbar sedan 1 september.",
        ],
      },
      {
        h2: "Solstödet har blivit valfråga",
        body: [
          "Sänkningen av solavdraget och slopandet av 60-öringen har lyft småskalig solel in i valrörelsen. I de partijämförelser som publicerats inför valet vill flera partier stärka stödet för solceller, batterier och energieffektivisering, medan andra vill behålla dagens nivåer. Exakt vilka partier som lovar vad skiljer sig dock åt mellan sammanställningarna, och skarpa, beslutade förslag saknas – därför pekar vi hellre på jämförelserna i källistan än återger enskilda sifferlöften som fakta.",
          "Det viktiga att komma ihåg är att vallöften inte är beslut. Ändringar av grönt avdrag avgörs i en budgetproposition och gäller i praktiken tidigast från 2027. Fram till dess är det dagens nivåer som styr din kalkyl.",
        ],
      },
      {
        h2: "Kärnkraft mot förnybart – linjerna inför valdagen",
        body: [
          "Moderaterna, Kristdemokraterna, Liberalerna och Sverigedemokraterna pekar ut ny kärnkraft som huvudspår för att möta det växande elbehovet, och Socialdemokraterna accepterar numera både fortsatt drift och ny kärnkraft på befintliga kärnkraftsorter. Miljöpartiet avvisar ny kärnkraft av kostnads- och tidsskäl och vill i stället skynda på sol, vind och lagring. Centerpartiet driver teknikneutralitet och kortare tillståndsprocesser.",
          "För dig som villaägare är tidsperspektivet det centrala: ny elproduktion tar i storleksordningen fem till femton år att få på plats, oavsett kraftslag. Vinterns elpriser avgörs av det som redan är byggt – och av vad du själv gör med ditt eget tak och din egen förbrukning.",
        ],
      },
      {
        h2: "Vinterns elräkning: runt 3 100 kronor i månaden för en Stockholmsvilla",
        body: [
          "Villaägarnas genomgång av elpriserna 2026 pekar mot en dyr vinter. Marknadens prognos är att en genomsnittlig villa i Stockholm eller Göteborg betalar cirka 3 100 kronor per vintermånad för elen, en villa i Malmö runt 3 700 kronor och en villa i Luleå eller Sundsvall omkring 2 100 kronor.",
          "Elpriserna har också blivit stridsfråga i valrörelsens slutspurt: Socialdemokraterna kräver att regeringen agerar för att frikoppla de svenska elpriserna från de europeiska gaspriserna. Oavsett vilken väg nästa riksdag väljer tar strukturella åtgärder år att ge effekt – på kort sikt är egen produktion, lagring och lägre förbrukning det som flyttar din faktiska räkning.",
        ],
      },
      {
        h2: "Vad betyder det för dig som funderar på solceller eller batteri?",
        body: [
          "Batterikalkylen påverkas inte av valutgången på kort sikt. Avdraget på 48,5 procent ligger fast, valrörelsens strid handlar om solstödet, och intäkterna från stödtjänster som FCR-D sätts av elsystemets behov – inte av riksdagen.",
          "För solceller är läget mer öppet. Stärks stödet efter valet blir kalkylen bättre för den som väntat – men avdraget räknas när du betalar, så den som väntar avstår samtidigt produktion under årets dyraste elmånader och riskerar att inget ändras alls. Räkna på båda scenarierna i kalkylatorn i stället för att gissa.",
          "Vår hållning är partipolitiskt neutral: vi säljer inte en åsikt om energisystemet, vi hjälper dig räkna hem ditt eget. När spelreglerna ändras uppdaterar vi siffrorna här och i kalkylatorn.",
        ],
      },
    ],
    faq: [
      {
        q: "Påverkar valresultatet grönt avdrag för mina solceller?",
        a: "Inte automatiskt. Dagens nivåer – 14,55 procent för solceller och 48,5 procent för batteri och laddbox – gäller tills riksdagen beslutar något annat, i praktiken tidigast i budgeten för 2027. Flera partier vill stärka solstödet och andra behålla dagens nivåer, men inga skarpa förslag är beslutade.",
      },
      {
        q: "Ska jag vänta med att installera tills efter valet?",
        a: "Det beror på vad du väger tyngst. Väntar du och stödet höjs vinner du på det – men du avstår samtidigt produktion under vinterhalvårets höga elpriser, och det är inte säkert att något ändras. För batteri finns inget i valrörelsen som talar för en förändring av avdraget, så där finns inget valskäl att vänta.",
      },
      {
        q: "Vad var 60-öringen och kan den komma tillbaka?",
        a: "60-öringen var en skattereduktion på 60 öre per kilowattimme för överskottsel du sålde till nätet – ungefär 1 500–3 000 kronor om året för en typisk villaanläggning. Den togs bort den 1 januari 2026. En ny riksdagsmajoritet kan återinföra den, men det kräver ett budgetbeslut, så räkna inte med den i din kalkyl i dag.",
      },
    ],
  },
};

export function getNewsContent(slug: string): NewsContent | undefined {
  return CONTENT[slug];
}
