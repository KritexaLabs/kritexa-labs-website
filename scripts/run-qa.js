const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8081;
const ROOT = path.join(__dirname, '..');

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

const missingAssets = new Set();

// Create standard HTTP server
const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Normalize path
  let filePath = path.join(ROOT, urlPath);

  // Check if it's a directory or clean URL
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!path.extname(filePath)) {
    const indexFilePath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexFilePath)) {
      filePath = indexFilePath;
    } else {
      const htmlFilePath = filePath + '.html';
      if (fs.existsSync(htmlFilePath)) {
        filePath = htmlFilePath;
      }
    }
  }

  // Check if file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    if (!urlPath.endsWith('/favicon.ico')) {
      missingAssets.add(urlPath);
      console.log(`[404] Resource Not Found: ${urlPath}`);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`QA Server started on http://localhost:${PORT}`);
  runQA();
});

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'capabilities', path: '/capabilities' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'case-studies', path: '/case-studies' },
  { name: 'contact', path: '/contact' },
  { name: 'kritexa-ai', path: '/kritexa-ai' },
  { name: 'career', path: '/career' },
  { name: 'labs', path: '/labs' }
];

// Focus viewports to optimize speed and meet user constraints perfectly
const chromeViewports = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 390, height: 844, name: 'mobile' },
  { width: 320, height: 568, name: '320' },
  { width: 768, height: 1024, name: '768' },
  { width: 1920, height: 1080, name: '1920' }
];

const firefoxViewports = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 390, height: 844, name: 'mobile' }
];

function runCmd(cmd) {
  return new Promise((resolve) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, error: err.message });
      } else {
        resolve({ success: true, stdout, stderr });
      }
    });
  });
}

async function runQA() {
  const chromeDir = path.join(ROOT, 'qa-screenshots', 'chrome');
  const firefoxDir = path.join(ROOT, 'qa-screenshots', 'firefox');
  fs.mkdirSync(chromeDir, { recursive: true });
  fs.mkdirSync(firefoxDir, { recursive: true });

  console.log('\n--- STARTING BROWSER SCREENSHOT GENERATION ---');

  for (const page of pages) {
    const url = `http://localhost:${PORT}${page.path}`;
    console.log(`Processing page: ${page.name} (${page.path})`);

    // 1. Chrome Viewports (desktop + mobile always, extra viewports only for key pages)
    const activeChromeVps = (page.name === 'home' || page.name === 'contact') 
      ? chromeViewports 
      : chromeViewports.slice(0, 2); // only desktop and mobile for inner pages

    for (const vp of activeChromeVps) {
      const filename = `${page.name}-${vp.name}.png`;
      const outputPath = path.join(chromeDir, filename);
      const cmd = `google-chrome --headless --disable-gpu --screenshot="${outputPath}" --window-size=${vp.width},${vp.height} "${url}"`;
      const res = await runCmd(cmd);
      if (res.success) {
        console.log(`  [Chrome] Saved ${vp.width}x${vp.height} to ${filename}`);
      } else {
        console.warn(`  [Chrome] Failed ${vp.width}x${vp.height}: ${res.error}`);
      }
    }

    // 2. Firefox Viewports (desktop + mobile)
    for (const vp of firefoxViewports) {
      const filename = `${page.name}-${vp.name}.png`;
      const outputPath = path.join(firefoxDir, filename);
      const cmd = `firefox --headless --screenshot "${outputPath}" --window-size ${vp.width},${vp.height} "${url}"`;
      const res = await runCmd(cmd);
      if (res.success) {
        console.log(`  [Firefox] Saved ${vp.width}x${vp.height} to ${filename}`);
      } else {
        console.warn(`  [Firefox] Failed ${vp.width}x${vp.height}: ${res.error}`);
      }
    }
  }

  console.log('\n--- BROWSER SCREENSHOT GENERATION COMPLETE ---');
  console.log('\n--- 404 RESOURCE SUMMARY ---');
  if (missingAssets.size === 0) {
    console.log('✅ No 404 missing assets detected!');
  } else {
    console.log('❌ Found 404 missing assets:');
    for (const asset of missingAssets) {
      console.log(`  - ${asset}`);
    }
  }

  // Graceful shutdown
  server.close(() => {
    console.log('\nQA Server stopped. Exiting process.');
    process.exit(0);
  });
}
