import { ImageResponse } from "next/og";

/**
 * Renderar samma märkes-favicon (lodrät "1"-stapel i indigo→gul-gradient på
 * rundad bakgrund) som PNG via Next:s ImageResponse, så browsers som hämtar
 * /icon (eller fallback /favicon.ico) får en riktig rasterbild oavsett om de
 * stödjer SVG-favicon. Tidigare 404:ade /favicon.ico, vilket gav vissa
 * webbläsare utrymme att visa cachad ikon från tidigare DNS-konfiguration
 * (Loopia-parkering).
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #3A4CC1 0%, #F1D372 100%)",
        }}
      >
        <div
          style={{
            width: 12,
            height: 50,
            background: "#F4F1EA",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
