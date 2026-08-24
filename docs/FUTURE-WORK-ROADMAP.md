# FUTURE-WORK-ROADMAP.md — Kritexa Labs Website

**This is the single document a future developer or AI agent should read FIRST** before touching backend, database, CMS, or admin work on this project.

**Phase:** 21 — Backend, Database, CMS & Business Platform Documentation
**Status:** COMPLETE (documentation only)
**Backend implementation is intentionally NOT part of Phase 21.**

---

## 1. CURRENT STATUS

The Kritexa Labs website is a **static, multi-page frontend** built with plain HTML/CSS/JS and a small Node.js build script (`scripts/build.js`). There is no backend, no database, no CMS, and no authentication anywhere in this repository or connected to it.

## 2. COMPLETED PHASES

| Phase | Scope | Status |
|-------|-------|--------|
| 0 | Audit & documentation of legacy single-file SPA | ✅ Complete |
| 1 | Multi-page architecture, build system, clean URLs | ✅ Complete |
| 2 | Global design system / tokens | ✅ Complete |
| 3 | Header & navigation | ✅ Complete |
| 4 | Products mega menu | ✅ Complete |
| 5 | Global footer | ✅ Complete |
| 6–13 | Home, About, Capabilities, Portfolio, Case Studies, Contact, Kritexa.AI, Career/Labs page rebuilds | ✅ Complete |
| 14 | Real browser, responsive & visual QA | ✅ Complete |
| 15 | JS & animation engineering | ✅ Complete |
| 16 | Performance & Core Web Vitals | ✅ Complete |
| 17 | Advanced SEO, indexing, structured data | ✅ Complete |
| 18 | Accessibility engineering (WCAG 2.2 AA-oriented) | ✅ Complete |
| 19 | Cross-browser & compatibility QA | ✅ Complete |
| 20 | Final security & technical QA | ✅ Complete |
| **21** | **Backend/DB/CMS/business-platform documentation** | ✅ **Complete (documentation only)** |

## 3. CURRENT STATIC ARCHITECTURE

- **Frontend**: Static HTML, output by `scripts/build.js` from `src/pages/*.html` + `src/sections/**/*.html` + `components/header.html` + `components/footer.html`.
- **9 production routes**: `/`, `/about`, `/capabilities`, `/portfolio`, `/case-studies`, `/contact`, `/kritexa-ai`, `/career`, `/labs`.
- **CSS**: `css/tokens.css`, `css/global.css`, `css/utilities.css`, `css/header.css`, `css/footer.css`, `css/components.css`, `css/pages/*.css`.
- **JS**: `js/global.js`, `js/navigation.js`, `js/mega-menu.js`, `js/active-nav.js`, `js/animations.js`, `js/pages/*.js`. Zero production npm dependencies (`package.json` verified — `"dependencies": {}`).
- **SEO**: `robots.txt`, `sitemap.xml`, per-page meta/OG/Twitter tags, JSON-LD (Organization/Service/WebSite/Breadcrumb schema) — see `docs/SEO.md`, `docs/PHASE17-SEO-REPORT.md`.
- **Accessibility**: Skip nav, ARIA landmarks/states, focus-visible, reduced-motion — see `docs/ACCESSIBILITY.md`, `docs/PHASE18-ACCESSIBILITY-REPORT.md`.
- **Security**: Static-audit hardened (no inline handlers, no eval, no secrets) — see `docs/SECURITY.md`, `docs/PHASE20-SECURITY-TECHNICAL-QA-REPORT.md`.

### BACKEND NOT STARTED
### DATABASE NOT STARTED
### CMS NOT STARTED
### ADMIN NOT STARTED
### HOSTING NOT FINALIZED (backend/DB/storage — frontend static-hosting guidance exists in `docs/HOSTING-GUIDE.md` but is unprovisioned)

---

## 4. WHAT NEEDS TO BE BUILT (Future Phases)

1. Backend API (framework not selected) — see `docs/FUTURE-API-ARCHITECTURE.md`
2. Database (PostgreSQL recommended, not final) — see `docs/FUTURE-DATABASE-SCHEMA.md`
3. Authentication + admin roles — see `docs/FUTURE-BACKEND-ROADMAP.md` §Q
4. Admin dashboard UI — see `docs/FUTURE-BACKEND-ROADMAP.md` §P
5. Lead management system — see `docs/FUTURE-BACKEND-ROADMAP.md` §F
6. Career/job + candidate application system — see `docs/FUTURE-BACKEND-ROADMAP.md` §L
7. Private resume/file storage — see `docs/FUTURE-BACKEND-ROADMAP.md` §M
8. Newsletter subscriber system — see `docs/FUTURE-BACKEND-ROADMAP.md` §N
9. Kritexa.AI waitlist system — see `docs/FUTURE-BACKEND-ROADMAP.md` §O
10. CMS for frequently-changing content (Portfolio, Case Studies, Blog, Labs, Careers, Services, SEO metadata, media) — see `docs/CMS-READINESS.md`
11. Email/notification system — see `docs/FUTURE-BACKEND-ROADMAP.md` §G
12. Production security headers (CSP, HSTS, etc.) — see `docs/SECURITY.md` §11
13. Real hosting/deployment for backend + database + storage — see `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md`
14. Legal pages (Privacy Policy, Terms of Service, Cookie Policy) — see `docs/ARCHITECTURE-DECISIONS.md` AD-026

## 5. WHAT SHOULD NOT BE BUILT YET

- No backend framework/server installed until the stack is selected.
- No CMS installed until a CMS is evaluated and approved.
- No database created/provisioned.
- No authentication/session system.
- No admin dashboard.
- No external API/CRM/analytics-backend connections.
- No email service connections.
- No payment service.
- No production hosting purchase or configuration for backend/DB/storage.
- No fake/placeholder credentials, API keys, database URLs, or provider names anywhere in the repo.
- No `fetch()`/`XMLHttpRequest` calls added to any form.
- No fake success states on the Contact, Newsletter, or Kritexa.AI Waitlist forms.

## 6. DEPENDENCIES

- Backend framework choice depends on: team skillset, hosting choice, budget.
- Database choice depends on: backend framework choice, hosting provider capabilities.
- File storage choice depends on: hosting provider, budget, compliance needs (private bucket support).
- CMS choice depends on: hosting, budget, API support, editorial workflow (see `docs/CMS-READINESS.md`).
- Admin dashboard depends on: backend API + authentication being implemented first.
- Email/notifications depend on: backend API existing to trigger them.
- Legal pages depend on: legal review, independent of technical stack.

## 7. DECISIONS REQUIRED FROM PROJECT OWNER

All items below are **PENDING OWNER DECISION**. None have been decided in this repository:

| Decision | Status |
|----------|--------|
| Backend language/framework | PENDING OWNER DECISION |
| Database provider/engine | PENDING OWNER DECISION |
| Hosting provider (backend/DB/storage) | PENDING OWNER DECISION |
| File storage provider | PENDING OWNER DECISION |
| Email provider | PENDING OWNER DECISION |
| CMS choice | PENDING OWNER DECISION |
| Authentication model (self-hosted vs. managed auth) | PENDING OWNER DECISION |
| Admin roles (final list/permissions) | PENDING OWNER DECISION |
| Backup strategy | PENDING OWNER DECISION |
| Analytics provider | PENDING OWNER DECISION |
| CRM integration (if any) | PENDING OWNER DECISION |
| WhatsApp Business API integration (vs. current wa.me placeholder link) | PENDING OWNER DECISION |
| Domain/DNS configuration for backend subdomains (e.g. `api.kritexalabs.com`) | PENDING OWNER DECISION |
| Privacy/legal requirements (Privacy Policy, Terms, Cookie Policy content) | PENDING OWNER DECISION |

**None of these decisions are made on the owner's behalf by this documentation.**

## 8. IMPLEMENTATION ORDER (Future Phases — numbers may be adjusted later)

```
Future Phase A — Backend stack selection
Future Phase B — Database + API foundation
Future Phase C — Authentication + Admin
Future Phase D — Lead management
Future Phase E — Career + resume system
Future Phase F — Newsletter + waitlist
Future Phase G — CMS/content management
Future Phase H — Email/notifications
Future Phase I — Security hardening (headers, CSRF, rate limiting)
Future Phase J — Deployment
Future Phase K — Production QA
```

## 9. SECURITY REQUIREMENTS

See `docs/SECURITY.md` §17 "Phase 21 Security Requirements" and `docs/FUTURE-API-ARCHITECTURE.md` §§3–11 for the full future backend security requirement set (HTTPS, CSP, HSTS, CSRF, rate limiting, input validation, secure file uploads, authentication/authorization, audit logs, secret management).

## 10. DATA REQUIREMENTS

See `docs/FUTURE-DATABASE-SCHEMA.md` for proposed entities and `docs/FUTURE-BACKEND-ROADMAP.md` §§F, L–O for field-level detail on leads, applications, subscribers, and waitlist entries. All entities touching PII require a retention/deletion policy before production use (§11 below).

## 11. PRIVACY / DATA RETENTION REQUIREMENTS

Because future systems will store leads, email addresses, phone numbers, resumes, and candidate information, the following are **required before production** (none exist today):

- Privacy policy (legal content — not drafted in this phase)
- Consent capture and tracking (form-level, at time of submission)
- Data retention windows for each PII-bearing entity
- Deletion-request handling process (e.g. GDPR/right-to-erasure equivalent)
- Data export capability for admins and, where required, for data subjects
- Access controls restricting who can view PII
- Resume retention/deletion policy
- Newsletter/waitlist unsubscribe mechanisms
- Data minimization (collect only what is needed)

**Legal implementation is marked FUTURE / REQUIRED BEFORE PRODUCTION** — no legal claims are made as if already implemented anywhere in this documentation set.

## 12. DEPLOYMENT REQUIREMENTS

See `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md`. Hosting provider for backend/database/storage is **NOT SELECTED**. Frontend static hosting guidance already exists in `docs/HOSTING-GUIDE.md` (Phase 1) and remains valid/unaffected.

## 13. PRE-LAUNCH CHECKLIST (Future — for when backend work begins)

- [ ] Backend stack selected and approved by project owner
- [ ] Database provisioned with schema matching (or superseding) `docs/FUTURE-DATABASE-SCHEMA.md`
- [ ] `/api/contact`, `/api/newsletter`, `/api/waitlist`, `/api/applications` implemented with validation + rate limiting
- [ ] Authentication + role-based admin access implemented
- [ ] Admin dashboard covering Leads, Careers, Newsletter, Waitlist, Files, Audit Logs
- [ ] Private resume storage configured (no public URLs)
- [ ] Email/notification provider connected
- [ ] Security headers deployed (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP, X-Frame-Options — see `docs/SECURITY.md` §11)
- [ ] CSRF protection on admin write endpoints
- [ ] Privacy Policy, Terms of Service, Cookie Policy pages published and linked from footer (replacing `.f-link-pending` placeholders)
- [ ] Real WhatsApp number configured (replacing `91XXXXXXXXXX` placeholder — see §14 below)
- [ ] Frontend forms updated to point `action` at real endpoints, and `contact-form-notice`/waitlist disclaimer text removed only once truly connected

## 14. POST-LAUNCH CHECKLIST (Future)

- [ ] Monitor error rates and API latency
- [ ] Verify all forms submit successfully end-to-end in production
- [ ] Verify admin notifications are firing correctly
- [ ] Verify audit logs are being written for every admin action
- [ ] Verify backup jobs are running and restorable
- [ ] Verify data retention/deletion jobs run as scheduled
- [ ] Review rate-limiting effectiveness against real traffic
- [ ] Confirm no PII is exposed in logs or error messages

---

## 15. KNOWN PLACEHOLDER ITEMS IN CURRENT FRONTEND (Verified — Not Fixed in Phase 21)

These are pre-existing, documented placeholders (see `docs/ARCHITECTURE-DECISIONS.md` and `docs/SECURITY.md`) that remain unchanged by Phase 21:

- WhatsApp number `91XXXXXXXXXX` in `src/sections/contact/contact-form.html`, `components/footer.html` — NOT a real number.
- Legal footer links rendered as `<span class="f-link-pending">` — pages do not exist yet (AD-026).
- Contact form `action="#"`, footer newsletter `action="#"`, Kritexa.AI waitlist `action="#"` — all intentionally unconnected.
- Career page: no application form, no file upload — resume submission via `mailto:hr@kritexalabs.com` only.

---

## FINAL STATUS

```
PHASE 21 — COMPLETE
DOCUMENTATION ONLY
BACKEND IMPLEMENTATION DEFERRED
CMS IMPLEMENTATION DEFERRED
DATABASE IMPLEMENTATION DEFERRED
HOSTING DECISION DEFERRED
```
