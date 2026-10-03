"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/**
 * Dela-knapp för nyhetsartiklar. På telefon öppnar den systemets egen
 * delningsmeny (Messenger, SMS, mejl …) via Web Share API; där det saknas
 * kopieras länken i stället.
 */
export function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* användaren avbröt delningen – inget att göra */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-5 text-[14px] text-ink/75 hover:text-ink hover:border-ink/40 transition"
    >
      {copied ? <Check size={15} /> : <Share2 size={15} />}
      {copied ? "Länken är kopierad" : "Dela artikeln"}
    </button>
  );
}
