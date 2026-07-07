/* ========================================
   ZARAR CHEMICALS — Premium Script
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── SCROLL PROGRESS BAR ────────────── */
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ── AUTO-TAG EXTRA ELEMENTS FOR SCROLL REVEAL ─── */
  var autoRevealSelectors = [
    '.section-title-wrap', '.about-text', '.about-visual', '.stat',
    '.footer-col', '.mission-quote', '.trust-bar-badge', '.check-list',
    '.page-body-text', '.hero-card ul li', '.category-head'
  ];
  autoRevealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.classList.contains('reveal') && !el.classList.contains('in-view')) {
        el.classList.add('reveal-fade');
      }
    });
  });

  /* ── BUTTON RIPPLE CLICK EFFECT ─────── */
  document.querySelectorAll('.btn, .form-submit').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'btn-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* ── MOBILE NAV ─────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var isNavOpen = false;

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      isNavOpen = !isNavOpen;
      if (isNavOpen) {
        nav.style.cssText = 'display:block;position:absolute;top:68px;left:0;right:0;background:#fff;border-top:1px solid #dde4ed;padding:16px 24px;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,.1);animation:fadeUp .22s ease both;';
        var ul = nav.querySelector('ul');
        ul.style.cssText = 'flex-direction:column;align-items:flex-start;gap:4px;';
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        nav.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isNavOpen && !nav.contains(e.target) && !toggle.contains(e.target)) {
        isNavOpen = false;
        nav.style.display = 'none';
      }
    });
  }

  /* ── ACTIVE NAV LINKS ───────────────── */
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ── HEADER SHADOW ON SCROLL ────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 24px rgba(0,0,0,.13)'
        : '0 2px 16px rgba(0,0,0,.09)';
    }, { passive: true });
  }

  /* ── SCROLL REVEAL ──────────────────── */
  var revealTargets = document.querySelectorAll(
    '.solution-card, .industry-card, .cat-card, .reveal, .reveal-fade, .reveal-zoom, .tech-card, .partner-card, .policy-col, .quote-info-item, .stat, .news-item-card'
  );
  if (revealTargets.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── COUNT-UP ANIMATION ─────────────── */
  var counters = document.querySelectorAll('.count-up');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1800;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ── HERO VIDEO PARALLAX ────────────── */
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY * 0.22, 130);
          heroVideo.style.transform = 'translate(-50%, calc(-50% + ' + offset + 'px)) scale(1.12)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── CUSTOM CURSOR GLOW ─────────────── */
  if (window.innerWidth > 1024 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var mx = 0, my = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
    });
    (function animateGlow() {
      glowX += (mx - glowX) * 0.12;
      glowY += (my - glowY) * 0.12;
      glow.style.left = (glowX - 11) + 'px';
      glow.style.top = (glowY - 11) + 'px';
      requestAnimationFrame(animateGlow);
    })();
    // Expand on hoverable elements
    document.querySelectorAll('a, button, .solution-card, .cat-card, .industry-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        glow.style.transform = 'scale(3.5)';
        glow.style.background = 'rgba(232,130,12,.18)';
      });
      el.addEventListener('mouseleave', function() {
        glow.style.transform = 'scale(1)';
        glow.style.background = 'rgba(232,130,12,.35)';
      });
    });
  }

  /* ── NEWS TICKER CLONE ──────────────── */
  var tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    // Clone children for infinite loop
    var clone = tickerTrack.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    tickerTrack.parentNode.appendChild(clone);
  }

  /* ── NEWSLETTER FORM ────────────────── */
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('newsletter-email');
      var email = emailInput.value.trim();
      if (!email) return;
      var subject = encodeURIComponent('Newsletter Subscription Request');
      var body = encodeURIComponent('Hello Zarar Chemicals,\n\nPlease subscribe: ' + email + '\n\nThank you.');
      window.location.href = 'mailto:info@zararchem.com?subject=' + subject + '&body=' + body;
      emailInput.value = '';
    });
  }

  /* ── SMOOTH HOVER LINE for nav ──────── */
  var mainNavLinks = document.querySelectorAll('.main-nav > ul > li > a');
  mainNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mainNavLinks.forEach(function(l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  /* ── PRODUCTS PAGE: dropdown click also navigates ──── */
  var productsNavLink = document.querySelector('.has-dropdown > a[href="products.html"]');
  if (productsNavLink) {
    productsNavLink.addEventListener('click', function(e) {
      // Allow navigation — don't prevent default
      // Dropdown still shows on hover via CSS
    });
  }


  /* ── MOBILE DROPDOWN TOGGLE ─────────── */
  var hasDropdowns = document.querySelectorAll('.has-dropdown');
  hasDropdowns.forEach(function(item) {
    var link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 780) {
          e.preventDefault();
          var isOpen = item.classList.contains('mob-open');
          hasDropdowns.forEach(function(d) { d.classList.remove('mob-open'); });
          if (!isOpen) {
            item.classList.add('mob-open');
          }
        }
        // On desktop, normal link click navigates
      });
    }
  });

});
