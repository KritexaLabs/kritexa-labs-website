# CMS Readiness Analysis


> **Phase 1 Update** — The multi-page architecture has established the structural foundation for future CMS integration. Each page now has its own HTML file with separate content templates in `src/pages/`. No CMS has been installed.


Analysis of which content areas would benefit from CMS management in the future. No CMS is being implemented now.

---

## Executive Summary

The current website hardcodes all content directly in `index.html`. Content is tightly coupled to markup and JavaScript. The following analysis identifies content types that would be strong candidates for CMS management during future phases.

---

## High-Value CMS Candidates

### 1. Portfolio Projects (HIGH PRIORITY)
**Current state**: 12 portfolio card objects hardcoded in HTML  
**Coupling level**: Tightly coupled — each card requires editing HTML structure, base64 image, CSS color classes  
**CMS potential**: Excellent

Fields needed per project:
- `title` (string)
- `category` (select: Healthcare, Finance, etc.)
- `type` (select: Website, Software)
- `description` (text)
- `year` (number)
- `image` (image asset)
- `tags[]` (array of strings)
- `tech[]` (array of tech names)
- `results[]` (array of: value + label pairs)
- `featured` (boolean)

**Impact of CMS**: Adding/updating portfolio projects would not require HTML edits.

---

### 2. Case Studies (HIGH PRIORITY)
**Current state**: 3 preview cards on Home + 1 featured case study on Case Studies page  
**Coupling level**: Tightly coupled — each case study is full HTML blocks  
**CMS potential**: Excellent

Fields needed per case study:
- `title` (string)
- `industry` (select)
- `services[]` (array)
- `challenge` (rich text)
- `solution` (rich text)
- `results[]` (metrics array)
- `image` (image)
- `featured` (boolean)
- `flow[]` (process steps)

**Impact of CMS**: Enables a real blog/case-study pattern — future SEO will require individual URLs per case study.

---

### 3. Testimonials (HIGH PRIORITY)
**Current state**: 6 testimonials hardcoded (duplicated for auto-scroll) in Home page  
**Coupling level**: Medium — data is clean HTML but embedded in marquee structure  
**CMS potential**: Very good

Fields needed per testimonial:
- `name` (string)
- `role` (string)
- `location` (string)
- `quote` (text)
- `rating` (number 1–5)
- `initials` (string, 2 chars)
- `gradient` (optional — for avatar color)

**Impact of CMS**: Easy to add new testimonials without touching HTML.

---

### 4. Labs Projects (HIGH PRIORITY)
**Current state**: 3 active + 4 planned items hardcoded  
**Coupling level**: Medium — structured but embedded in HTML  
**CMS potential**: Very good

Fields needed per lab project:
- `title` (string)
- `category` (string: AI/NLP, Automation, etc.)
- `description` (text)
- `status` (select: Active, Planned)
- `progress` (number 0–100)
- `eta` (string)
- `techStack[]` (array)
- `lastUpdated` (date) ← Currently hardcoded "June 2026"

**Impact of CMS**: Enables live progress updates without HTML edits.

---

### 5. Capabilities / Services (MEDIUM PRIORITY)
**Current state**: 6 service cards (2 copies — Home + Capabilities pages), 8 industry solution rows  
**Coupling level**: High — service card content is embedded with HTML structure and CSS color classes  
**CMS potential**: Moderate

Fields needed per service:
- `title` (string)
- `icon` (emoji or icon name)
- `description` (text)
- `features[]` (array)
- `badges[]` (array)
- `colorTheme` (select: purple, cyan, green, orange, pink, teal)

**Impact of CMS**: Adding new service without HTML edits; also solves duplication between Home and Capabilities pages.

---

### 6. FAQ Items (MEDIUM PRIORITY)
**Current state**: 6 FAQs hardcoded in Case Studies page  
**Coupling level**: Low-medium — clean structure  
**CMS potential**: Good

Fields needed per FAQ:
- `question` (string)
- `answer` (rich text)
- `order` (number)

**Impact of CMS**: Easily editable without code. Also enables FAQ schema generation.

---

### 7. Testimonials Section Stats / Counters (MEDIUM PRIORITY)
**Current state**: Stats like "50+", "30+" hardcoded in multiple places  
**Coupling level**: Medium — appears in 5+ locations with identical values  
**CMS potential**: Good for "company stats" content type

Fields needed:
- `value` (string: "50+")
- `label` (string: "Projects Delivered")
- `sublabel` (string: "and growing")

**Impact of CMS**: Updating "50+ projects" to "75+ projects" currently requires editing 5+ places in HTML.

---

### 8. Team / Company Information (LOW PRIORITY)
**Current state**: No team page or member profiles currently  
**CMS potential**: Useful when team grows

Fields needed per team member:
- `name`, `role`, `bio`, `photo`, `social[]`

---

### 9. Job Listings (LOW PRIORITY)
**Current state**: One job hardcoded  
**Coupling level**: Very high — full job card is complex HTML  
**CMS potential**: Good

Fields needed per job:
- `title`, `department`, `type`, `description`, `responsibilities[]`, `requirements[]`, `niceToHave[]`, `compensation`, `equity`, `location`, `status` (live/paused)

---

## Content That Is NOT Good CMS Candidates

| Content | Reason |
|---|---|
| Design system (colors, typography) | Belongs in code/design tokens |
| CSS animations | Belongs in code |
| Navigation structure | Belongs in code/config |
| Hero canvas animation | JavaScript-only, not content |
| Footer layout | Design system concern |
| Process steps | Could be CMS but structure is rigid |

---

## Recommended CMS Strategy for Future Phases

When a CMS is adopted, suggested schema priorities:

1. **Portfolio** — immediate value, enables future work showcase
2. **Case Studies** — critical for SEO individual URLs
3. **Testimonials** — easy win, frequently updated
4. **Labs Projects** — dynamic content, frequently updated
5. **FAQs** — enables FAQ schema markup
6. **Services** — reduces duplication between pages
7. **Company Stats** — eliminates multi-place editing

**Recommended CMS options to evaluate** (not implemented yet):
- Sanity.io — structured content, great for complex schemas, free tier available
- Contentful — enterprise-grade, GraphQL support
- Strapi — self-hosted, open source
- Directus — flexible, self-hosted
- Notion + Notion API — suitable for small team content management

These are suggestions only. No CMS should be selected or installed until Phase 1+ architectural decisions are made.
