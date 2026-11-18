# Regler för den här kodbasen

## Bilder: bara eget material (upphovsrätt)

Efter ett ersättningskrav från en bildbyrå (november 2026) gäller utan undantag:

- Använd **bara** egna foton, egen grafik (byggd av siffror i innehållet) eller
  egna genererade bilder utan verkliga personer, logotyper eller varumärken.
- Hämta **aldrig** bilder från nyhetsbyråer (TT, Getty m.fl.), tidningar,
  TV-skärmdumpar, bildsök, bildbanker, pressrum/mediebanker (riksdagen,
  myndigheter, energibolag) eller Wikimedia/Creative Commons. Pressbilders
  villkor gäller redaktionellt bruk, inte ett företags webbplats.
- Nyhetsbilder ligger i `public/news/` och ska ha credit som börjar med
  `Grafik: Optimera Energi` eller `Foto: Optimera Energi`. Finns ingen egen
  bild: gör en grafik av artikelns siffror i samma stil som de befintliga.
- Kör `npm run check:news` före publicering. Bygget stoppar nyhetsbilder som
  bryter mot regeln (`newsImageIssues` i `src/lib/news.ts`).
