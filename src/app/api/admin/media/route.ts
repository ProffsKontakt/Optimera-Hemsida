import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import sharp from "sharp";
import { isAdminAuthed } from "@/lib/admin-auth";
import {
  ghGetFile,
  ghPutFile,
  isGitHubConfigured,
} from "@/lib/github";
import {
  DEFAULT_MAX_WIDTH,
  isValidSlot,
  listMediaSlots,
  type MediaManifest,
} from "@/lib/media";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MANIFEST = "data/media-manifest.json";
const MAX_BYTES = 20 * 1024 * 1024; // 20 MB in – komprimeras ändå ned direkt

/** WebP-kvalitet. 82 = visuellt identisk med originalet i praktiken. */
const WEBP_QUALITY = 82;

/**
 * Ger admin GitHubs egen förklaring ("token har gått ut → förnya
 * GITHUB_TOKEN i Vercel") i stället för ett stumt 502. Samma mönster som
 * /api/admin/team.
 */
function githubFailure(action: string, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  // eslint-disable-next-line no-console
  console.error(`[admin/media] ${action} misslyckades:`, err);
  return NextResponse.json(
    { error: `${action}: ${msg}`, details: String(err) },
    { status: 502 },
  );
}

/**
 * Raderar en gammal blob – best effort, får aldrig fälla anropet.
 * Hoppar över sökvägar i repot (/team/...): de är statiska filer, inte
 * blobbar, och del() kastar på en icke-blob-URL.
 */
async function deleteBlobIfRemote(url: string | undefined) {
  if (!url || !url.startsWith("http")) return;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await del(url);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[admin/media] kunde inte rensa gammal blob:", err);
  }
}

/**
 * Komprimerar en uppladdad bild till webbstandarden: nedskalad till
 * slottets maxbredd (aldrig uppskalad), konverterad till WebP och rensad
 * på EXIF (inkl. GPS-position). `.rotate()` utan argument roterar enligt
 * EXIF-orientering först, annars hamnar mobilfoton på sidan.
 *
 * Beskär medvetet INTE till slottets aspect ratio – layouten sköter det
 * med object-cover, och en serverside-beskärning riskerar att kapa huvuden.
 */
async function compressImage(
  file: File,
  slotId: string,
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const maxWidth =
    listMediaSlots().find((s) => s.id === slotId)?.maxWidth ??
    DEFAULT_MAX_WIDTH;
  const input = Buffer.from(await file.arrayBuffer());
  const output = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  return {
    buffer: output.data,
    width: output.info.width,
    height: output.info.height,
  };
}

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
    return NextResponse.json({ error: "Bilden är för stor (max 20 MB)" }, { status: 413 });
  }

  try {
    // Komprimera FÖRE uppladdning – bara den optimerade WebP:en lagras.
    let compressed;
    try {
      compressed = await compressImage(file, slotId);
    } catch {
      return NextResponse.json(
        { error: "Kunde inte läsa bilden – är filen en giltig JPG/PNG/WebP?" },
        { status: 400 },
      );
    }

    const safeName =
      (file.name || "image")
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(-50) || "bild";
    const blob = await put(
      `media/${slotId.replace(":", "/")}/${safeName}.webp`,
      compressed.buffer,
      {
        access: "public",
        addRandomSuffix: true,
        contentType: "image/webp",
      },
    );

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
    if (previousUrl !== blob.url) await deleteBlobIfRemote(previousUrl);

    return NextResponse.json({
      ok: true,
      url: blob.url,
      alt,
      // Låter admin se att komprimeringen faktiskt gjorde jobbet.
      originalBytes: file.size,
      optimizedBytes: compressed.buffer.length,
      width: compressed.width,
      height: compressed.height,
    });
  } catch (err) {
    return githubFailure("Uppladdning misslyckades", err);
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
    return githubFailure("Uppdatering misslyckades", err);
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
    // Efter att manifestet sparats: rensa blobben. Får aldrig fälla svaret
    // – bilden är redan borta från sajten när manifestet är skrivet.
    await deleteBlobIfRemote(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return githubFailure("Borttagning misslyckades", err);
  }
}
