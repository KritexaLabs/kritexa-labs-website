/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — ANIMATIONS JS
   Phase 1 — Architecture Separation
   Phase 15 — JS & Animation Engineering (optimized)

   Contains canvas and complex animation logic.

   Animations:
   1. BUSINESS text glow canvas animation  — HOME ONLY (js/pages/home.js owns this)
   2. Dashboard mini chart canvas          — legacy (no DOM target in current pages)
   3. Lead counter ticker                  — legacy (no DOM target in current pages)
   4. Kritexa.AI countdown timer           — /kritexa-ai page only
   5. Process section pulse / orbital      — HOME ONLY (js/pages/home.js owns this)

   Phase 15 changes:
   - BUSINESS canvas IIFE: guarded — skips entirely if js/pages/home.js is present
     (detected via data-page="home" on <body>)
   - Countdown IIFE: guarded — only runs when countdown elements exist
   - Process IIFE: guarded — only runs when process elements exist
   - dashChart / leadNum: already element-guarded (if(!c)return)
   - Countdown setInterval: stored reference, clears when diff reaches 0
   - Process pulse setInterval: stored reference, no change to behavior
   - No visual changes. No RAF/behavior changes for pages that use these features.
═══════════════════════════════════════════════════════════════ */

/* ═══ DASHBOARD CHART ═══ */
/* Legacy element — not present in any current page. IIFE runs, guard exits. */
(function(){
  var c=document.getElementById('dashChart');if(!c)return;
  var ctx=c.getContext('2d'),dpr=devicePixelRatio||1;
  function draw(){
    var CW=c.parentElement.offsetWidth-2,CH=60;
    c.width=CW*dpr;c.height=CH*dpr;ctx.scale(dpr,dpr);
    var data=[2.1,3.4,2.8,4.2,3.9,5.1,4.7],lb=['M','T','W','T','F','S','S'];
    var max=5.5,min=1.8,pad=6,uw=CW-pad*2,uh=CH-14;
    var g=ctx.createLinearGradient(0,0,0,uh);
    g.addColorStop(0,'rgba(124,58,237,.2)');g.addColorStop(1,'rgba(124,58,237,0)');
    ctx.beginPath();
    for(var i=0;i<data.length;i++){
      var x=pad+i/(data.length-1)*uw,y=uh-((data[i]-min)/(max-min))*(uh-8);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle='rgba(124,58,237,.9)';ctx.lineWidth=1.5;ctx.lineJoin='round';ctx.stroke();
    ctx.lineTo(pad+uw,uh);ctx.lineTo(pad,uh);ctx.closePath();ctx.fillStyle=g;ctx.fill();
    ctx.fillStyle='rgba(82,82,91,.8)';ctx.font='9px "JetBrains Mono",monospace';ctx.textAlign='center';
    for(var j=0;j<lb.length;j++){ctx.fillText(lb[j],pad+j/(lb.length-1)*uw,CH-1);}
  }
  draw();window.addEventListener('resize',function(){ctx.setTransform(1,0,0,1,0,0);draw();});
})();

/* ═══ LEAD COUNTER ═══ */
/* Legacy element — not present in any current page. Guard exits immediately. */
var ln=document.getElementById('leadNum');
if(ln){var n=0;setTimeout(function(){var iv=setInterval(function(){n++;ln.textContent=n;if(n>=47)clearInterval(iv);},28);},600);}

/* ═══ BUSINESS TEXT GLOW ANIMATION ═══ */
/*
 * Phase 15 GUARD: Skip entirely when body has data-page="home".
 * js/pages/home.js is the canonical owner on the home page.
 * On all other pages, #jkCanvas does not exist — the early return handles it.
 * The guard prevents a double RAF loop on the home page.
 */
(function(){
  /* Guard: home page uses js/pages/home.js for this canvas */
  if(document.body && document.body.getAttribute('data-page') === 'home') return;

  var mainCanvas = document.getElementById('jkCanvas');
  var offCanvas  = document.getElementById('jkOffCanvas');
  var textEl     = document.getElementById('jkBig');
  if(!mainCanvas || !offCanvas || !textEl) return;

  var mCtx = mainCanvas.getContext('2d');
  var oCtx = offCanvas.getContext('2d');
  var DPR  = Math.min(window.devicePixelRatio || 1, 2); /* cap at 2× */
  var W, H, frame = 0;

  function resize(){
    var rect = textEl.getBoundingClientRect();
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var fontSize = parseFloat(getComputedStyle(textEl).fontSize) || Math.min(220, Math.max(80, vw * 0.18));
    W = rect.width  > 10 ? rect.width  : Math.min(vw - 32, 900);
    H = rect.height > 10 ? rect.height : fontSize * 1.05;
    mainCanvas.width  = Math.ceil(W * DPR);
    mainCanvas.height = Math.ceil(H * DPR);
    mainCanvas.style.width  = W + 'px';
    mainCanvas.style.height = H + 'px';
    offCanvas.width  = Math.ceil(W * DPR);
    offCanvas.height = Math.ceil(H * DPR);
    mCtx.setTransform(1,0,0,1,0,0);
    oCtx.setTransform(1,0,0,1,0,0);
    mCtx.scale(DPR, DPR);
    oCtx.scale(DPR, DPR);
  }

  var bars = [];
  function initBars(){
    bars = [];
    var base = 30;
    for(var i = 0; i < 36; i++){
      base += (Math.random() - 0.42) * 22;
      base  = Math.max(12, Math.min(H * 0.85, base));
      bars.push({
        h:     base,
        th:    base,
        col:   ['rgba(157,111,255,','rgba(6,182,212,','rgba(16,185,129,','rgba(245,158,11,'][i % 4],
        phase: Math.random() * Math.PI * 2,
        lVal:  Math.floor(Math.random() * 70 + 15),
        lLife: 0
      });
    }
  }

  function drawAnim(){
    oCtx.clearRect(0, 0, W, H);
    oCtx.fillStyle = 'rgba(5, 2, 18, 0.92)';
    oCtx.fillRect(0, 0, W, H);
    oCtx.strokeStyle = 'rgba(124,58,237,0.07)';
    oCtx.lineWidth   = 1;
    for(var y = 20; y < H; y += Math.floor(H / 4)){
      oCtx.beginPath();oCtx.moveTo(0, y);oCtx.lineTo(W, y);oCtx.stroke();
    }
    var bw    = Math.max(8, Math.floor(W / bars.length) - 4);
    var gap   = Math.max(2, Math.floor(W / bars.length) - bw);
    var total = bw + gap;
    var startX = Math.floor((W - bars.length * total) / 2);
    oCtx.beginPath();
    oCtx.strokeStyle = 'rgba(6,182,212,0.5)';
    oCtx.lineWidth   = 1.5;
    bars.forEach(function(b, i){
      var x = startX + i * total + bw / 2;
      var y = H - b.h - 2;
      if(i === 0) oCtx.moveTo(x, y);
      else        oCtx.lineTo(x, y);
    });
    oCtx.stroke();
    bars.forEach(function(b, i){
      b.h += (b.th - b.h) * 0.055;
      var osc = Math.sin(frame * 0.022 + b.phase) * 4;
      var h   = Math.max(6, b.h + osc);
      var x   = startX + i * total;
      var y   = H - h;
      var grad = oCtx.createLinearGradient(x, y, x, H);
      grad.addColorStop(0, b.col + '0.95)');
      grad.addColorStop(1, b.col + '0.1)');
      oCtx.fillStyle = grad;
      oCtx.beginPath();
      if(oCtx.roundRect){ oCtx.roundRect(x, y, bw, h, [3, 3, 0, 0]); }
      else { oCtx.rect(x, y, bw, h); }
      oCtx.fill();
      oCtx.shadowColor = b.col + '1)';
      oCtx.shadowBlur  = 10;
      oCtx.fillStyle   = b.col + '1)';
      oCtx.fillRect(x, y, bw, 2);
      oCtx.shadowBlur  = 0;
      if(Math.random() < 0.004) b.th = 12 + Math.random() * H * 0.85;
      if(b.lLife > 0){
        oCtx.globalAlpha = Math.min(1, b.lLife / 15);
        oCtx.font        = 'bold ' + Math.max(7, bw * 0.55) + 'px monospace';
        oCtx.fillStyle   = b.col + '1)';
        oCtx.textAlign   = 'center';
        oCtx.fillText('+' + b.lVal + '%', x + bw / 2, y - 5);
        oCtx.globalAlpha = 1;
        b.lLife--;
      }
    });
    if(frame % 55 === 0){
      var ri = Math.floor(Math.random() * bars.length);
      bars[ri].lVal  = Math.floor(Math.random() * 70 + 15);
      bars[ri].lLife = 50;
    }
  }

  function render(){
    frame++;
    drawAnim();
    mCtx.clearRect(0, 0, W, H);
    mCtx.drawImage(offCanvas, 0, 0, W * DPR, H * DPR, 0, 0, W, H);
    mCtx.globalCompositeOperation = 'destination-in';
    mCtx.fillStyle = '#fff';
    mCtx.font      = '900 ' + H * 0.88 + 'px "Arial Black", Arial, sans-serif';
    mCtx.textAlign = 'center';
    mCtx.textBaseline = 'middle';
    mCtx.fillText('BUSINESS', W / 2, H / 2 + H * 0.04);
    mCtx.globalCompositeOperation = 'source-over';
    mCtx.strokeStyle = 'rgba(255,255,255,0.18)';
    mCtx.lineWidth   = 1.5;
    mCtx.font        = '900 ' + H * 0.88 + 'px "Arial Black", Arial, sans-serif';
    mCtx.textAlign   = 'center';
    mCtx.textBaseline = 'middle';
    mCtx.strokeText('BUSINESS', W / 2, H / 2 + H * 0.04);
    mCtx.shadowColor = 'rgba(124,58,237,0.55)';
    mCtx.shadowBlur  = 28;
    mCtx.strokeStyle = 'rgba(157,111,255,0.12)';
    mCtx.lineWidth   = 4;
    mCtx.strokeText('BUSINESS', W / 2, H / 2 + H * 0.04);
    mCtx.shadowBlur  = 0;
    requestAnimationFrame(render);
  }

  function tryInit(){
    resize();
    if(W < 10){ setTimeout(tryInit, 150); return; }
    initBars();
    render();
  }

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(function(){ setTimeout(tryInit, 120); });
  } else {
    setTimeout(tryInit, 350);
  }
  window.addEventListener('resize', function(){ resize(); initBars(); });
})();

/* ═══ KRITEXA.AI COUNTDOWN ═══ */
/*
 * Phase 15 GUARD: Only runs when countdown elements exist in the DOM.
 * These elements (#kaiDays, #kaiHrs, #kaiMins, #kaiSecs) are present only
 * on the /kritexa-ai page. On all other pages this block exits immediately.
 *
 * Interval is cleared automatically when the countdown reaches zero.
 */
(function(){
  var dEl=document.getElementById('kaiDays');
  var hEl=document.getElementById('kaiHrs');
  var mEl=document.getElementById('kaiMins');
  var sEl=document.getElementById('kaiSecs');
  /* Guard: skip entirely if countdown elements are not in the DOM */
  if(!dEl && !hEl && !mEl && !sEl) return;

  var launch = new Date('2026-10-01T00:00:00');
  var cdInterval;

  function updateCountdown(){
    var now  = new Date();
    var diff = launch - now;
    if(diff <= 0){
      diff = 0;
      /* Stop ticking when launch date is reached */
      clearInterval(cdInterval);
    }
    var d = Math.floor(diff/(1000*60*60*24));
    var h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    var m = Math.floor((diff%(1000*60*60))/(1000*60));
    var s = Math.floor((diff%(1000*60))/1000);
    var pad = function(n){return n<10?'0'+n:n;};
    if(dEl) dEl.textContent=pad(d);
    if(hEl) hEl.textContent=pad(h);
    if(mEl) mEl.textContent=pad(m);
    if(sEl) sEl.textContent=pad(s);
  }
  updateCountdown();
  cdInterval = setInterval(updateCountdown, 1000);
})();

/* ═══ PROCESS — Desktop + Mobile ═══ */
/*
 * Phase 15 GUARD: Only runs when process elements exist in the DOM.
 * .proc-c circles, #procHGrid, #procOrbWrap are present only on the home page
 * (src/sections/home/process.html). On all other pages this block exits immediately.
 *
 * On the home page, js/pages/home.js is the canonical owner.
 * This IIFE is additionally guarded by data-page="home" on <body> to prevent
 * duplicate setInterval / RAF when home.js is also loaded.
 */
(function(){
  /* Guard: skip if process circle elements are absent */
  var allCircles = document.querySelectorAll('.proc-c');
  if(!allCircles.length) return;

  /* Guard: home page uses js/pages/home.js — skip to avoid duplicate interval */
  if(document.body && document.body.getAttribute('data-page') === 'home') return;

  var cur = 0;
  function nextPulse(){
    allCircles.forEach(function(ci){ ci.classList.remove('pulsing'); });
    if(allCircles[cur]) allCircles[cur].classList.add('pulsing');
    cur = (cur + 1) % allCircles.length;
  }
  nextPulse();
  setInterval(nextPulse, 1000);

  function positionSpine(){
    var grid  = document.getElementById('procHGrid');
    var spine = document.getElementById('procSpine');
    var firstC = grid ? grid.querySelector('.ph-circle') : null;
    if(!grid || !spine || !firstC) return;
    var gridRect  = grid.getBoundingClientRect();
    var circRect  = firstC.getBoundingClientRect();
    var topOffset = circRect.top - gridRect.top + circRect.height / 2 - 1;
    spine.style.top = topOffset + 'px';
  }

  function layoutOrb(){
    var wrap = document.getElementById('procOrbWrap');
    var svg  = document.getElementById('porbSvg');
    var cen  = document.getElementById('porbCenter');
    if(!wrap || !svg || !cen) return;
    var W  = wrap.getBoundingClientRect().width || wrap.offsetWidth;
    var H  = wrap.getBoundingClientRect().height || wrap.offsetHeight;
    var cx = W / 2, cy = H / 2;
    var N  = 7;
    var firstPill = wrap.querySelector('.porb-pill');
    var nodeR = firstPill ? firstPill.offsetWidth / 2 : Math.min(W * 0.12, 50);
    var cenR = cen.offsetWidth / 2 || 42;
    var R = Math.min(W * 0.32, cx - nodeR - 14);
    var neededH = (R + nodeR) * 2 + nodeR * 0.5 + 16;
    wrap.style.height = neededH + 'px';
    H = neededH; cy = H / 2;
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var arcR = R + nodeR * 0.5 + 4;
    var arcGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
    arcGroup.style.transformOrigin = cx + 'px ' + cy + 'px';
    arcGroup.style.animation = 'orb-spin 8s linear infinite';
    var arcPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    var arcD = 'M ' + cx + ' ' + (cy - arcR) + ' A ' + arcR + ' ' + arcR + ' 0 1 1 ' + (cx - 0.01) + ' ' + (cy - arcR);
    arcPath.setAttribute('d', arcD);
    arcPath.setAttribute('stroke', 'rgba(157,111,255,0.22)');
    arcPath.setAttribute('stroke-width', '1.5');
    arcPath.setAttribute('stroke-dasharray', '6 10');
    arcPath.setAttribute('fill', 'none');
    arcGroup.appendChild(arcPath);
    var movingDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    movingDot.setAttribute('cx', cx);
    movingDot.setAttribute('cy', cy - arcR);
    movingDot.setAttribute('r', '4');
    movingDot.setAttribute('fill', 'rgba(157,111,255,0.85)');
    movingDot.style.filter = 'drop-shadow(0 0 4px rgba(157,111,255,1))';
    arcGroup.appendChild(movingDot);
    svg.appendChild(arcGroup);
    if(!document.getElementById('orbSpinStyle')){
      var st = document.createElement('style');
      st.id = 'orbSpinStyle';
      st.textContent = '@keyframes orb-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}';
      document.head.appendChild(st);
    }
    for(var i = 0; i < N; i++){
      var node = document.getElementById('pn' + i);
      if(!node) continue;
      var angle = (i / N) * Math.PI * 2 - Math.PI / 2;
      var nx = cx + R * Math.cos(angle);
      var ny = cy + R * Math.sin(angle);
      node.style.left = nx + 'px';
      node.style.top  = ny + 'px';
      var lx1 = cx + (cenR + 4) * Math.cos(angle);
      var ly1 = cy + (cenR + 4) * Math.sin(angle);
      var lx2 = cx + (R - nodeR - 4) * Math.cos(angle);
      var ly2 = cy + (R - nodeR - 4) * Math.sin(angle);
      var line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', lx1); line.setAttribute('y1', ly1);
      line.setAttribute('x2', lx2); line.setAttribute('y2', ly2);
      line.setAttribute('stroke', 'rgba(124,58,237,0.25)');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-dasharray', '3 4');
      svg.appendChild(line);
      var dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('cx', lx2); dot.setAttribute('cy', ly2);
      dot.setAttribute('r', '2.5');
      dot.setAttribute('fill', 'rgba(124,58,237,0.4)');
      svg.appendChild(dot);
    }
  }

  function pulseCen(){
    var cen = document.getElementById('porbCenter');
    if(!cen) return;
    var sc = 1, sd = 1;
    function tick(){
      sc += sd * 0.0008;
      if(sc > 1.035) sd = -1;
      if(sc < 0.97)  sd = 1;
      cen.style.transform = 'translate(-50%,-50%) scale(' + sc + ')';
      requestAnimationFrame(tick);
    }
    tick();
  }

  function init(){
    positionSpine();
    layoutOrb();
    pulseCen();
  }
  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(function(){ setTimeout(init, 150); });
  } else {
    setTimeout(init, 300);
  }
  window.addEventListener('resize', function(){ positionSpine(); layoutOrb(); });
})();
