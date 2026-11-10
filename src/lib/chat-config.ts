/**
 * Inställningar för sajtens AI-chatt. Fri från React och SDK-importer så
 * att både servern (API-rutten, layouten) och klienten kan läsa den.
 */

/** Modell för chatten. Byt med miljövariabeln CHAT_MODEL i Vercel. */
export const CHAT_DEFAULT_MODEL = "claude-opus-5-5";

/** Längsta meddelande en besökare får skicka (tecken). */
export const CHAT_MAX_MESSAGE_CHARS = 1200;

/** Så många meddelanden av samtalet skickas med till modellen. */
export const CHAT_MAX_HISTORY = 16;

/** Tak för svarslängden, inklusive modellens tankearbete. */
export const CHAT_MAX_OUTPUT_TOKENS = 4000;

/** Per besökare (IP): meddelanden per fönster. */
export const CHAT_RATE = {
  shortWindowMs: 5 * 60 * 1000,
  shortMax: 12,
  dayWindowMs: 24 * 60 * 60 * 1000,
  dayMax: 60,
};

/**
 * Chatten är på först när en API-nyckel finns i miljön och den inte är
 * avstängd med CHAT_ENABLED=false. Körs bara på servern.
 */
export function chatEnabled(): boolean {
  if (process.env.CHAT_ENABLED === "false") return false;
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

/** Sidor där chatten inte visas (admin, studio och själva offertflödet). */
export const CHAT_HIDDEN_PREFIXES = ["/admin", "/studio", "/offert", "/ring"];
