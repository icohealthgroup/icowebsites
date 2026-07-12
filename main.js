/* Balwyn Central Medical — shared interactions */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---- sticky header shadow ---- */
  var header = document.querySelector('header');
  var toTop = document.querySelector('.to-top');
  function onScroll(){
    var y = window.scrollY;
    if(header) header.classList.toggle('scrolled', y > 10);
    if(toTop) toTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(toTop) toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto':'smooth'}); });

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  var overlay = document.getElementById('mmOverlay');
  function closeMenu(){ if(menu) menu.classList.remove('open'); if(overlay) overlay.classList.remove('open'); document.body.style.overflow=''; }
  if(burger) burger.addEventListener('click', function(){
    menu.classList.add('open'); if(overlay) overlay.classList.add('open'); document.body.style.overflow='hidden';
  });
  document.querySelectorAll('.mm-close, #mmOverlay').forEach(function(el){ el.addEventListener('click', closeMenu); });
  document.querySelectorAll('.mm-group>button').forEach(function(b){
    b.addEventListener('click', function(){ b.parentElement.classList.toggle('open'); });
  });

  /* ---- reveal on scroll (exposed so pages can observe injected content) ---- */
  var io = null;
  if(!reduce && 'IntersectionObserver' in window){
    io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.14, rootMargin:'0px 0px -40px 0px'});
  }
  function observeReveals(scope){
    if(!scope) return;
    var els = (scope === document ? document : scope).querySelectorAll('.reveal');
    els.forEach(function(el){
      if(io){ io.observe(el); } else { el.classList.add('in'); }
    });
  }
  window.observeReveals = observeReveals;
  observeReveals(document);

  /* ---- count-up stats ---- */
  function countUp(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if(reduce){ el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      var val = target % 1 === 0 ? Math.floor(eased*target) : (eased*target).toFixed(0);
      el.textContent = val + suffix;
      if(p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    if('IntersectionObserver' in window){
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } });
      }, {threshold:.6});
      counters.forEach(function(el){ cio.observe(el); });
    } else { counters.forEach(countUp); }
  }

  /* ---- testimonials slider ---- */
  var slider = document.querySelector('.tst');
  if(slider){
    var slides = slider.querySelectorAll('.tst-slide');
    var dotsWrap = slider.querySelector('.tst-dots');
    var i = 0, timer;
    slides.forEach(function(s, idx){
      var d = document.createElement('button');
      d.setAttribute('aria-label','Testimonial '+(idx+1));
      if(idx===0) d.classList.add('active');
      d.addEventListener('click', function(){ go(idx); reset(); });
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll('button');
    function go(n){
      slides[i].classList.remove('active'); dots[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active'); dots[i].classList.add('active');
    }
    function reset(){ if(reduce) return; clearInterval(timer); timer = setInterval(function(){ go(i+1); }, 5500); }
    reset();
  }

  /* ---- faq accordion ---- */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var a = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? (a.scrollHeight + 20) + 'px' : null;
    });
  });

  /* ---- mouse parallax tilt (hero visuals & split media) ---- */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt], .hero-visual .super, .split-media').forEach(function(el){
      var raf = null;
      el.addEventListener('mousemove', function(ev){
        if(raf) return;
        raf = requestAnimationFrame(function(){
          var r = el.getBoundingClientRect();
          var x = (ev.clientX - r.left) / r.width - .5;
          var y = (ev.clientY - r.top) / r.height - .5;
          el.style.transform = 'perspective(900px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg)';
          raf = null;
        });
      });
      el.addEventListener('mouseleave', function(){
        el.style.transform = '';
      });
    });
  }

  /* ---- scroll drift for decorative orbs / dot fields ---- */
  var drifters = document.querySelectorAll('[data-drift]');
  if(drifters.length && !reduce){
    var ticking = false;
    function drift(){
      var y = window.scrollY;
      drifters.forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-drift')) || .15;
        var r = el.getBoundingClientRect();
        if(r.bottom > 0 && r.top < window.innerHeight){
          el.style.transform = 'translateY(' + ((y * speed) % 120 - 60).toFixed(1) + 'px)';
        }
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ ticking = true; requestAnimationFrame(drift); }
    }, {passive:true});
    drift();
  }

  /* ---- magnetic booking buttons (subtle; not in the header) ---- */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('main .btn-green, main .btn-light-blue, .page-hero .btn, .hero .btn').forEach(function(b){
      b.addEventListener('mousemove', function(ev){
        var r = b.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - .5;
        var y = (ev.clientY - r.top) / r.height - .5;
        b.style.transform = 'translate(' + (x * 4).toFixed(1) + 'px,' + (y * 3 - 2).toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function(){ b.style.transform = ''; });
    });
  }

  /* ---- home hero quick search: jump to Find Care ---- */
  var qs = document.getElementById('quickSearch');
  if(qs){
    qs.addEventListener('submit', function(e){
      e.preventDefault();
      var v = qs.querySelector('input').value.trim();
      window.location.href = 'find-care.html' + (v ? '?q=' + encodeURIComponent(v) : '');
    });
    qs.querySelectorAll('[data-q]').forEach(function(chip){
      chip.addEventListener('click', function(){
        window.location.href = 'find-care.html?q=' + encodeURIComponent(chip.getAttribute('data-q'));
      });
    });
  }
})();
