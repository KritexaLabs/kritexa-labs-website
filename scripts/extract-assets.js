/**
 * scripts/extract-assets.js
 * Phase 1 — Asset Extraction
 *
 * Extracts all base64-encoded images from index.html, saves them as
 * real binary files under assets/images/ and assets/logos/, and
 * generates a manifest of what was extracted.
 *
 * Usage:
 *   node scripts/extract-assets.js
 *
 * Output:
 *   assets/logos/logo.png
 *   assets/images/about-hero.jpg
 *   assets/images/contact-hero.jpg
 *   assets/images/solution-01.jpg  … solution-N.jpg
 *   scripts/asset-manifest.json
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const SRC        = path.join(ROOT, 'index.html');
const LOGOS_DIR  = path.join(ROOT, 'assets', 'logos');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const MANIFEST   = path.join(__dirname, 'asset-manifest.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeAsset(filepath, b64) {
  const buf = Buffer.from(b64, 'base64');
  fs.writeFileSync(filepath, buf);
  const rel = path.relative(ROOT, filepath);
  console.log(`  ✓ ${rel}  (${(buf.length / 1024).toFixed(1)} KB)`);
  return buf.length;
}

/** Deduplicate by first-64-char fingerprint of b64 string */
function fingerprint(b64) {
  return b64.substring(0, 256);
}

ensureDir(LOGOS_DIR);
ensureDir(IMAGES_DIR);

// Read whole file as one giant string for regex matching
const html = fs.readFileSync(SRC, 'utf8');

const manifest = {
  extractedAt : new Date().toISOString(),
  sourceFile  : 'index.html',
  assets      : []
};

const seenPrints = new Set();

// ── 1. Logo PNG from <img> tags ─────────────────────────────────────────────
// There are ~10 PNG <img> src occurrences (navbar + footer copies).
// They are all the same image — extract only once.
{
  const re = /src="data:image\/png;base64,([^"]+)"/g;
  let m;
  let logoSaved = false;
  while ((m = re.exec(html)) !== null) {
    const b64 = m[1].replace(/\s/g, '');
    const fp  = fingerprint(b64);
    if (seenPrints.has(fp)) continue;
    seenPrints.add(fp);
    if (!logoSaved) {
      const dest = path.join(LOGOS_DIR, 'logo.png');
      const size = writeAsset(dest, b64);
      manifest.assets.push({
        filename        : 'assets/logos/logo.png',
        format          : 'PNG',
        originalEncoding: 'base64 inline <img> src in HTML',
        usages          : ['navbar logo-mark', 'every page footer brand logo (×8–9 copies in source)'],
        extractedSizeKB : parseFloat((size / 1024).toFixed(1)),
        note            : 'Single unique PNG — was duplicated ≈9× in source HTML'
      });
      logoSaved = true;
    }
  }
}

// ── 2. CSS background-image JPEGs (About hero, Contact hero) ───────────────
// Pattern: background-image:url("data:image/jpeg;base64,...")
{
  const cssNames = ['about-hero', 'contact-hero'];
  let cssIdx = 0;
  // The data URIs here span a very long single line
  const re = /background-image\s*:\s*url\("data:image\/jpeg;base64,([^"]+)"\)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const b64 = m[1].replace(/\s/g, '');
    const fp  = fingerprint(b64);
    if (seenPrints.has(fp)) continue;
    seenPrints.add(fp);
    const label = cssNames[cssIdx] || `css-bg-${cssIdx + 1}`;
    const dest  = path.join(IMAGES_DIR, `${label}.jpg`);
    const size  = writeAsset(dest, b64);
    manifest.assets.push({
      filename        : `assets/images/${label}.jpg`,
      format          : 'JPEG',
      originalEncoding: 'base64 CSS background-image data URI',
      usages          : [label === 'about-hero'
        ? 'About page .about-fs-hero-bg background'
        : 'Contact page .con-hero-bg background'],
      extractedSizeKB : parseFloat((size / 1024).toFixed(1)),
      note            : 'Used as CSS background — no alt text required at this layer'
    });
    cssIdx++;
  }
}

// ── 3. <img> src JPEG — solution/portfolio images ──────────────────────────
// Each appears on its own line: src="data:image/jpeg;base64,..."
// There are 20 lines but only 8 unique images (portfolio re-uses capabilities images)
{
  const re = /src="data:image\/jpeg;base64,([^"]+)"/g;
  let m;
  let imgIdx = 0;
  while ((m = re.exec(html)) !== null) {
    const b64 = m[1].replace(/\s/g, '');
    const fp  = fingerprint(b64);
    if (seenPrints.has(fp)) continue;
    seenPrints.add(fp);
    imgIdx++;
    const label = `solution-${String(imgIdx).padStart(2, '0')}`;
    const dest  = path.join(IMAGES_DIR, `${label}.jpg`);
    const size  = writeAsset(dest, b64);
    manifest.assets.push({
      filename        : `assets/images/${label}.jpg`,
      format          : 'JPEG',
      originalEncoding: 'base64 inline <img> src in HTML',
      usages          : ['Capabilities page sol-row image', 'Portfolio page card thumbnail (reused)'],
      extractedSizeKB : parseFloat((size / 1024).toFixed(1)),
      note            : `Unique image #${imgIdx} — same file re-used across Capabilities and Portfolio pages`
    });
  }
}

// ── 4. Summary & manifest ───────────────────────────────────────────────────
manifest.summary = {
  totalAssetsExtracted : manifest.assets.length,
  logoFiles            : manifest.assets.filter(a => a.filename.startsWith('assets/logos')).length,
  imageFiles           : manifest.assets.filter(a => a.filename.startsWith('assets/images')).length
};

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log('');
console.log(`  📋 Manifest → scripts/asset-manifest.json`);
console.log(`  Total extracted: ${manifest.summary.totalAssetsExtracted}`);
console.log(`   • Logos : ${manifest.summary.logoFiles}`);
console.log(`   • Images: ${manifest.summary.imageFiles}`);
