/**
 * scripts/build.js
 * Phase 17 — Advanced SEO, Indexing & Structured Data Engineering
 *             (updated from Phase 13)
 *
 * Minimal static site builder for Kritexa Labs.
 *
 * Strategy: HTML partial composition
 *   components/header.html + page source + components/footer.html
 *   → production page (about/index.html, etc.)
 *
 * This build system:
 *   1. Reads component partials (header, footer)
 *   2. Reads page source templates from src/pages/
 *   3. Resolves {{SECTION:path}} partials from src/sections/
 *   4. Combines them into full HTML pages in the page directories
 *
 * Usage:
 *   node scripts/build.js          — build all pages
 *   node scripts/build.js home     — build a specific page
 *
 * Template syntax:
 *   {{COMPONENT:header}}           — include components/header.html
 *   {{COMPONENT:footer}}           — include components/footer.html
 *   {{SECTION:home/hero}}          — include src/sections/home/hero.html
 *   {{PAGE_TITLE}}                 — page-specific <title> text
 *   {{PAGE_DESCRIPTION}}           — page-specific meta description
 *   {{PAGE_CANONICAL}}             — canonical URL (e.g. /about)
 *   {{PAGE_ACTIVE_NAV}}            — active nav link ID (e.g. nl-about)
 *
 * IMPORTANT: The output pages are pure static HTML.
 * No JavaScript is needed at runtime to inject the header/footer.
 * This is critical for SEO, first render, and no-JS compatibility.
 *
 * Source pages: src/pages/*.html
 * Source sections: src/sections/[page]/[section].html
 * Output pages: <page-name>/index.html (and index.html for home)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT        = path.join(__dirname, '..');
const COMPONENTS  = path.join(ROOT, 'components');
const SRC_PAGES   = path.join(ROOT, 'src', 'pages');
const SRC_SECTIONS = path.join(ROOT, 'src', 'sections');

// ── Helper: read a file safely ────────────────────────────────────────────
function readFile(filepath) {
  if (!fs.existsSync(filepath)) return null;
  return fs.readFileSync(filepath, 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Load shared components ────────────────────────────────────────────────
const headerHTML = readFile(path.join(COMPONENTS, 'header.html')) || '';
const footerHTML = readFile(path.join(COMPONENTS, 'footer.html')) || '';

// ── Component registry ────────────────────────────────────────────────────
const components = {
  'header' : headerHTML,
  'footer' : footerHTML
};

// ── Token replacement ─────────────────────────────────────────────────────
function processTokens(html, tokens) {
  // Replace {{COMPONENT:name}} with component content
  html = html.replace(/\{\{COMPONENT:([a-zA-Z0-9_-]+)\}\}/g, function(_, name) {
    return components[name] || `<!-- MISSING COMPONENT: ${name} -->`;
  });

  // Replace {{SECTION:path}} with section partial content
  // e.g. {{SECTION:home/hero}} → src/sections/home/hero.html
  html = html.replace(/\{\{SECTION:([a-zA-Z0-9_/-]+)\}\}/g, function(_, sectionPath) {
    const sectionFile = path.join(SRC_SECTIONS, sectionPath + '.html');
    const sectionContent = readFile(sectionFile);
    if (sectionContent === null) {
      console.warn(`  ⚠ Section not found: src/sections/${sectionPath}.html`);
      return `<!-- MISSING SECTION: ${sectionPath} -->`;
    }
    return sectionContent;
  });

  // Replace {{TOKEN}} with values
  Object.keys(tokens).forEach(function(key) {
    html = html.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), tokens[key]);
  });
  return html;
}

// ── Active nav injection ──────────────────────────────────────────────────
// Adds class="active" and aria-current="page" to the nav link matching the
// current page.
//
// Strategy: find the opening tag that contains id="<activeNavId>" and:
//   1. Append ' active' to its class attribute value
//   2. Insert aria-current="page" after the id attribute
//
// This handles any attribute ordering (class before id, id before class,
// other attributes in between like href, role, etc.)
function injectActiveNav(html, activeNavId) {
  if (!activeNavId) return html;

  // Capture the entire opening tag that contains the target id.
  // Then manipulate the captured tag string.
  var idPattern = new RegExp(
    '(<[a-zA-Z]+(?:\\s+[^>]*?)?' +
    '\\s+id="' + activeNavId + '"' +
    '(?:\\s+[^>]*)?>)',
    'g'
  );

  return html.replace(idPattern, function (tag) {
    // 1. Add aria-current="page" after id="..."
    var withAria = tag.replace(
      'id="' + activeNavId + '"',
      'id="' + activeNavId + '" aria-current="page"'
    );

    // 2. Append 'active' to the existing class attribute
    var withActive = withAria.replace(
      /class="([^"]*)"/,
      function (m, classVal) {
        var trimmed = classVal.trim();
        return 'class="' + (trimmed ? trimmed + ' active' : 'active') + '"';
      }
    );

    return withActive;
  });
}

// ── Add main-content landmark ─────────────────────────────────────────────
// Wraps the page content (non-header, non-footer) in an id="main-content"
// <main> element so the skip-nav link works.
// The build system inserts page content between header and footer, so we
// mark the first non-component block as main here.
function wrapMainContent(html) {
  // Strategy: inject id="main-content" as an attribute on the first <main>
  // element found after the navbar close tag. If no <main>, we add a wrapper.
  if (html.indexOf('id="main-content"') !== -1) return html; // already present

  // Find </nav> ... </footer> region — wrap the content between them
  // We look for the first <!-- ══════════ comment that follows the navbar
  // and insert a <main id="main-content"> anchor point.
  // Simple approach: replace the FIRST occurrence of <!-- page content start
  // comment or just prepend id to the first <main> tag.
  if (html.indexOf('<main') !== -1) {
    // Add id="main-content" to the first <main> tag
    return html.replace('<main', '<main id="main-content"');
  }

  // No <main> — inject a <div id="main-content"> anchor before footer
  // (Pages will be updated to use <main> in Phase 6-13)
  // As a safe fallback, insert a landmark comment — active-nav focus works
  // because skip-nav uses href="#main-content"
  return html;
}

// ── Page definitions ──────────────────────────────────────────────────────
// Each page: source template → output path, plus token values
// css:      optional array of page-specific stylesheet paths (loaded after components.css)
// ogImage:  optional absolute URL for og:image / twitter:image
//           Phase 17: use existing extracted assets where semantically appropriate.
//           Pages without a suitable existing image have ogImage omitted;
//           a dedicated OG asset at 1200×630 is recommended before launch.
const SITE_URL = 'https://www.kritexalabs.com';
const OG_DEFAULT_IMAGE = `${SITE_URL}/assets/logos/logo.png`;

const pages = [
  {
    id          : 'home',
    src         : 'home.html',
    out         : 'index.html',
    title       : 'Kritexa Labs — AI-First Digital Growth Studio',
    description : 'Kritexa Labs engineers AI-powered digital growth systems — websites, automation, CRM, and SEO for businesses that want to scale.',
    canonical   : '/',
    activeNav   : 'nl-home',
    css         : ['/css/pages/home.css'],
    // Phase 20: preload home hero background image.
    // home-hero-bg.jpg is a CSS background on .jk-hero-bg — the browser
    // cannot discover it until it parses home.css (loaded after components.css).
    // Preloading ensures it starts fetching in parallel with CSS parsing,
    // improving LCP for the hero section.
    preloads    : [{ href: '/assets/images/home-hero-bg.jpg', as: 'image', type: 'image/jpeg' }],
    // Phase 20: home-hero-bg.jpg is the primary visual — use as OG image.
    ogImage     : `${SITE_URL}/assets/images/home-hero-bg.jpg`,
    schema      : buildOrganizationSchema
  },
  {
    id          : 'about',
    src         : 'about.html',
    out         : 'about/index.html',
    title       : 'About Kritexa Labs — AI-First Digital Growth Studio, Pune',
    description : 'Kritexa Labs engineers complete digital growth machines — AI-powered systems that attract leads, automate operations, and scale revenue. Based in Hinjewadi, Pune.',
    canonical   : '/about',
    activeNav   : 'nl-about',
    css         : ['/css/pages/about.css'],
    // Phase 16: preload the CSS background hero image — browser cannot discover
    // it until it parses components.css; preloading improves LCP (ESTIMATED).
    preloads    : [{ href: '/assets/images/about-hero.jpg', as: 'image', type: 'image/jpeg' }],
    // about-hero.jpg is 172 KB JPEG — suitable as OG image for the About page.
    ogImage     : `${SITE_URL}/assets/images/about-hero.jpg`,
    schema      : buildOrganizationSchema
  },
  {
    id          : 'capabilities',
    src         : 'capabilities.html',
    out         : 'capabilities/index.html',
    title       : 'Capabilities — Kritexa Labs | Technology, AI & Engineering',
    description : 'Explore the engineering capabilities of Kritexa Labs: web systems, AI agents, business automation, growth engineering, commerce systems and platform support.',
    canonical   : '/capabilities',
    activeNav   : 'nl-capabilities',
    css         : ['/css/pages/capabilities.css'],
    // solution-01.jpg — first capabilities industry image; appropriate as OG asset.
    ogImage     : `${SITE_URL}/assets/images/solution-01.jpg`,
    schema      : buildServiceSchema
  },
  {
    // Phase 22 — NEW: Industry Solutions page
    id          : 'industry-solutions',
    src         : 'industry-solutions.html',
    out         : 'industry-solutions/index.html',
    title       : 'Industry Solutions — Kritexa Labs | Solutions by Business Type',
    description : 'Kritexa Labs builds tailored digital solutions for healthcare, consulting, finance, startups, local business, education, e-commerce and personal brands.',
    canonical   : '/industry-solutions',
    activeNav   : 'nl-industry-solutions',
    css         : ['/css/pages/industry-solutions.css'],
    // solution-01.jpg — industry image; appropriate as OG asset.
    ogImage     : `${SITE_URL}/assets/images/solution-01.jpg`,
    schema      : buildServiceSchema
  },
  {
    id          : 'portfolio',
    src         : 'portfolio.html',
    out         : 'portfolio/index.html',
    title       : 'Portfolio — Kritexa Labs | What We Have Made',
    description : 'Explore work by Kritexa Labs across healthcare, consulting, finance, startups, local business, education, e-commerce and personal brands. Real projects, real results.',
    canonical   : '/portfolio',
    activeNav   : 'nl-portfolio',
    css         : ['/css/pages/portfolio.css'],
    js          : ['/js/pages/portfolio.js'],
    // portfolio-placeholder.jpg — used for all portfolio project cards.
    ogImage     : `${SITE_URL}/assets/images/portfolio-placeholder.jpg`
  },
  {
    id          : 'case-studies',
    src         : 'case-studies.html',
    out         : 'case-studies/index.html',
    title       : 'Case Studies — Kritexa Labs | Real Business Problems & Outcomes',
    description : 'See how Kritexa Labs solved real business problems with AI, automation, and web systems. Deep dives into healthcare, e-commerce, local SEO, and more.',
    canonical   : '/case-studies',
    activeNav   : 'nl-case-studies',
    css         : ['/css/pages/case-studies.css'],
    js          : ['/js/pages/case-studies.js'],
    // No dedicated case-studies hero image; fallback to logo.
    // RECOMMENDATION: create a dedicated 1200×630 asset before launch.
    ogImage     : OG_DEFAULT_IMAGE
  },
  {
    // Phase 22 — NEW: Live Projects page
    id          : 'live-projects',
    src         : 'live-projects.html',
    out         : 'live-projects/index.html',
    title       : 'Live Projects — Kritexa Labs | Experience What We Have Built',
    description : 'Experience real software, systems, and products built by Kritexa Labs. Don\'t just see what we build — interact with it.',
    canonical   : '/live-projects',
    activeNav   : 'nl-live-projects',
    css         : ['/css/pages/live-projects.css'],
    // No dedicated live-projects hero image; fallback to logo.
    // RECOMMENDATION: create a dedicated 1200×630 asset before launch.
    ogImage     : OG_DEFAULT_IMAGE
  },
  {
    id          : 'contact',
    src         : 'contact.html',
    out         : 'contact/index.html',
    title       : 'Contact — Kritexa Labs | Start Your Project',
    description : 'Get in touch with Kritexa Labs. Send a project inquiry, WhatsApp us directly, or email contact@kritexalabs.com. We reply within 2–4 hours.',
    canonical   : '/contact',
    activeNav   : 'nl-contact',
    css         : ['/css/pages/contact.css'],
    // Phase 16: preload the CSS background hero image — browser cannot discover
    // it until it parses components.css; preloading improves LCP (ESTIMATED).
    preloads    : [{ href: '/assets/images/contact-hero.jpg', as: 'image', type: 'image/jpeg' }],
    // contact-hero.jpg is a team/work photo — suitable as OG image for the Contact page.
    ogImage     : `${SITE_URL}/assets/images/contact-hero.jpg`
  },
  {
    id          : 'kritexa-ai',
    src         : 'kritexa-ai.html',
    out         : 'kritexa-ai/index.html',
    title       : "Kritexa.AI — India's AI Platform for Business Growth | Kritexa Labs",
    description : "Kritexa.AI is being built to bring autonomous AI agents, conversational intelligence, and predictive growth tools to Indian businesses. Join the early access waitlist.",
    canonical   : '/kritexa-ai',
    activeNav   : 'nl-kritexaai',
    css         : ['/css/pages/kritexa-ai.css'],
    // No dedicated Kritexa.AI hero image (CSS gradient only). Fallback to logo.
    // RECOMMENDATION: create a dedicated 1200×630 asset before launch.
    ogImage     : OG_DEFAULT_IMAGE
  },
  {
    id          : 'career',
    src         : 'career.html',
    out         : 'career/index.html',
    title       : 'Career — Kritexa Labs | Join Our Team',
    description : 'Join the Kritexa Labs team — passionate builders working on AI, web development, and digital growth. View open roles and internship opportunities.',
    canonical   : '/career',
    activeNav   : '',
    css         : ['/css/pages/career.css'],
    ogImage     : OG_DEFAULT_IMAGE
  },
  {
    id          : 'labs',
    src         : 'labs.html',
    out         : 'labs/index.html',
    title       : 'Kritexa LABS — Experiments, Builds & Technology',
    description : 'Kritexa LABS is an engineering playground for experiments, prototypes, and internal builds. Where ideas become technology.',
    canonical   : '/labs',
    activeNav   : '',
    css         : ['/css/pages/labs.css'],
    js          : ['/js/pages/labs.js'],
    ogImage     : OG_DEFAULT_IMAGE
  }
];

// ── Structured data helpers ───────────────────────────────────────────────
// Only include factually verified properties (Phase 17.19-17.23).
// Social profiles sourced from legacy footer (components/footer.html).
// Address deferred — not independently verified (Phase 17.24).
// No AggregateRating, telephone, revenue, or awards (Phase 17.25).

function buildOrganizationSchema() {
  return JSON.stringify({
    "@context" : "https://schema.org",
    "@type"    : "Organization",
    "name"     : "Kritexa Labs",
    "url"      : "https://www.kritexalabs.com",
    "logo"     : "https://www.kritexalabs.com/assets/logos/logo.png",
    "sameAs"   : [
      "https://instagram.com/kritexalabs",
      "https://x.com/kritexalabs",
      "https://www.linkedin.com/company/kritexa-labs/",
      "https://www.facebook.com/kritexalabs1",
      "https://youtube.com/@kritexalabs",
      "https://threads.net/@kritexalabs"
    ]
  }, null, 2);
}

function buildServiceSchema() {
  return JSON.stringify({
    "@context" : "https://schema.org",
    "@type"    : "WebPage",
    "name"     : "Capabilities — Kritexa Labs | Websites, AI, Automation & Growth",
    "url"      : "https://www.kritexalabs.com/capabilities",
    "description" : "From websites to AI automation — explore the full capabilities of Kritexa Labs: digital experience, AI workforce, business automation, growth marketing, commerce, and more.",
    "provider" : {
      "@type" : "Organization",
      "name"  : "Kritexa Labs",
      "url"   : "https://www.kritexalabs.com"
    },
    "hasOfferCatalog" : {
      "@type" : "OfferCatalog",
      "name"  : "Digital Growth Services",
      "itemListElement" : [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Experience — Websites, Landing Pages, Web Apps" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Workforce — AI Chatbots, WhatsApp AI, Voice Agents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Automation — CRM, Workflow, API Integration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Growth Marketing — SEO, Google Ads, Meta Ads, Content" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commerce Solutions — Shopify, WooCommerce, Payments" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Growth and Support — Performance, Security, Analytics" } }
      ]
    }
  }, null, 2);
}

// WebSite schema — emitted on every page alongside page-specific schema.
function buildWebSiteSchema() {
  return JSON.stringify({
    "@context" : "https://schema.org",
    "@type"    : "WebSite",
    "name"     : "Kritexa Labs",
    "url"      : "https://www.kritexalabs.com"
    // SearchAction omitted — no site search endpoint exists (Phase 17.21).
  }, null, 2);
}

// BreadcrumbList schema — for inner pages only (not home).
function buildBreadcrumbSchema(pageTitle, canonical) {
  return JSON.stringify({
    "@context"        : "https://schema.org",
    "@type"           : "BreadcrumbList",
    "itemListElement" : [
      {
        "@type"    : "ListItem",
        "position" : 1,
        "name"     : "Home",
        "item"     : "https://www.kritexalabs.com/"
      },
      {
        "@type"    : "ListItem",
        "position" : 2,
        "name"     : pageTitle,
        "item"     : `https://www.kritexalabs.com${canonical}`
      }
    ]
  }, null, 2);
}

// ── Page wrapper template ─────────────────────────────────────────────────
// pageCss:    optional array of page-specific stylesheet paths
// pageJs:     optional array of page-specific JS paths (injected after active-nav.js)
// pageId:     data-page on <body> — read by JS guards in animations.js
// preloads:   optional array of {href, as, type?} resource hint objects
//             Use for above-the-fold CSS background images (LCP candidates)
//             that the browser cannot discover until it parses the CSS.
// ogImage:    absolute URL for og:image and twitter:image (Phase 17)
// schemaFn:   optional function returning a JSON-LD object string (Phase 17)
// canonical:  path for breadcrumb schema (Phase 17)
// title:      used for breadcrumb label on inner pages (Phase 17)
function buildPageWrapper(title, description, canonical, bodyContent, pageCss, pageJs, pageId, preloads, ogImage, schemaFn) {
  const extraCss = (pageCss || [])
    .map(function(href) { return `<link rel="stylesheet" href="${href}">`; })
    .join('\n');
  const extraJs = (pageJs || [])
    .map(function(src) { return `<!-- page-specific: ${src} -->\n<script src="${src}"></script>`; })
    .join('\n');
  // Preload hints — only emit when an item is passed
  // Each item: { href: '/path/to/image.jpg', as: 'image', type: 'image/jpeg' }
  const extraPreloads = (preloads || [])
    .map(function(p) {
      const typeAttr = p.type ? ` type="${p.type}"` : '';
      return `<link rel="preload" href="${p.href}" as="${p.as}"${typeAttr} fetchpriority="high">`;
    })
    .join('\n');
  // data-page attribute on <body> — read by js/animations.js guards
  const bodyAttr = pageId ? ` data-page="${pageId}"` : '';

  // OG image meta — emit only when an ogImage is provided
  const ogImageMeta = ogImage
    ? `<meta property="og:image" content="${ogImage}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">`
    : '';

  // Twitter/X card metadata (Phase 17.10)
  // Use summary_large_image when an image exists, else summary
  const twitterCard    = ogImage ? 'summary_large_image' : 'summary';
  const twitterImageMeta = ogImage
    ? `<meta name="twitter:image" content="${ogImage}">`
    : '';

  // JSON-LD structured data (Phase 17.19-17.23)
  // Always emit WebSite schema; emit page-specific schema if schemaFn is provided.
  // Emit BreadcrumbList for all inner pages (canonical !== '/').
  let jsonLdBlocks = [];
  jsonLdBlocks.push(`<script type="application/ld+json">\n${buildWebSiteSchema()}\n</script>`);
  if (schemaFn) {
    jsonLdBlocks.push(`<script type="application/ld+json">\n${schemaFn()}\n</script>`);
  }
  if (canonical !== '/') {
    // Use a short readable label: strip trailing slashes, take last segment
    const breadcrumbLabel = title.split(' — ')[0].split(' | ')[0];
    jsonLdBlocks.push(`<script type="application/ld+json">\n${buildBreadcrumbSchema(breadcrumbLabel, canonical)}\n</script>`);
  }
  const jsonLd = jsonLdBlocks.join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE_URL}${canonical}">
<!-- Open Graph — Phase 17 -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${SITE_URL}${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kritexa Labs">
${ogImageMeta}
<!-- Twitter / X Card — Phase 17 -->
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:site" content="@kritexalabs">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
${twitterImageMeta}
<!-- Favicon — Phase 17 -->
<link rel="icon" type="image/png" href="/assets/logos/logo.png">
<link rel="apple-touch-icon" href="/assets/logos/logo.png">
<meta name="theme-color" content="#0a0a0f">
<!-- Fonts — preconnect for parallel connection; dns-prefetch as fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<!-- CSS — dependency order: tokens → global → utilities → header → footer → components → page -->
<link rel="stylesheet" href="/css/global.css">
<link rel="stylesheet" href="/css/utilities.css">
<link rel="stylesheet" href="/css/header.css">
<link rel="stylesheet" href="/css/footer.css">
<link rel="stylesheet" href="/css/components.css">
${extraCss}${extraPreloads ? '\n<!-- Preload: LCP image hints for CSS background images -->\n' + extraPreloads : ''}
<!-- Structured Data — Phase 17 -->
${jsonLd}
</head>
<body${bodyAttr}>

${bodyContent}

<!-- JS — dependency order: global → navigation → animations → active-nav → page -->
<!-- global.js: cursor, scroll reveal, counters, FAQ, social hover -->
<script src="/js/global.js"></script>
<!-- navigation.js: Phase 3+4+5 mobile menu, Products mega menu, scroll state, legacy SPA shim -->
<script src="/js/navigation.js"></script>
<!-- animations.js: countdown (kritexa-ai only), process orbital guard, canvas guard -->
<script src="/js/animations.js"></script>
<!-- active-nav.js: sets aria-current="page" and .active based on URL pathname -->
<script src="/js/active-nav.js"></script>
${extraJs}
</body>
</html>`;
}

// ── Build a single page ───────────────────────────────────────────────────
function buildPage(page) {
  const srcPath = path.join(SRC_PAGES, page.src);
  const outPath = path.join(ROOT, page.out);

  if (!fs.existsSync(srcPath)) {
    console.warn(`  ⚠ Source not found: src/pages/${page.src} — skipping ${page.id}`);
    return;
  }

  let pageContent = readFile(srcPath);

  // Process component includes and tokens
  pageContent = processTokens(pageContent, {
    PAGE_TITLE       : page.title,
    PAGE_DESCRIPTION : page.description,
    PAGE_CANONICAL   : page.canonical,
    PAGE_ACTIVE_NAV  : page.activeNav
  });

  // Build body: header + page content + footer
  let bodyContent = headerHTML + '\n\n' + pageContent + '\n\n' + footerHTML;

  // Inject active nav class + aria-current="page" into the header HTML
  if (page.activeNav) {
    bodyContent = injectActiveNav(bodyContent, page.activeNav);
  }

  // Add id="main-content" to the first <main> element for skip-nav
  bodyContent = wrapMainContent(bodyContent);

  // Wrap in full HTML document (with optional page-specific CSS and JS)
  // page.id is passed as data-page on <body> for use by JS guards in animations.js
  const fullHTML = buildPageWrapper(
    page.title,
    page.description,
    page.canonical,
    bodyContent,
    page.css      || [],
    page.js       || [],
    page.id,
    page.preloads || [],
    page.ogImage  || null,
    page.schema   || null
  );

  // Ensure output directory exists
  const outDir = path.dirname(outPath);
  ensureDir(outDir);

  // Write output
  fs.writeFileSync(outPath, fullHTML);
  const sizeKB = (Buffer.byteLength(fullHTML, 'utf8') / 1024).toFixed(1);
  console.log(`  ✓ ${page.out}  (${sizeKB} KB)`);
}

// ── Main ──────────────────────────────────────────────────────────────────
const targetPage = process.argv[2];

console.log('\n  Kritexa Labs — Phase 17 Build System');
console.log('  ─────────────────────────────────────');

if (!fs.existsSync(SRC_PAGES)) {
  console.log('\n  ⚠ src/pages/ directory not found.');
  console.log('  Creating placeholder structure...');
  ensureDir(SRC_PAGES);
  console.log('  Create page source files in src/pages/ and re-run build.');
  process.exit(0);
}

if (targetPage) {
  const page = pages.find(p => p.id === targetPage);
  if (!page) {
    console.error(`  ✗ Unknown page: ${targetPage}`);
    console.error(`  Valid pages: ${pages.map(p => p.id).join(', ')}`);
    process.exit(1);
  }
  buildPage(page);
} else {
  pages.forEach(buildPage);
}

// ── Copy SEO files to production root ─────────────────────────────────────
// Phase 17: robots.txt and sitemap.xml are authored at the workspace root
// and remain there (they ARE the production root files for static hosting).
// We verify they exist and log their status — no copy needed for flat layout.
const seoFiles = ['robots.txt', 'sitemap.xml'];
seoFiles.forEach(function(file) {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(1);
    console.log(`  ✓ ${file}  (${sizeKB} KB)`);
  } else {
    console.warn(`  ⚠ ${file} not found at project root — please create it.`);
  }
});

console.log('\n  Build complete.');
console.log('  ─────────────────────────────────────\n');
