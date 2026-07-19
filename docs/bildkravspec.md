# Bildkravspec — AI-genererade illustrationsbilder

*Fastställd efter granskning av omgång 1 (2026-07-19). Stil-ankare:
installationsbilden (montör med surfplatta vid väggenhet) som Julian godkänt.
Regel noll: **ingen bild committas/publiceras utan Julians uttryckliga OK,
bild för bild.***

## A. Absoluta krav (gäller varje bild)

1. **Ingen AI-genererad text någonstans.** Skärmar, etiketter, kläder,
   skyltar, registreringsskyltar — AI-modeller rapplar alltid text, och
   rappel är omedelbar trovärdighetsdöd. Lösningar i prioritetsordning:
   a) motivet komponeras så textytor inte syns (skärm bortvinklad/avstängd,
   etikett i profil), b) textytan ersätts i efterbearbetning med riktig
   grafik (composite-metoden, se C), c) bilden görs om.
2. **Inga påhittade varumärken/logotyper.** Enheter renderas "unbranded"
   (ren front). Riktiga varumärken (Solis, SAJ, Emaldo, EasyWay) läggs
   ALDRIG på AI-genererade enheter utan separat beslut — tredje parts
   varumärke på en fejkad produktbild är en egen risk. Behövs pixelriktig
   produkt: använd tillverkarens riktiga pressbilder i stället.
3. **Människor:** naturliga och vardagliga — inga överdrivna stock-leenden,
   inga modellansikten. QA på händer (fem fingrar), tänder, ögon,
   reflektioner. AI-personer framställs aldrig som namngiven person,
   anställd eller kund; de är anonyma illustrativa roller (rådgivare,
   montör, husägare).
4. **Märkning:** varje AI-bild som publiceras får diskret
   "Illustrationsbild"-tagg i UI:t, och bildtexter beskriver situationen —
   aldrig fiktiva namn, kunder, platser eller bagerier.
5. **Format:** 3:4 (2112×2816) för tiles/porträttytor, 16:9 för
   guide-/sektionsheroes. Motivet ska tåla beskärning till 4:5 och 1:1
   (viktigt innehåll centrerat).
6. **Ljus/palett:** varmt mjukt dagsljus som matchar sajtens bone/cream
   (#F4F1EA/#EFE9DC) och ek-toner. 35 mm-dokumentärt, grunt skärpedjup,
   inga kalla blå LED-looks, ingen HDR-plastighet.

## B. Teknisk korrekthet (svensk installationsmiljö)

1. Kabelföring i vit kabelkanal med raka, avslutade drag — rätt antal
   kablar, inga omöjliga böjar eller kablar som slutar i luften.
2. Enheter i rimliga proportioner mot vägg och människa; väggenheter
   ser förankrade ut, golvenheter står plant.
3. Sortimentstrohet i formfaktor: väggenhet ≈ kompakt vit låda
   (Emaldo-typ), golvtorn ≈ SAJ HS3-typ, modulär stapel ≈ EasyWay-typ.
   Liknande — inte kopior, inte fantasiformer.
4. Miljöer: svenska villor och hem — träpanel/puts/tegel, tvättstuga,
   grovkök, garage, hall, grusuppfart. Inga amerikanska garageportar,
   utländska eluttag eller högerstyrda bilar i närbild.
5. Bilar i bild: generiska elbilar, inte identifierbara märkeskopior i
   närbild (bakgrund/skymd är okej).

## C. Etiketter/märkplåtar: composite-metoden

AI får aldrig rendera märkplåten. I stället:

1. Generera enheten med tom/oskarp etikettyta.
2. Rendera en äkta plåt som grafik (Pillow-script finns:
   `composite_label.py` i sessionens arbetsyta; flyttas in i repot under
   `scripts/` när första bilden godkänns) med korrekt datatabell,
   och komposita in den med perspektiv, varm ljusmatchning och kantblur.
3. Datainnehåll per enhetstyp (neutral modellbeteckning tills annat
   beslutas):

| Fält | Hybridväxelriktare 10 kW | Batterimodul | Laddbox |
|---|---|---|---|
| Modell | EH-3P10K-H | BS-10K-LFP | CB-22-T2 |
| Nyckeldata | PV 1000 V / MPPT 200–850 V / 2×26 A | LiFePO4, 51,2 V, 10,24 kWh | 22 kW, 3-fas 32 A, Typ 2 |
| AC | 10 000 W, 3/N/PE 400 V, 50/60 Hz, 15,2 A | — | 400 V, 50 Hz |
| Skydd | IP65, klass I, −25…+60 °C | IP55, −10…+50 °C | IP54, RCD-DD |
| Märken | CE, UKCA, IEC 62109 | CE, UKCA, IEC 62619 | CE, IEC 61851 |

## D. Arbetsflöde (obligatoriskt, i ordning)

1. Generera 2 kandidater per motiv (fal.ai MCP, Seedream 4.5, ~$0,04/bild;
   produktmiljö utan människor kan även köras på FLUX.2 pro).
2. Claude QA-granskar varje kandidat i zoom mot checklista A+B och
   redovisar avvikelser.
3. Ev. etikett-composite (C).
4. Leverans i chatten till Julian med QA-anteckningar.
5. **Julian ger OK per bild** (eller begär omtag med ändringar).
6. Först efter OK: konvertering till webp (kvalitet ~82, ≤300 kB),
   commit till `public/images/illustrationer/`, inkoppling i komponent
   med "Illustrationsbild"-tagg — på granskningsbar PR, aldrig direkt
   till produktionsbranchen.

## E. Promptregler (tillägg till prompt-biblioteket i higgsfield-bildplan.md)

Obligatoriska suffix i varje prompt:
`no text, no logos, completely unbranded white unit` — och för scener med
skärmar: `screen turned off / angled away from camera`.

Statusmotiven i omgång 2 (omtag enligt denna spec):
1. **Hembesök vid köksbordet** — omtag: laptop vinklad bort från kameran
   eller stängd; inga tröjloggor; kanelbullarna kvar.
2. **Överlämning vid laddbox** — omtag: laddboxen unbranded, ingen läsbar
   registreringsskylt, generisk elbil; "prylen i händerna" ersätts med
   naturligare gest (handslag eller laddhandtag).
3. **Batteri i hall** — omtag valfritt: A-kandidaten var nära; kör
   varianter med kablar helt i kanal.
4. **Installationsbilden** — godkänd som stil-ankare; etikett-composite
   klar och väntar på Julians OK.
