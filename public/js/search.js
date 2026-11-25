/**
 * Feature: Instant Multilingual Service Search & Cross-Section Discovery
 *
 * Enables visitors to quickly filter mobility services by name, subtitle,
 * category heading, or multilingual keywords (e.g. "portagens", "tolls",
 * "airport", "bom jesus", "taxi", "ev"). Performs accent-insensitive matching,
 * automatically expands categories with matching cards, updates visible counts,
 * and shows a helpful cross-section switch prompt if matches exist in the other
 * tab ("Viajar para Braga" vs "Na Cidade").
 *
 * Use cases:
 * - Typing "bom jesus" or "portagens" to jump straight to the right service card.
 * - Handling diacritics gracefully (e.g. "aviao" matches "Avião", "taxis" matches "Táxis").
 * - Offering a one-click jump to the opposite section when results are located there.
 */

import { logCall } from './logger.js';
import { setAccordionSearchMode, updateAccordionCounts, resetSectionAccordions } from './accordions.js';

let onSwitchSectionCallback = null;
let currentSectionProvider = () => 'arrive';

/**
 * Normalizes a string to lowercase without diacritical marks for tolerant search matching.
 *
 * @param {string} text - Input string to normalize.
 * @returns {string} Accent-stripped lowercase trimmed string.
 */
export function normalizeSearchText(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Counts how many cards inside a given section match a normalized query.
 *
 * @param {string} sectionId - Section key ('arrive' or 'around').
 * @param {string} normalizedQuery - Normalized search query string.
 * @returns {number} Number of matching service cards in that section.
 */
function countMatchesInSection(sectionId, normalizedQuery) {
  const section = document.getElementById(`section-${sectionId}`);
  if (!section) return 0;

  let count = 0;
  const accordions = section.querySelectorAll('details.service-accordion');
  accordions.forEach((accordion) => {
    const headingText = normalizeSearchText(accordion.querySelector('.summary-left')?.textContent || '');
    const cards = accordion.querySelectorAll('a.card');
    cards.forEach((card) => {
      const searchable = normalizeSearchText(
        `${headingText} ${card.textContent || ''} ${card.dataset.keywords || ''}`
      );
      if (searchable.includes(normalizedQuery)) {
        count += 1;
      }
    });
  });

  return count;
}

/**
 * Applies the current search input value to the active section's accordions and cards.
 *
 * @returns {void}
 */
export function applyServiceSearch() {
  const input = document.getElementById('service-search');
  const clearBtn = document.getElementById('search-clear-btn');
  const emptyState = document.getElementById('search-empty-state');
  const switchHint = document.getElementById('search-switch-hint');

  if (!input) return;

  const rawQuery = input.value;
  const query = normalizeSearchText(rawQuery);
  const activeSectionId = currentSectionProvider();
  const sectionEl = document.getElementById(`section-${activeSectionId}`);

  logCall('applyServiceSearch', { query, activeSectionId });

  if (clearBtn) {
    clearBtn.style.display = rawQuery.length > 0 ? 'flex' : 'none';
  }

  if (!sectionEl) return;

  if (!query) {
    setAccordionSearchMode(false);
    const allCards = document.querySelectorAll('a.card.is-hidden');
    allCards.forEach((card) => card.classList.remove('is-hidden'));
    resetSectionAccordions(`section-${activeSectionId}`);
    if (emptyState) emptyState.style.display = 'none';
    if (switchHint) switchHint.style.display = 'none';
    return;
  }

  setAccordionSearchMode(true);

  let totalMatches = 0;
  const accordions = sectionEl.querySelectorAll('details.service-accordion');

  accordions.forEach((accordion) => {
    const headingText = normalizeSearchText(accordion.querySelector('.summary-left')?.textContent || '');
    const cards = accordion.querySelectorAll('a.card');
    let accordionMatches = 0;

    cards.forEach((card) => {
      const searchable = normalizeSearchText(
        `${headingText} ${card.textContent || ''} ${card.dataset.keywords || ''}`
      );
      const isMatch = searchable.includes(query);
      card.classList.toggle('is-hidden', !isMatch);
      if (isMatch) accordionMatches += 1;
    });

    const hasMatches = accordionMatches > 0;
    accordion.classList.toggle('is-hidden', !hasMatches);
    accordion.open = hasMatches;
    totalMatches += accordionMatches;
  });

  updateAccordionCounts();

  if (emptyState) {
    emptyState.style.display = totalMatches === 0 ? 'flex' : 'none';
  }

  if (switchHint) {
    if (totalMatches === 0) {
      const otherSectionId = activeSectionId === 'arrive' ? 'around' : 'arrive';
      const otherMatches = countMatchesInSection(otherSectionId, query);
      switchHint.style.display = otherMatches > 0 ? 'inline-flex' : 'none';
      switchHint.dataset.targetSection = otherSectionId;
    } else {
      switchHint.style.display = 'none';
    }
  }
}

/**
 * Clears the search input and restores the default accordion state.
 *
 * @param {boolean} [focusInput=false] - Whether to return focus to the search box.
 * @returns {void}
 */
export function clearServiceSearch(focusInput = false) {
  logCall('clearServiceSearch', { focusInput });
  const input = document.getElementById('service-search');
  if (!input) return;

  input.value = '';
  applyServiceSearch();
  if (focusInput) {
    input.focus();
  }
}

/**
 * Initializes event listeners for real-time search, clear button, and cross-section hint.
 *
 * @param {object} options - Integration callbacks with the navigation module.
 * @param {() => string} options.getActiveSection - Returns 'arrive' or 'around'.
 * @param {(sectionId: 'arrive' | 'around') => void} options.onSwitchSection - Switches to the other tab.
 * @returns {void}
 */
export function initSearch({ getActiveSection, onSwitchSection }) {
  logCall('initSearch');
  currentSectionProvider = getActiveSection;
  onSwitchSectionCallback = onSwitchSection;

  const input = document.getElementById('service-search');
  const clearBtn = document.getElementById('search-clear-btn');
  const switchHint = document.getElementById('search-switch-hint');

  if (input) {
    input.addEventListener('input', () => {
      applyServiceSearch();
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && input.value.length > 0) {
        event.stopPropagation();
        clearServiceSearch(true);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearServiceSearch(true);
    });
  }

  if (switchHint) {
    switchHint.addEventListener('click', () => {
      const target = switchHint.dataset.targetSection;
      if ((target === 'arrive' || target === 'around') && onSwitchSectionCallback) {
        onSwitchSectionCallback(target);
      }
    });
  }
}
