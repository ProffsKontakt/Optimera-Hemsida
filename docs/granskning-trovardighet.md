# Trovärdighetsgranskning: AI-slop och fabricerat innehåll

*Genomförd 2026-07-19. Omfattar samtliga publika sidor, komponenter, datafiler
och schema-markup i repot.*

**Utgångspunkt:** Vi säljer system från 50 000 kr och uppåt. Köpbeslutet är
ett förtroendebeslut. Allt på sajten som en uppmärksam besökare (eller en
AI-sökmotor, eller en journalist) kan avslöja som påhittat raderar det
förtroendet — och fabricerade kundreferenser/recensioner är dessutom
otillåtna enligt marknadsföringslagen (2008:486, jfr även "svarta listan"
p. 4 om att utge sig för att ha godkännanden man saknar).

Grundmönstret i fynden: sajten låtsas ha en **historik som inte finns**
(kunder, installationer, tester, en film, säljare). Ett nystartat bolag har
inget att skämmas för — men det får inte låtsas vara ett femårigt bolag.
"Ärlig nystart" är dessutom exakt varumärket sajten själv beskriver
("rak ärlighet", "inga genvägar").

---

## P0 — åtgärda före nästa deploy (juridik- eller avslöjanderisk)

### 1. Recensioner från kunder som inte kan finnas
`src/components/home/Testimonials.tsx` + rubriken **"Recensioner från riktiga
kunder"** i `src/app/page.tsx:96`.

- "Familjen Lindh, Vaxholm": *"Två år senare är vi helt självgående"* — bolaget
  grundades 2026. En tvåårig kundrelation är omöjlig, och citatet namnger
  "Dexter och hans gäng".
- "Hassan & Erik, Bromma": *"Petter borrade nya kabelvägar…"* — ingen Petter
  finns i teamet.
- Rubriken påstår explicit att recensionerna är riktiga.

**Risk:** Fabricerade konsumentrecensioner är förbjudna (MFL; sedan 2023
gäller uttryckliga regler om att recensioner ska komma från verkliga kunder).
En enda granskande kund/konkurrent/journalist som googlar namnen räcker för
att döda varumärket "rak ärlighet".

**Åtgärd:** Ta bort sektionen tills det finns riktiga, dokumenterade
recensioner (med samtycke). Ersätt gärna ytan med något ärligt och lika
säljande: teamets löften med riktiga namn/ansikten, eller "Våra första
installationer får tala — följ med här under hösten".

### 2. Påhittade säljare i live-lead-routingen
`src/lib/sellers.ts:15-37` — "Dexter Sundberg", "Ronja Eklund", "Albin Norén"
med @optimeraenergi.se-adresser. Ingen finns i `team.ts` (teamets Albin heter
Lygdman). `assignSeller()` kopplas till **varje inkommande offert** i
`src/app/api/offert/route.ts:85` och skickas som `assignedSeller` till CRM
och KT Central-webhooken.

**Risk:** Leads taggas med personer som inte existerar; mejladresserna
studsar sannolikt; om kundkommunikation någonsin signeras med dessa namn är
det direkt vilseledande. Notera att samma fiktiva namn läcker in i publika
ytor: "Dexter" i recensionen, "Ronja … & Petter" i HousecallStrip-bildtexter.

**Åtgärd:** Byt `SELLERS` till de riktiga säljarna ur `team.ts` (William,
Kalle, Albin Lygdman, Linus + Moltas som fallback) eller låt allt gå till
`hej@optimeraenergi.se` tills KT Central-routingen finns.

### 3. Schema + spelknapp för en film som inte existerar
- `src/app/page.tsx:63-73` skickar `VideoObject`-schema till Google/AI-motorer:
  "filmen om varför vi finns", 2:14 min, uppladdad 2026-05-24, `contentUrl:
  "/hero.mp4"` — **filen finns inte** (public/ innehåller endast SVG).
- `src/components/home/VideoStage.tsx` visar en spelknapp "Filmen om Optimera
  · 2:14" + badge "Premiere · 2026". Klick ger en tom/trasig spelare.

**Risk:** Strukturerad data om innehåll som inte finns är exakt det Googles
spam-policys straffar, och en besökare som klickar får ett trasigt intryck
mitt på startsidan.

**Åtgärd:** Ta bort `videoObjectSchema` och göm/ersätt VideoStage tills en
riktig film finns (Higgsfield-video eller fotografering).

### 4. Fabricerad installationshistorik på programmatiska stadssidor
- `src/lib/cities.ts` (solceller, 8 städer): *"…områden där vi installerat
  mest"* (:129), *"Vi har gjort tillräckligt många installationer här…"*
  (:174), *"…har vi installerat på allt från 30-talsvillor till platta tak"*
  (:245).
- `src/lib/battery-cities.ts` (batterisidor): *"ser i praktiken 8 000–20 000
  kr per år tillbaka"* (:46), *"ser vi stödtjänstintäkter på 20 000–35 000
  kr per år"* (:221) — formuleringar som påstår egen driftdata.
- `src/components/demo/DemoHero.tsx:118` — **"Hus #048 · Bromma"** i hero:
  antyder minst 48 genomförda projekt.

**Risk:** Detta är sajtens största AI-slop-mönster: LLM-genererade lokala
"erfarenhetstexter" utan verklighetsunderlag, utspridda över många
indexerade sidor. Även AI-sökmotorer citerar detta som fakta om bolaget.

**Åtgärd:** Skriv om till kunskaps-/metodformuleringar ("I Täby är
30-talstak med tegel vanliga — så här angriper vi dem") i stället för
erfarenhetsanspråk ("vi har installerat mest i Gribbylund"). Ta bort
husräknaren eller ersätt med något sant ("Offert #— räknas från riktiga
förfrågningar" först när det är sant).

### 5. "Hundratals tester", "tusentals scenarier", "jourcentral"
- *"…valt det vi säljer efter hundratals tester"* — tre ställen:
  `Manifesto.tsx:22`, `DemoManifesto.tsx:27`, `metodik/page.tsx:37`.
- *"Vi har räknat på tusentals scenarier"* — `guide-content.ts:63`.
- *"Fjärrövervakning från vår jourcentral"* — `services.ts:101`. Ett
  7-personersbolag har ingen bemannad jourcentral.

**Åtgärd:** Byt till sant och lika starkt: "valt efter branschens samlade
driftdata + egna års erfarenhet från Sveriges största installatörer",
"fjärrövervakning med larm till våra egna tekniker".

---

## P1 — trovärdighetssänkande inkonsekvenser (åtgärda inom kort)

| # | Fynd | Var | Åtgärd |
|---|------|-----|--------|
| 6 | Juridiskt namn: sajten säger "Optimera Energi Sverige AB", men Allabolag-länken i schema/footer avslöjar registrerat namn "Solpanelsgruppen i Sverige AB", byggmästare, **Oskarström** | `JsonLd.tsx:74`, `Footer.tsx:134`, `llms.txt:18` | Tills namnbytet är registrerat hos Bolagsverket: skriv ärligt "Optimera Energi är ett varumärke under Solpanelsgruppen i Sverige AB (org.nr 559375-2206), namnbyte pågår" på om-oss + ta bort/uppdatera sameAs-länken. AI-motorer läser Allabolag. |
| 7 | Stödtjänstintäkt: "25 000–60 000 kr/år för 15 kWh" motsäger sajtens egen ~7 800 kr/år-siffra | `services.ts:135` vs `llms.txt:57`, `fragor-och-svar`, `solcellsbatteri` | Ta den lägre, försvarbara siffran överallt; högre spann endast med källa och årtal |
| 8 | Batteriåterbetalning "1,6–2 år" vs "2–5 år" för samma case | `guide-content.ts:86` vs FAQ/solcellsbatteri | Enhetliggör till 2–5 år |
| 9 | Panelgaranti "30 års produktgaranti/87 % efter 30 år" vs "25 års effektgaranti" | `services.ts:72`+FAQ vs `guide-content.ts:36,231` | Slå fast per JA Solar-datablad, en sanning |
| 10 | Moltas två telefonnummer (0705340154 vs 070 534 01 25); pressnumret ligger i NewsArticle-schemat | `kontakt/page.tsx:43` vs `data/press/….json:11` | Rätta till ett nummer överallt |
| 11 | Sortiment spretar: "Easyway 15–61 kWh" vs "Easyway 46–61 kWh + Pixii" | `solcellsbatteri:379` vs `batteri/[stad]:54`, `battery-cities` | En produktlista som källa (catalog.ts), referera den |
| 12 | Värmepump är `hidden` som tjänst men marknadsförs i llms.txt, press och schema (`knowsAbout`) | `services.ts:150` vs `llms.txt:24`, `JsonLd.tsx:137-145` | Bestäm: säljer vi värmepumpar? Ja → visa tjänsten; nej → rensa överallt |
| 13 | "Om oss"-metadata: "Tre människor i Solna" men teamet är 7 ("Sju människor som svarar i telefonen") | `om-oss/page.tsx:17,22` | Uppdatera metadata |
| 14 | EMS-produkterna "Energy IQ (egen plattform, 16 % boost)" och "KEEP AI (25 % boost, Bäst i klassen)" med exakta procentsatser — verifiera att produkterna/siffrorna är verkliga innan de säljs som fakta (KEEP AI listas t.o.m. som "hårdvarumärke" i gamla Hero-marqueen) | `catalog.ts:280-320`, `llms.txt:26` | Verifiera eller ta bort; "egen plattform" kräver att den finns |
| 15 | "Emaldo Grid Rewards … 1 370 kr/månad garanterat" — specifik tredjepartsutbetalning som fakta | `guide-content.ts:82,174`, `llms.txt:61` | Citera Emaldos villkor med datum, eller mjuka upp |
| 16 | "Inga andra EMS:er erbjuder detta i Sverige idag" — absolut konkurrentpåstående | `guide-content.ts:68` | Ta bort eller belägg |
| 17 | Trasig presstillgång: nedladdningskort pekar på `/icon.svg` som inte finns i public/ | `press/page.tsx:183-203` | Peka på filer som finns |
| 18 | Prisruta renderar "10 000, 22 500 kr" (komma i stället för spann) | `tjanster/[slug]/page.tsx:194` | Formatera "10 000–22 500 kr" |
| 19 | Pressrelease-typo: "säger Viktor Tiberg,␣␣på Optimera…" (titel saknas, dubbelt mellanslag) | `data/press/….json:6` | Rätta i admin/press |

## P2 — AI-slop-städning (ton och mönster)

- **"Inte bara X (utan Y)"-kadensen** återkommer: `services.ts:91` ("inte bara
  en låda"), `services.ts:214`, `tjanster/[slug]:233`, `Footer.tsx:47`
  ("Energin är inte bara ström – den är en hållning"). En gång är stil, fyra
  gånger är LLM-mönster. Variera.
- **Tomma superlativ:** "Sveriges mest välrenommerade bolag", "branschens
  nöjdaste kunder" (`Manifesto`/`DemoManifesto`). Byt mot konkret ("vi kommer
  från <namnge bolag som stämmer>, och lärde oss vad vi aldrig vill göra om").
- **"Långsam, ärlig journalistik"** om egen marknadsblogg (`tankar/page.tsx:40`)
  — kalla det "våra tankar" rakt av; bloggen är dessutom tom
  ("Snart kommer riktiga inlägg"). Överväg `noindex` på /tankar tills inlägg
  finns.
- **DemoBrandRow** rubricerar "Hårdvara vi själva valt" men listar
  värmepumpsmärken (NIBE, IVT, Bosch, Mitsubishi) som inte säljs på
  demo-sajten. Rensa listan till det sortiment vi faktiskt offererar.
- **Kanelbullar-motivet** används i hero-badge, vision, testimonial och
  bildtext ("Kanelbullar från Lillebils i Bromma" — bageriet är påhittat).
  Motivet är charmigt; behåll det på ETT ställe och stryk fiktiva detaljer.
- Död kod med egna fel (gamla `site/Hero.tsx`: "Hus #048", "Årsvärmefaktor
  4,92", 4 tjänster i stället för 3) — radera filen så den inte återuppstår.

## Verifierat OK (behåll)

- Inget `aggregateRating`/`Review`-schema fabriceras — bra beslut,
  dokumenterat i `docs/ai-search-implementation.md`.
- Grönt avdrag-satserna **14,55 % / 48,5 %** är internt koherenta — det är de
  *effektiva* satserna (15 % resp. 50 % × 0,97-schablonen på
  material+arbete). Rekommendation: skriv ut härledningen på sajten
  ("50 % på 97 % av fakturan = 48,5 % effektivt") så att siffran inte ser
  påhittad ut, och dubbelkolla laddbox-satsen (50 %) mot Skatteverket 2026.
- Utkastguider är `noindex` och ärligt märkta "Snart".
- Press-sidan hanterar tomt läge ärligt ("Optimera Energi är ett nytt bolag").
- `solcellsbatteri/page.tsx` markerar aktivt att priser inte fabriceras —
  den sidan är mallen för hur allt annat bör skrivas.

---

## Mänskliga ansikten: strategin

Rätt instinkt — ansikten säljer förtroende i den här prisklassen. Men
ordningen är avgörande:

1. **Riktiga ansikten där något påstås.** Team, recensioner, referenscase =
   endast riktiga foton av riktiga personer. Media-CMS:et (`/admin/media`)
   har redan slots för alla sju i teamet — boka en halvdags fotografering
   (porträtt 4:5, arbetsbilder, kontoret, bilen). Detta är den enskilt
   största trovärdighetshöjaren på hela sajten.
2. **AI-ansikten endast som omärkbart-illustrativa scener** (rådgivare vid
   köksbord, montör vid vägg) — alltid med diskret "Illustrationsbild"-tagg,
   aldrig med namn, aldrig som "kund" eller "vårt team". Se
   `docs/higgsfield-bildplan.md` för färdiga prompts, placeringar och regler.
3. **Produktmiljöbilder via Higgsfield** (batteri i snygg hall/garage i
   stället för pannrum) är okontroversiella — inga identitetspåståenden —
   och löser exakt "ocharmiga pannrum"-problemet. Märk även dessa.
4. När riktiga installationsfoton börjar komma in: visa dem RÅA (även
   pannrummet, snyggt kablat) bredvid illustrationerna. "Så här snyggt
   kablar vi även i pannrum" är ett starkare säljargument än en perfekt
   AI-hall.

## Higgsfield-kopplingen: status

- **Fungerande nu:** Higgsfield MCP är ansluten till Claude Code och första
  bildomgången är genererad den vägen (modell `soul_2`). Kontot är på
  free-planen med 0,5 credits → ~4 bilder à 0,12 credits. **Fyll på credits**
  för omgång 2 (kön är också långsam och 2k-kvalitet spärrad på free).
- **Sajtens egen `/studio`-integration** (`src/lib/higgsfield.ts` +
  `/api/higgsfield/*`) är overifierad gisskod: endpoints "baserade på publik
  dokumentation", enbart video (ingen bildgenerering), aldrig testad mot
  riktiga API:et. Byt till Higgsfields officiella plattforms-API/SDK när
  API-nyckel finns, och lägg till bildgenerering — eller fortsätt generera
  via MCP och hoppa över egen integration tills behovet är återkommande.
