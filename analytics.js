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

  var CLARITY_ID = 'xbonrd8v8m';
  var clarityLoaded = false;

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  /* Microsoft Clarity — pas laden ná toestemming (analytics), één keer. */
  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  function grantConsent() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    loadClarity();
  }

  /* Bij een eerder gegeven toestemming Clarity meteen laden. */
  if (choice === 'granted') loadClarity();

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

  /* Taaldetectie: Engelse subsite (/en/...) of <html lang="en"> → Engelse banner */
  function isEnglish() {
    try {
      if (/^\/en(\/|$)/.test(location.pathname)) return true;
      var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
      return lang.indexOf('en') === 0;
    } catch (e) { return false; }
  }

  var COPY = {
    nl: {
      label: 'Cookietoestemming',
      text: 'Deze site gebruikt cookies om het bezoek te analyseren en de doeltreffendheid van advertenties te meten. U kiest zelf. <a href="/privacy">Privacybeleid</a>.',
      deny: 'Weigeren',
      accept: 'Accepteren'
    },
    en: {
      label: 'Cookie consent',
      text: 'This site uses cookies to analyse visits and measure the effectiveness of ads. The choice is yours. <a href="/en/privacy">Privacy policy</a>.',
      deny: 'Decline',
      accept: 'Accept'
    }
  };

  function buildBanner() {
    if (choice === 'granted' || choice === 'denied') return;
    var t = isEnglish() ? COPY.en : COPY.nl;
    var wrap = document.createElement('div');
    wrap.className = 'cookie';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', t.label);
    wrap.innerHTML =
      '<div class="cookie__inner shell">' +
        '<p class="cookie__text">' + t.text + '</p>' +
        '<div class="cookie__actions">' +
          '<button type="button" class="cookie__btn cookie__btn--ghost" data-cc="deny">' + t.deny + '</button>' +
          '<button type="button" class="cookie__btn" data-cc="accept">' + t.accept + '</button>' +
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
