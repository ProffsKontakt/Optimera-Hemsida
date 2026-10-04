# Kunskapsbanken: redaktionell handbok

Kunskapsbanken (`/kunskapsbank`) samlar tre databaser:

| Databas | Route | Data | Innehåll |
| --- | --- | --- | --- |
| Nyheter | `/nyheter/<slug>` | `src/lib/news.ts` + `news-content.ts` | Ny artikel var tredje dag |
| Solcellsfrågor | `/solcellsfragor/<slug>` | `src/lib/solcellsfragor-content.ts` | En sida per fråga svenskar söker på |
| Batteriskolan | `/batteriskolan/<slug>` | `src/lib/batteriskolan-content.ts` | En sida per batterikoncept |

Typerna finns i `src/lib/kb-types.ts`. Sidorna, sitemapen, sökfunktionen och menyn byggs automatiskt från datafilerna. Lägger du till en post i en datafil behöver ingen annan fil ändras.

## Veckorutinen: två nya sidor i veckan

En schemalagd agent kör varje måndag morgon och publicerar två nya sidor utifrån vad svenskar sökt mest på den gångna veckan. Sidorna publiceras direkt, utan manuellt godkännande, och ett mejl sammanfattar vad som publicerats och varför.

1. **Sökdata:** `python3 scripts/veckans-sokningar.py`. Skriptet hämtar Google Trends för Sverige de senaste 7 dagarna – de mest sökta relaterade sökningarna (topp) och de som ökar mest – för grundord som solceller, elpris, effektavgift och växelriktare. Grundorden vägs mot "solceller", så poängen går att jämföra mellan dem. Varje sökning jämförs med kunskapsbanken och guiderna och märks som täckt eller obesvarad. Obesvarade sökningar visas med Googles sökförslag. Svarar inte Trends (HTTP 429) används `python3 scripts/sokfragor.py sol` och `bat`, som bara bygger på sökförslag.
2. **Välj två ämnen** bland de obesvarade, högst poäng först. Ämnet ska:
   - höra hemma i Solcellsfrågor (solceller) eller Batteriskolan (batterier, elnät, elpris och styrning)
   - gå att besvara med källbelagd fakta
   - inte vara ett varumärke, ett prisuppslag ("elpris idag") eller en ortssökning.

   Nätbolagens regler, till exempel en effektavgift, är sakfrågor och får tas upp.
3. **Ingen dubblett.** Besvarar en befintlig sida redan frågan: förstärk den sidan (sökfras + svar, nytt `updatedAt`) och ta nästa kandidat. Varianter av samma fråga blir **en** sida, och varianterna läggs i `searchPhrases`.
4. **Skriv** enligt reglerna och stilen nedan. Placera posten i sin kategori eller grupp: först om sökvolymen är hög, annars sist. Ordningen styr hubben. Lägg till den nya slugen i `related` på 1–3 närliggande sidor, så att länkarna går åt båda hållen.
5. **Kvalitetsgrind:**
   - `node scripts/kb-check.mjs --only <slug1>,<slug2> --urls` ger 0 problem och 0 varningar för de nya sidorna.
   - `npx tsc --noEmit -p .` och `npm run build` är gröna.
6. **Ändrade regler:** har en regel eller siffra ändrats, till exempel grönt avdrag i en ny budget, uppdatera berörda poster och sätt nytt `updatedAt`. Det signalerar färskhet till Google.

Nyhetsrutinen var tredje dag skriver bara nyheter. Den ska inte ta en huvudfråga som en sida i kunskapsbanken redan besvarar.

## Redaktionella regler

1. **Inga påhittade fakta.** Varje siffra, regel och datum ska ha täckning i en källa som hämtats och lästs. Kan något inte beläggas: skriv mer allmänt eller stryk det.
2. **Kontrollera källans år.** Äldre sökträffar ser ofta aktuella ut. Regler har ändrats: 60-öresreduktionen slopades 2026-01-01, och grönt avdrag för solceller sänktes från 20 till 15 % 2025-07-01.
3. **Primärkällor först:** Skatteverket, Boverket, Energimyndigheten, Elsäkerhetsverket, Ei, Svenska kraftnät, Myndigheten för civilt försvar (före 2026 MSB), Riksdagen, Nord Pool och nätbolagen.
4. **Går källor isär, säg det öppet.** Det är en trovärdighetssignal.
5. **Partipolitiskt neutralt.** Vallöften är löften, inte beslut.
6. **Ingen säljton och inga produktrekommendationer.** Förklara hur läsaren själv bedömer saken.
7. **Varje sökfras ska besvaras på riktigt på sidan.** Inget klickbete.
8. **Optimera Energis egna schabloner attribueras som deras:** batteridimensionering (årsförbrukning ÷ 200–275), kalkylatorns 65 kr/kW växelriktareffekt och månad för stödtjänster, och egna prisnivåer.

## Stil

- Första meningen svarar direkt på frågan. Den citeras av Google och AI-sök.
- Svenska, du-tilltal, korta meningar. Förklara facktermer första gången.
- Typografi: "8–11 år", "14,55 %", "50 000 kr", "kWh", "kWp", "öre/kWh".
- Räkneexempel redovisar sina antaganden.
- Solcellsfråga: 150–300 ord (`shortAnswer` högst cirka 45 ord). Batterikoncept: 450–800 ord.
- `related` ska bara innehålla slugs som finns. Bygget fallerar inte på okända slugs, men länken försvinner tyst.

## Kvalitetsgrind före publicering

- `node scripts/kb-check.mjs --urls` kontrollerar:
  - struktur och korslänkar (related, concepts, questions, links)
  - att varje sökfras besvaras ordagrant
  - ordmängd, längden på description och typografi
  - att källorna svarar.

  Skriptet avslutar med felkod vid problem.
- Varje källa stöder påståendet. Läs den, kontrollera årtalet och kolla inte bara statuskoden.
- `npx tsc --noEmit -p .` och `npm run build` är gröna.
- Ingen dubblett: `veckans-sokningar.py` visar närmaste befintliga sida för varje sökning.

## Verktyg

| Skript | Gör |
| --- | --- |
| `scripts/veckans-sokningar.py` | Veckans mest sökta och mest ökande sökningar (Google Trends, Sverige, 7 dagar) med täckningskoll |
| `scripts/sokfragor.py sol\|bat` | Obesvarade sökförslag från Google-autocomplete, reserv när Trends inte svarar |
| `scripts/kb-check.mjs` | Kvalitetsgrinden ovan |
| `scripts/kb-data.mjs` | Läser datafilerna utan bygge, används av de andra skripten |
