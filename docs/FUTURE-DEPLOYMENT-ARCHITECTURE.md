# FUTURE-DEPLOYMENT-ARCHITECTURE.md — Kritexa Labs Website

**Phase:** 21 — Documentation Only
**Status:** Conceptual architecture only. **HOSTING PROVIDER NOT SELECTED.** Nothing described here has been deployed or provisioned.

---

## 1. PURPOSE

Documents the conceptual future deployment architecture for when a backend is eventually built. See `docs/HOSTING-GUIDE.md` (existing, Phase 1) for the current static-frontend hosting guidance, which remains valid and unaffected by this document.

---

## 2. CONCEPTUAL COMPONENT MAP

```
Frontend            — static HTML/CSS/JS (this repo), builds via scripts/build.js
Backend API         — NOT SELECTED (future Node/Python/other service)
Database            — NOT SELECTED (PostgreSQL is the current recommendation, not final)
Private File Storage — NOT SELECTED (for resumes; must be private, not public)
Email Service       — NOT SELECTED (for notifications)
Admin Dashboard      — NOT BUILT (future authenticated UI)
Domain/DNS          — kritexalabs.com (existing domain referenced in current docs; DNS management for a backend is not configured)
HTTPS               — Required for any future backend; not yet configured for a backend context
Monitoring          — NOT SELECTED
Backups             — NOT SELECTED
```

**Every item above except "Frontend" is unselected/unbuilt.**

---

## 3. HOSTING PROVIDER — NOT SELECTED

No hosting provider has been chosen for:
- The backend API
- The database
- The file storage
- The admin dashboard

The existing `docs/HOSTING-GUIDE.md` only documents static frontend hosting options (Netlify, Vercel, Nginx, Apache, GitHub Pages, Cloudflare Pages) — none of these have been provisioned either; they remain documentation, not deployment.

**Do not assume a provider. Do not deploy anything.**

---

## 4. CONCEPTUAL REQUEST FLOW (Future, illustrative only)

```
Browser
  │
  ├──▶ Static Frontend (current: hosting provider not finalized)
  │
  └──▶ Backend API (future, provider not selected)
          │
          ├──▶ Database (future, engine recommended = PostgreSQL, not final)
          ├──▶ Private File Storage (future, provider not selected)
          └──▶ Email Service (future, provider not selected)
```

---

## 5. MONITORING & BACKUPS (Future)

- Application/error monitoring: not selected.
- Database backup strategy (frequency, retention, offsite copies): not selected.
- Uptime monitoring for the API once built: not selected.

These are listed as required future decisions — see `docs/FUTURE-WORK-ROADMAP.md` §"Decisions Required from Project Owner."

---

## 6. EXPLICIT STATUS

```
HOSTING PROVIDER NOT SELECTED
NO BACKEND DEPLOYED
NO DATABASE PROVISIONED
NO FILE STORAGE PROVISIONED
NO EMAIL SERVICE CONNECTED
NO MONITORING CONFIGURED
NO BACKUP STRATEGY SELECTED
```
