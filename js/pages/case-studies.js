/**
 * js/pages/case-studies.js
 * Phase 18 — Accessibility Engineering
 *
 * Case-studies filter functionality.
 * Makes the .cs-filter-btn controls functional with accessible state management.
 *
 * Filters .cs-card elements by data-category attribute.
 * Manages .cs-filter-active class and aria-pressed on filter buttons.
 *
 * Filter categories:
 *   "All Projects" — show all
 *   "Website Dev"   — data-category="Website Dev"
 *   "AI Automation" — data-category="AI Automation"
 *   "SEO"           — data-category="SEO"
 *   "E-Commerce"    — data-category="E-Commerce"
 *
 * No inline onclick — uses event delegation on the filter group.
 */

(function () {
  'use strict';

  function initCsFilter() {
    var filterGroup = document.querySelector('.cs-filter-group');
    if (!filterGroup) return;

    var cards = document.querySelectorAll('.cs-card[data-category]');
    if (!cards.length) return;

    function applyFilter(activeCategory) {
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category') || '';
        if (activeCategory === 'all' || cat === activeCategory) {
          card.style.display = '';
          card.removeAttribute('hidden');
        } else {
          card.style.display = 'none';
          card.setAttribute('hidden', '');
        }
      });
    }

    filterGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('.cs-filter-btn');
      if (!btn) return;

      /* Update button states */
      filterGroup.querySelectorAll('.cs-filter-btn').forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('cs-filter-active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      /* Determine filter value from button text */
      var label = btn.textContent.trim();
      var category = label === 'All Projects' ? 'all' : label;

      applyFilter(category);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCsFilter);
  } else {
    initCsFilter();
  }

}());
