// DOIA — shared behavior: scroll reveal + active nav + subtle nav state
(function () {
  'use strict';

  // ---- reveal on scroll ----
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- mark current nav item ----
  function initNav() {
    function key(s) {
      if (!s) return 'index';
      s = s.split('#')[0].split('?')[0];     // strip hash/query
      s = s.replace(/\/+$/, '');             // strip trailing slash
      s = s.substring(s.lastIndexOf('/') + 1); // last path segment
      s = s.replace(/\.html$/, '');          // drop .html extension
      return s || 'index';
    }
    var current = key(location.pathname);
    document.querySelectorAll('.nav__menu a').forEach(function (a) {
      if (key(a.getAttribute('href')) === current) a.setAttribute('aria-current', 'page');
    });
  }

  // ---- hero slideshow (crossfade) ----
  function initHero() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initReveal(); initNav(); initHero(); });
  } else { initReveal(); initNav(); initHero(); }
})();
