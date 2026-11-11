import Script from "next/script";

/**
 * Meta Pixel (Facebook/Instagram) – pixel-id 1378950624383966.
 *
 * GDPR-integrerad med Cookiebot enligt samma mönster som GA4:
 *   1. fbq('consent','revoke') sätts FÖRE init – pixeln köar events men
 *      skickar ingenting och sätter inga cookies förrän samtycke finns.
 *   2. När besökaren godkänner marknadsförings-cookies i Cookiebot körs
 *      fbq('consent','grant') och de köade eventen (inkl. PageView) släpps.
 *   3. Metas <noscript>-bild är MEDVETET utelämnad – den kan inte
 *      samtyckes-gatas och skulle spåra besökare utan JS utan samtycke.
 *
 * fbevents.js laddas uppskjutet (se TrackerScheduler). Anrop som görs
 * innan dess köas av stubben och släpps när biblioteket är inne.
 *
 * PageView vid SPA-navigering sköts av MetaPixelPageView (client) i layout.
 * Lead-konverteringen skickas från tack-sidan (/offert/klar).
 */
const PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1378950624383966";

export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        // Metas standardstubbe: fbq köar anrop tills biblioteket är inne.
        // Biblioteket (fbevents.js) hämtas uppskjutet via den gemensamma
        // kön i stället för direkt, så det inte tävlar med sidans rendering.
        !function(f,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];}(window);
        (window.__oeDeferred = window.__oeDeferred || []).push(function(){
          var t = document.createElement('script');
          t.async = true;
          t.src = 'https://connect.facebook.net/en_US/fbevents.js';
          // Pixelns eget consent-läge (revoke/grant nedan) styr vad som
          // skickas, precis som tidigare.
          t.setAttribute('data-cookieconsent', 'ignore');
          document.head.appendChild(t);
        });
        fbq('consent', 'revoke');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');

        // Brygga Cookiebot-samtycke -> pixelns consent-läge.
        function oeSyncFbConsent(){
          if (typeof window.Cookiebot === 'undefined' || !window.Cookiebot.consent) return;
          fbq('consent', window.Cookiebot.consent.marketing ? 'grant' : 'revoke');
        }
        window.addEventListener('CookiebotOnAccept', oeSyncFbConsent);
        window.addEventListener('CookiebotOnDecline', oeSyncFbConsent);
        window.addEventListener('CookiebotOnLoad', oeSyncFbConsent);
        oeSyncFbConsent();
      `}
    </Script>
  );
}
