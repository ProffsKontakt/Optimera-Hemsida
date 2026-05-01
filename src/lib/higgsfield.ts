// Tunn klient mot Higgsfield video-API.
// Endpointarna nedan är baserade på publik dokumentation och kan behöva
// justeras när du har din slutliga API-nyckel och kontotyp. Allt som rör
// auth ska bara köras server-side — aldrig från klienten.

export type HiggsfieldGenerateRequest = {
  prompt: string;
  // Higgsfield har olika modeller för text-till-video och bild-till-video.
  // Vanliga val: "soul" (estetisk fotorealism), "lite" (snabb), "turbo".
  model?: "soul" | "lite" | "turbo";
  duration?: 5 | 10;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  // För bild-till-video: lägg in en första bild.
  startImageUrl?: string;
  // Stylepresets (kameraflöden, motion intensities m.m.).
  style?: string;
  // Extern referensnyckel för att kunna länka tillbaka till en CMS-post.
  reference?: string;
};

export type HiggsfieldJob = {
  id: string;
  status: "queued" | "processing" | "succeeded" | "failed";
  videoUrl?: string;
  posterUrl?: string;
  errorMessage?: string;
  createdAt: string;
};

const BASE = process.env.HIGGSFIELD_API_URL ?? "https://api.higgsfield.ai/v1";

function authHeaders() {
  const key = process.env.HIGGSFIELD_API_KEY;
  if (!key) throw new Error("HIGGSFIELD_API_KEY saknas i miljön");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function generate(
  body: HiggsfieldGenerateRequest,
): Promise<HiggsfieldJob> {
  const res = await fetch(`${BASE}/videos`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      prompt: body.prompt,
      model: body.model ?? "soul",
      duration: body.duration ?? 5,
      aspect_ratio: body.aspectRatio ?? "16:9",
      start_image_url: body.startImageUrl,
      style: body.style,
      reference: body.reference,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Higgsfield generate misslyckades (${res.status}): ${text}`);
  }
  const json = (await res.json()) as Record<string, unknown>;
  return normalize(json);
}

export async function status(id: string): Promise<HiggsfieldJob> {
  const res = await fetch(`${BASE}/videos/${id}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Higgsfield status misslyckades (${res.status}): ${text}`);
  }
  const json = (await res.json()) as Record<string, unknown>;
  return normalize(json);
}

function normalize(j: Record<string, unknown>): HiggsfieldJob {
  return {
    id: String(j.id ?? ""),
    status: (j.status as HiggsfieldJob["status"]) ?? "queued",
    videoUrl: (j.video_url as string) ?? (j.videoUrl as string),
    posterUrl: (j.poster_url as string) ?? (j.posterUrl as string),
    errorMessage: j.error as string | undefined,
    createdAt:
      (j.created_at as string) ??
      (j.createdAt as string) ??
      new Date().toISOString(),
  };
}
