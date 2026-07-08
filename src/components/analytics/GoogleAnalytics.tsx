import Script from "next/script";

/**
 * Google Analytics 4 (GA4) – Measurement ID G-5DY857B8TL.
 *
 * Integrerat med Google Consent Mode v2 + Cookiebot:
 *   1. Consent Mode sätts till "denied" som default (beforeInteractive),
 *      innan gtag och Cookiebot hinner ladda. GA4 samlar då ingen
 *      persondata / sätter inga cookies förrän besökaren samtycker.
 *   2. gtag.js laddas afterInteractive så det inte blockerar LCP.
 *   3. När besökaren accepterar statistik-cookies i Cookiebot uppgraderas
 *      analytics_storage via en CookiebotOnAccept-lyssnare. Detta gör
 *      lösningen robust även om "Google Consent Mode" inte är påslaget i
 *      Cookiebots dashboard.
 *
 * Mät-id kan överstyras via NEXT_PUBLIC_GA_MEASUREMENT_ID, annars används
 * det riktiga id:t direkt så att inget extra Vercel-steg krävs.
 */
const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-5DY857B8TL";

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });

          // Brygga Cookiebot-samtycke -> Consent Mode.
          function oeSyncConsent(){
            if (typeof window.Cookiebot === 'undefined' || !window.Cookiebot.consent) return;
            var c = window.Cookiebot.consent;
            gtag('consent', 'update', {
              analytics_storage: c.statistics ? 'granted' : 'denied',
              ad_storage: c.marketing ? 'granted' : 'denied',
              ad_user_data: c.marketing ? 'granted' : 'denied',
              ad_personalization: c.marketing ? 'granted' : 'denied'
            });
          }
          window.addEventListener('CookiebotOnAccept', oeSyncConsent);
          window.addEventListener('CookiebotOnDecline', oeSyncConsent);
          window.addEventListener('CookiebotOnLoad', oeSyncConsent);
          oeSyncConsent();

          // Central spårning av kontaktklick (tel: / mailto:) via delegation,
          // så vi slipper röra varje länk. Ger phone_click / email_click,
          // användbara som mikro-konverteringar för Google Ads.
          // Skickas i BÅDA formaten: {event:...}-push (GTM Custom Event-
          // triggers ser bara detta format) + gtag('event') (GA4 direkt).
          document.addEventListener('click', function(e){
            var t = e.target;
            var a = t && t.closest ? t.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
            if (!a) return;
            var href = a.getAttribute('href') || '';
            var name = href.indexOf('tel:') === 0 ? 'phone_click' : 'email_click';
            window.dataLayer.push({ event: name, link_url: href });
            gtag('event', name, { link_url: href });
          }, true);
        `}
      </Script>
    </>
  );
}
