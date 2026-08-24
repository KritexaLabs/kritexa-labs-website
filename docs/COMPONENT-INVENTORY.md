## Phase 22 — Component Inventory Updates

### New Section Partials

#### Industry Solutions Sections

| File | Purpose |
|------|---------|
| `src/sections/industry-solutions/hero.html` | H1, description, CTAs |
| `src/sections/industry-solutions/who-we-serve.html` | 8-industry grid (moved from capabilities) |
| `src/sections/industry-solutions/solutions-rows.html` | 8 industry solution rows (moved from capabilities) |
| `src/sections/industry-solutions/cta.html` | Bottom CTA with cross-links |

#### Live Projects Sections

| File | Purpose |
|------|---------|
| `src/sections/live-projects/hero.html` | H1, positioning statement |
| `src/sections/live-projects/projects.html` | 6 project cards with honest status |
| `src/sections/live-projects/cta.html` | Bottom CTA with cross-links |

#### New Capabilities Sections

| File | Purpose |
|------|---------|
| `src/sections/capabilities/engineering-domains.html` | 6 engineering domain cards (NEW Phase 22) |
| `src/sections/capabilities/proof-cta.html` | Cross-links to related pages (NEW Phase 22) |

### Modified Global Components

| Component | Change |
|-----------|--------|
| `components/header.html` | Solutions dropdown added; Products "Solutions" → "Offerings"; mobile Solutions accordion |
| `components/footer.html` | Solutions column group; Our Platform column; Live Projects in Main Pages |
| `components/mega-menu.html` | "Solutions" → "Offerings" canonical reference updated |

### New CSS Files

| File | Scope |
|------|-------|
| `css/pages/industry-solutions.css` | Industry Solutions page |
| `css/pages/live-projects.css` | Live Projects page |

### Modified CSS Files

| File | Change |
|------|--------|
| `css/header.css` | Solutions dropdown styles added |
| `css/pages/capabilities.css` | Removed industry styles; added proof-cta styles |

### Modified JS Files

| File | Change |
|------|--------|
| `js/navigation.js` | Solutions dropdown + mobile accordion logic |
| `js/active-nav.js` | New routes for industry-solutions and live-projects |

---



## Phase 13 — Career & Labs Page Components

### Career Page Components

All Career component classes are **already defined** in `css/components.css` (they existed in the legacy source). Phase 13 uses them without modification.

#### Reused Career Components (existing in `css/components.css`)

| Class | Element | Description |
|---|---|---|
| `.iph` | `<section>` | Inner page hero — shared with Capabilities, Portfolio, etc. |
| `.ben-grid` | `<div role="list">` | 3-column benefit cards grid |
| `.ben-card` | `<div role="listitem">` | Individual benefit card |
| `.ben-icon` | `<div aria-hidden>` | Emoji icon (decorative) |
| `.job-card` | `<article>` | Full job listing card |
| `.jb-hd` | `<div>` | Job card header row — badges |
| `.jb-badge` | `<span>` | Badge pill (dept/live/type) |
| `.jb-dept` | modifier | Department badge (purple) |
| `.jb-live` | modifier | "Actively Hiring" badge (green) |
| `.jb-type` | modifier | Type/location badge (muted) |
| `.jb-title-row` | `<div>` | Icon + title row |
| `.jb-icon` | `<div aria-hidden>` | Emoji icon box |
| `.jb-title` | `<div id="jb-title-bde">` | Job title (gradient text) |
| `.jb-sub` | `<div>` | Job subtitle (monospace) |
| `.jb-sec` | `<div>` | "About the Role" section |
| `.jb-sec-lbl` | `<div>` | Section label (monospace, purple) |
| `.jb-desc` | `<p>` | Role description |
| `.jb-info-grid` | `<div>` | 3-column info: skills/responsibilities/tools |
| `.jb-info` | `<div>` | Info panel with heading + list |
| `.jb-info-lbl` | `<div>` | Panel label (monospace, muted) |
| `.jb-tags` | `<div role="list">` | Skill tag strip |
| `.jb-tag` | `<span role="listitem">` | Individual skill tag |
| `.jb-foot` | `<div>` | Footer: compensation + apply column |
| `.jb-comp` | `<div>` | Compensation summary row |
| `.jb-ci` | `<div>` | Individual compensation item |
| `.jb-ci-sep` | `<div aria-hidden>` | Vertical divider |
| `.jb-apply-col` | `<div>` | Apply button + resume link column |
| `.jb-apply-dis` | `<button disabled>` | Disabled "Apply Now" button |
| `.jb-resume` | `<a href="mailto:">` | Resume email submission link |
| `.jb-res-icon` | `<span aria-hidden>` | Email icon |
| `.jb-res-txt` | `<span>` | "Click Here to Send Your Resume" text |
| `.intern-card` | `<div>` | Internship program card |
| `.intern-btns` | `<div>` | Internship CTA button row |

**Note**: All above `.jb-*` and `.ben-*` classes are defined in `css/components.css` (not in `css/pages/career.css`). Career page CSS only adds spacing overrides, focus states, and reduced-motion rules.

---

### Labs Page Components

All Labs component classes are **already defined** in `css/components.css` (they existed in the legacy source). Phase 13 uses them without modification, plus adds new newsletter-specific classes.

#### Reused Labs Components (existing in `css/components.css`)

| Class | Element | Description |
|---|---|---|
| `.iph` | `<section>` | Inner page hero — shared component |
| `.labs-bar` | `<div role="status">` | Live status board banner (cyan tint) |
| `.labs-card` | `<article>` | Active project card (flex row) |
| `.labs-st` | `<div>` | Status badge pill |
| `.ls-act` | modifier | "● ACTIVE" green badge |
| `.ls-soon` | modifier | "◌ PLANNED" amber badge |
| `.labs-body` | `<div>` | Card body content |
| `.labs-t` | `<div>` | Category tag (monospace, muted) |
| `.labs-prog-wrap` | `<div>` | Progress bar wrapper |
| `.labs-prog-hd` | `<div>` | Progress header (label + percentage) |
| `.labs-prog-bar` | `<div role="meter">` | Progress bar container with aria-valuenow |
| `.labs-prog-fill` | `<div aria-hidden>` | Animated fill (width = progress%) |
| `.labs-meta` | `<div>` | Metadata row (tool + ETA) |
| `.labs-coming` | `<article>` | Planned/coming-soon project card |

#### New Labs Components (added in `css/pages/labs.css`)

| Class | Element | Description |
|---|---|---|
| `.labs-coming-grid` | `<div role="list">` | 2-column grid for planned projects |
| `.labs-cta-section` | `<section>` | Newsletter CTA outer section |
| `.labs-nl-box` | `<div>` | Gradient newsletter container |
| `.labs-nl-form` | `<form>` | Email input + submit button flex row |
| `.labs-nl-input` | `<input type="email">` | Email input field |
| `.labs-nl-btn` | `<button type="submit">` | Notify Me submit button (uses `.btn-p`) |
| `.labs-nl-disclaimer` | `<p>` | Honest notice: backend not connected |

---



## Phase 12 — Kritexa.AI Page Components

### New Components (Kritexa.AI-specific)

All Kritexa.AI component classes use the `.kai-*` prefix inherited from the legacy design system and defined in `css/components.css`.

#### Hero Components (`.kai-hero`, `.kai-heading`, `.kai-sub`, `.kai-countdown`, `.kai-waitlist`)

| Class | Element | Description |
|---|---|---|
| `.kai-hero` | `<section>` | Hero section — radial gradient bg, ambient orbs, grid overlay |
| `.kai-orb` / `.kai-orb1` / `.kai-orb2` | `<div aria-hidden>` | CSS gradient orbs — decorative drift animation |
| `.kai-grid` | `<div aria-hidden>` | CSS linear-gradient grid — cyan tint, masked |
| `.kai-badge-row` | `<div>` | Flex row: LABS pill + arrow + AI pill |
| `.kai-ai-pill` | `<span aria-hidden>` | Cyan AI brand pill badge |
| `.kai-ai-dot` | `<span aria-hidden>` | Cyan blinking dot inside AI pill |
| `.kai-arrow-badge` | `<span aria-hidden>` | Muted arrow between LABS and AI pill |
| `.kai-heading` | `<h1>` | Hero H1 — clamp(40px,7vw,80px), weight 900 |
| `.kai-grad` | `<span>` | Gradient shimmer on heading text |
| `.kai-sub` | `<p>` | Hero description — clamp(16px,2vw,20px) |
| `.kai-countdown` | `<div role="timer">` | 4-box countdown to launch date |
| `.kai-cd-box` | `<div>` | Individual time unit box (days/hours/mins/secs) |
| `.kai-cd-num` | `<div>` | Large number display (JetBrains Mono, gradient) |
| `.kai-cd-lbl` | `<div>` | Unit label (DAYS/HOURS/MINUTES/SECONDS) |
| `.kai-cd-sep` | `<div aria-hidden>` | Colon separator between boxes |
| `.kai-waitlist` | `<div>` | Waitlist form wrapper |
| `.kai-wl-inner` | `<form>` | Native form element — action="#" |
| `.kai-wl-label` | `<div>` | Waitlist label text (monospace uppercase) |
| `.kai-wl-form` | `<div>` | Flex row: input + button |
| `.kai-wl-input` | `<input type="email">` | Email input field |
| `.kai-wl-btn` | `<button type="submit">` | Cyan gradient submit button |
| `.kai-wl-note` | `<div role="status">` | Status region for form feedback (aria-live="polite") |
| `.kai-wl-disclaimer` | `<p>` | Honest notice: backend not connected (Phase 12 addition) |

#### Feature Card Components (`.kai-features`, `.kai-feat`)

| Class | Element | Description |
|---|---|---|
| `.kai-features-sec` | `<section>` | Features section wrapper |
| `.kai-sec-label` | `<div aria-hidden>` | Section eyebrow (monospace, cyan) |
| `.kai-sec-h` | `<h2>` | Section heading |
| `.kai-features` | `<div role="list">` | 3-column feature grid |
| `.kai-feat` | `<article role="listitem">` | Individual feature card |
| `.kai-feat-icon` | `<span aria-hidden>` | Emoji icon |
| `.kai-feat-status` | `<div>` | Development status indicator |
| `.kai-status-dot` | `<span aria-hidden>` | Blinking status indicator dot |
| `.kai-status-plan` | modifier | Applied to planned (not in-dev) status |
| `.kai-dot-plan` | modifier | Grey (not pulsing) dot for planned status |
| `.kai-feat-h` | `<h3>` | Feature card title |
| `.kai-feat-p` | `<p>` | Feature description |
| `.kai-feat-tags` | `<ul>` | Feature tag list (Phase 12: upgraded from `<div>`) |
| `.kai-ftag` | `<li>` | Individual feature tag (Phase 12: upgraded from `<span>`) |
| `.kai-feat-prog` | `<div role="meter">` | Progress bar container — aria-valuenow/min/max |
| `.kai-feat-prog-bar` | `<div aria-hidden>` | Animated progress fill |
| `.kai-prog-plan` | modifier | White translucent bar for planned features |
| `.kai-feat-prog-label` | `<div>` | "XX% Complete · ETA Q# 202X" text |

#### Stats Components (`.kai-stats-sec`, `.kai-stats`)

| Class | Element | Description |
|---|---|---|
| `.kai-stats-sec` | `<section>` | Stats section wrapper |
| `.kai-stats` | `<div role="list">` | Horizontal flex stats container |
| `.kai-stat` | `<div role="listitem">` | Individual stat |
| `.kai-stat-n` | `<div>` | Stat number (gradient text, monospace weight) |
| `.kai-stat-l` | `<div>` | Stat label (monospace, uppercase, muted) |
| `.kai-stat-div` | `<div aria-hidden>` | Vertical divider (hidden on mobile) |

#### CTA Components (`.kai-cta-section`, `.kai-cta-inner`, `.kai-cta-btns`)

| Class | Element | Description |
|---|---|---|
| `.kai-cta-section` | `<section>` | Page-level CTA section |
| `.kai-cta-inner` | `<div>` | Centered max-width container |
| `.kai-cta-btns` | `<div>` | CTA button row (flex, wraps at ≤768px) |

**Note**: `.kai-cta-section`, `.kai-cta-inner`, `.kai-cta-btns` are defined in `css/pages/kritexa-ai.css` (not `components.css`) — scoped to Kritexa.AI page only.

---



## Phase 11 — Contact Page Component Inventory

### Contact Hero Section (`src/sections/contact/hero.html`)
- **Section landmark**: `<section class="contact-hero-section" aria-labelledby="contact-h1">`
- **H1**: `<h1 id="contact-h1">Let's Build Something<span class="grad-text">Remarkable</span>Together</h1>` — visible HTML text (one H1)
- **Kicker**: `.con-kicker` — monospace pill, `aria-hidden="true"` (decorative)
- **Stats strip**: `.con-stats` — 3 marketing stats from approved legacy source
- **Hero background**: `.con-hero-bg` — CSS background, overridden to `/assets/images/contact-hero.jpg` by `css/pages/contact.css`
- **Floating badges**: `.con-hero-badge` × 3 — all `aria-hidden="true"`, hidden on mobile via CSS

### Contact Form Section (`src/sections/contact/contact-form.html`)
- **Section landmark**: `<section class="con-form-sec contact-form-section" aria-labelledby="contact-form-heading">`
- **H2**: `<h2 id="contact-form-heading">Start the Conversation</h2>` (visible)
- **Contact options**: `.c-links` with `role="list"` — 4 contact option cards
  - WhatsApp: `<a href="https://wa.me/91XXXXXXXXXX">` — PLACEHOLDER destination
  - Email: `<a href="mailto:contact@kritexalabs.com">` — verified approved source
  - Office: non-clickable `<div class="c-link">` — from approved legacy source
  - Response time: non-clickable `<div class="c-link">` — from approved legacy source
- **Form**: `<form id="contact-inquiry-form" action="#" method="post" novalidate>`
  - `action="#"` — backend NOT connected (Phase 21)
  - `novalidate` on form to allow custom validation message approach
  - H3: `<h3>Send Us a Message</h3>`
  - 5 fields: name (text, required), phone (tel, optional), email (email, required), service (select, required), message (textarea, required)
  - All fields: `<label for="...">` properly associated via `for` + `id`
  - `autocomplete` attributes: `name`, `tel`, `email` where applicable
  - Submit: `<button type="submit">` (not div, not onclick)
  - Notice: `.contact-form-notice` — honest "not connected" message

### Contact FAQ Section (`src/sections/contact/faq.html`)
- **Section landmark**: `<section class="contact-faq-section section-sm" aria-labelledby="contact-faq-heading">`
- **H2**: `<h2 id="contact-faq-heading">Common Questions</h2>` (visible)
- **Wrap**: `<div class="faq-wrap rv" role="list">` — 4 FAQ items
- **Items**: `<div class="faq-item" role="listitem">` per item
- **Buttons**: `<button class="faq-btn" type="button" aria-expanded="false" aria-controls="contact-faq-ans-0N">` — prefixed IDs prevent collision with case-studies FAQ IDs
- **Panels**: `<div class="faq-ans" id="contact-faq-ans-0N" role="region">` — answer panels
- **JS**: FAQ managed by `js/global.js` `toggleFaq()` — no page-specific JS

### Contact CTA Section (`src/sections/contact/cta.html`)
- **Section landmark**: `<section class="contact-cta-section section-sm" aria-labelledby="contact-cta-heading">`
- **H2**: `<h2 id="contact-cta-heading">Let's Engineer Your Growth System</h2>` (visible)
- **CTAs**: WhatsApp → `wa.me/91XXXXXXXXXX` (PLACEHOLDER), View Our Work → `/portfolio`

### Contact Form Field Inventory

| Field | Type | ID | Name | Required | Autocomplete | Validation |
|---|---|---|---|---|---|---|
| Your Name | `text` | `f-name` | `name` | Yes | `name` | `minlength="2"`, `maxlength="80"` |
| Phone / WhatsApp | `tel` | `f-phone` | `phone` | No | `tel` | `maxlength="20"` |
| Email Address | `email` | `f-email` | `email` | Yes | `email` | `maxlength="120"` |
| What Do You Need? | `select` | `f-service` | `service` | Yes | — | Native select required |
| Tell Us About Your Business | `textarea` | `f-msg` | `message` | Yes | — | `minlength="20"`, `maxlength="2000"` |

---



## Phase 10 — Case Studies Page Component Updates

### Case Studies Hero Section (`src/sections/case-studies/hero.html`)
- **H1**: `<h1 id="cs-h1">Case <span class="grad-text">Studies</span></h1>` — visible HTML text
- **Section landmark**: `<section class="iph cs-hero-section" aria-labelledby="cs-h1">`
- **Stats strip**: `.cs-hero-stats` with `role="list"` — 4 static stats (no JS counter animation)
- **Pattern**: Extends existing `.iph` inner page hero with `.cs-hero-section` override for padding

### Case Studies Featured Section (`src/sections/case-studies/featured.html`)
- **Section landmark**: `<section class="section-sm cs-featured-section" aria-labelledby="cs-featured-heading">`
- **Section heading**: `<h2 id="cs-featured-heading" class="sr-only">Featured Case Study</h2>`
- **Card**: `<article class="cs-feat rv" aria-labelledby="cs-feat-title">` — semantic article
- **H3**: `<h3 id="cs-feat-title">` — featured case study title
- **Flow**: `.cs-flow` with 3 `<div class="cf-s">` items — `<h4>` per step (H4 is below H3 in hierarchy)
- **Metrics**: `.cs-feat-mets` with `role="list"` — 4 static metric items
- **No link**: No external URL exists — card is a non-linked preview (AD-045)

### Case Studies Grid Section (`src/sections/case-studies/studies.html`)
- **Section landmark**: `<section class="section cs-studies-section" aria-labelledby="cs-studies-heading">`
- **Section heading**: `<h2 id="cs-studies-heading" class="sr-only">Case Studies</h2>`
- **Filter navigation**: `<nav class="cs-filters rv" aria-label="Filter case studies by type">`
  - `<div class="cs-filter-group" role="group" aria-labelledby="cs-filter-label">`
  - `<button class="cs-filter-btn" type="button" aria-pressed="true|false">` — native buttons, visual only
  - No filtering JS in Phase 10 (AD-047)
- **Grid**: `<div class="cs-grid" role="list" aria-label="Case studies">` — 3-col → 2-col → 1-col responsive
- **Cards**: 6 `<article class="cs-card rv" role="listitem" aria-labelledby="cs-title-0N">` elements
- **H3**: `<h3 class="cs-title" id="cs-title-0N">` per card
- **No links on cards**: `.cs-arr` is a decorative `<div>`, not `<a>` (AD-045)
- **Technologies**: `<div class="cs-svc-row" aria-label="Technologies">` with `<span class="cs-svc">`
- **Metrics**: `<div class="cs-mets" role="list" aria-label="Results">` per card

### Case Studies FAQ Section (`src/sections/case-studies/faq.html`)
- **Section landmark**: `<section class="section-sm cs-faq-section" aria-labelledby="cs-faq-heading">`
- **H2**: `<h2 id="cs-faq-heading">Frequently Asked <span class="grad-text">Questions</span></h2>` (visible)
- **Wrap**: `<div class="faq-wrap rv" role="list">` — 6 FAQ items
- **Items**: `<div class="faq-item" role="listitem">` per item
- **Button**: `<button class="faq-btn" type="button" aria-expanded="false" aria-controls="faq-ans-0N">` — native button
- **Panel**: `<div class="faq-ans" id="faq-ans-0N" role="region">` — answer panel
- **JS**: FAQ managed by `js/global.js` `toggleFaq()` — no page-specific JS (AD-046)

### Case Studies CTA Section (`src/sections/case-studies/cta.html`)
- **Section landmark**: `<section class="cs-cta-section section-sm" aria-labelledby="cs-cta-heading">`
- **H2**: `<h2 id="cs-cta-heading">Ready to Be Our Next <span class="grad-text">Case Study?</span></h2>` (visible)
- **CTAs**: Start Your Project → `/contact`, View Our Work → `/portfolio`

### Case Study Card Structure (CMS-ready future model)

All 6 case study cards follow an identical semantic structure:
```html
<article class="cs-card rv"
         role="listitem"
         aria-labelledby="cs-title-0N">
  <div class="cs-thumb cst-[1|2|3]" aria-hidden="true">
    <span aria-hidden="true">[emoji]</span>
    <div class="cs-ind">[Category]</div>
    <div class="cs-res">[Key Result Headline]</div>
  </div>
  <div class="cs-body">
    <div class="cs-svc-row" aria-label="Technologies">
      <span class="cs-svc">[Technology]</span>
    </div>
    <h3 class="cs-title" id="cs-title-0N">[Case Study Title]</h3>
    <p>[Description]</p>
    <div class="cs-foot">
      <div class="cs-mets" role="list" aria-label="Results">
        <div role="listitem">
          <div class="cs-met-v">[Metric]</div>
          <div class="cs-met-l">[Label]</div>
        </div>
      </div>
      <!-- No link in Phase 10 — decorative arrow only -->
      <div class="cs-arr" aria-hidden="true">→</div>
    </div>
  </div>
</article>
```

Fields present: category, key-result-headline (thumb), services/tech, title, description, metrics (3), arrow (decorative).
Fields absent (future CMS): clientName, challenge, approach, solution, implementation, testimonial, externalUrl, year, featured, slug, image, gallery.

---


## Phase 9 — Portfolio Page Component Updates

### Portfolio Hero Section (`src/sections/portfolio/hero.html`)
- **H1**: `<h1 id="portfolio-h1">Projects That <span class="grad-text">Deliver Results</span></h1>` — visible HTML text
- **Section landmark**: `<section class="iph pf-hero-section" aria-labelledby="portfolio-h1">`
- **Stats strip**: `.pf-hero-stats` with `role="list"` — 4 animated stat counters
- **Stat animation**: `data-count` attributes on `.pf-hstat-num` — animated by `js/pages/portfolio.js`
- **Pattern**: Extends existing `.iph` hero with `.pf-hero-section` override for padding

### Portfolio Filters Section (`src/sections/portfolio/filters.html`)
- **Section landmark**: `<section class="pf-filter-sec" aria-label="Filter projects">`
- **Category buttons**: `<div class="pf-filters" id="pf-cat-filters" role="group" aria-labelledby="pf-cat-label">`
- **Type buttons**: `<div class="pf-type-tabs" id="pf-type-filters" role="group" aria-labelledby="pf-type-label">`
- **All buttons**: Native `<button>` — no onclick divs — `data-filter-type` + `data-filter-value` attributes
- **Accessible state**: `aria-pressed="true|false"` managed by `js/pages/portfolio.js`

### Portfolio Projects Section (`src/sections/portfolio/projects.html`)
- **Section landmark**: `<section class="pf-section" aria-labelledby="pf-section-heading">`
- **Section heading**: `<h2 id="pf-section-heading" class="sr-only">Portfolio Projects</h2>` — visually hidden
- **Grid**: `<div class="pf-grid" id="pf-project-grid" role="list">` — 2-col on desktop, 1-col on mobile
- **Cards**: 12 `<article class="pf-card rv" data-category="..." data-type="..." role="listitem" aria-labelledby="pf-title-NN">` elements
- **Count bar**: `<div class="pf-count-bar" aria-live="polite" aria-atomic="true">` — updated by portfolio.js
- **Technology lists**: `<ul class="pf-techs">/<li>` — proper list semantics
- **CTAs**: `<a class="pf-view-btn" href="/contact">` — real anchors, no onclick — descriptive aria-label

### Portfolio CTA Section (`src/sections/portfolio/cta.html`)
- **Section landmark**: `<section class="pf-cta-section section-sm" aria-labelledby="pf-cta-heading">`
- **H2**: `<h2 id="pf-cta-heading">Have a Project in Mind?</h2>` — visible
- **CTAs**: Start Your Project → `/contact`, View Capabilities → `/capabilities`

### Portfolio Card Structure (CMS-ready pattern)

All 12 project cards follow an identical semantic structure:
```html
<article class="pf-card rv"
         data-category="[Category]" data-type="[Type]"
         role="listitem"
         aria-labelledby="pf-title-NN">
  <div class="pf-img-wrap">
    <img src="/assets/images/portfolio-placeholder.jpg" alt="[descriptive]" class="pf-img" loading="lazy">
    <span class="pf-img-num" aria-hidden="true">NN</span>
    <span class="pf-cat-badge pf-cat-[color]" aria-hidden="true">[Category]</span>
  </div>
  <div class="pf-details">
    <div class="pf-top-row">
      <div class="pf-tags" aria-label="Project tags">…</div>
      <div class="pf-meta-group">
        <span class="pf-type-badge pf-type-[website|software]">…</span>
        <span class="pf-year">2026</span>
      </div>
    </div>
    <h3 class="pf-name" id="pf-title-NN">[Project Name]</h3>
    <p class="pf-desc">…</p>
    <div class="pf-results" aria-label="Project results">…</div>
    <div class="pf-tech-row">
      <ul class="pf-techs" aria-label="Technologies used">…</ul>
    </div>
    <a class="pf-view-btn" href="/contact" aria-label="Start a similar project — [Name]">…</a>
  </div>
</article>
```

Fields present: category, type, image (placeholder), num, tags, type badge, year, name, description, results (3 metrics), technologies, CTA.

---


## Phase 8 — Capabilities Page Component Updates

### Capabilities Hero Section (`src/sections/capabilities/hero.html`)
- **H1**: Visible HTML text — "Our Full Capabilities" with `.grad-text` span
- **Landmark**: `<section class="iph" aria-labelledby="cap-h1">`
- **CTA**: `<a href="/contact">Get Free Consultation →</a>` — real anchor, no onclick
- **Pattern**: Uses existing `.iph` inner page hero styles from `css/components.css`

### Services Section (`src/sections/capabilities/services.html`)
- **Hero card**: `<article class="cap-hero-card rv" aria-labelledby="cap-hc-title">` — semantic article
- **Service cards**: `<a class="cap-svc-card cap-[color]" href="/contact">` — card-as-link (AD-036)
- **Card grids**: Two `<div class="cap-cards-grid" role="list">` — row 1 (purple/cyan/green) + row 2 (orange/pink/teal)
- **Checklists**: `<ul>/<li>` with `aria-label` (upgraded from `<div>`)
- **Section heading**: `<h2 id="cap-svc-heading" class="sr-only">Our Services</h2>` — visually hidden

### Who We Serve Section (`src/sections/capabilities/who-we-serve.html`)
- **Heading**: `<h2 id="who-serve-h2">Built for Real Businesses</h2>` (visible)
- **Grid**: `<ul class="industry-grid rv" role="list" aria-label="Industries we serve">`
- **Tiles**: `<li class="stat-box cap-industry-tile" role="listitem">` — informational, not links
- **8 Industries**: Healthcare, Consultants, Finance, Startups, Local Business, Education, E-Commerce, Personal Brands

### Industry Solutions Section (`src/sections/capabilities/industry-solutions.html`)
- **Divider pill**: `.cap-industry-divider` / `.cap-divider-pill` — decorative pill separator, `aria-hidden="true"`
- **Section heading**: `<h2 id="industry-solutions-h2" class="sr-only">Industry Solutions</h2>`
- **8 solution rows**: `<article class="sol-row rv" aria-labelledby="sol-h-0N">` per industry
- **Headings**: `<h2 class="sol-h" id="sol-h-0N">` per solution (AD-037)
- **Feature lists**: `<ul class="sol-feats">/<li>` with `aria-label` (upgraded from `<div>`)
- **Tags**: `<div class="sol-tags" aria-label="Included capabilities">` — informational spans
- **CTAs**: `<a class="sol-btn" href="/contact">Get This Solution →</a>` — real anchors

### Capability Card Structure (CMS-ready pattern)

All 6 capability cards follow an identical semantic structure:
```html
<a class="cap-svc-card cap-[color] rv" href="/contact"
   role="listitem" aria-label="[Name] — get this capability">
  <div class="cap-card-top">
    <span class="cap-card-icon" aria-hidden="true">[emoji]</span>
    <div class="cap-card-arrow" aria-hidden="true">↗</div>
  </div>
  <h3 class="cap-card-title">[Name]</h3>
  <p class="cap-card-desc">[Description]</p>
  <ul class="cap-card-svcs" aria-label="Included services">
    <li class="cap-card-svc">…</li>
  </ul>
  <div class="cap-card-badges" aria-label="Technology highlights">
    <span class="cap-card-badge">…</span>
  </div>
</a>
```

Fields present: icon, title, description, services (checklist), badges, CTA (card link).

---


## Phase 7 — About Page Component Updates

### About Hero Section (`src/sections/about/hero.html`)
- **H1**: Visible HTML text — "We Think in Systems, Not Pages" with `.grad-text` span
- **Background image**: CSS `background-image` on `.about-fs-hero-bg` — overridden to `/assets/images/about-hero.jpg` via `css/pages/about.css`
- **CTAs**: `<a href="/contact">Work With Us →</a>` and `<a href="/career">Join the Team ↗</a>` — real links, no onclick
- **Floating badges**: `.about-fs-badge` elements — `aria-hidden="true"`, hidden at ≤ 768px
- **Scroll hint**: `.about-fs-scroll` — `aria-hidden="true"`, hidden at ≤ 768px
- **Stats**: `.about-fs-stats` with `aria-label="Company statistics"` — three static stat divs (50+/30+/8)
- **Landmark**: `<section aria-label="About Kritexa Labs hero">`

### Mission/Vision Section (`src/sections/about/mission-vision.html`)
- Two `<article class="b-card rv about-mv-card">` elements in `.about-mv-grid`
- Each card uses `aria-labelledby` pointing to its `<h3>` id
- Visually hidden `<h2 class="sr-only">` provides landmark context
- Section uses `aria-labelledby="about-mv-heading"`

### Values Section (`src/sections/about/values.html`)
- Six `<article class="val-card rv">` elements in `.val-grid`
- `role="list"` on `.val-grid`, `role="listitem"` on each `.val-card`
- Each card `aria-labelledby` points to its `<h3>` id
- Section uses `aria-labelledby="about-values-h2"`
- `.val-icon-wrap` content is `aria-hidden="true"` (decorative icons)

---


> **Phase 6 Update** — Home page sections are now documented below. See `src/sections/home/` for source files.

## Phase 6 — Home Page Component Updates

### Hero Section (`src/sections/home/hero.html`)
- **H1**: Visually-hidden `.jk-sr-h1` — provides real H1 for SEO/screen readers. See AD-031.
- **Canvas**: `#jkCanvas` / `#jkOffCanvas` — BUSINESS glow animation. `aria-hidden="true"`.
- **CTAs**: `<a href="/contact">` (Start Your Project), `<a href="/portfolio">` (View Our Work) — real links, no onclick.
- **Landmark**: `<section aria-labelledby="home-h1">`

### Testimonials (`src/sections/home/testimonials.html`)
- Upgraded from `<div class="t-card">` to `<blockquote>` with `<footer>` semantic structure.
- Duplicate set has `aria-hidden="true"` to prevent screen reader double-reading.

### Case Study Cards (`src/sections/home/case-studies-preview.html`)
- Each card wrapped in `<article>` with `<a href="/case-studies">`.
- `.cs-card-link` class resets link styles (defined in `css/pages/home.css`).

### Service Cards (`src/sections/home/services.html`)
- `.cap-svc-card` elements are now `<a href="/capabilities">` links.
- `a.cap-svc-card` selector in `css/pages/home.css` ensures display:flex is preserved.
- `.cap-hero-card` is also an `<a href="/capabilities">` block link.

### Stats Strip (`src/sections/home/stats.html`)
- `.stat-box-val[data-count]` animated by `js/pages/home.js` (not `js/global.js`).
- Appends "+" suffix after count completes.

---


# Component Inventory

All reusable UI components identified in `index.html`.

---

## Global / Shared Components

### Cursor (`#cur`, `#cur-r`)
- Custom cursor dot + trailing ring
- `position: fixed; z-index: 9999`
- `display: none` on touch devices (`@media(hover:none)`)
- Animates via `requestAnimationFrame`

### Ambient Background Blobs (`.amb-blob`)
- 3 blurred radial gradient orbs: `.ab1` (purple, top-right), `.ab2` (cyan, bottom-left), `.ab3` (purple, center)
- `position: fixed; filter: blur(120px)`
- Animated via `@keyframes amb`

### Noise Texture (`.body::before`)
- Inline SVG feTurbulence noise
- `position: fixed` full-page overlay

---

## Navigation Components

### Navbar (`.navbar`)
- Logo + Center pill nav + Right CTA buttons
- Fixed, 74px height, backdrop blur on scroll
- Dynamic collapse via JavaScript

### Nav Link (`.nav-link`)
- Pill-shaped with glow effect on hover/active
- Purple radial glow below link on `.active` state

### Nav Labs Pill (`.nav-labs-pill`)
- Purple tinted pill with cyan blinking dot
- Links to Labs page

### Kritexa.AI Pill (`.nav-kai-pill`)
- Cyan tinted pill with glowing dot
- Links to Kritexa.AI page

### CTA Button Ghost (`.btn-nav-ghost`)
- Transparent with border
- CSS class defined but not used in current navbar HTML

### CTA Button Solid (`.btn-nav-solid`)
- Dark purple gradient "Start Project →"

### Hamburger (`.nav-ham`)
- 3-bar → X animation on `.open`
- Hidden desktop, visible ≤ 768px

### Mobile Nav Drawer (`.nav-mob`)
- Full-width panel below navbar
- Black frosted glass, flex column

---

## Button Components

### Primary Button (`.btn-p`)
- Purple background, `border-radius: 10px`
- Glow shadow on hover, `translateY(-2px)`

### Ghost Button (`.btn-g`)
- Transparent with border, hover → purple tint

### Button Arrows (`.btn-icon`)
- `→` icon, `translateX(3px)` on parent hover

### JK Primary Button (`.jk-btn-primary`)
- Pill shape (`border-radius: 100px`), purple gradient
- Used only on Home hero

### JK Ghost Button (`.jk-btn-ghost`)
- Pill shape, transparent with white border
- Used only on Home hero

### WhatsApp Button (`.btn-wa`)
- Green gradient (`#25D366 → #128C7E`)

### Email Button (`.btn-email`)
- Transparent with border

### Nav Subscribe Button (`.f-nl-btn`)
- Dark purple gradient, 3D box shadow

### Submit Button (`.btn-sub`)
- Full-width purple gradient, used in contact form

### Solution CTA Button (`.sol-btn`)
- Multiple variants across pages
- Defined twice with different styling (possible conflict)

---

## Card Components

### Service Card (`.svc-item`)
- In 3-col grid with `background: var(--border)` gap lines
- Icon wrap + number + title + description + tags + hover link

### Bento Card (`.b-card`)
- Feature cards grid, 3-col
- `.b-wide` spans 2 columns, `.b-tall` spans 2 rows
- `background: var(--bg2)` with purple hover border

### Case Study Card (`.cs-card`)
- Image thumbnail + body + metrics + arrow
- 3 color variants for thumbnail backgrounds (cst-1, cst-2, cst-3)
- `translateY(-5px)` on hover

### Testimonial Card (`.t-card`)
- Stars + italic quote + author with initials avatar
- Fixed width 320px, used in auto-scrolling track

### Stat Box (`.stat-box`)
- Large gradient value + label + subtitle
- Used in 4-col stats grid

### Why Card (`.why-card`)
- Purple top border glow on hover
- Used on About page (but in current code `.why-grid` may be unused — About page uses `.val-card` instead)

### Value Card (`.val-card`)
- Centered icon with 3D icon wrapper (ring, bg circle, icon)
- 3D lift on hover with `cubic-bezier(0.34,1.56,0.64,1)`
- Purple glow line on top edge on hover

### Job Card (`.job-card`)
- Complex card with header, title row, description sections, info grid, tech tags, footer
- Single instance on Career page

### Benefit Card (`.ben-card`)
- Simple card with emoji icon, title, description

### Labs Card (`.labs-card`)
- Status pill + body with progress bar + metadata
- 2 states: `.ls-act` (green) and `.ls-soon` (amber)

### Labs Coming Card (`.labs-coming`)
- Status pill + title + description + metadata

### Cap Hero Card (`.cap-hero-card`)
- Large spanning hero service card with glow orb
- On Capabilities page and Home services section

### Cap Service Card (`.cap-svc-card`)
- 6 color theme variants (purple, cyan, green, orange, pink, teal)
- Icon with drop shadow, arrow, title, description, checklist, badges
- 3D lift on hover

### Portfolio Card (`.pf-card`)
- Image with overlays + details panel
- Filter by category + type via JavaScript
- Number badge + category color badge on image

### Featured Case Study Card (`.cs-feat`)
- Large 2-col layout: description + metrics grid
- Below: 3-step flow visualization (`.cs-flow`)

### Portfolio Stats Box (`.ps-box`)
- Simplified stat box for portfolio page header strip

### Solution Image Box (`.sol-img`)
- Contains `<img>` with hover overlay CTA on Capabilities page
- Image fills with `object-fit: cover`

### Solution Content Box (`.sol-content-box`)
- Semi-transparent dark card with text content
- Pairs with `.sol-img` in alternating rows

### Contact Link (`.c-link`)
- Icon + label + value row
- 3D "no-border" shadow style
- `translateX(5px)` on hover

### Contact Form Card (`.cf`)
- 3D shadow box, 2-column row layout

### Kritexa.AI Feature Card (`.kai-feat`)
- Icon + status + title + description + tags + progress bar
- Cyan hover border

### Kritexa.AI Countdown Box (`.kai-cd-box`)
- Monospace number + label

---

## Section Components

### Section Heading (`.sh`)
- Eyebrow (JetBrains Mono, with decorative lines before/after) + H2 + description
- Center-aligned

### Inner Page Hero (`.iph`)
- Eyebrow + H1 + description + optional CTA buttons
- Top padding `140px 0 72px`
- Radial gradient background

### Marquee (`.marquee-sec`)
- Scrolling industry list with fade edges
- Pauses on hover

### Process Section (`.proc-section`)
- Desktop: Horizontal 7-step grid with spine line
- Mobile: Orbital SVG layout (JavaScript-computed)

### Process Step — Desktop (`.ph-top`, `.ph-bottom`, `.ph-circ-cell`)
- Grid-based layout, alternating top/bottom labels
- Animated spine sweep effect

### Orbital Process (`.proc-orb-wrap`)
- SVG connector lines + circular process node pills
- Center orb with Kritexa Labs branding
- Animated spinning dashed ring

### Global CTA Section (`.gcta`)
- Centered gradient box with heading + 3 CTA buttons
- Duplicated on all pages

### FAQ Section
- `.faq-wrap` + `.faq-item` accordion
- Max height transition on `.open`

### Footer — Newsletter Strip (`.f-nl-box`) — Phase 5 Updated
- "Stay updated" text + email `<input>` + submit `<button>` inside `<form>`
- No `onclick` JavaScript — uses standard HTML form submission
- Newsletter endpoint placeholder — wire to real service in Phase 21

### Footer — Main Grid (`.f-main-grid`) — Phase 5 Updated
- Left: `<nav>` with 4-column link grid (`.f-links-box`) + copyright strip
- Right: Brand card (`.f-brand-box`) + Powered by box (`.f-powered-box`)
- Columns: Main Pages | Our Work | Services | Legal
- Legal column uses `<span class="f-link-pending">` for non-existent pages (Phase 21)

### Footer — Navigation Columns (`.f-col`)
- Each column has a `.f-col-label` (monospace, uppercase) + `.f-col-links` list
- `aria-labelledby` links each `<ul>` to its heading

### Social Icons Row (`.f-socials`) — Phase 5 Updated
- 6 icon `<a>` buttons with platform-specific hover colors
- Each has `aria-label="Kritexa Labs on [Platform]"` (accessible text)
- All use `target="_blank" rel="noopener noreferrer"`
- `role="list"` + `role="listitem"` for semantic grouping
- SVGs have `aria-hidden="true" focusable="false"`

### Footer — Legal Link Placeholders (`.f-link-pending`)
- Non-clickable `<span>` elements for Privacy Policy, Terms, Cookie Policy
- Styled muted/disabled (opacity 0.55, cursor: default)
- `title="Coming in a future release"` for tooltip context
- Will be replaced with `<a href>` links when legal pages are created (Phase 21)

### Footer — Kritexa.AI Link (`.f-link-kai`)
- Cyan color matching brand identity
- Real `<a href="/kritexa-ai">` link

### Footer — Labs Link (`.f-link-labs`)
- Purple2 accent color
- Real `<a href="/labs">` link (footer-only page)

---

## Background / Decorative Elements

### Ambient Hero Grid (`.jk-grid`, `.kai-grid`)
- CSS `background-image` repeating purple grid lines
- `mask-image` to fade edges

### Ambient Orbs (`.jk-orb`, `.kai-orb`)
- Large blurred radial gradients floating in hero sections

### Hero Glow Ring (`.hero-glow-ring`)
- `position: absolute` radial gradient behind hero card

### Glow Elements (`.b-glow`)
- Absolute-positioned bottom-right radial glow in bento cards

### Section Divider
```html
<div style="flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(124,58,237,0.3),transparent);"></div>
```
Used inline in Capabilities page before solutions section.

### About Hero Fullscreen Image Box (`.about-fs-hero`)
- Full viewport height rounded box with background image + gradient overlay
- Floating badges on right side of image

### Contact Hero Fullscreen (`.con-hero`)
- Half-screen rounded-bottom box with background image
- Bottom fade into form section below
