/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — ACTIVE NAV
   js/active-nav.js
   Phase 3 — Header & Navigation Rebuild

   Sets the active navigation state on multi-page architecture pages.
   Reads window.location.pathname and:
     - Adds class="active" to matching nav link
     - Sets aria-current="page" on the matching element (WCAG)
     - Sets .scrolled on the navbar for non-home pages

   This file runs on EVERY page except the legacy monolithic index.html
   (the legacy SPA uses go() for active state instead).

   NOT responsible for:
     - Mobile menu open/close (navigation.js)
     - Products trigger state (navigation.js)
     - Scroll behavior (navigation.js + global.js)
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var path = window.location.pathname;

  // Normalize — remove trailing slash except root
  var cleanPath = (path === '/' ? '/' : path.replace(/\/$/, ''));

  /*
   * Map URL paths to:
   *   desktop nav ID  (nl-*)
   *   mobile nav ID   (ml-*)
   *
   * Career and Labs are footer-only: no desktop nl-* but mobile ml-* exists.
   * Kritexa.AI uses the special .nav-kai-pill — handled separately below.
   */
  /*
   * Map URL paths to:
   *   desktop nav ID  (nl-*)
   *   mobile nav ID   (ml-*)
   *   parent trigger  (optional — for dropdown parent state)
   *
   * Career and Labs are footer-only: no desktop nl-* but mobile ml-* exists.
   * Kritexa.AI uses the special .nav-kai-pill — handled separately below.
   *
   * Phase 22: added industry-solutions and live-projects routes.
   * Solutions dropdown child pages (capabilities, industry-solutions, portfolio,
   * case-studies) also highlight the Solutions trigger button as parent-active.
   */
  var navMap = {
    '/'                    : { desktop: 'nl-home',               mobile: 'ml-home'               },
    '/about'               : { desktop: 'nl-about',              mobile: 'ml-about'               },
    '/capabilities'        : { desktop: 'nl-capabilities',       mobile: 'ml-capabilities',       solutionsParent: true },
    '/industry-solutions'  : { desktop: 'nl-industry-solutions', mobile: 'ml-industry-solutions', solutionsParent: true },
    '/portfolio'           : { desktop: 'nl-portfolio',          mobile: 'ml-portfolio',          solutionsParent: true },
    '/case-studies'        : { desktop: 'nl-case-studies',       mobile: 'ml-case-studies',       solutionsParent: true },
    '/live-projects'       : { desktop: 'nl-live-projects',      mobile: 'ml-live-projects'       },
    '/contact'             : { desktop: 'nl-contact',            mobile: 'ml-contact'             },
    '/kritexa-ai'          : { desktop: 'nl-kritexaai',          mobile: 'ml-kritexaai'           },
    '/career'              : { desktop: null,                    mobile: 'ml-career'              },
    '/labs'                : { desktop: null,                    mobile: 'ml-labs'                }
  };

  var entry = navMap[cleanPath];
  if (!entry) return;

  /* ── Set active state on desktop link ── */
  if (entry.desktop) {
    var desktopEl = document.getElementById(entry.desktop);
    if (desktopEl) {
      desktopEl.classList.add('active');
      desktopEl.setAttribute('aria-current', 'page');

      // If it's a .nav-link, also reveal the nav-glow pseudo-element
      if (desktopEl.classList.contains('nav-link')) {
        var glow = desktopEl.querySelector('.nav-glow');
        if (glow) glow.style.opacity = '1';
      }

      // If it's the Kritexa.AI pill (.nav-kai-pill) — handled by class above
    }
  }

  /* ── Set active state on mobile link ── */
  if (entry.mobile) {
    var mobileEl = document.getElementById(entry.mobile);
    if (mobileEl) {
      mobileEl.classList.add('active');
      mobileEl.setAttribute('aria-current', 'page');
    }
  }

  /* ── Mark Solutions trigger as parent-active when on a Solutions child page ── */
  if (entry && entry.solutionsParent) {
    var solTrigger = document.getElementById('nav-solutions-btn');
    if (solTrigger) {
      solTrigger.classList.add('active');
    }
  }

  /* ── Navbar scroll state for non-home pages ── */
  /* Inner pages always show the frosted glass navbar */
  var navbar = document.getElementById('navbar');
  if (navbar && cleanPath !== '/') {
    navbar.classList.add('scrolled');
  }

})();
