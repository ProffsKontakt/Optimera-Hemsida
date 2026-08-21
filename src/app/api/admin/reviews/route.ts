import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthed } from "@/lib/admin-auth";
import { ghGetFile, ghPutFile, isGitHubConfigured } from "@/lib/github";
import { getAllReviews } from "@/lib/reviews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE = "data/reviews.json";

const ReviewSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "id: bara små bokstäver, siffror och bindestreck"),
  author: z.string().min(1).max(80),
  place: z.string().max(80).default(""),
  text: z.string().min(1).max(1200),
  visible: z.boolean().default(true),
});

const Schema = z.array(ReviewSchema).max(50);

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ reviews: getAllReviews() });
}

/** Ersätt hela recensionslistan. Committas -> live efter deploy. */
export async function PUT(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub env vars saknas i Vercel" }, { status: 500 });
  }
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body?.reviews);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ogiltig recensionsdata", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const ids = parsed.data.map((r) => r.id);
  if (new Set(ids).size !== ids.length) {
    return NextResponse.json(
      { error: "Två recensioner har samma id – gör dem unika" },
      { status: 400 },
    );
  }
  try {
    const existing = await ghGetFile(FILE);
    await ghPutFile({
      path: FILE,
      message: "reviews: uppdatera recensioner via admin",
      content: JSON.stringify(parsed.data, null, 2) + "\n",
      sha: existing?.sha,
    });
    return NextResponse.json({ ok: true, reviews: parsed.data });
  } catch (err) {
    return NextResponse.json(
      { error: "Kunde inte spara", details: String(err) },
      { status: 502 },
    );
  }
}
