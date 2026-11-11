import Script from "next/script";

/**
 * Laddar spårningsbiblioteken (gtag.js, GTM, Meta Pixel) uppskjutet.
 *
 * Varje spårningskomponent lägger sin laddare i window.__oeDeferred i
 * stället för att hämta sitt bibliotek direkt. Den här schemaläggaren kör
 * kön vid besökarens första interaktion (scroll, klick, tangent, pekning)
 * eller senast några sekunder efter att sidan laddat klart.
 *
 * Varför: biblioteken väger tillsammans runt 400 kB och tävlade tidigare
 * med hjältebilden och sidans egen kod under den första renderingen, vilket
 * drog upp LCP och blockeringstid på mobil. dataLayer och fbq köar allt som
 * händer innan biblioteken är inne, och samtyckeslogiken (Consent Mode,
 * Cookiebot) är oförändrad.
 *
 * Två medvetna avvägningar:
 *  - Besök som kommer via en annons eller kampanjlänk (gclid, fbclid, utm_
 *    m.fl. i adressen) laddar biblioteken direkt, som tidigare. Där är
 *    attributionen viktigare än de sista tiondelarna i laddtid.
 *  - Ett besök som lämnar sidan inom reservtiden utan att röra den mäts
 *    inte. Tidigare räknades även sådana studsar.
 *
 * Måste ligga EFTER GoogleAnalytics, GoogleTagManager och MetaPixel i
 * layouten, men kön fångar även laddare som läggs till senare.
 */
const FALLBACK_MS = 3500;

export function TrackerScheduler() {
  return (
    <Script id="oe-tracker-scheduler" strategy="afterInteractive">
      {`(function(){
  var done = false;
  var q = window.__oeDeferred = window.__oeDeferred || [];
  var opts = { passive: true, capture: true };
  var events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
  function run(fn){ try { fn(); } catch (e) {} }
  function flush(){
    if (done) return;
    done = true;
    while (q.length) run(q.shift());
    // Laddare som registreras efter att kön körts körs direkt.
    q.push = function(fn){ run(fn); return 0; };
    events.forEach(function(e){ window.removeEventListener(e, flush, opts); });
  }
  // Annons- och kampanjbesök: ladda direkt så att landningssidan och
  // klick-id:t alltid följer med i mätningen.
  if (/[?&](gclid|gbraid|wbraid|fbclid|msclkid|ttclid|li_fat_id|utm_[a-z]+)=/i.test(window.location.search)) {
    flush();
    return;
  }
  events.forEach(function(e){ window.addEventListener(e, flush, opts); });
  function arm(){ setTimeout(flush, ${FALLBACK_MS}); }
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm, { once: true });
})();`}
    </Script>
  );
}
