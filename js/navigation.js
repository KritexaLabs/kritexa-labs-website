/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — NAVIGATION JS
   js/navigation.js
   Phase 3 — Header & Navigation Rebuild
   Phase 4 — Products Mega Menu (extended)
   Phase 22 — Solutions Dropdown + Mobile Solutions Accordion

   Responsibilities (Phase 3 + Phase 4 + Phase 22):
     1. Mobile menu — open / close / toggle
     2. Mobile body-scroll lock
     3. Escape key closes menus
     4. Outside-click closes menus
     5. Products mega menu (desktop) — open / close / toggle
     6. Products mega menu — keyboard accessibility
     7. Mobile Products trigger — aria-expanded state + accordion
     8. Hamburger — aria-label / aria-expanded sync
     9. Navbar scroll state
    10. Navbar dynamic collapse (measures nav pill vs logo/CTA overlap)
    11. [Phase 22] Solutions dropdown (desktop) — open / close / toggle / Escape
    12. [Phase 22] Mobile Solutions accordion — aria-expanded / toggle

   ARCHITECTURE NOTE:
     This file replaces the legacy SPA go() routing from Phase 1.
     Real page navigation uses standard <a href> browser behavior.
     The legacy go() function is preserved in legacy/index-original.html only.

   NO SPA ROUTING:
     This file does NOT use history.pushState() for page navigation.
     Do NOT add pushState() calls here.
     Navigation is handled by the browser via standard anchor elements.

   DEPENDENCY ORDER:
     Loaded after global.js — relies on DOM being ready at script execution
     (placed before </body> so DOM is parsed when this runs).
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Element refs ─── */
  var navbar       = document.getElementById('navbar');
  var navCenter    = document.getElementById('nav-center');
  var navRight     = navbar ? navbar.querySelector('.nav-right') : null;
  var navLogo      = navbar ? navbar.querySelector('.nav-logo') : null;

  // Hamburger + mobile drawer
  var ham          = document.getElementById('ham');
  var mob          = document.getElementById('mob');

  // Solutions dropdown (desktop) — Phase 22
  var solutionsBtn  = document.getElementById('nav-solutions-btn');
  var solutionsMenu = document.getElementById('solutions-dropdown');

  // Solutions accordion (mobile) — Phase 22
  var mobSolBtn    = document.getElementById('mob-solutions-btn');
  var mobSolPanel  = document.getElementById('mob-solutions-panel');

  // Products (desktop)
  var productsBtn  = document.getElementById('nav-products-btn');
  var productsMenu = document.getElementById('products-mega-menu');

  // Products (mobile)
  var mobProdBtn   = document.getElementById('mob-products-btn');
  var mobProdPanel = document.getElementById('mob-products-panel');


  /* ═══════════════════════════════════════════════════════════════
     1. NAVBAR SCROLL STATE
  ═══════════════════════════════════════════════════════════════ */
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════════
     2. MOBILE MENU — open / close / toggle
  ═══════════════════════════════════════════════════════════════ */

  /**
   * openMob — opens the mobile navigation drawer.
   * Sets aria-expanded, aria-hidden, body scroll lock, label.
   */
  function openMob() {
    if (!mob || !ham) return;
    mob.classList.add('open');
    mob.removeAttribute('aria-hidden');
    ham.classList.add('open');
    ham.setAttribute('aria-expanded', 'true');
    ham.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
  }

  /**
   * closeMob — closes the mobile navigation drawer.
   * Restores aria state and removes body scroll lock.
   * Also collapses the mobile Products panel if it is open.
   */
  function closeMob() {
    if (!mob || !ham) return;
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden', 'true');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    ham.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
    // Collapse mobile products panel when drawer closes
    closeMobProducts();
  }

  /* Hamburger click — toggle */
  if (ham) {
    ham.addEventListener('click', function () {
      var isOpen = mob ? mob.classList.contains('open') : false;
      if (isOpen) {
        closeMob();
      } else {
        // Close products menu if open before opening mobile nav
        closeProducts();
        openMob();
      }
    });
  }

  /* Close mobile menu when a nav link inside it is activated */
  if (mob) {
    mob.querySelectorAll('.nav-mob-link, .mob-cta').forEach(function (link) {
      link.addEventListener('click', function () {
        // Let the browser navigate — just close the drawer
        // Use a brief delay so the click ripple is visible
        closeMob();
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     3. SOLUTIONS DROPDOWN (desktop) — Phase 22
     - openSolutions / closeSolutions / toggleSolutions
     - aria-expanded on trigger button
     - aria-hidden on dropdown container
     - .open class drives CSS visibility + animation
     - Focus returns to trigger on close
  ═══════════════════════════════════════════════════════════════ */

  function openSolutions() {
    if (!solutionsBtn) return;
    solutionsBtn.setAttribute('aria-expanded', 'true');
    if (solutionsMenu) {
      solutionsMenu.classList.add('open');
      solutionsMenu.removeAttribute('aria-hidden');
    }
  }

  function closeSolutions() {
    if (!solutionsBtn) return;
    solutionsBtn.setAttribute('aria-expanded', 'false');
    if (solutionsMenu) {
      solutionsMenu.classList.remove('open');
      solutionsMenu.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleSolutions() {
    var isOpen = solutionsBtn ? solutionsBtn.getAttribute('aria-expanded') === 'true' : false;
    if (isOpen) {
      closeSolutions();
    } else {
      // Close products menu if it is open
      closeProducts();
      openSolutions();
    }
  }

  /* Click on the Solutions button — toggle */
  if (solutionsBtn) {
    solutionsBtn.addEventListener('click', function () {
      closeMob();
      toggleSolutions();
    });
  }

  /* Tab out of the solutions dropdown — close it */
  if (solutionsMenu) {
    solutionsMenu.addEventListener('focusout', function (e) {
      var goingTo = e.relatedTarget;
      if (
        goingTo &&
        (solutionsMenu.contains(goingTo) || solutionsBtn === goingTo)
      ) {
        return;
      }
      closeSolutions();
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     3a. MOBILE SOLUTIONS ACCORDION — Phase 22
  ═══════════════════════════════════════════════════════════════ */

  function closeMobSolutions() {
    if (!mobSolBtn || !mobSolPanel) return;
    mobSolBtn.setAttribute('aria-expanded', 'false');
    mobSolPanel.classList.remove('open');
    mobSolPanel.setAttribute('aria-hidden', 'true');
    var arrow = mobSolBtn.querySelector('.nav-mob-products-arrow');
    if (arrow) arrow.textContent = '+';
  }

  if (mobSolBtn) {
    mobSolBtn.addEventListener('click', function () {
      var isOpen = mobSolBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobSolutions();
      } else {
        // Close mobile products panel if open
        closeMobProducts();
        mobSolBtn.setAttribute('aria-expanded', 'true');
        if (mobSolPanel) {
          mobSolPanel.classList.add('open');
          mobSolPanel.removeAttribute('aria-hidden');
        }
        var arrowEl = mobSolBtn.querySelector('.nav-mob-products-arrow');
        if (arrowEl) arrowEl.textContent = '×';
      }
    });
  }

  /* Close mobile solutions when a link inside it is activated */
  if (mobSolPanel) {
    mobSolPanel.querySelectorAll('.mob-solutions-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMob();
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     4. PRODUCTS MEGA MENU (desktop)
     Phase 4: full implementation.
     - openProducts / closeProducts / toggleProducts
     - aria-expanded on trigger button
     - aria-hidden on menu container
     - .open class drives CSS visibility + animation
     - Focus returns to trigger on close
  ═══════════════════════════════════════════════════════════════ */

  function openProducts() {
    if (!productsBtn) return;
    productsBtn.setAttribute('aria-expanded', 'true');
    if (productsMenu) {
      productsMenu.classList.add('open');
      productsMenu.removeAttribute('aria-hidden');
    }
  }

  function closeProducts() {
    if (!productsBtn) return;
    productsBtn.setAttribute('aria-expanded', 'false');
    if (productsMenu) {
      productsMenu.classList.remove('open');
      productsMenu.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleProducts() {
    var isOpen = productsBtn ? productsBtn.getAttribute('aria-expanded') === 'true' : false;
    if (isOpen) {
      closeProducts();
    } else {
      openProducts();
    }
  }

  /* Click on the Products button — toggle */
  if (productsBtn) {
    productsBtn.addEventListener('click', function () {
      // Close mobile menu and solutions dropdown if open
      closeMob();
      closeSolutions();
      toggleProducts();
    });
  }

  /* Tab out of the mega menu — close it.
     When the user presses Tab and focus leaves the menu container entirely,
     the menu closes naturally. We listen on the menu itself for focusout. */
  if (productsMenu) {
    productsMenu.addEventListener('focusout', function (e) {
      // relatedTarget is where focus is going; if it is inside the menu or
      // inside the trigger button, do not close.
      var goingTo = e.relatedTarget;
      if (
        goingTo &&
        (productsMenu.contains(goingTo) || productsBtn === goingTo)
      ) {
        return;
      }
      // Focus has left the menu — close it.
      closeProducts();
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     4. PRODUCTS TRIGGER (mobile)
     Phase 4: accordion behavior with actual content.
     - Toggles aria-expanded on the trigger button
     - Toggles aria-hidden on the panel
     - Toggles .open class on the panel (CSS drives show/hide)
     - Arrow symbol changes between + and × for visual state
  ═══════════════════════════════════════════════════════════════ */

  function closeMobProducts() {
    if (!mobProdBtn || !mobProdPanel) return;
    mobProdBtn.setAttribute('aria-expanded', 'false');
    mobProdPanel.classList.remove('open');
    mobProdPanel.setAttribute('aria-hidden', 'true');
    var arrow = mobProdBtn.querySelector('.nav-mob-products-arrow');
    if (arrow) arrow.textContent = '+';
  }

  if (mobProdBtn) {
    mobProdBtn.addEventListener('click', function () {
      var isOpen = mobProdBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobProducts();
      } else {
        mobProdBtn.setAttribute('aria-expanded', 'true');
        if (mobProdPanel) {
          mobProdPanel.classList.add('open');
          mobProdPanel.removeAttribute('aria-hidden');
        }
        var arrow2 = mobProdBtn.querySelector('.nav-mob-products-arrow');
        if (arrow2) arrow2.textContent = '×';
      }
    });
  }


  /* ═══════════════════════════════════════════════════════════════
     5. ESCAPE KEY — closes all menus
     - Closes mobile nav drawer (returns focus to hamburger)
     - Closes desktop products mega menu (returns focus to trigger)
     - Closes mobile Products accordion (stays within mobile drawer)
  ═══════════════════════════════════════════════════════════════ */
  document.addEventListener('keydown', function (e) {
    var key = e.key || e.keyCode;
    var isEscape = (key === 'Escape' || key === 'Esc' || key === 27);
    if (!isEscape) return;

    // Close desktop solutions dropdown — return focus to trigger
    if (solutionsBtn && solutionsBtn.getAttribute('aria-expanded') === 'true') {
      closeSolutions();
      solutionsBtn.focus();
      return;
    }

    // Close desktop products mega menu — return focus to trigger
    if (productsBtn && productsBtn.getAttribute('aria-expanded') === 'true') {
      closeProducts();
      productsBtn.focus();
      return; // Escape within mega menu should not also close mobile nav
    }

    // Close mobile menu
    if (mob && mob.classList.contains('open')) {
      // If mobile solutions panel is open, close it first
      if (mobSolBtn && mobSolBtn.getAttribute('aria-expanded') === 'true') {
        closeMobSolutions();
        if (mobSolBtn) mobSolBtn.focus();
        return;
      }
      // If mobile products panel is open, close it first — don't close the whole drawer
      if (mobProdBtn && mobProdBtn.getAttribute('aria-expanded') === 'true') {
        closeMobProducts();
        if (mobProdBtn) mobProdBtn.focus();
        return;
      }
      closeMob();
      // Return focus to hamburger button
      if (ham) ham.focus();
    }
  });


  /* ═══════════════════════════════════════════════════════════════
     6. OUTSIDE CLICK — closes products mega menu
     Does NOT close the mobile drawer on outside click —
     the mobile drawer has its own close mechanism (hamburger / nav links).
  ═══════════════════════════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    // Close solutions dropdown if click is outside the dropdown wrapper
    if (
      solutionsBtn &&
      solutionsBtn.getAttribute('aria-expanded') === 'true' &&
      navbar &&
      !navbar.contains(e.target) &&
      !(solutionsMenu && solutionsMenu.contains(e.target))
    ) {
      closeSolutions();
    }

    // Close products mega menu if click is outside the navbar AND outside the menu
    if (
      productsBtn &&
      productsBtn.getAttribute('aria-expanded') === 'true' &&
      navbar &&
      !navbar.contains(e.target) &&
      !(productsMenu && productsMenu.contains(e.target))
    ) {
      closeProducts();
    }
  });


  /* ═══════════════════════════════════════════════════════════════
     7. NAVBAR DYNAMIC COLLAPSE
     Measures whether the center pill overlaps logo or right CTA.
     If it does, collapses to hamburger layout via .nav-collapsed class.
     Runs on load and resize.
     This handles narrow desktop / tablet viewports where the center
     pill would visually overlap other elements before the 768px breakpoint.
  ═══════════════════════════════════════════════════════════════ */
  /* Also close solutions dropdown when mobile menu opens */
  var _origOpenMob = openMob;
  openMob = function () {
    closeSolutions();
    _origOpenMob();
  };

  if (navbar && navCenter) {
    function checkNavOverflow() {
      // Temporarily restore to measure natural widths
      var wasCollapsed = navbar.classList.contains('nav-collapsed');
      if (wasCollapsed) {
        navbar.classList.remove('nav-collapsed');
      }

      var nbW    = navbar.offsetWidth;
      var logoEl = navLogo;
      var logoR  = logoEl ? logoEl.offsetLeft + logoEl.offsetWidth : 0;
      var cenW   = navCenter.offsetWidth;
      var rightEl = navRight;
      var rightW  = rightEl ? rightEl.offsetWidth : 0;
      var PADDING = 40; // safety gap

      var cenLeft  = (nbW - cenW) / 2;
      var cenRight = cenLeft + cenW;
      var rightStart = nbW - rightW - PADDING;

      var overlaps = (cenLeft < logoR + PADDING) || (cenRight > rightStart);

      if (overlaps) {
        navbar.classList.add('nav-collapsed');
      } else {
        navbar.classList.remove('nav-collapsed');
      }
    }

    checkNavOverflow();
    window.addEventListener('resize', checkNavOverflow, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════════
     8. LEGACY SPA COMPATIBILITY SHIM
     The old monolithic index.html still uses go() + .page elements.
     This shim re-exposes a minimal go() function ONLY when the legacy
     SPA page system is present, preventing errors on multi-page pages.

     This shim will be removed when the legacy index.html is retired.
  ═══════════════════════════════════════════════════════════════ */
  var hasPageSystem = document.querySelector('.page') !== null;

  if (hasPageSystem) {
    // Define legacy go() only if the SPA page containers exist
    window.go = window.go || function (name) {
      document.querySelectorAll('.page').forEach(function (p) {
        p.classList.remove('active');
      });
      var t = document.getElementById('page-' + name);
      if (t) {
        t.classList.add('active');
        window.scrollTo(0, 0);
        t.querySelectorAll('.rv,.rv-l,.rv-r').forEach(function (el) {
          el.classList.add('on');
        });
        setTimeout(function () {
          t.querySelectorAll('[data-count]').forEach(function (el) {
            el.textContent = '0';
            if (typeof cntIO !== 'undefined') cntIO.observe(el);
          });
        }, 80);
      }
      // Nav active states (legacy SPA only)
      document.querySelectorAll('.nav-link[id^="nl-"]').forEach(function (a) {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      var nl = document.getElementById('nl-' + name);
      if (nl) {
        nl.classList.add('active');
        nl.setAttribute('aria-current', 'page');
      }
      document.querySelectorAll('#mob a[id^="ml-"]').forEach(function (a) {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      var ml = document.getElementById('ml-' + name);
      if (ml) {
        ml.classList.add('active');
        ml.setAttribute('aria-current', 'page');
      }
      // Navbar state
      if (navbar) {
        if (name !== 'home') navbar.classList.add('scrolled');
        else if (window.scrollY < 20) navbar.classList.remove('scrolled');
      }
      closeMob();
      // URL hash update (legacy SPA behavior — NOT used in multi-page)
      try {
        if (name === 'home') {
          history.pushState(null, '', window.location.pathname);
        } else {
          history.pushState(null, '', '#' + name);
        }
      } catch (e) {}
    };

    // Legacy init — hash routing for SPA
    function initPageLegacy() {
      var hash = window.location.hash.replace('#', '');
      var validPages = ['home', 'about', 'capabilities', 'portfolio', 'career', 'blog', 'contact', 'labs', 'kritexaai'];
      if (hash && validPages.indexOf(hash) !== -1) {
        window.go(hash);
      } else {
        window.go('home');
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPageLegacy);
    } else {
      initPageLegacy();
    }

    window.addEventListener('popstate', function () {
      var hasPS = document.querySelector('.page') !== null;
      if (!hasPS) return;
      var hash = window.location.hash.replace('#', '');
      var validPages = ['home', 'about', 'capabilities', 'portfolio', 'career', 'blog', 'contact', 'labs', 'kritexaai'];
      if (hash && validPages.indexOf(hash) !== -1) {
        window.go(hash);
      } else {
        window.go('home');
      }
    });

    // Legacy form submit (SPA only)
    window.submitForm = window.submitForm || function () {
      var n = document.getElementById('f-name') ? document.getElementById('f-name').value : '';
      var p = document.getElementById('f-phone') ? document.getElementById('f-phone').value : '';
      var e = document.getElementById('f-email') ? document.getElementById('f-email').value : '';
      var s = document.getElementById('f-service') ? document.getElementById('f-service').value : '';
      var m = document.getElementById('f-msg') ? document.getElementById('f-msg').value : '';
      if (!n || !p || !e || !s || !m) { alert('Please fill all fields.'); return; }
      alert('Thanks ' + n + '! We\'ll contact you within 24 hours.\n\nFor faster response, WhatsApp us! 🚀');
      ['f-name', 'f-phone', 'f-email', 'f-service', 'f-msg'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
    };
  }


  /* ═══════════════════════════════════════════════════════════════
     9. PORTFOLIO FILTER (legacy — also needed by multi-page portfolio)
  ═══════════════════════════════════════════════════════════════ */
  var _pfCat = 'all', _pfType = 'all';
  window.pfFilter = window.pfFilter || function (btn, filterType, value) {
    if (filterType === 'cat') {
      _pfCat = value;
      document.querySelectorAll('#pfCatFilters .pf-filter').forEach(function (b) { b.classList.remove('active'); });
    } else {
      _pfType = value;
      document.querySelectorAll('#pfTypeTabs .pf-type-tab').forEach(function (b) { b.classList.remove('active'); });
    }
    btn.classList.add('active');
    var visible = 0;
    document.querySelectorAll('.pf-card').forEach(function (card) {
      var cat  = card.getAttribute('data-category');
      var type = card.getAttribute('data-type');
      var catOk  = (_pfCat  === 'all' || cat  === _pfCat);
      var typeOk = (_pfType === 'all' || type === _pfType);
      if (catOk && typeOk) { card.classList.remove('pf-hidden'); visible++; }
      else card.classList.add('pf-hidden');
    });
    var countEl = document.getElementById('pfCountText');
    if (countEl) {
      var label    = visible === 1 ? 'project' : 'projects';
      var catLabel  = _pfCat  === 'all' ? '' : ' in ' + _pfCat;
      var typeLabel = _pfType === 'all' ? '' : ' · ' + _pfType + 's only';
      countEl.textContent = 'Showing ' + visible + ' ' + label + catLabel + typeLabel;
    }
  };


  /* ═══════════════════════════════════════════════════════════════
     10. KRITEXA.AI WAITLIST (legacy placeholder)
  ═══════════════════════════════════════════════════════════════ */
  window.kaiJoin = window.kaiJoin || function () {
    var email = document.getElementById('kaiEmail');
    var note  = document.getElementById('kaiNote');
    if (!email || !note) return;
    if (!email.value || !email.value.includes('@')) {
      note.textContent = 'Please enter a valid email.';
      note.style.color = '#EF4444';
      return;
    }
    note.textContent = '\u2713 You are on the list! We will be in touch soon.';
    note.style.color = '#10B981';
    email.value = '';
  };

})();
