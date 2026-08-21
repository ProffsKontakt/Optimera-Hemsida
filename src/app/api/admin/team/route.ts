import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthed } from "@/lib/admin-auth";
import { ghGetFile, ghPutFile, isGitHubConfigured } from "@/lib/github";
import { getTeam, TEAM_COLORS } from "@/lib/team";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEAM_FILE = "data/team.json";

const MemberSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(40)
    .regex(/^[a-z0-9-]+$/, "id: bara små bokstäver, siffror och bindestreck"),
  name: z.string().min(1).max(80),
  role: z.string().min(1).max(80),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().max(20).default(""),
  color: z.string().max(80).default(""),
  bio: z.string().max(500).default(""),
});

const Schema = z.array(MemberSchema).min(1).max(30);

/** Nuvarande team (admin-redigerat eller default). */
export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ team: getTeam() });
}

/** Ersätt hela teamlistan. Committas till data/team.json -> live efter deploy. */
export async function PUT(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub env vars saknas i Vercel" }, { status: 500 });
  }
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body?.team);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ogiltig teamdata", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const ids = parsed.data.map((m) => m.id);
  if (new Set(ids).size !== ids.length) {
    return NextResponse.json(
      { error: "Två medlemmar har samma id – gör dem unika" },
      { status: 400 },
    );
  }
  // Auto-tilldela gradient till medlemmar utan färg.
  const team = parsed.data.map((m, i) => ({
    ...m,
    color: m.color || TEAM_COLORS[i % TEAM_COLORS.length],
  }));
  try {
    const existing = await ghGetFile(TEAM_FILE);
    await ghPutFile({
      path: TEAM_FILE,
      message: "team: uppdatera teamet via admin",
      content: JSON.stringify(team, null, 2) + "\n",
      sha: existing?.sha,
    });
    return NextResponse.json({ ok: true, team });
  } catch (err) {
    return NextResponse.json(
      { error: "Kunde inte spara", details: String(err) },
      { status: 502 },
    );
  }
}
