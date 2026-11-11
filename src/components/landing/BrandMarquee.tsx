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
    <ul
      className={`flex shrink-0 items-center motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Märken vi installerar"}
    >
      {BRANDS.map((b) => (
        <li
          key={b}
          className="whitespace-nowrap px-7 font-mono text-[13px] uppercase tracking-[0.26em] text-ink/65 md:px-10"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee() {
  return (
    // En dold kryssruta pausar rullningen: ett tryck på remsan (den täcks av
    // en osynlig <label>) eller mellanslag när rutan har fokus. Hovring
    // pausar också, och med "minska rörelse" står remsan still. Se
    // globals.css (.lp-marquee-wrap).
    <div className="lp-marquee-wrap ticker-mask relative overflow-hidden border-b border-ink/10 bg-bone py-5 motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]">
      <input
        id="lp-marquee-toggle"
        type="checkbox"
        className="lp-marquee-toggle sr-only motion-reduce:hidden"
        aria-label="Pausa den rullande listan med märken"
      />
      <label
        htmlFor="lp-marquee-toggle"
        aria-hidden="true"
        className="absolute inset-0 z-10 cursor-pointer motion-reduce:hidden"
      />
      <div className="lp-marquee flex w-max motion-reduce:w-full">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
