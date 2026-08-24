
## AD-22-001 — Phase 22: Products Mega Menu "Solutions" Column Renamed to "Offerings"

**Phase**: 22
**Decision**: Rename the "Solutions" category column in the Products mega menu to "Offerings".

**Rationale**: Phase 22 introduces a top-level "Solutions" navigation item (a dropdown containing Capabilities / Industry Solutions / Portfolio / Case Studies). Having a "Solutions" label inside the Products mega menu creates user confusion — a visitor might believe the Products → Solutions category is the same as the navigation Solutions dropdown. Renaming to "Offerings" removes this ambiguity without changing the visual structure, functionality, or content description of the Products mega menu.

**Scope**: `components/header.html` (mega menu column title), `components/mega-menu.html` (canonical reference), `docs/NAVIGATION.md`, `docs/PHASE22-IA-REDESIGN-REPORT.md`.

**Accepted**: Yes — Fixed in Phase 22.

---

## AD-22-002 — Phase 22: No /solutions Landing Page Created

**Phase**: 22
**Decision**: Do NOT create a `/solutions` standalone page.

**Rationale**: "Solutions" is a navigation umbrella/dropdown. Creating a `/solutions` page would add an unnecessary navigation step and page load between the top-level Solutions trigger and the four content pages. All four Solutions sub-pages (Capabilities, Industry Solutions, Portfolio, Case Studies) are directly accessible from the dropdown. There is no navigation benefit to adding a solutions landing page.

**Accepted**: Yes.

---

## AD-22-003 — Phase 22: Industry Solutions Content Moved from Capabilities to /industry-solutions

**Phase**: 22
**Decision**: Move the "Who We Serve" grid and all 8 industry solution rows from `src/sections/capabilities/` to a new dedicated page at `/industry-solutions`.

**Old URLs**: Content was embedded within `/capabilities` — no dedicated URL existed.
**New URL**: `/industry-solutions`
**Redirect**: No redirect required (content was not independently addressable).

**Rationale**: The Phase 22 IA requires clear conceptual separation:
- Capabilities → "What can Kritexa Labs build?"
- Industry Solutions → "Who can Kritexa Labs build for?"
Having industry content on the Capabilities page conflated two distinct questions. The Capabilities page now focuses purely on engineering/technology domains.

**Accepted**: Yes.

---

## AD-22-004 — Phase 22: Live Projects Page Honest Status

**Phase**: 22
**Decision**: Create the Live Projects page structure with honest "Coming Soon" status for all 12 portfolio projects, rather than fabricating live URLs.

**Rationale**: None of the 12 portfolio projects have verified public URLs. Creating fake "Experience Live ↗" buttons would violate the project's content integrity policy (no fabricated claims). The page is created with the correct experience-oriented design, honest status badges, "Request Access" CTAs, and documented content-gap notes for the project owner. The `.lp-live-btn` CSS class is pre-built for future use when verified URLs are provided.

**Owner Action Required**: Provide verified public URLs for projects to be featured on Live Projects. See `docs/PHASE22-IA-REDESIGN-REPORT.md` Content Gaps section.

**Accepted**: Yes.

---


---

## AD-0XX — Phase 20: FAQ Inline onclick Removal

**Phase**: 20  
**Decision**: Remove all inline `onclick="toggleFaq(this)"` attributes from FAQ `<button>` elements. Replace with `data-faq-toggle` attribute. Dispatch via document-level event delegation in `js/global.js`.

**Rationale**: Inline event handler attributes (`onclick=`) are CSP-hostile. Any Content-Security-Policy with `script-src 'self'` (and without `unsafe-inline`) would block inline event handlers. Since Phase 21 will deploy a CSP, the site must be free of inline event handlers before deployment. The fix is minimal and preserves identical functionality.

**Scope**: 10 `<button>` elements across `src/sections/case-studies/faq.html` (6) and `src/sections/contact/faq.html` (4). One additional event listener added to `js/global.js`. Behavior, accessibility, and `aria-expanded` management are unchanged.

**Classification**: S2-01 (Medium severity — CSP-hostile pattern, no immediate exploitability but blocks Phase 21 CSP deployment)

**Accepted**: Yes — Fixed in Phase 20.

---


---

## AD-065 — Phase 21: Documentation-Only Backend Planning (No Implementation)

**Phase**: 21
**Decision**: Phase 21 produces only documentation (`docs/FUTURE-BACKEND-ROADMAP.md`, `docs/FUTURE-DATABASE-SCHEMA.md`, `docs/FUTURE-API-ARCHITECTURE.md`, `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md`, `docs/FUTURE-WORK-ROADMAP.md`) and no backend, CMS, database, or admin code.

**Rationale**: The project owner has not selected a backend framework, database engine, hosting provider, CMS, or authentication model. Building any of these without a selected stack would produce throwaway work and risk inventing fake credentials/endpoints. Documenting the full future architecture now allows any future developer or AI agent to implement consistently once the stack is chosen, without re-deriving requirements from the existing frontend forms.

**Status**: Documentation complete. Backend implementation is intentionally NOT part of Phase 21.

---

## AD-0XX — Phase 19: Missing webkit-backdrop-filter Prefixes

**Phase**: 19  
**Decision**: Add `-webkit-backdrop-filter` prefix to all `backdrop-filter` declarations that were missing it in `css/components.css` and `css/pages/portfolio.css`.

**Rationale**: Safari requires the `-webkit-backdrop-filter` prefix. Without it, floating badge elements, hero chips, case-study card indicators, and solution image overlays would not render the blur effect in Safari. The `header.css` and `footer.css` files already had both prefixes. This fix brings all remaining CSS files into conformance.

**Scope**: 13 declarations across 2 files. No visual change to Chrome/Firefox/Edge behavior.

**Accepted**: Yes.

---

## AD-0XY — Phase 19: Firefox Scrollbar Styling

**Phase**: 19  
**Decision**: Add `scrollbar-width: thin` and `scrollbar-color: var(--color-purple) var(--color-bg)` to the `*` selector in `css/global.css`.

**Rationale**: Firefox does not honor `::-webkit-scrollbar` pseudo-elements. Adding the standardized `scrollbar-width`/`scrollbar-color` properties provides consistent thin purple scrollbar styling in Firefox to match the WebKit scrollbar appearance.

**Scope**: 2 new declarations in 1 file. Zero impact on Chrome/Edge (which continue to use `::-webkit-scrollbar` rules).

**Accepted**: Yes.

---


# Architecture Decisions

> **Phase 1 — Project Architecture & Foundation**
> Created: Phase 1

This document records all significant technical decisions made during Phase 1, the reasoning behind each decision, and the trade-offs involved.

---

## AD-001 — Technology Stack

**Decision**: HTML + CSS + Vanilla JavaScript only. No framework.

**Rationale**:
- The project requirement explicitly prohibits React, Next.js, Vue, Angular, Astro, 11ty, Tailwind, Bootstrap, and large frameworks.
- The website must produce lightweight static HTML pages.
- The current codebase is pure HTML/CSS/JS — introducing a framework would require a complete rewrite with no incremental path.
- Static HTML is optimal for SEO, first-render performance, static hosting, and no-JavaScript resilience.
- All existing functionality (canvas animations, IntersectionObserver, etc.) can be maintained in vanilla JS.

**Trade-offs**:
- No JSX, no templating engine, no reactive UI.
- Component reuse requires a build step (see AD-003) rather than being a language feature.
- Future CMS integration will require either a static site generator or a hybrid approach.

**Accepted**: Yes. This is the correct decision for this project.

---

## AD-002 — No Build Framework (Custom Minimal Build Script)

**Decision**: Use a simple Node.js build script (`scripts/build.js`) rather than webpack, Vite, Parcel, or a static site generator.

**Rationale**:
- No npm dependencies required (uses only Node.js built-in `fs` and `path` modules).
- The build logic is transparent — any developer can read `scripts/build.js` and understand exactly what it does.
- Deterministic output: the same inputs always produce the same outputs.
- No build-time transpilation — the output HTML/CSS/JS is identical to what browsers will execute.
- Avoids version lock-in to a third-party build tool that may change or break.

**Alternative Considered**: 11ty (Eleventy) was considered as a minimal SSG.
- Rejected because: it introduces an npm dependency, requires learning its template syntax, and adds complexity disproportionate to the project's current needs.
- Eleventy can be evaluated in later phases if the build complexity outgrows the custom script.

**Trade-offs**:
- No hot module replacement (HMR) for development.
- No automatic CSS/JS bundling or minification (Phase 16 will add optimization).
- The build script must be updated manually if new pages are added.

---

## AD-003 — HTML Partial Composition Strategy

**Decision**: Shared components (header, footer) are composed into pages at build time by the build script. The final output contains actual HTML — no runtime component injection via JavaScript.

**Rationale**:
- SEO requires the full HTML to be in the server response.
- First render performance requires the header/footer to be present before JavaScript loads.
- Accessibility requires content to be present without JavaScript.
- Runtime component injection (e.g., `fetch('header.html').then(...)`) would degrade all three.

**Build Flow**:
```
src/pages/home.html          (page source template)
    +
components/header.html       (header partial)
    +
components/footer.html       (footer partial)
    ↓
scripts/build.js             (composition)
    ↓
index.html                   (production page — pure static HTML)
```

**Alternative Considered**: JavaScript-injected headers/footers (e.g., `document.getElementById('header').innerHTML = ...`).
- Rejected: breaks SEO, causes layout shift (CLS), fails without JavaScript, inaccessible to screen readers.

---

## AD-004 — Folder-Based URL Structure

**Decision**: Each page lives at `page-name/index.html`, producing clean URLs like `/about` instead of `/about.html`.

**Rationale**:
- Clean URLs are industry standard and better for SEO.
- Folder-based structure is universally supported by all static hosting platforms (Netlify, Vercel, Cloudflare Pages, GitHub Pages) without any configuration.
- No `.html` extension visible in browser URL bar.
- Easy to understand directory layout.

**URL Map**:
```
/                    → index.html
/about               → about/index.html
/capabilities        → capabilities/index.html
/portfolio           → portfolio/index.html
/case-studies        → case-studies/index.html
/contact             → contact/index.html
/kritexa-ai          → kritexa-ai/index.html
/career              → career/index.html
/labs                → labs/index.html
```

**Requirements**: The hosting server must serve `directory/index.html` when the URL is `/directory`. This is the default behavior on all major static hosting platforms. VPS/Nginx/Apache require explicit configuration (see `docs/HOSTING-GUIDE.md`).

---

## AD-005 — Source vs Production Layer Separation

**Decision**: Maintain a `src/pages/` source layer separate from the production output files.

**Source layer** (`src/pages/`):
- Contains page content templates extracted from the legacy `index.html`
- Does not contain the `<html>`, `<head>`, `<body>` wrapper or shared components
- Is the editable source for future phases

**Production layer** (page directories):
- Contains the complete assembled HTML files
- Generated by `scripts/build.js`
- Should never be manually edited (edit `src/pages/` instead)

**Rationale**: Separating source from output prevents accidental direct-editing of generated files, enables component reuse without duplication, and creates a clear mental model for the development workflow.

---

## AD-006 — Legacy SPA Preservation Strategy

**Decision**: Preserve the original monolithic `index.html` at `legacy/index-original.html`. Do not delete it.

**Rationale**:
- Phase 1 must not destroy any existing functionality.
- The original file is the only source of truth for certain base64 images and content.
- It serves as a visual regression reference throughout the migration.
- It contains content that must be carefully migrated, not blindly lost.

**Recovery**: If any content is accidentally lost during migration, `legacy/index-original.html` contains the complete original.

---

## AD-007 — Asset Extraction Strategy

**Decision**: Extract base64-encoded images from `index.html` to external files in `assets/images/` and `assets/logos/`, while leaving the `src/pages/` templates with the base64 data until Phase 16 (Performance Optimization).

**Rationale**:
- Full asset extraction and HTML reference updates are a Phase 16 task.
- Phase 1 must establish the extraction infrastructure and validate it works.
- Prematurely updating all HTML image references would require extensive testing and could break the visual output.
- The `scripts/extract-assets.js` script has extracted all 10 unique images; Phase 16 will update the HTML to reference them.

**Phase 16 Task**: Update all `src="data:image/..."` and `background-image:url("data:image/...")` references to point to the extracted files.

**Assets Extracted in Phase 1**:
```
assets/logos/logo.png           ← 50.5 KB
assets/images/about-hero.jpg    ← 172.3 KB
assets/images/contact-hero.jpg  ← 123.1 KB
assets/images/solution-01.jpg   ← 144.7 KB
assets/images/solution-02.jpg   ← 127.0 KB
assets/images/solution-03.jpg   ← 132.4 KB
assets/images/solution-04.jpg   ← 146.9 KB
assets/images/solution-05.jpg   ← 73.4 KB
assets/images/solution-06.jpg   ← 60.3 KB
assets/images/solution-07.jpg   ← 87.1 KB
```

---

## AD-008 — CSS Architecture

**Decision**: Extract CSS into:
- `css/global.css` — design tokens, reset, base
- `css/utilities.css` — layout, gradient text, section spacing, buttons
- `css/components.css` — full extracted CSS (Phase 2 will properly split this)
- `css/pages/` — page-specific styles (future phases)

**Phase 1 pragmatic note**: `css/components.css` currently contains the complete extracted monolithic CSS. This was intentional — Phase 2 will properly separate it into component files. Attempting a full CSS split in Phase 1 would risk introducing specificity conflicts and visual regressions that would violate the "preserve visual identity" requirement.

**Trade-off**: `css/components.css` is large in Phase 1 but the important thing is that it is now an external cacheable file rather than inline HTML.

---

## AD-009 — JavaScript Architecture

**Decision**: Split JavaScript into:
- `js/global.js` — cursor, navbar scroll, hamburger, scroll reveal, counters, FAQ, social hover, nav collapse
- `js/navigation.js` — legacy SPA `go()` function and page routing (preserved for Phase 1 compatibility)
- `js/animations.js` — canvas animations, countdown, process orbital
- `js/mega-menu.js` — placeholder for Phase 4 Products mega menu
- `js/active-nav.js` — new multi-page architecture active nav detection

**Key Decision**: `js/navigation.js` is kept as a temporary compatibility shim. The `initPage()` function is guarded to only run in SPA context (when `.page` DOM elements exist). This prevents it from breaking the new multi-page pages. The `go()` function remains available for onclick handlers in the extracted page templates until Phases 3+ update them to use real `<a href>` links.

---

## AD-010 — CMS-Readiness Approach

**Decision**: No CMS is implemented in Phase 1. The architecture keeps content and presentation separate enough that future CMS integration is practical.

**CMS-Readiness achieved**:
- Every page has its own HTML file with its own `<title>` and `<meta description>`
- Page content templates (`src/pages/`) are separate from presentation (CSS, components)
- Build system can be extended to pull data from a CMS API instead of static templates
- Content that will eventually come from CMS (portfolio, testimonials, case studies) is clearly identifiable in the extracted templates

**Not done in Phase 1** (intentionally):
- No CMS software installed
- No API created
- No database configured
- No content schema defined (documented in `docs/CMS-READINESS.md`)

---

## AD-011 — Products: No Standalone Page

**Decision**: Products has no dedicated page (`/products/`). Products will be a mega-menu only.

**Rationale**: Per project requirements. Products are features/tools, not a marketing page with separate SEO value in the current scope.

**Implementation**: `components/mega-menu.html` is a Phase 1 placeholder. Phase 4 will implement the full mega menu with categories: Solutions, Tools, APIs, Platforms.

---

## AD-012 — Career and Labs: Footer-Only Pages

**Decision**: `/career` and `/labs` are real pages but are NOT in the primary navigation. They are accessible via footer links only.

**Rationale**: Per project requirements. These pages have dedicated content but are not primary marketing destinations.

**Implementation**: Both pages are generated by the build system. They are accessible at their URLs. They appear in the footer component but not in the navbar center pill.

---

## AD-013 — Clean URL Routing for Static Hosting

**Decision**: Document the server configuration requirements in `docs/HOSTING-GUIDE.md` rather than implementing server-side routing.

**Rationale**: The project is a static site. Routing is handled by the web server configuration, not application code. Different hosting environments require different configurations. The guide covers: Netlify, Vercel, Cloudflare Pages, GitHub Pages, Nginx VPS, and Apache.

**Key insight**: Netlify, Vercel, and Cloudflare Pages all support folder-based URLs (`/about/index.html` served at `/about`) automatically with no configuration. This makes them the recommended hosting choices.

---

## AD-014 — Visual Identity Preservation

**Decision**: Zero intentional visual changes in Phase 1.

**Implementation**:
- CSS is extracted verbatim — not rewritten.
- JavaScript is extracted verbatim — not rewritten.
- All design tokens (colors, typography, spacing) are preserved exactly.
- The BUSINESS canvas animation code is preserved exactly.
- All component HTML is preserved exactly.

**Verification**: The legacy `index.html` serves as the visual regression baseline. Any difference between it and the new `index.html` (generated by build) should be documented.

---

## AD-015 — Centralized Design Token System with Backward Compatibility Aliases

**Decision**: Establish a dedicated design token stylesheet (`css/tokens.css`) containing semantic tokens, and map the existing CSS custom properties (e.g., `--purple`, `--bg2`, `--r2`) as explicit aliases pointing to these new tokens.

**Rationale**:
- Ensures a single, clean, human-readable source of truth for all brand parameters (colors, typography, spacing, radius, z-index, motion, effects).
- Backward compatibility aliases guarantee that all legacy CSS rules in `css/components.css` and existing HTML fragments continue to work flawlessly without breaking layouts or introducing specificity regressions.
- Simplifies visual maintenance: updating a brand token (e.g., `--color-purple`) automatically updates both the new design system primitives and all legacy component shims.

---

## AD-016 — CSS Architecture & Dependency Flow

**Decision**: Organize the CSS architecture as a clean one-way dependency flow: `tokens.css` → `global.css` → `components.css` → `utilities.css`. Eliminate duplicate declarations.

**Rationale**:
- Prevents cascade pollution and style conflicts by loading tokens first, followed by resets/base rules, component structures, and lastly utility overrides.
- Eliminates 300+ lines of duplicate `:root` custom properties, resets, container wrappers, and reveal animation definitions that had been redundantly copied between `css/global.css`, `css/utilities.css`, and `css/components.css`.
- Maintains a cache-friendly footprint, reducing duplicate CSS processing by the browser renderer.

---

## AD-017 — Keyboard Focus & Reduced-Motion Accessibility Foundations

**Decision**: Integrate visual focus visibility and reduced-motion capabilities directly into the global base layer (`css/global.css`).

**Rationale**:
- Accessibility is treated as an architectural foundation rather than a post-launch check.
- Focus visibility (`:focus-visible`) provides a high-contrast visual outline using brand purple/white for keyboard navigators, keeping the layout clean for pointer device clicks.
- The `@media (prefers-reduced-motion: reduce)` media query overrides all CSS durations and delays to zero/instant limits, and safely hides expensive background decorative elements (atmospheric blobs, custom mouse trailing rings) to support visitors with vestibular motion sensitivities.

---

## AD-018 — Decisions Intentionally Deferred (Deferred to Later Phases)

**Decision**: Intentionally defer page-specific component overrides, mega-menu layout architectures, header/footer structure rebuilding, and custom SVG icons extraction.

**Rationale**:
- **Phase 2** is strictly designated as a global design system foundation stage. Modifying header layout structures or rebuilding specific page sections would conflict with Stage 3 (Header Rebuild), Stage 5 (Footer Rebuild), and Stages 6-13 (Individual Page Rebuilds) of `docs/DEVELOPMENT-STAGES.md`.
- Maintains strict scope discipline and avoids visual regression or functional regression during structural separation.

---

## AD-019 — Start Project CTA Temporary Destination

**Decision**: The "Start Project →" header CTA temporarily links to `/contact`.

**Rationale**:
- The final destination for "Start Project" has NOT been decided by the project owner.
- Possible final destinations include: a dedicated project intake form page, a Calendly/Tally embed, or a section within `/contact`.
- Rather than inventing a destination or leaving the button non-functional, `/contact` is used as the closest reasonable temporary target.
- This will be updated in Phase 11 (Contact) or Phase 21 (Pre-Release) when the project flow is finalized.

**Temporary implementation**: `<a class="btn-nav-solid" href="/contact" id="nav-start-project">Start Project →</a>`

**Where to update**: `components/header.html` — the element with `id="nav-start-project"`.

---

## AD-020 — Products Navigation: Button vs Anchor

**Decision**: The Products navigation item uses `<button type="button">` rather than `<a href>`.

**Rationale**:
- Products has no dedicated page (AD-011).
- The element's purpose is to open a mega menu, not navigate to a URL.
- Using `<a href="#">` or `<a href="javascript:void(0)">` for a menu trigger is semantically incorrect.
- A `<button>` element with `aria-expanded` and `aria-haspopup` correctly describes a menu trigger to assistive technologies.
- This is consistent with ARIA best practices for disclosure button patterns.

---

## AD-021 — Active State Dual Mechanism (Build-time + Runtime)

**Decision**: Active navigation state is applied both at build time (via `injectActiveNav()` in `scripts/build.js`) and at runtime (via `js/active-nav.js`).

**Rationale**:
- Build-time injection ensures the correct state is in the HTML served to crawlers, screen readers, and no-JS users.
- Runtime fallback handles edge cases: CDN-cached pages, future SPA-like transitions, or stale build artifacts.
- Both mechanisms write `class="... active"` and `aria-current="page"`. Having both is safe — CSS `.active` and `[aria-current]` selectors are equivalent in `css/header.css`.

---

## AD-022 — Navigation CSS Separation (css/header.css)

**Decision**: All header/navigation CSS is isolated in `css/header.css`, separate from `css/components.css`.

**Rationale**:
- The header is above the fold — its CSS is performance-critical.
- Separating header CSS enables cleaner maintenance: Phase 4 (mega menu) and Phase 14 (responsive) can extend `css/header.css` without touching other CSS.
- CSS load order: `global.css → utilities.css → header.css → components.css`.
- Duplicate navbar declarations removed from `css/components.css`.

---

## AD-023 — Mobile Menu Body Scroll Lock

**Decision**: When the mobile menu opens, `document.body.classList.add('nav-open')` is applied, and `css/header.css` sets `body.nav-open { overflow: hidden }`.

**Rationale**:
- Prevents background page scrolling while mobile menu is open.
- CSS class-based approach is reliable and easy to reverse on close.

---

## AD-024 — Products Mega Menu: No-Link Categories

**Decision**: The four product category headings in the mega menu (Solutions, Tools, APIs, Platforms) are non-navigational visual labels — not `<a href>` links.

**Rationale**:
- No product destination pages exist in Phase 4.
- Using `href="#"` or `href="javascript:void(0)"` would create broken/fake navigation that fails keyboard users, screen readers, and crawler expectations.
- A "Coming Soon" badge communicates intent without pretending functionality exists.
- When actual product pages are created, the category labels will be replaced with real `<a href="/products/solutions">` (or similar) links.

**Future work**: Connect actual product URLs in the phase that creates the product pages.

---

## AD-025 — Mega Menu Visibility Technique (opacity + visibility, not display toggle)

**Decision**: The mega menu uses `opacity + transform + visibility` transitions rather than `display: none` / `display: block` toggling.

**Rationale**:
- `display: none` cannot be animated — it snaps instantly, making smooth enter/exit impossible.
- `visibility: hidden` (with a close-delay) keeps the element out of the tab order while the exit animation plays.
- `pointer-events: none` prevents mouse interaction during the hidden state.
- This pattern is standard for accessible animated disclosure panels.

**Implementation**:
```css
/* Closed */
.products-mega-menu {
  opacity: 0;
  transform: translateY(-6px);
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.22s ease, transform 0.22s ease, visibility 0s linear 0.22s;
}
/* Open */
.products-mega-menu.open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
  transition: opacity 0.22s ease, transform 0.22s ease, visibility 0s linear 0s;
}
```

---

## AD-026 — Legal Pages Deferred

**Decision**: Legal link pages (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`) are NOT created in Phase 5.

**Rationale**:
- Phase 5 scope is limited to the footer component implementation.
- Creating legal page content (Privacy Policy, Terms of Service, Cookie Policy) requires legal review, drafting, and approval — out of scope for a component build phase.
- Pointing footer links to non-existent pages (resulting in 404s) is worse than showing non-clickable placeholders.
- The footer uses `<span class="f-link-pending">` with `title="Coming in a future release"` as the placeholder treatment.

**Future work**:
- Create `/privacy-policy/index.html`, `/terms-of-service/index.html`, `/cookie-policy/index.html` in Phase 21 (Pre-Release).
- Add these pages to `scripts/build.js` page definitions.
- Replace `<span class="f-link-pending">` with `<a href="/...">` anchors in `components/footer.html`.

**Status**: Documented placeholder in `components/footer.html`. Visual indicator is clear and accessible.

---

## AD-027 — Footer Newsletter Form: No JavaScript

**Decision**: The footer newsletter form uses a standard HTML `<form action="#" method="post">` with no `onclick` JavaScript handler.

**Rationale**:
- The original footer used `onclick="alert('Subscribed! 🚀')"` which is broken behavior — it produces a false success message without actually subscribing anyone.
- Phase 5 replaces this with a proper `<form>` element. The form action is `#` (a placeholder) until the real email service endpoint is configured.
- Wiring to a real email service (Mailchimp, ConvertKit, etc.) is Phase 21 work.
- A standard `<form>` is semantically correct, accessible, and works without JavaScript.

**Status**: Placeholder form in `components/footer.html`. Real endpoint to be connected in Phase 21.

---

## AD-028 — Footer CSS: Dedicated css/footer.css

**Decision**: Footer styles live in `css/footer.css`, loaded between `header.css` and `components.css`.

**Rationale**:
- Maintains the pattern established in Phase 3 (header.css) of giving shared global components their own stylesheet.
- The footer styles were previously in `css/components.css` — a large file mixing component types.
- A dedicated `css/footer.css` makes footer-specific maintenance clear and non-invasive.
- The legacy block in `css/components.css` is preserved as a safety fallback; `footer.css` loads first and takes precedence for all footer classes.

**CSS Load Order**:
```
global.css → utilities.css → header.css → footer.css → components.css
```

---

## AD-029 — Home Section Partial Architecture

**Decision**: Home page content is decomposed into 8 section partials in `src/sections/home/`. The build system inlines them at compile time via `{{SECTION:home/section-name}}` tokens.

**Rationale**:
- Avoids a single enormous `src/pages/home.html` containing thousands of lines.
- Each section is independently understandable and editable.
- Compile-time inlining means no runtime JS injection — the HTML is fully static and SEO-friendly.
- The same `{{SECTION:*}}` mechanism can be extended to future pages.

**Accepted**: Yes.

---

## AD-030 — Home JS Isolation: js/pages/home.js vs js/animations.js

**Decision**: Home-specific canvas and process animations moved to `js/pages/home.js`. `js/animations.js` remains loaded on all pages.

**Rationale**:
- `js/animations.js` contains the Kritexa.AI countdown timer needed by the `/kritexa-ai` page — it must remain a global script.
- Home page canvas and orbital animations run in `js/pages/home.js` which loads after global scripts.
- The BUSINESS canvas code in `js/animations.js` will still fire on the home page (it finds `jkCanvas`). Both versions run — effectively a duplication.
- This is acceptable for Phase 6 (functionality preserved, no regression).

**Phase 15 Resolution**: The deferred guard has been implemented.
- `scripts/build.js` now injects `data-page="${page.id}"` on `<body>` for every page.
- `js/animations.js` BUSINESS canvas IIFE checks `document.body.getAttribute('data-page') === 'home'` and returns immediately on the home page.
- `js/animations.js` countdown IIFE checks for `#kaiDays` element existence — only runs on `/kritexa-ai` page.
- `js/animations.js` process IIFE checks for `.proc-c` elements + `data-page="home"` — exits on all non-home pages.
- Double RAF loop eliminated. See `docs/PHASE15-JS-ANIMATION-REPORT.md`.

---

## AD-031 — Home H1: Visually-Hidden sr-only Pattern

**Decision**: The Home hero uses a visually-hidden `<h1 class="jk-sr-h1">` while the visual "BUSINESS" text is rendered on a `<canvas>` element with `aria-hidden="true"`.

**Rationale**:
- The canvas-rendered "BUSINESS" text is part of the approved visual identity — changing it to HTML text would alter the design.
- Screen readers and SEO require a real H1 in the HTML.
- The `.jk-sr-h1` uses the standard sr-only CSS pattern (position: absolute; width: 1px; height: 1px; clip) — it is in the DOM and readable by screen readers and search engines, but invisible to sighted users.
- The `<section aria-labelledby="home-h1">` connects the section label to the H1.
- This satisfies the exactly-one-H1 requirement without altering the visual design.

**Accepted**: Yes. Documented for Phase 17 SEO review.

---

## AD-032 — About Section Partial Architecture

**Context**: Phase 7 rebuilds the About page from the Phase 1 extracted monolith.

**Decision**: Mirror the Phase 6 home section pattern exactly. About content is split into 3 section partials in `src/sections/about/`:
- `hero.html` — full-screen rounded hero
- `mission-vision.html` — mission + vision card grid
- `values.html` — values section with 6 cards

`src/pages/about.html` uses `{{SECTION:about/*}}` syntax composed by `scripts/build.js`.

**Rationale**: Consistent with AD-029 (home section partials). Maintainability at logical section boundaries. No over-componentization (no separate files for individual cards).

**Accepted**: Yes.

---

## AD-033 — About Hero Background Image: CSS Override Strategy

**Context**: The legacy `css/components.css` contains a large base64 JPEG blob (~600 KB encoded) directly in the `.about-fs-hero-bg` CSS rule. The extracted asset exists at `/assets/images/about-hero.jpg` (172.3 KB, extracted in Phase 1).

**Decision**: Rather than modifying `css/components.css` (which would require careful surgery and regression-test), `css/pages/about.css` (loaded after `components.css`) overrides with:
```css
.about-fs-hero-bg {
  background-image: url('/assets/images/about-hero.jpg') !important;
}
```

**Rationale**: The `!important` is necessary because the base64 value in `components.css` is a direct property value (not set via shorthand), and both rules have the same specificity. The override is justified, localized to the About page, and will be resolved permanently in Phase 16 (Performance Optimization) when the base64 blob is removed from `components.css`.

**Accepted**: Yes. Phase 16 follow-up: remove the base64 blob from `css/components.css`.

---

## AD-034 — About H1 Strategy: Visible HTML Text

**Context**: Phase 7 must have exactly one H1 per page requirement.

**Decision**: The About H1 is a real, visible HTML text element:
```html
<h1>We Think in<br><span class="grad-text">Systems,<br>Not Pages</span></h1>
```

**Rationale**: Unlike the Home page where the visual "BUSINESS" text is canvas-rendered (requiring the AD-031 sr-only workaround), the About hero uses standard HTML typography. No canvas rendering, no sr-only pattern needed. The `.grad-text` span clips a gradient to the text visually — the semantic content is still readable by screen readers.

**Accepted**: Yes.

---

## AD-035 — Capabilities Section Partial Architecture

**Context**: Phase 8 rebuilds the Capabilities page following the established pattern from Phase 6 (Home) and Phase 7 (About).

**Decision**: Four partials: `hero.html`, `services.html`, `who-we-serve.html`, `industry-solutions.html` in `src/sections/capabilities/`.

**Rationale**: Each section is independently maintainable. The build system inlines them at compile time. No runtime HTML injection.

---

## AD-036 — Capabilities Card-as-Link Pattern

**Context**: Legacy capability service cards used `<div onclick="go('contact')">`. This required JavaScript and was inaccessible.

**Decision**: All capability service cards are `<a href="/contact">` elements (card-as-link pattern).

**Rationale**: Cards are conversion CTAs pointing to one destination (`/contact`). Full-card anchors improve touch usability and remove JavaScript dependency. `role="list"` / `role="listitem"` on card grids preserves semantic list structure.

---

## AD-037 — Industry Solution Heading Level (H2)

**Context**: The 8 industry solution rows need headings. The choice was H2 vs H3.

**Decision**: Use `<h2>` for each of the 8 industry solution headings.

**Rationale**: Each industry solution is a major page section. Using H2 correctly represents the structure: H1 → multiple H2 topic areas → H3 for card titles within those areas. Skipping to H3 would misrepresent the content hierarchy.

---

## AD-038 — Solution Image Loading Strategy

**Context**: 8 solution images, first one potentially visible above the fold.

**Decision**: `solution-01` is NOT lazy-loaded. Solutions 02–08 use `loading="lazy"`. All have `width="600" height="450"`.

**Rationale**: Lazy-loading the first industry solution image would delay LCP unnecessarily. Width/height attributes help the browser reserve space and reduce CLS.

---

## AD-039 — Portfolio Section Partial Architecture

**Phase**: 9
**Decision**: Portfolio page uses 4 section partials in `src/sections/portfolio/`: `hero.html`, `filters.html`, `projects.html`, `cta.html`. This mirrors the Phase 6/7/8 pattern.
**Rationale**: Consistent with all rebuilt pages. Sections are independently editable. Future CMS migration can replace individual sections.

---

## AD-040 — Portfolio Filter: Event Delegation vs Inline onclick

**Phase**: 9
**Decision**: Filter buttons use `data-filter-type` and `data-filter-value` HTML attributes. Filter logic uses event delegation on the parent container groups via `portfolio.js`. No inline `onclick` attributes.
**Rationale**: Inline `onclick` in HTML violates separation of concerns. Event delegation is more maintainable. `data-*` attributes are semantically appropriate for configuration. `aria-pressed` is managed by JS, not hardcoded after first interaction.

---

## AD-041 — Portfolio CTA Text: "Start a Similar Project"

**Phase**: 9
**Decision**: Changed CTA text from "View Project" to "Start a Similar Project" on all 12 portfolio cards.
**Rationale**: The legacy CTA said "View Project" but there are no individual project pages to view. Changing to "Start a Similar Project" → `/contact` is accurate and sets correct user expectations. This is a content improvement within the scope of Phase 9.

---

## AD-042 — Portfolio Placeholder Image Strategy

**Phase**: 9
**Decision**: All 12 portfolio cards use `portfolio-placeholder.jpg` (the single image extracted from the legacy source). Image dimensions `width="600" height="400"` declared to prevent CLS.
**Rationale**: The legacy source used one identical base64 JPEG for all 12 cards — confirmed by code inspection. This is a placeholder pattern. Individual project screenshots are future work requiring real client asset approval. The single placeholder is better than embedding 12 copies of the same base64 blob.

---

## AD-043 — Build System: page.js Array Support

**Phase**: 9
**Decision**: Extended `scripts/build.js` `buildPageWrapper()` with an optional `pageJs` parameter (array of paths) that injects page-specific `<script>` tags after `active-nav.js`. Mirrors the existing `page.css` pattern.
**Rationale**: The Portfolio page requires `js/pages/portfolio.js` for filter functionality. Rather than hard-coding portfolio.js into the page wrapper or the page template, the `page.js` array cleanly declares page-specific scripts in the page definition object. All future pages can use the same mechanism.

---

## AD-044 — Case Studies Section Partial Architecture

**Decision**: Case Studies page uses 5 section partials (hero, featured, studies, faq, cta).

**Context**: Same pattern established in Phase 9 (portfolio). Logical section boundaries: hero with stats, featured showcase, card grid with filter nav, FAQ, CTA.

**Rationale**: 5 sections map cleanly to the 5 distinct content areas found in the legacy source. The filter navigation is part of the studies section (not a standalone partial) because it is tightly coupled to the card grid and has no filtering behavior in Phase 10.

---

## AD-045 — Case Studies Cards: Non-Linked Preview Pattern

**Decision**: Case study cards do not link to individual detail pages. The `→` arrow is a decorative `<div>`, not an `<a>` element.

**Context**: No approved individual case study detail pages exist. Phase 10 instruction explicitly states: "Do not create fake /case-studies/project-name routes."

**Rationale**: A non-linked preview is better than a link to a non-existent page. The card content communicates the case study without requiring a detail page. When detail pages are created in a future phase, cards will be upgraded to `<a>` links.

---

## AD-046 — Case Studies FAQ: Global JS Handler

**Decision**: FAQ accordion is managed by `js/global.js` `toggleFaq()`. No `js/pages/case-studies.js` created.

**Context**: The `toggleFaq()` function already exists in `js/global.js`. The Case Studies page needs the same FAQ behavior as defined in the global script.

**Rationale**: Creating a page-specific JS file solely to duplicate global FAQ logic would be unnecessary overhead. The global handler is sufficient. This maintains the ZERO page-specific JS goal.

---

## AD-047 — Case Studies Filter Buttons: Visual Only in Phase 10

**Decision**: Filter buttons in the studies section use `aria-pressed` for semantic markup but have no JS filtering behavior in Phase 10.

**Context**: The legacy case-studies source contained visual filter buttons with inline styles but NO filtering logic (no event handlers, no data attributes). The Portfolio page (Phase 9) has real filtering. Case Studies filtering would require JS categorization of case study cards.

**Rationale**: Phase 10 is explicitly for the listing/index page rebuild. Filter behavior can be added in a future phase if required. The `aria-pressed` attributes provide correct semantics for the current visual state. Native buttons allow keyboard activation even without filtering logic.

---

## AD-048 — Contact Section Partial Architecture

**Phase**: 11
**Decision**: Contact page uses 4 section partials in `src/sections/contact/`: `hero.html`, `contact-form.html`, `faq.html`, `cta.html`.
**Rationale**: Consistent with the pattern established by Phase 6–10. Section names reflect function, not layout positions. `contact-form.html` contains both the contact options (left) and the project form (right) as they are tightly coupled in a two-column grid.

---

## AD-049 — Contact Form: No Backend, Honest UX

**Phase**: 11
**Decision**: The form uses `<form action="#" method="post" novalidate>` and `<button type="submit">`. No backend is connected. A visible `.contact-form-notice` warns users the form is not yet connected. No fake success message.

**Rationale**: The legacy used `onclick="submitForm()"` → `alert("Thanks NAME! We'll contact you within 24 hours.")`. This was misleading — it gave a false success signal with zero actual data transmission. Phase 11 removes the fake UX and replaces with an honest notice. The real backend will be connected in Phase 21. Native form semantics are preserved for future `action=""` endpoint wiring.

**Status**: Form inactive. Phase 21 will connect the real backend.

---

## AD-050 — Contact Hero Image: CSS Specificity Override

**Phase**: 11
**Decision**: Same pattern as AD-033 (About hero image). `css/pages/contact.css` overrides `.contact-hero-section .con-hero-bg { background-image: url('/assets/images/contact-hero.jpg') }`. The base64 blob in `css/components.css` is NOT removed in Phase 11.

**Rationale**: The `.contact-hero-section` wrapper provides adequate specificity to override the base64 value in `components.css` without `!important`. The component-scoped selector (`.contact-hero-section .con-hero-bg`) is more specific than `.con-hero-bg` alone. Phase 16 will permanently remove the base64 blob from `components.css`.

---

## AD-051 — Contact Form: Zero Page-Specific JavaScript

**Phase**: 11
**Decision**: No `js/pages/contact.js` created. FAQ uses `toggleFaq()` from `js/global.js`. Form uses native HTML `type="submit"` — no JS submit handler.

**Rationale**: The old `submitForm()` was a JavaScript function that produced a fake alert. Removing it and using a native form eliminates the JS dependency entirely. Native form behavior (focus management, accessibility, keyboard) is handled by the browser. The ZERO JS goal is maintained.

---

## AD-052 — Kritexa.AI Section Partial Architecture

**Phase**: 12
**Decision**: 4 section partials: `hero.html`, `features.html`, `stats.html`, `cta.html`

**Rationale**: Mirrors the established Phase 6–11 pattern. Sections correspond to distinct content zones from the approved legacy source. No section was created without approved source content supporting it. The legacy page had: hero, features ("What's Coming"), stats strip, CTA — these map directly to the 4 partials.

---

## AD-053 — Kritexa.AI Waitlist Form: No Backend / Honest UX

**Phase**: 12
**Decision**: Replaced `onclick="kaiJoin()"` (fake alert) with `<form action="#">`. No backend connected. An honest disclaimer paragraph (`kai-wl-disclaimer`) is shown below the submit button.

**Rationale**: The old implementation used a JavaScript function that produced a fake success message via `alert()`. This creates false expectation of real functionality. The new implementation uses a native HTML form with no submit handler. A transparent notice tells users the waitlist is not connected yet. Phase 21 will wire a real endpoint.

**Trade-offs**: Users who submit get no feedback. The honest notice mitigates this. Alternative was to suppress the form entirely — rejected because preserving the waitlist UX from the approved source was required.

---

## AD-054 — Kritexa.AI: Zero Page-Specific JavaScript

**Phase**: 12
**Decision**: No `js/pages/kritexa-ai.js` created. Countdown timer driven by existing `js/animations.js` IIFE.

**Rationale**: The countdown IIFE in `js/animations.js` targets `#kaiDays`, `#kaiHrs`, `#kaiMins`, `#kaiSecs` — these IDs are present in the new hero section. No modification to `animations.js` was required. Zero additional JS cost on the Kritexa.AI page. ZERO page-specific JS goal maintained.

---

## AD-055 — Kritexa.AI Progress Bars: role="meter" Semantics

**Phase**: 12
**Decision**: Added `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` to each `.kai-feat-prog` container.

**Rationale**: Progress bars represent quantitative values (development completion %). The ARIA `meter` role communicates this to assistive technology regardless of whether the CSS fill animation runs. This is correct semantic usage per ARIA spec (meter = scalar value within a known range).

---

## AD-056 — Kritexa.AI Feature Tags: Semantic List Markup

**Phase**: 12
**Decision**: Changed feature tags from `<div class="kai-feat-tags"><span class="kai-ftag">...</span></div>` (legacy) to `<ul class="kai-feat-tags" aria-label="..."><li class="kai-ftag">...</li></ul>`.

**Rationale**: Feature tags represent a list of capabilities/attributes. Using `<ul>/<li>` communicates list semantics to screen readers ("list, X items"). The visual presentation (flex wrap with gap) is unchanged — `<ul>/<li>` renders identically to `<div>/<span>` with the CSS already applied.

---

## History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | Phase 1 | AI Engineering Assistant | Initial decisions |
| 1.1 | Phase 2 | AI Engineering Assistant (Bob) | Design tokens, CSS architecture, accessibility foundations, deferred decisions |
| 1.2 | Phase 3 | AI Engineering Assistant (Bob) | Header rebuild: AD-019 (Start Project temp), AD-020 (Products button), AD-021 (active state dual mechanism), AD-022 (header.css), AD-023 (scroll lock) |
| 1.3 | Phase 4 | AI Engineering Assistant (Bob) | Products mega menu: AD-024 (no-link categories), AD-025 (opacity+visibility animation) |
| 1.4 | Phase 5 | AI Engineering Assistant (Bob) | Footer rebuild: AD-026 (legal pages deferred), AD-027 (newsletter form no-JS), AD-028 (footer.css dedicated stylesheet) |
| 1.5 | Phase 6 | AI Engineering Assistant (Bob) | Home rebuild: AD-029 (section partials), AD-030 (home JS isolation), AD-031 (sr-only H1) |
| 1.6 | Phase 7 | AI Engineering Assistant (Bob) | About rebuild: AD-032 (about section partials), AD-033 (hero bg image override), AD-034 (visible HTML H1) |
| 1.7 | Phase 8 | AI Engineering Assistant (Bob) | Capabilities rebuild: AD-035 (section partials), AD-036 (card-as-link), AD-037 (H2 industry headings), AD-038 (image loading strategy) |
| 1.8 | Phase 9 | AI Engineering Assistant (Bob) | Portfolio rebuild: AD-039 (section partials), AD-040 (filter event delegation), AD-041 (CTA text), AD-042 (placeholder image), AD-043 (build.js js array) |
| 1.9 | Phase 10 | AI Engineering Assistant (Bob) | Case Studies rebuild: AD-044 (section partials), AD-045 (non-linked preview), AD-046 (global FAQ handler), AD-047 (visual-only filters) |
| 2.0 | Phase 11 | AI Engineering Assistant (Bob) | Contact rebuild: AD-048 (section partials), AD-049 (form no backend / honest UX), AD-050 (hero image CSS override), AD-051 (zero page JS) |
| 2.1 | Phase 12 | AI Engineering Assistant (Bob) | Kritexa.AI rebuild: AD-052 (section partials), AD-053 (waitlist no backend / honest UX), AD-054 (zero page JS), AD-055 (progress bar meter role), AD-056 (feature tags list semantics) |
| 2.2 | Phase 16 | AI Engineering Assistant (Bob) | Performance: AD-057 (base64 removal), AD-058 (preload hints), AD-059 (WebP deferred), AD-060 (Google Fonts @import removal) |

---

## AD-057 — Base64 JPEG Removal from components.css

**Phase**: 16
**Decision**: Remove the JPEG base64 blobs from `.about-fs-hero-bg` and `.con-hero-bg` in `css/components.css` and replace with external image URL references.

**Rationale**:
- Both blobs were never used by most pages (7/9 pages don't use either selector) but were parsed by the browser CSS engine on every page load.
- `css/pages/about.css` was already overriding `.about-fs-hero-bg` with the correct external URL (`!important`).
- `css/pages/contact.css` was already overriding `.con-hero-bg` with the scoped rule `.contact-hero-section .con-hero-bg`.
- The base64 blobs were therefore pure waste — downloaded, parsed, and immediately overridden.
- Combined removal: 513 KB → 120 KB for `components.css` (-393 KB, -77%).

**Safety checks completed**:
1. Confirmed both external image files exist at `assets/images/about-hero.jpg` and `assets/images/contact-hero.jpg`.
2. Confirmed both selector contexts remain intact (only `background-image` property changed).
3. Rebuilt all 9 pages — ZERO regressions.
4. `css/pages/about.css` `!important` removed (no longer needed).

**Accepted**: Yes.

---

## AD-058 — preload Hints Only for CSS Background Image LCP Candidates

**Phase**: 16
**Decision**: Add `<link rel="preload" as="image">` hints only for hero images that are used as CSS `background-image`, not for `<img>` elements.

**Rationale**:
- `<img>` elements are discovered by the browser's preload scanner during HTML parsing. No explicit preload is needed.
- CSS `background-image` declarations are only discovered when the browser parses the CSS file that contains them. Since `components.css` is loaded last (after global/utilities/header/footer), the hero images on About and Contact pages have a significant discovery delay.
- A `<link rel="preload">` in `<head>` allows the browser to start fetching the image immediately during HTML parse, before CSS is parsed.
- Pages affected: About (`about-hero.jpg`) and Contact (`contact-hero.jpg`).
- Pages not affected: Home (no raster LCP), Capabilities (LCP is `<img>` tag), Portfolio (LCP is `<img>` tag), all text-LCP pages.

**Accepted**: Yes.

---

## AD-059 — WebP/AVIF Conversion Deferred

**Phase**: 16
**Decision**: Do NOT convert JPEG images to WebP/AVIF during Phase 16.

**Rationale**:
- Phase 16 rules explicitly state: "Do not convert every image to WebP/AVIF blindly. Verify compatibility, dimensions, quality, and actual usage first."
- The 12 production images (solution-01 through solution-08, about-hero, contact-hero, portfolio-placeholder, logo) were extracted from the legacy source and have not been independently audited for quality. Lossy conversion without visual inspection risks introducing artifacts.
- WebP is widely supported (>95% of browsers) but a `<picture>` fallback pattern should be used for production.
- The implementation requires adding `<picture><source type="image/webp">` wrappers to 8 `<img>` elements across 2 pages, plus regenerating image assets with verified quality settings.
- ESTIMATED benefit: 30–50% reduction in image payload (~360–600 KB savings from the ~1.2 MB solution image set).

**Deferred to**: Post-Phase 16. Should be performed with visual diff tooling and a defined quality threshold (e.g., WebP at 82% quality compared against original).

**Accepted**: Yes (deferred).

---

## AD-060 — Google Fonts @import Removed from global.css

**Phase**: 16
**Decision**: Remove `@import url('https://fonts.googleapis.com/...')` from `css/global.css`.

**Rationale**:
- The same Google Fonts stylesheet was already loaded via a `<link>` tag in the `<head>` of every page (emitted by `scripts/build.js`).
- CSS `@import` creates a sequential dependency: the browser must parse `global.css`, encounter the `@import`, then start a second fetch for the Google Fonts CSS — this is slower than a `<link>` tag which is fetched in parallel during HTML parsing.
- The `<link>` tag in `<head>` is preferable to `@import` for external stylesheets.
- Removal of the `@import` eliminates one redundant CSS network request per page.

**Accepted**: Yes.



---

## AD-061 — SEO: LocalBusiness Schema Deferred

**Phase**: 17  
**Decision**: Do not implement `LocalBusiness` structured data schema.

**Rationale**:
- The legacy source contains an address (Rajiv Gandhi IT Park, Hinjewadi Phase I, Pune – 411057).
- This address has not been independently verified by the client.
- Emitting false address data in structured schema is worse than omitting it — it can negatively affect Knowledge Panel and local search signals.
- The address was previously flagged in `docs/CONTENT-MAP.md` as requiring client verification.

**When to implement**: Client provides verified business address, telephone, and opening hours. Then `LocalBusiness` schema can be added to the Home page.

**Accepted**: Yes (deferred pending client verification).

---

## AD-062 — SEO: AggregateRating Schema Not Implemented

**Phase**: 17  
**Decision**: Do not implement `AggregateRating` or `Review` structured data.

**Rationale**:
- The Contact page hero displays "5.0★ Client Rating" — this is a marketing claim from the approved legacy source, not verifiable structured review data.
- Google's guidelines require `AggregateRating` to reference real, verifiable reviews.
- Adding fake `AggregateRating` schema risks a manual action from Google.

**When to implement**: Only after genuine, verifiable reviews exist (e.g., Google Business Profile reviews, Clutch, Trustpilot with real entries).

**Accepted**: Yes.

---

## AD-063 — SEO: OG Image Strategy — Logo as Fallback

**Phase**: 17  
**Decision**: Use `/assets/logos/logo.png` as OG image fallback for pages with no suitable existing raster image (Home, Case Studies, Kritexa.AI, Career, Labs).

**Rationale**:
- OG images cannot be invented — must use existing approved assets.
- 5 pages have no suitable full-bleed raster hero image.
- Logo is the safest factual fallback for social sharing previews.
- `og:image:width` and `og:image:height` are set to 1200×630 as aspirational hints; these will be accurate once dedicated OG assets are created.

**Accepted**: Yes (temporary pending Phase 21 OG asset creation).

---

## AD-064 — SEO: robots.txt + sitemap.xml at Project Root

**Phase**: 17  
**Decision**: `robots.txt` and `sitemap.xml` are authored and maintained at the project root. They are not generated from templates or copied by the build system.

**Rationale**:
- For static hosting, the project root IS the webserver root. Files at the project root are served at `/`.
- The build system verifies these files exist and logs their size — no copy step needed.
- Authoring them as static files keeps them simple and easily auditable.

**Accepted**: Yes.

