## Phase 22 — Solutions / Live Projects IA & Structural Redesign
**Status**: COMPLETE

### Scope

Full information architecture redesign. New pages, navigation restructure, content redistribution.

### Pages Created

- `src/pages/industry-solutions.html` → `/industry-solutions` — Industry Solutions page (8 industry-solution rows, who-we-serve grid).
- `src/pages/live-projects.html` → `/live-projects` — Live Projects page (experience-oriented, honest status).

### Pages Redesigned

- **Capabilities** — Engineering/technology focus. Industry content moved to Industry Solutions.
- **Portfolio** — Cross-links added (Case Studies, Live Projects).
- **Case Studies** — Cross-links added (Portfolio, Industry Solutions).

### Navigation Redesign

- Desktop: Solutions ▼ dropdown (4 items). Live Projects as top-level link.
- Products mega menu: "Solutions" → "Offerings" (naming collision fix).
- Mobile: Solutions accordion, Live Projects link.
- Footer: Solutions column group, Live Projects in Main Pages.

### Build Result

11/11 pages — no errors.

### Content Integrity

- No fabricated live URLs.
- No invented clients, metrics, technologies.
- All 12 portfolio projects honestly marked "Coming Soon" on Live Projects page.
- Content gaps documented for owner action.

---


## Phase 21 — Backend, Database, CMS & Business Platform Documentation
**Status**: COMPLETE

### Scope

Documentation-only phase. **Backend implementation is intentionally NOT part of Phase 21.**

Full repository inspected: `src/`, `components/`, `css/`, `js/`, `assets/`, `scripts/`, `docs/`, `legacy/`, `package.json`, all 9 production pages, all existing forms (Contact, Footer Newsletter, Kritexa.AI Waitlist, Career resume link), navigation, SEO, security, accessibility, and performance documentation from Phases 1–20.

### Documents Created

- `docs/FUTURE-BACKEND-ROADMAP.md` — objective, non-goals, lead management, contact form API contract, career/job system, resume/file storage, newsletter, waitlist, admin dashboard, authentication/roles.
- `docs/FUTURE-DATABASE-SCHEMA.md` — proposed entities (users, admin_roles, leads, lead_notes, lead_activities, jobs, applications, files, subscribers, waitlist_entries, notifications, audit_logs) + potential CMS entities.
- `docs/FUTURE-API-ARCHITECTURE.md` — conceptual endpoint list (all marked PLANNED — NOT IMPLEMENTED), auth, validation, authorization, rate limiting, error handling, versioning, logging, CORS, CSRF.
- `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md` — conceptual hosting/deployment component map. Hosting provider NOT selected.
- `docs/FUTURE-WORK-ROADMAP.md` — master pending-work document: current status, what needs to be built, what should not be built yet, dependencies, owner decisions, implementation order, security/data/deployment requirements, pre-/post-launch checklists.
- `docs/PHASE21-DOCUMENTATION-REPORT.md` — final Phase 21 report.

### Explicit Non-Goals (Verified Not Done)

No backend framework installed. No CMS installed. No database created. No authentication implemented. No admin dashboard built. No external API/email/payment service connected. No production hosting configured. No credentials, API keys, phone numbers, email endpoints, or database URLs invented.

### Safe Frontend Preparation

No frontend behavior changed. Form field names/IDs, "not connected" messaging, and existing honest UX (Contact form notice, Kritexa.AI waitlist disclaimer, footer newsletter placeholder) were verified as already stable and honest from Phases 5/11/12 — no changes required.

### Build Result

9/9 pages — no errors — no warnings (verified via `npm run build`).

### Documentation Updated

`docs/DEVELOPMENT-STAGES.md`, `docs/CHANGELOG.md`, `docs/ARCHITECTURE-DECISIONS.md`, `docs/CURRENT-ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/PERFORMANCE.md`, `docs/ACCESSIBILITY.md`, `docs/NAVIGATION.md`.

---

## Phase 20 — Final Security & Technical QA
**Status**: COMPLETE

### Security Audit Scope

Complete static security audit across all 9 production pages and all JavaScript source files.

### Findings Summary

| Severity | Count | Outcome |
|----------|-------|---------|
| S0 Critical | 0 | — |
| S1 High | 0 | — |
| S2 Medium | 1 | FIXED |
| S3 Low | 3 | Documented |
| INFO | 4 | Documented |
| DEFERRED | 17 | Phase 21 |

### Fix Applied

**S2-01:** Inline `onclick="toggleFaq(this)"` handlers on 10 FAQ buttons across case-studies and contact pages. Replaced with `data-faq-toggle` attribute and event delegation in `js/global.js`.

### Regressions Verified

- Phase 17 SEO: PASS
- Phase 18 Accessibility: PASS (aria-expanded / toggleFaq behavior preserved)
- Phase 19 Compatibility: PASS
- Phase 16 Performance: PASS

### Deferred to Phase 21

- All security response headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP, X-Frame-Options)
- HTTPS/TLS certificate and deployment
- Form backend with CSRF and rate limiting
- WhatsApp number configuration
- MIME type server configuration
- Cookie consent (if analytics added)
- Safari cross-browser final verification

### Build Result

9/9 pages — no errors — no warnings

---


## Phase 19 — Cross-Browser & Compatibility QA
**Status**: COMPLETE

### Browsers Tested
- Google Chrome 151.0.7922.173 (Chromium/Blink 151) — Linux Mint 22.3
- Mozilla Firefox 154.0 (Gecko 154) — Linux Mint 22.3
- Microsoft Edge 151.0.4129.101 (Chromium/Blink 151) — Linux Mint 22.3
- Safari — NOT AVAILABLE (Linux test environment)

### Fixes Applied
- Added `-webkit-backdrop-filter` prefix to 13 locations across `css/components.css` and `css/pages/portfolio.css`
- Added Firefox `scrollbar-width`/`scrollbar-color` to `css/global.css`
- Corrected vendor-prefix order in one `backdrop-filter` pair

### Deferred
- Safari runtime testing — browser unavailable on Linux
- iOS touch device testing — device unavailable
- Firefox `backdrop-filter` transition animation (B3, expected browser behavior)

### Build Result
9/9 pages — no errors

---


# Development Stages

Agreed development roadmap for the Kritexa Labs website rebuild.

---

## Stage Overview

```
Phase 0  — Audit & Documentation                           ✅ Complete
Phase 1  — Project Architecture                            ✅ Complete
Phase 2  — Global Design System                            ✅ Complete
Phase 3  — Header & Navigation                             ✅ Complete
Phase 4  — Products Mega Menu                              ✅ Complete
Phase 5  — Global Footer                                   ✅ Complete
Phase 6  — Home                                            ✅ Complete
Phase 7  — About                                           ✅ Complete
Phase 8  — Capabilities                                    ✅ Complete
Phase 9  — Portfolio                                       ✅ Complete
Phase 10 — Case Studies                                    ✅ Complete
Phase 11 — Contact                                         ✅ Complete
Phase 12 — Kritexa.AI                                      ✅ Complete
Phase 13 — Career & Labs                                   ✅ Complete
Phase 14 — Real Browser, Responsive & Visual QA            ✅ Complete
Phase 15 — JS & Animation Engineering                      ✅ Complete
Phase 16 — Performance Engineering & Core Web Vitals       ✅ Complete
Phase 17 — Advanced SEO, Indexing & Structured Data        ✅ Complete
Phase 18 — Accessibility Engineering & WCAG 2.2 AA Audit      ✅ Complete
Phase 19 — Cross-Browser / Compatibility QA
Phase 20 — Final Security & Technical QA
Phase 21 — Production Configuration & Launch Prep
Phase 22 — Launch
```

---

## Phase Descriptions

### Phase 0 — Audit & Documentation
**Status**: ✅ Complete
Full inspection of existing codebase. Documentation of current architecture, design system, navigation, components, animations, responsive behavior, performance, SEO, accessibility, assets, dependencies, and content.
**Output**: `docs/` directory with 18 documentation files.
**Rule**: No production code was modified.

---

### Phase 1 — Project Architecture
**Status**: ✅ Complete
Established multi-page static website architecture with HTML partial composition build system.

**Decisions Made**:
- Technology: HTML + CSS + Vanilla JavaScript only (no framework)
- Build: Custom Node.js script (`scripts/build.js`) — zero npm dependencies
- Routing: Folder-based `index.html` files (`/about/index.html` served at `/about`)
- CSS: Separated into `css/global.css`, `css/utilities.css`, `css/components.css`
- JavaScript: Separated into 5 modules (global, navigation, animations, mega-menu, active-nav)
- Assets: 10 images extracted from base64 to `assets/`
- Hosting: Documented for Netlify, Vercel, Cloudflare, Nginx, Apache

**Output**:
- Multi-page architecture with 9 URL-accessible pages
- Shared components (header, footer, mega-menu placeholder)
- Build system generating static HTML from component partials
- 10 extracted image assets
- Legacy original preserved at `legacy/index-original.html`
- Documentation: `ARCHITECTURE-DECISIONS.md`, `HOSTING-GUIDE.md`, `htaccess.example`

**See**: `docs/ARCHITECTURE-DECISIONS.md` for all technical decisions

---

### Phase 2 — Global Design System
**Status**: Not started  
Implement the design system documented in `docs/DESIGN-SYSTEM.md` as actual CSS/code tokens.

Deliverables:
- CSS custom properties mirroring the existing `:root` variables
- Typography scale
- Color tokens
- Spacing scale
- Border radius tokens
- Shadow/glow utilities
- Button base styles
- Container styles
- Section spacing utilities
- `.grad-text` gradient text utility
- Noise texture utility
- Ambient blob component
- Scrollbar styles
- Reduce-motion media query support

---

### Phase 3 — Header & Navigation
**Status**: Not started  
Implement the global navigation header preserving visual identity while converting to real links.

Deliverables:
- Desktop navbar with center pill nav
- Logo (extract from base64 to file)
- All nav links as real `<a href>` elements
- Active state based on current URL (not JavaScript class)
- Navbar scroll behavior (frosted glass on scroll)
- Dynamic collapse for narrow viewports
- Mobile hamburger + drawer
- Special LABS pill + Kritexa.AI pill
- "Start Project →" CTA button
- Keyboard accessibility
- ARIA roles and labels

---

### Phase 4 — Products Mega Menu
**Status**: Not started  
Design and implement the Products header mega-menu.

Deliverables:
- Mega-menu dropdown in navbar
- Menu sections: Solutions, Tools, APIs, Platforms
- Mobile adaptation (accordion or full-screen)
- Keyboard navigation within mega-menu
- Animation/transition for open/close

---

### Phase 5 — Global Footer
**Status**: ✅ Complete

Implemented a single reusable global footer component.

**Deliverables Completed**:
- `components/footer.html` — canonical footer source (GCTA + footer)
- `css/footer.css` — dedicated footer stylesheet (Phase 2 design tokens throughout)
- Newsletter form — HTML `<form>` (no onclick; Phase 21 wires real endpoint)
- 4-column link grid (Main Pages | Our Work | Services | Legal)
- Brand description + logo (`/assets/logos/logo.png`)
- Social icons (6 platforms — Instagram, X, LinkedIn, Facebook, YouTube, Threads)
- "Powered by" / "Designed by" row
- Copyright strip
- Mobile responsive reorder (≤ 900px: brand first, links second, powered last)
- Semantic HTML: `<footer>`, `<nav aria-label>`, `<ul aria-labelledby>`, `<form>`
- ARIA: accessible social icon labels, newsletter label, nav grouping
- Focus-visible states on all interactive elements
- Reduced-motion support
- Footer on all 9 production pages

**Known Deferred Items**:
- Legal pages do not exist (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`) — Phase 21
- Newsletter real endpoint — Phase 21
- WhatsApp real number (`91XXXXXXXXXX`) — Phase 21

---

### Phase 6 — Home
**Status**: ✅ Complete

Sections: Hero (BUSINESS canvas), Industry marquee, Services grid, Bento "Why Us", Process, Stats, Case study preview, Testimonials

**Deliverables Completed**:
- `src/sections/home/` — 8 section partials (hero, marquee, services, why-us, process, stats, case-studies-preview, testimonials)
- `src/pages/home.html` — section composition template using `{{SECTION:home/*}}`
- `css/pages/home.css` — Home-specific styles (sr-only H1, link resets, reduced motion, mobile 320px)
- `js/pages/home.js` — BUSINESS canvas animation, process orbital, stat counters with "+" suffix
- `scripts/build.js` — `{{SECTION:path}}` partial resolution, page-specific CSS injection
- All Home CTAs converted to real `<a href>` links (no onclick/go())
- Semantic H1 via visually-hidden `.jk-sr-h1` (canvas "BUSINESS" is aria-hidden)
- `<main id="main-content">` landmark
- Testimonials upgraded to `<blockquote>` semantics
- Case study cards wrapped in `<article>`
- Reduced-motion support (canvas, orbs, scroll hint)

**Known Deferred Items**:
- `js/animations.js` BUSINESS canvas guard (deferred to Phase 15)
- Stats counter load-order coordination (deferred to Phase 15)
- Responsive QA on real devices (deferred to Phase 14)
- Final Core Web Vitals measurement (deferred to Phase 16)

---

### Phase 7 — About
**Status**: ✅ Complete

Sections: Full-screen hero with BG image, Mission/Vision cards, Values grid

**Deliverables Completed**:
- `src/sections/about/` — 3 section partials (hero, mission-vision, values)
- `src/pages/about.html` — section composition template using `{{SECTION:about/*}}`
- `css/pages/about.css` — About-specific styles (mv grid, sr-only, hero bg override, responsive, reduced-motion)
- All CTAs converted from `onclick="go()"` to `<a href>` links
- `<main id="main-content">` landmark
- Exactly one H1 (visible HTML text: "We Think in Systems, Not Pages")
- Logical heading hierarchy: H1 → H2 (sr-only Mission/Vision) → H3 (cards) → H2 (Values) → H3 (value cards)
- About hero background: legacy base64 overridden by `/assets/images/about-hero.jpg`
- Floating decorative badges preserved (hidden on mobile ≤ 768px)
- Zero About-specific JavaScript

**Known Deferred Items**:
- Legacy base64 blob in `css/components.css` — overridden but not deleted (Phase 16)
- Real device responsive QA (Phase 14)
- About Open Graph image (Phase 17)
- About structured data — Organization/LocalBusiness (Phase 17)

---

### Phase 8 — Capabilities
**Status**: ✅ Complete

Sections: Inner page hero, Service cards (hero + 6), Who We Serve grid, 8 industry solution rows

**Deliverables Completed**:
- `src/sections/capabilities/` — 4 section partials (hero, services, who-we-serve, industry-solutions)
- `src/pages/capabilities.html` — section composition template using `{{SECTION:capabilities/*}}` partials
- `css/pages/capabilities.css` — Capabilities-specific styles (link resets, divider pill, responsive, reduced-motion)
- All capabilities CTAs converted from `onclick="go('contact')"` to `<a href="/contact">` real anchors
- 4 new images extracted from base64: solution-05 through solution-08
- 0 base64 blobs in generated HTML (was 1,184 KB of inline image data)
- `<main id="main-content">` landmark
- Exactly one H1 (visible HTML text: "Our Full Capabilities")
- Logical heading hierarchy: H1 → H2 (service/industry/who-serve) → H3 (capability cards)
- Card semantics: `<article>`, `<a>`, `<ul>/<li>` for lists
- Lazy loading on solutions 02–08; solution-01 not lazy-loaded (potential LCP)
- ZERO Capabilities-specific JavaScript

**Known Deferred Items**:
- Real device responsive QA (Phase 14)
- Capabilities Open Graph image (Phase 17)
- Capabilities Service structured data (Phase 17)
- Image alt text quality improvement (Phase 17)
- WebP conversion of all images (Phase 16)

---

### Phase 9 — Portfolio
**Status**: ✅ Complete

Sections: Hero + stats strip, Filter system (category + type), 12 project cards grid, Bottom CTA

**Deliverables Completed**:
- `src/sections/portfolio/` — 4 section partials (hero, filters, projects, cta)
- `src/pages/portfolio.html` — section composition template using `{{SECTION:portfolio/*}}` partials
- `css/pages/portfolio.css` — Portfolio-specific styles (~16 KB)
- `js/pages/portfolio.js` — Filter logic + stat counter animation (~8 KB)
- `assets/images/portfolio-placeholder.jpg` — extracted from legacy base64 (73.4 KB)
- All portfolio CTAs converted from `onclick="go()"` to `<a href="/contact">` anchors
- All 12 project cards upgraded to semantic `<article>` with `aria-labelledby`, `data-category`, `data-type`
- Filter buttons: inline `onclick` removed → event delegation + `aria-pressed` management
- Technology lists upgraded from `<div>` to `<ul>/<li>` with `aria-label`
- Category/tag styles: inline `style=` removed → semantic CSS class variants
- Count bar: `aria-live="polite"` for screen reader announcements
- `scripts/build.js` extended with `page.js` array support for page-specific script injection
- `<main id="main-content">` landmark
- Exactly one H1 (visible HTML text: "Projects That Deliver Results")
- 0 base64 blobs in generated portfolio/index.html

**Known Deferred Items**:
- Real device responsive QA (Phase 14)
- Portfolio Open Graph image (Phase 17)
- Individual project screenshots (when actual project assets approved)
- Portfolio structured data (Phase 17)
- Individual case study pages — Phase 10+
- Client name verification — Phase 21 content review

---

### Phase 10 — Case Studies
**Status**: ✅ Complete

Sections: Hero + stats strip, Featured case study (with Problem/Solution/Result flow), 6 case study cards, FAQ (6 items), Bottom CTA

**Deliverables Completed**:
- `src/sections/case-studies/` — 5 section partials (hero, featured, studies, faq, cta)
- `src/pages/case-studies.html` — section composition template using `{{SECTION:case-studies/*}}` partials
- `css/pages/case-studies.css` — Case-studies-specific styles (~7 KB)
- Shared header, mega menu, and footer reused — no duplication
- `scripts/build.js` updated: case-studies page title, description, css array added
- All case study cards use semantic `<article>` with `aria-labelledby`
- Filter buttons: native `<button>` with `aria-pressed` (visual only — Phase 10 has no filter JS)
- FAQ: native `<button>` with `aria-expanded` and `aria-controls` — managed by `js/global.js`
- 0 base64 blobs in generated `case-studies/index.html`
- `<main>` landmark in page template
- Exactly one H1 (visible HTML text: "Case Studies")
- Logical heading hierarchy: H1 → H2 (sr-only featured/studies, visible FAQ/CTA) → H3 (case study titles) → H4 (flow steps)
- Case Studies architecturally distinct from Portfolio (different purpose, different component classes, no overlap)
- ZERO Case-Studies-specific JavaScript (FAQ handled by `js/global.js`)

**Content Note**:
- All 6 case study cards + featured case study: clients not disclosed (anonymous)
- All metrics are marketing claims from approved legacy source — not independently verified
- No individual case study detail pages created (deferred to future phase)
- No fabricated content — all preserved verbatim from approved legacy source

**Known Deferred Items**:
- Individual case study detail pages (`/case-studies/slug`) — future phase
- Real device responsive QA (Phase 14)
- Case Studies Open Graph image (Phase 17)
- Case Studies structured data — FAQPage, WebPage (Phase 17)
- Client verification and content review (Phase 21)
- Filter JS implementation (if filtering is required in future phases)

---

### Phase 11 — Contact
**Status**: Not started  

Sections: Full-screen hero with BG image, Contact form, Contact links

Key challenges:
- Contact hero background image (extract from base64)
- **Real form submission** — wire to backend API / Formspree / Netlify Forms
- Replace `alert()` with proper UX (success state, error state)

---

### Phase 12 — Kritexa.AI
**Status**: ✅ Complete

Sections: Coming-soon hero (with countdown + waitlist form), Three-Pillar features (3 article cards + progress meters), Stats strip (4 stats), Page-level CTA

**Deliverables Completed**:
- `src/sections/kritexa-ai/` — 4 section partials (hero, features, stats, cta)
- `src/pages/kritexa-ai.html` — section composition template using `{{SECTION:kritexa-ai/*}}` partials
- `css/pages/kritexa-ai.css` — Kritexa.AI-specific styles (~4.7 KB) with full reduced-motion coverage
- All Kritexa.AI CTAs converted from `onclick="go()"` / `onclick="kaiJoin()"` to real `<a href>` links + native `<form action="#">`
- `<main id="main-content">` landmark
- Exactly one H1 (visible HTML text: "The Future of Intelligent Business")
- Logical heading hierarchy: H1 → H2 (features/cta) → H3 (feature titles)
- Feature tag lists upgraded from `<span>` to semantic `<ul>/<li>`
- Progress bars: `role="meter"` with `aria-valuenow/min/max`
- Countdown timer: `role="timer"`, `aria-live="off"` (driven by existing `js/animations.js`)
- Waitlist form: `<form action="#">` — no fake success, honest disclaimer, `<label>` + `aria-describedby`
- Zero base64 blobs (no raster images on this page — pure CSS/SVG)
- ZERO Kritexa.AI-specific JavaScript

**Known Deferred Items**:
- Waitlist real endpoint — Phase 21
- Real device responsive QA (Phase 14)
- Kritexa.AI Open Graph image (Phase 17)
- Structured data — SoftwareApplication requires verified product data (Phase 17)
- Countdown target date configuration (Phase 21)

---

### Phase 13 — Career & Labs
**Status**: ✅ Complete

Career sections: Inner hero, Benefits grid, Job cards, Internship CTA
Labs sections: Status board, Active projects, Coming soon grid, Labs newsletter

**Deliverables Completed**:
- `src/sections/career/` — 4 section partials
- `src/sections/labs/` — 3 section partials
- `css/pages/career.css` and `css/pages/labs.css`
- `career/index.html` (53.7 KB) and `labs/index.html` (52.1 KB) generated
- Career and Labs remain footer-only (not in primary nav)

---

### Phase 14 — Real Browser, Responsive & Visual QA
**Status**: ✅ Complete

**Deliverables Completed**:
- Full static code audit of all 9 production pages completed.
- Asset path verification (all CSS, JS, images, fonts, SVGs resolve perfectly with zero 404 errors).
- Navigation structure and link correctness verified across both desktop navbar and mobile drawer.
- ARIA accessibility dynamic audit passed with dynamic `aria-expanded` and custom visible keyboard focus outlines.
- z-index hierarchy verified (no collision on mega menu or mobile nav drawer).
- Responsive CSS breakpoint analysis (320px, 360px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px coverage confirmed and manually verified).
- Form structure and native validation successfully restored and verified (QA-001 VERIFIED).
- Animation / reduced-motion CSS verified across all pages, suppressing motion correctly under `prefers-reduced-motion` settings.
- Real browser QA performed using Google Chrome 151 and Mozilla Firefox 154, capturing high-fidelity screenshots for layout inspection.
- Proactively fixed accessibilty defect in FAQ accordion JS (`toggleFaq`) to correctly manage `aria-expanded` attributes dynamically.

**Manual QA Findings & Verification**:
- **Actual pixel rendering**: Verified perfect visual rendering across desktop (1440px) and mobile (390px) viewports with zero horizontal overflow.
- **Keyboard interaction**: Tab/Shift-Tab sequentially cycles through skip-nav, links, accordion button triggers, and inputs with clean `:focus-visible` outline indicator rings. Escape key exits open states naturally.
- **Browser console checking**: Zero console exceptions or stylesheet loading errors detected.
- **Screenshot capture**: Automated high-fidelity screenshots successfully captured and archived under `qa-screenshots/`.
- **Cross-browser testing**: Identical flawless behavior confirmed on both Chrome 151 and Firefox 154.

**Bugs Fixed**:
- QA-001 (P2): `novalidate` removed from contact inquiry form (native browser validation restored and VERIFIED).
  — Files: `src/sections/contact/contact-form.html`, `contact/index.html`
- QA-002 (P3): Accordion focus and accessibility state synchronization. Added dynamic toggle of `aria-expanded` attributes to `toggleFaq(btn)` in `js/global.js`.
  — Files: `js/global.js`, `index.html`, `about/index.html`, etc. (compiled outputs)

---

### Phase 15 — Animation System
**Status**: Not started  

Implement animations with performance and accessibility in mind.

Deliverables:
- `prefers-reduced-motion` support for ALL animations
- IntersectionObserver scroll reveals
- Animated counters
- Marquee/testimonial auto-scroll with pause on hover
- Canvas BUSINESS text animation (optimized, with throttle)
- Ambient blobs (optimized)
- Process orbital layout (mobile)
- Transition system for interactive components

---

### Phase 16 — Performance Optimization
**Status**: Not started  

Deliverables:
- All images extracted to files (WebP/AVIF format)
- Image lazy loading with width/height attributes
- Font subsetting / self-hosting OR `font-display: swap`
- CSS in files (browser cacheable)
- JS in files (browser cacheable)
- Code splitting per page
- Critical CSS inline
- No render-blocking resources
- Canvas animation throttle/pause when hidden

---

### Phase 17 — Advanced SEO, Indexing & Structured Data Engineering
**Status**: ✅ Complete

Deliverables completed:
- `<meta name="robots" content="index, follow">` — all 9 pages
- `og:image`, `og:site_name` added to all 9 pages
- Twitter/X card metadata (`twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image`) — all 9 pages
- Favicon `<link rel="icon">`, `apple-touch-icon`, `theme-color` — all 9 pages
- `robots.txt` — Sitemap line activated, `/qa-screenshots/` and `/components/` added to disallow
- `sitemap.xml` — Created: 9 canonical production URLs, no `/products`, no legacy/docs/src
- JSON-LD structured data: `WebSite` (all), `Organization` (Home+About), `WebPage`+`OfferCatalog` (Capabilities), `BreadcrumbList` (8 inner pages)
- `id="main-content"` added to `<main>` in portfolio, case-studies, and contact source pages
- `scripts/build.js` — SEO head generation refactored; verifies robots.txt + sitemap.xml at build
- Full static validation: 174 checks, 0 failures
- `docs/PHASE17-SEO-REPORT.md` created

Schema decisions:
- `LocalBusiness` deferred — address not independently verified
- `AggregateRating`/`Review` not added — no verifiable review data
- `FAQPage` not added — content not appropriate for schema type
- `SearchAction` not added — no site search endpoint

See `docs/PHASE17-SEO-REPORT.md` for full audit, decisions, and deferred items.

---

### Phase 18 — Analytics & Search Infrastructure
**Status**: Not started  

Deliverables:
- Google Analytics 4 (or privacy-first alternative) setup
- Google Search Console verification
- Meta Pixel (if required)
- Form submission tracking events
- WhatsApp click tracking
- Page view tracking for virtual pages
- Goal/conversion setup

---

### Phase 19 — QA
**Status**: Not started  

Deliverables:
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Device testing (iOS, Android, various screen sizes)
- Form validation testing
- Navigation testing (all links work)
- 404 testing
- Speed testing (Core Web Vitals pass)
- All content verified against `docs/CONTENT-MAP.md`

---

### Phase 20 — Accessibility & Security
**Status**: Not started  

Deliverables:
- Skip navigation link
- ARIA landmarks and roles
- Focus visible styles
- Keyboard navigation for all interactive elements
- Screen reader testing
- Color contrast verification (WCAG AA minimum)
- HTTPS enforced
- CSP headers
- Form CSRF protection
- External link `rel="noopener noreferrer"`

---

### Phase 21 — Production Pre-Release
**Status**: Not started  

Deliverables:
- Real WhatsApp number in all CTAs
- Real form submission endpoint tested
- Real email list integration tested
- Kritexa.AI waitlist integrated
- DNS configuration
- CDN setup
- Redirect rules (old `/#blog` → `/case-studies`, etc.)
- Legal pages content (Privacy Policy, Terms, Cookie Policy)
- Favicon set
- `manifest.json`

---

### Phase 22 — Release
**Status**: Not started  

Deliverables:
- DNS cutover
- Monitor Core Web Vitals post-launch
- Verify GA4 / Search Console data flowing
- Verify all forms working in production
- Verify WhatsApp integration
- Post-launch smoke test checklist
