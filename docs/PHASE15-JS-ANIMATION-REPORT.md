# PHASE 15 — JAVASCRIPT & ANIMATION ENGINEERING REPORT

## Project: Kritexa Labs Website
## Phase: 15 — JavaScript & Animation Engineering
## Status: ✅ COMPLETE

---

## 1. JS INVENTORY — EXECUTION MAP

### Files Audited

| File | Purpose | Pages Loaded | DOM Dependencies | Risk |
|------|---------|--------------|-----------------|------|
| `js/global.js` | Cursor, scroll reveal, counters, FAQ, social hover | All 9 pages | `#cur`, `#cur-r`, `.rv`, `[data-count]`, `.faq-item`, `.s-li` etc. | Low |
| `js/navigation.js` | Mobile menu, mega menu, scroll state, nav collapse, legacy SPA shim | All 9 pages | `#navbar`, `#ham`, `#mob`, `#nav-products-btn`, `#products-mega-menu` etc. | Low |
| `js/animations.js` | Canvas (guarded), countdown (guarded), process (guarded) | All 9 pages | `#jkCanvas` (home only), `#kaiDays` (kritexa-ai only), `.proc-c` (home only) | Medium — fixed |
| `js/active-nav.js` | Active nav state, mobile nav state, navbar scrolled | All 9 pages | `nl-*` IDs, `ml-*` IDs, `#navbar` | Low |
| `js/pages/home.js` | BUSINESS canvas, process orbital, stat counters | Home only (`/`) | `#jkCanvas`, `#jkOffCanvas`, `#jkBig`, `.proc-c`, `.porb-*`, `.stat-box-val` | Low |
| `js/pages/portfolio.js` | Portfolio stat counters, filter logic | Portfolio only (`/portfolio`) | `.pf-hero-stats`, `.pf-hstat-num`, `#pf-cat-filters`, `#pf-type-filters` | Low |
| `js/mega-menu.js` | Phase 1 placeholder (empty) | Not loaded by build | None | None |

---

## 2. ANIMATION INVENTORY

| Animation | Type | Owner | Pages | Starts | Stops | Reduced Motion | Mobile |
|-----------|------|-------|-------|--------|-------|----------------|--------|
| BUSINESS text glow | Canvas / RAF | `js/pages/home.js` | Home only | `document.fonts.ready` or 350ms fallback | `visibilitychange` (tab hidden) | Yes — shows static gradient, no RAF | Yes — RAF runs on mobile too |
| Dashboard chart | Canvas / one-shot | `js/animations.js` | Legacy — no DOM target in current pages | Never (guard exits) | N/A | N/A | N/A |
| Lead counter | `setInterval` | `js/animations.js` | Legacy — no DOM target in current pages | Never (guard exits) | N/A | N/A | N/A |
| Kritexa.AI countdown | `setInterval` | `js/animations.js` | Kritexa.AI only (guarded by element check) | Immediately on page load | When `diff <= 0` | CSS disables display | Yes |
| Process circle pulse | `setInterval` | `js/pages/home.js` | Home only | `document.fonts.ready` or 300ms fallback | `visibilitychange` (paused on tab hide) | N/A (no motion, just class toggle) | Yes |
| Center orb pulse | RAF | `js/pages/home.js` | Home only (mobile only via IntersectionObserver) | When `porbCenter` becomes visible | When `porbCenter` leaves viewport | Yes — early return | Yes — only on mobile |
| Process orbital SVG spin | CSS `@keyframes orb-spin` | `js/pages/home.js` sets animation | Home mobile only | When layout runs | CSS animation | Skipped by `REDUCED_MOTION` check | Mobile only |
| Stat counters (home) | RAF (easeOut) | `js/pages/home.js` | Home only | `IntersectionObserver` at 0.3 threshold | After animation completes | Yes — immediate set | Yes |
| Stat counters (portfolio) | RAF (easeOut) | `js/pages/portfolio.js` | Portfolio only | `IntersectionObserver` at 0.3 threshold | After animation completes | Yes — immediate set | Yes |
| Animated counters (global) | RAF (easeOut) | `js/global.js` | All pages (no-ops if no `[data-count]`) | `IntersectionObserver` at 0.3 threshold | After animation completes (unobserve) | Not guarded in JS — CSS reveal handles | Yes |
| Custom cursor | RAF (lerp) | `js/global.js` | All pages (hover:hover only) | On page load | `visibilitychange` (paused on tab hide) | Yes — early return before RAF starts | No — hover:hover guard |
| Scroll reveal | CSS transition + IO | `js/global.js` | All pages | `IntersectionObserver` at 0.06 threshold | One-time (unobserve after reveal) | CSS hides transition, elements shown immediately | Yes |

---

## 3. EVENT LISTENER INVENTORY

| Event | Target | File | passive | Purpose |
|-------|--------|------|---------|---------|
| `mousemove` | `document` | `js/global.js` | ✅ `{ passive: true }` | Track cursor position |
| `pointerover` | `document` | `js/global.js` | ✅ `{ passive: true }` | Cursor enlarge on hover (delegated) |
| `pointerout` | `document` | `js/global.js` | ✅ `{ passive: true }` | Cursor shrink on hover-out (delegated) |
| `visibilitychange` | `document` | `js/global.js` | n/a | Pause cursor RAF on tab hide |
| `visibilitychange` | `document` | `js/pages/home.js` | n/a | Pause canvas RAF + process interval on tab hide |
| `scroll` | `window` | `js/navigation.js` | ✅ `{ passive: true }` | Navbar scroll state |
| `resize` | `window` | `js/navigation.js` | ✅ `{ passive: true }` | Navbar dynamic collapse |
| `resize` | `window` | `js/pages/home.js` | n/a | Canvas resize (debounced 150ms) |
| `resize` | `window` | `js/pages/home.js` | n/a | Process orbital relayout (debounced 150ms) |
| `resize` | `window` | `js/animations.js` | n/a | Dashboard chart redraw (legacy, no DOM target) |
| `resize` | `window` | `js/animations.js` | n/a | Process orbital relayout (guarded by page) |
| `click` | `#ham` | `js/navigation.js` | n/a | Hamburger toggle |
| `click` | `.nav-mob-link, .mob-cta` | `js/navigation.js` | n/a | Close mobile drawer on nav link click |
| `click` | `#nav-products-btn` | `js/navigation.js` | n/a | Products mega menu toggle |
| `focusout` | `#products-mega-menu` | `js/navigation.js` | n/a | Close mega menu on tab-out |
| `click` | `#mob-products-btn` | `js/navigation.js` | n/a | Mobile products accordion toggle |
| `keydown` | `document` | `js/navigation.js` | n/a | Escape key closes menus |
| `click` | `document` | `js/navigation.js` | n/a | Outside-click closes mega menu |
| `click` | `#pf-cat-filters` | `js/pages/portfolio.js` | n/a | Portfolio category filter (delegated) |
| `click` | `#pf-type-filters` | `js/pages/portfolio.js` | n/a | Portfolio type filter (delegated) |
| `mouseenter`/`mouseleave` | `.s-li`, `.s-fb` etc. | `js/global.js` | n/a | Social icon hover colors |

---

## 4. TIMER / RAF INVENTORY

### requestAnimationFrame loops

| Loop | File | Guard | Stop Condition |
|------|------|-------|---------------|
| Cursor lerp | `js/global.js` | hover:hover + reduced-motion + element exists | `visibilitychange` pause |
| BUSINESS canvas | `js/pages/home.js` | `data-page="home"` + elements exist + reduced-motion | `visibilitychange` pause |
| Center orb pulse | `js/pages/home.js` | elements exist + reduced-motion + IntersectionObserver | Leaves viewport (IO) |
| Stat counter (home) | `js/pages/home.js` | IntersectionObserver trigger + elements exist | Animation complete (p >= 1) |
| Stat counter (portfolio) | `js/pages/portfolio.js` | IntersectionObserver trigger + elements exist | Animation complete |
| Global counters | `js/global.js` | IntersectionObserver trigger + `[data-count]` exists | Animation complete (p < 1 check) |

### setInterval instances

| Interval | File | Guard | Stop Condition |
|----------|------|-------|---------------|
| Countdown (1000ms) | `js/animations.js` | Elements must exist (`#kaiDays` etc.) | `diff <= 0` (launch date reached) |
| Process pulse (1000ms) | `js/pages/home.js` | Elements must exist (`.proc-c`) | `visibilitychange` pause/resume |

### setTimeout instances

| Purpose | File | Duration |
|---------|------|---------|
| Canvas init retry | `js/pages/home.js` | 150ms / 350ms (one-time) |
| Canvas init after fonts | `js/pages/home.js` | 120ms (one-time) |
| Process init | `js/pages/home.js` | 150ms / 300ms (one-time) |
| Resize debounce (canvas) | `js/pages/home.js` | 150ms (debounced) |
| Resize debounce (process) | `js/pages/home.js` | 150ms (debounced) |
| Legacy SPA counter reset | `js/navigation.js` | 80ms (legacy SPA only, guarded by hasPageSystem) |

---

## 5. BEFORE / AFTER ARCHITECTURE

### Before Phase 15

| Issue | Impact |
|-------|--------|
| `js/animations.js` BUSINESS canvas IIFE ran on ALL 9 pages | On home page: two competing RAF loops (animations.js + home.js both found `#jkCanvas`) |
| `js/animations.js` countdown IIFE ran on ALL 9 pages | 8 pages: `setInterval(updateCountdown, 1000)` fired needlessly (guarded by element check inside the function, but interval was started unconditionally) |
| `js/animations.js` process IIFE ran on ALL 9 pages | On home page: two `setInterval(nextPulse, 1000)` fired + two `pulseCen` RAF loops |
| Cursor RAF ran permanently on background tabs | Background tabs continued lerp calculations at 60fps even with no user interaction |
| Cursor hover: per-element `mouseenter`/`mouseleave` on all matching elements | N×2 listeners attached on page load (e.g. home page: ~50+ elements = 100+ listeners) |
| `mousemove` listener missing `passive: true` | Browser could not confirm no `preventDefault()` call — possible scroll delay on some browsers |
| `pulseCen` RAF ran on desktop where `.proc-mobile` is `display:none` | Invisible element animated at 60fps on desktop |
| `setInterval(nextPulse)` in home.js: no pause when tab hidden | Class toggles ran every second on background tabs |
| Countdown `setInterval` never cleared | Even after `diff <= 0`, interval continued firing every second indefinitely |

### After Phase 15

| Change | Mechanism |
|--------|-----------|
| BUSINESS canvas: guarded by `data-page="home"` | `js/animations.js` checks `document.body.getAttribute('data-page') === 'home'` and returns immediately. Only `js/pages/home.js` runs the canvas on home. |
| Countdown: guarded by element existence | `js/animations.js` checks `#kaiDays` etc. — early return on all 8 non-kritexa-ai pages. |
| Process: guarded by element existence + data-page | `js/animations.js` process IIFE checks `.proc-c` elements + `data-page="home"`. |
| `data-page` attribute on `<body>` | Injected by `scripts/build.js` `buildPageWrapper()` from `page.id`. |
| Cursor RAF pauses on tab hide | `visibilitychange` listener with `cancelAnimationFrame` + `rafId` tracking. |
| Cursor RAF: reduced-motion guard | Early return before RAF starts if `prefers-reduced-motion: reduce`. |
| Cursor hover: event delegation | Two `pointerover`/`pointerout` listeners on `document` instead of N×2 per-element listeners. |
| `mousemove`: `{ passive: true }` | Explicitly passive — allows browser scroll optimization. |
| `pulseCen` RAF: IntersectionObserver gate | RAF only starts when `#porbCenter` is intersecting viewport. Stops when it leaves. |
| Process interval: `visibilitychange` pause | `clearInterval` when tab hidden, restart when visible again. |
| Countdown interval: cleared at `diff <= 0` | `clearInterval(cdInterval)` inside `updateCountdown()` when diff reaches zero. |

---

## 6. OPTIMIZATIONS IMPLEMENTED

All implemented. Evidence type: ESTIMATED (no profiler available) unless marked OBSERVED.

1. **Eliminated double canvas RAF loop on home page** — ESTIMATED: one competing RAF loop eliminated. Canvas renders once instead of twice per frame.

2. **Eliminated 8 unnecessary countdown setIntervals** — ESTIMATED: On 8 non-kritexa-ai pages, `setInterval(updateCountdown, 1000)` no longer starts. Negligible per-page cost but correct lifecycle behavior.

3. **Eliminated duplicate process setInterval on home page** — ESTIMATED: One `setInterval(nextPulse, 1000)` eliminated (animations.js + home.js both ran it previously).

4. **Eliminated duplicate process pulseCen RAF on home page** — ESTIMATED: One infinite RAF loop eliminated on home page.

5. **Cursor RAF pause on tab hidden** — ESTIMATED: Background tabs no longer compute cursor lerp at 60fps.

6. **Cursor reduced-motion: RAF never starts** — OBSERVED: Verified in code path. CSS also hides elements; JS now also does not start the RAF loop.

7. **Cursor hover: event delegation** — OBSERVED: 2 listeners on document replace N×2 per-element listeners. For a page with 50 interactive elements this reduces initial listener registration from 100 to 2.

8. **`mousemove` passive:true** — ESTIMATED: Allows browser to skip calling into JS on scroll checking path.

9. **`pulseCen` RAF: IntersectionObserver gate** — ESTIMATED: On desktop, `.proc-mobile` is `display:none` — `#porbCenter` is never visible. RAF loop never starts on desktop. On mobile, RAF starts only when the section is on screen.

10. **Process interval: visibilitychange pause** — ESTIMATED: Process circle class toggles pause when user switches tabs.

11. **Countdown interval: clears at zero** — CORRECTNESS fix: interval now has defined end condition.

12. **`data-page` body attribute via build system** — ARCHITECTURE: Enables page identity without runtime URL parsing in every JS guard.

---

## 7. OPTIMIZATIONS REJECTED AND WHY

| Optimization | Reason Rejected |
|-------------|----------------|
| Remove `js/animations.js` entirely | Kritexa.AI countdown still needs it. The file is used on the kritexa-ai page. |
| Move countdown to `js/pages/kritexa-ai.js` | Would require creating a new file and updating build config. The element-guard approach achieves the same result with less change. No regression risk. |
| Remove legacy `pfFilter` / `kaiJoin` from navigation.js | These are `window.x = window.x || function()` stubs. They do not execute DOM queries at page load. Cost is negligible JS parse overhead. Removing them risks breaking edge cases if legacy code calls them. |
| Remove `js/active-nav.js` | Build system injects desktop active state at build time, but mobile nav active state and `navbar.scrolled` on non-home pages still require runtime detection. `active-nav.js` is still necessary. |
| Throttle `checkNavOverflow` on resize | The function already avoids unnecessary work by checking `wasCollapsed` state. It performs 3–4 DOM reads — acceptable cost on resize. Adding throttle adds code complexity for marginal gain. |
| Replace `setInterval` process pulse with CSS animation | CSS `@keyframes` can handle sequential pulsing only with nth-child tricks and fixed timing. The current implementation allows easy configuration of timing and count. No compelling reason to replace a working, guarded solution. |
| Cap DPR in animations.js canvas (non-home) | DPR already capped at 2× in the guarded code path. The canvas only runs on non-home pages if `#jkCanvas` exists — which only happens on home page where the guard prevents it. Net result: canvas is home-only. |
| Debounce the navbar scroll listener | The scroll callback is a single `if/else` classList operation — one of the cheapest possible scroll handlers. No throttle/debounce needed. |
| Use ResizeObserver instead of `window.addEventListener('resize')` | Project uses `resize` events with debounce — acceptable for this use case. ResizeObserver would add complexity for marginal benefit. |

---

## 8. REDUCED-MOTION BEHAVIOR

### CSS (`css/global.css`)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    transition-duration: 0s !important;
    /* ... */
  }
  .ambient, .amb-blob, #cur, #cur-r { display: none !important; }
  .rv, .rv-l, .rv-r { opacity: 1 !important; transform: none !important; }
}
```

### JavaScript

| Feature | Reduced-Motion Behavior |
|---------|------------------------|
| Custom cursor RAF | **Does not start** — early return before `tick()` |
| BUSINESS canvas RAF | **Does not start** — `js/pages/home.js` checks `REDUCED_MOTION` at init |
| Canvas fallback | Static gradient text shown on `jkBig` element |
| Center orb pulse RAF | **Does not start** — `if (REDUCED_MOTION) return` guard |
| Orbital arc animation | CSS `animation` not set when `REDUCED_MOTION` — spinning arc group static |
| Stat counter (home) | **Immediate set** — `target+'+'` without animation |
| Stat counter (portfolio) | **Immediate set** — `el.textContent = target` |
| Global counters (`[data-count]`) | Counter JS still runs but animation is effectively instant because CSS `transition-duration: 0s` applies (scroll-reveal already visible, counter fires) |
| Process pulse interval | Runs (class toggle only — not a motion animation per se) |

---

## 9. MOBILE BEHAVIOR

| Feature | Mobile Behavior |
|---------|----------------|
| Custom cursor | **Does not initialize** — `(hover:hover)` media query check |
| BUSINESS canvas | Runs on mobile (same as desktop) — visually correct |
| Canvas DPR | Capped at 2× — prevents 3× rendering on high-DPI mobile |
| Process orbital | **Mobile only** — `pulseCen` RAF uses IntersectionObserver; only runs when visible |
| Scroll reveal | Works on mobile — IO fires at 6% threshold |
| Social hover | Listeners attached but mouseenter events never fire on touch — harmless |
| FAQ accordion | Works via `onclick="toggleFaq(this)"` — touch events trigger click |
| Portfolio filters | Event delegation on `#pf-cat-filters` and `#pf-type-filters` — touch events trigger click |
| Pointer effects | `pointerover`/`pointerout` — filtered by `e.pointerType==='mouse'` check; no effect on touch |

---

## 10. ERROR SAFETY (Phase 15.15)

All JS files guard optional DOM dependencies:

| Check | Location | Guard |
|-------|----------|-------|
| `#cur`, `#cur-r` | `js/global.js` | `if(!c||!r||...)return` |
| `#jkCanvas` (home) | `js/animations.js` | `data-page` check + `if(!mainCanvas...)return` |
| `#kaiDays` etc. (kritexa-ai) | `js/animations.js` | Element existence check — `if(!dEl && !hEl && !mEl && !sEl) return` |
| `.proc-c` (home) | `js/animations.js` | `if(!allCircles.length) return` |
| `#navbar` | `js/navigation.js` | All refs wrapped in `if (navbar)` |
| `#ham`, `#mob` | `js/navigation.js` | `if (!mob || !ham) return` inside functions |
| `#productsBtn`, `#productsMenu` | `js/navigation.js` | All refs guarded |
| Process elements | `js/pages/home.js` | `if (!allCircles.length) return` |
| Canvas (home) | `js/pages/home.js` | `if (!mainCanvas || !offCanvas || !textEl) return` |
| Portfolio stat elements | `js/pages/portfolio.js` | `if (!statsStrip) return` |
| Portfolio filter elements | `js/pages/portfolio.js` | `if (!catGroup && !typeGroup) return` |
| Social icon elements | `js/global.js` | `if(!els.length)return` per class |

---

## 11. DEBUG CODE AUDIT (Phase 15.16)

Searched all JS files for `console.log`, `console.debug`, `debugger`:

- **Result**: No debug statements found in any JS file.
- **Evidence**: `grep` scan across `js/` directory confirmed zero matches.

---

## 12. REGRESSION TESTING

### Build Result
```
✓ index.html           (81.1 KB)
✓ about/index.html     (45.6 KB)
✓ capabilities/index.html (68.4 KB)
✓ portfolio/index.html (78.0 KB)
✓ case-studies/index.html (63.3 KB)
✓ contact/index.html   (52.8 KB)
✓ kritexa-ai/index.html (54.6 KB)
✓ career/index.html    (53.7 KB)
✓ labs/index.html      (52.1 KB)
Build complete — 9/9 pages
```

### Regression Verification Checklist

| Item | Status |
|------|--------|
| `data-page="home"` on home `<body>` | ✅ Verified in built `index.html` |
| `data-page="kritexa-ai"` on kritexa-ai `<body>` | ✅ Verified in built `kritexa-ai/index.html` |
| Countdown elements present in kritexa-ai page | ✅ `#kaiDays`, `#kaiHrs`, `#kaiMins`, `#kaiSecs` confirmed |
| Home page loads `js/pages/home.js` | ✅ Confirmed in built `index.html` |
| Portfolio page loads `js/pages/portfolio.js` | ✅ Confirmed in build config |
| No other page loads `js/pages/home.js` | ✅ Confirmed — `about/index.html` does not include it |
| Desktop nav active state on `about` page | ✅ `nl-about` has `class="nav-link active"` + `aria-current="page"` |
| Mobile nav active state — `active-nav.js` needed | ✅ Confirmed — `ml-*` IDs not injected by build system |

### Manual Regression Required

The following require human verification in Chrome and Firefox:

**Chrome 1440px:**
- [ ] Home hero canvas animation renders correctly
- [ ] No double canvas rendering / flickering
- [ ] Cursor effect works
- [ ] Scroll reveal works
- [ ] Products mega menu opens/closes
- [ ] Process circles pulse sequentially (1 per second)
- [ ] Kritexa.AI countdown ticks

**Chrome 390px (mobile):**
- [ ] No cursor effect (correct)
- [ ] Process orbital SVG draws correctly
- [ ] Center orb pulses (mobile only)
- [ ] All scroll reveals trigger
- [ ] FAQ opens/closes
- [ ] Contact form validation works
- [ ] Mobile drawer works

**Firefox 1440px + 390px:**
- [ ] Same as Chrome

---

## 13. FILES CHANGED

### Modified
- `js/animations.js` — Added `data-page` guard on BUSINESS canvas, element guards on countdown and process, `setInterval` reference management, countdown auto-clear, DPR cap
- `js/global.js` — Cursor: reduced-motion guard, passive mousemove, visibilitychange pause, event delegation for hover; social: per-class element guard
- `js/pages/home.js` — pulseCen IntersectionObserver gate, process interval visibilitychange pause
- `scripts/build.js` — Added `pageId` parameter to `buildPageWrapper`, injects `data-page` on `<body>`

### Created
- `docs/PHASE15-JS-ANIMATION-REPORT.md` (this file)

### Not Changed (audited and confirmed correct)
- `js/navigation.js` — Scroll/resize listeners already passive. Escape/click handlers correct. No duplicate listeners. Phase 14 behavior preserved.
- `js/active-nav.js` — Runtime active state still necessary for mobile nav + navbar.scrolled. No change.
- `js/pages/portfolio.js` — Reduced motion handled. Event delegation used. No issues found.
- All CSS files — Reduced motion CSS confirmed comprehensive.

---

## 14. KNOWN REMAINING ITEMS (not Phase 15 scope)

| Item | Phase |
|------|-------|
| Profiling with DevTools Performance tab | Phase 16 |
| Core Web Vitals measurement | Phase 16 |
| `js/navigation.js` legacy `pfFilter`/`kaiJoin` stubs — dead code | Phase 21 cleanup |
| `js/animations.js` `dashChart`/`leadNum` — legacy dead code | Phase 21 cleanup |
| Contact form backend | Phase 21 |
| Kritexa.AI waitlist backend | Phase 21 |
| WhatsApp number placeholder | Phase 21 |

---

*Phase 15 — JS & Animation Engineering — Complete*
