/**
 * Feature: Smooth Section Navigation, Segmented Tabs & Browser History Integration
 *
 * Controls transitions between the landing menu ("home") and the two mobility
 * categories ("arrive" -> Viajar para Braga, "around" -> Na Cidade). Supports:
 * - Compact header state inside sections for above-the-fold mobile ergonomics.
 * - Direct switching between "Viajar para Braga" and "Na Cidade" via top segmented tabs.
 * - Clickable Visit Braga brand mark to return home from any section.
 * - Browser Back/Forward synchronization via URL hash fragments (#viajar, #cidade).
 * - Preserving or re-applying live search filters when switching tabs.
 *
 * Use cases:
 * - Entering a section from the home screen with a smooth compositor fade.
 * - Switching directly between "Viajar para Braga" and "Na Cidade" in one tap.
 * - Using the mobile browser Back gesture or clicking the Visit Braga logo to return home.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

let activeView = 'home';
let transitionTimer = null;
let onViewChangedCallback = null;

/**
 * Returns the currently active view identifier ('home', 'arrive', or 'around').
 *
 * @returns {'home' | 'arrive' | 'around'} Active view identifier.
 */
export function getActiveView() {
  return activeView;
}

/**
 * Resolves a URL hash string into one of the application's view identifiers.
 *
 * @param {string} hash - Current window.location.hash value.
 * @returns {'home' | 'arrive' | 'around'} Matched view identifier.
 */
export function resolveViewFromHash(hash) {
  logCall('resolveViewFromHash', { hash });
  const normalized = (hash || '').toLowerCase();
  if (normalized === APP_CONFIG.routes.arrive) {
    return 'arrive';
  }
  if (normalized === APP_CONFIG.routes.around) {
    return 'around';
  }
  return 'home';
}

/**
 * Checks whether the user prefers reduced motion via OS/browser media query.
 *
 * @returns {boolean} True when reduced motion is enabled.
 */
function prefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/**
 * Synchronizes active/selected state on the segmented section tabs.
 *
 * @param {'home' | 'arrive' | 'around'} viewId - Current active view.
 * @returns {void}
 */
function updateTabState(viewId) {
  const tabArrive = document.getElementById('tab-arrive');
  const tabAround = document.getElementById('tab-around');

  if (tabArrive) {
    const isArrive = viewId === 'arrive';
    tabArrive.classList.toggle('active', isArrive);
    tabArrive.setAttribute('aria-selected', String(isArrive));
  }

  if (tabAround) {
    const isAround = viewId === 'around';
    tabAround.classList.toggle('active', isAround);
    tabAround.setAttribute('aria-selected', String(isAround));
  }
}

/**
 * Applies DOM visibility for the target view with an optional smooth fade transition.
 *
 * @param {'home' | 'arrive' | 'around'} viewId - Target view to display.
 * @param {boolean} [animate=true] - Whether to animate the view switch.
 * @returns {void}
 */
function renderView(viewId, animate = true) {
  logCall('renderView', { viewId, animate });
  const mainEl = document.querySelector('main');
  const stage = document.getElementById('view-stage');
  const homeMenu = document.getElementById('home-menu');
  const sectionToolbar = document.getElementById('section-toolbar');
  const searchBarWrap = document.getElementById('search-bar-wrap');
  const sectionArrive = document.getElementById('section-arrive');
  const sectionAround = document.getElementById('section-around');

  if (!homeMenu || !sectionToolbar || !sectionArrive || !sectionAround) {
    return;
  }

  const applySwap = () => {
    const isHome = viewId === 'home';

    if (mainEl) {
      mainEl.classList.toggle('in-section', !isHome);
    }

    homeMenu.style.display = isHome ? 'flex' : 'none';
    sectionToolbar.style.display = isHome ? 'none' : 'flex';
    if (searchBarWrap) {
      searchBarWrap.style.display = isHome ? 'none' : 'block';
    }
    sectionArrive.style.display = viewId === 'arrive' ? 'block' : 'none';
    sectionAround.style.display = viewId === 'around' ? 'block' : 'none';

    activeView = viewId;
    updateTabState(viewId);

    if (onViewChangedCallback) {
      onViewChangedCallback(viewId);
    }

    if (stage) {
      stage.classList.remove('view-leaving');
      stage.classList.add('view-entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stage.classList.remove('view-entering');
        });
      });
    }
  };

  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }

  if (!animate || !stage || prefersReducedMotion()) {
    applySwap();
    return;
  }

  stage.classList.add('view-leaving');
  transitionTimer = setTimeout(() => {
    applySwap();
    transitionTimer = null;
  }, APP_CONFIG.viewTransitionMs);
}

/**
 * Navigates to one of the main sections and updates the browser history hash.
 *
 * @param {'arrive' | 'around'} sectionId - Target section identifier.
 * @param {boolean} [pushHistory=true] - Whether to push a new history state.
 * @returns {void}
 */
export function showSection(sectionId, pushHistory = true) {
  logCall('showSection', { sectionId, pushHistory });
  if (sectionId !== 'arrive' && sectionId !== 'around') {
    return;
  }

  if (pushHistory) {
    const targetHash = APP_CONFIG.routes[sectionId];
    if (window.location.hash !== targetHash) {
      history.pushState({ view: sectionId }, '', targetHash);
    }
  }

  renderView(sectionId, activeView !== sectionId);
}

/**
 * Returns to the home landing menu and updates the browser history state.
 *
 * @param {boolean} [pushHistory=true] - Whether to push a clean home history state.
 * @returns {void}
 */
export function showHome(pushHistory = true) {
  logCall('showHome', { pushHistory });
  if (pushHistory && window.location.hash) {
    history.pushState({ view: 'home' }, '', window.location.pathname + window.location.search);
  }

  renderView('home', activeView !== 'home');
}

/**
 * Wires up home buttons, segmented tabs, clickable brand mark, and browser popstate events.
 *
 * @param {object} [options={}] - Optional lifecycle callbacks.
 * @param {(viewId: 'home' | 'arrive' | 'around') => void} [options.onViewChanged] - Invoked after view swap.
 * @returns {void}
 */
export function initNavigation({ onViewChanged } = {}) {
  logCall('initNavigation');
  onViewChangedCallback = onViewChanged || null;

  const arriveBtn = document.getElementById('home-btn-arrive');
  const aroundBtn = document.getElementById('home-btn-around');
  const tabArrive = document.getElementById('tab-arrive');
  const tabAround = document.getElementById('tab-around');
  const backBtn = document.getElementById('btn-back');
  const brandHomeBtn = document.getElementById('brand-home-btn');

  if (arriveBtn) {
    arriveBtn.addEventListener('click', () => showSection('arrive', true));
  }
  if (aroundBtn) {
    aroundBtn.addEventListener('click', () => showSection('around', true));
  }
  if (tabArrive) {
    tabArrive.addEventListener('click', () => showSection('arrive', true));
  }
  if (tabAround) {
    tabAround.addEventListener('click', () => showSection('around', true));
  }
  if (backBtn) {
    backBtn.addEventListener('click', () => showHome(true));
  }
  if (brandHomeBtn) {
    brandHomeBtn.addEventListener('click', () => {
      if (activeView !== 'home') {
        showHome(true);
      }
    });
  }

  window.addEventListener('popstate', () => {
    const targetView = resolveViewFromHash(window.location.hash);
    if (targetView === 'home') {
      showHome(false);
    } else {
      showSection(targetView, false);
    }
  });

  const initialView = resolveViewFromHash(window.location.hash);
  renderView(initialView, false);
}
