# FUTURE-API-ARCHITECTURE.md — Kritexa Labs Website

**Phase:** 21 — Documentation Only
**Status:** All endpoints listed below are PLANNED — NOT IMPLEMENTED. No API routes exist in this repository. No API framework has been installed.

---

## 1. PURPOSE

This document defines the conceptual shape of a future backend API for Kritexa Labs. It exists so a future developer/agent can implement the API consistently, without needing to re-derive the contract from the frontend forms.

**Nothing in this document is deployed, running, or reachable.** All paths are illustrative.

---

## 2. CONCEPTUAL FUTURE ENDPOINTS

### Public-facing (form submission) endpoints

| Endpoint | Status | Purpose |
|----------|--------|---------|
| `POST /api/contact` | PLANNED — NOT IMPLEMENTED | Contact form submission → creates a `lead` |
| `POST /api/newsletter` | PLANNED — NOT IMPLEMENTED | Footer newsletter subscribe → creates a `subscriber` |
| `POST /api/waitlist` | PLANNED — NOT IMPLEMENTED | Kritexa.AI waitlist signup → creates a `waitlist_entry` |
| `POST /api/applications` | PLANNED — NOT IMPLEMENTED | Job application submission (with resume upload) → creates an `application` + `file` |
| `GET /api/jobs` | PLANNED — NOT IMPLEMENTED | Public list of published job openings |

### Admin-facing endpoints (require authentication)

| Endpoint | Status | Purpose |
|----------|--------|---------|
| `GET /api/admin/leads` | PLANNED — NOT IMPLEMENTED | List/search/filter leads |
| `GET /api/admin/leads/:id` | PLANNED — NOT IMPLEMENTED | Lead detail + notes + activity |
| `PATCH /api/admin/leads/:id` | PLANNED — NOT IMPLEMENTED | Update lead status/priority/assignment |
| `POST /api/admin/leads/:id/notes` | PLANNED — NOT IMPLEMENTED | Add a note to a lead |
| `GET /api/admin/applications` | PLANNED — NOT IMPLEMENTED | List/search/filter candidate applications |
| `PATCH /api/admin/applications/:id` | PLANNED — NOT IMPLEMENTED | Update application status |
| `GET /api/admin/applications/:id/resume` | PLANNED — NOT IMPLEMENTED | Authorized, time-limited resume download (never a public URL) |
| `GET /api/admin/jobs` / `POST` / `PATCH` / `DELETE` | PLANNED — NOT IMPLEMENTED | CRUD for job postings |
| `GET /api/admin/subscribers` | PLANNED — NOT IMPLEMENTED | List/export newsletter subscribers |
| `GET /api/admin/waitlist` | PLANNED — NOT IMPLEMENTED | List/export waitlist entries |
| `GET /api/admin/audit-logs` | PLANNED — NOT IMPLEMENTED | Audit trail viewer |
| `POST /api/admin/auth/login` | PLANNED — NOT IMPLEMENTED | Staff login |
| `POST /api/admin/auth/logout` | PLANNED — NOT IMPLEMENTED | Staff logout / session invalidation |

**All endpoints above are marked PLANNED — NOT IMPLEMENTED.** None exist in code today.

---

## 3. AUTHENTICATION (Future)

- Public endpoints (`/api/contact`, `/api/newsletter`, `/api/waitlist`, `/api/applications`, `/api/jobs`) require no authentication but must be protected by rate limiting and spam mitigation (see §6).
- All `/api/admin/*` endpoints require an authenticated session/token belonging to a staff `users` record with an appropriate role (see `docs/FUTURE-BACKEND-ROADMAP.md` §Q).
- Exact mechanism (session cookie vs. JWT vs. managed auth provider) is **not decided**.

---

## 4. VALIDATION (Future)

- Every public POST endpoint must validate:
  - Required fields present
  - Field types/formats correct (e.g. email format)
  - Field lengths within limits matching the frontend `maxlength` attributes already present in the HTML (see `docs/FUTURE-BACKEND-ROADMAP.md` §K)
  - Input sanitized before persistence (to prevent stored XSS/injection)
- Validation library/framework is not decided.

---

## 5. AUTHORIZATION (Future)

- Role-based checks on every `/api/admin/*` route (e.g. only Recruiter/Admin/Super Admin roles may access `/api/admin/applications`).
- Least-privilege principle: a role should only be able to call the endpoints it needs.

---

## 6. RATE LIMITING (Future)

- All public form-submission endpoints require rate limiting (e.g. per-IP, per-email) to prevent spam/abuse.
- Admin login endpoint requires login-attempt rate limiting to reduce brute-force risk.
- Exact thresholds are implementation decisions, not specified here.

---

## 7. ERROR HANDLING (Future)

Consistent response shape for all endpoints (illustrative only):

```
Success       → 2xx + resource/confirmation payload
Validation    → 400 + field-level error details
Unauthorized  → 401
Forbidden     → 403
Not Found     → 404
Rate Limited  → 429
Server Error  → 500
```

---

## 8. VERSIONING (Future)

- If the API evolves after initial release, versioning strategy (e.g. `/api/v1/...` prefix) should be decided before first production deployment, not retrofitted after clients depend on unversioned paths.

---

## 9. LOGGING (Future)

- Every admin write operation should produce an `audit_logs` entry (see `docs/FUTURE-DATABASE-SCHEMA.md` §2.12).
- Application-level error logging strategy (e.g. structured JSON logs, external log aggregation) is not decided.

---

## 10. CORS POLICY (Future)

- If the frontend and backend are served from different origins, a CORS policy restricting allowed origins to the production frontend domain(s) is required.
- If the backend serves the same origin as the static frontend, CORS may not be needed at all — this depends on the hosting architecture chosen (see `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md`).

---

## 11. CSRF STRATEGY (Future, where applicable)

- If session-cookie-based admin authentication is chosen, CSRF tokens are required on all state-changing admin requests.
- If token-based (e.g. bearer token in `Authorization` header) authentication is chosen for the admin API, traditional CSRF risk is reduced but must still be evaluated.
- Public form endpoints (contact/newsletter/waitlist/applications) are unauthenticated by design; CSRF protection here is less relevant than rate limiting + spam protection, but a lightweight anti-automation measure (e.g. honeypot field) is recommended.

---

## 12. EXPLICIT STATUS

```
API ARCHITECTURE — CONCEPTUAL / PLANNED ONLY
NO ROUTES IMPLEMENTED
NO SERVER RUNNING
NO FRAMEWORK INSTALLED
```
