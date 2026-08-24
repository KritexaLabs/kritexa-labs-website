# Dependencies & External Resources

> **Phase 1 Update** — Updated to reflect new project structure.

---

## Summary

The project has **zero production JavaScript library dependencies**. All functionality is implemented in vanilla HTML, CSS, and ES5-compatible JavaScript.

## Phase 1 — New Development Dependencies

| Tool | Type | Purpose |
|------|------|---------|
| `Node.js` (built-in `fs`, `path`) | Runtime | Build system, asset extraction scripts |
| `npm scripts` | Dev tooling | `npm run build`, `npm run extract:assets` |

**No new npm packages installed.** The build system uses only Node.js core modules.

---

---

## External Resources

### Google Fonts (CDN — Render-Blocking)

| Resource | Type | Impact |
|---|---|---|
| `https://fonts.googleapis.com` | DNS preconnect + dns-prefetch | Required for fonts |
| `https://fonts.gstatic.com` | DNS preconnect + crossorigin + dns-prefetch | Required for font files |
| Google Fonts CSS API | Stylesheet | **Render-blocking** |

> **Phase 16**: Added `dns-prefetch` as belt-and-suspenders alongside `preconnect`.
> **Phase 16**: Removed duplicate `@import url('https://fonts.googleapis.com/...')` from `css/global.css` — loaded via HTML `<link>` only now.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Fonts loaded**:
- Inter: 7 weights (300, 400, 500, 600, 700, 800, 900)
- JetBrains Mono: 3 weights (400, 500, 600)

**Impact**: Google Fonts stylesheet is render-blocking. Until this resource resolves, text may be invisible (FOIT) or show in fallback font (if `font-display: swap` were present — it is not present in the HTML link tag; Google Fonts may serve it by default but this cannot be confirmed from the source alone).

---

## No JavaScript Libraries

There are **no external JavaScript libraries** loaded. Confirmed: no CDN links to jQuery, React, Vue, Angular, GSAP, AOS, Swiper, Three.js, Framer Motion, Lodash, Alpine.js, or any other JS library.

---

## No CSS Frameworks

There are **no external CSS frameworks** loaded. No Tailwind CDN, no Bootstrap, no Bulma, no Material UI.

---

## No Backend / API Dependencies

- No REST API calls
- No GraphQL
- No database connection
- Form submissions use `alert()` only — no data is sent anywhere
- Newsletter subscriptions use `alert()` only — no integration with Mailchimp, ConvertKit, etc.
- WhatsApp URL is a placeholder (`91XXXXXXXXXX`) — not functional
- Email link `mailto:hr@kritexalabs.com` — works but no tracking

---

## Third-Party Scripts

**None** present in the current code. Specifically absent:
- Google Analytics / GA4 (no `gtag.js`)
- Google Tag Manager (no `gtm.js`)
- Meta Pixel (no Facebook Pixel)
- Hotjar (no `hj.js`)
- Clarity / Microsoft Clarity
- Intercom / Crisp / LiveChat
- Sentry / error tracking
- Any analytics or tracking code

---

## Browser APIs Used

All are native browser APIs — no polyfills required for modern browsers:

| API | Usage |
|---|---|
| `IntersectionObserver` | Scroll reveal, animated counters |
| `requestAnimationFrame` | Custom cursor, BUSINESS canvas, center orb pulse |
| `history.pushState` | URL hash updates on page navigation |
| `window.addEventListener('popstate')` | Browser back/forward handling |
| `document.createElement('canvas')` | Hero animation |
| `CanvasRenderingContext2D` | Bar chart rendering + text clipping |
| `document.createElementNS` | SVG orbital layout |
| `window.matchMedia('(hover:hover)')` | Disables cursor on touch devices |
| `setInterval` | Countdown timer, lead counter |
| `setTimeout` | Counter restart delay, process init delay |
| `document.fonts.ready` | Wait for font load before measuring canvas |

---

## Notes on Future Dependencies

For Phase 1 (architecture rebuild), the following will need to be evaluated:
- **Static site generator** or **framework** choice (Next.js, Astro, plain HTML with build tool, etc.)
- **Font loading strategy** — self-hosted vs Google CDN with `font-display: swap`
- **Image optimization pipeline** — WebP/AVIF generation, lazy loading
- **Analytics** — GA4 or similar
- **Form handling** — Formspree, Netlify Forms, or custom API
- **WhatsApp integration** — real number needed
- **CMS** — if content management is required (Sanity, Contentful, etc.)
