import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthed } from "@/lib/admin-auth";
import {
  ghGetFile,
  ghPutFile,
  ghDeleteFile,
  isGitHubConfigured,
} from "@/lib/github";
import type { PressRelease } from "@/lib/press";

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,80}[a-z0-9])?$/;

const PressSchema = z.object({
  slug: z.string().regex(SLUG_RE, {
    message:
      "Slug måste vara små bokstäver, siffror eller bindestreck (max 82 tecken)",
  }),
  title: z.string().min(4).max(180),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Datum måste vara ISO (yyyy-mm-dd)",
  }),
  lede: z.string().min(20).max(600),
  body: z.string().min(40),
  author: z.object({
    name: z.string().min(2),
    title: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7).max(30),
  }),
  quote: z
    .object({
      text: z.string().min(10),
      attribution: z.string().min(2),
    })
    .optional(),
});

function pathFor(slug: string) {
  return `data/press/${slug}.json`;
}

/** Skapa nytt pressmeddelande. Felar om slug redan finns. */
export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub env vars saknas i Vercel" },
      { status: 500 },
    );
  }
  const body = await req.json().catch(() => ({}));
  const parsed = PressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const file = pathFor(data.slug);

  try {
    const existing = await ghGetFile(file);
    if (existing) {
      return NextResponse.json(
        { error: "Slug finns redan, välj annan eller redigera befintlig" },
        { status: 409 },
      );
    }
    const release: PressRelease = data;
    const commit = await ghPutFile({
      path: file,
      message: `press: publicera "${data.title}"`,
      content: JSON.stringify(release, null, 2) + "\n",
    });
    return NextResponse.json({ ok: true, commit });
  } catch (err) {
    return NextResponse.json(
      { error: "GitHub-commit misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}

/** Uppdatera befintligt pressmeddelande. */
export async function PATCH(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub env vars saknas i Vercel" },
      { status: 500 },
    );
  }
  const body = await req.json().catch(() => ({}));
  const parsed = PressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const file = pathFor(data.slug);

  try {
    const existing = await ghGetFile(file);
    if (!existing) {
      return NextResponse.json(
        { error: "Hittar inte pressmeddelandet" },
        { status: 404 },
      );
    }
    const release: PressRelease = data;
    const commit = await ghPutFile({
      path: file,
      message: `press: uppdatera "${data.title}"`,
      content: JSON.stringify(release, null, 2) + "\n",
      sha: existing.sha,
    });
    return NextResponse.json({ ok: true, commit });
  } catch (err) {
    return NextResponse.json(
      { error: "GitHub-commit misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}

/** Ta bort pressmeddelande. */
export async function DELETE(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub env vars saknas i Vercel" },
      { status: 500 },
    );
  }
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug || !SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Ogiltig slug" }, { status: 400 });
  }
  const file = pathFor(slug);
  try {
    const existing = await ghGetFile(file);
    if (!existing) {
      return NextResponse.json({ ok: true, note: "Redan borttagen" });
    }
    const commit = await ghDeleteFile({
      path: file,
      message: `press: ta bort ${slug}`,
      sha: existing.sha,
    });
    return NextResponse.json({ ok: true, commit });
  } catch (err) {
    return NextResponse.json(
      { error: "GitHub-delete misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}
