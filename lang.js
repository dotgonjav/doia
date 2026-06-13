// DOIA — language suggestion (suggest-only; never auto-redirects).
// Shows a small bar offering the other language ONLY when the visitor's browser
// language differs from the page language AND they haven't chosen yet. Any choice
// (switch or dismiss) is remembered, so a paid/ad visitor is never nagged again
// and never forcibly moved off the language they landed on.
(function () {
  'use strict';
  var KEY = 'doia-lang';
  var html = document.documentElement;
  var pageLang = (html.getAttribute('lang') || 'nl').slice(0, 2).toLowerCase();

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored) return; // already chose a language — stay silent

  var navLang = ((navigator.languages && navigator.languages[0]) || navigator.language || '')
    .slice(0, 2).toLowerCase();

  var suggest = null;
  if (pageLang === 'nl' && navLang === 'en') suggest = 'en';
  if (pageLang === 'en' && navLang === 'nl') suggest = 'nl';
  if (!suggest) return;

  var alt = document.querySelector('link[rel="alternate"][hreflang="' + suggest + '"]');
  var url = alt && alt.getAttribute('href');
  if (!url) return;

  var copy = suggest === 'en'
    ? { msg: 'View this site in English?', go: 'Switch to English' }
    : { msg: 'Deze site bekijken in het Nederlands?', go: 'Naar het Nederlands' };

  function remember(lang) { try { localStorage.setItem(KEY, lang); } catch (e) {} }

  function build() {
    var bar = document.createElement('div');
    bar.className = 'langbar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Language');
    bar.innerHTML =
      '<div class="langbar__inner">' +
        '<span class="langbar__text">' + copy.msg + '</span>' +
        '<a class="langbar__go" href="' + url + '">' + copy.go + '</a>' +
        '<button type="button" class="langbar__x" aria-label="Sluiten">\u00d7</button>' +
      '</div>';
    document.body.appendChild(bar);

    bar.querySelector('.langbar__go').addEventListener('click', function () {
      remember(suggest); // honour the chosen language going forward
    });
    bar.querySelector('.langbar__x').addEventListener('click', function () {
      remember(pageLang); // stay on this language, don't ask again
      bar.classList.remove('is-open');
      setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 450);
    });

    setTimeout(function () { bar.classList.add('is-open'); }, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else { build(); }
})();
