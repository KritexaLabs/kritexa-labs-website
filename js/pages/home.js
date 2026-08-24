/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — HOME PAGE JAVASCRIPT
   js/pages/home.js
   Phase 6 — Home Page Rebuild

   This file contains ALL Home-page-specific JavaScript.
   It is loaded ONLY on the home page (index.html).

   Contents:
     1. BUSINESS text glow canvas animation
     2. Process section — desktop spine positioning + mobile orbital layout
     3. Animated counters with "+" suffix for stat-box-val elements

   Dependencies:
     - js/global.js (already loaded — provides scroll reveal, base counters)
     - DOM elements from src/sections/home/hero.html
     - DOM elements from src/sections/home/process.html
     - DOM elements from src/sections/home/stats.html

   NOT included here (handled by js/global.js):
     - Custom cursor
     - Navbar scroll state
     - Hamburger/mobile drawer
     - General scroll reveal (.rv elements)
     - General animated counters (.stat-box-val, .b-metric with data-count)

   Performance notes:
     - Canvas RAF loop respects prefers-reduced-motion
     - Canvas RAF pauses when page is hidden (visibilitychange)
     - Orbital layout is lazy (only initializes when .proc-mobile is visible)
     - All IntersectionObserver thresholds set at 6% (matches global.js)

   REDUCED MOTION:
     If prefers-reduced-motion: reduce is set:
       - Canvas animation does NOT start (shows static fallback text)
       - Process orbital rings are still visible (layout only)
       - No RAF loops are started
═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ═══ UTILITY: Check reduced motion preference ═══ */
  var REDUCED_MOTION = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ═══════════════════════════════════════════════════
     1. BUSINESS TEXT GLOW CANVAS ANIMATION
     Source: legacy js/animations.js (preserved + optimized)
     Changes from legacy:
       - Respects prefers-reduced-motion (skips RAF if reduced)
       - Pauses when tab is hidden (visibilitychange)
       - Same visual output as legacy
  ═══════════════════════════════════════════════════ */
  (function initBusinessCanvas() {
    var mainCanvas = document.getElementById('jkCanvas');
    var offCanvas  = document.getElementById('jkOffCanvas');
    var textEl     = document.getElementById('jkBig');
    if (!mainCanvas || !offCanvas || !textEl) return;

    /* Skip canvas animation for reduced-motion users.
       The .jk-big-text element provides the sr-only H1 for fallback.
       The canvas stays hidden so the hero section still has content. */
    if (REDUCED_MOTION) {
      /* Show a static gradient text fallback */
      mainCanvas.style.display = 'none';
      textEl.style.background = 'linear-gradient(135deg, #fff 0%, #9D6FFF 50%, #06B6D4 100%)';
      textEl.style.webkitBackgroundClip = 'text';
      textEl.style.webkitTextFillColor = 'transparent';
      textEl.style.backgroundClip = 'text';
      return;
    }

    var mCtx = mainCanvas.getContext('2d');
    var oCtx = offCanvas.getContext('2d');
    var DPR  = Math.min(window.devicePixelRatio || 1, 2); /* cap at 2× for performance */
    var W, H, frame = 0;
    var rafId = null;
    var paused = false;

    function resize() {
      var rect     = textEl.getBoundingClientRect();
      var vw       = window.innerWidth || document.documentElement.clientWidth;
      var fontSize = parseFloat(getComputedStyle(textEl).fontSize) ||
                     Math.min(220, Math.max(80, vw * 0.18));
      W = rect.width  > 10 ? rect.width  : Math.min(vw - 32, 900);
      H = rect.height > 10 ? rect.height : fontSize * 1.05;
      mainCanvas.width  = Math.ceil(W * DPR);
      mainCanvas.height = Math.ceil(H * DPR);
      mainCanvas.style.width  = W + 'px';
      mainCanvas.style.height = H + 'px';
      offCanvas.width  = Math.ceil(W * DPR);
      offCanvas.height = Math.ceil(H * DPR);
      mCtx.setTransform(1, 0, 0, 1, 0, 0);
      oCtx.setTransform(1, 0, 0, 1, 0, 0);
      mCtx.scale(DPR, DPR);
      oCtx.scale(DPR, DPR);
    }

    var bars = [];
    function initBars() {
      bars = [];
      var base = 30;
      for (var i = 0; i < 36; i++) {
        base += (Math.random() - 0.42) * 22;
        base  = Math.max(12, Math.min(H * 0.85, base));
        bars.push({
          h:     base,
          th:    base,
          col:   ['rgba(157,111,255,', 'rgba(6,182,212,', 'rgba(16,185,129,', 'rgba(245,158,11,'][i % 4],
          phase: Math.random() * Math.PI * 2,
          lVal:  Math.floor(Math.random() * 70 + 15),
          lLife: 0
        });
      }
    }

    function drawAnim() {
      oCtx.clearRect(0, 0, W, H);
      oCtx.fillStyle = 'rgba(5, 2, 18, 0.92)';
      oCtx.fillRect(0, 0, W, H);
      oCtx.strokeStyle = 'rgba(124,58,237,0.07)';
      oCtx.lineWidth   = 1;
      for (var y = 20; y < H; y += Math.floor(H / 4)) {
        oCtx.beginPath(); oCtx.moveTo(0, y); oCtx.lineTo(W, y); oCtx.stroke();
      }
      var bw    = Math.max(8, Math.floor(W / bars.length) - 4);
      var gap   = Math.max(2, Math.floor(W / bars.length) - bw);
      var total = bw + gap;
      var startX = Math.floor((W - bars.length * total) / 2);
      oCtx.beginPath();
      oCtx.strokeStyle = 'rgba(6,182,212,0.5)';
      oCtx.lineWidth   = 1.5;
      bars.forEach(function(b, i) {
        var x = startX + i * total + bw / 2;
        var y = H - b.h - 2;
        if (i === 0) oCtx.moveTo(x, y);
        else         oCtx.lineTo(x, y);
      });
      oCtx.stroke();
      bars.forEach(function(b, i) {
        b.h += (b.th - b.h) * 0.055;
        var osc  = Math.sin(frame * 0.022 + b.phase) * 4;
        var h    = Math.max(6, b.h + osc);
        var x    = startX + i * total;
        var y    = H - h;
        var grad = oCtx.createLinearGradient(x, y, x, H);
        grad.addColorStop(0, b.col + '0.95)');
        grad.addColorStop(1, b.col + '0.1)');
        oCtx.fillStyle = grad;
        oCtx.beginPath();
        if (oCtx.roundRect) { oCtx.roundRect(x, y, bw, h, [3, 3, 0, 0]); }
        else { oCtx.rect(x, y, bw, h); }
        oCtx.fill();
        oCtx.shadowColor = b.col + '1)';
        oCtx.shadowBlur  = 10;
        oCtx.fillStyle   = b.col + '1)';
        oCtx.fillRect(x, y, bw, 2);
        oCtx.shadowBlur  = 0;
        if (Math.random() < 0.004) b.th = 12 + Math.random() * H * 0.85;
        if (b.lLife > 0) {
          oCtx.globalAlpha = Math.min(1, b.lLife / 15);
          oCtx.font        = 'bold ' + Math.max(7, bw * 0.55) + 'px monospace';
          oCtx.fillStyle   = b.col + '1)';
          oCtx.textAlign   = 'center';
          oCtx.fillText('+' + b.lVal + '%', x + bw / 2, y - 5);
          oCtx.globalAlpha = 1;
          b.lLife--;
        }
      });
      if (frame % 55 === 0) {
        var ri       = Math.floor(Math.random() * bars.length);
        bars[ri].lVal  = Math.floor(Math.random() * 70 + 15);
        bars[ri].lLife = 50;
      }
    }

    function render() {
      if (paused) return;
      frame++;
      drawAnim();
      mCtx.clearRect(0, 0, W, H);
      mCtx.drawImage(offCanvas, 0, 0, W * DPR, H * DPR, 0, 0, W, H);
      mCtx.globalCompositeOperation = 'destination-in';
      mCtx.fillStyle    = '#fff';
      mCtx.font         = '900 ' + H * 0.88 + 'px "Arial Black", Arial, sans-serif';
      mCtx.textAlign    = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.fillText('BUSINESS', W / 2, H / 2 + H * 0.04);
      mCtx.globalCompositeOperation = 'source-over';
      mCtx.strokeStyle  = 'rgba(255,255,255,0.18)';
      mCtx.lineWidth    = 1.5;
      mCtx.font         = '900 ' + H * 0.88 + 'px "Arial Black", Arial, sans-serif';
      mCtx.textAlign    = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.strokeText('BUSINESS', W / 2, H / 2 + H * 0.04);
      mCtx.shadowColor  = 'rgba(124,58,237,0.55)';
      mCtx.shadowBlur   = 28;
      mCtx.strokeStyle  = 'rgba(157,111,255,0.12)';
      mCtx.lineWidth    = 4;
      mCtx.strokeText('BUSINESS', W / 2, H / 2 + H * 0.04);
      mCtx.shadowBlur   = 0;
      rafId = requestAnimationFrame(render);
    }

    function tryInit() {
      resize();
      if (W < 10) { setTimeout(tryInit, 150); return; }
      initBars();
      render();
    }

    /* Pause when tab is hidden — saves CPU/GPU */
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        paused = true;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      } else {
        paused = false;
        render();
      }
    });

    /* Resize handler */
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() { resize(); initBars(); }, 150);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() { setTimeout(tryInit, 120); });
    } else {
      setTimeout(tryInit, 350);
    }
  })();


  /* ═══════════════════════════════════════════════════
     2. PROCESS SECTION — DESKTOP SPINE + MOBILE ORBITAL
     Source: legacy js/animations.js (preserved)
     Handles: spine positioning, orbital SVG layout, center pulse.
  ═══════════════════════════════════════════════════ */
  (function initProcess() {
    /* Process circle sequential pulse */
    var allCircles = document.querySelectorAll('.proc-c');
    if (!allCircles.length) return;
    var cur = 0;
    function nextPulse() {
      allCircles.forEach(function(ci) { ci.classList.remove('pulsing'); });
      if (allCircles[cur]) allCircles[cur].classList.add('pulsing');
      cur = (cur + 1) % allCircles.length;
    }
    nextPulse();
    /* Store interval reference so it can be cleared if needed */
    var pulseInterval = setInterval(nextPulse, 1000);
    /* Pause interval when tab is hidden — saves CPU on background tabs */
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        clearInterval(pulseInterval);
        pulseInterval = null;
      } else {
        if (!pulseInterval) pulseInterval = setInterval(nextPulse, 1000);
      }
    });

    /* Desktop: position spine line to center of circles row */
    function positionSpine() {
      var grid   = document.getElementById('procHGrid');
      var spine  = document.getElementById('procSpine');
      var firstC = grid ? grid.querySelector('.ph-circle') : null;
      if (!grid || !spine || !firstC) return;
      var gridRect = grid.getBoundingClientRect();
      var circRect = firstC.getBoundingClientRect();
      var topOffset = circRect.top - gridRect.top + circRect.height / 2 - 1;
      spine.style.top = topOffset + 'px';
    }

    /* Mobile: orbital SVG connector layout */
    function layoutOrb() {
      var wrap = document.getElementById('procOrbWrap');
      var svg  = document.getElementById('porbSvg');
      var cen  = document.getElementById('porbCenter');
      if (!wrap || !svg || !cen) return;
      var W  = wrap.getBoundingClientRect().width || wrap.offsetWidth;
      if (W < 10) return; /* not yet laid out */
      var H  = wrap.getBoundingClientRect().height || wrap.offsetHeight;
      var cx = W / 2, cy = H / 2;
      var N  = 7;
      var firstPill = wrap.querySelector('.porb-pill');
      var nodeR = firstPill ? firstPill.offsetWidth / 2 : Math.min(W * 0.12, 50);
      var cenR  = cen.offsetWidth / 2 || 42;
      var R     = Math.min(W * 0.32, cx - nodeR - 14);
      var neededH = (R + nodeR) * 2 + nodeR * 0.5 + 16;
      wrap.style.height = neededH + 'px';
      H = neededH; cy = H / 2;
      svg.innerHTML = '';
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      /* Spinning arc group */
      var arcR = R + nodeR * 0.5 + 4;
      var arcGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      arcGroup.style.transformOrigin = cx + 'px ' + cy + 'px';
      if (!REDUCED_MOTION) {
        arcGroup.style.animation = 'orb-spin 8s linear infinite';
      }
      var arcPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var arcD = 'M ' + cx + ' ' + (cy - arcR) +
                 ' A ' + arcR + ' ' + arcR + ' 0 1 1 ' + (cx - 0.01) + ' ' + (cy - arcR);
      arcPath.setAttribute('d', arcD);
      arcPath.setAttribute('stroke', 'rgba(157,111,255,0.22)');
      arcPath.setAttribute('stroke-width', '1.5');
      arcPath.setAttribute('stroke-dasharray', '6 10');
      arcPath.setAttribute('fill', 'none');
      arcGroup.appendChild(arcPath);
      var movingDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      movingDot.setAttribute('cx', cx);
      movingDot.setAttribute('cy', cy - arcR);
      movingDot.setAttribute('r', '4');
      movingDot.setAttribute('fill', 'rgba(157,111,255,0.85)');
      movingDot.style.filter = 'drop-shadow(0 0 4px rgba(157,111,255,1))';
      arcGroup.appendChild(movingDot);
      svg.appendChild(arcGroup);

      /* Inject keyframe if not already present */
      if (!document.getElementById('orbSpinStyle')) {
        var st = document.createElement('style');
        st.id = 'orbSpinStyle';
        st.textContent = '@keyframes orb-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
        document.head.appendChild(st);
      }

      /* Connector lines + node positioning */
      for (var i = 0; i < N; i++) {
        var node = document.getElementById('pn' + i);
        if (!node) continue;
        var angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        var nx = cx + R * Math.cos(angle);
        var ny = cy + R * Math.sin(angle);
        node.style.left = nx + 'px';
        node.style.top  = ny + 'px';
        var lx1 = cx + (cenR + 4) * Math.cos(angle);
        var ly1 = cy + (cenR + 4) * Math.sin(angle);
        var lx2 = cx + (R - nodeR - 4) * Math.cos(angle);
        var ly2 = cy + (R - nodeR - 4) * Math.sin(angle);
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', lx1); line.setAttribute('y1', ly1);
        line.setAttribute('x2', lx2); line.setAttribute('y2', ly2);
        line.setAttribute('stroke', 'rgba(124,58,237,0.25)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '3 4');
        svg.appendChild(line);
        var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', lx2); dot.setAttribute('cy', ly2);
        dot.setAttribute('r', '2.5');
        dot.setAttribute('fill', 'rgba(124,58,237,0.4)');
        svg.appendChild(dot);
      }
    }

    /* Center orb breathing pulse */
    function pulseCen() {
      if (REDUCED_MOTION) return;
      var cen = document.getElementById('porbCenter');
      if (!cen) return;
      /* Only start the pulse if the orbital layout (mobile) is actually shown.
         On desktop, .proc-mobile is display:none — no need to run a RAF loop
         for an invisible element. Use IntersectionObserver to start/stop. */
      var pulseRafId = null;
      var sc = 1, sd = 1;
      function tick() {
        sc += sd * 0.0008;
        if (sc > 1.035) sd = -1;
        if (sc < 0.97)  sd = 1;
        cen.style.transform = 'translate(-50%,-50%) scale(' + sc + ')';
        pulseRafId = requestAnimationFrame(tick);
      }
      /* Use IntersectionObserver to start pulse only when visible on screen */
      if ('IntersectionObserver' in window) {
        var pulseIO = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              if (!pulseRafId) tick();
            } else {
              if (pulseRafId) { cancelAnimationFrame(pulseRafId); pulseRafId = null; }
            }
          });
        }, { threshold: 0.1 });
        pulseIO.observe(cen);
      } else {
        /* Fallback: always run if IntersectionObserver not available */
        tick();
      }
    }

    function initAll() {
      positionSpine();
      layoutOrb();
      pulseCen();
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() { setTimeout(initAll, 150); });
    } else {
      setTimeout(initAll, 300);
    }

    var procResizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(procResizeTimer);
      procResizeTimer = setTimeout(function() {
        positionSpine();
        layoutOrb();
      }, 150);
    });
  })();


  /* ═══════════════════════════════════════════════════
     3. STAT BOX COUNTERS WITH "+" SUFFIX
     The global js/global.js handles .b-metric counters.
     This block handles the .stat-box-val counters and
     appends a "+" suffix after counting completes.

     The global counter in js/global.js uses data-count attribute.
     We piggyback on that but also attach the "+" suffix logic
     via a MutationObserver on the stat values.

     Implementation: Override the stat-box counters
     to use a dedicated counter that appends "+".
  ═══════════════════════════════════════════════════ */
  (function initStatCounters() {
    var statVals = document.querySelectorAll('.stat-box-val[data-count]');
    if (!statVals.length) return;

    function animateCounter(el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var start    = 0;
      var duration = 1600;
      var startTs  = null;

      /* Remove data-count so global.js doesn't double-animate */
      el.removeAttribute('data-count');

      function ease(p) { return 1 - Math.pow(1 - p, 3); }

      function step(ts) {
        if (!startTs) startTs = ts;
        var elapsed = ts - startTs;
        var p = Math.min(elapsed / duration, 1);
        var val = Math.round(ease(p) * target);
        el.textContent = val + (p >= 1 ? '+' : '');
        if (p < 1) requestAnimationFrame(step);
      }

      if (REDUCED_MOTION) {
        el.textContent = target + '+';
        return;
      }
      requestAnimationFrame(step);
    }

    /* Trigger counters via IntersectionObserver */
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statVals.forEach(function(el) { observer.observe(el); });
  })();

})(); /* end IIFE */
