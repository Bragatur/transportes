/**
 * Feature: Internationalization (i18n), Language Persistence & Switcher UI
 *
 * Manages detecting the visitor's preferred language, persisting manual
 * language selections in localStorage, applying translated text/HTML,
 * updating search placeholders and ARIA labels, adapting external service URLs
 * to the active language, and operating the top-right language switcher.
 *
 * Use cases:
 * - Restoring a returning visitor's chosen language from localStorage.
 * - Falling back automatically to navigator.language or Portuguese (pt).
 * - Adapting external transport websites and search placeholders to the active language.
 * - Supporting keyboard navigation (Escape to close, accessible button options).
 */

import { APP_CONFIG, getLocalizedUrl } from './config.js';
import { logCall } from './logger.js';
import { TRANSLATIONS, TEXT_BINDINGS, HTML_BINDINGS } from './translations.js';

/**
 * Safely reads the stored language preference from localStorage.
 *
 * @returns {string | null} Stored language code or null if unavailable.
 */
export function getSavedLanguage() {
  logCall('getSavedLanguage');
  try {
    const saved = window.localStorage.getItem(APP_CONFIG.storageKeys.language);
    if (saved && APP_CONFIG.supportedLangs.includes(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('[BragaMobility] Unable to read localStorage:', error);
  }
  return null;
}

/**
 * Safely persists the selected language code into localStorage.
 *
 * @param {string} lang - Validated ISO 639-1 language code.
 * @returns {void}
 */
export function saveLanguage(lang) {
  logCall('saveLanguage', { lang });
  try {
    window.localStorage.setItem(APP_CONFIG.storageKeys.language, lang);
  } catch (error) {
    console.warn('[BragaMobility] Unable to write localStorage:', error);
  }
}

/**
 * Detects the best initial language from localStorage, browser preferences, or fallback.
 *
 * @returns {string} Effective supported language code.
 */
export function detectInitialLanguage() {
  logCall('detectInitialLanguage');
  const saved = getSavedLanguage();
  if (saved) {
    return saved;
  }
  const browserLang = (navigator.language || APP_CONFIG.defaultLang).slice(0, 2).toLowerCase();
  return APP_CONFIG.supportedLangs.includes(browserLang) ? browserLang : APP_CONFIG.defaultLang;
}

/**
 * Updates external service anchor hrefs and accessible titles for the active language.
 *
 * @param {string} lang - Active ISO 639-1 language code.
 * @param {string} externalTitle - Localized tooltip/title for external links.
 * @returns {void}
 */
export function updateLocalizedLinks(lang, externalTitle) {
  logCall('updateLocalizedLinks', { lang });
  for (const linkId of Object.keys(APP_CONFIG.localizedLinks)) {
    const anchor = document.getElementById(linkId);
    const resolvedUrl = getLocalizedUrl(linkId, lang);
    if (anchor && resolvedUrl) {
      anchor.setAttribute('href', resolvedUrl);
    }
  }

  const externalCards = document.querySelectorAll('a.card[target="_blank"]');
  externalCards.forEach((card) => {
    card.setAttribute('title', externalTitle);
  });
}

/**
 * Rebuilds the top-right language dropdown options using accessible button elements.
 *
 * @param {string} currentLang - Currently active language code.
 * @returns {void}
 */
export function renderLanguageOptions(currentLang) {
  logCall('renderLanguageOptions', { currentLang });
  const optionsDiv = document.getElementById('lang-options');
  const langBtn = document.getElementById('lang-btn');
  if (!optionsDiv) return;

  optionsDiv.innerHTML = '';

  for (const code of APP_CONFIG.supportedLangs) {
    if (code === currentLang) continue;

    const optionBtn = document.createElement('button');
    optionBtn.type = 'button';
    optionBtn.className = 'lang-option';
    optionBtn.setAttribute('role', 'option');
    optionBtn.setAttribute('lang', code);
    optionBtn.textContent = APP_CONFIG.languageLabels[code];
    optionBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      setLanguage(code, true);
      closeLanguageMenu();
      if (langBtn) langBtn.focus();
    });

    optionsDiv.appendChild(optionBtn);
  }
}

/**
 * Closes the language switcher dropdown and updates its ARIA expanded state.
 *
 * @returns {void}
 */
export function closeLanguageMenu() {
  logCall('closeLanguageMenu');
  const optionsDiv = document.getElementById('lang-options');
  const langBtn = document.getElementById('lang-btn');
  if (optionsDiv) optionsDiv.classList.remove('show');
  if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
}

/**
 * Applies the selected language to all text nodes, headings, search controls,
 * modal content, document metadata, brand logo, and localized external links.
 *
 * @param {string} lang - Requested language code.
 * @param {boolean} [persist=false] - Whether to persist the selection in localStorage.
 * @returns {string} Effective language code applied.
 */
export function setLanguage(lang, persist = false) {
  logCall('setLanguage', { lang, persist });
  const effectiveLang = APP_CONFIG.supportedLangs.includes(lang)
    ? lang
    : APP_CONFIG.defaultLang;
  const dict = TRANSLATIONS[effectiveLang];

  if (persist) {
    saveLanguage(effectiveLang);
  }

  // Update document metadata
  document.title = dict.pageTitle;
  document.documentElement.lang = effectiveLang;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', dict.metaDescription);
  }

  // Update plain text elements
  for (const [elementId, key] of Object.entries(TEXT_BINDINGS)) {
    const el = document.getElementById(elementId);
    if (el && dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  }

  // Update trusted static HTML fragments (headings with icons & legal copy)
  for (const [elementId, key] of Object.entries(HTML_BINDINGS)) {
    const el = document.getElementById(elementId);
    if (el && dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  }

  // Update search & accessibility attributes
  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.placeholder = dict.searchPlaceholder;
    searchInput.setAttribute('aria-label', dict.searchAriaLabel);
  }

  const searchClearBtn = document.getElementById('search-clear-btn');
  if (searchClearBtn) {
    searchClearBtn.setAttribute('aria-label', dict.searchClearAria);
  }

  const brandHomeBtn = document.getElementById('brand-home-btn');
  if (brandHomeBtn) {
    brandHomeBtn.setAttribute('aria-label', dict.brandHomeAria);
  }

  const tubStopSearch = document.getElementById('tub-stop-search');
  if (tubStopSearch) {
    tubStopSearch.placeholder = dict.tubStopSearchPlaceholder;
    tubStopSearch.setAttribute('aria-label', dict.tubStopSearchPlaceholder);
  }

  const tubLineSearch = document.getElementById('tub-line-search');
  if (tubLineSearch) {
    tubLineSearch.placeholder = dict.tubLineSearchPlaceholder;
    tubLineSearch.setAttribute('aria-label', dict.tubLineSearchPlaceholder);
  }

  const tubRefreshBtn = document.getElementById('tub-live-refresh');
  if (tubRefreshBtn) {
    tubRefreshBtn.setAttribute('aria-label', dict.tubRefreshAria);
    tubRefreshBtn.setAttribute('title', dict.tubRefreshAria);
  }

  const tubPlanFrom = document.getElementById('tub-plan-from');
  if (tubPlanFrom) {
    tubPlanFrom.placeholder = dict.tubPlanFromPlaceholder;
    tubPlanFrom.setAttribute('aria-label', dict.tubPlanFromPlaceholder);
  }

  const tubPlanTo = document.getElementById('tub-plan-to');
  if (tubPlanTo) {
    tubPlanTo.placeholder = dict.tubPlanToPlaceholder;
    tubPlanTo.setAttribute('aria-label', dict.tubPlanToPlaceholder);
  }

  const tubPlanGpsBtn = document.getElementById('tub-plan-gps-btn');
  if (tubPlanGpsBtn) {
    tubPlanGpsBtn.setAttribute('aria-label', dict.tubPlanGpsAria);
    tubPlanGpsBtn.setAttribute('title', dict.tubPlanGpsAria);
  }

  const tubPlanSwapBtn = document.getElementById('tub-plan-swap-btn');
  if (tubPlanSwapBtn) {
    tubPlanSwapBtn.setAttribute('aria-label', dict.tubPlanSwapAria);
    tubPlanSwapBtn.setAttribute('title', dict.tubPlanSwapAria);
  }

  // Update footer municipal brand logo
  const footerLogo = document.getElementById('footer-logo');
  if (footerLogo) {
    footerLogo.src = APP_CONFIG.brandLogos[effectiveLang] || APP_CONFIG.brandLogos.default;
  }

  // Update language button label and accessible name
  const currentLangEl = document.getElementById('current-lang');
  const langBtn = document.getElementById('lang-btn');
  if (currentLangEl) {
    currentLangEl.textContent = APP_CONFIG.languageShortCodes[effectiveLang];
  }
  if (langBtn) {
    langBtn.setAttribute('aria-label', `${dict.langAriaLabel} (${APP_CONFIG.languageLabels[effectiveLang]})`);
  }

  updateLocalizedLinks(effectiveLang, dict.externalLinkTitle);
  renderLanguageOptions(effectiveLang);

  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('braga:langchange', { detail: { lang: effectiveLang } }));
  }

  return effectiveLang;
}

/**
 * Initializes the language switcher button, keyboard escape handling, and initial language.
 *
 * @returns {void}
 */
export function initI18n() {
  logCall('initI18n');
  const langBtn = document.getElementById('lang-btn');
  const langOptions = document.getElementById('lang-options');

  if (langBtn && langOptions) {
    langBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = langOptions.classList.toggle('show');
      langBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', () => {
      closeLanguageMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && langOptions.classList.contains('show')) {
        closeLanguageMenu();
        langBtn.focus();
      }
    });
  }

  const initialLang = detectInitialLanguage();
  setLanguage(initialLang, false);
}
