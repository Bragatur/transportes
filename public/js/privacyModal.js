/**
 * Feature: Accessible Privacy & Legal Notice Modal
 *
 * Manages opening and closing the municipal GDPR & Legal Notice modal dialog.
 * Supports backdrop click dismissal, Escape key dismissal, scroll locking,
 * ARIA dialog state updates, and restoring keyboard focus to the trigger link
 * upon closing.
 *
 * Use cases:
 * - Opening the Privacy Policy dialog from the footer link.
 * - Closing the dialog via the primary button, clicking outside, or pressing Esc.
 * - Keeping background page scroll locked while reading the policy.
 */

import { logCall } from './logger.js';

let previouslyFocusedElement = null;

/**
 * Opens the privacy modal and moves focus into the dialog.
 *
 * @param {HTMLElement} modal - The modal overlay element.
 * @param {HTMLElement | null} closeBtn - The dialog close button to focus.
 * @returns {void}
 */
export function openPrivacyModal(modal, closeBtn) {
  logCall('openPrivacyModal');
  previouslyFocusedElement = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Closes the privacy modal, unlocks scrolling, and restores previous focus.
 *
 * @param {HTMLElement} modal - The modal overlay element.
 * @returns {void}
 */
export function closePrivacyModal(modal) {
  logCall('closePrivacyModal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
    previouslyFocusedElement.focus();
  }
}

/**
 * Initializes event listeners for opening and closing the privacy policy modal.
 *
 * @returns {void}
 */
export function initPrivacyModal() {
  logCall('initPrivacyModal');
  const privacyLink = document.getElementById('footer-privacy');
  const privacyModal = document.getElementById('privacy-modal');
  const closeBtn = document.getElementById('close-privacy-modal');

  if (!privacyLink || !privacyModal || !closeBtn) {
    return;
  }

  privacyLink.addEventListener('click', (event) => {
    event.preventDefault();
    openPrivacyModal(privacyModal, closeBtn);
  });

  closeBtn.addEventListener('click', () => {
    closePrivacyModal(privacyModal);
  });

  privacyModal.addEventListener('click', (event) => {
    if (event.target === privacyModal) {
      closePrivacyModal(privacyModal);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && privacyModal.classList.contains('active')) {
      closePrivacyModal(privacyModal);
    }
  });
}
