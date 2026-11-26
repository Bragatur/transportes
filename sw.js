/**
 * Feature: Progressive Web App Service Worker (Network-First Code + Offline Caching)
 *
 * Precaches the core shell, modular JavaScript bundles, Visit Braga SVG marks,
 * operator logos, PWA icons, and background photograph so visitors in roaming
 * or low-signal areas (stations, buses) can still open the app, read the
 * multilingual Quick Mobility Guide, check TUB line tips, and view Tourist
 * Office contacts offline.
 *
 * Strategy:
 * - `/api/*`: Network-only (never cached) so real-time TUB bus schedules are always live.
 * - HTML, JS, CSS, and `/manifest.json`: Network-first with offline cache fallback so
 *   updates take effect immediately without stale-code traps.
 * - Images, SVGs, operator logos, and external font/icon stylesheets: Cache-first with
 *   background refresh.
 *
 * Use cases:
 * - Ensuring real-time TUB schedule scripts and API requests are never stale.
 * - Serving cached index.html and static assets seamlessly when offline.
 * - Cleaning outdated cache versions automatically on activation.
 */

const CACHE_NAME = 'braga-mobility-v6';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/public/Braga_em_Fotos_018.jpg',
  '/public/MarcaVisitBraga_white.svg',
  '/public/braga-brand-pt.svg',
  '/public/braga-brand.svg',
  '/public/braga-icon.svg',
  '/public/pwa-192x192.png',
  '/public/pwa-512x512.png',
  '/public/pwa-maskable-512x512.png',
  '/public/apple-touch-icon.png',
  '/public/logos/cp.webp',
  '/public/logos/cctb.webp',
  '/public/logos/redeexpressos.webp',
  '/public/logos/flixbus.webp',
  '/public/logos/getbus.webp',
  '/public/logos/cavado.jpg',
  '/public/logos/ave.jpg',
  '/public/js/config.js',
  '/public/js/logger.js',
  '/public/js/translations.js',
  '/public/js/i18n.js',
  '/public/js/accordions.js',
  '/public/js/search.js',
  '/public/js/navigation.js',
  '/public/js/privacyModal.js',
  '/public/js/guideModal.js',
  '/public/js/tubApiClient.js',
  '/public/js/tubFavorites.js',
  '/public/js/tubPlanner.js',
  '/public/js/tubLive.js',
  '/public/js/pwa.js',
  '/public/js/loader.js',
  '/public/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never intercept or cache live mobility API responses
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    return;
  }

  // Navigation requests: network-first with offline fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', clone));
          }
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Same-origin JS, CSS, and manifest: network-first so updates never get stuck behind cache
  const isCodeAsset =
    url.origin === self.location.origin &&
    /\.(js|mjs|css|json)$/i.test(url.pathname);

  if (isCodeAsset) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static images/logos & Google Fonts / Font Awesome: cache-first with background refresh
  const isCacheableExternal =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com' ||
    url.origin === 'https://cdnjs.cloudflare.com';

  if (url.origin === self.location.origin || isCacheableExternal) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            if (response && (response.status === 200 || response.type === 'opaque')) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
  }
});
