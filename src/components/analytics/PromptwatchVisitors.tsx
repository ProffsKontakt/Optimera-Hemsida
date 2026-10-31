import Script from "next/script";

/**
 * Promptwatch Visitor Analytics – visar besök som kommer från AI-sök
 * (ChatGPT, Perplexity, Gemini m.fl.) i Promptwatch.
 *
 * Skriptet sätter inga cookies och använder inte lokal lagring, men skickar
 * besöksdata till Promptwatch. Det laddas därför först när besökaren har
 * godkänt statistik-cookies i Cookiebot, på samma sätt som GA4. Utan
 * Cookiebot (t.ex. lokalt) laddas det inte alls.
 *
 * Projekt-id:t är Promptwatch-projektet för optimeraenergi.se.
 */
const PROJECT_ID =
  process.env.NEXT_PUBLIC_PROMPTWATCH_PROJECT_ID ?? "04aa0ec1-ad8d-4c60-94c4-f6dbdc3fde2e";

export function PromptwatchVisitors() {
  if (!PROJECT_ID) return null;
  return (
    <Script id="promptwatch-visitors" strategy="afterInteractive">
      {`
        (function(){
          function load(){
            if (document.getElementById('pw-client')) return;
            var s = document.createElement('script');
            s.id = 'pw-client';
            s.async = true;
            s.src = 'https://ingest.promptwatch.com/js/client.min.js';
            s.setAttribute('data-project-id', '${PROJECT_ID}');
            document.head.appendChild(s);
          }
          function sync(){
            var cb = window.Cookiebot;
            if (cb && cb.consent && cb.consent.statistics) load();
          }
          window.addEventListener('CookiebotOnAccept', sync);
          window.addEventListener('CookiebotOnLoad', sync);
          sync();
        })();
      `}
    </Script>
  );
}
