/* =========================================================================
   DOIA — Cookietoestemming + conversiemeting
   ---------------------------------------------------------------------------
   De Google-tag (gtag.js), Consent Mode v2-standaard en de config staan
   nu RECHTSTREEKS in de <head> van elke pagina (officiële Google-installatie,
   zo wordt de tag betrouwbaar gedetecteerd). Dit bestand regelt enkel nog:
     1. de cookiemelding (accepteren / weigeren),
     2. het bijwerken van de toestemming (Consent Mode update),
     3. de conversie bij een verzonden contactformulier.
   ========================================================================= */
(function () {
  var ADS_ID = 'AW-18149300990';
  /* Google Ads-conversielabel (deel ná de schuine streep in 'AW-…/XXXX'). */
  var ADS_CONVERSION_LABEL = 'eXc8CMHhhr4cEP61oc5D';
  var KEY = 'doia-consent';

  /* Veiligheidsnet: als het head-fragment om wat voor reden niet liep,
     toch een werkende gtag-stub voorzien zodat niets stukloopt. */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { dataLayer.push(arguments); };
  }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

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
