/**
 * Feature: Favorite TUB Bus Stops Persistence & Top Quick-Access Bar
 *
 * Allows visitors and daily Braga commuters to star/unstar any TUB bus stop
 * inside the "Horários TUB em Tempo Real" section and persist their frequent
 * stops locally in `localStorage`. Saved favorite stops appear in a dedicated
 * quick-access strip at the top of the TUB panel so live departures can be
 * checked in a single tap.
 *
 * Security & Resilience:
 * - Strictly validates every stop record loaded from `localStorage` against
 *   the Braga TUB stopId format before rendering.
 * - Renders all stop names via `document.createElement` and `textContent`
 *   (zero `innerHTML` interpolation).
 * - Gracefully handles restricted/private browsing modes where `localStorage`
 *   may throw.
 *
 * Use cases:
 * - Starring the user's hotel stop, Av. Central, or CP Station for 1-tap access.
 * - Toggling favorites directly from the selected stop bar or stop search/GPS results.
 * - Removing an outdated favorite directly from the top quick-access strip.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

const TUB_STOP_ID_PATTERN = /^pt-Transportes-Urbanos-de-Braga_[A-Za-z0-9_-]{1,32}$/;

/**
 * Validates a candidate favorite stop record.
 *
 * @param {unknown} entry - Candidate stop object.
 * @returns {boolean} True when entry has a valid Braga TUB stopId and display name.
 */
export function isValidFavoriteStopRecord(entry) {
  if (!entry || typeof entry !== 'object') return false;
  const stopId = typeof entry.stopId === 'string' ? entry.stopId.trim() : '';
  const name = typeof entry.name === 'string' ? entry.name.trim() : '';
  return TUB_STOP_ID_PATTERN.test(stopId) && name.length >= 1 && name.length <= 80;
}

/**
 * Deduplicates, validates, and caps a list of favorite TUB stop records.
 *
 * @param {unknown} list - Candidate array of favorite stop entries.
 * @param {number} [maxItems=APP_CONFIG.tubLive.maxFavoriteStops] - Maximum stored favorites.
 * @returns {Array<{ stopId: string, name: string }>} Clean normalized list.
 */
export function normalizeFavoriteStopsList(list, maxItems = APP_CONFIG.tubLive.maxFavoriteStops) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const normalized = [];

  for (const item of list) {
    if (!isValidFavoriteStopRecord(item)) continue;
    const stopId = item.stopId.trim();
    const name = item.name.trim();
    if (seen.has(stopId)) continue;
    seen.add(stopId);
    normalized.push({ stopId, name });
    if (normalized.length >= maxItems) break;
  }

  return normalized;
}

/**
 * Loads saved favorite TUB bus stops from `localStorage`.
 *
 * @returns {Array<{ stopId: string, name: string }>} Validated favorite stops list.
 */
export function loadFavoriteStops() {
  logCall('loadFavoriteStops');
  try {
    const raw = window.localStorage.getItem(APP_CONFIG.storageKeys.favoriteTubStops);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeFavoriteStopsList(parsed);
  } catch (error) {
    console.warn('[BragaMobility] Unable to read favorite TUB stops:', error);
    return [];
  }
}

/**
 * Persists a validated list of favorite TUB bus stops into `localStorage`.
 *
 * @param {Array<{ stopId: string, name: string }>} stops - Stops to persist.
 * @returns {Array<{ stopId: string, name: string }>} Normalized persisted list.
 */
export function saveFavoriteStops(stops) {
  const clean = normalizeFavoriteStopsList(stops);
  logCall('saveFavoriteStops', { count: clean.length });
  try {
    window.localStorage.setItem(APP_CONFIG.storageKeys.favoriteTubStops, JSON.stringify(clean));
  } catch (error) {
    console.warn('[BragaMobility] Unable to save favorite TUB stops:', error);
  }
  return clean;
}

/**
 * Checks whether a given TUB stopId is currently saved as a favorite.
 *
 * @param {string} stopId - Candidate TUB stopId.
 * @returns {boolean} True when stop is favorited.
 */
export function isFavoriteStop(stopId) {
  if (!stopId) return false;
  return loadFavoriteStops().some((item) => item.stopId === stopId);
}

/**
 * Toggles a TUB stop in the user's favorites list (adds to front or removes if present).
 *
 * @param {{ stopId: string, name: string }} stop - Target TUB stop.
 * @returns {{ favorited: boolean, favorites: Array<{ stopId: string, name: string }> }} Updated state.
 */
export function toggleFavoriteStop(stop) {
  logCall('toggleFavoriteStop', { stopId: stop?.stopId });
  const existing = loadFavoriteStops();
  if (!isValidFavoriteStopRecord(stop)) {
    return { favorited: false, favorites: existing };
  }

  const stopId = stop.stopId.trim();
  const name = stop.name.trim();
  const alreadySaved = existing.some((item) => item.stopId === stopId);

  if (alreadySaved) {
    const updated = saveFavoriteStops(existing.filter((item) => item.stopId !== stopId));
    return { favorited: false, favorites: updated };
  }

  const updated = saveFavoriteStops([{ stopId, name }, ...existing]);
  return { favorited: true, favorites: updated };
}

/**
 * Removes a TUB stop from the user's favorites list by stopId.
 *
 * @param {string} stopId - Stop identifier to remove.
 * @returns {Array<{ stopId: string, name: string }>} Updated favorites list.
 */
export function removeFavoriteStop(stopId) {
  logCall('removeFavoriteStop', { stopId });
  const existing = loadFavoriteStops();
  return saveFavoriteStops(existing.filter((item) => item.stopId !== stopId));
}

/**
 * Renders the top quick-access favorite TUB stops strip safely via DOM nodes.
 * Hides the strip automatically when no favorites are stored.
 *
 * @param {object} options - Rendering parameters.
 * @param {HTMLElement | null} options.section - Outer favorites wrapper element.
 * @param {HTMLElement | null} options.container - Chips container element.
 * @param {string} options.selectedStopId - Currently selected stop ID.
 * @param {Record<string, string>} options.dict - Active language dictionary.
 * @param {(stopId: string, stopName: string) => void} options.onSelectStop - Called when a favorite chip is clicked.
 * @param {() => void} [options.onFavoritesChanged] - Called after removing a favorite from the bar.
 * @returns {void}
 */
export function renderFavoriteStopsBar({
  section,
  container,
  selectedStopId,
  dict,
  onSelectStop,
  onFavoritesChanged
}) {
  if (!section || !container) return;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const favorites = loadFavoriteStops();
  if (favorites.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'flex';

  for (const fav of favorites) {
    const chipWrap = document.createElement('div');
    chipWrap.className = 'tub-fav-chip';
    const isSelected = fav.stopId === selectedStopId;
    if (isSelected) {
      chipWrap.classList.add('active');
    }

    const selectBtn = document.createElement('button');
    selectBtn.type = 'button';
    selectBtn.className = 'tub-fav-chip-main';
    selectBtn.setAttribute('aria-pressed', String(isSelected));

    const starIcon = document.createElement('i');
    starIcon.className = 'fa-solid fa-star';
    starIcon.setAttribute('aria-hidden', 'true');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = fav.name;

    selectBtn.appendChild(starIcon);
    selectBtn.appendChild(nameSpan);
    selectBtn.addEventListener('click', () => {
      if (typeof onSelectStop === 'function') {
        onSelectStop(fav.stopId, fav.name);
      }
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'tub-fav-chip-remove';
    const removeLabel = (dict.tubFavRemoveAria || 'Remover dos favoritos').replace('{name}', fav.name);
    removeBtn.setAttribute('aria-label', removeLabel);
    removeBtn.title = removeLabel;

    const closeIcon = document.createElement('i');
    closeIcon.className = 'fa-solid fa-xmark';
    closeIcon.setAttribute('aria-hidden', 'true');
    removeBtn.appendChild(closeIcon);

    removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      removeFavoriteStop(fav.stopId);
      if (typeof onFavoritesChanged === 'function') {
        onFavoritesChanged();
      }
    });

    chipWrap.appendChild(selectBtn);
    chipWrap.appendChild(removeBtn);
    container.appendChild(chipWrap);
  }
}
