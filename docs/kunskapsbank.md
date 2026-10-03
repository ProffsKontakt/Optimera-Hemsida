# Kunskapsbanken: redaktionell handbok

Kunskapsbanken (`/kunskapsbank`) samlar tre databaser:

| Databas | Route | Data | Innehåll |
| --- | --- | --- | --- |
| Nyheter | `/nyheter/<slug>` | `src/lib/news.ts` + `news-content.ts` | Ny artikel var tredje dag |
| Solcellsfrågor | `/solcellsfragor/<slug>` | `src/lib/solcellsfragor-content.ts` | En sida per fråga svenskar söker på |
| Batteriskolan | `/batteriskolan/<slug>` | `src/lib/batteriskolan-content.ts` | En sida per batterikoncept |

Typerna finns i `src/lib/kb-types.ts`. Sidorna, sitemapen, sökfunktionen och menyn byggs automatiskt från datafilerna. Lägger du till en post i en datafil behöver ingen annan fil ändras.

## Påfyllning var tredje dag (nyhetsrutinen)

1. Kör `python3 scripts/sokfragor.py sol` och `python3 scripts/sokfragor.py bat`. Skriptet hämtar Googles sökförslag (sv/SE), rangordnar dem och visar det som databaserna **inte** redan täcker.
2. Välj 1–3 nya solcellsfrågor med tydlig sökvolym (hög poäng, frågeform) som kan besvaras med källbelagd fakta. Lägg till ett batterikoncept bara när sökdatan visar en tydlig lucka (högst ett per körning).
3. Slå ihop varianter av samma fråga till **en** sida. Varianterna läggs i `searchPhrases`.
4. Skriv enligt reglerna nedan. Ordningen i `QUESTIONS` styr ordningen på hubben (mest sökt först inom kategorin).
5. Har en regel eller siffra ändrats (t.ex. grönt avdrag i en ny budget): uppdatera berörda poster och sätt nytt `updatedAt`. Det signalerar färskhet till Google.

## Redaktionella regler

1. **Inga påhittade fakta.** Varje siffra, regel och datum ska ha täckning i en källa som hämtats och lästs. Kan något inte beläggas: skriv mer allmänt eller stryk det.
2. **Kontrollera källans år.** Äldre sökträffar ser ofta aktuella ut. Regler har ändrats: 60-öresreduktionen slopades 2026-01-01, och grönt avdrag för solceller sänktes från 20 till 15 % 2025-07-01.
3. **Primärkällor först:** Skatteverket, Boverket, Energimyndigheten, Elsäkerhetsverket, Ei, Svenska kraftnät, MSB, Riksdagen, Nord Pool och nätbolagen.
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

- Varje källa svarar (HTTP 200) och stöder påståendet.
- `npx tsc --noEmit -p .` och `npm run build` är gröna.
- Ingen dubblett: sök efter frågan i datafilen innan en ny post skapas.
