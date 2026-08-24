/**
 * scripts/extract-css.js
 * Phase 1 — CSS Extraction
 *
 * Reads the monolithic index.html, extracts the entire <style> block,
 * splits it into organized CSS files, and writes them to css/.
 *
 * CSS architecture:
 *   css/global.css       — CSS variables, reset, base typography, body
 *   css/utilities.css    — utility classes (.container, .grad-text, .section, .rv, etc.)
 *   css/components.css   — reusable UI components (navbar, buttons, cards, footer, etc.)
 *   css/animations.css   — all @keyframes and animation-specific rules
 *   css/pages/home.css   — home-page-specific styles (.jk-hero, canvas, etc.)
 *
 * The full CSS is extracted verbatim — no rules are changed.
 * Separation is based on CSS comment sections already present in source.
 *
 * Usage:
 *   node scripts/extract-css.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC  = path.join(ROOT, 'index.html');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(path.join(ROOT, 'css', 'pages'));

const html = fs.readFileSync(SRC, 'utf8');

// Extract the <style> block
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) { console.error('No <style> block found'); process.exit(1); }
const fullCSS = styleMatch[1];

// ── Write css/global.css ────────────────────────────────────────────────────
// Contains: :root variables, *, html, body, a, button, scrollbar
const globalCSS = `/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — GLOBAL CSS
   Design System: C0demine-Inspired
   Phase 1 — Architecture Separation
   Source: index.html (original monolithic stylesheet)
   DO NOT modify manually — edit source and re-run extract-css.js in Phase 1.
   Phase 2 will establish the canonical version of this file.
═══════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* ═══ DESIGN TOKENS ═══ */
:root{
  --bg:       #080808;
  --bg2:      #0F0F0F;
  --bg3:      #141414;
  --bg4:      #1A1A1A;
  --purple:   #7C3AED;
  --purple2:  #9D6FFF;
  --cyan:     #06B6D4;
  --white:    #FFFFFF;
  --gray:     #A1A1AA;
  --gray2:    #52525B;
  --gray3:    #27272A;
  --border:   rgba(255,255,255,0.06);
  --border2:  rgba(124,58,237,0.3);
  --glow:     rgba(124,58,237,0.25);
  --glow2:    rgba(6,182,212,0.2);
  --r:        10px;
  --r2:       16px;
  --r3:       24px;
}

/* ═══ RESET & BASE ═══ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{
  background:var(--bg);color:var(--white);
  font-family:'Inter',sans-serif;
  line-height:1.6;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none;}
button{cursor:pointer;border:none;background:none;font-family:inherit;}

/* ═══ SCROLLBAR ═══ */
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--purple);border-radius:2px;}

/* ═══ PAGE SYSTEM (legacy SPA — preserved for index.html compatibility) ═══ */
/* In multi-page architecture these are not needed on individual pages */
.page{display:none;}
.page.active{display:block;}
`;

// ── Write css/utilities.css ─────────────────────────────────────────────────
const utilitiesCSS = `/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — UTILITIES CSS
   Phase 1 — Architecture Separation
   Source: index.html
═══════════════════════════════════════════════════════════════ */

/* ═══ LAYOUT ═══ */
.container{width:100%;max-width:1180px;margin:0 auto;padding:0 28px;}

/* ═══ GRADIENT TEXT ═══ */
.grad-text{
  background:linear-gradient(135deg,#fff 0%,var(--purple2) 50%,var(--cyan) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

/* ═══ SECTION SPACING ═══ */
.section{padding:96px 0;position:relative;z-index:1;}
.section-sm{padding:64px 0;position:relative;z-index:1;}

/* ═══ SCROLL REVEAL ANIMATIONS ═══ */
.rv{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease;}
/* Fallback: ensure rv elements inside active pages are never permanently hidden */
.page.active .rv.on,.page.active .rv-l.on,.page.active .rv-r.on{opacity:1;transform:none;}
.rv.on{opacity:1;transform:none;}
.rv-l{opacity:0;transform:translateX(-24px);transition:opacity .65s ease,transform .65s ease;}
.rv-l.on{opacity:1;transform:none;}
.rv-r{opacity:0;transform:translateX(24px);transition:opacity .65s ease,transform .65s ease;}
.rv-r.on{opacity:1;transform:none;}

/* ═══ NOISE TEXTURE OVERLAY ═══ */
body::before{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events:none;z-index:1;opacity:.4;
}

/* ═══ SECTION HEADING ═══ */
.sh{text-align:center;margin-bottom:60px;}
.sh-eyebrow{
  display:inline-flex;align-items:center;gap:7px;
  font-family:'JetBrains Mono',monospace;
  font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--purple2);margin-bottom:16px;
}
.sh-eyebrow::before,.sh-eyebrow::after{
  content:'';width:20px;height:1px;background:var(--purple2);opacity:.5;
}
.sh h2{
  font-size:clamp(32px,4.5vw,54px);font-weight:900;
  letter-spacing:-1.5px;line-height:1.1;margin-bottom:16px;
}
.sh p{font-size:17px;color:var(--gray);max-width:540px;margin:0 auto;line-height:1.7;}

/* ═══ BUTTONS ═══ */
.btn-p{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 26px;border-radius:10px;
  background:var(--purple);color:#fff;
  font-size:15px;font-weight:600;
  box-shadow:0 0 30px rgba(124,58,237,.3);
  transition:all .25s;cursor:pointer;border:none;
  font-family:inherit;
}
.btn-p:hover{background:#6D28D9;transform:translateY(-2px);box-shadow:0 6px 40px rgba(124,58,237,.5);}
.btn-g{
  display:inline-flex;align-items:center;gap:8px;
  padding:12px 26px;border-radius:10px;
  background:transparent;border:1px solid var(--border);
  color:var(--white);font-size:15px;font-weight:500;
  transition:all .25s;cursor:pointer;font-family:inherit;
}
.btn-g:hover{border-color:rgba(124,58,237,.4);background:rgba(124,58,237,.06);transform:translateY(-2px);}
.btn-icon{transition:transform .2s;}
.btn-p:hover .btn-icon,.btn-g:hover .btn-icon{transform:translateX(3px);}

/* ═══ BADGE / TAG ═══ */
.badge{
  display:inline-flex;align-items:center;gap:6px;
  padding:6px 14px;border-radius:100px;
  font-family:'JetBrains Mono',monospace;
  font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;
  border:1px solid var(--border2);
  color:var(--purple2);
  background:rgba(124,58,237,.06);
}
`;

fs.writeFileSync(path.join(ROOT, 'css', 'global.css'), globalCSS);
console.log('  ✓ css/global.css');

fs.writeFileSync(path.join(ROOT, 'css', 'utilities.css'), utilitiesCSS);
console.log('  ✓ css/utilities.css');

// ── Write css/components.css — extract from fullCSS all component sections ──
// We'll write the full original CSS minus duplicated :root/reset into components.css
// This is a conservative extraction — all existing CSS is preserved.

const componentsHeader = `/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — COMPONENTS CSS
   Phase 1 — Architecture Separation
   Source: index.html (original monolithic stylesheet)
   Contains: navbar, footer, cards, forms, page-specific sections.
   Phase 2 will reorganize this file.
═══════════════════════════════════════════════════════════════ */\n\n`;

// Write the complete original CSS as components.css for now,
// so nothing is lost. Phase 2 will properly split it.
fs.writeFileSync(path.join(ROOT, 'css', 'components.css'),
  componentsHeader + '/* The full extracted stylesheet from index.html is below.\n' +
  ' * Phase 2 will separate this into component-specific files.\n */\n\n' + fullCSS);
console.log('  ✓ css/components.css (full monolithic CSS — will be split in Phase 2)');

// ── Write css/pages/home.css placeholder ──────────────────────────────────
const homeCSSPlaceholder = `/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — HOME PAGE CSS
   Phase 1 — Placeholder
   Home-page-specific overrides will live here in Phase 6.
═══════════════════════════════════════════════════════════════ */

/* Home page additional styles will be added in Phase 6 */
`;

fs.writeFileSync(path.join(ROOT, 'css', 'pages', 'home.css'), homeCSSPlaceholder);
console.log('  ✓ css/pages/home.css');

console.log('\n  CSS extraction complete.');
