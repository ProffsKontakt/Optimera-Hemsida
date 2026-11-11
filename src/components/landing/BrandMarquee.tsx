/**
 * Rullande rad med märkena vi installerar. Listan ligger två gånger efter
 * varandra och förskjuts halva sin bredd i en oändlig CSS-animation, vilket
 * ger ett sömlöst band utan JavaScript. Stannar när man för pekaren över och
 * står stilla för besökare som valt reducerad rörelse.
 */
const BRANDS = [
  "NIBE",
  "Eway",
  "Easee",
  "Solis",
  "Bosch",
  "Enershare",
  "Zaptec",
  "Mitsubishi",
  "SAJ",
  "Charge Amps",
  "IVT",
  "JA Solar",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {BRANDS.map((b) => (
        <li
          key={b}
          className="whitespace-nowrap px-7 font-mono text-[13px] uppercase tracking-[0.26em] text-ink/50 md:px-10"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee() {
  return (
    <div
      className="lp-marquee-wrap overflow-hidden border-b border-ink/10 bg-bone py-5"
      aria-label="Märken vi installerar"
    >
      <div className="lp-marquee flex w-max motion-reduce:flex-wrap">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
