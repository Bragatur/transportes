/**
 * Feature: Inline Real-Time TUB Urban Bus Schedules ("Na Cidade")
 *
 * Powers the interactive "Horários TUB em Tempo Real" panel embedded directly
 * inside the "Na Cidade" (`#section-around`) tab (`#tub-live-accordion`) and
 * reachable in one tap from the Home landing shortcut (`#home-tub-live-btn`).
 *
 * Backed by Braga's city mobility API (`/api/tub/*`), it allows visitors and
 * residents to:
 * - View upcoming live/scheduled TUB departures at key Braga stops (Av. Central,
 *   CP Train Station, Bus Terminal, Bom Jesus, Sameiro, U. Minho, Hospital).
 * - Search any TUB stop across Braga by name or locate the nearest stops via GPS.
 * - Filter departures by line number and expand any bus to inspect its full
 *   stop-by-stop schedule with exact Europe/Lisbon times.
 * - Browse all currently active TUB lines circulating in Braga right now.
 *
 * Lifecycle, Security & Accessibility:
 * - Automatically starts live loading and 30-second background polling when the
 *   user enters "Na Cidade" with `#tub-live-accordion` open, and pauses polling
 *   when leaving "Na Cidade" or collapsing the accordion.
 * - Renders all external API data strictly via `textContent` and DOM nodes (zero
 *   `innerHTML` interpolation on API payloads).
 *
 * Use cases:
 * - Checking when the next Line 2 bus leaves for Bom Jesus or Line 88 for Sameiro.
 * - Finding the closest TUB bus stop while walking in Braga.
 * - Verifying live departures, platform bays, delays, or full route stop sequences.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';
import { TRANSLATIONS } from './translations.js';
import {
  fetchFeaturedTubStops,
  searchTubStopsByName,
  fetchNearbyTubStops,
  fetchTubDepartures,
  fetchActiveTubLines,
  fetchTubTripSchedule
} from './tubApiClient.js';
import {
  initTubPlanner,
  refreshTubPlanner,
  rerenderTubPlannerLanguage
} from './tubPlanner.js';

const FALLBACK_FEATURED_STOPS = [
  { stopId: 'pt-Transportes-Urbanos-de-Braga_146', name: 'Central I (Av. Central)', tagKey: 'tubSpotCentral' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_144', name: 'Central III (Av. Central)', tagKey: 'tubSpotCentral3' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_17', name: 'Nova Estação I (CP)', tagKey: 'tubSpotTrain' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_1975', name: 'Norton Matos (C. Camionagem)', tagKey: 'tubSpotBusTerminal' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_1', name: 'Bom Jesus', tagKey: 'tubSpotBomJesus' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_1051', name: 'Santuário (Sameiro)', tagKey: 'tubSpotSameiro' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_370', name: 'Universidade do Minho II', tagKey: 'tubSpotUminho' },
  { stopId: 'pt-Transportes-Urbanos-de-Braga_2029', name: 'Hospital de Braga', tagKey: 'tubSpotHospital' }
];

const state = {
  isActive: false,
  activeTab: 'stops',
  featuredStops: [],
  selectedStopId: APP_CONFIG.tubLive.defaultStopId,
  selectedStopName: 'Central I (Av. Central)',
  selectedLineFilter: '',
  lastDeparturesPayload: null,
  activeLinesPayload: null,
  expandedTripId: null,
  selectedLineTrip: null,
  refreshTimer: null,
  searchDebounceTimer: null,
  activeRequestController: null,
  navigateToCityCallback: null
};

/**
 * Returns the active translation dictionary based on `<html lang>`.
 *
 * @returns {Record<string, string>} Current language dictionary.
 */
function getDict() {
  const lang = (document.documentElement.lang || APP_CONFIG.defaultLang).slice(0, 2);
  return TRANSLATIONS[lang] || TRANSLATIONS[APP_CONFIG.defaultLang];
}

/**
 * Safely clears all child nodes from a DOM container.
 *
 * @param {HTMLElement | null} el - Element to empty.
 * @returns {void}
 */
function clearElement(el) {
  if (!el) return;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * Checks whether the "Na Cidade" section is currently visible and the TUB accordion is open.
 *
 * @returns {boolean} True when the inline TUB schedule widget is visible to the user.
 */
function isWidgetVisible() {
  const sectionAround = document.getElementById('section-around');
  const accordion = document.getElementById('tub-live-accordion');
  if (!sectionAround || !accordion) return false;
  return sectionAround.style.display !== 'none' && accordion.open;
}

/**
 * Formats a countdown in minutes into a localized human-readable label.
 *
 * @param {number | null} minutesUntil - Minutes remaining until departure.
 * @param {Record<string, string>} dict - Active translation dictionary.
 * @returns {string} Localized countdown text.
 */
export function formatCountdownLabel(minutesUntil, dict) {
  if (minutesUntil === null || !Number.isFinite(minutesUntil)) {
    return '--';
  }
  if (minutesUntil <= 0) {
    return dict.tubNow;
  }
  if (minutesUntil < 60) {
    return dict.tubInMinutes.replace('{min}', String(minutesUntil));
  }
  const hours = Math.floor(minutesUntil / 60);
  const mins = minutesUntil % 60;
  return mins > 0 ? `${hours}h${String(mins).padStart(2, '0')}` : `${hours}h`;
}

/**
 * Renders a simple status or error message inside a container safely via textContent.
 *
 * @param {HTMLElement | null} container - Target container element.
 * @param {string} iconClass - Font Awesome class string.
 * @param {string} message - Plain text message to display.
 * @param {boolean} [isError=false] - Whether to apply subtle error tone.
 * @returns {void}
 */
function renderStatusMessage(container, iconClass, message, isError = false) {
  if (!container) return;
  clearElement(container);

  const box = document.createElement('div');
  box.className = isError ? 'tub-empty-state tub-empty-state--error' : 'tub-empty-state';

  const icon = document.createElement('i');
  icon.className = iconClass;
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = message;

  box.appendChild(icon);
  box.appendChild(text);
  container.appendChild(box);
}

/**
 * Renders the curated featured stop quick-select buttons.
 *
 * @returns {void}
 */
function renderFeaturedStops() {
  const container = document.getElementById('tub-featured-stops');
  if (!container) return;
  clearElement(container);

  const dict = getDict();
  const stops = state.featuredStops.length > 0 ? state.featuredStops : FALLBACK_FEATURED_STOPS;

  for (const stop of stops) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tub-stop-chip';
    if (stop.stopId === state.selectedStopId) {
      btn.classList.add('active');
    }
    btn.setAttribute('aria-pressed', String(stop.stopId === state.selectedStopId));
    btn.textContent = dict[stop.tagKey] || stop.name;
    btn.addEventListener('click', () => {
      selectStop(stop.stopId, stop.name);
    });
    container.appendChild(btn);
  }
}

/**
 * Renders the search / GPS nearby stop results list safely.
 *
 * @param {Array<object>} stops - Matching stops returned by `/api/tub/stops`.
 * @param {string} mode - Lookup mode (`search` | `nearby`).
 * @returns {void}
 */
function renderStopSearchResults(stops, mode) {
  const resultsEl = document.getElementById('tub-stop-results');
  if (!resultsEl) return;
  clearElement(resultsEl);

  const dict = getDict();

  if (!stops || stops.length === 0) {
    resultsEl.style.display = 'block';
    renderStatusMessage(resultsEl, 'fa-solid fa-magnifying-glass', dict.tubNoStopsFound);
    return;
  }

  resultsEl.style.display = 'block';
  const header = document.createElement('div');
  header.className = 'tub-results-header';
  header.textContent = mode === 'nearby' ? dict.tubNearbyResultsTitle : dict.tubSearchResultsTitle;
  resultsEl.appendChild(header);

  const list = document.createElement('div');
  list.className = 'tub-results-list';

  for (const stop of stops) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'tub-result-item';

    const left = document.createElement('span');
    left.className = 'tub-result-name';

    const pin = document.createElement('i');
    pin.className = 'fa-solid fa-location-dot';
    pin.setAttribute('aria-hidden', 'true');
    left.appendChild(pin);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = stop.name;
    left.appendChild(nameSpan);

    item.appendChild(left);

    if (typeof stop.distanceMeters === 'number') {
      const dist = document.createElement('span');
      dist.className = 'tub-result-dist';
      dist.textContent =
        stop.distanceMeters >= 1000
          ? `${(stop.distanceMeters / 1000).toFixed(1)} km`
          : `${stop.distanceMeters} m`;
      item.appendChild(dist);
    }

    item.addEventListener('click', () => {
      resultsEl.style.display = 'none';
      const searchInput = document.getElementById('tub-stop-search');
      if (searchInput) searchInput.value = '';
      selectStop(stop.stopId, stop.name);
    });

    list.appendChild(item);
  }

  resultsEl.appendChild(list);
}

/**
 * Renders the inline line-filter buttons for the currently selected stop.
 *
 * @param {Array<string>} availableLines - Distinct TUB lines serving the stop.
 * @returns {void}
 */
function renderLineFilters(availableLines) {
  const container = document.getElementById('tub-line-filters');
  if (!container) return;
  clearElement(container);

  if (!availableLines || availableLines.length <= 1) {
    container.style.display = 'none';
    return;
  }

  const dict = getDict();
  container.style.display = 'flex';

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = `tub-filter-btn${state.selectedLineFilter === '' ? ' active' : ''}`;
  allBtn.textContent = dict.tubAllLines;
  allBtn.addEventListener('click', () => {
    state.selectedLineFilter = '';
    loadDeparturesForSelectedStop(false);
  });
  container.appendChild(allBtn);

  for (const line of availableLines) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tub-filter-btn${state.selectedLineFilter === line ? ' active' : ''}`;
    btn.textContent = line;
    btn.addEventListener('click', () => {
      state.selectedLineFilter = state.selectedLineFilter === line ? '' : line;
      loadDeparturesForSelectedStop(false);
    });
    container.appendChild(btn);
  }
}

/**
 * Renders the expandable stop-by-stop itinerary timeline inside a container.
 *
 * @param {HTMLElement} container - Target DOM element for the timeline.
 * @param {object} schedule - Normalized response from `/api/tub/trip`.
 * @param {string} [highlightStopId=''] - Stop ID to highlight as current stop.
 * @returns {void}
 */
function renderTripStopsTimeline(container, schedule, highlightStopId = '') {
  clearElement(container);
  const dict = getDict();

  if (!schedule || !Array.isArray(schedule.stops) || schedule.stops.length === 0) {
    renderStatusMessage(container, 'fa-solid fa-circle-info', dict.tubNoItinerary);
    return;
  }

  const list = document.createElement('ol');
  list.className = 'tub-timeline';

  for (const stop of schedule.stops) {
    const li = document.createElement('li');
    li.className = 'tub-timeline-item';
    if (stop.passed) li.classList.add('is-passed');
    if (highlightStopId && stop.stopId === highlightStopId) li.classList.add('is-current');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tub-timeline-btn';
    btn.title = dict.tubViewStopHint;

    const timeEl = document.createElement('span');
    timeEl.className = 'tub-timeline-time';
    timeEl.textContent = stop.time;

    const dotEl = document.createElement('span');
    dotEl.className = 'tub-timeline-dot';
    dotEl.setAttribute('aria-hidden', 'true');

    const nameEl = document.createElement('span');
    nameEl.className = 'tub-timeline-name';
    nameEl.textContent = stop.name;

    btn.appendChild(timeEl);
    btn.appendChild(dotEl);
    btn.appendChild(nameEl);

    btn.addEventListener('click', () => {
      if (stop.stopId) {
        switchTubTab('stops');
        selectStop(stop.stopId, stop.name);
      }
    });

    li.appendChild(btn);
    list.appendChild(li);
  }

  container.appendChild(list);
}

/**
 * Renders the departures board for the selected TUB stop.
 *
 * @param {object} data - Response payload from `/api/tub/departures`.
 * @returns {void}
 */
function renderDeparturesBoard(data) {
  const dict = getDict();
  const stopNameEl = document.getElementById('tub-selected-stop-name');
  const stopGpsLink = document.getElementById('tub-selected-stop-gps');
  const clockEl = document.getElementById('tub-live-clock');
  const listEl = document.getElementById('tub-departures-list');

  const resolvedStopName = data.stopName || state.selectedStopName;
  if (stopNameEl) {
    stopNameEl.textContent = resolvedStopName;
  }

  if (clockEl && data.serverClock) {
    clockEl.textContent = data.serverClock;
  }

  if (stopGpsLink) {
    const lat = Number(data.lat);
    const lon = Number(data.lon);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      stopGpsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lon}`)}&travelmode=walking`;
      stopGpsLink.style.display = 'inline-flex';
    } else {
      stopGpsLink.style.display = 'none';
    }
  }

  renderLineFilters(data.availableLines || []);

  if (!listEl) return;
  clearElement(listEl);

  const departures = Array.isArray(data.departures) ? data.departures : [];
  if (departures.length === 0) {
    renderStatusMessage(listEl, 'fa-solid fa-clock', dict.tubNoDepartures);
    return;
  }

  for (const dep of departures) {
    const rowWrap = document.createElement('div');
    rowWrap.className = 'tub-departure-wrap';

    const rowBtn = document.createElement('button');
    rowBtn.type = 'button';
    rowBtn.className = 'tub-departure-row';
    const isExpanded = state.expandedTripId === dep.tripId;
    rowBtn.setAttribute('aria-expanded', String(isExpanded));

    // Line number square
    const lineNum = document.createElement('span');
    lineNum.className = 'tub-line-code';
    lineNum.textContent = dep.line;

    // Destination & Route details
    const info = document.createElement('span');
    info.className = 'tub-dep-info';

    const headsign = document.createElement('span');
    headsign.className = 'tub-dep-headsign';
    headsign.textContent = dep.headsign || dep.destination || dep.routeName;
    info.appendChild(headsign);

    const routeMeta = document.createElement('span');
    routeMeta.className = 'tub-dep-meta';
    const statusText = dep.cancelled
      ? dict.tubStatusCancelled
      : dep.realTime
        ? dep.delayMinutes > 0
          ? `${dict.tubStatusLive} · +${dep.delayMinutes} min`
          : dict.tubStatusLive
        : dict.tubStatusScheduled;

    const metaParts = [];
    if (dep.stopName && dep.stopName !== resolvedStopName) {
      metaParts.push(dep.stopName);
    }
    if (dep.routeName) {
      metaParts.push(dep.routeName);
    }
    metaParts.push(statusText);

    routeMeta.textContent = metaParts.join(' · ');
    if (dep.realTime && !dep.cancelled) {
      routeMeta.classList.add('is-live');
    } else if (dep.cancelled) {
      routeMeta.classList.add('is-cancelled');
    }
    info.appendChild(routeMeta);

    // Countdown + exact Lisbon time
    const timing = document.createElement('span');
    timing.className = 'tub-dep-timing';

    const eta = document.createElement('span');
    eta.className = 'tub-dep-eta';
    if (dep.minutesUntil !== null && dep.minutesUntil <= 5 && !dep.cancelled) {
      eta.classList.add('is-imminent');
    }
    eta.textContent = dep.cancelled ? dict.tubStatusCancelled : formatCountdownLabel(dep.minutesUntil, dict);

    const exactTime = document.createElement('span');
    exactTime.className = 'tub-dep-clock';
    exactTime.textContent = dep.departureTime;

    timing.appendChild(eta);
    timing.appendChild(exactTime);

    // Expand chevron
    const chevron = document.createElement('i');
    chevron.className = `fa-solid fa-chevron-down tub-dep-chevron${isExpanded ? ' is-open' : ''}`;
    chevron.setAttribute('aria-hidden', 'true');

    rowBtn.appendChild(lineNum);
    rowBtn.appendChild(info);
    rowBtn.appendChild(timing);
    rowBtn.appendChild(chevron);

    const itineraryBox = document.createElement('div');
    itineraryBox.className = 'tub-itinerary-box';
    itineraryBox.style.display = isExpanded ? 'block' : 'none';

    rowBtn.addEventListener('click', async () => {
      if (state.expandedTripId === dep.tripId) {
        state.expandedTripId = null;
        itineraryBox.style.display = 'none';
        rowBtn.setAttribute('aria-expanded', 'false');
        chevron.classList.remove('is-open');
        return;
      }

      // Collapse any other open itinerary row
      const allOpenBoxes = listEl.querySelectorAll('.tub-itinerary-box');
      allOpenBoxes.forEach((b) => {
        b.style.display = 'none';
      });
      listEl.querySelectorAll('.tub-departure-row').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      listEl.querySelectorAll('.tub-dep-chevron').forEach((c) => c.classList.remove('is-open'));

      state.expandedTripId = dep.tripId;
      rowBtn.setAttribute('aria-expanded', 'true');
      chevron.classList.add('is-open');
      itineraryBox.style.display = 'block';
      renderStatusMessage(itineraryBox, 'fa-solid fa-spinner fa-spin', dict.tubLoadingTrip);

      try {
        const tripSchedule = await fetchTubTripSchedule(dep.tripId);
        renderTripStopsTimeline(itineraryBox, tripSchedule, dep.stopId || data.stopId);
      } catch {
        renderStatusMessage(itineraryBox, 'fa-solid fa-triangle-exclamation', dict.tubErrorFetch, true);
      }
    });

    rowWrap.appendChild(rowBtn);
    rowWrap.appendChild(itineraryBox);
    listEl.appendChild(rowWrap);
  }
}

/**
 * Renders the Active TUB Lines tab grid (with live client-side filtering).
 *
 * @returns {void}
 */
function renderActiveLinesView() {
  const dict = getDict();
  const listEl = document.getElementById('tub-lines-list');
  const detailEl = document.getElementById('tub-line-detail');
  const countEl = document.getElementById('tub-lines-count');
  const filterInput = document.getElementById('tub-line-search');

  if (!listEl || !detailEl) return;

  if (state.selectedLineTrip) {
    listEl.style.display = 'none';
    detailEl.style.display = 'block';
    clearElement(detailEl);

    const header = document.createElement('div');
    header.className = 'tub-line-detail-header';

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'tub-inline-back';
    const backIcon = document.createElement('i');
    backIcon.className = 'fa-solid fa-arrow-left';
    backIcon.setAttribute('aria-hidden', 'true');
    const backSpan = document.createElement('span');
    backSpan.textContent = dict.tubBackToLines;
    backBtn.appendChild(backIcon);
    backBtn.appendChild(backSpan);
    backBtn.addEventListener('click', () => {
      state.selectedLineTrip = null;
      renderActiveLinesView();
    });

    const titleWrap = document.createElement('div');
    titleWrap.className = 'tub-line-detail-title';
    const lineCode = document.createElement('span');
    lineCode.className = 'tub-line-code';
    lineCode.textContent = state.selectedLineTrip.line;
    const titleText = document.createElement('span');
    titleText.textContent = state.selectedLineTrip.routeName || state.selectedLineTrip.headsign;
    titleWrap.appendChild(lineCode);
    titleWrap.appendChild(titleText);

    header.appendChild(backBtn);
    header.appendChild(titleWrap);
    detailEl.appendChild(header);

    const timelineWrap = document.createElement('div');
    renderTripStopsTimeline(timelineWrap, state.selectedLineTrip);
    detailEl.appendChild(timelineWrap);
    return;
  }

  detailEl.style.display = 'none';
  listEl.style.display = 'grid';
  clearElement(listEl);

  const data = state.activeLinesPayload;
  if (!data || !Array.isArray(data.lines)) {
    return;
  }

  const query = (filterInput ? filterInput.value : '').trim().toLowerCase();
  const filtered = query
    ? data.lines.filter(
        (l) =>
          l.line.toLowerCase().includes(query) ||
          l.sampleFrom.toLowerCase().includes(query) ||
          l.sampleTo.toLowerCase().includes(query)
      )
    : data.lines;

  if (countEl) {
    countEl.textContent = dict.tubActiveLinesCount.replace('{count}', String(filtered.length));
  }

  if (filtered.length === 0) {
    listEl.style.display = 'block';
    renderStatusMessage(listEl, 'fa-solid fa-bus', dict.tubNoLinesFound);
    return;
  }

  for (const item of filtered) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'tub-line-card';

    const code = document.createElement('span');
    code.className = 'tub-line-code';
    code.textContent = item.line;

    const body = document.createElement('span');
    body.className = 'tub-line-card-body';

    const routeDesc = document.createElement('span');
    routeDesc.className = 'tub-line-card-route';
    routeDesc.textContent = item.sampleFrom && item.sampleTo ? `${item.sampleFrom} → ${item.sampleTo}` : `Linha ${item.line}`;

    const meta = document.createElement('span');
    meta.className = 'tub-line-card-meta';
    meta.textContent = `${dict.tubActiveTripsLabel.replace('{n}', String(item.activeTrips))} · ${item.nextDeparture}`;

    body.appendChild(routeDesc);
    body.appendChild(meta);

    const arrow = document.createElement('i');
    arrow.className = 'fa-solid fa-chevron-right tub-line-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');

    card.appendChild(code);
    card.appendChild(body);
    card.appendChild(arrow);

    card.addEventListener('click', async () => {
      listEl.style.display = 'none';
      detailEl.style.display = 'block';
      renderStatusMessage(detailEl, 'fa-solid fa-spinner fa-spin', dict.tubLoadingTrip);
      try {
        state.selectedLineTrip = await fetchTubTripSchedule(item.sampleTripId);
        renderActiveLinesView();
      } catch {
        state.selectedLineTrip = null;
        renderStatusMessage(detailEl, 'fa-solid fa-triangle-exclamation', dict.tubErrorFetch, true);
      }
    });

    listEl.appendChild(card);
  }
}

/**
 * Loads upcoming departures for the currently selected TUB stop.
 *
 * @param {boolean} [silent=false] - When true, refreshes without clearing existing rows.
 * @returns {Promise<void>}
 */
async function loadDeparturesForSelectedStop(silent = false) {
  logCall('loadDeparturesForSelectedStop', { stopId: state.selectedStopId, silent });
  const dict = getDict();
  const listEl = document.getElementById('tub-departures-list');
  const refreshBtn = document.getElementById('tub-live-refresh');

  if (!navigator.onLine) {
    renderStatusMessage(listEl, 'fa-solid fa-wifi', dict.tubOfflineError, true);
    return;
  }

  if (state.activeRequestController) {
    state.activeRequestController.abort();
  }
  state.activeRequestController = new AbortController();

  if (!silent) {
    renderStatusMessage(listEl, 'fa-solid fa-spinner fa-spin', dict.tubLoadingDepartures);
  }
  if (refreshBtn) {
    refreshBtn.classList.add('is-spinning');
  }

  try {
    const data = await fetchTubDepartures({
      stopId: state.selectedStopId,
      line: state.selectedLineFilter,
      signal: state.activeRequestController.signal
    });
    state.lastDeparturesPayload = data;
    renderDeparturesBoard(data);
  } catch (error) {
    if (error && error.name === 'AbortError') return;
    renderStatusMessage(listEl, 'fa-solid fa-triangle-exclamation', dict.tubErrorFetch, true);
  } finally {
    if (refreshBtn) {
      refreshBtn.classList.remove('is-spinning');
    }
  }
}

/**
 * Loads the currently active TUB lines across Braga.
 *
 * @param {boolean} [silent=false] - Whether to avoid showing a loading spinner.
 * @returns {Promise<void>}
 */
async function loadActiveTubLines(silent = false) {
  logCall('loadActiveTubLines', { silent });
  const dict = getDict();
  const listEl = document.getElementById('tub-lines-list');
  const clockEl = document.getElementById('tub-live-clock');
  const refreshBtn = document.getElementById('tub-live-refresh');

  if (!navigator.onLine) {
    if (listEl) {
      listEl.style.display = 'block';
      renderStatusMessage(listEl, 'fa-solid fa-wifi', dict.tubOfflineError, true);
    }
    return;
  }

  if (!silent && listEl && !state.selectedLineTrip) {
    listEl.style.display = 'block';
    renderStatusMessage(listEl, 'fa-solid fa-spinner fa-spin', dict.tubLoadingLines);
  }
  if (refreshBtn) refreshBtn.classList.add('is-spinning');

  try {
    const data = await fetchActiveTubLines();
    state.activeLinesPayload = data;
    if (clockEl && data.serverClock) {
      clockEl.textContent = data.serverClock;
    }
    renderActiveLinesView();
  } catch {
    if (listEl) {
      listEl.style.display = 'block';
      renderStatusMessage(listEl, 'fa-solid fa-triangle-exclamation', dict.tubErrorFetch, true);
    }
  } finally {
    if (refreshBtn) refreshBtn.classList.remove('is-spinning');
  }
}

/**
 * Selects a TUB stop, resets line filters, updates chips, and fetches departures.
 *
 * @param {string} stopId - Validated TUB stop ID.
 * @param {string} stopName - Human-readable stop name.
 * @returns {void}
 */
export function selectStop(stopId, stopName) {
  logCall('selectStop', { stopId, stopName });
  state.selectedStopId = stopId;
  state.selectedStopName = stopName;
  state.selectedLineFilter = '';
  state.expandedTripId = null;
  renderFeaturedStops();
  loadDeparturesForSelectedStop(false);
}

/**
 * Switches between "Por Paragem", "Destino (Como Ir)", and "Linhas Ativas" tabs.
 *
 * @param {'stops' | 'planner' | 'lines'} tab - Target tab ID.
 * @returns {void}
 */
export function switchTubTab(tab) {
  logCall('switchTubTab', { tab });
  state.activeTab = tab;

  const tabStops = document.getElementById('tub-tab-stops');
  const tabPlanner = document.getElementById('tub-tab-planner');
  const tabLines = document.getElementById('tub-tab-lines');
  const panelStops = document.getElementById('tub-panel-stops');
  const panelPlanner = document.getElementById('tub-panel-planner');
  const panelLines = document.getElementById('tub-panel-lines');

  const isStops = tab === 'stops';
  const isPlanner = tab === 'planner';
  const isLines = tab === 'lines';

  if (tabStops) {
    tabStops.classList.toggle('active', isStops);
    tabStops.setAttribute('aria-selected', String(isStops));
  }
  if (tabPlanner) {
    tabPlanner.classList.toggle('active', isPlanner);
    tabPlanner.setAttribute('aria-selected', String(isPlanner));
  }
  if (tabLines) {
    tabLines.classList.toggle('active', isLines);
    tabLines.setAttribute('aria-selected', String(isLines));
  }

  if (panelStops) panelStops.style.display = isStops ? 'block' : 'none';
  if (panelPlanner) panelPlanner.style.display = isPlanner ? 'block' : 'none';
  if (panelLines) panelLines.style.display = isLines ? 'block' : 'none';

  if (isStops) {
    if (!state.lastDeparturesPayload) {
      loadDeparturesForSelectedStop(false);
    }
  } else if (isLines) {
    state.selectedLineTrip = null;
    loadActiveTubLines(Boolean(state.activeLinesPayload));
  }
}

/**
 * Requests user geolocation and finds the closest TUB bus stops in Braga.
 *
 * @returns {void}
 */
function handleNearbyLookup() {
  logCall('handleNearbyLookup');
  const dict = getDict();
  const resultsEl = document.getElementById('tub-stop-results');
  const nearbyBtn = document.getElementById('tub-nearby-btn');

  if (!navigator.geolocation) {
    if (resultsEl) {
      resultsEl.style.display = 'block';
      renderStatusMessage(resultsEl, 'fa-solid fa-location-crosshairs', dict.tubGeoUnavailable, true);
    }
    return;
  }

  if (nearbyBtn) nearbyBtn.disabled = true;
  if (resultsEl) {
    resultsEl.style.display = 'block';
    renderStatusMessage(resultsEl, 'fa-solid fa-spinner fa-spin', dict.tubGeoLocating);
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const result = await fetchNearbyTubStops(latitude, longitude);
        renderStopSearchResults(result.stops, 'nearby');
      } catch (error) {
        const msg = error?.code === 'OUT_OF_BOUNDS' ? dict.tubGeoOutsideBraga : dict.tubErrorFetch;
        if (resultsEl) {
          resultsEl.style.display = 'block';
          renderStatusMessage(resultsEl, 'fa-solid fa-location-crosshairs', msg, true);
        }
      } finally {
        if (nearbyBtn) nearbyBtn.disabled = false;
      }
    },
    () => {
      if (nearbyBtn) nearbyBtn.disabled = false;
      if (resultsEl) {
        resultsEl.style.display = 'block';
        renderStatusMessage(resultsEl, 'fa-solid fa-location-crosshairs', dict.tubGeoDenied, true);
      }
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  );
}

/**
 * Starts the 30-second background refresh timer while the inline TUB widget is active.
 *
 * @returns {void}
 */
function startAutoRefresh() {
  stopAutoRefresh();
  state.refreshTimer = window.setInterval(() => {
    if (!state.isActive || !isWidgetVisible() || document.hidden || !navigator.onLine) return;
    if (state.activeTab === 'stops') {
      loadDeparturesForSelectedStop(true);
    } else if (state.activeTab === 'planner') {
      refreshTubPlanner(true);
    } else if (!state.selectedLineTrip) {
      loadActiveTubLines(true);
    }
  }, APP_CONFIG.tubLive.refreshIntervalMs);
}

/**
 * Clears any running auto-refresh interval.
 *
 * @returns {void}
 */
function stopAutoRefresh() {
  if (state.refreshTimer) {
    window.clearInterval(state.refreshTimer);
    state.refreshTimer = null;
  }
}

/**
 * Activates the inline TUB Real-Time widget inside "Na Cidade" and fetches fresh schedules.
 *
 * @param {{ stopId?: string, stopName?: string, tab?: 'stops' | 'lines' }} [options={}] - Optional initial focus.
 * @returns {Promise<void>}
 */
export async function activateTubLive(options = {}) {
  logCall('activateTubLive', options);
  const accordion = document.getElementById('tub-live-accordion');
  if (!accordion) return;

  if (!accordion.open) {
    return;
  }

  state.isActive = true;

  if (options.stopId) {
    state.selectedStopId = options.stopId;
    if (options.stopName) state.selectedStopName = options.stopName;
    state.selectedLineFilter = '';
  }

  if (state.featuredStops.length === 0) {
    state.featuredStops = FALLBACK_FEATURED_STOPS;
    renderFeaturedStops();
    try {
      const res = await fetchFeaturedTubStops();
      if (Array.isArray(res.stops) && res.stops.length > 0) {
        state.featuredStops = res.stops;
        renderFeaturedStops();
      }
    } catch {
      // Retain curated fallback stops
    }
  } else {
    renderFeaturedStops();
  }

  const clockEl = document.getElementById('tub-live-clock');
  if (clockEl && (!clockEl.textContent || clockEl.textContent.trim() === '--:--')) {
    try {
      clockEl.textContent = new Intl.DateTimeFormat('pt-PT', {
        timeZone: 'Europe/Lisbon',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
    } catch {
      // Keep fallback until API returns serverClock
    }
  }

  const targetTab = options.tab || state.activeTab || 'stops';
  switchTubTab(targetTab);
  if (targetTab === 'stops' && state.lastDeparturesPayload) {
    loadDeparturesForSelectedStop(true);
  }
  startAutoRefresh();
}

/**
 * Pauses live polling and aborts pending fetches when leaving "Na Cidade" or closing the accordion.
 *
 * @returns {void}
 */
export function deactivateTubLive() {
  logCall('deactivateTubLive');
  state.isActive = false;
  stopAutoRefresh();
  if (state.activeRequestController) {
    state.activeRequestController.abort();
    state.activeRequestController = null;
  }
}

/**
 * Navigates to "Na Cidade", opens `#tub-live-accordion`, activates live schedules,
 * and smoothly scrolls the widget into view.
 *
 * @param {{ stopId?: string, stopName?: string, tab?: 'stops' | 'lines' }} [options={}] - Optional focus config.
 * @returns {void}
 */
export function openTubLiveInCity(options = {}) {
  logCall('openTubLiveInCity', options);
  const accordion = document.getElementById('tub-live-accordion');
  if (accordion) {
    accordion.open = true;
  }

  if (typeof state.navigateToCityCallback === 'function') {
    state.navigateToCityCallback();
  }

  activateTubLive(options);

  if (accordion) {
    window.setTimeout(() => {
      accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, APP_CONFIG.viewTransitionMs + 40);
  }
}

/**
 * Initializes all event listeners for the inline TUB Real-Time Bus Schedules widget.
 *
 * @param {object} [options={}] - Lifecycle callbacks.
 * @param {() => void} [options.onNavigateToCity] - Callback to switch the active view to "Na Cidade".
 * @returns {void}
 */
export function initTubLive({ onNavigateToCity } = {}) {
  logCall('initTubLive');
  state.navigateToCityCallback = typeof onNavigateToCity === 'function' ? onNavigateToCity : null;

  const accordion = document.getElementById('tub-live-accordion');
  const homeTrigger = document.getElementById('home-tub-live-btn');
  const tabStops = document.getElementById('tub-tab-stops');
  const tabPlanner = document.getElementById('tub-tab-planner');
  const tabLines = document.getElementById('tub-tab-lines');
  const refreshBtn = document.getElementById('tub-live-refresh');
  const stopSearchInput = document.getElementById('tub-stop-search');
  const lineSearchInput = document.getElementById('tub-line-search');
  const nearbyBtn = document.getElementById('tub-nearby-btn');

  if (!accordion) return;

  // Render curated Braga stop chips immediately so UI is populated before first fetch completes
  state.featuredStops = FALLBACK_FEATURED_STOPS;
  renderFeaturedStops();

  initTubPlanner({
    onSelectStop: (stopId, stopName) => {
      switchTubTab('stops');
      selectStop(stopId, stopName);
    }
  });

  if (homeTrigger) {
    homeTrigger.addEventListener('click', () => openTubLiveInCity());
  }

  accordion.addEventListener('toggle', () => {
    if (accordion.open && isWidgetVisible()) {
      activateTubLive();
    } else if (!accordion.open) {
      deactivateTubLive();
    }
  });

  if (tabStops) {
    tabStops.addEventListener('click', () => switchTubTab('stops'));
  }
  if (tabPlanner) {
    tabPlanner.addEventListener('click', () => switchTubTab('planner'));
  }
  if (tabLines) {
    tabLines.addEventListener('click', () => switchTubTab('lines'));
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (state.activeTab === 'stops') {
        loadDeparturesForSelectedStop(false);
      } else if (state.activeTab === 'planner') {
        refreshTubPlanner(false);
      } else {
        state.selectedLineTrip = null;
        loadActiveTubLines(false);
      }
    });
  }

  if (nearbyBtn) {
    nearbyBtn.addEventListener('click', handleNearbyLookup);
  }

  if (stopSearchInput) {
    stopSearchInput.addEventListener('input', () => {
      const resultsEl = document.getElementById('tub-stop-results');
      const query = stopSearchInput.value.trim();

      if (state.searchDebounceTimer) {
        window.clearTimeout(state.searchDebounceTimer);
      }

      if (query.length < 2) {
        if (resultsEl) resultsEl.style.display = 'none';
        return;
      }

      state.searchDebounceTimer = window.setTimeout(async () => {
        const dict = getDict();
        if (resultsEl) {
          resultsEl.style.display = 'block';
          renderStatusMessage(resultsEl, 'fa-solid fa-spinner fa-spin', dict.tubSearchingStops);
        }
        try {
          const res = await searchTubStopsByName(query);
          renderStopSearchResults(res.stops, 'search');
        } catch {
          if (resultsEl) {
            resultsEl.style.display = 'block';
            renderStatusMessage(resultsEl, 'fa-solid fa-triangle-exclamation', dict.tubErrorFetch, true);
          }
        }
      }, APP_CONFIG.tubLive.searchDebounceMs);
    });
  }

  if (lineSearchInput) {
    lineSearchInput.addEventListener('input', () => {
      renderActiveLinesView();
    });
  }

  // Re-render dynamic labels when user switches language
  window.addEventListener('braga:langchange', () => {
    renderFeaturedStops();
    if (state.lastDeparturesPayload) {
      renderDeparturesBoard(state.lastDeparturesPayload);
    }
    if (state.activeLinesPayload) {
      renderActiveLinesView();
    }
    rerenderTubPlannerLanguage();
  });
}
