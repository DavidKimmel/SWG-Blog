(function () {
  'use strict';

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');

  if (nav && hero) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        nav.classList.toggle('nav--hidden', entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);
  }

  var hamburger = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileClose = document.querySelector('.mobile-menu__close');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('body--menu-open');
    if (mobileClose) mobileClose.focus();
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('body--menu-open');
    if (hamburger) hamburger.focus();
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });

  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.querySelectorAll('.video-facade').forEach(function (facade) {
    facade.addEventListener('click', function () {
      var videoId = this.dataset.videoId;
      if (!videoId) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      this.innerHTML = '';
      this.appendChild(iframe);
      this.style.cursor = 'default';
    });
  });

  var heroEl = document.querySelector('.hero');
  if (heroEl && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener(
      'scroll',
      function () {
        var scroll = window.scrollY;
        if (scroll < window.innerHeight) {
          heroEl.style.backgroundPositionY = scroll * 0.3 + 'px';
        }
      },
      { passive: true }
    );
  }
})();
