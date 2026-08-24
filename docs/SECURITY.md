# SECURITY.md — Kritexa Labs Website

**Project:** Kritexa Labs Website
**Website:** https://www.kritexalabs.com
**Last updated:** Phase 21 — Backend/Database/CMS Documentation
**Status:** Pre-production (backend implementation deferred to a future phase)

---

## PHASE 21 UPDATE — DOCUMENTATION ONLY

Phase 21 documented the future backend security requirements in detail — see `docs/FUTURE-API-ARCHITECTURE.md` §§3–11 and `docs/FUTURE-BACKEND-ROADMAP.md` §Q. **No security control described in this document was implemented in Phase 21.** All items in §17 below ("Phase 21 Security Requirements") remain deferred to a future implementation phase, now more precisely tracked in `docs/FUTURE-WORK-ROADMAP.md` §13 "Pre-Launch Checklist". No headers were deployed, no CSRF token was added, no rate limiting was added, and the WhatsApp placeholder number was not replaced.

---

## 1. SECURITY SCOPE

This document covers the security posture of the Kritexa Labs static website. It is maintained by the development team and updated at each relevant phase.

**Current status:** Static website only. No production server configuration deployed yet. All server-level security controls are deferred to Phase 21.

---

## 2. THREAT MODEL

### Assets

| Asset | Value |
|-------|-------|
| Brand reputation | High |
| Contact form (lead collection) | High |
| Waitlist email collection | High |
| Static page content | Medium |
| Client-facing URLs | Medium |

### Attack Surfaces

| Surface | Status |
|---------|--------|
| HTML pages (static) | Hardened — no inline scripts, no unsafe event handlers |
| JavaScript (self-hosted) | Audited — no eval, no DOM injection from user input |
| Forms | Partially mitigated — no backend connected; Phase 21 requires CSRF/rate limiting |
| Third-party resources | Minimal — Google Fonts only |
| npm supply chain | Zero risk — zero production dependencies |
| Server/hosting | NOT YET DEPLOYED — Phase 21 |

### Out of Scope

- Network-level attacks (DDoS, BGP hijacking)
- Hosting provider infrastructure
- DNS security (Phase 21)
- Certificate management (Phase 21)
- Third-party social media platforms linked from site

---

## 3. STATIC AUDIT METHODOLOGY (Phase 20)

Phase 20 performed a complete static security audit:

1. **Source tree scan** — searched for secrets, credentials, `.env` files, private keys
2. **Production output audit** — verified no source directories exposed
3. **HTML security audit** — pattern search with comment-stripped Python scripts
4. **XSS / DOM sink analysis** — source-to-sink data flow tracing
5. **JavaScript security audit** — all 8 JS files reviewed
6. **Form security audit** — all 3 forms reviewed
7. **External link audit** — all `target="_blank"` links verified
8. **Third-party resource inventory** — all external resources catalogued
9. **Build system audit** — `scripts/build.js` reviewed for injection/traversal
10. **Dependency audit** — zero production dependencies confirmed

---

## 4. JAVASCRIPT SECURITY

### Current State

All JavaScript is self-hosted. No external scripts loaded.

**Files:**
- `js/global.js` — counters, FAQ delegation, social hover
- `js/navigation.js` — navbar, mobile drawer, legacy SPA shims
- `js/mega-menu.js` — product mega menu
- `js/active-nav.js` — per-page active nav state
- `js/animations.js` — canvas, SVG, scroll reveal
- `js/pages/home.js` — home page animations
- `js/pages/portfolio.js` — portfolio filter (event delegation)
- `js/pages/case-studies.js` — case studies lightbox

### Security Properties

| Property | Status |
|----------|--------|
| `eval()` usage | None |
| `new Function()` usage | None |
| `document.write()` usage | None |
| Uncontrolled `innerHTML` | None |
| `localStorage` / `sessionStorage` | Not used |
| `document.cookie` | Not used |
| `fetch()` / XHR | Not used |
| WebSocket | Not used |
| `postMessage` | Not used |
| `console.log` / `console.debug` | Not present |
| `debugger` | Not present |
| Source maps | Not generated |

### Legacy SPA Shims

`js/navigation.js` contains legacy code for an earlier single-page architecture:

- `window.go()` — SPA page navigation (dead code — guarded by `hasPageSystem`)
- `window.submitForm()` — legacy form handler with `alert()` (dead code on multi-page)
- `window.pfFilter()` — portfolio filter (superseded by event delegation)
- `window.kaiJoin()` — waitlist handler (textContent only, safe)

These are never invoked on the current multi-page build. Scheduled for removal in Phase 21.

---

## 5. DOM / XSS AUDIT

**Audit method:** Manual data flow tracing from all user-controlled inputs to all DOM sinks.

### User-Controlled Inputs Found

| Input | Location | Sink Reached | Classification |
|-------|----------|--------------|----------------|
| `location.hash` | `js/navigation.js` | `window.go()` whitelist check only | STATICALLY SAFE |
| Form field values | `js/navigation.js` (dead code) | `alert()` via dead `submitForm` | Not reachable on multi-page |
| Email field value | `js/navigation.js` (`kaiJoin`) | `.textContent` only | STATICALLY SAFE |

### DOM Sinks Found

| Sink | Location | Data Source | Safe? |
|------|----------|-------------|-------|
| `innerHTML = ''` | `js/animations.js:310` | Clear operation only | Yes |
| `innerHTML = ''` | `js/pages/home.js:298` | Clear operation only | Yes |
| `textContent =` | Multiple | Static strings or textContent | Yes |

**No XSS vulnerability found.**

---

## 6. FORM SECURITY

### Contact Form (`/contact`)

- **Backend:** NOT CONNECTED (Phase 21)
- **Fields:** Name, Phone, Email, Service, Message
- **Validation:** Native HTML `required`, `type="email"`, `maxlength`
- **CSRF:** NOT IMPLEMENTED (required for Phase 21)
- **Backend requirements for Phase 21:**
  - Server-side validation and sanitization
  - CSRF token
  - Rate limiting (e.g., 3 submissions/hour per IP)
  - CAPTCHA or equivalent
  - Email notification to `contact@kritexalabs.com`

### Kritexa.AI Waitlist (`/kritexa-ai`)

- **Backend:** NOT CONNECTED (Phase 21)
- **Fields:** Email only
- **Current behavior:** UI-only feedback via `.textContent` (safe)
- **Backend requirements for Phase 21:**
  - Duplicate detection
  - CSRF token
  - Rate limiting
  - Email confirmation

### Footer Newsletter

- **Backend:** NOT CONNECTED (Phase 21)
- **Fields:** Email only
- **Backend requirements for Phase 21:** Same as waitlist

---

## 7. EXTERNAL LINK SECURITY

All `target="_blank"` external links carry `rel="noopener noreferrer"`.

**Verified domains:**
- `instagram.com`
- `x.com` (Twitter)
- `linkedin.com`
- `facebook.com`
- `youtube.com`
- `threads.net`
- `wa.me` (WhatsApp — placeholder number)
- `kritexalabs.com` (footer powered-by)
- `fonts.googleapis.com` / `fonts.gstatic.com`

No tabnabbing vulnerability present.

---

## 8. DEPENDENCY AUDIT

**Production npm dependencies:** **Zero.**

The build system uses only Node.js built-ins (`fs`, `path`). No third-party packages are installed or required.

**npm audit:** Not applicable — no dependencies to audit.

**Supply chain risk:** Minimal. Only Node.js built-in APIs used in build.

---

## 9. SOURCE EXPOSURE AUDIT

| Path | Accessible via Web? | Robots.txt Disallow | Notes |
|------|---------------------|---------------------|-------|
| `/docs/` | No (no server route) | ✅ Yes | Internal documentation |
| `/scripts/` | No | ✅ Yes | Build scripts |
| `/src/` | No | ✅ Yes | Source templates |
| `/legacy/` | No | ✅ Yes | Archived legacy code |
| `/components/` | No | ✅ Yes | HTML partials |
| `/qa-screenshots/` | No | ✅ Yes | QA test images |

HTML comments in production pages reference internal template paths (e.g., `src/sections/home/hero.html`). These are inside `<!-- ... -->` comment nodes only — not functional links. No security impact.

---

## 10. SECRET SCAN

**Last scan:** Phase 20 (2025-08-23)  
**Method:** Pattern search across all JS, HTML, JSON, Markdown files

**Patterns searched:** `.env`, `*.pem`, `*.key`, `*.crt`, API keys, passwords, bearer tokens, private keys

**Result:** **Clean.** No secrets, credentials, or private keys found.

---

## 11. SECURITY HEADER READINESS

All security headers require Phase 21 server/hosting configuration. None are currently deployed.

### Recommended Phase 21 Security Headers

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;

Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

X-Content-Type-Options: nosniff

Referrer-Policy: strict-origin-when-cross-origin

Permissions-Policy: camera=(), microphone=(), geolocation=()

Cross-Origin-Opener-Policy: same-origin

Cross-Origin-Resource-Policy: same-origin

X-Frame-Options: DENY
```

**Note on `unsafe-inline` for styles:** Required because pages use inline `style=` attributes and per-page `<style>` blocks (animations, layout). To remove `unsafe-inline`, all inline styles must be externalized into CSS files — a larger refactor, deferred to Phase 21 if desired.

---

## 12. CSP READINESS

- **Inline scripts:** None — CSP `script-src 'self'` is sufficient
- **`unsafe-eval`:** NOT required
- **Inline event handlers:** Removed in Phase 20 (S2-01 fix)
- **Inline styles:** Required → `style-src 'unsafe-inline'`
- **External fonts:** `fonts.googleapis.com` / `fonts.gstatic.com`
- **No `<iframe>`:** `frame-src 'none'` safe
- **No embedded objects:** `object-src 'none'` safe

---

## 13. COOKIE / STORAGE AUDIT

| API | Used | Notes |
|-----|------|-------|
| Cookies | No | None set by site JS |
| `localStorage` | No | Not used |
| `sessionStorage` | No | Not used |
| `indexedDB` | No | Not used |

If analytics (GA4) are added in Phase 21, a cookie consent mechanism compliant with applicable law (GDPR, Indian PDPB) must be implemented.

---

## 14. BUILD SECURITY

| Check | Status |
|-------|--------|
| Build script makes no network requests | ✅ |
| Build script writes only to intended output dirs | ✅ |
| Template token regex prevents path traversal | ✅ |
| No shell execution in build | ✅ |
| Deterministic output | ✅ |
| No secrets in build scripts | ✅ |

---

## 15. PRODUCTION OUTPUT SECURITY

| Check | Status |
|-------|--------|
| No source directories in web root | ✅ |
| No development credentials in output | ✅ |
| No localhost/filesystem URLs in HTML | ✅ |
| No source maps | ✅ |
| All `target="_blank"` secured | ✅ |
| No inline event handlers | ✅ (Phase 20 fix) |
| robots.txt restricts dev directories | ✅ |

---

## 16. PHASE 20 FINDINGS SUMMARY

| Severity | Count | Status |
|----------|-------|--------|
| S0 Critical | 0 | — |
| S1 High | 0 | — |
| S2 Medium | 1 | ✅ FIXED |
| S3 Low | 3 | Documented |
| INFO | 4 | Documented |
| DEFERRED | 17 | Phase 21 |

**S2-01 (FIXED):** Inline `onclick="toggleFaq(this)"` on 10 FAQ buttons across case-studies and contact pages. Replaced with `data-faq-toggle` attribute + event delegation in `js/global.js`.

---

## 17. PHASE 21 SECURITY REQUIREMENTS

1. Deploy all 8 recommended security response headers
2. Enable HTTPS + HSTS (max-age ≥ 31536000)
3. Configure MIME types (`X-Content-Type-Options: nosniff`)
4. Implement form backend with CSRF, rate limiting, server-side validation
5. Replace WhatsApp placeholder number
6. Implement cookie consent if analytics added
7. Remove legacy `window.submitForm` / `alert()` dead code
8. Consider stripping HTML comments in production build output
9. Add `package-lock.json` for reproducible builds
10. Final Safari cross-browser verification
