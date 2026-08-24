# Kritexa Labs — Clean URL Server Configuration
# Phase 1 — Hosting & Routing Guide
#
# This file documents the server configuration required to serve
# the multi-page static site with clean URLs (no .html extension).
#
# CRITICAL: Without proper server configuration, the folder-based
# URL structure will NOT work correctly.
# /about will NOT automatically serve /about/index.html unless
# the server is configured to do so.
#
# Most modern static hosting platforms (Netlify, Vercel, GitHub Pages,
# Cloudflare Pages) handle this automatically. VPS/Nginx/Apache
# require manual configuration as documented below.

═══════════════════════════════════════════════════════════
 1. NETLIFY (Recommended — zero configuration needed)
═══════════════════════════════════════════════════════════

Netlify automatically serves index.html from folder URLs.
/about → serves /about/index.html automatically.

No _redirects or netlify.toml configuration needed for this.

If you want to ensure 404.html is served on missing pages:
Create a file named _redirects at the project root:

  /* /404.html 404

═══════════════════════════════════════════════════════════
 2. NETLIFY _redirects (for custom redirects)
═══════════════════════════════════════════════════════════

File: _redirects (at project root, plain text)

  # Old hash-based URLs → new clean URLs
  /#about          /about           301
  /#capabilities   /capabilities    301
  /#portfolio      /portfolio       301
  /#blog           /case-studies    301
  /#contact        /contact         301
  /#labs           /labs            301
  /#career         /career          301
  /#kritexaai      /kritexa-ai      301

  # 404 fallback
  /*               /404.html        404

═══════════════════════════════════════════════════════════
 3. VERCEL (zero configuration needed)
═══════════════════════════════════════════════════════════

Vercel automatically serves folder/index.html files.
/about → /about/index.html automatically.

For custom 404 handling, create a vercel.json:

  {
    "cleanUrls": true,
    "trailingSlash": false,
    "routes": [
      { "handle": "filesystem" },
      { "src": "/(.*)", "dest": "/404.html", "status": 404 }
    ]
  }

═══════════════════════════════════════════════════════════
 4. NGINX VPS
═══════════════════════════════════════════════════════════

Copy and adapt this server block to your nginx config.
Replace /var/www/kritexalabs with your actual document root.

server {
    listen 80;
    listen [::]:80;
    server_name kritexalabs.com www.kritexalabs.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name kritexalabs.com www.kritexalabs.com;

    root /var/www/kritexalabs;
    index index.html;

    # SSL certificate (Let's Encrypt / Certbot)
    ssl_certificate     /etc/letsencrypt/live/kritexalabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kritexalabs.com/privkey.pem;

    # Clean URLs: try directory/index.html then 404
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Custom 404 page
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Old hash-based URL redirects (from legacy SPA)
    # These are fragment-based and cannot be server-redirected.
    # Use JavaScript redirects for /#about → /about if needed.

    # Cache control for assets
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    location /css/ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }
    location /js/ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 1024;
}

═══════════════════════════════════════════════════════════
 5. APACHE .htaccess (for Apache servers / cPanel)
═══════════════════════════════════════════════════════════

See docs/htaccess.example for the full .htaccess configuration.
Place it in the website root directory as .htaccess

═══════════════════════════════════════════════════════════
 6. GITHUB PAGES
═══════════════════════════════════════════════════════════

GitHub Pages serves index.html from subdirectories automatically.
Clean URLs (/about → /about/index.html) work by default.

However: GitHub Pages does NOT support custom 404 pages as
  error responses unless using a custom domain.
  
Create a 404.html at the root — GitHub Pages will serve it
on 404 errors for custom domains.

Note: GitHub Pages cannot redirect hash fragments on the server.
Any /#about → /about redirects must be client-side.

═══════════════════════════════════════════════════════════
 7. CLOUDFLARE PAGES (Recommended for production)
═══════════════════════════════════════════════════════════

Cloudflare Pages:
  - Automatically handles /about → /about/index.html
  - Supports custom 404 pages
  - Global CDN included
  - Free tier sufficient for this project

No configuration needed. Connect your Git repo and deploy.

For redirects, create a _redirects file (same as Netlify format).

═══════════════════════════════════════════════════════════
 8. LOCAL DEVELOPMENT
═══════════════════════════════════════════════════════════

For local development with clean URLs, use a local server
that supports directory index files:

  # Option 1: Python (built-in, simplest)
  python3 -m http.server 8080

  # Option 2: Node.js serve package (recommended)
  npx serve . -p 8080

  # Option 3: Node.js http-server
  npx http-server . -p 8080 --proxy http://localhost:8080?

Both Python and serve handle /about → /about/index.html correctly.

IMPORTANT: Do NOT open index.html directly as a file:// URL.
Asset paths like /css/global.css require a local HTTP server.
