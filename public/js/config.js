/**
 * Feature: Centralized Application Configuration & Service Catalog
 *
 * This module groups all configurable parameters for the "Mobilidade em Braga"
 * web application into a single source of truth. By centralizing storage keys,
 * supported languages, route hashes, timing thresholds, accordion behavior,
 * operator logo assets, and external service links, updates can be made safely
 * without hunting through markup or logic.
 *
 * Use cases:
 * - Adjusting supported languages and default fallback language.
 * - Managing localized external URLs so tourists land on the right language version.
 * - Configuring loader safety timeout, view transitions, and exclusive accordions.
 * - Mapping navigation sections to URL hashes for browser Back/Forward support.
 * - Validating links, logos, and IDs programmatically in automated read-only tests.
 */

export const APP_CONFIG = {
  /** Default fallback language code */
  defaultLang: 'pt',

  /** Ordered list of supported ISO 639-1 language codes */
  supportedLangs: ['pt', 'en', 'es', 'fr'],

  /** Human-readable display labels for the language dropdown */
  languageLabels: {
    pt: 'Português',
    en: 'English',
    es: 'Español',
    fr: 'Français'
  },

  /** Compact language codes rendered inside the top-right switcher button */
  languageShortCodes: {
    pt: 'PT',
    en: 'EN',
    es: 'ES',
    fr: 'FR'
  },

  /** LocalStorage key used to persist the user's selected language */
  storageKeys: {
    language: 'braga_mobility_lang'
  },

  /** Background hero photo path and loader safety timeout (ms) */
  loader: {
    backgroundImageUrl: '/public/Braga_em_Fotos_018.jpg',
    fallbackTimeoutMs: 2500,
    fadeDurationMs: 600
  },

  /** Footer institutional logo paths per language */
  brandLogos: {
    pt: '/public/braga-brand-pt.svg',
    default: '/public/braga-brand.svg'
  },

  /** Verified local operator logo assets bundled inside /public/logos/ */
  operatorLogos: [
    '/public/logos/cp.webp',
    '/public/logos/cctb.webp',
    '/public/logos/redeexpressos.webp',
    '/public/logos/flixbus.webp',
    '/public/logos/getbus.webp',
    '/public/logos/cavado.jpg',
    '/public/logos/ave.jpg'
  ],

  /** Mapping between internal section identifiers and URL hash fragments */
  routes: {
    home: '',
    arrive: '#viajar',
    around: '#cidade'
  },

  /** Transition duration (ms) used when switching between Home and Section views */
  viewTransitionMs: 160,

  /** Accordion UX configuration */
  accordions: {
    /** When true, opening an accordion closes sibling accordions unless searching */
    exclusiveMode: true
  },

  /**
   * Localized external URLs keyed by anchor element ID.
   * Each entry provides a `default` URL and optional language-specific overrides.
   */
  localizedLinks: {
    'link-cp': {
      pt: 'https://www.cp.pt/passageiros/pt',
      en: 'https://www.cp.pt/passageiros/en',
      es: 'https://www.cp.pt/passageiros/en',
      fr: 'https://www.cp.pt/passageiros/en',
      default: 'https://www.cp.pt/passageiros/pt'
    },
    'link-flix': {
      pt: 'https://www.flixbus.pt/',
      en: 'https://global.flixbus.com/',
      es: 'https://www.flixbus.es/',
      fr: 'https://www.flixbus.fr/',
      default: 'https://www.flixbus.pt/'
    },
    'link-get': {
      pt: 'https://www.getbus.eu/pt/',
      en: 'https://www.getbus.eu/en/',
      es: 'https://www.getbus.eu/en/',
      fr: 'https://www.getbus.eu/en/',
      default: 'https://www.getbus.eu/pt/'
    },
    'link-viaverde': {
      pt: 'https://visitors.viaverde.pt/pt',
      en: 'https://visitors.viaverde.pt/en',
      es: 'https://visitors.viaverde.pt/es',
      fr: 'https://visitors.viaverde.pt/fr',
      default: 'https://visitors.viaverde.pt/pt'
    },
    'link-ana': {
      pt: 'https://www.aeroportoporto.pt/pt/opo/home',
      en: 'https://www.aeroportoporto.pt/en/opo/home',
      es: 'https://www.aeroportoporto.pt/es/opo/home',
      fr: 'https://www.aeroportoporto.pt/fr/opo/home',
      default: 'https://www.aeroportoporto.pt/pt/opo/home'
    },
    'link-skyscanner': {
      pt: 'https://www.skyscanner.pt/',
      en: 'https://www.skyscanner.net/',
      es: 'https://www.skyscanner.es/',
      fr: 'https://www.skyscanner.fr/',
      default: 'https://www.skyscanner.pt/'
    },
    'link-kayak': {
      pt: 'https://www.kayak.pt/cars',
      en: 'https://www.kayak.com/cars',
      es: 'https://www.kayak.es/cars',
      fr: 'https://www.kayak.fr/cars',
      default: 'https://www.kayak.pt/cars'
    },
    'link-blablacar': {
      pt: 'https://www.blablacar.pt/',
      en: 'https://www.blablacar.co.uk/',
      es: 'https://www.blablacar.es/',
      fr: 'https://www.blablacar.fr/',
      default: 'https://www.blablacar.pt/'
    },
    'link-uber': {
      pt: 'https://www.uber.com/pt/pt/',
      en: 'https://www.uber.com/pt/en/',
      es: 'https://www.uber.com/es/es/',
      fr: 'https://www.uber.com/fr/fr/',
      default: 'https://www.uber.com/pt/pt/'
    },
    'link-bolt': {
      pt: 'https://bolt.eu/pt-pt/',
      en: 'https://bolt.eu/en/',
      es: 'https://bolt.eu/es-es/',
      fr: 'https://bolt.eu/fr-fr/',
      default: 'https://bolt.eu/pt-pt/'
    },
    'link-mobie': {
      pt: 'https://www.mobie.pt/carregarveiculo/encontrarpostodecarregamento',
      en: 'https://www.mobie.pt/en/chargevehicle/findachargingstation',
      es: 'https://www.mobie.pt/en/chargevehicle/findachargingstation',
      fr: 'https://www.mobie.pt/en/chargevehicle/findachargingstation',
      default: 'https://www.mobie.pt/en/chargevehicle/findachargingstation'
    },
    'link-electromaps': {
      pt: 'https://www.electromaps.com/pt',
      en: 'https://www.electromaps.com/en',
      es: 'https://www.electromaps.com/es',
      fr: 'https://www.electromaps.com/fr',
      default: 'https://www.electromaps.com/pt'
    }
  }
};

/**
 * Resolves the appropriate localized URL for a configured external service link.
 *
 * @param {string} linkId - DOM id of the anchor element.
 * @param {string} lang - Active ISO 639-1 language code.
 * @returns {string | null} Resolved URL or null if linkId is not configured.
 */
export function getLocalizedUrl(linkId, lang) {
  const entry = APP_CONFIG.localizedLinks[linkId];
  if (!entry) {
    return null;
  }
  return entry[lang] || entry.default;
}
