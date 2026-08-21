import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { isAdminAuthed } from "@/lib/admin-auth";
import {
  ghGetFile,
  ghPutFile,
  isGitHubConfigured,
} from "@/lib/github";
import { isValidSlot, type MediaManifest } from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MANIFEST = "data/media-manifest.json";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

async function readManifest(): Promise<{ data: MediaManifest; sha?: string }> {
  const file = await ghGetFile(MANIFEST);
  if (!file) return { data: {} };
  try {
    const json = Buffer.from(file.contentBase64, "base64").toString("utf-8");
    return { data: JSON.parse(json) as MediaManifest, sha: file.sha };
  } catch {
    return { data: {}, sha: file.sha };
  }
}

async function writeManifest(
  data: MediaManifest,
  sha: string | undefined,
  message: string,
) {
  await ghPutFile({
    path: MANIFEST,
    message,
    content: JSON.stringify(data, null, 2) + "\n",
    sha,
  });
}

/** Ladda upp en bild till en slot (Blob) + uppdatera manifestet. */
export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Vercel Blob saknas – lägg till en Blob-store i Vercel (env BLOB_READ_WRITE_TOKEN)" },
      { status: 503 },
    );
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub env vars saknas i Vercel" },
      { status: 500 },
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Förväntade multipart/form-data" }, { status: 400 });
  }
  const slotId = String(form.get("slotId") ?? "");
  const alt = String(form.get("alt") ?? "").slice(0, 300);
  const frost = parseFrost(form.get("frost"));
  const file = form.get("file");

  if (!isValidSlot(slotId)) {
    return NextResponse.json({ error: "Okänd slot" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Ingen fil bifogad" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Endast bildfiler tillåts" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Bilden är för stor (max 8 MB)" }, { status: 413 });
  }

  try {
    const safeName = (file.name || "image")
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .slice(-60);
    const blob = await put(`media/${slotId.replace(":", "/")}/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    const { data, sha } = await readManifest();
    const previousUrl = data[slotId]?.url;
    data[slotId] = {
      url: blob.url,
      alt,
      updatedAt: new Date().toISOString(),
      ...(frost !== undefined ? { frost } : {}),
    };
    await writeManifest(data, sha, `media: sätt bild för ${slotId}`);

    // Rensa gammal blob så vi inte samlar skräp (best effort).
    if (previousUrl && previousUrl !== blob.url) {
      del(previousUrl).catch(() => {});
    }

    return NextResponse.json({ ok: true, url: blob.url, alt });
  } catch (err) {
    return NextResponse.json(
      { error: "Uppladdning misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}

/** Klampa frostningsgraden till ett heltal 0–100, eller undefined. */
function parseFrost(raw: unknown): number | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  const n = Math.round(Number(raw));
  if (!Number.isFinite(n)) return undefined;
  return Math.min(100, Math.max(0, n));
}

/**
 * Uppdatera inställningar (frostning/alt) för en slot som redan har en
 * bild – utan att ladda upp om bilden.
 */
export async function PATCH(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub env vars saknas" }, { status: 500 });
  }
  const body = (await req.json().catch(() => null)) as
    | { slotId?: string; frost?: unknown; alt?: unknown }
    | null;
  const slotId = String(body?.slotId ?? "");
  if (!isValidSlot(slotId)) {
    return NextResponse.json({ error: "Okänd slot" }, { status: 400 });
  }
  try {
    const { data, sha } = await readManifest();
    const entry = data[slotId];
    if (!entry) {
      return NextResponse.json(
        { error: "Ingen bild uppladdad för sloten ännu" },
        { status: 404 },
      );
    }
    const frost = parseFrost(body?.frost);
    if (frost !== undefined) entry.frost = frost;
    if (typeof body?.alt === "string") entry.alt = body.alt.slice(0, 300);
    entry.updatedAt = new Date().toISOString();
    await writeManifest(data, sha, `media: uppdatera inställningar för ${slotId}`);
    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    return NextResponse.json(
      { error: "Uppdatering misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}

/** Ta bort bilden för en slot. */
export async function DELETE(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json({ error: "GitHub env vars saknas" }, { status: 500 });
  }
  const slotId = new URL(req.url).searchParams.get("slotId") ?? "";
  if (!isValidSlot(slotId)) {
    return NextResponse.json({ error: "Okänd slot" }, { status: 400 });
  }
  try {
    const { data, sha } = await readManifest();
    const url = data[slotId]?.url;
    if (!data[slotId]) return NextResponse.json({ ok: true, note: "Redan tom" });
    delete data[slotId];
    await writeManifest(data, sha, `media: ta bort bild för ${slotId}`);
    if (url) del(url).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Borttagning misslyckades", details: String(err) },
      { status: 502 },
    );
  }
}
