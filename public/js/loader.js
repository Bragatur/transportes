/**
 * Feature: Resilient Page Preloader & Background Reveal
 *
 * Coordinates the initial branded splash loader and waits for the full-bleed
 * Braga background photograph to finish loading before revealing the interface.
 * Includes error handling (`onerror`) and a configurable safety timeout so the
 * visitor is never stuck behind the loader on slow or interrupted networks.
 *
 * Use cases:
 * - Instant reveal when the hero background image is cached.
 * - Smooth fade-out once the background photograph finishes downloading.
 * - Graceful fallback reveal if the image fails to load or exceeds timeout.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

/**
 * Dismisses the splash loader cleanly once and triggers the page reveal class.
 *
 * @param {string} reason - Trigger reason ('onload', 'cached', 'onerror', or 'timeout').
 * @returns {void}
 */
export function revealPage(reason) {
  logCall('revealPage', { reason });
  const loader = document.getElementById('loader-wrapper');
  if (!loader || loader.dataset.dismissed === 'true') {
    return;
  }

  loader.dataset.dismissed = 'true';
  loader.classList.add('hidden');
  document.body.classList.add('show');

  setTimeout(() => {
    loader.style.display = 'none';
  }, APP_CONFIG.loader.fadeDurationMs);
}

/**
 * Preloads the background image with onload, onerror, and safety timeout guards.
 *
 * @returns {void}
 */
export function initLoader() {
  logCall('initLoader', {
    backgroundImageUrl: APP_CONFIG.loader.backgroundImageUrl,
    fallbackTimeoutMs: APP_CONFIG.loader.fallbackTimeoutMs
  });

  const bgImg = new Image();
  let settled = false;

  const finish = (reason) => {
    if (settled) return;
    settled = true;
    clearTimeout(safetyTimer);
    revealPage(reason);
  };

  const safetyTimer = setTimeout(() => {
    finish('timeout');
  }, APP_CONFIG.loader.fallbackTimeoutMs);

  bgImg.onload = () => finish('onload');
  bgImg.onerror = () => finish('onerror');
  bgImg.src = APP_CONFIG.loader.backgroundImageUrl;

  if (bgImg.complete) {
    finish('cached');
  }
}
