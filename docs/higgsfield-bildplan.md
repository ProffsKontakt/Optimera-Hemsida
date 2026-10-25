# AI-bildplan för optimeraenergi.se (fal.ai + Higgsfield)

> Status 2026-07-19: **primärt spår är fal.ai via MCP** (beslut Julian).
> Higgsfield-kontot är free-plan vars kö aldrig levererade; spåret är parkerat.
> **Inga bilder läggs in på sajten utan Julians godkännande.**
> Detta dokument är prompt-biblioteket + placeringsplanen.

## Kopplingen: fal.ai MCP (projektnivå)

- `.mcp.json` i repo-roten pekar på fals officiella hostade MCP-server
  `https://mcp.fal.ai/mcp` med `Authorization: Bearer ${FAL_KEY}` —
  nyckeln läses ur miljön och ligger aldrig i git.
- Krav i Claude Code-miljön (engångskonfig i claude.ai → Code → miljön):
  1. **Nätverkspolicy:** vitlista `mcp.fal.ai` samt `fal.media` och
     `v3.fal.media` (CDN där färdiga bilder hämtas).
  2. **Miljövariabel:** `FAL_KEY` = API-nyckeln från fal.ai-dashboarden.
  3. Ny session efter ändringarna (MCP-servrar laddas vid sessionsstart).
- MCP-servern är gratis; man betalar bara per modellkörning (samma pris som
  direkta API-anrop). claude.ai-connector är inte möjlig ännu (fal saknar
  OAuth), därav projekt-MCP.

### Modellval per motiv (fal, cirkapriser juli 2026)

| Motiv | Modell på fal | Pris/bild |
|---|---|---|
| Människoscener (hembesök, montör, överlämning) | **Seedream 4.5** | ~$0,04 |
| Produkt/interiör utan människor (batteri i hall) | **FLUX.2 [pro]** | ~$0,03/MP |
| Hjältebild med hög detalj/text vid behov | Nano Banana 2 / Pro | $0,08–0,13 |

Hela omgång 1 (4 bilder, gärna 2 varianter/motiv = 8 gen) ≈ **$0,3** totalt.

## Varför

Våra riktiga installationsfoton tas i pannrum och skrymslen — tekniskt korrekta
men ocharmiga. För produkter från 50 000 kr och uppåt behöver sajten visa hur
batterier och installationer ser ut i *fina, verklighetstrogna* hemmiljöer, och
fler mänskliga ansikten som bygger förtroende.

## Grundregler (trovärdighet framför allt)

1. **AI-bilder är illustrationer, aldrig bevis.** En AI-bild får aldrig
   presenteras som ett dokumenterat kundprojekt ("Familjen X i Bromma"),
   en riktig anställd eller en riktig recensent. Det är exakt den sortens
   fejk som sänker förtroendet — och fejkade kundreferenser strider mot
   marknadsföringslagen.
2. **Märk upp.** AI-genererade miljö-/stämningsbilder får en diskret
   "Illustrationsbild"-tagg (samma mono-typsnitt som övriga etiketter).
   Premium-varumärken gör detta redan; det läses som ärlighet, inte svaghet.
3. **Riktiga ansikten på riktiga människor.** Teamporträtt och kundcase ska
   vara riktiga foton (media-CMS:et under `/admin/media` har redan slots för
   team:*). AI används för scener där personerna är *illustrativa* (rådgivare,
   montör), inte identifierade individer.
4. **Inga påhittade namn i bildtexter.** Bildtexter beskriver situationen
   ("Genomgång av offerten vid köksbordet"), inte fiktiva personer/platser.
5. **Produkttrohet.** Batterierna vi säljer är Easyway (modulär stapel),
   SAJ HS3 (golvstående torn med inbyggd växelriktare) och Emaldo Power Store
   (väggmonterad enhet). Generera generiska enheter som *liknar* rätt
   formfaktor — inga fejkade logotyper på enheterna. Pixelriktig produkt =
   använd riktigt pressfoto från tillverkaren (de har mediabanker) eller
   referensbild in i Higgsfield (`medias`-rollen).

## Omgång 1 — genererad nu (4 bilder, `soul_2`, 3:4, 1.5k)

| # | Motiv | Tänkt placering | Filnamn (förslag) |
|---|-------|-----------------|-------------------|
| 1 | Hembesök: rådgivare + par vid köksbord, kanelbullar, laptop med kalkyl | `HousecallStrip` (startsidan), tile "Hembesök" | `public/images/illustrationer/hembesok-koksbord.webp` |
| 2 | Elektriker driftsätter väggmonterat batteri i ljus, städad tvättstuga | `HousecallStrip` tile "Installation" + tjänstesidan batterier | `public/images/illustrationer/installation-tvattstuga.webp` |
| 3 | Väggmonterat batteri i skandinavisk hall — ren produktmiljöbild utan människor | `/tjanster/batterier`, `/solcellsbatteri` hero, om-oss-galleriet | `public/images/illustrationer/batteri-hall.webp` |
| 4 | Överlämning vid nyinstallerad laddbox, montör + husägare, gyllene timmen | `HousecallStrip` tile "Drift" + laddbox-tjänstesidan | `public/images/illustrationer/overlamning-laddbox.webp` |

### Exakta prompts (återanvändbara)

**1. Hembesöket**
```
Documentary-style editorial photograph inside a bright Scandinavian kitchen with
warm cream walls and an oak table. A friendly Swedish energy advisor in his
early 30s wearing a navy polo sits at the kitchen table with a couple in their
50s, showing them a home battery savings calculation on a laptop. A plate of
cinnamon buns and coffee cups on the table. Soft morning window light, shallow
depth of field, warm natural tones, candid genuine smiles, 35mm photojournalism
style, authentic, no text, no logos.
```

**2. Installationen**
```
Editorial documentary photograph of a certified Swedish electrician in his 30s
wearing dark grey work trousers and a navy work t-shirt, carefully
commissioning a sleek white wall-mounted home battery system in a bright, tidy
Scandinavian utility room with light warm-grey walls. He checks system status
on a tablet, cables neatly routed in white trunking, spotless floor, soft
daylight from a side window, shallow depth of field, warm natural tones, candid
and authentic, 35mm photojournalism style, no text, no logos.
```

**3. Batteriet i hallen**
```
Architectural interior photograph of a modern Scandinavian hallway with warm
cream walls, oak floor and soft daylight. A sleek matte-white wall-mounted home
battery energy storage unit with a subtle LED status strip is mounted neatly on
the wall, cables fully concealed, a wooden bench and a green plant nearby,
premium editorial magazine aesthetic, warm natural tones, photorealistic,
no people, no text, no logos.
```

**4. Överlämningen vid laddboxen**
```
Warm editorial photograph outside a Swedish villa at golden hour: an
electrician in dark workwear hands over to a smiling homeowner couple standing
next to a newly installed white EV charging wallbox on a wooden facade, an
electric car parked in the gravel driveway, tidy surroundings, candid genuine
moment, soft warm light, 35mm documentary style, natural tones, no text,
no logos.
```

## Omgång 2 — nästa påfyllning av credits

Prioriterad kö (samma stil-ordlista: *Scandinavian, warm cream/oak, soft
daylight, 35mm documentary, candid, no text no logos*):

1. **Morgonlastning** — två montörer lastar elbil/skåpbil med material i
   gryning (ersätter "Bilen lastad i Hammarby"-tilen). 4:5.
2. **Drönarvy villatak** — nylagda paneler på sadeltak, höstljus. 16:9
   (guide-hero + "Takbesiktning"-tilen).
3. **Städat säkringsskåp, närbild** — märkta grupper, händer med momentnyckel.
   1:1 ("innan & efter"-tilen).
4. **SAJ HS3-liknande golvtorn i garage** — bredvid välorganiserad väggpanel,
   elbil skymtar. 4:5 (om-oss-galleriet).
5. **Modulärt stapelbatteri (Easyway-form) i grovkök** — 4:5 (easyway-sidan).
6. **Emaldo-liknande väggenhet + wallbox i carport** — 5:4.
7. **Rådgivare i telefon på kontoret i Solna** — ansikte, headset av,
   anteckningsblock. 1:1 (kontakt-sidan).
8. **Fika-stilleben med kanelbullar** — utan påhittat bageri i bildtexten. 1:1.

## Teknik

- **Konto:** Higgsfield free-plan (0,5 credits vid start). `soul_2` @ 1.5k
  kostar 0,12 credits exakt/bild → 4 bilder ryms. 2k-kvalitet kräver betald
  plan (gav fel). Fyll på credits innan omgång 2.
- **Generering:** via Higgsfield MCP i Claude Code, eller sajtens `/studio`
  (`src/lib/higgsfield.ts` + `/api/higgsfield/generate`) när
  `HIGGSFIELD_API_KEY` är satt i miljön.
- **Free-planen kör max 1 samtidigt jobb** — generera sekventiellt.
- **Format:** ladda ner → konvertera till webp (kvalitet ~82) → lägg i
  `public/images/illustrationer/`. Håll varje fil < 300 kB.
- **Aspect:** `soul_2` saknar 4:5 — använd 3:4 och låt `object-cover` beskära
  i 4/5-containrarna.

## Inkopplingsplan (görs EFTER godkännande)

1. `HousecallStrip.tsx`: utöka `Tile` med valfri `src` + rendera `<img>` med
   `object-cover`; behåll gradient som fallback. Byt bildtexterna till ärliga,
   namnlösa beskrivningar + "Illustrationsbild"-tagg på AI-tiles.
2. Om-oss-galleriet ("Färdiga batteriinstallationer hos våra kunder"):
   **byt rubrik** — sektionen får inte påstå kundprojekt så länge bilderna är
   illustrationer. Förslag: "Så här snyggt ska det se ut hemma hos dig" +
   Illustrationsbild-taggar, tills riktiga foton finns.
3. Tjänstesidor (batterier/laddning): bild 2, 3, 4 som sektionsbilder.
4. Riktiga teamfoton laddas upp via `/admin/media` (slots finns redan) —
   AI ersätter aldrig dessa.
