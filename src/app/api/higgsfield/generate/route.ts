import { NextResponse } from "next/server";
import { z } from "zod";
import { generate } from "@/lib/higgsfield";

const Schema = z.object({
  prompt: z.string().min(8),
  model: z.enum(["soul", "lite", "turbo"]).optional(),
  duration: z.union([z.literal(5), z.literal(10)]).optional(),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]).optional(),
  startImageUrl: z.string().url().optional(),
  style: z.string().optional(),
  reference: z.string().optional(),
});

export async function POST(req: Request) {
  if (!process.env.HIGGSFIELD_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Higgsfield är inte konfigurerad. Sätt HIGGSFIELD_API_KEY i .env.local för att testa lokalt.",
      },
      { status: 503 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  try {
    const job = await generate(parsed.data);
    return NextResponse.json(job);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown" },
      { status: 502 },
    );
  }
}
