/**
 * DEMO: lugn, statisk varumärkesrad som ersätter den animerade hero-marqueen.
 * Behåller trovärdighetssignalen (hårdvaran vi valt) men utan rörelse och utan
 * att konkurrera med hero:n om uppmärksamheten.
 */
const BRANDS = [
  "NIBE",
  "Easyway",
  "Easee",
  "Solis",
  "Bosch",
  "Emaldo",
  "Zaptec",
  "Enequi",
  "Mitsubishi",
  "SAJ",
  "Charge Amps",
  "IVT",
];

export function DemoBrandRow() {
  return (
    <div className="container-edge py-12 md:py-16">
      <div className="border-t border-ink/10 pt-8">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/40 mb-4">
          Hårdvara vi själva valt
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-2.5">
          {BRANDS.map((b) => (
            <span
              key={b}
              className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-ink/45"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
