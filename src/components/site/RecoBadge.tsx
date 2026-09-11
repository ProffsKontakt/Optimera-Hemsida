/**
 * Recos "Rekommenderat företag 2026".
 *
 * Vi serverar SVG:n själva i stället för att köra
 * widget.reco.se/badge/2026/6073291.js. Scriptet gör inget annat än att sätta
 * innerHTML med exakt samma statiska SVG (base64-kodad) – men kostar 20 kB JS,
 * en extra tredjepartsförfrågan och ger en extern domän skrivrättighet på våra
 * sidor. Byt public/reco-badge-2026.svg när 2027-badgen släpps (Recos egen
 * script-URL är också årsbunden, så den hade behövt bytas ändå).
 *
 * tilt: lutar badgen några grader så den läser som en påklistrad sticker och
 * rätar upp sig vid hover.
 */
export function RecoBadge({
  size = 72,
  tilt = false,
  className = "",
}: {
  size?: number;
  tilt?: boolean;
  className?: string;
}) {
  return (
    <a
      href="https://www.reco.se/optimera-energi"
      target="_blank"
      rel="noopener noreferrer"
      title="Rekommenderat företag 2026 på Reco.se"
      className={`shrink-0 transition-transform duration-300 hover:scale-[1.06] ${
        tilt ? "-rotate-6 hover:rotate-0" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/reco-badge-2026.svg"
        alt="Rekommenderat företag 2026 på Reco"
        width={size}
        height={size}
        className="h-full w-full"
        loading="lazy"
      />
    </a>
  );
}
