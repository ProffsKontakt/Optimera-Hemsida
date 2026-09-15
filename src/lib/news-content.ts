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
  "efter-valet-2026-rysarjamnt-vad-hander-med-elen": {
    tldr: [
      "Preliminärt har det rödgröna blocket 176 mandat mot Tidöpartiernas 173 – men utlandsröster och sena förtidsröster räknas fortfarande, och det slutliga resultatet fastställs av Valmyndigheten först senare i veckan.",
      "Riksdagen samlas och väljer talman den 28 september; tidigast dagen därpå kan en statsministerkandidat föreslås. Tills en ny regering finns på plats gäller dagens regler: 14,55 % grönt avdrag för solceller, 48,5 % för batteri, Villaeffekten sökbar.",
      "Energiforsks analys inför valet: medelpriset på el väntas landa runt 60–70 öre/kWh fram mot 2035 oavsett valutgång – ny elproduktion hinner inte påverka priset den här mandatperioden.",
    ],
    sections: [
      {
        h2: "Rysarjämnt – och inte klart än",
        body: [
          "Valnattens räkning gav det rödgröna blocket 176 mandat mot 173 för Tidöpartierna – SVT:s rubrik löd \"rysarjämnt\". Men resultatet är preliminärt: utlandsröster och sent inkomna förtidsröster räknas fortfarande, den preliminära räkningen väntas klar under onsdagen, och med så små marginaler kan enskilda mandat flytta sig innan Valmyndigheten fastställer det slutliga resultatet.",
          "Vi skriver därför \"preliminärt\" genomgående i den här artikeln – och uppdaterar den när resultatet är fastställt. Datumet ovanför rubriken visar alltid när texten senast ändrades.",
        ],
      },
      {
        h2: "Tidsplanen: talman den 28 september, regering tidigast därefter",
        body: [
          "Den nya riksdagen samlas för upprop och väljer talman den 28 september. Först därefter – tidigast den 29 september – kan talmannen föreslå en statsministerkandidat, och talmannen Andreas Norlén har redan flaggat för att regeringsbildningen ser ut att bli komplicerad.",
          "Grundlagen ger talmannen fyra försök att få en statsminister vald; misslyckas alla fyra blir det extraval. Med 176 mot 173 och två block som båda saknar egen enkel väg till majoritet kan processen ta veckor, i värsta fall månader. Under tiden styr den sittande regeringen, och några beslut om nya stöd eller avdrag fattas inte i det läget.",
        ],
      },
      {
        h2: "Dina avdrag och stöd: oförändrade – och trögrörliga",
        body: [
          "Ingenting i valresultatet ändrar reglerna du räknar på i dag: grönt avdrag ligger kvar på 14,55 procent för solceller och 48,5 procent för batteri och laddbox med tak på 50 000 kronor per person och år, 60-öringen är fortsatt borttagen, och Villaeffekten – 30 procent av materialkostnaden, max 60 000 kronor, för energieffektivisering i äldre småhus – är sökbar hos länsstyrelsen sedan den 1 september.",
          "Ändringar kräver en regering som lägger en budgetproposition och en riksdagsmajoritet som röstar igenom den. I praktiken betyder det tidigast budgeten för 2027 – och drar regeringsbildningen ut på tiden skjuts även den tidtabellen.",
        ],
        bullets: [
          "Solceller: 14,55 % grönt avdrag – oförändrat.",
          "Batteri och laddbox: 48,5 % grönt avdrag – oförändrat.",
          "Villaeffekten: 30 % av materialkostnaden, max 60 000 kr – sökbar nu, opåverkad av valet.",
          "Eventuella ändringar: tidigast i budgeten för 2027, senare vid utdragen regeringsbildning.",
        ],
      },
      {
        h2: "Elpriset bryr sig inte om talmansrundor",
        body: [
          "Energiforsk analyserade före valet vad de olika politiska vägvalen betyder för elpriset. Slutsatsen: medelpriset väntas hamna runt 60–70 öre per kilowattimme fram mot 2035 – att jämföra med 43 öre 2024 och 64 öre 2023 – och nya kärnkraftsreaktorer byggs inte på en mandatperiod, så valutgången påverkar inte elpriset de närmaste åren.",
          "Skillnaderna ligger längre fram: en högerledd regering ökar sannolikheten för mer kärnkraft under 2030- och 2040-talen, medan en S-ledd regering enligt analysen sannolikt ger mer vindkraft, större statlig styrning av elsystemet och en osäkrare finansiering för de planerade reaktorprojekten. Vinterns elpriser avgörs dock av det system som redan finns – väder, bränslepriser och överföringskapacitet.",
        ],
      },
      {
        h2: "Vad betyder det för dig som funderar på solceller eller batteri?",
        body: [
          "Det ovissa regeringsläget är i praktiken ett argument för att räkna på dagens regler i stället för att vänta på besked som kan dröja månader. För batteri ändrar valresultatet ingenting: avdraget på 48,5 procent ligger fast och stödtjänstintäkterna styrs av elsystemets behov, inte av riksdagen.",
          "För solceller är avvägningen densamma som före valet – en möjlig framtida stödhöjning mot förlorad produktion under vinterns dyra elmånader – men med en ny osäkerhet: ingen vet när en regering som kan ändra något ens är på plats. Villaeffekten kan du däremot söka redan nu, oavsett hur talmansrundorna slutar.",
          "Vi bevakar regeringsbildningen ur ett enda perspektiv: vad den betyder för din elkostnad. När något faktiskt beslutas uppdaterar vi här och i kalkylatorn.",
        ],
      },
    ],
    faq: [
      {
        q: "Vem vann valet 2026?",
        a: "Det är inte avgjort i praktisk mening. Preliminärt har de rödgröna 176 mandat mot 173 för Tidöpartierna, men slutresultatet fastställs först när utlandsröster och sena förtidsröster räknats. Regeringsfrågan avgörs sedan i riksdagen – talman väljs den 28 september och ett statsministerförslag kan komma tidigast dagen därpå.",
      },
      {
        q: "Påverkar valresultatet grönt avdrag eller Villaeffekten nu?",
        a: "Nej. 14,55 procent för solceller, 48,5 procent för batteri och laddbox samt Villaeffektens 30 procent gäller oförändrat tills en ny riksdagsmajoritet beslutar annat i en budget – i praktiken tidigast för 2027, och senare om regeringsbildningen drar ut på tiden.",
      },
      {
        q: "Ska jag vänta med solceller eller batteri tills det finns en regering?",
        a: "För batteri finns inget i valresultatet som ändrar kalkylen – där finns inget skäl att vänta. För solceller är avvägningen densamma som före valet: en möjlig framtida stödhöjning mot förlorad produktion under vinterns dyra månader. Skillnaden nu är att ingen vet när en ny regering är på plats, så att räkna på dagens regler är det enda hederliga.",
      },
    ],
  },

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
