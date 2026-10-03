"use client";

import { useEffect, useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { parseVideoUrl } from "@/lib/video";

/**
 * Grundarfilmen på /om-oss.
 *
 * Klick-för-att-ladda: före klick renderas bara en omslagsbild och en
 * play-knapp – ingen videofil hämtas och ingen tredjepart kontaktas, så
 * sidan förblir snabb och inget spåras innan besökaren själv väljer.
 *
 * Egen uppladdad fil (Vercel Blob) spelas alltid. YouTube/Vimeo sätter
 * cookies, och Cookiebot kör auto-blockering på sajten – utan samtycke
 * till marknadsföringscookies skulle spelaren bli en tom ruta. Då visas i
 * stället en tydlig ruta: godkänn och spela här, eller öppna filmen hos
 * YouTube/Vimeo.
 */
type CookiebotApi = {
  consent?: { preferences?: boolean; statistics?: boolean; marketing?: boolean };
  submitCustomConsent?: (pref: boolean, stat: boolean, mkt: boolean) => void;
};

function cookiebot(): CookiebotApi | undefined {
  return (window as unknown as { Cookiebot?: CookiebotApi }).Cookiebot;
}

/** true om inbäddningar från tredjepart får laddas just nu. */
function thirdPartyAllowed(): boolean {
  const cb = cookiebot();
  // Ingen Cookiebot inläst (t.ex. lokalt) = inget som blockerar.
  if (!cb || !cb.consent) return true;
  return cb.consent.marketing === true;
}

export function FounderVideo({
  url,
  poster,
  title,
}: {
  url: string;
  poster?: string;
  title: string;
}) {
  const video = parseVideoUrl(url);
  const [state, setState] = useState<"idle" | "playing" | "needs-consent">("idle");

  // Om besökaren godkänner via Cookiebot-dialogen medan rutan visas.
  useEffect(() => {
    if (state !== "needs-consent") return;
    const onAccept = () => {
      if (thirdPartyAllowed()) setState("playing");
    };
    window.addEventListener("CookiebotOnAccept", onAccept);
    return () => window.removeEventListener("CookiebotOnAccept", onAccept);
  }, [state]);

  if (!video) return null;
  // YouTube/Vimeo – de enda källorna som kan behöva samtycke.
  const external = video.kind === "file" ? null : video;
  const host = external?.kind === "vimeo" ? "Vimeo" : "YouTube";

  function start() {
    if (video!.kind === "file" || thirdPartyAllowed()) setState("playing");
    else setState("needs-consent");
  }

  function acceptAndPlay() {
    const cb = cookiebot();
    if (cb?.submitCustomConsent) {
      // Behåll besökarens övriga val, slå bara på marknadsföring.
      cb.submitCustomConsent(
        cb.consent?.preferences ?? false,
        cb.consent?.statistics ?? false,
        true,
      );
    }
    setState("playing");
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border border-ink/10 bg-ink shadow-[0_30px_60px_-30px_rgba(14,14,12,0.45)]">
      {state === "playing" ? (
        video.kind === "file" ? (
          <video
            src={video.src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full bg-ink object-contain"
            aria-label={title}
          />
        ) : (
          <iframe
            src={video.embed}
            title={title}
            data-cookieconsent="marketing"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )
      ) : (
        <>
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(54,72,195,0.55),transparent_60%),radial-gradient(90%_70%_at_90%_100%,rgba(255,221,108,0.28),transparent_60%)]"
            />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/10" />

          {state === "idle" ? (
            <button
              type="button"
              onClick={start}
              aria-label={`Spela filmen: ${title}`}
              className="group absolute inset-0 grid place-items-center text-bone"
            >
              <span className="grid h-20 w-20 md:h-24 md:w-24 place-items-center rounded-full border border-bone/40 bg-bone/15 backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-bone/25">
                <Play size={30} className="ml-1" fill="currentColor" />
              </span>
            </button>
          ) : external ? (
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="max-w-sm rounded-2xl bg-bone/95 p-5 md:p-6 text-ink shadow-lg">
                <p className="text-[14.5px] leading-relaxed">
                  Filmen ligger på {host}, som sätter cookies. Godkänn
                  marknadsföringscookies för att spela den här – eller titta
                  direkt hos {host}.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={acceptAndPlay} className="btn-primary !py-2.5 !px-4 text-[14px]">
                    Godkänn och spela
                  </button>
                  <a
                    href={external.watch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2.5 text-[14px] text-ink/75 hover:text-ink transition"
                  >
                    Öppna filmen <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 flex items-end justify-between gap-3 text-bone">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">
                Film
              </div>
              <div className="mt-1 font-display text-lg md:text-2xl tracking-display-tight leading-tight">
                {title}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
