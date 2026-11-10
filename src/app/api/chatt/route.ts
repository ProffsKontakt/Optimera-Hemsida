import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildChatSystemPrompt } from "@/lib/chat-knowledge";
import {
  CHAT_DEFAULT_MODEL,
  CHAT_MAX_HISTORY,
  CHAT_MAX_MESSAGE_CHARS,
  CHAT_MAX_OUTPUT_TOKENS,
  CHAT_RATE,
  chatEnabled,
} from "@/lib/chat-config";

/**
 * Sajtens AI-chatt. Tar emot samtalet, svarar med strömmad text.
 *
 * Modellen får bara sajtens faktagranskade kunskapsunderlag
 * (lib/chat-knowledge.ts) och inga verktyg: den kan varken läsa eller
 * skriva något. Vill besökaren bli kontaktad sker det via formuläret i
 * widgeten, som går till /api/offert som vanligt.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

// Modeller som stöder serverstyrd reservmodell när ett svar avböjs.
const FALLBACK_CAPABLE = new Set([
  "claude-opus-5-5",
  "claude-opus-5",
  "claude-sonnet-5-5",
  "claude-fable-5-2",
  "claude-fable-5-1",
]);

const REFUSAL_TEXT =
  "Det kan jag tyvärr inte svara på här. Ring oss på 076 305 37 32 eller använd knappen Bli uppringd, så hjälper en kollega dig.";
const INTERRUPTED_TEXT =
  "\n\nSvaret avbröts. Försök gärna igen, eller ring oss på 076 305 37 32.";

// --- Enkel spärr per besökare ------------------------------------------------
// Minnet delas inte mellan serverinstanser, så spärren är ett grovt skydd mot
// att en enskild besökare eller ett skript drar iväg med kostnaden. Det hårda
// taket sätts som utgiftsgräns i Anthropic-konsolen.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < CHAT_RATE.dayWindowMs);
  const short = recent.filter((t) => now - t < CHAT_RATE.shortWindowMs).length;
  if (short >= CHAT_RATE.shortMax || recent.length >= CHAT_RATE.dayMax) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < CHAT_RATE.dayWindowMs)) hits.delete(key);
    }
  }
  return false;
}

function json(status: number, error: string, message: string): Response {
  return Response.json({ error, message }, { status, headers: { "Cache-Control": "no-store" } });
}

/** Tillåt bara anrop från sajten själv (skydd mot inbäddning på andra sajter). */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: Request): Promise<Response> {
  if (!chatEnabled()) {
    return json(503, "disabled", "Chatten är inte aktiverad.");
  }
  if (!sameOrigin(req)) {
    return json(403, "forbidden", "Otillåten avsändare.");
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json(400, "invalid_json", "Ogiltig förfrågan.");
  }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    return json(400, "validation", "Ogiltig förfrågan.");
  }

  // Bara de senaste meddelandena skickas med, och samtalet ska börja och
  // sluta med besökaren.
  let messages = parsed.data.messages.slice(-CHAT_MAX_HISTORY);
  while (messages.length && messages[0].role !== "user") messages = messages.slice(1);
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return json(400, "validation", "Sista meddelandet ska komma från besökaren.");
  }
  if (last.content.length > CHAT_MAX_MESSAGE_CHARS) {
    return json(400, "too_long", "Meddelandet är för långt. Korta gärna ner frågan.");
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "okänd";
  if (rateLimited(ip)) {
    return json(
      429,
      "rate_limited",
      "Du har ställt många frågor på kort tid. Vänta en stund, eller ring oss på 076 305 37 32.",
    );
  }

  const model = process.env.CHAT_MODEL || CHAT_DEFAULT_MODEL;
  const client = new Anthropic();
  const system = await buildChatSystemPrompt();

  const stream = client.beta.messages.stream({
    model,
    max_tokens: CHAT_MAX_OUTPUT_TOKENS,
    // Korta kundsvar ur ett givet underlag: låg ansträngning räcker och
    // håller svarstid och kostnad nere.
    output_config: { effort: "low" },
    // Underlaget är detsamma för alla besökare och cachas hos modellen.
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages,
    // Avböjer modellen att svara tar en reservmodell över i samma anrop.
    ...(FALLBACK_CAPABLE.has(model)
      ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
      : {}),
  });

  // Vänta in första händelsen innan svaret börjar strömmas, så att fel som
  // ogiltig nyckel eller överbelastning kan ges en riktig statuskod.
  const events = stream[Symbol.asyncIterator]();
  let first: Awaited<ReturnType<typeof events.next>>;
  try {
    first = await events.next();
  } catch (err) {
    return upstreamError(err);
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      const handle = (event: Anthropic.Beta.BetaRawMessageStreamEvent) => {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
          sentText = true;
        }
      };
      try {
        if (!first.done) handle(first.value);
        for (let next = await events.next(); !next.done; next = await events.next()) {
          handle(next.value);
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" || !sentText) {
          if (!sentText) controller.enqueue(encoder.encode(REFUSAL_TEXT));
        } else if (final.stop_reason === "max_tokens") {
          controller.enqueue(encoder.encode(" …"));
        }
        // Förbrukning per svar, för uppföljning av kostnad och cacheträffar.
        // eslint-disable-next-line no-console
        console.log("[chatt]", {
          model: final.model,
          stop: final.stop_reason,
          input: final.usage.input_tokens,
          cacheRead: final.usage.cache_read_input_tokens,
          cacheWrite: final.usage.cache_creation_input_tokens,
          output: final.usage.output_tokens,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[chatt] strömmen avbröts", err);
        controller.enqueue(encoder.encode(sentText ? INTERRUPTED_TEXT : REFUSAL_TEXT));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

function upstreamError(err: unknown): Response {
  // eslint-disable-next-line no-console
  console.error("[chatt] anropet till modellen misslyckades", err);
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
    return json(503, "misconfigured", "Chatten är tillfälligt ur funktion. Ring oss på 076 305 37 32.");
  }
  if (err instanceof Anthropic.RateLimitError) {
    return json(429, "busy", "Många frågar samtidigt just nu. Försök igen om en liten stund.");
  }
  if (err instanceof Anthropic.BadRequestError) {
    return json(502, "upstream_rejected", "Frågan gick inte att behandla. Försök formulera om den.");
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return json(502, "upstream_unreachable", "Chatten når inte fram just nu. Försök igen om en liten stund.");
  }
  if (err instanceof Anthropic.APIError) {
    return json(502, "upstream_error", "Chatten svarar inte just nu. Försök igen om en liten stund.");
  }
  return json(500, "error", "Något gick fel. Försök igen, eller ring oss på 076 305 37 32.");
}
