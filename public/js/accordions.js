/**
 * Feature: Exclusive Accordion Manager & Inline Service Counts
 *
 * Manages the category accordions inside "Viajar para Braga" and "Na Cidade".
 * Keeps navigation predictable by closing sibling accordions when the user
 * expands a new category (outside of active search filtering) and renders
 * clean, unboxed inline item counts (e.g., "· 6") next to each category title
 * so visitors can gauge the number of options at a glance.
 *
 * Use cases:
 * - Preventing layout jumps by keeping one category expanded at a time.
 * - Displaying real-time counts of visible services per accordion category.
 * - Restoring default open state (first accordion open) after clearing a search.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

let searchActive = false;

/**
 * Sets whether live search mode is active (disables exclusive auto-collapse while searching).
 *
 * @param {boolean} isActive - True when a non-empty search filter is applied.
 * @returns {void}
 */
export function setAccordionSearchMode(isActive) {
  logCall('setAccordionSearchMode', { isActive });
  searchActive = Boolean(isActive);
}

/**
 * Updates the unboxed inline count label ("· N") on every accordion summary
 * based on currently visible service cards.
 *
 * @returns {void}
 */
export function updateAccordionCounts() {
  logCall('updateAccordionCounts');
  const accordions = document.querySelectorAll('details.service-accordion');
  accordions.forEach((accordion) => {
    const visibleCards = accordion.querySelectorAll('.card:not(.is-hidden)').length;
    const countEl = accordion.querySelector('.accordion-count');
    if (countEl) {
      countEl.textContent = `· ${visibleCards}`;
    }
  });
}

/**
 * Restores the clean default accordion state inside a section (first category open).
 *
 * @param {string} sectionElementId - DOM id of the section container.
 * @returns {void}
 */
export function resetSectionAccordions(sectionElementId) {
  logCall('resetSectionAccordions', { sectionElementId });
  const section = document.getElementById(sectionElementId);
  if (!section) return;

  const accordions = section.querySelectorAll('details.service-accordion');
  accordions.forEach((accordion, index) => {
    accordion.classList.remove('is-hidden');
    accordion.open = index === 0;
  });
  updateAccordionCounts();
}

/**
 * Initializes exclusive accordion toggle listeners and initial inline counts.
 *
 * @returns {void}
 */
export function initAccordions() {
  logCall('initAccordions', { exclusiveMode: APP_CONFIG.accordions.exclusiveMode });
  const groups = document.querySelectorAll('.accordion-group');

  groups.forEach((group) => {
    const accordions = Array.from(group.querySelectorAll('details.service-accordion'));

    accordions.forEach((accordion) => {
      accordion.addEventListener('toggle', () => {
        if (!APP_CONFIG.accordions.exclusiveMode || searchActive || !accordion.open) {
          return;
        }
        accordions.forEach((sibling) => {
          if (sibling !== accordion && sibling.open) {
            sibling.open = false;
          }
        });
      });
    });
  });

  updateAccordionCounts();
}
