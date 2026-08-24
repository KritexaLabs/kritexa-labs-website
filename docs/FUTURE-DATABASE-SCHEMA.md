# FUTURE-DATABASE-SCHEMA.md — Kritexa Labs Website

**Phase:** 21 — Documentation Only
**Status:** PROPOSED SCHEMA — NOT IMPLEMENTED. No database has been created.

---

## 1. RECOMMENDATION STATEMENT

**PostgreSQL is the CURRENT RECOMMENDATION, not a final implementation decision.**

Rationale for the recommendation (not a decision):
- Strong relational integrity for leads/applications/audit trails
- Mature ecosystem, wide hosting support
- JSONB support for semi-structured fields (e.g. campaign metadata) without abandoning relational integrity

The final database engine (PostgreSQL, MySQL, managed cloud DB, or otherwise) is a decision for the project owner. See `docs/FUTURE-WORK-ROADMAP.md` §"Decisions Required from Project Owner."

**No database instance, schema, migration, or table has been created in this repository or any external system.**

---

## 2. PROPOSED ENTITIES

For each entity: purpose, key fields, relationships, likely indexes, sensitive fields, and retention notes. All are proposals — exact column types, constraints, and naming will be finalized during implementation.

### 2.1 `users` (staff/admin accounts)

- **Purpose**: Internal staff who log into the future admin dashboard.
- **Key fields**: `id`, `email`, `password_hash`, `name`, `role_id`, `is_active`, `created_at`, `last_login_at`.
- **Relationships**: `role_id` → `admin_roles`; referenced by `assigned_to` on `leads`, `actor` on `audit_logs`.
- **Indexes**: unique on `email`.
- **Sensitive fields**: `password_hash` (never store plaintext), `email`.
- **Retention**: Retain while account active; anonymize/delete on offboarding per future policy.

### 2.2 `admin_roles` (roles/permissions)

- **Purpose**: Defines the role catalogue (Super Admin, Admin, Recruiter, Sales/Lead Manager, Content Manager — see `docs/FUTURE-BACKEND-ROADMAP.md` §Q).
- **Key fields**: `id`, `name`, `permissions` (JSON or normalized permission table).
- **Relationships**: Referenced by `users.role_id`.
- **Sensitive fields**: None.

### 2.3 `leads`

- **Purpose**: Core sales pipeline entity, sourced primarily from the Contact form.
- **Key fields**: `id`, `name`, `email`, `phone`, `whatsapp`, `company_name`, `service`, `message`, `source_page`, `source`/`campaign`, `status`, `priority`, `assigned_to` (FK → `users`), `created_at`, `updated_at`, `contacted_at`, `follow_up_at`.
- **Relationships**: `assigned_to` → `users`; has-many `lead_notes`, `lead_activities`.
- **Indexes**: `email`, `status`, `assigned_to`, `created_at`, `follow_up_at` (for reminder queries).
- **Sensitive fields**: `email`, `phone`, `whatsapp` (PII).
- **Retention**: See §S "Privacy / Data Retention" in `docs/FUTURE-BACKEND-ROADMAP.md` — retention window TBD by project owner.

### 2.4 `lead_notes`

- **Purpose**: Free-text, timestamped notes against a lead.
- **Key fields**: `id`, `lead_id` (FK), `author_id` (FK → `users`), `note`, `created_at`.
- **Relationships**: belongs-to `leads`, belongs-to `users`.
- **Indexes**: `lead_id`.

### 2.5 `lead_activities`

- **Purpose**: Structured activity/status-change history for a lead (calls, emails, status transitions).
- **Key fields**: `id`, `lead_id` (FK), `type` (e.g. status_change, call, email), `details` (JSON), `actor_id` (FK → `users`), `created_at`.
- **Relationships**: belongs-to `leads`, belongs-to `users`.
- **Indexes**: `lead_id`, `created_at`.

### 2.6 `jobs`

- **Purpose**: Career openings shown on the future Careers admin + public `/career` page.
- **Key fields**: `job_id`, `title`, `department`, `location`, `employment_type`, `description`, `requirements`, `responsibilities`, `status`, `published_at`, `closing_date`.
- **Relationships**: has-many `applications`.
- **Indexes**: `status`, `published_at`.
- **Sensitive fields**: None (public content once published).

### 2.7 `applications`

- **Purpose**: Candidate applications against a job.
- **Key fields**: `application_id`, `job_id` (FK), `candidate_name`, `email`, `phone`, `resume_file_id` (FK → `files`), `cover_letter`, `linkedin`, `portfolio`, `github`, `experience`, `created_at`, `status`.
- **Relationships**: belongs-to `jobs`; belongs-to `files` (resume metadata).
- **Indexes**: `job_id`, `email`, `status`, `created_at`.
- **Sensitive fields**: `email`, `phone`, `resume_file_id` (indirectly PII), `cover_letter` (may contain personal data).
- **Retention**: Candidate PII retention policy TBD — see privacy section.

### 2.8 `files`

- **Purpose**: Metadata-only record for uploaded files (primarily resumes). Actual binary content lives in private object storage, never in this table.
- **Key fields**: `file_id`, `application_id` (FK, nullable — files may be generic), `original_filename`, `storage_key`, `mime_type`, `size`, `uploaded_at`.
- **Relationships**: belongs-to `applications` (optional).
- **Indexes**: `application_id`.
- **Sensitive fields**: `storage_key` should be treated as sensitive (do not expose in any public response).

### 2.9 `subscribers` (newsletter)

- **Purpose**: Footer newsletter subscriber list.
- **Key fields**: `subscriber_id`, `email`, `status`, `consent_timestamp`, `source`, `created_at`, `unsubscribed_at`.
- **Indexes**: unique on `email`.
- **Sensitive fields**: `email`.

### 2.10 `waitlist_entries` (Kritexa.AI)

- **Purpose**: Kritexa.AI early-access waitlist.
- **Key fields**: `id`, `email`, `status`, `created_at`, `source`, `campaign_metadata` (JSON, optional).
- **Indexes**: unique on `email`.
- **Sensitive fields**: `email`.

### 2.11 `notifications`

- **Purpose**: Internal notification log/queue for events such as new lead, new application, new subscriber (see `docs/FUTURE-BACKEND-ROADMAP.md` §G).
- **Key fields**: `id`, `type`, `payload` (JSON), `recipient` (user or role), `status` (pending/sent/failed), `created_at`, `sent_at`.
- **Indexes**: `status`, `created_at`.

### 2.12 `audit_logs`

- **Purpose**: Records every create/update/delete performed by an authenticated actor across sensitive entities (leads, applications, jobs, users).
- **Key fields**: `id`, `actor_id` (FK → `users`), `action` (create/update/delete/login/etc.), `entity`, `entity_id`, `before` (JSON, nullable), `after` (JSON, nullable), `created_at`.
- **Indexes**: `entity`, `entity_id`, `actor_id`, `created_at`.
- **Sensitive fields**: `before`/`after` may contain PII copied from the audited entity — same retention policy as the source entity should apply.

---

## 3. POTENTIAL FUTURE CMS/CONTENT ENTITIES

These map to the content types already identified as CMS candidates in `docs/CMS-READINESS.md` (a pre-existing document). Listed here for completeness of the full database picture — **not implemented**.

### 3.1 `services`
- **Purpose**: Capabilities/service cards (currently hardcoded, duplicated across Home and Capabilities pages).
- **Key fields**: `id`, `title`, `icon`, `description`, `features` (JSON array), `badges` (JSON array), `color_theme`.

### 3.2 `portfolio_projects`
- **Purpose**: Portfolio showcase items (currently 12 hardcoded cards).
- **Key fields**: `id`, `title`, `category`, `type`, `description`, `year`, `image`, `tags` (JSON array), `tech` (JSON array), `results` (JSON array), `featured`.

### 3.3 `case_studies`
- **Purpose**: Case study detail content (currently hardcoded preview + 1 featured study).
- **Key fields**: `id`, `title`, `industry`, `services` (JSON array), `challenge`, `solution`, `results` (JSON array), `image`, `featured`, `flow` (JSON array).

### 3.4 `blog_posts`
- **Purpose**: Not present today; future blog content type if added.
- **Key fields**: `id`, `title`, `slug`, `body`, `published_at`, `author`, `tags`.

### 3.5 `labs_posts`
- **Purpose**: Labs experiments/status board (currently hardcoded 3 active + 4 planned items).
- **Key fields**: `id`, `title`, `category`, `description`, `status`, `progress`, `eta`, `tech_stack` (JSON array), `last_updated`.

---

## 4. GENERAL SCHEMA NOTES

- **No database has been created.** This document is a design proposal only.
- Field types (VARCHAR lengths, TIMESTAMP vs. DATE, JSON vs. JSONB) are intentionally not finalized — to be decided during implementation with the selected database engine.
- Foreign key constraints and cascade behavior (e.g. what happens to `applications` when a `job` is deleted) are implementation decisions, not specified here.
- All PII-bearing tables (`leads`, `applications`, `subscribers`, `waitlist_entries`, `users`) require a data retention and deletion-request process before production use — see `docs/FUTURE-BACKEND-ROADMAP.md` and the privacy section of `docs/FUTURE-WORK-ROADMAP.md`.

---

## 5. STATUS

```
DATABASE SCHEMA — PROPOSED ONLY
NO DATABASE CREATED
NO MIGRATIONS WRITTEN
NO ENGINE SELECTED (FINAL)
```
