/* ===== Portfolio animations (added) ===== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Page loader
  var loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<span></span>';
  document.body.appendChild(loader);
  function hideLoader() { loader.classList.add('done'); setTimeout(function () { loader.remove(); }, 700); }
  window.addEventListener('load', function () { setTimeout(hideLoader, 300); });
  setTimeout(hideLoader, 3000); // safety

  // Scroll progress bar
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (reduce) return;

  // Tag elements for reveal (no HTML edits needed)
  var groups = [
    { sel: '.section-label, .section-title, .services-subtitle, .experience-subtitle', cls: 'an' },
    { sel: '.section-title-rule', cls: 'an-line' },
    { sel: '.about-visual', cls: 'an an-left' },
    { sel: '.about-content', cls: 'an an-right' },
    { sel: '.about-stat', cls: 'an an-zoom', stagger: true },
    { sel: '.skills-slider-section', cls: 'an' },
    { sel: '.service-card', cls: 'an', stagger: true },
    { sel: '.portfolio-filter', cls: 'an' },
    { sel: '.portfolio-card', cls: 'an an-zoom', stagger: true },
    { sel: '.experience-item', cls: 'an', stagger: true },
    { sel: '.contact-title, .contact-subtitle, .contact-desc', cls: 'an' },
    { sel: '.contact-info', cls: 'an an-left' },
    { sel: '.contact-form', cls: 'an an-right' },
    { sel: '.contact-map', cls: 'an an-zoom' },
    { sel: '.footer-main', cls: 'an' }
  ];
  var targets = [];
  groups.forEach(function (g) {
    document.querySelectorAll(g.sel).forEach(function (el, i) {
      el.className += ' ' + g.cls;
      if (g.stagger) el.style.setProperty('--an-d', (i % 3) * 0.12 + 's');
      targets.push(el);
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('an-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function (el) { io.observe(el); });

  // Pop-in animation when portfolio filter changes
  document.querySelectorAll('.portfolio-filter-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.portfolio-card').forEach(function (c) {
        c.classList.remove('an-pop'); void c.offsetWidth;
        c.classList.add('an-in', 'an-pop');
        c.style.setProperty('--an-d', '0s');
        setTimeout(function () { c.classList.remove('an-pop'); }, 600);
      });
    });
  });

  // Count-up for stats (2.5+, 10+, 98%, 5+)
  document.querySelectorAll('.about-stat-number').forEach(function (el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^([\d.]+)(.*)$/);
    if (!m) return;
    var end = parseFloat(m[1]), suffix = m[2], dec = (m[1].split('.')[1] || '').length;
    var so = new IntersectionObserver(function (ents) {
      if (!ents[0].isIntersecting) return;
      so.disconnect();
      var start = null, dur = 1600;
      (function step(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }, { threshold: 0.6 });
    so.observe(el);
  });

  // Hero title typing effect
  var title = document.querySelector('.hero-title');
  if (title) {
    var full = title.textContent.trim();
    title.textContent = '';
    title.classList.add('typing-cursor');
    var i = 0;
    setTimeout(function type() {
      title.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(type, 70);
      else setTimeout(function () { title.classList.remove('typing-cursor'); }, 2500);
    }, 900);
  }

  // Header nav: highlight link of the section in view
  var links = document.querySelectorAll('.navbar a');
  var secs = [];
  links.forEach(function (a) {
    var id = (a.getAttribute('href') || '').replace('#', '');
    var s = id && document.getElementById(id);
    if (s) secs.push({ a: a, s: s });
  });
  window.addEventListener('scroll', function () {
    var y = window.scrollY + 160, cur = null;
    secs.forEach(function (o) { if (o.s.offsetTop <= y) cur = o; });
    if (cur) { links.forEach(function (l) { l.classList.remove('active'); }); cur.a.classList.add('active'); }
  }, { passive: true });

  // Subtle hero photo parallax on mouse move (desktop)
  var visual = document.querySelector('.hero-visual');
  if (visual && window.matchMedia('(min-width: 992px)').matches) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 16, y = (e.clientY / window.innerHeight - 0.5) * 16;
      visual.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      visual.style.transition = 'transform .2s ease-out';
    });
  }
})();
