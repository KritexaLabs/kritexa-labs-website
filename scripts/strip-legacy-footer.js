/**
 * scripts/strip-legacy-footer.js
 * Phase 1 — Strip legacy footer/gcta from extracted page templates
 *
 * The pages extracted from the SPA include their own copy of the
 * footer and gcta section (from the original duplicated structure).
 * Since the build system now appends components/footer.html to each page,
 * the legacy footer/gcta must be removed from src/pages/ templates.
 *
 * This script removes everything from the first <section class="gcta">
 * (or <footer class="footer">) to the end of the page template content.
 *
 * Usage:
 *   node scripts/strip-legacy-footer.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src', 'pages');

const pages = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html'));

pages.forEach(function(file) {
  const filePath = path.join(SRC_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the start of the legacy gcta or footer section
  // These appear at the end of each extracted page template
  const gctaIdx = content.lastIndexOf('<section class="gcta">');
  const footerIdx = content.lastIndexOf('<footer class="footer">');

  // Find the earliest of the two that exists
  let cutIdx = -1;
  if (gctaIdx !== -1 && footerIdx !== -1) {
    cutIdx = Math.min(gctaIdx, footerIdx);
  } else if (gctaIdx !== -1) {
    cutIdx = gctaIdx;
  } else if (footerIdx !== -1) {
    cutIdx = footerIdx;
  }

  if (cutIdx === -1) {
    console.log('  ℹ ' + file + ' — no legacy footer found (already clean)');
    return;
  }

  // Trim to remove the legacy footer/gcta
  const cleaned = content.substring(0, cutIdx).trimEnd() + '\n';
  fs.writeFileSync(filePath, cleaned);
  
  const removed = content.length - cleaned.length;
  console.log('  ✓ ' + file + ' — removed ' + (removed / 1024).toFixed(1) + ' KB of legacy footer/gcta');
});

console.log('\n  Legacy footer strip complete.');
