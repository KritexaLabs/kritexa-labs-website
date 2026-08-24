/* ═══════════════════════════════════════════════════════════════
   KRITEXA LABS — GLOBAL JS
   js/global.js
   Phase 3 update — Navigation responsibilities moved to navigation.js
   Phase 15 update — JS & Animation Engineering

   Responsibilities:
     - Custom cursor (pointer devices only)
     - Scroll reveal (IntersectionObserver)
     - Animated counters (IntersectionObserver)
     - FAQ accordion
     - Social icon hover effects

   Phase 15 changes:
     - Cursor: REDUCED_MOTION guard — RAF loop does not start
     - Cursor: mousemove listener uses { passive: true }
     - Cursor: visibilitychange pause/resume to save CPU when tab hidden
     - Cursor hover: uses event delegation on document instead of per-element
       listeners (reduces initial listener count from N×2 to 2 total)
     - Scroll reveal: already unobserves after reveal — confirmed correct
     - Counters: already unobserve after animation — confirmed correct
     - Social hover: only initializes when social elements exist on page

   Navigation responsibilities (moved to js/navigation.js in Phase 3):
     - Navbar scroll state
     - Hamburger / mobile menu
     - Dynamic navbar collapse
     - Products trigger state
     - Escape / outside-click handling
     - aria-current active state (active-nav.js)
═══════════════════════════════════════════════════════════════ */

/* ═══ CURSOR ═══ */
/* Pointer devices only — hidden on touch/hover:none in css/header.css */
(function(){
  var c=document.getElementById('cur'),r=document.getElementById('cur-r');
  /* Guard: no cursor elements, or not a pointer device */
  if(!c||!r||!window.matchMedia('(hover:hover)').matches)return;

  /* Guard: respect reduced-motion — do not start RAF loop */
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    /* Elements are hidden via CSS global.css reduced-motion block */
    return;
  }

  var mx=-100,my=-100,rx=-100,ry=-100;
  var rafId=null;
  var paused=false;

  /* passive:true — this listener only reads coordinates, never calls preventDefault */
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;},{ passive:true });

  function tick(){
    if(paused)return;
    rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
    c.style.cssText='left:'+mx+'px;top:'+my+'px';
    r.style.cssText='left:'+rx+'px;top:'+ry+'px';
    rafId=requestAnimationFrame(tick);
  }
  tick();

  /* Pause cursor RAF when tab is hidden — saves CPU */
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){
      paused=true;
      if(rafId){cancelAnimationFrame(rafId);rafId=null;}
    } else {
      paused=false;
      tick();
    }
  });

  /* Cursor size change on hover — event delegation instead of per-element listeners.
     Instead of attaching mouseenter/mouseleave to every matching element,
     we use a single delegated pointerover/pointerout pair on document.
     This reduces initial JS work from N×2 listeners to 2 total. */
  var hoverSelector='a,button,.svc-item,.cs-card,.why-card,.t-card,.b-card,.stat-box,.cs-feat,.job-card,.ben-card,.sol-vis,.faq-btn,.labs-card,.c-link,.ps-box';

  document.addEventListener('pointerover',function(e){
    if(e.pointerType==='mouse' && e.target.closest(hoverSelector)){
      c.classList.add('big');r.classList.add('big');
    }
  },{ passive:true });

  document.addEventListener('pointerout',function(e){
    if(e.pointerType==='mouse' && e.target.closest(hoverSelector)){
      c.classList.remove('big');r.classList.remove('big');
    }
  },{ passive:true });
})();

/* ═══ SCROLL REVEAL ═══ */
var rvIO=new IntersectionObserver(function(entries){
  entries.forEach(function(e,i){
    if(e.isIntersecting){
      setTimeout(function(){e.target.classList.add('on');},i*60);
      rvIO.unobserve(e.target); /* one-time reveal — stop observing */
    }
  });
},{threshold:0.06,rootMargin:'0px 0px -40px 0px'});
function observeRv(){
  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(function(el){
    if(!el.classList.contains('on'))rvIO.observe(el);
  });
}
observeRv();

/* ═══ ANIMATED COUNTERS ═══ */
var cntIO=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var el=e.target,t=parseInt(el.dataset.count||0),d=1600,s=null;
      var suf=el.dataset.suffix||'';
      function step(ts){
        if(!s)s=ts;
        var p=Math.min((ts-s)/d,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(ease*t)+suf;
        if(p<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cntIO.unobserve(el); /* one-time animation — stop observing */
    }
  });
},{threshold:0.3});
function observeCnt(){
  document.querySelectorAll('[data-count]').forEach(function(el){cntIO.observe(el);});
}
observeCnt();

/* ═══ FAQ — event delegation (Phase 20: inline onclick removed) ═══ */
/* toggleFaq is kept for backward-compat with any cached page but
   primary dispatch is via data-faq-toggle + delegated listener.    */
function toggleFaq(btn){
  var item=btn.closest('.faq-item');
  if(!item)return;
  var was=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i){
    i.classList.remove('open');
    var b=i.querySelector('.faq-btn');
    if(b)b.setAttribute('aria-expanded','false');
  });
  if(!was){
    item.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  } else {
    btn.setAttribute('aria-expanded','false');
  }
}
document.addEventListener('click',function(e){
  var btn=e.target.closest('[data-faq-toggle]');
  if(btn)toggleFaq(btn);
});

/* ═══ SOCIAL ICON HOVER COLORS ═══ */
/* Guard: only initialize if social elements exist on this page */
(function(){
  var soc={
    's-li':['rgba(0,119,181,.18)','rgba(0,119,181,.6)','#0077B5'],
    's-fb':['rgba(24,119,242,.15)','rgba(24,119,242,.5)','#1877F2'],
    's-ig':['rgba(225,48,108,.13)','rgba(225,48,108,.45)','#E1306C'],
    's-yt':['rgba(255,0,0,.13)','rgba(255,0,0,.45)','#FF0000'],
    's-x':['rgba(255,255,255,.07)','rgba(255,255,255,.35)','#fff'],
    's-th':['rgba(200,200,200,.07)','rgba(200,200,200,.3)','#E0E0E0']
  };
  Object.keys(soc).forEach(function(cls){
    var st=soc[cls];
    var els=document.querySelectorAll('.'+cls);
    if(!els.length)return; /* skip if no elements with this class */
    els.forEach(function(el){
      el.addEventListener('mouseenter',function(){
        el.style.background=st[0];el.style.borderColor=st[1];
        el.style.color=st[2];el.style.transform='translateY(-3px) scale(1.1)';
      });
      el.addEventListener('mouseleave',function(){
        el.style.background='';el.style.borderColor='';
        el.style.color='';el.style.transform='';
      });
    });
  });
})();
