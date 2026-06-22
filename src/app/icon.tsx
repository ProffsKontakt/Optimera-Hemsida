import { ImageResponse } from "next/og";

/**
 * Märkes-favicon (lodrät "1"-stapel i indigo→gul-gradient på rundad bakgrund)
 * renderad som PNG via Next:s ImageResponse.
 *
 * Storlek 192×192 följer Googles officiella rekommendation för SERP-favicons:
 * "multiple of 48px square; for example: 48×48, 96×96, 144×144, 192×192".
 * Tidigare 64×64 var off-spec och kunde göra att Google avvisade vår favicon
 * och behöll den gamla Loopia-parkeringsikonen i sökresultaten.
 */

export const size = { width: 192, height: 192 };
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
            width: 36,
            height: 150,
            background: "#F4F1EA",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
