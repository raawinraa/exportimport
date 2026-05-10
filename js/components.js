/**
 * Component Injection System
 * Injects reusable header and footer across all pages
 * Works from any directory level with dynamic path detection
 */

function getBasePath() {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 1) {
    return '';
  }

  return '../'.repeat(segments.length - 1);
}

const BASE = getBasePath();

// ===== HEADER COMPONENT =====
const HEADER_HTML = `
<header>
  <div class="rk-container">
    <div class="rk-nav">
      <a href="${BASE}index.html" class="rk-logo-link" aria-label="RAA WINRAA — Back to home">
        <img src="${BASE}assets/gold.png" alt="RAA WINRAA EXPORT &amp; IMPORT PVT LTD" class="rk-logo-img" width="44" height="44">
        <span class="rk-logo-text">RAA<span style="color: var(--accent);">WINRAA</span></span>
      </a>
      <nav class="rk-nav-links" id="rk-nav-menu" aria-label="Main navigation">
        <a href="${BASE}index.html">Home</a>
        <a href="${BASE}services.html">Services</a>
        <a href="${BASE}products.html">Products</a>
        <a href="${BASE}about.html">About</a>
        <a href="${BASE}index.html#contact">Contact</a>
      </nav>
      <div class="rk-nav-actions">
        <a href="${BASE}index.html#contact" class="btn btn-primary btn-sm rk-nav-cta">Get Quote</a>
        <button class="rk-hamburger" id="rk-hamburger" aria-label="Toggle navigation" aria-expanded="false" aria-controls="rk-nav-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>
`;

// ===== FOOTER COMPONENT =====
const FOOTER_HTML = `
<footer class="rk-footer">
  <div class="rk-container">
    <div class="rk-footer-grid">
      <div>
        <img src="${BASE}assets/gold.png" alt="RAA WINRAA EXPORT &amp; IMPORT PVT LTD" class="rk-logo-img footer-logo-img" width="64" height="64">
        <p class="footer-description">Your trusted partner for seamless international trade, logistics, and supply chain solutions since 2026.</p>
      </div>
      <div>
        <h5>Services</h5>
        <ul>
          <li><a href="${BASE}services.html">Ocean Freight</a></li>
          <li><a href="${BASE}services.html">Air Freight</a></li>
          <li><a href="${BASE}services.html">Customs Clearance</a></li>
          <li><a href="${BASE}services.html">Warehousing</a></li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="${BASE}about.html">About Us</a></li>
          <li><a href="${BASE}careers.html">Careers</a></li>
          <li><a href="${BASE}news.html">News & Insights</a></li>
          <li><a href="${BASE}sustainability.html">Sustainability</a></li>
        </ul>
      </div>
      <div>
        <h5>Resources</h5>
        <ul>
          <li><a href="${BASE}trade-guides.html">Trade Guides</a></li>
          <li><a href="${BASE}tariff-calculator.html">Tariff Calculator</a></li>
          <li><a href="${BASE}track-shipment.html">Track Shipment</a></li>
          <li><a href="${BASE}index.html#contact">Support</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 RAA WINRAA EXPORT &amp; IMPORT PVT LTD. All rights reserved.</span>
      <span><a href="${BASE}privacy-policy.html">Privacy Policy</a> &middot; <a href="${BASE}terms-of-service.html">Terms of Service</a></span>
    </div>
  </div>
</footer>
`;

/**
 * Injects header into the page
 */
function injectHeader() {
  const headerContainer = document.getElementById('site-header');
  if (headerContainer) {
    headerContainer.innerHTML = HEADER_HTML;
  }
}

/**
 * Injects footer into the page
 */
function injectFooter() {
  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) {
    footerContainer.innerHTML = FOOTER_HTML;
  }
}

/**
 * Loads Lucide icons and replaces all [data-lucide] elements with SVGs
 */
function loadLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  script.onload = function () { lucide.createIcons(); };
  document.head.appendChild(script);
}

/**
 * Wires up the mobile hamburger toggle after header is injected
 */
function setupMobileNav() {
  const hamburger = document.getElementById('rk-hamburger');
  const navMenu = document.getElementById('rk-nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.classList.toggle('is-open', isOpen);
  });

  // Close menu when any nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('is-open');
    });
  });
}

/**
 * Initialize all components when DOM is ready
 */
function injectFavicon() {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = BASE + 'assets/gold.png';
    document.head.appendChild(link);
  }
}

function initializeComponents() {
  injectHeader();
  injectFooter();
  setupMobileNav();
  loadLucide();
  injectFavicon();
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}
