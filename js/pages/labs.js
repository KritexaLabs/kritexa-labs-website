/**
 * js/pages/labs.js
 * Phase 25 — Labs Premium Visual Refinement
 *
 * RESPONSIBILITIES:
 *   1. Filter logic for the LABS "Built & Tested" build grid.
 *   2. Scroll-triggered progress bar animation (IntersectionObserver).
 *
 * ── FILTER LOGIC ──────────────────────────────────────────────
 *   - Reads filter buttons in #labs-build-filters
 *   - Filters .labs-build-card[data-build-type] inside #labs-build-grid
 *   - Shows .labs-empty-state when no builds exist for the active filter
 *   - Manages aria-pressed on filter buttons
 *
 * WHEN BUILDS EXIST:
 *   Each build card must carry a data-build-type attribute matching one of:
 *   "websites" | "apps" | "ai" | "tools" | "ui-systems"
 *   A card can match multiple types: data-build-type="websites ai"
 *
 * CURRENT STATE:
 *   No verified builds exist — placeholder cards are shown.
 *   Filtering will apply once real cards are added.
 *
 * ── PROGRESS BAR ANIMATION ───────────────────────────────────
 *   - Each .labs-prog-fill has a CSS custom property --prog-width
 *     set as an inline style on the element (e.g. style="--prog-width:73%")
 *   - When the card enters the viewport, we add class .prog-animate
 *     which transitions width from 0% to var(--prog-width)
 *   - Uses IntersectionObserver with a 0.3 threshold
 *   - One-shot: observer disconnects after animating to save resources
 */

(function () {
  'use strict';

  // ── Guard: only run on labs page ──────────────────────────────────────────
  if (!document.querySelector('#labs-build-filters') &&
      !document.querySelector('.labs-prog-fill')) return;

  // ═══════════════════════════════════════════════════════════════
  // 1. PROGRESS BAR ANIMATION
  // ═══════════════════════════════════════════════════════════════

  // Respect prefers-reduced-motion
  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var progFills = document.querySelectorAll('.labs-prog-fill');

  if (progFills.length > 0 && !reducedMotion && 'IntersectionObserver' in window) {

    var progObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target;
          // Trigger CSS transition: width 0 → var(--prog-width)
          fill.classList.add('prog-animate');
          // Disconnect after animating this element (one-shot)
          progObserver.unobserve(fill);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -40px 0px'
    });

    progFills.forEach(function (fill) {
      progObserver.observe(fill);
    });

  } else if (progFills.length > 0) {
    // Fallback: immediately show full width (reduced-motion or no IntersectionObserver)
    progFills.forEach(function (fill) {
      fill.classList.add('prog-animate');
    });
  }


  // ═══════════════════════════════════════════════════════════════
  // 2. BUILD FILTER LOGIC
  // ═══════════════════════════════════════════════════════════════

  var filterGroup = document.getElementById('labs-build-filters');
  var buildGrid   = document.getElementById('labs-build-grid');

  if (!filterGroup || !buildGrid) return;

  filterGroup.addEventListener('click', function (e) {
    var btn = e.target.closest('.labs-filter');
    if (!btn) return;

    var filterValue = btn.getAttribute('data-filter');
    if (!filterValue) return;

    // Update aria-pressed on all filter buttons
    var allFilters = filterGroup.querySelectorAll('.labs-filter');
    allFilters.forEach(function (f) {
      var isActive = f === btn;
      f.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      f.classList.toggle('active', isActive);
    });

    // Filter build cards (excludes placeholder cards from filter — always visible)
    var buildCards = buildGrid.querySelectorAll('.labs-build-card:not(.labs-build-card-placeholder)');
    var visibleCount = 0;

    buildCards.forEach(function (card) {
      var cardTypes = (card.getAttribute('data-build-type') || '').toLowerCase();
      var show = filterValue === 'all' || cardTypes.indexOf(filterValue) !== -1;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Show/hide legacy empty state (if present)
    var emptyState = buildGrid.querySelector('.labs-empty-state');
    if (emptyState) {
      var totalRealCards = buildCards.length;
      var shouldShow = totalRealCards === 0 || visibleCount === 0;
      emptyState.style.display = shouldShow ? 'flex' : 'none';
    }
  });

})();
