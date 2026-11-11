/**
 * Samma observatör som i RevealObserver.tsx, som ett litet inline-skript. Det
 * körs så fort sidans HTML har lästs in, utan att vänta på att React har
 * laddats. På en långsam uppkoppling skulle innehållet längre ner annars stå
 * osynligt tills React kommit igång. RevealObserver behövs fortfarande
 * när man kommer till startsidan via en länk inne på sajten (då körs inte
 * inline-skript) och tar hand om det som eventuellt återstår.
 *
 * Bara i produktion: i utvecklingsläge skulle React varna för att klasserna
 * skiljer sig från serverns HTML.
 */
const BOOT = `(function(){var d=document,r=d.documentElement;if(!r.classList.contains('anim'))return;var els=d.querySelectorAll('[data-reveal]:not(.is-in)'),i;if(!('IntersectionObserver' in window)){for(i=0;i<els.length;i++)els[i].classList.add('is-in');r.classList.add('reveal-on');return}var io=new IntersectionObserver(function(en){for(var k=0;k<en.length;k++){var e=en[k];if(!e.isIntersecting)continue;var el=e.target;if(el.hasAttribute('data-stagger')&&innerWidth>=640){var s=e.boundingClientRect.left/Math.max(1,innerWidth);el.style.setProperty('--d',Math.round(Math.max(0,Math.min(1,s))*280)+'ms')}el.classList.add('is-in');io.unobserve(el)}},{rootMargin:'0px 0px -8% 0px',threshold:0.08});for(i=0;i<els.length;i++)io.observe(els[i]);r.classList.add('reveal-on')})();`;

/** Läggs sist på sidan, efter allt innehåll med data-reveal. */
export function RevealBoot() {
  if (process.env.NODE_ENV !== "production") return null;
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
