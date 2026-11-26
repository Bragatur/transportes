/**
 * Feature: Quick Mobility Guide Modal (Airport, TUB Tickets, Walking & Tolls)
 *
 * Manages the accessible "Guia Rápido" modal dialog containing the most
 * frequently asked practical mobility tips at the Braga Tourist Office:
 * Porto Airport <-> Braga routes, how to pay for TUB urban buses, walking
 * distances in the pedestrian historic center, highway tolls, and offline-ready
 * essential phone numbers.
 *
 * Use cases:
 * - Giving first-time visitors a concise, offline-capable cheat sheet.
 * - Opening via the top utility bar "Guia Rápido" button.
 * - Closing via close button, backdrop click, or Escape key with focus restoration.
 */

import { logCall } from './logger.js';

let previouslyFocusedEl = null;

/**
 * Opens the Quick Mobility Guide modal and focuses its primary close button.
 *
 * @param {HTMLElement} modal - The guide modal overlay element.
 * @param {HTMLElement | null} closeBtn - Close button to receive focus.
 * @returns {void}
 */
export function openGuideModal(modal, closeBtn) {
  logCall('openGuideModal');
  previouslyFocusedEl = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Closes the Quick Mobility Guide modal and restores previous keyboard focus.
 *
 * @param {HTMLElement} modal - The guide modal overlay element.
 * @returns {void}
 */
export function closeGuideModal(modal) {
  logCall('closeGuideModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (previouslyFocusedEl && typeof previouslyFocusedEl.focus === 'function') {
    previouslyFocusedEl.focus();
  }
}

/**
 * Wires up open/close listeners for the Quick Mobility Guide modal.
 *
 * @returns {void}
 */
export function initGuideModal() {
  logCall('initGuideModal');
  const openBtn = document.getElementById('quick-guide-btn');
  const modal = document.getElementById('guide-modal');
  const closeBtn = document.getElementById('close-guide-modal');

  if (!openBtn || !modal || !closeBtn) {
    return;
  }

  openBtn.addEventListener('click', () => {
    openGuideModal(modal, closeBtn);
  });

  closeBtn.addEventListener('click', () => {
    closeGuideModal(modal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeGuideModal(modal);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeGuideModal(modal);
    }
  });
}
