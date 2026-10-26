/**
 * När /fragor-och-svar senast faktagranskades mot kunskapsbanken.
 *
 * Datumet visas som "Faktagranskad …" på sidan och används som lastmod i
 * sitemapen. Veckorutinen för kunskapsbanken (docs/kunskapsbank.md, steg 7)
 * går igenom alla svar på sidan varje vecka, rättar det som inte stämmer
 * med kunskapsbanken och sätter då ett nytt datum här – även om inget
 * behövde ändras. Sätt bara datumet när svaren faktiskt har granskats.
 */
export const FAQ_REVIEWED_AT = "2026-10-26";
