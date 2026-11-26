/**
 * Feature: Read-Only Verification & Integrity Test Suite
 *
 * Non-destructive Node.js test runner that validates the Braga Mobility portal
 * without modifying any application data or files. Verifies:
 * 1. Translation parity across all configured languages (PT, EN, ES, FR).
 * 2. Every DOM ID referenced in TEXT_BINDINGS, HTML_BINDINGS, localizedLinks,
 *    tabs, search controls, PWA controls, and modals exists in index.html.
 * 3. All external target="_blank" anchors include rel="noopener noreferrer" and
 *    contain zero ad/analytics tracking parameters (such as `_gl=`).
 * 4. All operator logos and PWA assets (manifest.json, sw.js, PNG icons) exist
 *    on disk and meet PWA compliance rules (short_name <= 12 chars, 192 & 512,
 *    separate maskable icon, apple-touch-icon PNG).
 * 5. Helper utilities (`getLocalizedUrl`, `sanitizeLogParam`, `normalizeSearchText`)
 *    behave as expected.
 *
 * Use cases:
 * - Running `npm test` after adding new links, sections, logos, PWA assets, or languages.
 * - Catching broken DOM bindings, missing assets, or missing translations pre-build.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { APP_CONFIG, getLocalizedUrl } from '../public/js/config.js';
import { sanitizeLogParam } from '../public/js/logger.js';
import { normalizeSearchText } from '../public/js/search.js';
import { TRANSLATIONS, TEXT_BINDINGS, HTML_BINDINGS } from '../public/js/translations.js';
import { isValidFavoriteStopRecord, normalizeFavoriteStopsList } from '../public/js/tubFavorites.js';
import {
  isValidTubStopId,
  isValidTubTripId,
  isValidLineFilter,
  isValidPlanPlace,
  isWithinBragaBounds,
  computeDistanceMeters,
  normalizeDeparture,
  normalizeItinerary,
  normalizeSearchText as normalizeTubSearchText,
  resolveApiBaseUrl,
  getFeaturedStops
} from '../server/tubMobilityService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');

/**
 * Verifies that every supported language defines all translation keys.
 *
 * @returns {void}
 */
function testTranslationCompleteness() {
  const baseKeys = Object.keys(TRANSLATIONS[APP_CONFIG.defaultLang]).sort();

  for (const lang of APP_CONFIG.supportedLangs) {
    assert.ok(TRANSLATIONS[lang], `Missing translation dictionary for language "${lang}"`);
    const keys = Object.keys(TRANSLATIONS[lang]).sort();
    assert.deepEqual(keys, baseKeys, `Translation keys mismatch for language "${lang}"`);

    for (const key of baseKeys) {
      assert.ok(
        typeof TRANSLATIONS[lang][key] === 'string' && TRANSLATIONS[lang][key].trim().length > 0,
        `Empty translation value for ${lang}.${key}`
      );
    }
  }
}

/**
 * Verifies that every DOM ID referenced by i18n bindings, navigation, tabs, PWA, TUB Live, and modals exists.
 *
 * @param {string} html - Raw contents of index.html.
 * @returns {void}
 */
function testDomBindingsExist(html) {
  const allIds = [
    ...Object.keys(TEXT_BINDINGS),
    ...Object.keys(HTML_BINDINGS),
    ...Object.keys(APP_CONFIG.localizedLinks),
    'brand-home-btn',
    'quick-guide-btn',
    'pwa-install-btn',
    'offline-banner',
    'home-btn-arrive',
    'home-btn-around',
    'section-toolbar',
    'tab-arrive',
    'tab-around',
    'btn-back',
    'search-bar-wrap',
    'service-search',
    'search-clear-btn',
    'search-empty-state',
    'search-switch-hint',
    'view-stage',
    'home-menu',
    'section-arrive',
    'section-around',
    'lang-btn',
    'current-lang',
    'lang-options',
    'footer-logo',
    'privacy-modal',
    'guide-modal',
    'ios-install-modal',
    'tub-live-accordion',
    'tub-live-heading',
    'tub-live-clock',
    'tub-live-refresh',
    'tub-tab-stops',
    'tub-tab-planner',
    'tub-tab-lines',
    'tub-panel-stops',
    'tub-panel-planner',
    'tub-panel-lines',
    'tub-plan-form',
    'tub-plan-from',
    'tub-plan-to',
    'tub-plan-gps-btn',
    'tub-plan-swap-btn',
    'tub-plan-submit',
    'tub-plan-quick-dests',
    'tub-plan-results',
    'tub-stop-search',
    'tub-nearby-btn',
    'tub-stop-results',
    'tub-featured-stops',
    'tub-favorites-section',
    'tub-favorites-label',
    'tub-favorites-list',
    'tub-selected-stop-name',
    'tub-selected-stop-fav',
    'tub-selected-stop-gps',
    'tub-line-filters',
    'tub-departures-list',
    'tub-line-search',
    'tub-lines-count',
    'tub-lines-list',
    'tub-line-detail',
    'loader-wrapper'
  ];

  for (const id of allIds) {
    const pattern = new RegExp(`id=["']${id}["']`);
    assert.ok(pattern.test(html), `Expected DOM element with id="${id}" in index.html`);
  }
}

/**
 * Verifies external link security (rel="noopener noreferrer") and clean URLs.
 *
 * @param {string} html - Raw contents of index.html.
 * @returns {void}
 */
function testExternalLinksCleanAndSecure(html) {
  assert.ok(!html.includes('_gl='), 'Found leftover Google tracking parameter "_gl=" in index.html');
  assert.ok(
    html.includes('maps/search/gas+station+Braga'),
    'Expected Google Maps fuel link to be centered on Braga'
  );
  assert.ok(
    html.includes('https://www.map.tub.pt/'),
    'Expected TUB Interactive Map link in index.html'
  );

  const blankAnchorMatches = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/g) || [];
  assert.ok(blankAnchorMatches.length >= 40, 'Expected at least 40 external service links');

  for (const tag of blankAnchorMatches) {
    assert.ok(
      /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/.test(tag),
      `External link missing rel="noopener noreferrer": ${tag}`
    );
  }

  for (const [linkId, urls] of Object.entries(APP_CONFIG.localizedLinks)) {
    for (const [lang, url] of Object.entries(urls)) {
      assert.ok(url.startsWith('https://'), `Localized URL for ${linkId}.${lang} must use HTTPS`);
      assert.ok(!url.includes('_gl='), `Localized URL for ${linkId}.${lang} must not contain tracking params`);
    }
  }
}

/**
 * Verifies that all configured operator logo assets exist inside /public/logos/.
 *
 * @param {string} html - Raw contents of index.html.
 * @returns {void}
 */
function testOperatorLogosExist(html) {
  for (const publicPath of APP_CONFIG.operatorLogos) {
    const diskPath = path.join(rootDir, publicPath.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Missing operator logo asset on disk: ${publicPath}`);
    assert.ok(html.includes(publicPath), `Expected operator logo "${publicPath}" to be referenced in index.html`);
  }
}

/**
 * Verifies PWA manifest compliance, Service Worker file, PNG icons, and iOS meta tags.
 *
 * @param {string} html - Raw contents of index.html.
 * @returns {void}
 */
function testPwaCompliance(html) {
  const manifestPath = path.join(rootDir, 'manifest.json');
  const swPath = path.join(rootDir, 'sw.js');

  assert.ok(fs.existsSync(manifestPath), 'Missing /manifest.json');
  assert.ok(fs.existsSync(swPath), 'Missing /sw.js');

  const swContent = fs.readFileSync(swPath, 'utf8');
  assert.ok(swContent.includes("startsWith('/api/')"), 'sw.js must bypass /api/* from caching');
  assert.ok(swContent.includes('isCodeAsset'), 'sw.js must use network-first for JS/CSS/JSON code assets');
  assert.ok(html.includes('/public/js/main.js?v=6'), 'index.html should load versioned main.js to bypass stale SW caches');

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.equal(manifest.id, '/');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.display, 'standalone');
  assert.ok(
    manifest.short_name && manifest.short_name.length <= 12,
    `Manifest short_name must be <= 12 chars (got "${manifest.short_name}")`
  );

  const has192 = manifest.icons.some((i) => i.sizes === '192x192' && i.purpose === 'any');
  const has512 = manifest.icons.some((i) => i.sizes === '512x512' && i.purpose === 'any');
  const hasMaskable = manifest.icons.some((i) => i.sizes === '512x512' && i.purpose === 'maskable');
  assert.ok(has192 && has512 && hasMaskable, 'Manifest must define separate 192x192, 512x512 (any), and 512x512 (maskable) PNG icons');

  for (const iconPath of APP_CONFIG.pwa.icons) {
    const diskPath = path.join(rootDir, iconPath.replace(/^\//, ''));
    assert.ok(fs.existsSync(diskPath), `Missing PWA icon on disk: ${iconPath}`);
  }

  assert.ok(html.includes('rel="manifest" href="/manifest.json"'), 'index.html missing manifest link');
  assert.ok(
    html.includes('rel="apple-touch-icon" href="/public/apple-touch-icon.png"'),
    'index.html missing PNG apple-touch-icon link'
  );
}

/**
 * Verifies server-side TUB mobility service validators, bounds checks, and departure normalization.
 *
 * @returns {void}
 */
function testTubMobilityService() {
  assert.ok(fs.existsSync(path.join(rootDir, '.env.example')), 'Missing .env.example');
  assert.ok(fs.existsSync(path.join(rootDir, 'api/tub.js')), 'Missing Vercel serverless function /api/tub.js');
  assert.ok(fs.existsSync(path.join(rootDir, 'vercel.json')), 'Missing /vercel.json');
  const vercelCfg = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
  assert.equal(vercelCfg.outputDirectory, 'dist');
  assert.ok(
    Array.isArray(vercelCfg.rewrites) &&
      vercelCfg.rewrites.some((r) => r.source === '/api/tub/:path*' && r.destination === '/api/tub'),
    'vercel.json must rewrite /api/tub/:path* to /api/tub'
  );
  assert.ok(resolveApiBaseUrl().startsWith('https://'), 'Resolved mobility API base URL must be HTTPS');

  assert.equal(isValidTubStopId('pt-Transportes-Urbanos-de-Braga_146'), true);
  assert.equal(isValidTubStopId('http://169.254.169.254/latest'), false);
  assert.equal(isValidTubStopId('../etc/passwd'), false);

  assert.equal(isValidTubTripId('20261126_09:00_pt-Transportes-Urbanos-de-Braga_2_311'), true);
  assert.equal(isValidTubTripId('evil-trip-id'), false);

  assert.equal(isValidLineFilter('2'), true);
  assert.equal(isValidLineFilter('88'), true);
  assert.equal(isValidLineFilter('2; DROP TABLE'), false);

  assert.equal(normalizeTubSearchText('Av. da Liberdade — São Lázaro'), 'av da liberdade sao lazaro');
  assert.equal(
    isValidFavoriteStopRecord({ stopId: 'pt-Transportes-Urbanos-de-Braga_146', name: 'Central I (Av. Central)' }),
    true
  );
  assert.equal(isValidFavoriteStopRecord({ stopId: 'evil-stop', name: '<script>' }), false);
  const cleanedFavs = normalizeFavoriteStopsList([
    { stopId: 'pt-Transportes-Urbanos-de-Braga_146', name: 'Central I' },
    { stopId: 'pt-Transportes-Urbanos-de-Braga_146', name: 'Duplicate Central I' },
    { stopId: 'invalid', name: 'Bad' },
    { stopId: 'pt-Transportes-Urbanos-de-Braga_1', name: 'Bom Jesus' }
  ]);
  assert.equal(cleanedFavs.length, 2);
  assert.equal(cleanedFavs[0].stopId, 'pt-Transportes-Urbanos-de-Braga_146');
  assert.equal(cleanedFavs[1].stopId, 'pt-Transportes-Urbanos-de-Braga_1');
  assert.equal(isWithinBragaBounds(41.5518, -8.4198), true);
  assert.equal(isWithinBragaBounds(38.7223, -9.1393), false);

  const dist = computeDistanceMeters(41.55187, -8.419851, 41.5546, -8.3775);
  assert.ok(dist > 3000 && dist < 4000, `Expected ~3.5km Central to Bom Jesus distance, got ${dist}m`);

  const featured = getFeaturedStops();
  assert.ok(featured.length >= 6, 'Expected at least 6 featured Braga TUB stops');
  for (const stop of featured) {
    assert.ok(isValidTubStopId(stop.stopId), `Invalid featured stopId: ${stop.stopId}`);
  }

  const nowMs = Date.parse('2026-11-26T09:30:00Z');
  const normalized = normalizeDeparture(
    {
      routeShortName: '2',
      routeLongName: 'PONTE DE PRADO - BOM JESUS',
      headsign: 'BOM JESUS',
      realTime: true,
      tripId: '20261126_09:00_pt-Transportes-Urbanos-de-Braga_2_311',
      place: {
        stopId: 'pt-Transportes-Urbanos-de-Braga_146',
        name: 'Central I',
        departure: '2026-11-26T09:36:00Z',
        scheduledDeparture: '2026-11-26T09:34:00Z'
      }
    },
    nowMs
  );
  assert.equal(normalized.line, '2');
  assert.equal(normalized.minutesUntil, 6);
  assert.equal(normalized.delayMinutes, 2);
  assert.equal(normalized.realTime, true);
  assert.equal(normalized.departureTime, '09:36');

  assert.equal(isValidPlanPlace('pt-Transportes-Urbanos-de-Braga_146'), true);
  assert.equal(isValidPlanPlace('41.556708,-8.404594'), true);
  assert.equal(isValidPlanPlace('38.7223,-9.1393'), false);
  assert.equal(isValidPlanPlace('https://evil.example/'), false);

  const itin = normalizeItinerary(
    {
      duration: 1500,
      startTime: '2026-11-26T09:40:00Z',
      endTime: '2026-11-26T10:05:00Z',
      transfers: 0,
      legs: [
        {
          mode: 'WALK',
          duration: 300,
          distance: 350,
          startTime: '2026-11-26T09:40:00Z',
          endTime: '2026-11-26T09:45:00Z',
          from: { name: 'START' },
          to: { name: 'Liberdade (25 de Abril)' }
        },
        {
          mode: 'BUS',
          agencyId: 'TUB',
          routeShortName: '2',
          routeLongName: 'PONTE DE PRADO - BOM JESUS',
          headsign: 'BOM JESUS',
          realTime: true,
          duration: 1200,
          startTime: '2026-11-26T09:45:00Z',
          endTime: '2026-11-26T10:05:00Z',
          tripId: '20261126_09:30_pt-Transportes-Urbanos-de-Braga_2_1',
          from: { name: 'Liberdade (25 de Abril)', stopId: 'pt-Transportes-Urbanos-de-Braga_10' },
          to: { name: 'Bom Jesus', stopId: 'pt-Transportes-Urbanos-de-Braga_1' },
          intermediateStops: [{ name: 'Tenões', stopId: 'pt-Transportes-Urbanos-de-Braga_55', departure: '2026-11-26T09:58:00Z' }]
        }
      ]
    },
    nowMs
  );
  assert.deepEqual(itin.busLines, ['2']);
  assert.equal(itin.hasTubBus, true);
  assert.equal(itin.durationMinutes, 25);
  assert.equal(itin.minutesUntilStart, 10);
  assert.equal(itin.legs[1].stopsCount, 2);
}

/**
 * Verifies helper utilities without mutating any persisted or file state.
 *
 * @returns {void}
 */
function testUtilities() {
  assert.equal(getLocalizedUrl('link-ana', 'en'), 'https://www.aeroportoporto.pt/en/opo/home');
  assert.equal(getLocalizedUrl('link-park4night', 'fr'), 'https://park4night.com/fr/search?lat=41.5454&lng=-8.4265&z=13');
  assert.equal(getLocalizedUrl('unknown-id', 'pt'), null);

  assert.equal(normalizeSearchText('  Táxis & Avião — Eléctrico '), 'taxis & aviao — electrico');
  assert.equal(normalizeSearchText('CÁVADO'), 'cavado');

  assert.equal(
    sanitizeLogParam('data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=='),
    '[inline-data-stripped]'
  );
  assert.deepEqual(
    sanitizeLogParam({ lang: 'pt', inlineData: 'secret-binary' }),
    { lang: 'pt', inlineData: '[inline-data-stripped]' }
  );
}

/**
 * Runs all read-only verification checks and reports results.
 *
 * @returns {void}
 */
function runAllTests() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  testTranslationCompleteness();
  testDomBindingsExist(html);
  testExternalLinksCleanAndSecure(html);
  testOperatorLogosExist(html);
  testPwaCompliance(html);
  testTubMobilityService();
  testUtilities();
  console.info('All Braga Mobility read-only verification tests passed.');
}

runAllTests();
