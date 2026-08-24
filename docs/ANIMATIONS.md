## Phase 19 Update — Cross-Browser & Compatibility QA

**Date**: 2025  
**Status**: COMPLETE

### Animation Compatibility Matrix

| Animation | Chrome 151 | Firefox 154 | Edge 151 | Safari (static) |
|-----------|-----------|-------------|----------|-----------------|
| BUSINESS canvas | PASS | PASS | PASS | STATICALLY VERIFIED |
| Process orbital | PASS | PASS | PASS | STATICALLY VERIFIED |
| Ambient blobs | PASS | PASS | PASS | STATICALLY VERIFIED |
| Scroll reveal | PASS | PASS | PASS | STATICALLY VERIFIED |
| Stat counters | PASS | PASS | PASS | STATICALLY VERIFIED |
| FAQ accordion | PASS | PASS | PASS | STATICALLY VERIFIED |
| Countdown timer | PASS | PASS | PASS | STATICALLY VERIFIED |
| Marquee scroll | PASS | PASS | PASS | STATICALLY VERIFIED |
| Testimonial scroll | PASS | PASS | PASS | STATICALLY VERIFIED |
| Kai blink dot | PASS | PASS | PASS | STATICALLY VERIFIED |
| Chip float | PASS | PASS | PASS | STATICALLY VERIFIED |
| Hero card float | PASS | PASS | PASS | STATICALLY VERIFIED |
| Reduced motion | PASS | PASS | PASS | STATICALLY VERIFIED |

### `roundRect` Compatibility
Canvas uses `if(oCtx.roundRect)` guard — fallback to `oCtx.rect()` for browsers without support.
Chrome 99+, Firefox 112+, Safari 16+, Edge 99+ support `roundRect`.
All currently supported browser versions meet this threshold.

### `visibilitychange` Tab Switching
- Canvas RAF paused when tab hidden (Chrome, Firefox, Edge, Safari all support `visibilitychange`).
- Process pulse interval cleared when tab hidden.

---


# ANIMATION VERIFICATION REPORT

## Phase 15 — JS & Animation Engineering

### Architecture Changes

#### RAF Loop Lifecycle (Phase 15)

| Loop | Guard | Pause | Stop |
|------|-------|-------|------|
| Cursor lerp | `hover:hover` + reduced-motion | `visibilitychange` | N/A (tab hide) |
| BUSINESS canvas | `data-page="home"` + element exists + reduced-motion | `visibilitychange` | N/A (tab hide) |
| Center orb pulse | Element exists + reduced-motion + IntersectionObserver | Leaves viewport | On IO exit |
| Stat counters | IntersectionObserver trigger | N/A (one-shot) | `p >= 1` |
| Process interval | Element exists + `data-page` guard | `visibilitychange` | N/A (paused) |
| Countdown interval | Elements exist | N/A | `diff <= 0` |

#### Event Listener Changes (Phase 15)

- `mousemove` — added `{ passive: true }` (was missing)
- Cursor hover — replaced N×2 per-element `mouseenter`/`mouseleave` with 2 delegated `pointerover`/`pointerout` on `document`, filtered by `pointerType === 'mouse'`
- Process interval — `visibilitychange` pause/resume added
- Cursor RAF — `visibilitychange` pause/resume added

#### Reduced Motion (Phase 15)

- Cursor RAF: **never starts** under `prefers-reduced-motion: reduce` (JS early return added)
- Canvas RAF: **never starts** (was already guarded in `js/pages/home.js`, confirmed correct)
- `pulseCen` RAF: **never starts** (was already guarded, confirmed correct)
- CSS `global.css` handles remaining animations globally

#### Build System (Phase 15)

- `scripts/build.js`: Added `data-page="${page.id}"` attribute on `<body>` for every page
- Used by `js/animations.js` guards to distinguish home page from all other pages
- Eliminates the double RAF loop bug documented in AD-030

---


## Phase 14 — Manual Browser Animation & Motion QA

Real browser testing on Google Chrome 151 and Mozilla Firefox 154 has verified all transition speeds, scroll triggers, scroll reveals, hover effects, canvas visual effects, and responsive motion safety rules.

### Key Animation Findings
- **Visual Performance**: Home page hero Canvas background rendering is perfectly fluid. Hover effects on grid cards (`.svc-item`, `.why-card`, `.labs-card`, etc.) render without layout shift or visual jank.
- **Scroll Reveals**: IntersectionObserver trigger in `js/global.js` works reliably. Elements with `.rv`, `.rv-l`, and `.rv-r` animate into view with a smooth `0.65s` slide and opacity fade as the user scrolls.
- **Dynamic Menus**: Desktop Products Mega Menu animates seamlessly on open/close without clip issues. Mobile Hamburger icon morphs into a close 'X' smoothly, and the accordion Products menu opens with clean, non-janky geometry.
- **Reduced Motion Compliance**:
  - Emulating `prefers-reduced-motion: reduce` suppresses the particle canvas and countdown intervals.
  - Hover translations and lift animations are disabled, while elements marked with `.rv` are instantly displayed at full opacity (`opacity: 1 !important; transform: none !important`) so that content remains fully readable without any delay or trigger.

---


## Phase 13 — Career & Labs Page Animations

### Career Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on hero content, benefit cards (×6), openings heading, job card, internship card
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease`
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### Career-Specific Hover Transitions
- `.ben-card:hover` — `translateY(-3px)` lift (defined in `css/components.css`)
- `.job-card:hover` — border color + box-shadow (defined in `css/components.css`)
- `.jb-tag:hover` — background + border color (defined in `css/components.css`)
- `.intern-card:hover` — not applicable (`.intern-card` has no hover in components.css)
- All disabled under `prefers-reduced-motion` via `css/pages/career.css`

### Labs Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on hero content, status board, all 3 active project cards, heading, 4 planned cards, newsletter box
- Same mechanism as Career above.

### Labs Status Board Blink Dot
- **Type**: CSS animation — `@keyframes blink` (defined in `css/components.css`) — `opacity` pulse, 2s infinite
- **Element**: `span` inside `.labs-bar` with `animation:blink 2s infinite`
- **Reduced motion**: Disabled in `css/pages/labs.css`

### Labs Card Hover Transitions
- `.labs-card:hover` — `translateY(-2px)` lift + border color change (defined in `css/components.css`)
- `.labs-coming:hover` — `translateY(-2px)` lift + border color change (defined in `css/components.css`)
- All disabled under `prefers-reduced-motion` via `css/pages/labs.css`

### Career/Labs — No Page-Specific JS Animations
No `js/pages/career.js` or `js/pages/labs.js` created. All animations are CSS-only or handled by existing global `js/global.js`.

---



## Phase 12 — Kritexa.AI Page Animations

### Kritexa.AI Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on badge row, H1, description, countdown, waitlist, features heading, feature cards, stats strip, CTA
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Stagger**: 60ms per element in batch (handled by global.js)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### Kritexa.AI Countdown Timer
- **Mechanism**: `setInterval(updateCountdown, 1000)` IIFE in `js/animations.js`
- **Target date**: `2026-10-01T00:00:00`
- **Elements updated**: `#kaiDays`, `#kaiHrs`, `#kaiMins`, `#kaiSecs` (textContent)
- **Role**: `role="timer"` on container, `aria-live="off"` (updates every second — live announcements would be too noisy)
- **Reduced motion**: Not applicable — `textContent` update is not a CSS animation. Timer continues under reduced motion; countdown values update correctly.

### Ambient Orb Drift (`.kai-orb1`, `.kai-orb2`)
- **Type**: CSS animation — `jk-drift` keyframe (defined in `css/components.css`)
- **Duration**: 18s infinite, staggered by `animation-delay: -9s`
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css` — `animation: none !important`

### AI Pill Dot Blink (`.kai-ai-dot`)
- **Type**: CSS animation — `kai-blink` keyframe (opacity pulse)
- **Duration**: 1.5s infinite
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css` — `animation: none !important`

### Feature Status Dot Blink (`.kai-status-dot`)
- **Type**: CSS animation — `kai-blink` 2s infinite
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css`

### Gradient Heading Shimmer (`.kai-grad`)
- **Type**: CSS animation — `jk-shimmer` 4s infinite (background-position pan)
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css`

### Progress Bar Fill Animation (`.kai-feat-prog-bar`)
- **Type**: CSS animation — `kai-prog` 2s ease-out (width: 0 → stated width)
- **Keyframe**: `@keyframes kai-prog { from { width: 0 !important; } }` (defined in `css/components.css`)
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css` — `animation: none !important`
- **Accessibility note**: Progress bars have `role="meter"` with `aria-valuenow` — value communicated semantically regardless of animation

### Feature Card Hover Lift (`.kai-feat:hover`)
- **Type**: CSS transition — `transform: translateY(-3px)`, `box-shadow`, `border-color`
- **Duration**: `0.3s ease`
- **Defined in**: `css/components.css`
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css` — `transition: none !important`

### Waitlist Button Hover (`.kai-wl-btn:hover`)
- **Type**: CSS transition — `transform: translateY(-2px)`, `box-shadow`
- **Duration**: `0.25s`
- **Defined in**: `css/components.css`
- **Reduced motion**: Disabled in `css/pages/kritexa-ai.css`

### No Kritexa.AI-Specific JS Animations
No `js/pages/kritexa-ai.js` created. All animations are CSS-only or handled by existing global `js/animations.js` and `js/global.js`.

---



## Phase 11 — Contact Page Animations

### Contact Hero Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on `.con-hero-content` and `.ci` (contact info) and `.cf` (form panel)
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Stagger**: 60ms per element in batch (handled by global.js)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### Contact Floating Badge Hover (`.con-hero-badge`)
- **Type**: CSS transition — `transform: translateY(-3px)`
- **Duration**: `0.3s` (from `css/components.css` `.con-hero-badge:hover`)
- **Defined in**: `css/components.css`
- **Reduced motion**: Global rule applies — transitions shortened to `1ms`
- **Accessibility note**: Badges are `aria-hidden="true"` — decorative only

### Contact Option Card Hover (`.c-link`)
- **Type**: CSS transition — `transform: translateX(5px)`, `box-shadow`, `background`
- **Duration**: `0.28s ease` (from `css/components.css` `.c-link`)
- **Defined in**: `css/components.css`
- **Reduced motion**: Global rule disables

### Form Focus States (`.fg input:focus` etc.)
- **Type**: CSS transition — `box-shadow` glow, `background` shift
- **Duration**: `0.2s` (from `css/components.css` `.fg input, .fg select, .fg textarea`)
- **Defined in**: `css/components.css`
- **Reduced motion**: Functional (focus visibility retained — not removed under reduced motion)

### FAQ Accordion (`.faq-item` / `.faq-btn`)
- **Same as Case Studies page** — handled by `js/global.js` `toggleFaq()`
- **Type**: CSS transition — `max-height: 0 → 280px`, `padding` transition
- **Duration**: `max-height 0.4s ease, padding 0.3s`
- **Aria**: `aria-expanded` toggled by `toggleFaq()` on button
- **Reduced motion**: Global rule applies — transition shortened to `1ms`

### No Contact-Specific JS Animations
No `js/pages/contact.js` created. All animations are CSS-only or handled by global `js/global.js`.

---



## Phase 10 — Case Studies Page Animations

### Case Studies Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on hero content, stats strip, featured article, case study cards, FAQ items, CTA
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Stagger**: 60ms per element in batch (handled by global.js)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### FAQ Accordion (`.faq-item` / `.faq-btn`)
- **Mechanism**: `onclick="toggleFaq(this)"` calls `js/global.js` `toggleFaq()` function
- **Type**: CSS transition — `max-height: 0 → 280px`, `padding` transition
- **Duration**: `max-height 0.4s ease, padding 0.3s` (from `css/components.css`)
- **Aria**: `aria-expanded` toggled by `toggleFaq()` on button
- **Reduced motion**: Global rule applies — transition shortened to `1ms`

### Filter Button Hover
- **Type**: CSS transition — `background`, `border-color`, `color`
- **Duration**: `var(--duration-fast)` = `0.22s`
- **Defined in**: `css/pages/case-studies.css`
- **Reduced motion**: `css/pages/case-studies.css` sets `transition: none !important`

### Case Study Card Hover (`.cs-card`)
- **Mechanism**: CSS transition inherited from `css/components.css` `.cs-card` definition
- **Type**: CSS transition — `transform: translateY(-5px)`, `box-shadow`
- **Duration**: `0.3s` (from `css/components.css`)
- **Reduced motion**: Global rule disables

### No Case-Studies-Specific JS Animations
No `js/pages/case-studies.js` created. All animations are CSS-only or handled by global `js/global.js`.

---


## Phase 9 — Portfolio Page Animations

### Portfolio Stat Counter Animation
- **Mechanism**: `data-count` attributes on `.pf-hstat-num` elements
- **Trigger**: `IntersectionObserver` at 30% threshold (in `js/pages/portfolio.js`)
- **Type**: JavaScript — requestAnimationFrame, cubic ease-out
- **Duration**: 1600ms
- **Reduced motion**: `prefersReducedMotion` check — sets value immediately without animation
- **Load-order guard**: `data-count` attribute removed by `portfolio.js` before `global.js` IntersectionObserver can act

### Portfolio Card Hover
- **Type**: CSS transition — `transform: translateY(-4px)`, `box-shadow`, `border-color`
- **Duration**: `0.35s cubic-bezier(0.34,1.2,0.64,1)` (from `css/components.css` `.pf-card`)
- **Image zoom**: `.pf-img` `transform: scale(1.04)` on parent hover — `0.5s ease`
- **Defined in**: `css/components.css` (`.pf-card:hover`) + `css/pages/portfolio.css` (`.pf-img` transition)
- **Reduced motion**: `css/pages/portfolio.css` sets `transition: none !important` on card, img, btn

### Portfolio View Button Hover
- **Type**: CSS transition — `background`, `color`, `transform: translateY(-2px)`, `box-shadow`
- **Duration**: `var(--duration-normal)` = `0.25s`
- **SVG**: `transform: translate(2px, -2px)` on hover
- **Reduced motion**: Disabled by `css/pages/portfolio.css`

### Portfolio Scroll Reveal (`.rv`)
- **Mechanism**: `.rv` class on hero content, stats strip, project cards
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }`

### Filter Button Hover
- **Type**: CSS transition — `background`, `border-color`, `color`
- **Duration**: `var(--duration-fast)` = `0.22s`
- **Reduced motion**: `css/pages/portfolio.css` sets `transition: none !important`

### No Portfolio-Specific Canvas/Complex Animations
No new animation libraries, canvas elements, or countdown timers added to the Portfolio page.

---


## Phase 8 — Capabilities Page Animations

### Capabilities Scroll Reveal (`.rv`)
- **Mechanism**: CSS classes `.rv` on hero content, hero card, service card rows, industry grid, solution rows
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Stagger**: 60ms per element in batch (handled by global.js)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### Capability Card Hover (`.cap-svc-card`)
- **Type**: CSS transition — `transform: translateY(-5px)`, `box-shadow`, `border-color`, `background`
- **Duration**: `0.35s cubic-bezier(.34,1.1,.64,1)` (from `css/components.css`)
- **Reduced motion**: Global rule disables

### Industry Tile Hover (`.cap-industry-tile`)
- **Type**: CSS transition — `transform: translateY(-3px)`, `box-shadow`
- **Duration**: `var(--duration-normal)` = `0.25s`
- **Defined in**: `css/pages/capabilities.css`
- **Reduced motion**: `css/pages/capabilities.css` sets `transition: none !important`

### Solution Image Hover (`.sol-img`)
- **Type**: CSS transition — overlay opacity + CTA translateY
- **Duration**: `0.4s cubic-bezier(0.34,1.56,0.64,1)` (from `css/components.css`)
- **Touch behavior**: Overlay always visible at ≤ 768px (`opacity: 1`)
- **Reduced motion**: Global rule disables

### Hero Card Hover (`.cap-hero-card`)
- **Type**: CSS transition — `border-color`, `::before` radial glow scale
- **Duration**: `0.35s` (from `css/components.css`)
- **Reduced motion**: Global rule disables

### No Capabilities-Specific JS Animations
No `js/pages/capabilities.js` created. All animations are CSS-only or handled by global `js/global.js` (IntersectionObserver scroll reveal).

---


## Phase 7 — About Page Animations

### About Hero Scroll Reveal (`.rv`)
- **Mechanism**: CSS classes `.rv` on `.about-fs-hero-content` and section content
- **Trigger**: `IntersectionObserver` in `js/global.js` at 6% threshold
- **Type**: CSS transition — `opacity 0→1`, `translateY 24px→0`
- **Duration**: `0.65s ease` (from `--duration-slow`)
- **Reduced motion**: `css/global.css` sets `.rv { opacity: 1 !important; transform: none !important }` under `prefers-reduced-motion`

### About Scroll Hint (`scroll-hint` keyframe)
- **Element**: `.about-fs-scroll`
- **Trigger**: Page load (infinite)
- **Duration**: `2s ease-in-out`
- **Values**: `translateX(-50%) translateY(0) opacity:.5 → translateY(6px) opacity:1`
- **Reduced motion**: `css/pages/about.css` sets `animation: none !important; opacity: 0.4`
- **Visibility**: Hidden at ≤ 768px via CSS

### About Kicker Dot Blink (`blink` keyframe)
- **Element**: `.about-fs-kicker-dot`
- **Trigger**: Page load (infinite)
- **Duration**: `2s`
- **Values**: `opacity: 1 → opacity: .3 → opacity: 1`
- **Reduced motion**: Global rule disables

### About Floating Badge Hover
- **Element**: `.about-fs-badge:hover`
- **Type**: CSS transition — `transform: translateY(-3px)`
- **Duration**: `0.3s ease`
- **Reduced motion**: `css/pages/about.css` sets `transition: none !important`

### About Value Card Hover (`.val-card`)
- **Type**: CSS transition — `translateY(-10px) scale(1.02)` with spring cubic-bezier
- **Duration**: `0.38s cubic-bezier(0.34,1.56,0.64,1)`
- **Defined in**: `css/components.css` (shared)
- **Reduced motion**: `css/pages/about.css` sets `transition: none !important`

### About Mission/Vision Card Hover (`.b-card`)
- **Type**: CSS transition — `border-color`, `background`
- **Duration**: `0.25s`
- **Defined in**: `css/components.css` (shared)
- **Reduced motion**: Global rule disables

---



## Phase 6 — Home Animations Update

### BUSINESS Canvas Animation
- **File**: `js/pages/home.js` (primary), `js/animations.js` (also runs, see AD-030)
- **Reduced motion**: Canvas animation skipped if `prefers-reduced-motion: reduce`. Static gradient text fallback shown.
- **Tab visibility**: Canvas RAF paused on `visibilitychange` when hidden.
- **DPR cap**: Capped at 2× device pixel ratio for performance.
- **Resize**: Debounced 150ms.

### Home Orbital / Process
- **File**: `js/pages/home.js`
- **Reduced motion**: `pulseCen()` skipped; arc group animation not started if reduced motion.

### Stat Counters
- **File**: `js/pages/home.js`
- **Mechanism**: IntersectionObserver at 30% threshold, cubic ease-out, 1600ms duration.
- **Reduced motion**: Immediately sets final value.

### CSS Animations on Home Page
- `.jk-orb` drift: disabled by `css/pages/home.css` `@media (prefers-reduced-motion: reduce)`.
- `.jk-scroll-hint`: disabled same.
- All others (marquee, testimonials, bento bars, progress fills) are governed by `css/global.css` global reduced-motion rule.

---


# Animation System Audit

All animation values extracted from `index.html` CSS and JavaScript.

---

## CSS Keyframe Animations

### 1. Ambient Background Blobs (`amb`)
- **Element**: `.amb-blob` (`.ab1`, `.ab2`, `.ab3`)
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — translate + scale
- **Duration**: `22s`
- **Delays**: `0s`, `-10s`, `-5s`
- **Easing**: `ease-in-out`
- **Behavior**: 3 blurred radial gradient blobs float and breathe slowly
- **Values**: `translate(0,0) → translate(-30px,40px) scale(1.06) → translate(40px,-20px) scale(.94)`
- **Performance**: `filter: blur(120px)` — GPU-intensive on some devices

### 2. Blinking Dots (`blink`)
- **Elements**: `.hero-kicker-dot`, `.nav-labs-dot`, `.nav-kai-dot`, `.about-fs-kicker-dot`, `.con-kicker-dot`, `.afb-dot`, `.chb-dot`, `.sib-dot`
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — opacity
- **Duration**: `2s`
- **Values**: `opacity: 1 → opacity: .3 → opacity: 1`

### 3. Kritexa.AI Dot Blink (`kai-blink`)
- **Elements**: `.nav-kai-dot`, `.kai-ai-dot`, `.kai-status-dot`
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — opacity + box-shadow
- **Duration**: `2s` or `1.5s`
- **Values**: `opacity: 1, box-shadow: 0 0 6px #06B6D4 → opacity: .4, box-shadow: 0 0 2px #06B6D4`

### 4. Hero Card Float (`float-hero`)
- **Element**: `.hero-card-wrap`
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — translateY
- **Duration**: `6s`
- **Easing**: `ease-in-out`
- **Values**: `translateY(0) → translateY(-14px) → translateY(0)`
- **Note**: This section may be hidden at `≤ 1024px` (`.hero-visual { display: none }`)

### 5. Floating Chips (`chip-float`)
- **Elements**: `.h-chip` (`.hch1`, `.hch2`, `.hch3`)
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — translateY
- **Duration**: `4s`
- **Delays**: `0s`, `-1.5s`, `-.8s`
- **Values**: `translateY(0) → translateY(-8px) → translateY(0)`

### 6. Marquee Scroll (`marq`)
- **Element**: `.marquee-inner`
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — translateX
- **Duration**: `30s`
- **Values**: `translateX(0) → translateX(-50%)`
- **Pause on hover**: `animation-play-state: paused` on `:hover`

### 7. Testimonial Roll (`testi-roll`)
- **Element**: `.testi-track`
- **Trigger**: Page load (infinite)
- **Type**: CSS keyframe — translateX
- **Duration**: `34s`
- **Values**: `translateX(0) → translateX(-50%)`
- **Pause on hover**: Yes

### 8. Bar Chart Grow (`bar-grow`)
- **Elements**: `.b-bar` (bento grid)
- **Trigger**: Page load (CSS animation)
- **Type**: CSS keyframe — scaleY
- **Duration**: `2s`
- **Values**: `scaleY(0) → scaleY(1)` (transform-origin: bottom)

### 9. Fill Animation (`fill-anim`)
- **Elements**: `.bp-fill` (progress bars in bento)
- **Trigger**: Page load
- **Type**: CSS keyframe — width
- **Duration**: `1.5s`
- **Delay**: `0.3s`
- **Values**: `width: 0 → declared width`

### 10. JK Hero Ambient Drift (`jk-drift`)
- **Elements**: `.jk-orb1`, `.jk-orb2`, `.jk-orb3`, `.kai-orb1`, `.kai-orb2`
- **Trigger**: Page load (infinite)
- **Duration**: `20s` (jk), `18s` (kai)
- **Values**: Same translate+scale as `amb` but different distances

### 11. JK Scroll Hint (`jk-scroll-anim`)
- **Element**: `.jk-scroll-hint`
- **Duration**: `2s` infinite
- **Values**: `translateX(-50%) translateY(0) opacity:.4 → translateX(-50%) translateY(8px) opacity:.9`

### 12. About Scroll Hint (`scroll-hint`)
- **Element**: `.about-fs-scroll`
- **Duration**: `2s` infinite
- **Values**: Similar bounce + opacity

### 13. Spine Sweep (`spine-sweep`)
- **Element**: `.proc-spine-pulse`
- **Duration**: `3s` infinite
- **Values**: Moving white light from left:-60px to left:100% with opacity fade

### 14. Process Circle Pulse (`pc-pulse`)
- **Element**: `.proc-c::after` (when `.pulsing` class present)
- **Duration**: `0.95s` infinite
- **Values**: `opacity:.7 scale(1) → opacity:0 scale(1.4)`

### 15. Orbital Rings Spin (`porb-cw`, `porb-ccw`)
- **Elements**: `.porb-ring-spin` (clockwise), `.porb-ring-spin2` (counter-clockwise)
- **Duration**: `30s`, `45s`
- **Values**: `rotate(0deg) → rotate(360deg)` / `rotate(-360deg)`

### 16. Kai Progress (`kai-prog`)
- **Element**: `.kai-feat-prog-bar`
- **Duration**: `2s`
- **Values**: `width: 0 → declared width`

### 17. Navbar Glow (`nav-glow`)
- **Trigger**: Hover / active on nav link
- **Type**: CSS transition — opacity
- **Duration**: `0.22s`
- **Value**: Radial gradient ellipse below the nav link

### 18. JK Shimmer (`jk-shimmer`)
- **Element**: `.kai-grad` (gradient text in Kritexa.AI heading)
- **Duration**: `4s` infinite
- **Values**: `background-position: 0% 50% → 100% 50% → 0% 50%`

### 19. Orbital Spin (JS-injected, `orb-spin`)
- **Element**: SVG arc group in mobile process section
- **Duration**: `8s` linear infinite
- **Injected dynamically**: `document.createElement('style')` adds the keyframe

---

## CSS Transitions

All interactive UI elements use `transition` shorthand:

| Element | Property | Duration | Easing |
|---|---|---|---|
| `.btn-p` | all | `0.25s` | — |
| `.btn-g` | all | `0.25s` | — |
| `.nav-link` | color, background | `0.2s` | — |
| `.navbar` | background, backdrop-filter | `0.35s` | — |
| `.cs-card` | all | `0.3s` | — |
| `.svc-item` | background | `0.25s` | — |
| `.val-card` | all | `0.38s` | `cubic-bezier(0.34,1.56,0.64,1)` |
| `.cap-svc-card` | transform, box-shadow, border-color, background | `0.35s` | `cubic-bezier(.34,1.1,.64,1)` |
| `.pf-card` | all | `0.35s` | `cubic-bezier(0.34,1.2,0.64,1)` |
| `.sol-img` | all | `0.4s` | `cubic-bezier(0.34,1.56,0.64,1)` |
| `.faq-ans` | max-height, padding | `0.4s`, `0.3s` | — |
| `.f-soc` | all | `0.22s` | ease |
| `.rv`, `.rv-l`, `.rv-r` | opacity, transform | `0.65s` | ease |
| `.about-fs-badge` | transform | `0.3s` | ease |
| `.con-hero-badge` | transform | `0.3s` | — |

---

## JavaScript Animations

### 1. Custom Cursor (`requestAnimationFrame`)
- IIFE runs on page load
- Tracks `mousemove` at cursor speed
- Ring follows with 10% ease (laggy ring = `rx += (mx-rx)*.1`)
- Big state on hover over interactive elements

### 2. Animated Counters (`IntersectionObserver`)
- Triggered when element enters viewport
- Easing: `1 - Math.pow(1-p, 3)` (cubic ease-out)
- Duration: `1600ms`
- `data-count` attribute holds target value

### 3. BUSINESS Text Canvas Animation (`requestAnimationFrame`)
- Two canvases: off-screen canvas (draws animation), main canvas (masks to letter shapes)
- 36 animated bars with gradient fills, eased height targets, glowing top caps
- Compositing: `destination-in` clips animation to letter shapes
- Floating `+N%` labels appear randomly
- Purple outer glow via `shadowBlur: 28`
- Runs at full frame rate (no throttle)

### 4. Process Circle Pulse (`setInterval` + class toggle)
- Cycles through all `.proc-c` elements, adding/removing `.pulsing` class
- Interval: `1000ms`

### 5. Center Orb Pulse (`requestAnimationFrame`)
- Scales from `0.97` to `1.035` and back
- Increment: `0.0008` per frame = very slow breathing

### 6. Lead Number Counter (`setInterval`)
- Counts from 0 to 47 with 28ms intervals
- Starts after 600ms `setTimeout`

### 7. Kritexa.AI Countdown (`setInterval`)
- Target date: `new Date('2026-10-01T00:00:00')`
- Updates every `1000ms`

---

## Scroll-Based Behaviors

### Scroll Reveal (`IntersectionObserver`)
- Threshold: `0.06` (triggers at 6% visibility)
- rootMargin: `0px 0px -40px 0px`
- Elements with `.rv` (translateY -24px → 0, opacity 0 → 1), `.rv-l` (translateX -24px), `.rv-r` (translateX 24px)
- Staggered: `setTimeout(fn, i * 60)` (60ms per element in batch)
- **NOTE**: When `go()` is called, all `.rv` elements in the new page are immediately given `.on` class (no scroll reveal on page switch)

### Navbar Scroll Effect
- `window.scroll > 20px` → `.scrolled` class → frosted glass background

---

## Phase 4 — Products Mega Menu Animations

### Desktop Mega Menu Enter/Exit

| Property | Closed | Open | Duration | Easing |
|---|---|---|---|---|
| `opacity` | `0` | `1` | `0.22s` | `ease` |
| `transform` | `translateY(-6px)` | `translateY(0)` | `0.22s` | `ease` |
| `visibility` | `hidden` | `visible` | `0s` (0.22s delay on close) | — |
| `pointer-events` | `none` | `auto` | — | — |

**Rationale**: Visibility toggle (with delay on hide) prevents the invisible menu from being keyboard-reachable between animation frames.

### Footer Strip Dot (`pmm-footer-dot`)

Reuses existing `@keyframes kai-blink` (defined in Phase 3 header CSS). Same animated cyan dot treatment as `.nav-kai-dot`. Duration: `2s` ease-in-out infinite.

### Reduced Motion

When `@media (prefers-reduced-motion: reduce)`:
- Transition durations shortened to `0.01ms` — effectively instant
- `transform: none !important` — slide animation suppressed
- `animation: none` on `pmm-footer-dot`
- Visibility and opacity logic fully preserved — menu remains functional

---

## Libraries Used

- **None** — all animations are pure CSS + vanilla JavaScript
- No GSAP, no Framer Motion, no AOS, no Three.js, no anime.js

---

## Performance Concerns

1. **BUSINESS text canvas**: `requestAnimationFrame` running at full rate with 36 bars, gradient creation per frame, two canvases, compositing — heavy on mobile GPU
2. **Three ambient blob `blur(120px)`**: GPU compositing on background blobs
3. **Two animated orbital rings** on mobile process section: CSS `animation` on large elements
4. **All animations run on all pages** even when invisible (ambient blobs are `position: fixed`)
5. **No `prefers-reduced-motion` support** — media query `@media(prefers-reduced-motion:reduce)` not implemented
