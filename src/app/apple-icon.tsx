import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) för iOS-shortcuts/PWA-installation. Använder
 * samma märkesdesign som favicon. Genereras via Next ImageResponse så vi
 * slipper checka in binär bild.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "edge";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background:
            "linear-gradient(180deg, #3A4CC1 0%, #F1D372 100%)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 140,
            background: "#F4F1EA",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
