import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdminAuthed } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Token-route för videouppladdning direkt från webbläsaren till Vercel Blob.
 *
 * Varför inte samma route som bilderna: en serverless-funktion tar emot
 * högst ~4,5 MB per anrop, och en film är hundratals MB. Här skickas filen
 * aldrig genom servern – vi delar bara ut en kortlivad token som låter
 * admin-klienten ladda upp EN videofil, av rätt typ och storlek, under
 * media/om-oss/. Själva URL:en sparas sedan i manifestet via PATCH
 * /api/admin/media (samma GitHub-commit-flöde som allt annat media).
 */
const MAX_VIDEO_BYTES = 500 * 1024 * 1024; // 500 MB

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Vercel Blob saknas – lägg till en Blob-store i Vercel (env BLOB_READ_WRITE_TOKEN)" },
      { status: 503 },
    );
  }
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) {
    return NextResponse.json({ error: "Ogiltig förfrågan" }, { status: 400 });
  }
  // Token-förfrågan kommer från admin-klienten och kräver inloggning.
  // (Vi använder ingen onUploadCompleted-callback, så inga anrop från Blob
  // själv förväntas hit.)
  if (body.type === "blob.generate-client-token" && !isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAdminAuthed()) throw new Error("unauthorized");
        if (!pathname.startsWith("media/om-oss/")) {
          throw new Error("Ogiltig sökväg för videouppladdning");
        }
        return {
          allowedContentTypes: [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/x-m4v",
          ],
          maximumSizeInBytes: MAX_VIDEO_BYTES,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error("[admin/media/video-upload]", err);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
