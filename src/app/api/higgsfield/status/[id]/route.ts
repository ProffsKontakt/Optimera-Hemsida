import { NextResponse } from "next/server";
import { status } from "@/lib/higgsfield";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  if (!process.env.HIGGSFIELD_API_KEY) {
    return NextResponse.json(
      { error: "Higgsfield är inte konfigurerad." },
      { status: 503 },
    );
  }
  try {
    const job = await status(params.id);
    return NextResponse.json(job);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown" },
      { status: 502 },
    );
  }
}
