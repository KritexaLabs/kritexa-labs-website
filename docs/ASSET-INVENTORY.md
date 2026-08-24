
## Phase 16 — Performance Audit Asset Changes

### Base64 Assets Removed from CSS

| Asset | Previously in | Removed | External File |
|-------|--------------|---------|---------------|
| About hero background (~230 KB base64) | `css/components.css` `.about-fs-hero-bg` | ✅ Phase 16 | `assets/images/about-hero.jpg` |
| Contact hero background (~164 KB base64) | `css/components.css` `.con-hero-bg` | ✅ Phase 16 | `assets/images/contact-hero.jpg` |

### Retained SVG Data URIs

| Asset | Location | Size | Reason |
|-------|----------|------|--------|
| Noise texture SVG | `css/utilities.css` `body::before` | ~300 bytes | Too small to justify external request |
| Noise texture SVG | `css/components.css` `.jk-noise` | ~300 bytes | Same rationale |

### Image Loading Attributes (Phase 16 Updates)

| Image | `fetchpriority` | `decoding` |
|-------|----------------|-----------|
| `solution-01.jpg` | `high` ✅ NEW | `async` ✅ NEW |
| `portfolio-placeholder.jpg` (card 01) | `high` ✅ NEW | `async` ✅ NEW |
| `portfolio-placeholder.jpg` (card 02) | — | `async` ✅ NEW |

### Preload Hints Added

| Page | Image | Hint |
|------|-------|------|
| About | `about-hero.jpg` | `<link rel="preload" as="image" fetchpriority="high">` |
| Contact | `contact-hero.jpg` | `<link rel="preload" as="image" fetchpriority="high">` |

---



## Phase 13 — Career & Labs Page Asset Usage

### Career — No Images

The Career page uses **zero raster images**. All visual elements use existing CSS component classes:

| Visual Element | Implementation |
|---|---|
| Benefit card backgrounds | `.ben-card` — CSS border + background in `css/components.css` |
| Job card backgrounds | `.job-card` — CSS gradient border in `css/components.css` |
| Internship card background | `.intern-card` — CSS gradient in `css/components.css` |

| Asset Type | Status |
|---|---|
| Raster images | None — pure CSS |
| SVG files | None — no SVG files referenced |
| Base64 images | Zero — no base64 in `career/index.html` |
| External image files referenced | Zero |

### Labs — No Images

The Labs page uses **zero raster images**. All visual elements use existing CSS component classes:

| Visual Element | Implementation |
|---|---|
| Status board | `.labs-bar` — CSS gradient in `css/components.css` |
| Active project cards | `.labs-card` — CSS border + background in `css/components.css` |
| Progress bar fills | `.labs-prog-fill` — CSS gradient in `css/components.css` |
| Planned project cards | `.labs-coming` — CSS border + background in `css/components.css` |
| Newsletter box | `.labs-nl-box` — CSS gradient in `css/pages/labs.css` |

| Asset Type | Status |
|---|---|
| Raster images | None — pure CSS |
| SVG files | None — no SVG files referenced |
| Base64 images | Zero — no base64 in `labs/index.html` |
| External image files referenced | Zero |

### Phase 13 — No New Assets Added

No new logos, fonts, SVGs, icons, or images were introduced in Phase 13. All visual elements reuse existing component CSS or use CSS gradients/borders. The logo is loaded via shared `components/header.html` (no duplication).

---



## Phase 12 — Kritexa.AI Page Asset Usage

### Kritexa.AI — No Images

The Kritexa.AI page uses **zero raster images**. All visual elements are CSS-only:

| Visual Element | Implementation |
|---|---|
| Hero background | CSS `radial-gradient` on `.kai-hero` |
| Ambient orbs (`.kai-orb1`, `.kai-orb2`) | CSS `radial-gradient` circles with CSS animation |
| Grid overlay (`.kai-grid`) | CSS `linear-gradient` + `background-size` |
| Progress bar fills | CSS `linear-gradient` on `.kai-feat-prog-bar` |
| Stats panel background | CSS `linear-gradient` on `.kai-stats` |
| Feature card backgrounds | CSS `linear-gradient` on `.kai-feat` |

| Asset Type | Status |
|---|---|
| Raster images | None — pure CSS |
| SVG files | None — no SVG files referenced |
| Base64 images | Zero — no base64 in `kritexa-ai/index.html` |
| External image files referenced | Zero |

### Phase 12 — No New Assets Added

No new logos, fonts, SVGs, icons, or images were introduced in Phase 12. All decorative elements use CSS (gradients, animations) or emoji characters. The logo is loaded via shared `components/header.html` (no duplication).

### Kritexa.AI Image Opportunity (Future Work)

If Kritexa.AI transitions from a "coming soon" page to an active product page, the following assets may be needed:
- Product dashboard screenshot or mockup (approved, not fabricated)
- Open Graph image for social sharing of `/kritexa-ai` (Phase 17)
- Any future integration logos (only with verified partnership approval)

---



## Phase 11 — Contact Page Asset Usage

### Contact Hero Image — Previously Extracted (Phase 1), Used in Phase 11

| Property | contact-hero |
|---|---|
| File path | `/assets/images/contact-hero.jpg` |
| Format | JPEG |
| File size | 123.1 KB |
| Usage | Contact page hero section — CSS `background-image` via `.contact-hero-section .con-hero-bg` |
| Alt text | Set on `.con-hero-bg` via `role="img"` + `aria-label="Kritexa Labs team working on digital growth projects"` |
| Loading | NOT lazy-loaded — above-fold LCP candidate |
| Status | Extracted Phase 1 (verified in `scripts/asset-manifest.json` and `assets/images/`) |

### Base64 Cleanup Note

The `css/components.css` `.con-hero-bg` definition still contains the legacy base64 JPEG blob (~90 KB base64 text). 
`css/pages/contact.css` overrides this with the external URL for the contact page only.
The base64 blob is NOT removed from `components.css` in Phase 11 — that cleanup is Phase 16.

### Phase 11 — No New Non-Image Assets Added

No new logos, fonts, SVGs, or icons were introduced in Phase 11. All decorative elements use CSS, emoji characters, or existing design system components.

---



## Phase 10 — Case Studies Page Asset Usage

### Case Studies — No Images

The legacy case-studies section (`#page-blog`) used **CSS gradient thumbnail backgrounds** (`.cst-1`, `.cst-2`, `.cst-3`) for all case study card visuals — no raster images were embedded.

| Asset Type | Status |
|---|---|
| Case study card images | CSS gradient backgrounds only — no image files |
| Featured case study image | No image — CSS gradient from `.cs-feat` styles |
| Base64 images extracted | None (none existed) |
| External image files referenced | Zero |

### Phase 10 — No New Assets Added

No new logos, fonts, SVGs, icons, or images were introduced in Phase 10. All decorative elements use CSS (gradients) or emoji characters. The logo is loaded via shared `components/header.html`.

### Case Studies Image Opportunity (Future Work)

When individual case study detail pages are created (future phase), the following assets will be needed:
- Project screenshots or mockups (per case study)
- Featured case study hero image
- Open Graph image for `/case-studies`

All must be approved real project assets — not stock photos or fabricated screenshots.

---


## Phase 9 — Portfolio Page Asset Usage

### Portfolio Image — Extracted (Phase 9)

| Property | portfolio-placeholder |
|---|---|
| File path | `/assets/images/portfolio-placeholder.jpg` |
| Format | JPEG |
| File size | 73.4 KB |
| Industry | All portfolio categories (shared placeholder) |
| Usage | All 12 portfolio project cards |
| Alt text | Contextual per card (e.g. "MediCare Clinic project — ...") |
| Loading | Cards 01–02: no lazy-loading (above-fold candidates); Cards 03–12: `loading="lazy"` |
| Status | Placeholder — single image used for all 12 cards in approved legacy source |
| Notes | The legacy source used the same base64 image (100,192 chars ≈ 73.4 KB) for all 12 portfolio cards. This is confirmed as a placeholder. Individual project images are future work. |

### Phase 9 — No New Non-Image Assets Added

No new logos, fonts, SVGs, or icons were introduced in Phase 9. All decorative elements use CSS (gradients, shadows) or emoji characters.

---


## Phase 8 — Capabilities Page Asset Usage

### Solution Images — Newly Extracted (Phase 8)

| Property | solution-05 | solution-06 | solution-07 | solution-08 |
|---|---|---|---|---|
| File path | `/assets/images/solution-05.jpg` | `/assets/images/solution-06.jpg` | `/assets/images/solution-07.jpg` | `/assets/images/solution-08.jpg` |
| Format | JPEG | JPEG | JPEG | JPEG |
| File size | 144.7 KB | 192.5 KB | 181.8 KB | 113.8 KB |
| Industry | Local Business | Education | E-Commerce & D2C | Personal Brands |
| Usage | Capabilities sol-row 05 | Capabilities sol-row 06 | Capabilities sol-row 07 | Capabilities sol-row 08 |
| Alt text | "Local business storefront…" | "Education institute building…" | "E-commerce products display…" | "Personal brand professional photo…" |
| Loading | `loading="lazy"` | `loading="lazy"` | `loading="lazy"` | `loading="lazy"` |

### Solution Images — Previously Extracted (Phase 1), Used in Phase 8

| Property | solution-01 | solution-02 | solution-03 | solution-04 |
|---|---|---|---|---|
| File path | `/assets/images/solution-01.jpg` | `/assets/images/solution-02.jpg` | `/assets/images/solution-03.jpg` | `/assets/images/solution-04.jpg` |
| Format | JPEG | JPEG | JPEG | JPEG |
| File size | 144.7 KB | 127.0 KB | 132.4 KB | 146.9 KB |
| Industry | Healthcare | Consultants | Finance | Startups |
| Loading (Phase 8) | NOT lazy-loaded (potential LCP) | `loading="lazy"` | `loading="lazy"` | `loading="lazy"` |

### Phase 8 — No New Non-Image Assets Added

No new logos, fonts, SVGs, or icons were introduced in Phase 8. All decorative elements use CSS (gradients, shadows) or emoji characters. The logo is loaded via shared `components/header.html`.

### Asset Manifest Update

`scripts/asset-manifest.json` updated in Phase 8 to document the 4 newly extracted images (solution-05 through solution-08). Total assets extracted: 14 (10 from Phase 1 + 4 from Phase 8).

---


## Phase 7 — About Page Asset Usage

### About Hero Background Image
| Property | Value |
|---|---|
| File path | `/assets/images/about-hero.jpg` |
| Format | JPEG (extracted from base64 in Phase 1) |
| File size | 172.3 KB |
| Usage | CSS `background-image` on `.about-fs-hero-bg` |
| Reference | `css/pages/about.css` (override) — `url('/assets/images/about-hero.jpg') !important` |
| Position | `center right` (desktop), `70% center` (mobile) |
| Size | `cover` |
| Alt text | N/A (CSS background — not an `<img>` element) |
| Loading | CSS background — loaded with initial page paint |
| LCP | Candidate (above-fold hero image) |

### About Page — No New Assets Added
No new images, icons, or fonts were introduced in Phase 7.
All decorative elements use CSS (gradients, shadows) or emoji characters.
The logo is loaded via the shared `components/header.html` (no duplication).

### Legacy Base64 Override
The legacy `css/components.css` line ~1353 still contains a `data:image/jpeg;base64,...` blob
on `.about-fs-hero-bg`. This is overridden by `css/pages/about.css` (loaded after `components.css`).
The base64 blob is parsed but not rendered. Full removal is Phase 16.

---


# Asset Inventory

All assets identified in `index.html`. Since the project is a single HTML file with no external asset directory, all assets are inline.

---

## Logo

| Property | Value |
|---|---|
| Format | PNG (base64-encoded) |
| Container (navbar) | 36×36px |
| Container (footer) | 38×38px |
| Border radius | 0 (square/rectangular) |
| Background | Transparent |
| Copies in HTML | ~9 (one per page footer + navbar = duplicate per page) |
| Alt text | None |
| Data URI prefix | `data:image/png;base64,...` |
| Estimated decoded size | ~50–100 KB |

---

## Hero Background Images

### About Page Hero (`about-fs-hero-bg`)
| Property | Value |
|---|---|
| Format | JPEG (base64-encoded) |
| Usage | CSS `background-image` |
| Position | `center right` |
| Size | `cover` |
| Overlay | Dark gradient overlay (left to right, left side ~88% opacity) |
| Alt text | N/A (CSS background) |
| Estimated decoded size | ~300–500 KB |
| Copies | 1 |

### Contact Page Hero (`con-hero-bg`)
| Property | Value |
|---|---|
| Format | JPEG (base64-encoded) |
| Usage | CSS `background-image` |
| Position | `center right` |
| Size | `cover` |
| Overlay | Dark gradient overlay (left side ~92% opacity) |
| Alt text | N/A (CSS background) |
| Estimated decoded size | ~300–500 KB |
| Copies | 1 |

---

## Industry Solution / Portfolio Images

8 unique JPEG images, each used in the Capabilities page `sol-row` sections AND re-used in Portfolio page card thumbnails.

| # | Used In (Capabilities) | Used In (Portfolio) | Format | Alt Text |
|---|---|---|---|---|
| 1 | Healthcare & Clinics | MediBook Clinic (Healthcare) | JPEG base64 | ❌ None |
| 2 | Consultants & Coaches | ConsultPro (Consulting) | JPEG base64 | ❌ None |
| 3 | Finance & Advisors | FinVault Advisors (Finance) | JPEG base64 | ❌ None |
| 4 | Startups & Scale-Ups | WealthTrack Portfolio App | JPEG base64 | ❌ None |
| 5 | Local Businesses | LaunchPad SaaS | JPEG base64 | ❌ None |
| 6 | Education Institutes | TaskFlow — Project SaaS | JPEG base64 | ❌ None |
| 7 | E-Commerce & D2C | Spice Route Restaurant | JPEG base64 | ❌ None |
| 8 | Personal Brands | Various remaining cards | JPEG base64 | ❌ None |

**Note**: The portfolio has 12 cards but only ~8 unique images — some images appear to be reused across different project cards.

---

## SVG Assets

All SVGs are inline in the HTML.

### Social Media Icons (footer)
| Platform | Class | Inline SVG | Alt/Title |
|---|---|---|---|
| Instagram | `.s-ig` | ✅ Inline path | `title="Instagram"` |
| X (Twitter) | `.s-x` | ✅ Inline path | `title="X (Twitter)"` |
| LinkedIn | `.s-li` | ✅ Inline path | `title="LinkedIn"` |
| Facebook | `.s-fb` | ✅ Inline path | `title="Facebook"` |
| YouTube | `.s-yt` | ✅ Inline path | `title="YouTube"` |
| Threads | `.s-th` | ✅ Inline path | `title="Threads"` |

Each set of 6 icons is duplicated per page footer = ~54 SVG icon elements total in the DOM.

### Portfolio "View Project" Arrow SVG
```html
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
  <path d="M7 17L17 7M7 7h10v10"/>
</svg>
```
Used in all 12 portfolio cards (12 copies).

### Process Section Connector Lines and Circles
Dynamically generated via `document.createElementNS('http://www.w3.org/2000/svg', ...)` in JavaScript for the mobile orbital layout.

---

## Noise Textures

### Global body noise overlay (body::before)
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
```
- Size: ~300 bytes
- Applied globally via CSS pseudo-element
- `opacity: 0.4`

### JK Hero noise (`.jk-noise`)
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' ...");
```
- Similar feTurbulence, 512×512, slightly different frequency
- `opacity: 0.5` on element with global `opacity: .5`

---

## Canvas Elements

### BUSINESS Text Canvas (`#jkCanvas`, `#jkOffCanvas`)
- Two `<canvas>` elements on the home hero
- Sized dynamically via JavaScript to match the text element
- Renders animated bar chart data clipped to letter shapes
- `#jkOffCanvas` has `display: none` (off-screen rendering)

### Dashboard Chart Canvas (`#dashChart`)
- Inside the hero card visual (which is hidden at ≤1024px)
- Renders a small line chart with candlestick-style bars
- `~60px` height

---

## Fonts

| Family | Weights | Source | Format |
|---|---|---|---|
| Inter | 300, 400, 500, 600, 700, 800, 900 | Google Fonts CDN | WOFF2 (served by Google) |
| JetBrains Mono | 400, 500, 600 | Google Fonts CDN | WOFF2 (served by Google) |

**No local font files.** Fonts are loaded entirely from `fonts.googleapis.com` and `fonts.gstatic.com`.

---

## Emoji Assets

Emoji are used extensively as decorative icons throughout the site (not image files):

| Usage | Examples |
|---|---|
| Service card icons | 🌐 🤖 ⚙️ 📈 🛒 🛡️ |
| Process step icons | 🔍 📐 🎨 ⚡ 🧪 🚀 📊 |
| Lab project indicators | 🧠 💬 ⚡ 🔮 |
| Marquee industry labels | 🏥 🏦 🎓 🛍️ 🏢 🚀 💼 🍽️ ⚕️ 🏗️ |
| Testimonial avatars | Text initials (not emoji) |
| CTA buttons | 🚀 💬 📧 |
| Industry "Who We Serve" | 🏥 💼 📊 🚀 🏪 🎓 🛍️ ✨ |
| Values section | 🤖 🎯 🔍 ⚡ 🛡️ 🤝 |
| Footer LABS link | ✦ |
| Career job icon | (emoji in `.jb-icon`) |

Emoji rendering is system-dependent — cross-platform consistency may vary.

---

## Missing Assets

| Asset | Required For |
|---|---|
| `favicon.ico` | Browser tab, bookmarks |
| `favicon.png` (32×32, 16×16) | Modern browsers |
| `apple-touch-icon.png` (180×180) | iOS bookmark |
| `og:image` | Social media sharing cards |
| `robots.txt` | Search engine crawl control |
| `sitemap.xml` | Search engine indexing |
| `manifest.json` | PWA / Add to Home Screen |
