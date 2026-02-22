(function () {
  'use strict';
  var wrapper = document.querySelector('.site-wrapper');
  if (!wrapper) return;

  var timer;
  window.addEventListener('scroll', function () {
    wrapper.classList.add('scrolling');
    clearTimeout(timer);
    timer = setTimeout(function () {
      wrapper.classList.remove('scrolling');
    }, 200);
  }, { passive: true });
})();
