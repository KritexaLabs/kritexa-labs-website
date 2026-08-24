# Migration Map

> **Phase 1 Update** — This document has been updated to reflect Phase 1 progress.
> See Phase 0 content below for historical mapping.

---

## Migration Status (Post Phase 1)

### Completed in Phase 1

| Item | Status | Notes |
|------|--------|-------|
| Multi-page directory structure | ✅ Done | All 9 URL paths created |
| Build system (component composition) | ✅ Done | `scripts/build.js` |
| Shared header component | ✅ Done | `components/header.html` — real `<a href>` links |
| Shared footer component | ✅ Done | `components/footer.html` — real `<a href>` links |
| Logo extraction | ✅ Done | `assets/logos/logo.png` (50.5 KB) |
| CSS extraction | ✅ Done | `css/global.css`, `css/utilities.css`, `css/components.css` |
| JavaScript extraction | ✅ Done | 5 organized JS modules |
| All 9 pages generated | ✅ Done | See build output |
| Page source templates | ✅ Done | `src/pages/*.html` extracted from legacy |
| Legacy original preserved | ✅ Done | `legacy/index-original.html` |
| robots.txt | ✅ Done | |
| 404.html | ✅ Done | |
| Hosting guide | ✅ Done | `docs/HOSTING-GUIDE.md` |
| 10 images extracted | ✅ Done | `assets/images/` + `assets/logos/` |

### Remaining for Later Phases

| Item | Phase | Notes |
|------|-------|-------|
| Replace `onclick="go()"` with real `<a href>` links in all pages | Phase 3+ | Content still uses legacy nav |
| Navigation active state CSS | Phase 3 | Currently via `js/active-nav.js` |
| Products mega menu | Phase 4 | Placeholder exists in `components/mega-menu.html` |
| Footer final redesign | Phase 5 | Currently preserves original design |
| Home page final rebuild | Phase 6 | Current `src/pages/home.html` is legacy extract |
| CSS split (components.css → per-component files) | Phase 2 | Currently one large file |
| Base64 image references → file paths in HTML | Phase 16 | Images extracted; HTML refs not yet updated |
| Form submission wiring (real endpoints) | Phase 11/Phase 21 | Currently `alert()` placeholders |
| WhatsApp number (replace 91XXXXXXXXXX) | Phase 21 | Placeholder in footer + GCTA |
| Favicon | Phase 21 | Not yet created |
| sitemap.xml | Phase 17 | Not yet created |
| Open Graph images | Phase 17 | Not yet created |
| Legal pages (Privacy, Terms, Cookie) | Phase 21 | Footer links point to non-existent pages |
| Self-hosted fonts / font-display optimization | Phase 16 | Still using Google Fonts CDN |
| Font loading strategy | Phase 16 | No `font-display: swap` on custom properties |

---

## Page Migration Map (Updated)

| Original Virtual Page | Original Hash | New URL | Status | Notes |
|-----------------------|--------------|---------|--------|-------|
| `#page-home` | (root) | `/` | ✅ Phase 1 | Generated, visually equivalent |
| `#page-about` | `#about` | `/about` | ✅ Phase 1 | Generated, content extracted |
| `#page-capabilities` | `#capabilities` | `/capabilities` | ✅ Phase 1 | Generated, content extracted |
| `#page-portfolio` | `#portfolio` | `/portfolio` | ✅ Phase 1 | Generated, content extracted |
| `#page-blog` (→ case-studies) | `#blog` | `/case-studies` | ✅ Phase 1 | Renamed, generated |
| `#page-contact` | `#contact` | `/contact` | ✅ Phase 1 | Generated, content extracted |
| `#page-labs` | `#labs` | `/labs` | ✅ Phase 1 | Generated, content extracted |
| `#page-career` | `#career` | `/career` | ✅ Phase 1 | Generated, content extracted |
| `#page-kritexaai` | `#kritexaai` | `/kritexa-ai` | ✅ Phase 1 | Generated, content extracted |

---

## Phase 0 Migration Map (Historical Reference)

> The original mapping documented in Phase 0 is below.
> See original `docs/MIGRATION-MAP.md` in git history for Phase 0 version.

### Navigation Changes (Original → Phase 1)

| Original | New (Phase 1 components) | Status |
|----------|--------------------------|--------|
| `onclick="go('home')"` | `<a href="/">` | Done in components |
| `onclick="go('about')"` | `<a href="/about">` | Done in components |
| `onclick="go('capabilities')"` | `<a href="/capabilities">` | Done in components |
| `onclick="go('portfolio')"` | `<a href="/portfolio">` | Done in components |
| `onclick="go('blog')"` | `<a href="/case-studies">` | Done in components |
| `onclick="go('contact')"` | `<a href="/contact">` | Done in components |
| `onclick="go('labs')"` | `<a href="/labs">` | Done in components |
| `onclick="go('career')"` | `<a href="/career">` | Done in components |
| `onclick="go('kritexaai')"` | `<a href="/kritexa-ai">` | Done in components |

**Note**: Page content (inside `src/pages/`) still uses the legacy `go()` calls. This will be cleaned up in Phases 3–13.

---

## New Pages Needed

| Future URL | Purpose | Phase |
|-----------|---------|-------|
| `/portfolio/:slug` | Individual portfolio project | Phase 9 |
| `/case-studies/:slug` | Individual case study | Phase 10 |
| `/privacy-policy` | Privacy Policy | Phase 21 |
| `/terms-of-service` | Terms of Service | Phase 21 |
| `/cookie-policy` | Cookie Policy | Phase 21 |
