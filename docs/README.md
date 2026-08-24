# Kritexa Labs Website — Project Documentation

## Project Purpose

Kritexa Labs is an AI-First Digital Growth Studio based in Hinjewadi, Pune, India. The website serves as the primary digital presence for lead generation, portfolio showcase, service communication, and hiring.

## Current Architecture

The website is currently implemented as a **single-page application (SPA) simulation** using pure HTML, CSS, and vanilla JavaScript. There is no framework, no build tool, no backend, and no CMS. All content, styles, and logic exist in a single file: `index.html`.

### Navigation Model
Navigation between "pages" is entirely client-side JavaScript. The `go(name)` function hides/shows `<div class="page">` containers and updates the URL hash. Browser back/forward navigation is handled via `popstate`. There is no server-side routing.

### Virtual Pages Currently in `index.html`
| Page ID | URL Hash | Description |
|---|---|---|
| `page-home` | (root) | Hero, services, bento, process, stats, case studies, testimonials |
| `page-about` | `#about` | Full-screen hero with BG image, values, mission/vision |
| `page-capabilities` | `#capabilities` | Service cards, who-we-serve grid, 8 industry solution rows |
| `page-portfolio` | `#portfolio` | Stats, filter system, 12 project cards |
| `page-career` | `#career` | Benefits grid, full job card, internship card |
| `page-blog` | `#blog` | Featured case study, 3 case study cards, FAQ, portfolio stats |
| `page-contact` | `#contact` | Full-screen rounded hero, contact form, contact links |
| `page-labs` | `#labs` | Labs status board, active projects, coming-soon grid |
| `page-kritexaai` | `#kritexaai` | Countdown timer, waitlist form, 3-pillar features, stats |

## Current Status

- **Phase 0 — Audit & Documentation**: Complete (this document set)
- **Production code**: Single file `index.html` (~4.2 MB, 7,320 lines)
- **No external assets**: All images, logo, and fonts are either base64-encoded inline or loaded from Google Fonts CDN
- **No build pipeline**: No `package.json`, no npm, no webpack/vite/Next.js, no framework installed

## Future Architecture Direction

The website will be rebuilt as a lightweight, fast, mobile-first **multi-page website** with clean URLs:
- `/` — Home
- `/about` — About
- `/capabilities` — Capabilities / Services
- `/portfolio` — Portfolio
- `/case-studies` — Case Studies (currently named "blog" in code)
- `/contact` — Contact
- `/kritexa-ai` — Kritexa.AI (coming-soon product page)
- `/career` — Career
- `/labs` — Labs

Products will appear as a **header mega-menu** (Solutions, Tools, APIs, Platforms) — no standalone product pages.

## Development Workflow

All development phases are documented in `docs/DEVELOPMENT-STAGES.md`.

Each phase should be completed and validated before the next begins. The current documentation set was produced in Phase 0 and no production code was intentionally modified.

## Documentation Structure

```
docs/
├── README.md                  — This file (project overview)
├── PROJECT-AUDIT.md           — Full audit findings
├── CURRENT-ARCHITECTURE.md    — Technical architecture details
├── CONTENT-MAP.md             — Section-by-section content inventory
├── DESIGN-SYSTEM.md           — Colors, typography, UI tokens
├── NAVIGATION.md              — Current navigation system analysis
├── COMPONENT-INVENTORY.md     — All UI components documented
├── ANIMATIONS.md              — All animations and motion behaviors
├── RESPONSIVE.md              — Breakpoints and mobile behavior
├── PERFORMANCE.md             — Performance bottlenecks
├── SEO.md                     — SEO implementation audit
├── ACCESSIBILITY.md           — Accessibility audit
├── ASSET-INVENTORY.md         — All assets documented
├── DEPENDENCIES.md            — External libraries and CDN resources
├── CMS-READINESS.md           — CMS migration analysis
├── MIGRATION-MAP.md           — Current → future page mapping
└── DEVELOPMENT-STAGES.md      — Full development roadmap
```

---

> **Phase 0 is an audit-only phase. No production code was intentionally modified during this phase.**
