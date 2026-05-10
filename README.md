# RAA WINRAA EXPORT & IMPORT PVT LTD — Website

Company website for RAA WINRAA EXPORT & IMPORT PVT LTD, an international trade and logistics company headquartered in Chennai, India.

---

## Tech Stack

- **Pure static HTML/CSS/JS** — no build system, no npm, no dependencies to install
- **Leaflet.js** (CDN) — interactive office/trade-route map on the homepage
- **Lucide Icons** (CDN, loaded dynamically via `components.js`)
- **FormSubmit.co** — contact form email delivery (no backend needed)
- **Google Fonts** — Fraunces (display), Inter (body), JetBrains Mono (labels)

---

## Project Structure

```
exportimport/
├── index.html                   # Homepage
├── about.html                   # About Us
├── services.html                # Services overview
├── products.html                # Product catalog (with filter)
├── careers.html                 # Job listings
├── news.html                    # News & Insights
├── sustainability.html          # Sustainability report
├── privacy-policy.html          # Privacy Policy (noindex)
├── terms-of-service.html        # Terms of Service (noindex)
├── thank-you.html               # Form submission confirmation (noindex)
├── trade-guides.html            # Trade Guides (coming soon)
├── tariff-calculator.html       # Tariff Calculator (coming soon)
├── track-shipment.html          # Shipment Tracker (coming soon)
│
├── products/
│   ├── textile-apparel.html     # Textile & Apparel product detail
│   └── organic-products.html   # Organic & Natural product detail
│
├── css/
│   ├── base.css                 # Resets, layout primitives, buttons, forms, badges, nav, footer
│   ├── styles.css               # Design tokens, hero, stats, services, CTA, about, contact
│   └── page-specific.css       # Per-page component styles
│
├── js/
│   ├── components.js            # Header/footer injection, Lucide icons, mobile nav
│   ├── map.js                   # Leaflet trade route map (homepage only)
│   └── carousel.js              # Sustainability image carousels
│
├── assets/                      # Service/product images (used in HTML)
│   ├── ocean-freight.jpg
│   ├── air-freight.jpg
│   ├── customs-clearance.jpg
│   ├── warehousing.jpg
│   ├── sourcing-procurement.webp
│   └── supply-chain-consulting.jpg
│
├── images/                      # Sustainability carousel images
│   ├── carbon-reduction.jpg
│   ├── clean-operations-1.jpg
│   ├── clean-operations-2.jpg
│   ├── eco-friendly-packaging.jpg
│   ├── eco-friendly-packaging-2.jpg
│   ├── waste-reduction.jpg
│   ├── supplier-audits.jpg
│   ├── fair-trade-practices.jpg
│   ├── fair-trade-practices-supplier-audits.jpg
│   ├── fair-trade-practices-supplier-audits-1.jpg
│   ├── fair-trade-practices-supplier-audits-2.jpg
│   └── fair-trade-practices.jpg
│
├── robots.txt                   # Crawler rules + sitemap pointer
└── sitemap.xml                  # All indexable pages with priorities
```

---

## Running Locally

No build step needed — open any `.html` file directly in a browser, or use a local server for best results (avoids CORS issues with font loading):

**VS Code Live Server** (recommended)
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**
3. Site opens at `http://127.0.0.1:5500/`

**Python (alternative)**
```bash
cd "e:\Allan Project\RAAWINRAA Project\exportimport"
python -m http.server 8080
# Open http://localhost:8080
```

---

## Key Components

### Header & Footer (`js/components.js`)
Injected into every page via `<div id="site-header">` and `<div id="site-footer">`. Handles:
- Logo and navigation links with dynamic base path (works from root and `products/` subfolder)
- Mobile hamburger menu with aria-expanded toggle
- Lucide icon loading (dynamically injects CDN script, then calls `lucide.createIcons()`)
- © copyright in footer

### Contact Form (`index.html`)
Uses [FormSubmit.co](https://formsubmit.co) — no backend required. After submission, redirects to `thank-you.html`.
- **Action URL:** `https://formsubmit.co/929fc7dc74fd894d2c5bf1798a686367` (hashed, not the raw email)
- Honeypot spam trap enabled (`_honey` field)
- CAPTCHA enabled (reCAPTCHA via FormSubmit)
- To change the redirect URL: update `_next` hidden input value

### Map (`js/map.js`)
Leaflet.js map on the homepage showing 4 offices and 3 trade routes. Requires the Leaflet CDN to load. If it fails (ad-blocker, outage), the map container shows a text fallback listing office locations.

### Carousels (`js/carousel.js`)
Auto-rotating image carousels on `sustainability.html`. Respects `prefers-reduced-motion` (shows static first image when reduced motion is set). Pauses when the browser tab is hidden.

---

## CSS Architecture

| File | Purpose |
|------|---------|
| `base.css` | Resets, layout grid, buttons, forms, badges, footer, nav |
| `styles.css` | Design tokens (colors, fonts, spacing), hero, stats bar, services grid, CTA, about, contact, mobile nav |
| `page-specific.css` | Per-page styles: about, services, sustainability, products, careers, news, product detail pages |

All breakpoints use **literal pixel values** (768px, 1024px, 1200px, 480px) — CSS custom properties do not work inside `@media` conditions.

---

## Deployment

This is a static site — upload the entire folder to any web host:

- **Recommended:** [Netlify](https://netlify.com) (drag-and-drop deploy) or [GitHub Pages](https://pages.github.com)
- **Domain:** `raawinraaexportimport.com`
- No server-side processing required

**After going live:**
1. Submit `https://raawinraaexportimport.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
2. Verify the FormSubmit `_next` redirect (`thank-you.html`) works correctly
3. Test the contact form end-to-end and confirm email arrives at `raawinraa@gmail.com`

---

## Contact

- **Email:** raawinraa@gmail.com
- **Phone:** (+91) 91764 04239 / 9962666933
- **Address:** No 103, Dhandayathapani Street, Sai baba temple backside Veerapuram Morai, Chennai 600055
