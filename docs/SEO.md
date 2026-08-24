## Phase 22 — SEO Updates

### New Pages Added to Sitemap

```xml
<!-- Industry Solutions -->
<url>
  <loc>https://www.kritexalabs.com/industry-solutions</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>

<!-- Live Projects -->
<url>
  <loc>https://www.kritexalabs.com/live-projects</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Updated Page Titles

| Page | Before | After |
|------|--------|-------|
| Capabilities | "Capabilities — Kritexa Labs | Websites, AI, Automation & Growth" | "Capabilities — Kritexa Labs | Technology, AI & Engineering" |
| Portfolio | "Portfolio — Kritexa Labs | Our Work" | "Portfolio — Kritexa Labs | What We Have Made" |
| Case Studies | "Case Studies — Kritexa Labs | Real Results, Real Businesses" | "Case Studies — Kritexa Labs | Real Business Problems & Outcomes" |

### New Pages SEO

| Page | Title | Description | Canonical |
|------|-------|-------------|-----------|
| Industry Solutions | "Industry Solutions — Kritexa Labs | Solutions by Business Type" | "Kritexa Labs builds tailored digital solutions for healthcare, consulting, finance, startups, local business, education, e-commerce and personal brands." | `/industry-solutions` |
| Live Projects | "Live Projects — Kritexa Labs | Experience What We Have Built" | "Experience real software, systems, and products built by Kritexa Labs. Don't just see what we build — interact with it." | `/live-projects` |

All new pages include:
- Unique title + description
- Canonical link
- Open Graph (og:title, og:description, og:url, og:image)
- Twitter/X card metadata
- WebSite JSON-LD (auto-generated)
- BreadcrumbList JSON-LD (auto-generated for non-home pages)

---



## Phase 20 — Security & Technical QA Regression Verification

**Date**: 2025-08-23  
**Status**: PASS — Phase 17 SEO intact

All Phase 17 SEO deliverables verified after Phase 20 security fixes:

| Check | Result |
|-------|--------|
| `<link rel="canonical">` | Present on all 9 pages |
| `sitemap.xml` at project root | Present |
| `robots.txt` with correct Disallow rules | Present |
| JSON-LD structured data | Present on all 9 pages |
| Open Graph tags (og:title, og:description, og:image) | Present on all 9 pages |
| Twitter Card tags | Present on all 9 pages |
| Favicon + apple-touch-icon + theme-color | Present |
| `<html lang="en">` | Present on all pages |

No SEO regressions introduced by Phase 20 changes. The only changes were removal of inline `onclick=` in FAQ HTML sections and a minor JS update — neither affects SEO.

---



## Phase 17 — Advanced SEO, Indexing & Structured Data Engineering

### Overview

Phase 17 completes the technical SEO foundation for all 9 production pages. See `docs/PHASE17-SEO-REPORT.md` for the full audit, decisions, and validation report.

### Changes Made

- `<meta name="robots" content="index, follow">` — emitted on all 9 pages via `scripts/build.js`
- `og:image`, `og:image:width`, `og:image:height`, `og:site_name` — added to all 9 pages
- Twitter/X card metadata — `twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image` — added to all 9 pages
- Favicon `<link rel="icon" type="image/png">`, `<link rel="apple-touch-icon">`, `<meta name="theme-color">` — added to all 9 pages
- `robots.txt` — Sitemap directive activated; `/qa-screenshots/` and `/components/` added to Disallow
- `sitemap.xml` — Created with 9 canonical production URLs
- JSON-LD structured data blocks added: `WebSite` (all pages), `Organization` (Home, About), `WebPage`+`OfferCatalog` (Capabilities), `BreadcrumbList` (8 inner pages)
- `id="main-content"` added to `<main>` in `src/pages/portfolio.html`, `src/pages/case-studies.html`, `src/pages/contact.html`
- `scripts/build.js` — Build system refactored to generate all SEO head elements; added build-time verification of `robots.txt` and `sitemap.xml`

### Schema Decisions

| Schema | Decision |
|---|---|
| `WebSite` | ✓ Implemented — all pages |
| `Organization` | ✓ Implemented — Home, About (verified facts only) |
| `WebPage` + `OfferCatalog` | ✓ Implemented — Capabilities |
| `BreadcrumbList` | ✓ Implemented — all 8 inner pages |
| `LocalBusiness` | ✗ Deferred — address not independently verified |
| `AggregateRating` / `Review` | ✗ Not implemented — no verifiable review data |
| `FAQPage` | ✗ Not implemented — content not suitable |
| `SearchAction` | ✗ Not implemented — no search endpoint |

### OG Image Strategy

| Page | Image Used | Notes |
|---|---|---|
| Home | `/assets/logos/logo.png` | Logo fallback — no full-bleed hero image |
| About | `/assets/images/about-hero.jpg` | Suitable hero image |
| Capabilities | `/assets/images/solution-01.jpg` | Industry image |
| Portfolio | `/assets/images/portfolio-placeholder.jpg` | Project image |
| Case Studies | `/assets/logos/logo.png` | No dedicated image — logo fallback |
| Contact | `/assets/images/contact-hero.jpg` | Suitable team photo |
| Kritexa.AI | `/assets/logos/logo.png` | CSS-gradient hero; no raster image |
| Career | `/assets/logos/logo.png` | Logo fallback |
| Labs | `/assets/logos/logo.png` | Logo fallback |

**Action Required (Pre-Launch):** Create dedicated 1200×630 social preview images for: Home, Case Studies, Kritexa.AI, Career, Labs.

### Validation

Static validation: 174 checks, 0 failures. All JSON-LD valid. Build: 9/9.

---



## Phase 13 — Career & Labs Page SEO

### Career Page SEO

#### Page Title
```html
<title>Career — Kritexa Labs | Join Our Team</title>
```
- Career-page-specific title
- Communicates hiring intent without fabricating specific claims
- Does not invent job guarantees or employee counts

#### Meta Description
```html
<meta name="description" content="Join the Kritexa Labs team — passionate builders working on AI, web development, and digital growth. View open roles and internship opportunities.">
```
- Based on approved Career content from `docs/CONTENT-MAP.md` and `legacy/index-original.html`
- Does not invent hiring volumes, salaries, or guarantees
- Includes call to action (view open roles)

#### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/career">
```

#### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper.
`og:image` deferred to Phase 17.

#### Heading Hierarchy (Career page)
| Level | Text | Location |
|---|---|---|
| H1 | "Build the Future With Us" | hero.html |
| H2 | "Why Build With Us?" | culture.html |
| H2 | "Current Openings" | opportunities.html |
| H2 | "Internship Program" | cta.html |
| H2 | "Ready to Build Your Digital Growth System?" | footer (shared .gcta) |

- Exactly one H1 ✅
- No skipped heading levels ✅

#### Structured Data
Deferred to Phase 17. **No JobPosting or HiringOrganization structured data added.**
A `JobPosting` schema cannot be implemented because:
- Application status is paused (Apply Now button is disabled)
- Salary cannot be confirmed (performance-based, no fixed range)
- Active vacancy verification is not possible from source alone
This is a Phase 17 deferred item requiring client verification.

---

### Labs Page SEO

#### Page Title
```html
<title>Labs — Kritexa Labs | Live Research & Experiments</title>
```
- Labs-page-specific title
- Communicates experimental/research positioning without fabricating results

#### Meta Description
```html
<meta name="description" content="Kritexa Labs research and experimental projects — AI, automation, and web performance tools we're actively building for Indian businesses.">
```
- Based on approved Labs content from `docs/CONTENT-MAP.md` and `legacy/index-original.html`
- Does not invent research results, patents, or partnerships
- Accurately communicates "building" (in-progress) status

#### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/labs">
```

#### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper.
`og:image` deferred to Phase 17.

#### Heading Hierarchy (Labs page)
| Level | Text | Location |
|---|---|---|
| H1 | "LABS — What We're Building" | hero.html |
| H2 | "In-Progress Projects" | experiments.html |
| H2 | "On The Horizon" | experiments.html |
| H2 | "Stay in the Loop" | cta.html |
| H2 | "Ready to Build Your Digital Growth System?" | footer (shared .gcta) |

- Exactly one H1 ✅
- No skipped heading levels ✅

#### Structured Data
Deferred to Phase 17. **No ResearchProject, Organization, or SoftwareApplication structured data added.**
Labs projects are experimental/planned — insufficient verified data for schema implementation.

---



## Phase 12 — Kritexa.AI Page SEO

### Page Title
```html
<title>Kritexa.AI — India's AI Platform for Business Growth | Kritexa Labs</title>
```
- Kritexa.AI-page-specific title
- Distinct from all other page titles (Home/About/Capabilities/Portfolio/Case Studies/Contact)
- Names the product, signals market focus (India), and attributes to Kritexa Labs
- Does not invent AI performance claims

### Meta Description
```html
<meta name="description" content="Kritexa.AI is being built to bring autonomous AI agents, conversational intelligence, and predictive growth tools to Indian businesses. Join the early access waitlist.">
```
- Based on approved Kritexa.AI content from `docs/CONTENT-MAP.md` and `legacy/index-original.html`
- Names the three core pillars from approved source
- Accurately communicates the product is "being built" (not yet launched)
- No invented statistics, performance claims, or dates
- Includes call to action (waitlist)

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/kritexa-ai">
```
- Correct canonical URL — `/kritexa-ai` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="Kritexa.AI — India's AI Platform for Business Growth | Kritexa Labs">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/kritexa-ai">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved Kritexa.AI-specific OG image available)

### Heading Hierarchy (Kritexa.AI page)
| Level | Text | Location |
|---|---|---|
| H1 | "The Future of Intelligent Business" | hero.html (visible HTML text) |
| H2 | "Three Pillars of Kritexa.AI" | features.html |
| H3 | "Autonomous AI Agents" | features.html |
| H3 | "Conversational Intelligence" | features.html |
| H3 | "Predictive Growth Engine" | features.html |
| H2 | "Be First to Experience Kritexa.AI" | cta.html (visible) |
| H2 | "Ready to Build Your Digital Growth System?" | footer (shared component) |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added.
Potential additions that require verified data before implementing:
- `SoftwareApplication` — requires confirmed pricing, availability, OS compatibility
- `Product` — requires verified product details (not available for unreleased product)
- `Organization` — requires full corporate data verification
- `WebPage` — potential safe addition in Phase 17

---



## Phase 11 — Contact Page SEO

### Page Title
```html
<title>Contact — Kritexa Labs | Start Your Project</title>
```
- Contact-page-specific title
- Distinct from Home/About/Capabilities/Portfolio/Case Studies titles
- Includes "Start Your Project" to signal conversion intent

### Meta Description
```html
<meta name="description" content="Get in touch with Kritexa Labs. Send a project inquiry, WhatsApp us directly, or email contact@kritexalabs.com. We reply within 2–4 hours.">
```
- Based on approved contact content from `docs/CONTENT-MAP.md` and `src/pages/contact.html`
- References verified email address
- WhatsApp placeholder not exposed in meta description
- No invented statistics or awards

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/contact">
```
- Correct canonical URL — `/contact` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="Contact — Kritexa Labs | Start Your Project">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/contact">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved contact-specific OG image available)

### Heading Hierarchy (Contact page)
| Level | Text | Location |
|---|---|---|
| H1 | "Let's Build Something Remarkable Together" | hero.html (visible HTML text) |
| H2 | "Start the Conversation" | contact-form.html |
| H2 | "Common Questions" | faq.html (visible) |
| H2 | "Let's Engineer Your Growth System" | cta.html (visible) |
| H2 | "Ready to Build Your Digital Growth System?" | footer (shared component) |
| H3 | "Send Us a Message" | contact-form.html (within .cf) |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added.
The following data is NOT verified sufficiently for structured data:
- `LocalBusiness` — address format, telephone, opening hours not independently verified
- `Organization` — requires full corporate data
- `ContactPage` schema — potential future addition

---



## Phase 10 — Case Studies Page SEO

### Page Title
```html
<title>Case Studies — Kritexa Labs | Real Results, Real Businesses</title>
```
- Case-studies-page-specific title
- Distinct from Home/About/Capabilities/Portfolio titles
- Includes "Real Results, Real Businesses" to signal intent

### Meta Description
```html
<meta name="description" content="Explore how Kritexa Labs transformed businesses with AI, automation, and modern web systems. Deep dives into healthcare, e-commerce, local SEO, and more.">
```
- Based on approved Case Studies page content (from `docs/CONTENT-MAP.md`)
- No invented statistics or awards
- References actual case study categories from approved source

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/case-studies">
```
- Correct canonical URL — `/case-studies` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="Case Studies — Kritexa Labs | Real Results, Real Businesses">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/case-studies">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved case-studies-specific OG image available)

### Heading Hierarchy (Case Studies page)
| Level | Text | Location |
|---|---|---|
| H1 | "Case Studies" | hero.html (visible HTML text) |
| H2 | "Featured Case Study" [sr-only] | featured.html |
| H3 | "Digital Transformation for a Multi-Specialty Clinic" | featured.html |
| H4 | "No Digital Presence" | featured.html (flow step) |
| H4 | "Full Growth System" | featured.html (flow step) |
| H4 | "Measurable Growth" | featured.html (flow step) |
| H2 | "Case Studies" [sr-only] | studies.html |
| H3 (×6) | Individual case study titles | studies.html |
| H2 | "Frequently Asked Questions" | faq.html (visible) |
| H2 | "Ready to Be Our Next Case Study?" | cta.html (visible) |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added. Potential future additions:
- `FAQPage` schema for FAQ section
- `WebPage` schema
- `BreadcrumbList` schema

---


## Phase 9 — Portfolio Page SEO

### Page Title
```html
<title>Portfolio — Kritexa Labs | Our Work</title>
```
- Portfolio-page-specific title
- Distinct from Home/About/Capabilities titles
- Includes "Our Work" to signal content

### Meta Description
```html
<meta name="description" content="Explore our work across healthcare, consulting, finance, startups, local business, education, e-commerce and personal brands. Real projects, real results.">
```
- Based on approved Portfolio page content (from `docs/CONTENT-MAP.md`)
- No invented statistics or awards
- Lists actual portfolio categories

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/portfolio">
```
- Correct canonical URL — `/portfolio` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="Portfolio — Kritexa Labs | Our Work">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/portfolio">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved portfolio-specific OG image available)

### Heading Hierarchy (Portfolio page)
| Level | Text | Location |
|---|---|---|
| H1 | "Projects That Deliver Results" | hero.html (visible HTML text) |
| H2 | "Portfolio Projects" [sr-only] | projects.html |
| H3 (×12) | Individual project names (pf-title-01 through pf-title-12) | projects.html |
| H2 | "Have a Project in Mind?" | cta.html (visible) |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added. Potential future additions:
- `ItemList` schema for portfolio projects
- `CreativeWork` schema per project
- `WebPage` schema

---


## Phase 8 — Capabilities Page SEO

### Page Title
```html
<title>Capabilities — Kritexa Labs | Websites, AI, Automation & Growth</title>
```
- Capabilities-page-specific title
- Distinct from Home/About titles
- Includes primary capability keywords from approved content

### Meta Description
```html
<meta name="description" content="From websites to AI automation — explore the full capabilities of Kritexa Labs: digital experience, AI workforce, business automation, growth marketing, commerce, and more.">
```
- Based on approved Capabilities page content (from `docs/CONTENT-MAP.md`)
- No invented statistics or awards
- Lists actual capability categories

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/capabilities">
```
- Correct canonical URL — `/capabilities` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="Capabilities — Kritexa Labs | Websites, AI, Automation & Growth">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/capabilities">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved capabilities-specific OG image available)

### Heading Hierarchy (Capabilities page)
| Level | Text | Location |
|---|---|---|
| H1 | "Our Full Capabilities" | hero.html (visible HTML text) |
| H2 | "Our Services" [sr-only] | services.html |
| H3 | "Business Growth Engine" | services.html |
| H3 (×6) | Capability card titles | services.html |
| H2 | "Built for Real Businesses" | who-we-serve.html (visible) |
| H2 | "Industry Solutions" [sr-only] | industry-solutions.html |
| H2 (×8) | Industry solution headings (01–08) | industry-solutions.html |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added. Potential future additions:
- `Service` schema (for each capability/industry solution)
- `WebPage` schema

---


## Phase 7 — About Page SEO

### Page Title
```html
<title>About Kritexa Labs — AI-First Digital Growth Studio, Pune</title>
```
- About-page-specific title
- Distinct from Home title

### Meta Description
```html
<meta name="description" content="Kritexa Labs engineers complete digital growth machines — AI-powered systems that attract leads, automate operations, and scale revenue. Based in Hinjewadi, Pune.">
```
- Based on approved About page content (from `docs/CONTENT-MAP.md`)
- No invented statistics or awards

### Canonical
```html
<link rel="canonical" href="https://www.kritexalabs.com/about">
```
- Correct canonical URL — `/about` (no trailing slash, no `.html`)

### Open Graph
Minimum OG tags implemented by `scripts/build.js` build wrapper:
```html
<meta property="og:title" content="About Kritexa Labs — AI-First Digital Growth Studio, Pune">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.kritexalabs.com/about">
<meta property="og:type" content="website">
```
- `og:image` deferred to Phase 17 (no approved about-specific OG image available)

### Heading Hierarchy (About page)
| Level | Text | Location |
|---|---|---|
| H1 | "We Think in Systems, Not Pages" | hero.html (visible HTML text) |
| H2 | "Mission and Vision" | mission-vision.html (visually hidden `.sr-only`) |
| H3 | "Our Mission" | mission-vision.html |
| H3 | "Our Vision" | mission-vision.html |
| H2 | "Dedicated to Delivering Value Every Day" | values.html (visible) |
| H3 | Six value headings | values.html |

- Exactly one H1 ✅
- No skipped heading levels ✅
- No headings used purely for visual sizing ✅

### Structured Data
Deferred to Phase 17. No speculative structured data added. Potential future additions:
- `Organization` schema
- `LocalBusiness` schema

---


# SEO Audit

All findings based on static inspection of `index.html`. No runtime SEO tool was used.

---

## Current SEO Implementation

### Page Title
```html
<title>Kritexa Labs — AI-First Digital Growth Studio</title>
```
- **Issue**: Single title for all 9 virtual pages. When user navigates to `/about`, the title remains "Kritexa Labs — AI-First Digital Growth Studio" — no page-specific title.

### Meta Description
```html
<meta name="description" content="Kritexa Labs engineers AI-powered digital growth systems — websites, automation, CRM, and SEO for businesses that want to scale.">
```
- **Issue**: Single description for all pages. Identical `<meta description>` for Portfolio, Career, Labs, Contact, etc.

### Meta Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- ✅ Present and correct

### Meta Charset
```html
<meta charset="UTF-8">
```
- ✅ Present

### Canonical URL
- ❌ **Missing entirely** — no `<link rel="canonical">` tag
- High risk: Google may treat `https://kritexalabs.com/#about` and `https://kritexalabs.com/` as the same page or create canonicalization issues

### Robots Meta
- ❌ **Missing** — no `<meta name="robots">` tag
- Defaults to index/follow, which is acceptable but explicit control is missing

### Open Graph Tags
- ❌ **Missing** — no `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- LinkedIn, WhatsApp, and Facebook shares will show no preview or only the page title

### Twitter/X Card
- ❌ **Missing** — no `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Favicon
- ❌ **Missing** — no `<link rel="icon">`, no `favicon.ico`
- Browser will show a blank tab icon

### `robots.txt`
- ❌ **File does not exist** in the project

### `sitemap.xml`
- ❌ **File does not exist** in the project

---

## URL Structure

### Current State
- All "pages" are at the same URL (`/`) with hash fragments (`#about`, `#capabilities`, etc.)
- `history.pushState` is used to update the hash without a full page reload
- From Google's perspective, hash-based navigation is generally **not crawlable** in the traditional sense
  - Google CAN crawl hash URLs in some cases, but the entire SPA structure is problematic
  - All pages share one `<title>` and one `<meta description>`
  - Google sees one page, not nine

### Problematic URL Mapping
| Intended Page | Current URL | Google Sees |
|---|---|---|
| Home | `kritexalabs.com/` | ✅ One page |
| About | `kritexalabs.com/#about` | ❌ Same page, different hash |
| Capabilities | `kritexalabs.com/#capabilities` | ❌ Same page |
| Portfolio | `kritexalabs.com/#portfolio` | ❌ Same page |
| Career | `kritexalabs.com/#career` | ❌ Same page |
| Case Studies | `kritexalabs.com/#blog` | ❌ Same page |
| Contact | `kritexalabs.com/#contact` | ❌ Same page |

---

## Heading Hierarchy

### Global Issue
- There is ONE `<h1>` per virtual page but since only one page is active at a time, the DOM always contains nine `<h1>` elements simultaneously, though only one is visible.
- Search engines may read ALL `<h1>` elements in the document regardless of CSS `display: none`.

### Per-Page Heading Structure
| Page | H1 | H2s | H3s |
|---|---|---|---|
| Home | (none — `.jk-big-text` is a `<span>`) | Multiple `<h2>` in sections | Multiple `<h3>` in cards |
| About | "We Think in Systems, Not Pages" | "Our Values", "Dedicated to Delivering Value Every Day" | Value card headings |
| Capabilities | "Our Full Capabilities" | Multiple section H2s | Service card titles |
| Portfolio | (via `.iph h1`) | "Build Your Success Story" | Project card titles |
| Career | (via `.iph h1`) | Multiple | Job card title |
| Case Studies | (via `.iph h1`) | Multiple | Case study titles |
| Contact | (via `.con-hero-content h1`) | "Tell Us About Your Project" | — |
| Labs | (via `.iph h1`) | "In-Progress Projects", "On The Horizon" | Lab project names |
| Kritexa.AI | "The Future of Intelligent Business" | "Three Pillars of Kritexa.AI" | Feature headings |

**Note**: The Home page hero uses a `<span id="jkBig">` with class `.jk-big-text` for "BUSINESS" — this renders on a `<canvas>` and is NOT readable by search engines as text.

---

## Image Alt Attributes

All `<img>` elements in the portfolio cards and solution rows:
```html
<img src="data:image/jpeg;base64,..." >
```
- ❌ **No `alt` attributes on any portfolio/solution images**
- No image dimensions specified

Logo:
```html
<img src="data:image/png;base64,..." >
```
- ❌ **No `alt` attribute on logo images**

---

## Link Analysis

### Internal Links
- All internal navigation uses `onclick="go('page')"` on `<a>`, `<button>`, and `<div>` elements
- No `href` attributes on navigation `<a>` tags — they are not crawlable links
- Search engine crawlers cannot discover internal "pages" by following links

### External Links
- Footer social links: `href` to Instagram, X, LinkedIn, Facebook, YouTube, Threads ✅
- Footer "Powered by / Designed by": `href="https://kritexalabs.com"` ✅
- WhatsApp CTA: `href="https://wa.me/91XXXXXXXXXX"` — **PLACEHOLDER** ❌
- Email CTA: `href="mailto:hr@kritexalabs.com"` ✅

All external links have `target="_blank"` (fine) but no `rel="noopener"` (minor security/SEO note).

---

## Structured Data / Schema

- ❌ **Missing entirely** — no JSON-LD, no Microdata, no RDFa
- Opportunities for structured data:
  - `Organization` schema (company name, logo, contact, social profiles)
  - `LocalBusiness` schema (Pune location)
  - `Service` schema (for each capability)
  - `BreadcrumbList` schema (for portfolio case studies)
  - `WebSite` schema with search action
  - `FAQPage` schema (FAQ section on Case Studies page)

---

## Semantic HTML

| Element | Used? | Notes |
|---|---|---|
| `<nav>` | ✅ | Navbar uses `<nav>` |
| `<main>` | ❌ | No `<main>` element wrapping page content |
| `<header>` | ❌ | No `<header>` element |
| `<footer>` | ✅ | Each page has `<footer class="footer">` |
| `<section>` | ✅ | Sections use `<section>` |
| `<article>` | ❌ | Case study/blog cards use `<div>` |
| `<aside>` | ❌ | Not used |
| `<h1>`–`<h6>` | ✅ | Used but hierarchy concerns |
| `<ul>/<li>` | ✅ | Footer nav, benefit lists |
| `<button>` | ✅ | CTAs use `<button>` |
| `<form>` | ✅ | Contact form uses `<form>` (but no `action`) |
| `<label>` | ✅ | Form inputs have `<label>` elements |
| `<figure>` | ❌ | Images not wrapped in `<figure>` |
| `<time>` | ❌ | Dates not marked up semantically |

---

## SEO Summary

| Check | Status |
|---|---|
| Page title | ⚠️ Single title — not per-page |
| Meta description | ⚠️ Single description — not per-page |
| Canonical | ❌ Missing |
| Open Graph | ❌ Missing |
| Twitter Card | ❌ Missing |
| Favicon | ❌ Missing |
| robots.txt | ❌ Missing |
| sitemap.xml | ❌ Missing |
| Structured data | ❌ Missing |
| Crawlable navigation | ❌ JavaScript-only |
| Image alt text | ❌ Missing on all images |
| Clean URLs | ❌ Hash-based only |
| Heading structure | ⚠️ Multiple H1s in DOM |
| `lang` attribute | ✅ `lang="en"` on `<html>` |
| Viewport meta | ✅ Present |
| External link safety | ⚠️ Missing `rel="noopener"` |
