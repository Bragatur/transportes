/**
 * Feature: Progressive Web App (PWA) Installation & Offline Connectivity Manager
 *
 * Handles registering the root Service Worker (`/sw.js`), capturing Chromium's
 * `beforeinstallprompt` event for one-tap installation, detecting iOS Safari
 * to display guided Home Screen installation instructions, automatically hiding
 * install controls when running in standalone mode, and surfacing a subtle
 * connectivity banner whenever the device goes offline.
 *
 * Use cases:
 * - Allowing tourists to install "Braga Mov" onto Android, iOS, or desktop home screens.
 * - Keeping the Quick Mobility Guide, TUB line tips, and Tourist Office contacts usable offline.
 * - Providing clear feedback when offline so users know cached information is active.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

let deferredPromptEvent = null;
let previousIosFocus = null;

/**
 * Checks whether the application is currently running as an installed standalone PWA.
 *
 * @returns {boolean} True when launched in standalone display mode.
 */
export function isRunningStandalone() {
  const standaloneMedia = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const iosStandalone = window.navigator.standalone === true;
  return Boolean(standaloneMedia || iosStandalone);
}

/**
 * Detects whether the current device runs iOS / iPadOS Safari.
 *
 * @returns {boolean} True on iPhone, iPad, or iPod user agents.
 */
export function isIOSDevice() {
  const ua = (window.navigator.userAgent || '').toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

/**
 * Updates visibility of the in-app offline banner based on `navigator.onLine`.
 *
 * @returns {void}
 */
export function updateConnectivityBanner() {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  logCall('updateConnectivityBanner', { isOnline });
  const banner = document.getElementById('offline-banner');
  if (!banner) return;
  banner.style.display = isOnline ? 'none' : 'flex';
}

/**
 * Opens the iOS Safari Add-to-Home-Screen instruction modal.
 *
 * @param {HTMLElement} modal - The iOS install guide overlay element.
 * @param {HTMLElement | null} closeBtn - Close button to focus.
 * @returns {void}
 */
function openIosInstallModal(modal, closeBtn) {
  logCall('openIosInstallModal');
  previousIosFocus = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Closes the iOS Safari installation guide modal.
 *
 * @param {HTMLElement} modal - The iOS install guide overlay element.
 * @returns {void}
 */
function closeIosInstallModal(modal) {
  logCall('closeIosInstallModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (previousIosFocus && typeof previousIosFocus.focus === 'function') {
    previousIosFocus.focus();
  }
}

/**
 * Registers the root service worker if supported by the browser.
 *
 * @returns {void}
 */
export function registerServiceWorker() {
  logCall('registerServiceWorker', { swPath: APP_CONFIG.pwa.serviceWorkerUrl });
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(APP_CONFIG.pwa.serviceWorkerUrl)
      .then((registration) => {
        registration.update().catch(() => {});
      })
      .catch((error) => {
        console.warn('[BragaMobility] Service worker registration skipped:', error);
      });
  });
}

/**
 * Initializes PWA installation prompt handling, iOS fallback modal, and offline indicator.
 *
 * @returns {void}
 */
export function initPwa() {
  logCall('initPwa');
  registerServiceWorker();

  const installBtn = document.getElementById('pwa-install-btn');
  const iosModal = document.getElementById('ios-install-modal');
  const iosCloseBtn = document.getElementById('close-ios-modal');

  const hideInstallButton = () => {
    if (installBtn) installBtn.style.display = 'none';
  };

  const showInstallButton = () => {
    if (installBtn && !isRunningStandalone()) {
      installBtn.style.display = 'inline-flex';
    }
  };

  // Hide install button if already installed
  if (isRunningStandalone()) {
    hideInstallButton();
  } else if (isIOSDevice()) {
    // iOS Safari does not emit beforeinstallprompt; show guided install button directly
    showInstallButton();
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPromptEvent = event;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    logCall('onAppInstalled');
    deferredPromptEvent = null;
    hideInstallButton();
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      logCall('onInstallButtonClick', { hasPrompt: Boolean(deferredPromptEvent), isIOS: isIOSDevice() });
      if (deferredPromptEvent) {
        deferredPromptEvent.prompt();
        const choice = await deferredPromptEvent.userChoice;
        if (choice && choice.outcome === 'accepted') {
          hideInstallButton();
        }
        deferredPromptEvent = null;
      } else if (iosModal) {
        openIosInstallModal(iosModal, iosCloseBtn);
      }
    });
  }

  if (iosModal && iosCloseBtn) {
    iosCloseBtn.addEventListener('click', () => closeIosInstallModal(iosModal));
    iosModal.addEventListener('click', (event) => {
      if (event.target === iosModal) {
        closeIosInstallModal(iosModal);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && iosModal.classList.contains('active')) {
        closeIosInstallModal(iosModal);
      }
    });
  }

  // Offline / Online connectivity indicator
  window.addEventListener('online', updateConnectivityBanner);
  window.addEventListener('offline', updateConnectivityBanner);
  updateConnectivityBanner();
}
