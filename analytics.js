/* =========================================================================
   DOIA — Google Analytics 4 + Google Ads, met cookietoestemming
   Consent Mode v2: standaard wordt alles geweigerd tot de bezoeker akkoord
   gaat via de cookiemelding (EU/GDPR-conform).
   ========================================================================= */
(function () {
  var GA_ID  = 'G-76XWVX3HCH';
  var ADS_ID = 'AW-18149300990';
  /* ↓ Vervang door je Google Ads-conversielabel (het deel ná de schuine streep
       in 'AW-18149300990/XXXXXXXX'). Tot dan registreert Ads nog geen conversie. */
  var ADS_CONVERSION_LABEL = 'eXc8CMHhhr4cEP61oc5D';
  var KEY = 'doia-consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  /* Standaard: alles geweigerd tot toestemming */
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  if (choice === 'granted') grantConsent();

  /* gtag.js laden (faalt stil in afgeschermde preview-omgevingen) */
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  s.onerror = function () { /* extern script geblokkeerd (bv. preview/adblock) — geen actie nodig */ };
  document.head.appendChild(s);

  gtag('config', GA_ID, { anonymize_ip: true });
  gtag('config', ADS_ID);

  function grantConsent() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  /* Conversie bij een succesvol verzonden contactformulier */
  window.doiaTrackLead = function () {
    gtag('event', 'generate_lead', { currency: 'EUR', value: 0 });
    gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_CONVERSION_LABEL });
  };

  /* Toestemming opnieuw instellen (bv. via een link in het privacybeleid) */
  window.doiaResetConsent = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  };

  function setChoice(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    if (granted) grantConsent();
    var el = document.querySelector('.cookie');
    if (el) {
      el.classList.remove('is-open');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
    }
  }

  function buildBanner() {
    if (choice === 'granted' || choice === 'denied') return;
    var wrap = document.createElement('div');
    wrap.className = 'cookie';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookietoestemming');
    wrap.innerHTML =
      '<div class="cookie__inner shell">' +
        '<p class="cookie__text">Deze site gebruikt cookies om het bezoek te analyseren en de doeltreffendheid van advertenties te meten. U kiest zelf. <a href="/privacy">Privacybeleid</a>.</p>' +
        '<div class="cookie__actions">' +
          '<button type="button" class="cookie__btn cookie__btn--ghost" data-cc="deny">Weigeren</button>' +
          '<button type="button" class="cookie__btn" data-cc="accept">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.querySelector('[data-cc="accept"]').addEventListener('click', function () { setChoice(true); });
    wrap.querySelector('[data-cc="deny"]').addEventListener('click', function () { setChoice(false); });
    setTimeout(function () { wrap.classList.add('is-open'); }, 40);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBanner);
  } else {
    buildBanner();
  }
})();
