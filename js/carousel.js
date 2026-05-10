(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initializeCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
      var images = carousel.querySelectorAll('img');
      if (images.length === 0) return;

      if (reducedMotion) {
        images[0].classList.add('active');
        return;
      }

      var current = 0;

      function tick() {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
      }

      var id = setInterval(tick, 2000);
      carousel.dataset.intervalId = id;

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          clearInterval(id);
        } else {
          id = setInterval(tick, 2000);
          carousel.dataset.intervalId = id;
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousels);
  } else {
    initializeCarousels();
  }
})();
