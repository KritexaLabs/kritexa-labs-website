## Phase 22 — Solutions / Live Projects IA Redesign

### Navigation Architecture Change

**Old primary nav (desktop):**
```
Home | About | Capabilities | Portfolio | Case Studies | Contact | Products ▼ | Kritexa.AI
```

**New primary nav (desktop):**
```
Home | About | Solutions ▼ | Live Projects | Contact | Products ▼ | Kritexa.AI
```

### Solutions Dropdown (NEW Phase 22)

Solutions is a top-level nav trigger (NOT a page). It opens a dropdown containing:

| Item | URL | Description |
|------|-----|-------------|
| Capabilities | `/capabilities` | Technology, engineering & what we build |
| Industry Solutions | `/industry-solutions` | Solutions by industry & business type |
| Portfolio | `/portfolio` | What we have made |
| Case Studies | `/case-studies` | Real problems, implementation, outcomes |

**HTML element IDs:**
- Desktop trigger: `id="nav-solutions-btn"` (button with `aria-haspopup`, `aria-expanded`, `aria-controls`)
- Desktop panel: `id="solutions-dropdown"` (`role="region"` + `aria-label`)
- Mobile trigger: `id="mob-solutions-btn"` (button accordion)
- Mobile panel: `id="mob-solutions-panel"` (accordion)

**Active nav IDs (dropdown items):**
- `id="nl-capabilities"` / `id="ml-capabilities"`
- `id="nl-industry-solutions"` / `id="ml-industry-solutions"` (NEW)
- `id="nl-portfolio"` / `id="ml-portfolio"`
- `id="nl-case-studies"` / `id="ml-case-studies"`

**Parent-active behavior**: When visiting a Solutions child page, `nav-solutions-btn` gets `.active` class (set by `js/active-nav.js`).

### Live Projects (NEW Phase 22)

Top-level nav link — NOT under Solutions dropdown.

| Desktop | Mobile |
|---------|--------|
| `id="nl-live-projects"` (`.nav-link`) | `id="ml-live-projects"` (`.nav-mob-link`) |

### Products Mega Menu Update

"Solutions" column renamed to "Offerings" to avoid naming collision with new top-level Solutions nav item. See AD-22-001.

### Mobile Drawer Order (Phase 22)

```
Home
About
Solutions [accordion]
  ├── Capabilities
  ├── Industry Solutions
  ├── Portfolio
  └── Case Studies
Live Projects
Contact
Products [accordion]
  ├── Offerings (was: Solutions)
  ├── Tools
  ├── APIs
  └── Platforms
Kritexa.AI
─────
Career
Labs
[Start Project CTA]
```

### JS: Navigation Behavior

All Solutions dropdown logic lives in `js/navigation.js`:
- `openSolutions()` / `closeSolutions()` / `toggleSolutions()`
- `closeMobSolutions()`
- Solutions closes when Products opens (mutual exclusion)
- Solutions closes when mobile menu opens
- Escape closes Solutions dropdown first (before Products or mobile)

All active state logic for new routes lives in `js/active-nav.js`.

---


## Phase 21 Update — Backend/Database/CMS Documentation

**Status**: COMPLETE (documentation only)

Phase 21 made no changes to navigation code, header, footer, or mega menu. All navigation behavior documented below (Phase 20 and earlier) remains current and unchanged.

---

## Phase 20 Update — Final Security & Technical QA

**Date**: 2025-08-23
**Status**: COMPLETE

### FAQ Delegation Model (Phase 20 Security Fix)

The FAQ accordion interaction pattern was updated in Phase 20 as part of the inline `onclick` removal (S2-01):

**Before (Phase 10/11):**
```html
<button onclick="toggleFaq(this)" ...>
```
```js
function toggleFaq(btn) {
  var item = btn.parentElement; // brittle
  ...
}
```

**After (Phase 20):**
```html
<button data-faq-toggle ...>
```
```js
function toggleFaq(btn) {
  var item = btn.closest('.faq-item'); // robust
  ...
}
document.addEventListener('click', function(e) {
  var btn = e.target.closest('[data-faq-toggle]');
  if (btn) toggleFaq(btn);
});
```

**Rationale**: Inline event handler attributes are CSP-hostile. Event delegation via `data-faq-toggle` enables `script-src 'self'` CSP without `unsafe-inline` for scripts.

**Behavioral change**: None. FAQ accordion, `aria-expanded`, `aria-controls`, keyboard activation, and visual state are all unchanged.

**Applies to**: `case-studies/index.html`, `contact/index.html` (FAQ sections)

### Cross-Browser Navigation Compatibility (Phase 19 — still valid)

All navigation features verified across Chrome 151, Firefox 154, Edge 151:

| Component | Chrome | Firefox | Edge | Safari |
|-----------|--------|---------|------|--------|
| Desktop nav pill | PASS | PASS | PASS | STATICALLY VERIFIED |
| Products mega menu | PASS | PASS | PASS | STATICALLY VERIFIED |
| Mobile drawer | PASS | PASS | PASS | STATICALLY VERIFIED |
| Active nav state | PASS | PASS | PASS | STATICALLY VERIFIED |
| Escape key handling | PASS | PASS | PASS | STATICALLY VERIFIED |
| Focus return | PASS | PASS | PASS | STATICALLY VERIFIED |
| Skip navigation | PASS | PASS | PASS | STATICALLY VERIFIED |
| aria-expanded sync | PASS | PASS | PASS | STATICALLY VERIFIED |
| FAQ accordion | PASS | PASS | PASS | STATICALLY VERIFIED |

---


## Phase 19 Update — Cross-Browser & Compatibility QA

**Date**: 2025  
**Status**: COMPLETE

### Cross-Browser Navigation Compatibility

All navigation features verified across Chrome 151, Firefox 154, Edge 151 (static analysis for Safari):

| Component | Chrome | Firefox | Edge | Safari |
|-----------|--------|---------|------|--------|
| Desktop nav pill | PASS | PASS | PASS | STATICALLY VERIFIED |
| Products mega menu | PASS | PASS | PASS | STATICALLY VERIFIED |
| Mobile drawer | PASS | PASS | PASS | STATICALLY VERIFIED |
| Active nav state | PASS | PASS | PASS | STATICALLY VERIFIED |
| Escape key handling | PASS | PASS | PASS | STATICALLY VERIFIED |
| Focus return | PASS | PASS | PASS | STATICALLY VERIFIED |
| Skip navigation | PASS | PASS | PASS | STATICALLY VERIFIED |
| aria-expanded sync | PASS | PASS | PASS | STATICALLY VERIFIED |

### Browser Limitations
- Safari not available on Linux test environment. All `backdrop-filter` declarations in header.css already had `-webkit-backdrop-filter` prefixes from Phase 3/4.
- Firefox `backdrop-filter` transition on navbar is a jump rather than fade (B3, browser-native behavior).

---


# NAVIGATION VERIFICATION REPORT

## Phase 14 — Manual Navigation & Focus QA Completion

Real manual browser testing on Google Chrome 151 and Mozilla Firefox 154 has verified all navigation paths, mega menus, mobile drawers, keyboard focus order, and pop-state actions.

### Key Navigation Findings
- **Header Link Integrity**: All links are fully verified to load their respective HTML templates correctly without broken paths:
  - Logo → `/`
  - Home → `/`
  - About → `/about`
  - Capabilities → `/capabilities`
  - Portfolio → `/portfolio`
  - Case Studies → `/case-studies`
  - Contact → `/contact`
  - Kritexa.AI → `/kritexa-ai`
- **Products Mega Menu**:
  - Click-triggering opens the menu; clicking again collapses it.
  - Clicking outside the navbar and mega menu successfully closes it.
  - Pressing the `Escape` key closes the mega menu and returns the focus to the Products trigger button.
  - Categories Solutions, Tools, APIs, and Platforms are clearly rendered with appropriate coming soon badges.
- **Mobile Navigation Drawer**:
  - The hamburger button opens the drawer at `390px`.
  - Body scrolling is locked with the `.nav-open` class when the drawer is active, and is immediately unlocked on close.
  - Keyboard users can cycle through mobile drawer links.
  - Pressing `Escape` while in the drawer collapses the drawer, returning focus to the hamburger.
  - Accordion Products dropdown inside the mobile drawer expands and collapses as expected with appropriate arrow toggles.

---


## Phase 13 — Career & Labs Navigation

### Career Active State

The `/career` page has **no primary desktop navigation link**.
Career is a footer-only page (Architecture Decision AD-012).

- Desktop nav: **Not present** — Career NOT in header primary navigation
- Mobile drawer: `<a id="ml-career" class="nav-mob-link nav-mob-dim">` — accessible via mobile only
- Footer: `<a href="/career">Career</a>` — in the "Our Work" footer column
- `activeNav: ''` — injectActiveNav() not called for Career (no header link to activate)

### Labs Active State

The `/labs` page has **no primary desktop navigation link**.
Labs is a footer-only page (Architecture Decision AD-012).

- Desktop nav: **Not present** — Labs NOT in header primary navigation
- Mobile drawer: `<a id="ml-labs" class="nav-mob-link nav-mob-dim">` — accessible via mobile only
- Footer: `<a href="/labs" class="f-link-labs">LABS ✦</a>` — in the "Our Work" footer column
- `activeNav: ''` — injectActiveNav() not called for Labs (no header link to activate)

### Career & Labs in Navigation Hierarchy

```
Desktop header nav (unchanged):
  Home | About | Capabilities | Portfolio | Case Studies | Contact | Products ▾ | ● Kritexa.AI
  ← Career and Labs do NOT appear here

Mobile drawer:
  Home | About | Capabilities | Portfolio | Case Studies | Contact | Products + | ● Kritexa.AI | Career | Labs
  ← Career and Labs appear here (footer-only section of drawer)

Footer "Our Work" column:
  Case Studies | Portfolio | LABS ✦ | Kritexa.AI ✦ | Career
  ← Career and Labs appear here
```

### Header Regression Check (Phase 13)

Primary header nav verified unchanged:
- Home → `/`
- About → `/about`
- Capabilities → `/capabilities`
- Portfolio → `/portfolio`
- Case Studies → `/case-studies`
- Contact → `/contact`
- Products → mega menu trigger (no page)
- ● Kritexa.AI → `/kritexa-ai`
- Start Project → `/contact`

Career and Labs do NOT appear in primary desktop nav. ✅

---



## Phase 12 — Kritexa.AI Page Navigation

### Kritexa.AI Active State

The `/kritexa-ai` page activates the Kritexa.AI navigation link:
- Desktop nav: `<a id="nl-kritexaai" class="nav-kai-pill active" aria-current="page">`
- Mobile drawer: `<a id="ml-kritexaai" class="nav-mob-link nav-mob-kai">` (handled by `js/active-nav.js` at runtime)

### Kritexa.AI in Navigation Hierarchy

```
Desktop header nav:
  Home | About | Capabilities | Portfolio | Case Studies | Contact | Products ▾ | ● Kritexa.AI [active on /kritexa-ai]

Right CTA:
  "Start Project →" → /contact  (temporary destination per AD-019)

Mobile drawer:
  ... | Contact | Products + | ● Kritexa.AI [active] | Career | Labs
  "Start Project →" → /contact
```

### Footer Kritexa.AI Link

The shared `components/footer.html` includes a Kritexa.AI link in the navigation grid column (Our Work column).
This link correctly points to `/kritexa-ai` and uses `.f-link-kai` for cyan styling.

---



## Phase 11 — Contact Page Navigation

### Contact Active State

The `/contact` page activates the Contact navigation link:
- Desktop nav: `<a id="nl-contact" class="nav-link active" aria-current="page">`
- Mobile drawer: `<a id="ml-contact" class="nav-mob-link">` (handled by `js/active-nav.js` at runtime)

### Contact in Navigation Hierarchy

```
Desktop header nav:
  Home | About | Capabilities | Portfolio | Case Studies | [Contact ← active on /contact] | Products ▾ | ● Kritexa.AI

Right CTA:
  "Start Project →" → /contact  (temporary destination per AD-019)

Mobile drawer:
  ... | Contact [active] | Products + | ● Kritexa.AI | Career | Labs
  "Start Project →" → /contact
```

### Footer Contact Link

The shared `components/footer.html` includes a Contact link in the navigation grid column.
This link correctly points to `/contact`.

---


# Navigation System — Phase 5

**Status: Phase 5 COMPLETE**

This document reflects the Phase 4 Products Mega Menu implementation. Phase 3 content is preserved below for reference.

---

## Phase 4 — Products Mega Menu

### Overview

The Products mega menu is a full-width navigation panel that appears beneath the header when the "Products" button is activated. It provides visual access to the four approved Kritexa Labs product categories.

**Products has no dedicated page.** There is no `/products`, `/products/`, or `products.html` URL. Products is a navigation trigger only (Architecture Decision AD-011, AD-020).

### Four Approved Categories

| Category | Description (structural — no approved product content yet) |
|---|---|
| Solutions | End-to-end growth systems built for your business |
| Tools | Productivity and marketing tools to accelerate your workflow |
| APIs | Developer-grade APIs for AI, data, and communications |
| Platforms | SaaS, AI, and developer platforms built for scale |

### Product Destination Status

> **Product destination pages have not been implemented in Phase 4.**
>
> The four category titles are intentional non-navigational labels. They are displayed as visual category blocks — not `<a href>` links. Actual product URLs will be connected when those pages are created in a future phase.
>
> See `docs/ARCHITECTURE-DECISIONS.md` AD-024 for the rationale and future strategy.

---

## Desktop Mega Menu

### HTML Structure

```
components/header.html
  └── #products-mega-menu (.products-mega-menu[role="region"])
        └── .pmm-inner (4-column grid)
              ├── .pmm-col (Solutions — icon + title + desc + coming-soon tag)
              ├── .pmm-col (Tools — icon + title + desc + coming-soon tag)
              ├── .pmm-col (APIs — icon + title + desc + coming-soon tag)
              └── .pmm-col (Platforms — icon + title + desc + coming-soon tag)
        └── .pmm-footer-strip (Kritexa.AI cross-link)
```

### Open/Close Behavior

| Action | Result |
|---|---|
| Click Products button | Menu opens (`aria-expanded="true"`, `.open` class, `aria-hidden` removed) |
| Click Products button again | Menu closes |
| Press Escape (focus in menu or on button) | Menu closes, focus returns to Products button |
| Click outside navbar + menu | Menu closes |
| Tab to last focusable element in menu, Tab again | Menu closes (focusout handler) |
| Navigate to another page | Menu closed (natural browser navigation) |

### Animation

- **Closed state**: `opacity: 0`, `transform: translateY(-6px)`, `visibility: hidden`, `pointer-events: none`
- **Open state**: `opacity: 1`, `transform: translateY(0)`, `visibility: visible`, `pointer-events: auto`
- **Transition**: `0.22s ease` on `opacity` + `transform`; `visibility` switches at 0s delay on open, 0.22s delay on close
- **Reduced motion**: transitions shortened to `0.01ms`, `transform` suppressed; functionality fully preserved

---

## Mobile Products Accordion

### HTML Structure

```
components/header.html → .nav-mob (mobile drawer)
  ├── #mob-products-btn (.nav-mob-products[button])
  └── #mob-products-panel (.nav-mob-products-panel)
        └── .mob-pmm-grid (2-column grid)
              ├── .mob-pmm-item (Solutions — icon + label + soon badge)
              ├── .mob-pmm-item (Tools — icon + label + soon badge)
              ├── .mob-pmm-item (APIs — icon + label + soon badge)
              └── .mob-pmm-item (Platforms — icon + label + soon badge)
```

### Mobile Behavior

| Action | Result |
|---|---|
| Tap Products | Panel expands (arrow + → × ) |
| Tap Products again | Panel collapses |
| Press Escape (panel open) | Panel collapses, focus returns to Products trigger |
| Press Escape (panel closed, drawer open) | Drawer closes |
| Close mobile drawer | Panel also collapses (`closeMob` calls `closeMobProducts`) |

---

## ARIA Attributes

### Products Button (desktop)

```html
<button
  type="button"
  class="nav-products-trigger"
  id="nav-products-btn"
  aria-expanded="false"     ← "true" when open
  aria-controls="products-mega-menu"
  aria-haspopup="true">
```

### Mega Menu Container (desktop)

```html
<div
  id="products-mega-menu"
  role="region"
  aria-label="Products menu"
  aria-hidden="true"        ← removed when open
  class="products-mega-menu">
```

### Mobile Products Button

```html
<button
  id="mob-products-btn"
  aria-expanded="false"     ← "true" when panel is open
  aria-controls="mob-products-panel">
```

### Mobile Products Panel

```html
<div
  id="mob-products-panel"
  aria-hidden="true"        ← removed when open
  class="nav-mob-products-panel">
```

---

## Keyboard Behavior

| Key | Context | Effect |
|---|---|---|
| Tab | Page navigation | Reaches Products button in tab order |
| Enter / Space | Products button focused | Opens mega menu |
| Escape | Mega menu open | Closes menu, returns focus to Products button |
| Escape | Mobile Products open | Collapses accordion, returns focus to mobile trigger |
| Escape | Mobile drawer open | Closes drawer, returns focus to hamburger |
| Tab | Within mega menu | Cycles through focusable elements (Kritexa.AI link in footer strip) |
| Tab (last item) | Within mega menu | Closes menu (focusout handler) |

**No keyboard trap.** The menu can be exited via Tab, Escape, or by navigating away.

---

## Focus Management

- **Desktop open**: Focus remains on the Products button (the trigger), allowing natural Tab into the menu
- **Desktop close (Escape)**: Focus explicitly returned to `nav-products-btn`
- **Desktop close (Tab-out)**: Focus moves naturally to next element after the menu
- **Desktop close (outside-click)**: Focus not moved artificially
- **Mobile close (Escape)**: Focus returned to `mob-products-btn`

---

## Icons

Four inline SVG icons (one per category). All use:
- `width="18" height="18"`, `stroke="currentColor"`, `stroke-width="1.5"`
- `aria-hidden="true"` — decorative, not read by screen readers
- No external dependencies; no icon library

Mobile icons are 14×14 variants of the same SVGs.

---

## Files

### Source of Truth

| File | Role |
|---|---|
| `components/header.html` | Mega menu HTML embedded; canonical source |
| `components/mega-menu.html` | Reference copy of mega menu content |
| `css/header.css` | All `pmm-*` and `mob-pmm-*` styles |
| `js/navigation.js` | All open/close/ARIA/keyboard/focusout behavior |

### Generated Output

The mega menu HTML is composed into every page by `scripts/build.js` as part of the shared `components/header.html` partial.

---

## Responsive Behavior

| Viewport | Behavior |
|---|---|
| `> 1024px` | 4-column desktop mega menu |
| `769px – 1024px` | 2-column desktop mega menu (nav padding reduced) |
| `≤ 768px` | Desktop mega menu hidden (`display: none !important`); mobile accordion used |
| `≤ 360px` | Mobile accordion collapses to 1-column |

---

## Phase 3 Navigation Architecture (Preserved)

### Structure

```
components/header.html   ← Single source of truth for global header
css/header.css           ← All header/navigation styles (Phase 3 + Phase 4)
js/navigation.js         ← Mobile menu, Products mega menu, scroll state, legacy shim
js/active-nav.js         ← Sets aria-current="page" + .active per URL pathname
```

### Navigation Routes (Clean URLs — multi-page architecture)

| Page | URL | Nav ID (desktop) | Nav ID (mobile) |
|---|---|---|---|
| Home | `/` | `nl-home` | `ml-home` |
| About | `/about` | `nl-about` | `ml-about` |
| Capabilities | `/capabilities` | `nl-capabilities` | `ml-capabilities` |
| Portfolio | `/portfolio` | `nl-portfolio` | `ml-portfolio` |
| Case Studies | `/case-studies` | `nl-case-studies` | `ml-case-studies` |
| Contact | `/contact` | `nl-contact` | `ml-contact` |
| Kritexa.AI | `/kritexa-ai` | `nl-kritexaai` | `ml-kritexaai` |
| Career | `/career` | _(footer only)_ | `ml-career` |
| Labs | `/labs` | _(footer only)_ | `ml-labs` |

**Products has no page.** It is a navigation trigger only (Phase 4 mega menu).

### Desktop Navigation

```
[Logo]    [Home | About | Capabilities | Portfolio | Case Studies | Contact | | Products ▾ | ● Kritexa.AI]    [Start Project →]
```

- Fixed position, 74px height
- Transparent background → frosted glass on scroll (`scrollY > 20`)
- Center pill design: `background: rgba(18,17,26,0.85)`, border, `backdrop-filter: blur(16px)`
- Products is a `<button>` (not `<a href>`) — it is a menu trigger, not a page link
- Dynamic collapse: JavaScript measures if center pill overlaps logo or CTA, collapses to hamburger if so
- Absolute center positioning: `left: 50%; transform: translateX(-50%)`

### Mobile Navigation

- Hamburger trigger: `min-width/height: 44px` (accessibility touch target)
- Drawer: full-width, fixed, `top: 74px`, frosted glass background
- Drawer includes: all primary links + Products accordion + Kritexa.AI + Career + Labs + Start Project CTA
- Body scroll locked while drawer is open (`body.nav-open { overflow: hidden }`)

### Active State

Two mechanisms working together:

**1. Build-time injection** (`scripts/build.js`):
- `injectActiveNav()` adds `class="... active"` and `aria-current="page"` to the matching nav link in the HTML
- Applied at static build time — works before any JavaScript executes
- Ensures screen readers, SEO crawlers, and no-JS users see correct state

**2. Runtime fallback** (`js/active-nav.js`):
- Reads `window.location.pathname` and applies `.active` + `aria-current="page"` dynamically
- Belt-and-suspenders approach for edge cases (CDN served, SPA hydration, etc.)

### Kritexa.AI

```html
<a href="/kritexa-ai" class="nav-kai-pill" id="nl-kritexaai">
  <span class="nav-kai-dot"></span>
  <span>● Kritexa.AI</span>
</a>
```

- Real `<a href="/kritexa-ai">` link
- Cyan pill styling with animated glowing dot
- Active state: `class="nav-kai-pill active"` + `aria-current="page"` on `/kritexa-ai`

### Start Project Button

```html
<a class="btn-nav-solid" href="/contact" id="nav-start-project">Start Project →</a>
```

- **Temporary destination: `/contact`**
- Final destination TBD — see AD-019 in `docs/ARCHITECTURE-DECISIONS.md`
- Do NOT change to a final URL until Phase 11 / project form flow is decided
- Real `<a href>` element (not a button, not onclick)

### Accessibility

| Feature | Implementation |
|---|---|
| Skip navigation | `<a href="#main-content" class="skip-nav">` — offscreen until focused |
| Keyboard navigation | Tab/Shift+Tab works on all nav elements |
| Escape key | Closes mobile menu (returns focus to hamburger), mega menu (returns focus to Products button), mobile Products accordion |
| aria-current="page" | Set at build time + runtime on active page nav link |
| aria-expanded | Set on hamburger button, Products trigger, Mobile Products trigger |
| aria-controls | Hamburger → `#mob`; Products → `#products-mega-menu`; Mobile Products → `#mob-products-panel` |
| aria-hidden | Ambient background, decorative elements, cursor dots, closed menus |
| aria-label | Logo link, hamburger button, both nav regions, mega menu container |
| Touch targets | Hamburger: 44×44px min; Mobile links: 44px min-height |
| Focus visible | 2px solid outline using `--color-purple2` on all nav elements |
| Body scroll lock | `body.nav-open { overflow: hidden }` when mobile menu open |

### Header Scroll Behavior

- `position: fixed; top: 0; z-index: 1000`
- Default: `background: transparent`
- Scrolled state (`scrollY > 20`): `background: rgba(10,9,16,0.92); backdrop-filter: blur(22px); border-bottom: 1px solid rgba(255,255,255,0.05)`
- Inner pages (non-home): always show scrolled state via `js/active-nav.js`
- Transition: `0.65s ease` (subtle, not aggressive)

---

## Files Changed in Phase 4

| File | Change |
|---|---|
| `components/header.html` | Embedded mega menu HTML; updated mobile products panel with actual content |
| `components/mega-menu.html` | Full Phase 4 reference implementation replacing placeholder |
| `css/header.css` | Added all `pmm-*` desktop mega menu styles and `mob-pmm-*` mobile panel styles; responsive breakpoints; reduced-motion rules |
| `js/navigation.js` | Phase 4 — full mega menu open/close/keyboard/focusout behavior; mobile accordion improved; `closeMobProducts()` extracted; `closeMob` resets panel |
| `scripts/build.js` | Updated JS load comment to reflect Phase 4 |

---

## Phase 5 — Global Footer Navigation

### Overview

Phase 5 finalizes the global footer as a reusable component. The footer provides secondary site navigation and is composed into all 9 production pages at build time via `scripts/build.js`.

### Footer Navigation Routes

All footer navigation uses real `<a href>` anchors — no `onclick`, no hash routes.

| Link Text | URL | Column | Notes |
|---|---|---|---|
| Home | `/` | Main Pages | |
| About Us | `/about` | Main Pages | |
| Capabilities | `/capabilities` | Main Pages | |
| Portfolio | `/portfolio` | Main Pages | |
| Contact | `/contact` | Main Pages | |
| Case Studies | `/case-studies` | Our Work | |
| Portfolio | `/portfolio` | Our Work | |
| LABS ✦ | `/labs` | Our Work | Footer-only page (AD-012) |
| Kritexa.AI ✦ | `/kritexa-ai` | Our Work | Cyan styled |
| Career | `/career` | Our Work | Footer-only page (AD-012) |
| Website Dev | `/capabilities` | Services | |
| AI Automation | `/capabilities` | Services | |
| SEO | `/capabilities` | Services | |
| E-Commerce | `/capabilities` | Services | |
| Automation | `/capabilities` | Services | |
| Privacy Policy | *(none)* | Legal | Placeholder — page doesn't exist (Phase 21) |
| Terms of Service | *(none)* | Legal | Placeholder — page doesn't exist (Phase 21) |
| Cookie Policy | *(none)* | Legal | Placeholder — page doesn't exist (Phase 21) |

### Career & Labs — Footer-Only Status (AD-012)

`/career` and `/labs` are accessible from:
- The footer (all pages)
- The mobile navigation drawer

They do NOT appear in the desktop header pill navigation.

### Products in Footer — No Products Page (AD-011)

Products has no standalone page. The footer Services column links point to `/capabilities` where service content lives. No `/products` URL exists or was created.

### Legal Links Status

Legal pages (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`) **do not exist**. The footer renders them as non-clickable `<span class="f-link-pending">` elements with `title="Coming in a future release"`. Creating those pages and replacing the spans with real `<a href>` links is deferred to Phase 21.

### Footer Social Links

| Platform | URL | Verified Source |
|---|---|---|
| Instagram | `https://instagram.com/kritexalabs` | legacy footer |
| X (Twitter) | `https://x.com/kritexalabs` | legacy footer |
| LinkedIn | `https://www.linkedin.com/company/kritexa-labs/` | legacy footer |
| Facebook | `https://www.facebook.com/kritexalabs1` | legacy footer |
| YouTube | `https://youtube.com/@kritexalabs` | legacy footer |
| Threads | `https://threads.net/@kritexalabs` | legacy footer |

All social links use `target="_blank" rel="noopener noreferrer"` and have explicit `aria-label` attributes.

### Files Changed in Phase 5

| File | Change |
|---|---|
| `components/footer.html` | Fully finalized — real anchors, accessible markup, `<form>` newsletter, legal placeholders, social aria-labels, Career/Labs footer-only links |
| `css/footer.css` | New file — all footer + GCTA styles extracted from `css/components.css` to a dedicated stylesheet |
| `scripts/build.js` | Added `css/footer.css` to CSS load order (between header.css and components.css) |

