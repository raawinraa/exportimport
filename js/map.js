// Global office locations
const offices = [
  { name: "Chennai HQ",       coords: [13.0827, 80.2707], type: "headquarters" },
  { name: "Singapore Office", coords: [1.3521,  103.8198], type: "regional" },
  { name: "Sri Lanka Office", coords: [6.9271,  80.7744],  type: "regional" },
  { name: "Rotterdam Port Hub", coords: [51.9244, 4.4777], type: "port" }
];

// Trade routes
const tradeRoutes = [
  { from: [13.0827, 80.2707], to: [1.3521,  103.8198], color: '#0097B2', label: 'Asia-Pacific' },
  { from: [13.0827, 80.2707], to: [51.9244, 4.4777],   color: '#2563eb', label: 'Europe Corridor' },
  { from: [13.0827, 80.2707], to: [6.9271,  80.7744],  color: '#7C3AED', label: 'Sri Lanka' }
];

const markerColors = {
  headquarters: '#005F73',
  regional:     '#0097B2',
  port:         '#E76F51'
};

function initializeMap() {
  const mapEl = document.getElementById('globalMap');
  if (!mapEl) return;

  if (typeof L === 'undefined') {
    mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:24px;color:#5F5A54;font-size:14px;line-height:1.6;"><p>Our offices:<br>Chennai HQ &bull; Singapore &bull; Sri Lanka &bull; Rotterdam Port Hub</p></div>';
    return;
  }

  const map = L.map('globalMap', {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true
  }).setView([20, 10], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  offices.forEach(office => {
    const color = encodeURIComponent(markerColors[office.type]);
    const icon = L.icon({
      iconUrl: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`,
      iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -36]
    });

    const label = office.type === 'headquarters' ? '🏢 Headquarters'
                : office.type === 'port'         ? '⚓ Port Hub'
                :                                  '🌐 Regional Office';

    L.marker(office.coords, { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Inter',sans-serif;font-size:14px;min-width:180px">
          <strong style="color:#005F73;font-size:15px">${office.name}</strong>
          <p style="margin:8px 0 0;color:#8B8680;font-size:12px">${label}</p>
        </div>
      `, { className: 'office-popup' });
  });

  tradeRoutes.forEach(route => {
    L.polyline([route.from, route.to], {
      color: route.color, weight: 3, opacity: 0.7, dashArray: '8, 4'
    }).addTo(map).bindPopup(`
      <div style="font-family:'Inter',sans-serif;font-size:13px">
        <strong style="color:${route.color}">Trade Route</strong>
        <p style="margin:4px 0 0;color:#8B8680">${route.label}</p>
      </div>
    `);
  });

  if (window.innerWidth < 768) map.setZoom(2);
}

// Safe init: works whether script loads before or after DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMap);
} else {
  initializeMap();
}
