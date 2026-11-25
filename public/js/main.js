/**
 * Feature: Application Bootstrap Entry Point
 *
 * Coordinates initialization of all feature modules for the "Mobilidade em
 * Braga" portal once the DOM is ready: internationalization (with persisted
 * language), exclusive accordions with item counts, smooth segmented navigation
 * with history sync, instant service search, accessible privacy modal, and
 * resilient background preloader.
 *
 * Use cases:
 * - Bootstrapping the static frontend cleanly via ES modules.
 * - Keeping search filter state synchronized when switching between tabs or home.
 */

import { logCall } from './logger.js';
import { initI18n } from './i18n.js';
import { initAccordions } from './accordions.js';
import { initNavigation, getActiveView, showSection } from './navigation.js';
import { initSearch, applyServiceSearch, clearServiceSearch } from './search.js';
import { initPrivacyModal } from './privacyModal.js';
import { initLoader } from './loader.js';

/**
 * Attaches safe image fallback handlers to operator logos so broken images
 * gracefully reveal their paired icon fallback instead of an empty frame.
 *
 * @returns {void}
 */
export function initLogoFallbacks() {
  logCall('initLogoFallbacks');
  const logoImages = document.querySelectorAll('img.operator-logo');
  logoImages.forEach((img) => {
    img.addEventListener('error', () => {
      const wrapper = img.closest('.logo-wrapper');
      if (wrapper) {
        wrapper.classList.add('logo-fallback-active');
      }
    });
  });
}

/**
 * Bootstraps all frontend modules for the Braga Mobility portal.
 *
 * @returns {void}
 */
export function bootstrapApp() {
  logCall('bootstrapApp');
  initI18n();
  initLogoFallbacks();
  initAccordions();

  initSearch({
    getActiveSection: () => {
      const view = getActiveView();
      return view === 'around' ? 'around' : 'arrive';
    },
    onSwitchSection: (targetSection) => {
      showSection(targetSection, true);
    }
  });

  initNavigation({
    onViewChanged: (viewId) => {
      if (viewId === 'home') {
        clearServiceSearch(false);
      } else {
        applyServiceSearch();
      }
    }
  });

  initPrivacyModal();
  initLoader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
