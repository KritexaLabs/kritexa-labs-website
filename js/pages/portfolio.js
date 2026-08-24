/**
 * js/pages/portfolio.js
 * Phase 9 — Portfolio Page Rebuild
 *
 * Portfolio-specific JavaScript:
 *   1. Hero stat counter animation (matching home.js pattern)
 *   2. Category + type filter logic with aria-pressed management
 *
 * Dependencies: none (vanilla JS only)
 * Global scripts loaded before this: global.js, navigation.js, animations.js, active-nav.js
 *
 * Reduced motion: respected in counter animation (immediate set).
 */

(function () {
  'use strict';

  /* ── 1. Stat counter animation ─────────────────────────────────────────────
   *
   * Animates .pf-hstat-num[data-count] elements.
   * Triggered by IntersectionObserver when stats strip enters viewport.
   * Appends suffix from adjacent .pf-hstat-plus span.
   *
   * Pattern mirrors js/pages/home.js stat counter.
   * data-count is removed before global.js can act on it (load-order guard).
   */

  var prefersReducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el, target, duration, onDone) {
    if (prefersReducedMotion) {
      el.textContent = target;
      if (onDone) onDone();
      return;
    }

    var start = null;
    var startVal = 0;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var current = Math.round(startVal + easeOut(progress) * (target - startVal));
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
        if (onDone) onDone();
      }
    }

    requestAnimationFrame(step);
  }

  function initStatCounters() {
    var statsStrip = document.querySelector('.pf-hero-stats');
    if (!statsStrip) return;

    var counters = statsStrip.querySelectorAll('.pf-hstat-num[data-count]');
    if (!counters.length) return;

    // Extract data before removing attribute (global.js guard)
    var counterData = [];
    counters.forEach(function (el) {
      counterData.push({
        el: el,
        target: parseInt(el.getAttribute('data-count'), 10) || 0
      });
      el.removeAttribute('data-count');
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          counterData.forEach(function (item) {
            animateCounter(item.el, item.target, 1600, null);
          });
        });
      }, { threshold: 0.3 });

      observer.observe(statsStrip);
    } else {
      // Fallback: set immediately
      counterData.forEach(function (item) {
        item.el.textContent = item.target;
      });
    }
  }

  /* ── 2. Filter logic ───────────────────────────────────────────────────────
   *
   * Filters .pf-card elements by data-category and data-type attributes.
   * Manages .active class and aria-pressed on filter buttons.
   * Updates count text in #pf-count-text.
   *
   * Uses data-filter-type and data-filter-value on buttons (no onclick inline).
   * All button elements — no clickable divs.
   */

  var _pfCat = 'all';
  var _pfType = 'all';

  function applyFilter() {
    var cards = document.querySelectorAll('.pf-card');
    var visible = 0;

    cards.forEach(function (card) {
      var cat  = card.getAttribute('data-category') || '';
      var type = card.getAttribute('data-type') || '';
      var catOk  = (_pfCat  === 'all' || cat  === _pfCat);
      var typeOk = (_pfType === 'all' || type === _pfType);

      if (catOk && typeOk) {
        card.classList.remove('pf-hidden');
        visible++;
      } else {
        card.classList.add('pf-hidden');
      }
    });

    updateCountText(visible);
  }

  function updateCountText(visible) {
    var countEl = document.getElementById('pf-count-text');
    if (!countEl) return;

    var label    = visible === 1 ? 'project' : 'projects';
    var catLabel = _pfCat  === 'all' ? '' : ' in ' + _pfCat;
    var typeLabel = _pfType === 'all' ? '' : ' · ' + _pfType + 's only';
    countEl.textContent = 'Showing ' + visible + ' ' + label + catLabel + typeLabel;
  }

  function setActiveButton(group, activeBtn, filterType) {
    group.querySelectorAll('button').forEach(function (btn) {
      var isActive = btn === activeBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function initFilters() {
    var catGroup  = document.getElementById('pf-cat-filters');
    var typeGroup = document.getElementById('pf-type-filters');
    if (!catGroup && !typeGroup) return;

    function handleFilterClick(e) {
      var btn = e.target.closest('button[data-filter-type]');
      if (!btn) return;

      var filterType  = btn.getAttribute('data-filter-type');
      var filterValue = btn.getAttribute('data-filter-value');

      if (filterType === 'cat') {
        _pfCat = filterValue;
        if (catGroup) setActiveButton(catGroup, btn, 'cat');
      } else if (filterType === 'type') {
        _pfType = filterValue;
        if (typeGroup) setActiveButton(typeGroup, btn, 'type');
      }

      applyFilter();
    }

    if (catGroup)  catGroup.addEventListener('click', handleFilterClick);
    if (typeGroup) typeGroup.addEventListener('click', handleFilterClick);
  }

  /* ── Init ──────────────────────────────────────────────────────────────── */

  function init() {
    initStatCounters();
    initFilters();
    // Initial count text (all 12 visible)
    updateCountText(document.querySelectorAll('.pf-card').length);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
