/**
 * Feature: Read-Only Verification & Integrity Test Suite
 *
 * Non-destructive Node.js test runner that validates the Braga Mobility portal
 * without modifying any application data or files. Verifies:
 * 1. Translation parity across all configured languages (PT, EN, ES, FR).
 * 2. Every DOM ID referenced in TEXT_BINDINGS, HTML_BINDINGS, localizedLinks,
 *    tabs, search controls, and navigation elements exists in index.html.
 * 3. All external target="_blank" anchors include rel="noopener noreferrer" and
 *    contain zero ad/analytics tracking parameters (such as `_gl=`).
 * 4. All operator logo files configured in APP_CONFIG.operatorLogos exist on disk.
 * 5. Helper utilities (`getLocalizedUrl`, `sanitizeLogParam`, `normalizeSearchText`)
 *    behave as expected.
 *
 * Use cases:
 * - Running `npm test` after adding new links, sections, logos, or languages.
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
 * Verifies that every DOM ID referenced by i18n bindings, navigation, tabs, and search exists.
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

  const blankAnchorMatches = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/g) || [];
  assert.ok(blankAnchorMatches.length >= 30, 'Expected at least 30 external service links');

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
 * Verifies helper utilities without mutating any persisted or file state.
 *
 * @returns {void}
 */
function testUtilities() {
  assert.equal(getLocalizedUrl('link-ana', 'en'), 'https://www.aeroportoporto.pt/en/opo/home');
  assert.equal(getLocalizedUrl('link-ana', 'fr'), 'https://www.aeroportoporto.pt/fr/opo/home');
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
  testUtilities();
  console.info('All Braga Mobility read-only verification tests passed.');
}

runAllTests();
