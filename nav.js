(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('site-nav-links');
  if (!toggle || !links) return;

  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    var toggleBackToTop = function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]'));
  var navSections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && navSections.length) {
    var setActive = function (id) {
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    navSections.forEach(function (section) { spy.observe(section); });
  }
})();
