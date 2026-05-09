import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Optimera Energi – byggd på kloka tankar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F1EA",
          display: "flex",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Brand-stripe (vertikal indigo→sun) */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 80,
            bottom: 80,
            width: 16,
            borderRadius: 8,
            background: "linear-gradient(180deg, #3648C3 0%, #FFDD6C 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0E0E0C",
              opacity: 0.55,
              fontFamily: "monospace",
            }}
          >
            Optimera Energi · Solna
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 110,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#0E0E0C",
                lineHeight: 1,
              }}
            >
              Hela energiomställningen
            </div>
            <div
              style={{
                fontSize: 110,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#3648C3",
                fontStyle: "italic",
                lineHeight: 1,
                marginTop: 8,
              }}
            >
              under ett tak.
            </div>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#0E0E0C",
              opacity: 0.65,
              maxWidth: 800,
            }}
          >
            Solpaneler, batterier, värmepumpar och laddboxar – byggda på
            kloka tankar.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
