# Design System Specification — Kritexa Labs

This document acts as the official, canonical reference for the visual design system of Kritexa Labs, established in **Phase 2 — Global Design System**. It captures the "C0demine-inspired" visual identity using centralized CSS custom properties in `css/tokens.css`.

---

## 1. Design Token Architecture

The design tokens are centralized in `css/tokens.css`, which is imported by `css/global.css`. Shorthand aliases are preserved on `:root` to ensure 100% backward compatibility with legacy CSS selectors, eliminating specificity and regression risks.

### Dependency Flow:
```
css/tokens.css (Design Tokens)
       ↓
css/global.css (Global Defaults, Resets, Accessibility)
       ↓
css/components.css (Reusable UI Component Classes)
       ↓
css/utilities.css (Layout Primitives & Helper Classes)
```

---

## 2. Color Tokens

### Primary Palette
| Token | Value | Shorthand Alias | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#080808` | `--bg` | Page primary background (near-black) |
| `--color-bg2` | `#0F0F0F` | `--bg2` | Secondary background, card surfaces, form wrappers |
| `--color-bg3` | `#141414` | `--bg3` | Card hover state, elevated surfaces |
| `--color-bg4` | `#1A1A1A` | `--bg4` | Inner nested metric panels and indicators |
| `--color-purple` | `#7C3AED` | `--purple` | Primary brand purple, CTA accents, active states |
| `--color-purple-hover` | `#6D28D9` | — | Darker purple state for CTA hover/active |
| `--color-purple2` | `#9D6FFF` | `--purple2` | Lighter accent purple, highlight gradient stop, tag text |
| `--color-cyan` | `#06B6D4` | `--cyan` | Cyan accent, Kritexa.AI product identity, waitlist badge |
| `--color-cyan-hover` | `#0891B2` | — | Darker cyan state for hover/active |
| `--color-white` | `#FFFFFF` | `--white` | Primary text and major headers |
| `--color-gray` | `#A1A1AA` | `--gray` | Secondary text, descriptions, body text |
| `--color-gray2` | `#52525B` | `--gray2` | Muted metadata, descriptions, scroll tracks |
| `--color-gray3` | `#27272A` | `--gray3` | Very muted borders, separators, dividers |

### Semantic State Colors
| Token | Value | Purpose / Usage |
| :--- | :--- | :--- |
| `--color-success` | `#22C55E` | Live / active indicators, success state borders |
| `--color-warning` | `#FFB547` | Warning label, coming soon waitlist tags |
| `--color-error` | `#EF4444` | Errors, warning indicators, critical states |
| `--color-gold` | `#FFD700` | Job listing "Apply" highlighting |
| `--color-star` | `#F5C518` | Testimonial star ratings |

### Capability Industry Themes
| Token | Value | Purpose / Usage |
| :--- | :--- | :--- |
| `--color-theme-green` | `#10B981` | Service / Capability grid theme green |
| `--color-theme-orange` | `#F59E0B` | Service / Capability grid theme orange |
| `--color-theme-pink` | `#EC4899` | Service / Capability grid theme pink |
| `--color-theme-teal` | `#14B8A6` | Service / Capability grid theme teal |

---

## 3. Gradient & Glow Tokens

### Gradient Primitives
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--gradient-text` | `linear-gradient(135deg, #fff 0%, var(--purple2) 50%, var(--cyan) 100%)` | Headline text gradient |
| `--gradient-primary` | `linear-gradient(135deg, #5B21B6 0%, #4C1D95 100%)` | Main solid CTA buttons |
| `--gradient-whatsapp` | `linear-gradient(135deg, #25D366, #128C7E)` | WhatsApp interactive buttons |
| `--gradient-footer-box` | `linear-gradient(160deg, rgba(28,26,40,0.95), rgba(18,16,28,0.98))` | Footer 3D box background |
| `--gradient-hero-bg` | `radial-gradient(ellipse 70% 60% at 65% 40%, rgba(124,58,237,.1), transparent 65%)` | Page hero atmospheric overlay |
| `--gradient-ambient-purple`| `radial-gradient(circle, #7C3AED, transparent 70%)` | Ambient orb backdrop 1 & 3 |
| `--gradient-ambient-cyan`  | `radial-gradient(circle, #06B6D4, transparent 70%)` | Ambient orb backdrop 2 |

### Ambient Glows & Shadows
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--effect-glow-purple` | `rgba(124, 58, 237, 0.25)` | `--glow`: Purple box glows |
| `--effect-glow-cyan` | `rgba(6, 182, 212, 0.2)` | `--glow2`: Cyan box glows |
| `--glow-primary` | `rgba(124,58,237,0.3)` | Core purple shadow base |
| `--glow-accent` | `rgba(6,182,212,0.25)` | Core cyan shadow base |
| `--shadow-btn-p` | `0 0 30px var(--glow-primary)` | Primary CTA box shadow |
| `--shadow-btn-p-hover` | `0 6px 40px rgba(124,58,237,0.5)` | Primary CTA hover box shadow |
| `--shadow-footer-box` | `0 0 0 1px rgba(255,255,255,0.055), 0 8px 32px rgba(0,0,0,0.55), ...` | 3D-effect footer panel shadows |
| `--shadow-about-hero` | `0 0 0 1px var(--color-border-purple), 0 24px 80px rgba(0,0,0,0.65), ...` | Elevated full-screen hero shadows |

---

## 4. Typography Scale

The font assets are loaded from Google Fonts CDN, comprising `Inter` for primary styling and headings, and `JetBrains Mono` for metadata, labels, and code metrics.

### Typography Tokens
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--font-family-primary` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Global sans-serif body & heading |
| `--font-family-mono` | `'JetBrains Mono', Consolas, monospace` | Labels, tags, and small monospace cards |
| `--font-size-hero` | `clamp(40px, 5.5vw, 72px)` | Home hero primary heading `h1` |
| `--font-size-section-heading`| `clamp(32px, 4.5vw, 54px)` | Section headings `.sh h2` |
| `--font-size-inner-hero` | `clamp(36px, 5vw, 62px)` | Inner page hero primary heading `h1` |
| `--font-size-canvas-big` | `clamp(80px, 18vw, 220px)` | Giant text background grids |
| `--font-size-about-hero` | `clamp(36px, 5vw, 64px)` | About Page hero h1 |
| `--font-size-body-lg` | `17px` | Section subtitle paragraphs |
| `--font-size-body` | `15px` | Standard page paragraphs and main buttons |
| `--font-size-body-sm` | `13.5px` | Card content and description copies |
| `--font-size-caption` | `11px` | Eyebrow labels, badges, tags |

### Typography Weights & Spacings
- **Font Weights**: Light (`300`), Normal (`400`), Medium (`500`), Semibold (`600`), Bold (`700`), Extrabold (`800`), Black (`900`).
- **Line Heights**: Tight (`1.04`), Tight Heading (`1.1`), Normal (`1.6`), Relaxed (`1.7`).
- **Letter Spacings**: Hero (`-2.5px`), Section (`-1.5px`), Monospace (`.18em`), Nav (`0.02em`).

---

## 5. Spacing System

Derived directly from existing structural layouts, standardizing paddings and margins.
```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-7:  28px;
--space-8:  32px;
--space-9:  40px;
--space-10: 48px;
--space-11: 60px;
--space-12: 64px;  /* Section-sm spacing */
--space-13: 96px;  /* Section default spacing */
```

---

## 6. Border & Radius System

- **Border Width**: `1px` standard
- **Border Style**: `solid` standard
- **Border Radius System**:
  - `var(--radius-sm)` (`10px` / `--r`): Inputs, small elements, inner action panels.
  - `var(--radius-md)` (`16px` / `--r2`): Bento panels, case study cards, dialog boxes.
  - `var(--radius-lg)` (`24px` / `--r3`): Large cards, processes, main outer container rounded edges.
  - `var(--radius-pill)` (`100px`): Nav bar link capsules, active tags, waitlist pills.
  - `var(--radius-circle)` (`50%`): Avatars, indicators, blinking dots.
  - `var(--radius-about-hero)` (`18px`): Solution tiles, about hero components.
  - `var(--radius-fs-hero)` (`20px`): Full-screen contact & value cards.

---

## 7. Container & Layout System

- **Page Max Width**: `1180px` centered via `margin-inline: auto`.
- **Page Side Padding (Horizontal Gutters)**: `28px` on desktop, configured through `var(--container-padding)`.
- **Containers**:
  ```css
  .container {
    width: 100%;
    max-width: var(--container-max-width);
    margin-inline: auto;
    padding-inline: var(--container-padding);
  }
  ```

---

## 8. Layering (Z-Index Scale)

Layer thresholds defined to prevent overlaps and ensure proper stacking behavior:
```css
--z-below:   -1;    /* Background pseudo-elements */
--z-base:     1;    /* Standard layouts, absolute metrics */
--z-above:    2;    /* Interactive graphics overlay */
--z-nav:    100;    /* Interactive elements under active bar */
--z-header:1000;    /* Fixed navbar block */
--z-dropdown:2000;  /* Dropdowns, waitlists, overlays */
--z-cursor:9999;    /* Floating custom cursor circles */
```

---

## 9. UI Components Foundations

### Buttons
- **Primary Button** (`.btn-p`): Purple background, medium text, standard padding, glowing ambient hover, `translateY(-2px)`.
- **Ghost / Outline Button** (`.btn-g`): Transparent, border highlight on hover, active state with background tint.
- **Nav Button Solid** (`.btn-nav-solid`): Distinct purple solid gradient with inner bevel borders, designed for navigation call-to-actions.
- **Nav Button Ghost** (`.btn-nav-ghost`): Glassy layout button, subtle borders, highlight active indicators.
- **WhatsApp Connect** (`.btn-wa`): Green gradient theme, distinct connect glow.
- **Submit Button** (`.btn-sub`): Contact-form-specific full-width primary button.

### Cards
- **Service Card** (`.svc-item`): Bento-derived grid gap structure, thin separator glow on hover, slides `.svc-link` into visibility.
- **Bento Card** (`.b-card`): Home-grid content container, spans dynamically via `.b-wide` / `.b-tall` with soft purple border hovering.
- **Case Study Card** (`.cs-card`): Thumbnail background gradient overlay (`.cst-1`, `.cst-2`, `.cst-3`), tags, metric rows.
- **Testimonial Card** (`.t-card`): Profile elements, avatars, star rating containers, italic quotes, scrolling frame layouts.

### Links
- **Nav Links** (`.nav-link`): Frosted active pill hover, radial dot glows.
- **Specialized Nav Pills** (`.nav-labs-pill` & `.nav-kai-pill`): Green/cyan highlighted badges for Careers, Labs, and Kritexa.AI.

### Forms
- **Form Group** (`.fg`): Vertical stacked group, label JetBrains Mono headers, clean rounded glassy inputs, selects, and textareas. Focus rings highlighted in brand purple with subtle surrounding shadows.

### Sections
- **Primitives**: `.section` & `.section-sm` vertical spacing, nested `.sh` heading blocks for consistent typography distribution.

---

## 10. Motion & Animation Tokens

- **Timing Scales**: Fast (`0.2s` / `--duration-fast`), Normal (`0.25s` / `--duration-normal`), Slow (`0.65s` / `--duration-slow`).
- **Eases**: Standard (`ease`), In-Out (`ease-in-out`).

---

## 11. Accessibility & Performance Foundations

- **Visible Keyboard Focus**: `:focus-visible` defines a solid outline with offsets utilizing brand colors to replace native outlines without compromising mouse user experiences.
- **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, all CSS transitions and animations are overridden to instant speeds (`1ms` delays, `0s` durations). Atmospheric blobs (`.ambient`, `.amb-blob`), custom trailing cursors (`#cur`, `#cur-r`), and reveal movements (`.rv`) are safely disabled and fully simplified to their static end states.
- **External request isolation**: All fonts remain within a single Google Fonts request. CSS imports are isolated and sequentially cached by modern browsers, preserving critical bundle parameters.

---

## 12. Phase 3 — Header CSS Architecture

Phase 3 introduced `css/header.css` as a dedicated stylesheet for all navigation/header styles.

## 13. Phase 5 — Footer CSS Architecture

Phase 5 introduced `css/footer.css` as a dedicated stylesheet for all footer and Global CTA styles.

### CSS Load Order (Phase 5 — current)

```
css/global.css      (design tokens, reset, accessibility)
    ↓
css/utilities.css   (layout primitives, spacing, buttons, reveal)
    ↓
css/header.css      (navbar, mobile drawer, Products trigger, skip-nav, active state)
    ↓
css/footer.css      (footer, Global CTA, newsletter, social icons, legal placeholders)
    ↓
css/components.css  (page-specific components, cards, forms — legacy footer block retained for safety)
```

### Footer Token Usage

| Property | Token Used |
|---|---|
| Footer background | `var(--color-bg)` |
| Panel background gradient | `var(--gradient-footer-box)` |
| Panel shadows | `var(--shadow-footer-box)` |
| Panel radius | `var(--radius-md)` = `16px` |
| Input / button radius | `var(--radius-sm)` = `10px` |
| Newsletter button gradient | `var(--gradient-primary)` |
| Caption font size | `var(--font-size-caption)` = `11px` |
| Mono font | `var(--font-family-mono)` |
| Muted text | `var(--color-gray)`, `var(--color-gray2)` |
| Cyan for Kritexa.AI | `var(--color-cyan)` |
| Purple for Labs | `var(--color-purple2)` |
| Focus outline | `var(--color-purple2)` |
| Transition speed | `var(--duration-normal)` = `0.25s` |

### New Footer Component Classes (Phase 5)

| Class | Description |
|---|---|
| `.f-nl-box` | Newsletter strip — 3D premium panel |
| `.f-nl-title` | Newsletter heading text |
| `.f-nl-form` | Newsletter `<form>` element |
| `.f-nl-input` | Email input field |
| `.f-nl-btn` | Subscribe submit button |
| `.f-main-grid` | Two-column grid (links left, brand right) |
| `.f-links-box` | Left panel containing navigation columns |
| `.f-links-inner` | 4-column navigation grid (`<nav>`) |
| `.f-col` | One navigation column |
| `.f-col-label` | Column heading (monospace, uppercase) |
| `.f-col-links` | Navigation link list |
| `.f-link-kai` | Cyan-styled Kritexa.AI link |
| `.f-link-labs` | Purple-styled Labs link |
| `.f-link-pending` | Non-clickable legal placeholder span |
| `.f-copyright-strip` | Copyright bar inside `.f-links-box` |
| `.f-right-stack` | Right panel container |
| `.f-brand-box` | Brand card (logo + description + social) |
| `.f-brand-logo` | `<a>` logo + wordmark link |
| `.f-brand-logo-mark` | Logo image wrapper |
| `.f-brand-dim` | Muted "LABS" text in wordmark |
| `.f-brand-desc` | Brand description paragraph |
| `.f-socials` | Social icons row |
| `.f-soc` | Single social icon button |
| `.f-soc.s-ig` | Instagram — gradient hover |
| `.f-soc.s-x` | X/Twitter — dark hover |
| `.f-soc.s-li` | LinkedIn — blue hover |
| `.f-soc.s-fb` | Facebook — blue hover |
| `.f-soc.s-yt` | YouTube — red hover |
| `.f-soc.s-th` | Threads — dark hover |
| `.f-powered-box` | Powered-by / Designed-by panel |
| `.f-powered-row` | One row in powered-by box |
| `.f-powered-lbl` | Label text ("Powered by") |
| `.f-powered-link` | Purple monospace link |
| `.f-powered-sep` | Horizontal rule between rows |

### CSS Load Order (Phase 3)

```
css/global.css      (design tokens, reset, accessibility)
    ↓
css/utilities.css   (layout primitives, spacing, buttons, reveal)
    ↓
css/header.css      (navbar, mobile drawer, Products trigger, skip-nav, active state)
    ↓
css/components.css  (page-specific components, cards, forms, footer)
```

### Header Token Usage

All header styles reference Phase 2 design tokens:

| Property | Token Used |
|---|---|
| Header z-index | `var(--z-header)` = `1000` |
| Dropdown z-index | `var(--z-dropdown)` = `2000` |
| Nav font size | `var(--font-size-body-sm)` = `13.5px` |
| Nav letter spacing | `var(--letter-spacing-nav)` = `0.02em` |
| Nav link radius | `var(--radius-pill)` = `100px` |
| Hamburger / button radius | `var(--radius-sm)` = `10px` |
| Transition speed | `var(--duration-fast)` = `0.2s` |
| Slow transition | `var(--duration-slow)` = `0.65s` |
| Purple brand | `var(--color-purple)`, `var(--color-purple2)` |
| Cyan brand | `var(--color-cyan)` |
| White text | `var(--color-white)` |
| Muted text | `var(--color-gray)`, `var(--color-gray2)` |
| Border | `var(--color-border)` |
| Container padding | `var(--space-4)`, `var(--space-6)`, `var(--space-8)` |
| Focus outline | `var(--color-purple2)` |

### New Header Component Classes (Phase 3 + Phase 4)

| Class | Description |
|---|---|
| `.skip-nav` | Skip navigation link — offscreen until focused |
| `.nav-products-trigger` | Products menu trigger button |
| `.nav-products-arrow` | Rotating arrow indicator (rotates 180° when open) |
| `.products-mega-menu` | Desktop mega menu container — full-width panel |
| `.pmm-inner` | Mega menu 4-column grid layout |
| `.pmm-col` | One product category column |
| `.pmm-col-header` | Column header row (icon + title) |
| `.pmm-col-icon` | SVG icon wrapper for category |
| `.pmm-col-title` | Category title text |
| `.pmm-col-desc` | Category short description |
| `.pmm-coming` | Coming-soon indicator row |
| `.pmm-coming-tag` | Yellow "Coming Soon" monospace badge |
| `.pmm-coming-note` | Muted explanatory note |
| `.pmm-footer-strip` | Bottom strip with Kritexa.AI cross-link |
| `.pmm-footer-link` | Cyan Kritexa.AI link in footer strip |
| `.pmm-footer-dot` | Animated cyan dot in footer strip |
| `.nav-mob-link` | Mobile drawer navigation link |
| `.nav-mob-kai` | Kritexa.AI mobile link (cyan variant) |
| `.nav-mob-dim` | Footer-only links in mobile drawer (muted purple) |
| `.nav-mob-divider` | Visual separator between primary and footer-only links |
| `.nav-mob-products` | Mobile Products trigger button |
| `.nav-mob-products-panel` | Mobile Products accordion panel |
| `.mob-pmm-grid` | 2-column grid for mobile product categories |
| `.mob-pmm-item` | One mobile product category item |
| `.mob-pmm-icon` | SVG icon in mobile category item |
| `.mob-pmm-label` | Category name label in mobile item |
| `.mob-pmm-soon` | Small "soon" monospace badge in mobile item |
| `body.nav-open` | Applied when mobile menu is open (scroll lock) |
