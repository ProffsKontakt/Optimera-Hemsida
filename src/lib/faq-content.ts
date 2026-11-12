/**
 * Frågorna och svaren på /fragor-och-svar.
 *
 * Ligger här och inte i sidfilen så att samma faktagranskade svar kan
 * användas på fler ställen (sidan, FAQ-schemat och chattens
 * kunskapsunderlag). Faktagranskas varje vecka – se lib/faq-review.ts.
 */

export type FaqCategory = {
  heading: string;
  eyebrow: string;
  items: { q: string; a: string }[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    eyebrow: "Solcellsbatteri",
    heading: "Solcellsbatteri och batterilager",
    items: [
      {
        q: "Vad kostar ett solcellsbatteri till villa?",
        a: "Priset styrs framför allt av kapaciteten. Ett hemmabatteri på 10 kWh landar ofta runt 70 000–110 000 kr installerat, en större bank på 20–30 kWh på cirka 130 000–200 000 kr – allt före grönt avdrag på 48,5 %. Exakt pris för din bostad räknar en tekniker fram vid ett kostnadsfritt hembesök.",
      },
      {
        q: "Hur stort solcellsbatteri behöver jag?",
        a: "Det beror på hur mycket el du vill flytta per dygn, vilken effekt batteriet ska klara och vad det ska användas till. Vår tumregel är årsförbrukningen i kWh delad med 200–275 – ungefär så många dygn per år som elen är dyr och batteriet gör full nytta. En villa med 15 000 kWh per år landar då på cirka 55–75 kWh. Andra bedömare varnar för att överdimensionera, så vi loggar din timförbrukning innan vi rekommenderar exakt storlek.",
      },
      {
        q: "Behöver jag solceller för att ha ett batteri?",
        a: "Nej, ett batteri kan installeras utan solceller och laddas från elnätet. Men ekonomin blir svagare: utan egen solel får du inget grönt avdrag, och besparingen kommer från prisstyrning och i vissa nät en lägre effekt- eller säkringskostnad. Ett batteri utan solceller tar ungefär 5–9 år att betala, mot 3–7 år med solceller. Vi räknar ärligt på ditt hus – och säger nej om det inte går ihop.",
      },
      {
        q: "Vilka batterimärken installerar Optimera Energi?",
        a: "Vi är märkesoberoende och säljer alla batterier på marknaden. Vårt hand-plockade kärnsortiment är Eway (tidigare Easyway), SAJ HS3, Enershare, Sigenergy SigenStor och Fox ESS CQ7. Vi väljer LFP-celler (järnfosfat) som standard för brandsäkerhet och livslängd och dimensionerar märke och storlek efter ditt hus.",
      },
      {
        q: "Är ett batteri säkert i hemmet?",
        a: "Ja. Ett hembatteri som uppfyller regelverket och är rätt installerat anses säkert och börjar sällan brinna. Vi installerar LFP (litium-järnfosfat) som standard, med lägre brandrisk än många andra litiumkemier – men samma placeringsregler gäller: batterier på sammanlagt mer än 20 kWh i samma utrymme ska som utgångspunkt stå i en egen brandcell. Installationen följer SS-EN-IEC 62619 med rätt avstånd och brandklassning och görs av noggrant utvalda, certifierade installatörer.",
      },
    ],
  },
  {
    eyebrow: "Solceller",
    heading: "Solceller och solpaneler",
    items: [
      {
        q: "Hur länge håller solpanelerna?",
        a: "Våra glas-glas paneler har 30 års produktgaranti och en effektgaranti som garanterar minst 87 % effekt efter 30 år.",
      },
      {
        q: "Behöver jag bygglov för solceller?",
        a: "Sedan 1 december 2025 krävs normalt inget bygglov för solceller på tak eller fasad på villor, radhus och andra en- och tvåbostadshus. Men i Stockholms stad krävs lov i stora delar av staden, bland annat på grund av riksintresset för väderradarn i Håtuna, och lov kan också krävas för kulturhistoriskt värdefulla hus och där detaljplanen har skyddsbestämmelser. Vi kollar med din kommun innan du beställer.",
      },
      {
        q: "Vad kostar solpaneler i Stockholm?",
        a: "Priset beror på hur många paneler taket rymmer och inkluderar resor, ställning, montage, kabel och driftsättning. En typisk villa med 14 paneler landar runt 50 000 kr efter grönt avdrag på 14,55 %. Priset på offerten är priset på fakturan.",
      },
    ],
  },
  {
    eyebrow: "Pris & grönt avdrag",
    heading: "Pris, grönt avdrag och återbetalning",
    items: [
      {
        q: "Hur stort grönt avdrag får jag på solceller och batteri?",
        a: "Grönt avdrag 2026 är 15 % av arbete och material för solceller och 50 % för batteri och laddbox – vid fast pris 14,55 % respektive 48,5 % av totalpriset. Batteriet ska lagra egen solel för att ge avdrag. Värmepumpar ger i stället ROT-avdrag på 30 % av arbetskostnaden. Taket för grönt avdrag är 50 000 kr per person och år, så två ägare kan dela på två tak. Avdraget dras direkt på fakturan.",
      },
      {
        q: "Hur lång är återbetalningstiden för sol och batteri?",
        a: "Med solceller betalar sig ett batteri på ungefär 3–7 år, och sol och batteri tillsammans på 4–7 år. Ett batteri utan solceller tar 5–9 år, eftersom det då inte ger något grönt avdrag. Lönsamheten kommer främst från prisstyrning – batteriet laddas när elen är billig och används när den är dyr – och från att solelen används hemma i stället för att säljas. Kortast blir tiden i SE4 och i hus med hög förbrukning. Bara solceller tar ungefär 7–8,5 år i SE3. Exakt siffra för din bostad räknar vi fram vid hembesöket.",
      },
      {
        q: "Kan jag få exakta siffror direkt i kalkylatorn?",
        a: "Nej, och det är ett medvetet val. En kalkylator känner inte ditt tak, din förbrukning eller ditt elområde fullt ut. Kalkylatorn visar vilken riktning en lösning tar – exakta siffror och pris räknar en tekniker fram vid hembesöket, så att du kan lita på dem.",
      },
    ],
  },
  {
    eyebrow: "Stödtjänster & ekonomi",
    heading: "Stödtjänster och smart styrning",
    items: [
      {
        q: "Hur mycket tjänar jag på stödtjänster?",
        a: "Det varierar. Ett hembatteri säljer oftast FCR-D via en aggregator – Svenska kraftnät betalar aggregatorn, inte villaägaren direkt – och ersättningen sätts på en marknad. Den har fallit med över 90 % från toppåren 2022–2023. Mölndal Energi betalade sina kunder i snitt 52 kr per kW och månad 2025 och cirka 33 kr under januari–juni 2026, exklusive moms. Med en 10 kW-växelriktare blir det cirka 4 000–6 200 kr per år, och under de timmar batteriet är sålt kan det inte användas till annat. Det kräver en styrning som kör stödtjänster, till exempel Energy IQ eller Enequi Core. Vi räknar alltid både med och utan stödtjänster.",
      },
      {
        q: "Kan jag ladda batteriet från elnätet när det är billigt?",
        a: "Ja, med ett elavtal som följer spotpriset – i dag i praktiken kvartspris. Styrningen laddar batteriet när elen är billig och använder elen när den är dyr, automatiskt. Hur mycket det ger beror på prisskillnaderna, som varierar mycket mellan dygnen: i kunskapsbankens exempel för SE3 ger prisstyrning med ett 10 kWh-batteri cirka 1 800 kr per år netto.",
      },
      {
        q: "Höjer ett batteri min självförbrukning av solel?",
        a: "Ja. Energimyndighetens solelkalkyl utgår från att en typisk villa använder 40 % av solelen själv. Ett batteri sparar dagens överskott till kvällen – i kunskapsbankens exempel höjer ett 10 kWh-batteri egenanvändningen från cirka 35 till drygt 50 %. Hur mycket beror på batteriets storlek och när du använder el. Det lönar sig eftersom en egenanvänd kWh är värd ungefär 2,5 gånger mer än en såld.",
      },
    ],
  },
  {
    eyebrow: "Så arbetar vi",
    heading: "Hembesök, process och garanti",
    items: [
      {
        q: "Vad kostar ett hembesök?",
        a: "Hembesöket är kostnadsfritt och utan förpliktelser. Vi gör en drönarbesiktning av taket, går igenom era förutsättningar och val, och lämnar en offert där priset på offerten alltid är priset på fakturan.",
      },
      {
        q: "Vem utför installationen?",
        a: "Noggrant utvalda, certifierade installatörer, kvalitetssäkrade genom vår installatörsplattform Fuse. Vi tar fullt ansvar för installationen och garantin – ringer du tre år senare är det fortfarande oss du pratar med.",
      },
      {
        q: "Gäller garantin om jag säljer huset?",
        a: "Ja. Garantin på vårt arbete gäller även när du sålt huset, så att en investering i energilösningen också blir ett värde för nästa ägare.",
      },
    ],
  },
];
