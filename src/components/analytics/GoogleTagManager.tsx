import Script from "next/script";

/**
 * Google Tag Manager (container GTM-5HD9BPW6).
 *
 * GTM laddas afterInteractive så det inte blockerar LCP, och delar dataLayer
 * med gtag/Consent Mode (som GoogleAnalytics-komponenten sätter till "denied"
 * beforeInteractive). Cookiebots auto-blocking + Consent Mode ser till att
 * inga taggar i containern fyrar förrän besökaren samtyckt.
 *
 * OBS dubbelräkning: GA4 (G-5DY857B8TL) skickas redan direkt via gtag i
 * GoogleAnalytics-komponenten. Lägg därför INTE till en GA4 Configuration-tag
 * för samma mät-id inuti GTM, då räknas allt två gånger. Använd GTM för
 * Google Ads konverterings-/remarketing-taggar, Meta Pixel m.m.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5HD9BPW6";

export function GoogleTagManager() {
  if (!GTM_ID) return null;
  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Måste ligga direkt efter <body> öppningstaggen. Fallback för no-JS. */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
