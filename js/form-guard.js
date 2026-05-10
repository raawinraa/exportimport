(function () {
  'use strict';

  var PREFIX = 'rw_form_';
  var MAX_FREE = 2;
  var BLOCK_MS = 3 * 60 * 60 * 1000;      // 3 hours
  var RECORD_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days — expire old unblocked records

  function storageKey(email) {
    return PREFIX + email.trim().toLowerCase();
  }

  function loadRecord(email) {
    try {
      var raw = localStorage.getItem(storageKey(email));
      return raw ? JSON.parse(raw) : { count: 0, blockedUntil: 0, lastSubmit: 0 };
    } catch (e) {
      return { count: 0, blockedUntil: 0, lastSubmit: 0 };
    }
  }

  function saveRecord(email, record) {
    try {
      localStorage.setItem(storageKey(email), JSON.stringify(record));
    } catch (e) {}
  }

  // Only remove entries where:
  //   (a) a block was set and has since expired, OR
  //   (b) no block but last submission was over 30 days ago
  function cleanup() {
    try {
      var now = Date.now();
      var toRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) {
          var rec = JSON.parse(localStorage.getItem(k) || '{}');
          var blockExpired = rec.blockedUntil && now >= rec.blockedUntil;
          var recordStale  = !rec.blockedUntil && rec.lastSubmit && (now - rec.lastSubmit) > RECORD_TTL;
          if (blockExpired || recordStale) {
            toRemove.push(k);
          }
        }
      }
      toRemove.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatTime(ms) {
    var total = Math.ceil(ms / 1000);
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    return h + 'h ' + pad2(m) + 'm ' + pad2(s) + 's';
  }

  function init() {
    cleanup();

    var emailInput = document.getElementById('contact-email');
    if (!emailInput) return;
    var form = emailInput.closest('form');
    if (!form) return;
    var submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    var blockEl = document.createElement('div');
    blockEl.className = 'form-block-msg';
    blockEl.setAttribute('role', 'alert');
    blockEl.setAttribute('aria-live', 'polite');
    blockEl.innerHTML =
      '<p class="form-block-title">Submission limit reached</p>' +
      '<p class="form-block-body">This email address has reached the maximum number of submissions. ' +
      'Please wait <strong class="form-block-timer"></strong> before trying again.</p>';
    form.insertBefore(blockEl, submitBtn);

    var countdownId = null;

    function startCountdown(blockedUntil, email) {
      submitBtn.disabled = true;
      blockEl.classList.add('is-visible');

      function tick() {
        var remaining = blockedUntil - Date.now();
        if (remaining <= 0) {
          clearInterval(countdownId);
          countdownId = null;
          saveRecord(email, { count: 0, blockedUntil: 0, lastSubmit: 0 });
          submitBtn.disabled = false;
          blockEl.classList.remove('is-visible');
        } else {
          blockEl.querySelector('.form-block-timer').textContent = formatTime(remaining);
        }
      }

      tick();
      countdownId = setInterval(tick, 1000);
    }

    form.addEventListener('submit', function (e) {
      var email = emailInput.value.trim();
      if (!email) return;

      var record = loadRecord(email);
      var now = Date.now();

      // Block expired — reset
      if (record.blockedUntil && now >= record.blockedUntil) {
        record = { count: 0, blockedUntil: 0, lastSubmit: 0 };
        saveRecord(email, record);
      }

      // Currently blocked
      if (record.blockedUntil && now < record.blockedUntil) {
        e.preventDefault();
        startCountdown(record.blockedUntil, email);
        return;
      }

      // Increment count
      record.count = (record.count || 0) + 1;
      record.lastSubmit = now;

      if (record.count > MAX_FREE) {
        record.blockedUntil = now + BLOCK_MS;
        saveRecord(email, record);
        e.preventDefault();
        startCountdown(record.blockedUntil, email);
      } else {
        saveRecord(email, record);
        // allow normal form submission
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
