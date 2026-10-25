import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { fetchRecoReviews } from "@/lib/reco-live";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * De senaste omdömena från Reco-profilen, färdiga att läggas in i
 * /admin/recensioner. Själva sparandet sker som vanligt via PUT på
 * /api/admin/reviews, så admin kan läsa och justera innan något går live.
 */
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await fetchRecoReviews());
  } catch (err) {
    return NextResponse.json(
      { error: "Kunde inte hämta från Reco just nu", details: String(err) },
      { status: 502 },
    );
  }
}
