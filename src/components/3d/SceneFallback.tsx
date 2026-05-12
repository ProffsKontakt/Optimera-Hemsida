"use client";

/**
 * SceneFallback – stillbilds-varianter av 3D-scenerna.
 *
 * När WebGL inte kan skapas faller varje 3D-canvas tillbaka till en
 * stiliserad SVG-illustration. Designade i samma cream/ink/indigo-palett
 * som logon så att det ser intentionellt ut snarare än trasigt.
 *
 * Varianter:
 *  - "hero"     : startsidans dekorativa scen (solpanel + batteri + värmepump)
 *  - "house"    : kalkylatorns 1:1-husmodell
 *  - "solpaneler", "batterier", "vaermepumpar", "laddboxar"
 *      tjänste-vignetterna på /tjanster och home-grid
 */

export type SceneFallbackKind =
  | "hero"
  | "house"
  | "solpaneler"
  | "batterier"
  | "vaermepumpar"
  | "laddboxar";

export function SceneFallback({ kind }: { kind: SceneFallbackKind }) {
  return (
    <div className="absolute inset-0 bg-cream grid place-items-center overflow-hidden">
      <svg
        viewBox="0 0 240 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Subtilt rutnät för att matcha den faktiska 3D-scenen */}
        <defs>
          <pattern id="floor-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9aa590" strokeOpacity="0.25" strokeWidth="0.4" />
          </pattern>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3648C3" />
            <stop offset="100%" stopColor="#FFDD6C" />
          </linearGradient>
        </defs>
        <rect width="240" height="180" fill="url(#floor-grid)" />
        {renderSubject(kind)}
      </svg>
    </div>
  );
}

function renderSubject(kind: SceneFallbackKind) {
  switch (kind) {
    case "solpaneler":
      return <SolarPanelArt />;
    case "batterier":
      return <BatteryArt />;
    case "vaermepumpar":
      return <HeatPumpArt />;
    case "laddboxar":
      return <ChargerArt />;
    case "house":
      return <HouseArt />;
    case "hero":
    default:
      return <HeroArt />;
  }
}

// ---------- Subjekt-illustrationer ----------

function SolarPanelArt() {
  // Tre paneler i rad, lite vinklade. Matchar PanelArray-utseendet.
  return (
    <g transform="translate(40 70)">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 56} ${i * 6}) skewX(-12)`}>
          <rect width="50" height="62" rx="2" fill="#0E0E0C" />
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 3 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={4 + c * 14}
                y={4 + r * 11.5}
                width="12"
                height="9.5"
                fill="#0a2a44"
                stroke="#1f3a55"
                strokeWidth="0.5"
              />
            )),
          )}
        </g>
      ))}
    </g>
  );
}

function BatteryArt() {
  // Easyway-stack: 4 vita moduler + bottenchassi + topp-BMS, svart handle.
  return (
    <g transform="translate(95 24)">
      {/* Bottenchassi */}
      <rect x="-2" y="124" width="54" height="8" rx="1.5" fill="#dde2ec" />
      {/* 4 batterimoduler */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${124 - 18 - i * 22})`}>
          <rect width="50" height="20" rx="1.5" fill="#F4F1EA" stroke="#cdd3df" strokeWidth="0.5" />
          {i % 2 === 0 && <rect x="32" y="13" width="14" height="3.5" rx="1" fill="#1A1A17" />}
        </g>
      ))}
      {/* Topp-modul (BMS) */}
      <g transform="translate(0 28)">
        <rect width="50" height="14" rx="1.5" fill="#F4F1EA" stroke="#cdd3df" strokeWidth="0.5" />
        <rect x="14" y="3" width="22" height="8" fill="#0E0E0C" />
        <circle cx="6" cy="7" r="1.5" fill="#3F5236" />
      </g>
    </g>
  );
}

function HeatPumpArt() {
  // Mörk box med vit cirkulär fläkt + ring runt. Matchar HeatPumpUnit.
  return (
    <g transform="translate(72 56)">
      <rect width="96" height="68" rx="3" fill="#2A2A26" />
      {/* Fläkt-ring */}
      <circle cx="48" cy="34" r="24" fill="#0E0E0C" />
      <circle cx="48" cy="34" r="18" fill="none" stroke="#3a3a35" strokeWidth="1" />
      {/* Fläktblad */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <rect
            key={i}
            x={48 - 1.5}
            y={34 - 14}
            width="3"
            height="14"
            fill="#F4F1EA"
            transform={`rotate(${(angle * 180) / Math.PI} 48 34)`}
          />
        );
      })}
      <circle cx="48" cy="34" r="3" fill="#E9B949" />
      {/* Logo-streck för djup */}
      <rect x="6" y="56" width="20" height="4" rx="1" fill="#0E0E0C" />
    </g>
  );
}

function ChargerArt() {
  // Gul/cream box med svart display + spiralad kabel.
  return (
    <g transform="translate(95 36)">
      {/* Huvudbox */}
      <rect width="50" height="100" rx="6" fill="#F4F1EA" stroke="#cdd3df" strokeWidth="0.6" />
      {/* Display */}
      <rect x="10" y="14" width="30" height="22" rx="2" fill="#0E0E0C" />
      <rect x="14" y="20" width="22" height="10" rx="1" fill="#3F5236" opacity="0.5" />
      {/* LED-indikator */}
      <circle cx="25" cy="48" r="2.5" fill="#3648C3" />
      {/* Kontakt-platta */}
      <rect x="14" y="60" width="22" height="14" rx="2" fill="#1A1A17" />
      <rect x="18" y="64" width="14" height="6" rx="0.5" fill="#0E0E0C" />
      {/* Kabel */}
      <path
        d="M 50 90 Q 80 100 70 120 Q 60 140 80 145"
        stroke="#1A1A17"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function HouseArt() {
  // Sadeltak-villa med dörr + två fönster. Matchar CalcScene-husmodellen.
  return (
    <g transform="translate(30 40)">
      {/* Vägg */}
      <rect x="20" y="60" width="140" height="60" fill="#F4F1EA" stroke="#cdd3df" strokeWidth="0.6" />
      {/* Sadeltak */}
      <polygon points="20,60 90,15 160,60" fill="#3F5236" />
      {/* Dörr */}
      <rect x="80" y="86" width="20" height="34" fill="#1A1A17" />
      {/* Fönster */}
      <rect x="34" y="78" width="22" height="18" fill="#E9B949" opacity="0.55" />
      <rect x="120" y="78" width="22" height="18" fill="#E9B949" opacity="0.55" />
      {/* Solpaneler på taket (3 st) */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={56 + i * 24}
          y={42 + i * 0}
          width="22"
          height="12"
          fill="#0a2a44"
          stroke="#1f3a55"
          strokeWidth="0.5"
          transform={`rotate(-30 ${56 + i * 24 + 11} ${42 + 6})`}
        />
      ))}
    </g>
  );
}

function HeroArt() {
  // Komposition av panel + batteri + värmepump som flyter sida vid sida.
  return (
    <>
      <g transform="translate(20 60) scale(0.55)">
        <SolarPanelArt />
      </g>
      <g transform="translate(85 60) scale(0.55)">
        <BatteryArt />
      </g>
      <g transform="translate(150 50) scale(0.55)">
        <HeatPumpArt />
      </g>
    </>
  );
}
