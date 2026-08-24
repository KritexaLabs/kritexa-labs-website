# FUTURE-BACKEND-ROADMAP.md — Kritexa Labs Website

**Phase:** 21 — Backend, Database, CMS & Business Platform Documentation
**Status:** DOCUMENTATION ONLY — NOTHING IN THIS DOCUMENT IS IMPLEMENTED
**Scope:** This document describes a backend system that does **not exist yet**. It is a technical blueprint for a **future phase**, to be built only after the hosting/backend stack has been selected and approved by the project owner.

---

## 0. HOW TO READ THIS DOCUMENT

- Every system described below is **PLANNED**, not built.
- No code in this repository implements any part of this roadmap.
- No credentials, API keys, database URLs, or provider names are invented anywhere in this document.
- Any developer or AI agent picking up this project next should read `docs/FUTURE-WORK-ROADMAP.md` first, then this file for backend detail.

---

## A. OBJECTIVE

Kritexa Labs currently operates as a static frontend with **zero backend, zero database, and zero CMS**. As the business grows, it will eventually require a business backend capable of:

1. Lead collection (contact form submissions)
2. Lead management (sales pipeline, statuses, notes, assignment)
3. Contact/project inquiries (the existing Contact page form)
4. Career/job management (posting and updating open roles)
5. Candidate applications (structured application intake, replacing email-only submission)
6. Resume/CV upload and secure storage (private, non-public file storage)
7. Newsletter subscriber management (the existing footer newsletter form)
8. Kritexa.AI waitlist management (the existing Kritexa.AI page form)
9. Admin dashboard (internal staff-facing UI to manage all of the above)
10. Authentication and authorization (staff login, roles, permissions)
11. Notifications (email/internal alerts when new leads/applications/subscribers arrive)
12. Data export (CSV/Excel export of leads, applications, subscribers)
13. Audit logging (who changed what, when)
14. Content management where appropriate (portfolio, case studies, blog, labs, jobs — see `docs/CMS-READINESS.md` for the content analysis already completed in an earlier phase)

This roadmap exists so that any future developer, agency, or AI coding agent can pick up implementation without re-discovering requirements from scratch.

---

## B. EXPLICIT NON-GOALS FOR PHASE 21

**Phase 21 DOES NOT build any of the following. It only documents them for future development:**

- ❌ No backend framework installed (no Express, NestJS, Django, Laravel, etc.)
- ❌ No CMS installed (no Strapi, Sanity, Contentful, WordPress, etc.)
- ❌ No database created (no PostgreSQL, MySQL, MongoDB instance, schema, or migration)
- ❌ No authentication implemented (no login page, no session, no JWT, no password hashing)
- ❌ No admin dashboard built (no UI, no routes, no components)
- ❌ No external API connected (no CRM, no analytics backend, no third-party SaaS)
- ❌ No email service connected (no SMTP, no SendGrid/Mailchimp/Postmark integration)
- ❌ No payment service connected
- ❌ No production hosting configured or purchased
- ❌ No real credentials, API keys, phone numbers, email endpoints, or database URLs invented

The current website **remains an intentionally static frontend** after Phase 21. All forms continue to display honest "not connected" messaging (see `docs/SECURITY.md` §6 and `docs/ARCHITECTURE-DECISIONS.md` AD-049/AD-053/AD-027).

---

## C. CURRENT SYSTEM STATE (Ground Truth — Verified by Repository Inspection)

| System | State |
|--------|-------|
| Frontend | ✅ Static HTML/CSS/JS, Node.js build-time composition (`scripts/build.js`), 9 production routes |
| Backend | ❌ NOT IMPLEMENTED |
| Database | ❌ NOT IMPLEMENTED |
| CMS | ❌ NOT IMPLEMENTED |
| Admin dashboard | ❌ NOT IMPLEMENTED |
| Authentication | ❌ NOT IMPLEMENTED |
| File storage | ❌ NOT IMPLEMENTED |
| Production API | ❌ NOT IMPLEMENTED |
| Hosting | ❌ NOT FINALIZED |
| External backend provider | ❌ NOT SELECTED |
| npm production dependencies | Zero (`package.json` — verified) |

**Verified existing forms (all unconnected, `action="#"`):**

| Form | Location | Fields |
|------|----------|--------|
| Contact inquiry form | `src/sections/contact/contact-form.html` (`#contact-inquiry-form`) | name, phone, email, service, message |
| Footer newsletter | `components/footer.html` (`.f-nl-form`) | email |
| Kritexa.AI waitlist | `src/sections/kritexa-ai/hero.html` (`.kai-wl-inner`) | email |
| Career resume submission | `src/sections/career/opportunities.html` | mailto: link only — no form, no upload, no ATS |

---

## D. FUTURE ARCHITECTURE OVERVIEW (Conceptual — Not Final)

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Static Frontend  │─────▶│   Backend API     │─────▶│    Database       │
│  (this repo)      │      │  (NOT SELECTED)   │      │  (NOT SELECTED)   │
└──────────────────┘      └────────┬──────────┘      └──────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
           ┌───────────────┐ ┌─────────────┐ ┌───────────────┐
           │ Private File   │ │ Email/      │ │ Admin          │
           │ Storage        │ │ Notification│ │ Dashboard      │
           │ (NOT SELECTED) │ │ (NOT SELECTED)│ │ (NOT BUILT)   │
           └───────────────┘ └─────────────┘ └───────────────┘
```

All boxes except "Static Frontend" are **future work**. None are selected, provisioned, or built as of Phase 21.

---

## E. RELATED FUTURE-PHASE DOCUMENTS

This roadmap is the top-level backend planning document. Detail lives in sibling documents:

| Document | Content |
|----------|---------|
| `docs/FUTURE-DATABASE-SCHEMA.md` | Proposed entities, fields, relationships |
| `docs/FUTURE-API-ARCHITECTURE.md` | Conceptual endpoint list, auth, validation, rate limiting |
| `docs/FUTURE-DEPLOYMENT-ARCHITECTURE.md` | Hosting/deployment conceptual architecture |
| `docs/FUTURE-WORK-ROADMAP.md` | Master pending-work document — read this first |
| `docs/CMS-READINESS.md` | Existing content-management candidate analysis (pre-dates Phase 21) |
| `docs/SECURITY.md` | Current + future security requirements |
| `docs/PHASE21-DOCUMENTATION-REPORT.md` | Final Phase 21 report |

---

## F. LEAD MANAGEMENT SYSTEM (Future)

### Lead sources

- Contact page (`/contact`)
- Website CTAs (header "Start Project", footer "Start Your Project")
- Future landing pages
- Future campaigns
- Other approved sources (to be defined by project owner)

### Lead fields (proposed)

| Field | Notes |
|-------|-------|
| `id` | Primary key |
| `name` | From contact form `name` field |
| `email` | From contact form `email` field |
| `phone` | From contact form `phone` field (optional) |
| `whatsapp` | May be same as phone; separate if WhatsApp-specific channel is added |
| `company_name` | Not currently collected — would require a new form field |
| `service` | From contact form `service` select |
| `message` | From contact form `message` field |
| `source_page` | Page where the lead originated (e.g. `/contact`) |
| `source` / `campaign` | Optional campaign attribution, if available |
| `status` | See lifecycle below |
| `priority` | e.g. Low / Medium / High |
| `assigned_to` | Staff user reference (requires auth system) |
| `notes` | Free-text, append-only or editable log |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |
| `contacted_at` | Timestamp of first outreach |
| `follow_up_at` | Scheduled follow-up date/time |

### Recommended lifecycle (adjustable during implementation)

```
New → Contacted → Qualified → Proposal → Negotiation → Won
                                                       → Lost
```

The exact workflow states, transitions, and required fields per state can be finalized during implementation based on the sales team's real process.

### Additional required capabilities

- Search (by name, email, phone, company)
- Filtering (by status, priority, source, assigned_to, date range)
- Sorting (by created_at, updated_at, follow_up_at)
- Lead notes (timestamped, attributable to a staff user)
- Follow-up scheduling and reminders
- Assignment to staff members
- Status change history (audit trail)
- Activity history (calls, emails, meetings logged against a lead)
- Export (CSV/Excel)
- Duplicate detection (by email/phone before insert)

---

## G. NOTIFICATIONS (Future — see also §H below and `docs/FUTURE-API-ARCHITECTURE.md`)

Future notification events may include:

- Lead received
- Application received
- New job application
- Newsletter subscription
- Waitlist signup
- Lead follow-up reminders
- Admin notifications (system errors, daily digest, etc.)

**No email provider is selected.** Provider-selection criteria are documented in `docs/FUTURE-WORK-ROADMAP.md` under "Decisions Required from Project Owner."

---

## H. DATA EXPORT & AUDIT LOGGING (Future)

- **Data export**: CSV/Excel export for leads, applications, subscribers, waitlist entries — restricted to authenticated admin roles.
- **Audit logging**: Every create/update/delete on leads, applications, jobs, and admin users should be logged with `actor`, `action`, `entity`, `entity_id`, `before`, `after`, `timestamp`. See `audit_logs` entity in `docs/FUTURE-DATABASE-SCHEMA.md`.

---

## I. CONTENT MANAGEMENT (Future — where appropriate)

See `docs/CMS-READINESS.md` (existing document) for the full content-type analysis (Portfolio, Case Studies, Testimonials, Labs Projects, Services, FAQs, Job Listings). Phase 21 does not change that analysis — it is referenced here as part of the complete backend picture. No CMS is selected or installed.

---

## K. CONTACT FORM BACKEND (Future API Contract)

**Current frontend state (verified):** `src/sections/contact/contact-form.html` uses `<form id="contact-inquiry-form" action="#" method="post">`. This **must remain unconnected** during Phase 21.

**Conceptual future endpoint** (NOT implemented, no provider selected):

```
POST /api/contact
```

**Request fields** (mirrors existing form field names — see §23 "Safe Frontend Preparation" for why these names must stay stable):

| Field | Source form field | Required |
|-------|-------------------|----------|
| `name` | `name` | Yes |
| `phone` | `phone` | No |
| `email` | `email` | Yes |
| `service` | `service` | Yes |
| `message` | `message` | Yes |
| `source_page` | Derived server-side from request origin/referrer | N/A |

**Validation requirements (future):**
- Required fields enforced server-side (not just client-side native validation)
- Email format validation
- Length limits matching existing `maxlength` attributes (name ≤80, email ≤120, message ≤2000)
- Input sanitization before storage
- Spam protection (honeypot field, CAPTCHA, or equivalent)
- Rate limiting (e.g., N submissions per hour per IP — exact number to be decided during implementation)

**Response states (future):**
- Success (2xx, lead created)
- Validation error (4xx, field-level error details)
- Rate-limit error (429)
- Server error (5xx)

**No final API provider is invented.** The endpoint path above is illustrative only.

---

## L. CAREER / JOB SYSTEM (Future)

### Jobs entity (proposed)

| Field | Notes |
|-------|-------|
| `job_id` | Primary key |
| `title` | e.g. "Business Development Executive" |
| `department` | e.g. "Sales & Growth" |
| `location` | e.g. "Remote · India" |
| `employment_type` | e.g. "Full-Time / Part-Time" |
| `description` | Rich text |
| `requirements` | List |
| `responsibilities` | List |
| `status` | Draft / Published / Paused / Closed |
| `published_at` | Timestamp |
| `closing_date` | Optional |

### Applications entity (proposed)

| Field | Notes |
|-------|-------|
| `application_id` | Primary key |
| `job_id` | FK to job |
| `candidate_name` | |
| `email` | |
| `phone` | |
| `resume` | FK to file metadata — see §M below |
| `cover_letter` | Optional text |
| `linkedin` | Optional URL |
| `portfolio` | Optional URL |
| `github` | Optional URL, if applicable |
| `experience` | Optional text/number |
| `created_at` | Timestamp |
| `status` | See lifecycle below |

### Application lifecycle (adjustable during implementation)

```
New → Screening → Shortlisted → Interview → Selected
                                          → Rejected
```

### Explicit constraints

- Do NOT invent actual job openings beyond what is currently published (the single verified BDE role in `src/sections/career/opportunities.html`).
- Do NOT create fake salaries — the existing content only states "Performance Based / Incentive Driven / Uncapped Bonuses" (no figures), and this must not be changed.
- Do NOT create fake hiring promises or status claims beyond what is already in the approved content ("Actively Hiring" badge, "Apply Now" currently disabled per source).

**Current state:** No application form, no file upload, no ATS exists. Resume submission is via a `mailto:` link only (`hr@kritexalabs.com`). This is unchanged by Phase 21.

---

## M. RESUME / FILE STORAGE (Future)

**Explicit requirement:** Resumes must **NOT** be stored as raw binary data inside normal relational database records.

**Future architecture:** Private object/file storage (provider not selected — e.g. a private S3-compatible bucket or equivalent), with the database storing only metadata:

| Field | Notes |
|-------|-------|
| `file_id` | Primary key |
| `application_id` | FK to application |
| `original_filename` | As uploaded |
| `storage_key` | Generated, non-guessable object key |
| `mime_type` | Validated against allow-list |
| `size` | Bytes |
| `uploaded_at` | Timestamp |

**Security requirements (future):**
- Private storage — no public bucket/URL access
- Allowed MIME types restricted (e.g. PDF/DOC/DOCX only — exact list TBD)
- File extension validation in addition to MIME-type check
- File-size limits (exact limit TBD)
- Generated (random/UUID) storage names — never the original filename used as the storage key
- Authorization required before any download (must go through the backend API, never a direct public link)
- No public resume URLs ever generated
- Malware scanning where appropriate/available
- Retention/deletion policy (see §S "Privacy / Data Retention")

**Provider is NOT selected.** No storage provider should be chosen or configured without project-owner approval.

---

## N. NEWSLETTER SYSTEM (Future)

**Current frontend state (verified):** `components/footer.html` `.f-nl-form` — `<form action="#" method="post">`, single `email` field, "Subscribe" button. Not connected.

### Future data model (proposed)

| Field | Notes |
|-------|-------|
| `subscriber_id` | Primary key |
| `email` | Unique |
| `status` | Subscribed / Unsubscribed |
| `consent_timestamp` | When consent was captured |
| `source` | e.g. "footer" |
| `created_at` | Timestamp |
| `unsubscribed_at` | Timestamp, nullable |

### Requirements (future)

- Duplicate prevention (unique constraint on email)
- Unsubscribe mechanism (link/token-based)
- Consent tracking (timestamp + source)
- Export capability (admin-only)
- Abuse protection (rate limiting, basic bot mitigation)

**The current newsletter form must NOT be represented as connected.** No fake success message may be added to the frontend in Phase 21 or any phase prior to real backend integration.

---

## O. KRITEXA.AI WAITLIST (Future)

**Current frontend state (verified):** `src/sections/kritexa-ai/hero.html` `.kai-wl-inner` — `<form action="#">`, single `email` field, honest disclaimer text ("Waitlist not connected yet…"). Not connected.

### Future data model (proposed)

| Field | Notes |
|-------|-------|
| `email` | Unique |
| `status` | Waitlisted / Removed |
| `created_at` | Timestamp |
| `source` | e.g. "kritexa-ai-hero" |
| `campaign_metadata` | Optional JSON, if campaigns are added later |

### Requirements (future)

- Duplicate prevention
- Email validation
- Rate limiting
- Consent capture
- Unsubscribe/removal mechanism where applicable

**The existing form must NOT be connected during Phase 21 or represented as functional.**

---

## P. ADMIN DASHBOARD (Future)

**Not built. Not designed in code. Conceptual structure only:**

```
Dashboard
├── Leads
├── Lead Activities
├── Careers
│   ├── Jobs
│   └── Applications
├── Newsletter
├── Kritexa.AI Waitlist
├── Files
├── Content
├── Notifications
├── Audit Logs
└── Settings
```

### Future capabilities (per section, conceptual)

- Search
- Filters
- Pagination
- Status changes
- Assignments
- Notes
- Exports
- Secure file access (resumes — see §M)
- Role-based permissions (see §Q)

No admin UI, routes, or components exist in this repository. No admin framework has been selected.

---

## Q. AUTHENTICATION & ROLES (Future)

**Not implemented.** Conceptual role list (subject to change by project owner):

- Super Admin
- Admin
- Recruiter
- Sales/Lead Manager
- Content Manager

### Future security requirements

- Secure password hashing (e.g. bcrypt/argon2 — algorithm choice deferred to implementation)
- Session/token management (session cookies vs. JWT — deferred decision)
- Multi-factor authentication (MFA) as a future consideration, not a Phase 21 requirement
- Login rate limiting
- Account lockout considerations after repeated failed attempts
- Authorization checks on every admin route/endpoint
- Principle of least privilege — each role scoped to only the data/actions it needs
- Audit logs for all authentication events (login, logout, failed attempts, password changes)

**This is proposed architecture, not a final implementation decision.** The exact auth library/service (self-hosted vs. managed auth provider) is a decision for the project owner — see `docs/FUTURE-WORK-ROADMAP.md` §"Decisions Required from Project Owner."

---

## R. SUMMARY STATUS

```
PHASE 21 BACKEND PLANNING — DOCUMENTATION COMPLETE
NO BACKEND CODE WRITTEN
NO DATABASE CREATED
NO CMS INSTALLED
NO CREDENTIALS INVENTED
```
