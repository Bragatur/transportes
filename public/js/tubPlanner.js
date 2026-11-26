/**
 * Feature: Real-Time TUB Destination & Bus Line Planner ("Qual o autocarro a apanhar")
 *
 * Powers the "Destino / Como Ir" tab inside the inline "Horários TUB em Tempo Real"
 * widget in "Na Cidade". Allows visitors and residents to choose any origin (Av. Central
 * by default, any searched Braga stop/place, or live GPS location) and any destination in
 * Braga (stops, sanctuaries, landmarks like Bom Jesus, Sameiro, Braga Parque, Hospital,
 * U. Minho, CP Station) and immediately see:
 * - Exactly which TUB bus line(s) to catch right now (e.g. Linha 2, Linha 88, Linha 9 → 88).
 * - Where to board, departure & arrival times in Europe/Lisbon time, countdown, and transfers.
 * - Walking distances to/from stops, stop count, expandable intermediate stops, and direct
 *   one-tap navigation to live departures at the boarding stop.
 *
 * Security & Accessibility:
 * - Renders 100% of API responses using `document.createElement` and `textContent` (zero
 *   `innerHTML` on external data).
 * - Uses abortable fetch requests to avoid race conditions when switching destinations.
 *
 * Use cases:
 * - Finding which TUB bus takes a tourist from their current GPS location to Bom Jesus or Sameiro.
 * - Planning a trip from CP Train Station to Universidade do Minho or Braga Parque.
 * - Swapping origin and destination in one tap to plan the return bus trip.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';
import { TRANSLATIONS } from './translations.js';
import { searchBragaTubPlaces, planTubBusRoute } from './tubApiClient.js';
import { formatCountdownLabel } from './tubLive.js';

const DEFAULT_ORIGIN = {
  placeParam: 'pt-Transportes-Urbanos-de-Braga_146',
  name: 'Central I (Av. Central)'
};

const QUICK_DESTINATIONS = [
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_1', name: 'Bom Jesus', tagKey: 'tubSpotBomJesus' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_1051', name: 'Santuário (Sameiro)', tagKey: 'tubSpotSameiro' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_17', name: 'Nova Estação I (CP)', tagKey: 'tubSpotTrain' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_1975', name: 'Norton Matos (C. Camionagem)', tagKey: 'tubSpotBusTerminal' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_370', name: 'Universidade do Minho II', tagKey: 'tubSpotUminho' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_2029', name: 'Hospital de Braga', tagKey: 'tubSpotHospital' },
  { placeParam: '41.556708,-8.404594', name: 'Braga Parque', tagKey: 'tubSpotBragaParque' },
  { placeParam: 'pt-Transportes-Urbanos-de-Braga_146', name: 'Central I (Av. Central)', tagKey: 'tubSpotCentral' }
];

const plannerState = {
  from: { ...DEFAULT_ORIGIN },
  to: null,
  lastPlanPayload: null,
  activeController: null,
  fromDebounce: null,
  toDebounce: null,
  fromSeq: 0,
  toSeq: 0,
  onSelectStop: null
};

/**
 * Normalizes text for accent- and case-insensitive local comparison.
 *
 * @param {string} value - Raw text.
 * @returns {string} Normalized text.
 */
function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Cancels any pending autocomplete timer for origin or destination.
 *
 * @param {'from' | 'to'} field - Target field.
 * @returns {void}
 */
function cancelAutocomplete(field) {
  const timerKey = field === 'from' ? 'fromDebounce' : 'toDebounce';
  const seqKey = field === 'from' ? 'fromSeq' : 'toSeq';
  if (plannerState[timerKey]) {
    window.clearTimeout(plannerState[timerKey]);
    plannerState[timerKey] = null;
  }
  plannerState[seqKey] += 1;
}

/**
 * Returns the active translation dictionary based on `<html lang>`.
 *
 * @returns {Record<string, string>} Active language dictionary.
 */
function getDict() {
  const lang = (document.documentElement.lang || APP_CONFIG.defaultLang).slice(0, 2);
  return TRANSLATIONS[lang] || TRANSLATIONS[APP_CONFIG.defaultLang];
}

/**
 * Safely empties all child nodes from a DOM container.
 *
 * @param {HTMLElement | null} el - Target element.
 * @returns {void}
 */
function clearEl(el) {
  if (!el) return;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * Formats meters cleanly as "380 m" or "1.2 km".
 *
 * @param {number} meters - Distance in meters.
 * @returns {string} Human-readable distance label.
 */
function formatMeters(meters) {
  if (!Number.isFinite(meters) || meters <= 0) return '';
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
}

/**
 * Renders a status/empty/error message box inside the planner results area safely.
 *
 * @param {HTMLElement | null} container - Target container.
 * @param {string} iconClass - Font Awesome icon classes.
 * @param {string} message - Plain text status message.
 * @param {boolean} [isError=false] - Whether to apply subtle warning tint.
 * @returns {void}
 */
function renderPlannerStatus(container, iconClass, message, isError = false) {
  if (!container) return;
  clearEl(container);

  const box = document.createElement('div');
  box.className = isError ? 'tub-empty-state tub-empty-state--error' : 'tub-empty-state';

  const icon = document.createElement('i');
  icon.className = iconClass;
  icon.setAttribute('aria-hidden', 'true');

  const span = document.createElement('span');
  span.textContent = message;

  box.appendChild(icon);
  box.appendChild(span);
  container.appendChild(box);
}

/**
 * Renders the 1-tap quick Braga destination chips.
 *
 * @returns {void}
 */
function renderQuickDestinations() {
  const container = document.getElementById('tub-plan-quick-dests');
  if (!container) return;
  clearEl(container);

  const dict = getDict();

  for (const dest of QUICK_DESTINATIONS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tub-stop-chip';
    const isSelected = Boolean(plannerState.to && plannerState.to.placeParam === dest.placeParam);
    if (isSelected) {
      btn.classList.add('active');
    }
    btn.setAttribute('aria-pressed', String(isSelected));
    btn.textContent = dict[dest.tagKey] || dest.name;

    btn.addEventListener('click', () => {
      const label = dict[dest.tagKey] || dest.name;
      plannerState.to = { placeParam: dest.placeParam, name: label };

      // If origin equals clicked destination, switch origin automatically to another key hub
      if (plannerState.from && plannerState.from.placeParam === dest.placeParam) {
        const fallbackOrigin =
          dest.placeParam === DEFAULT_ORIGIN.placeParam
            ? { placeParam: 'pt-Transportes-Urbanos-de-Braga_17', name: dict.tubSpotTrain || 'Estação CP' }
            : { ...DEFAULT_ORIGIN };
        plannerState.from = fallbackOrigin;
        const fromInput = document.getElementById('tub-plan-from');
        if (fromInput) fromInput.value = fallbackOrigin.name;
      }

      const toInput = document.getElementById('tub-plan-to');
      if (toInput) toInput.value = label;
      cancelAutocomplete('from');
      cancelAutocomplete('to');
      hideSuggestions('from');
      hideSuggestions('to');
      renderQuickDestinations();
      executeRoutePlan(false);
    });

    container.appendChild(btn);
  }
}

/**
 * Hides the autocomplete dropdown for origin or destination.
 *
 * @param {'from' | 'to'} field - Target field key.
 * @returns {void}
 */
function hideSuggestions(field) {
  const el = document.getElementById(field === 'from' ? 'tub-plan-from-results' : 'tub-plan-to-results');
  if (el) {
    el.style.display = 'none';
    clearEl(el);
  }
}

/**
 * Renders place/stop autocomplete suggestions under Origin or Destination safely.
 *
 * @param {'from' | 'to'} field - Field receiving suggestions.
 * @param {Array<object>} places - Place records from `/api/tub/places`.
 * @returns {void}
 */
function renderPlaceSuggestions(field, places) {
  const resultsEl = document.getElementById(field === 'from' ? 'tub-plan-from-results' : 'tub-plan-to-results');
  const inputEl = document.getElementById(field === 'from' ? 'tub-plan-from' : 'tub-plan-to');
  if (!resultsEl) return;
  clearEl(resultsEl);

  const dict = getDict();
  if (!places || places.length === 0) {
    resultsEl.style.display = 'block';
    renderPlannerStatus(resultsEl, 'fa-solid fa-magnifying-glass', dict.tubPlanNoPlaces);
    return;
  }

  resultsEl.style.display = 'block';
  const list = document.createElement('div');
  list.className = 'tub-results-list';

  for (const place of places) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tub-result-item';

    const left = document.createElement('span');
    left.className = 'tub-result-name';

    const icon = document.createElement('i');
    icon.className = place.kind === 'stop' ? 'fa-solid fa-bus-simple' : 'fa-solid fa-location-dot';
    icon.setAttribute('aria-hidden', 'true');
    left.appendChild(icon);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = place.name;
    left.appendChild(nameSpan);

    const areaSpan = document.createElement('span');
    areaSpan.className = 'tub-result-dist';
    areaSpan.textContent = place.kind === 'stop' ? dict.tubPlanStopBadge : place.area || 'Braga';

    btn.appendChild(left);
    btn.appendChild(areaSpan);

    btn.addEventListener('click', () => {
      cancelAutocomplete(field);
      if (field === 'from') {
        plannerState.from = { placeParam: place.placeParam, name: place.name };
      } else {
        plannerState.to = { placeParam: place.placeParam, name: place.name };
      }
      if (inputEl) inputEl.value = place.name;
      hideSuggestions(field);
      renderQuickDestinations();
      if (plannerState.from && plannerState.to) {
        executeRoutePlan(false);
      }
    });

    list.appendChild(btn);
  }

  resultsEl.appendChild(list);
}

/**
 * Renders the planned TUB bus itinerary recommendations safely via DOM nodes.
 *
 * @param {object} data - Response payload from `/api/tub/plan`.
 * @returns {void}
 */
function renderPlannedRoutes(data) {
  const container = document.getElementById('tub-plan-results');
  const clockEl = document.getElementById('tub-live-clock');
  if (!container) return;
  clearEl(container);

  if (clockEl && data.serverClock) {
    clockEl.textContent = data.serverClock;
  }

  const dict = getDict();
  const itineraries = Array.isArray(data.itineraries) ? data.itineraries : [];

  if (itineraries.length === 0) {
    if (data.directWalk) {
      const distText = formatMeters(data.directWalk.distanceMeters);
      const walkMsg = dict.tubPlanWalkOnly
        .replace('{min}', String(data.directWalk.durationMinutes))
        .replace('{dist}', distText || `${data.directWalk.distanceMeters} m`);
      renderPlannerStatus(container, 'fa-solid fa-person-walking', walkMsg);
    } else {
      renderPlannerStatus(container, 'fa-solid fa-bus', dict.tubPlanNoRoutes);
    }
    return;
  }

  // Optional subtle walking note when destination is also quickly reachable on foot
  if (data.directWalk && data.directWalk.durationMinutes <= 12) {
    const walkHint = document.createElement('div');
    walkHint.className = 'tub-plan-walk-hint';
    const walkIcon = document.createElement('i');
    walkIcon.className = 'fa-solid fa-person-walking';
    walkIcon.setAttribute('aria-hidden', 'true');
    const walkText = document.createElement('span');
    walkText.textContent = dict.tubPlanWalkOption
      .replace('{min}', String(data.directWalk.durationMinutes))
      .replace('{dist}', formatMeters(data.directWalk.distanceMeters));
    walkHint.appendChild(walkIcon);
    walkHint.appendChild(walkText);
    container.appendChild(walkHint);
  }

  for (const itin of itineraries) {
    const card = document.createElement('article');
    card.className = 'tub-route-card';

    // 1. Header: Which bus(es) to catch + duration + departure/arrival time
    const head = document.createElement('div');
    head.className = 'tub-route-head';

    const busSummary = document.createElement('div');
    busSummary.className = 'tub-route-buses';

    const catchLabel = document.createElement('span');
    catchLabel.className = 'tub-route-catch-label';
    catchLabel.textContent =
      itin.busLines.length > 1 ? dict.tubPlanTakeBusesLabel : dict.tubPlanTakeBusLabel;
    busSummary.appendChild(catchLabel);

    const badgesWrap = document.createElement('div');
    badgesWrap.className = 'tub-route-badges';
    itin.busLines.forEach((line, idx) => {
      if (idx > 0) {
        const arrow = document.createElement('i');
        arrow.className = 'fa-solid fa-arrow-right tub-route-transfer-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        badgesWrap.appendChild(arrow);
      }
      const badge = document.createElement('span');
      badge.className = 'tub-line-code';
      badge.textContent = line;
      badgesWrap.appendChild(badge);
    });
    busSummary.appendChild(badgesWrap);

    const timeSummary = document.createElement('div');
    timeSummary.className = 'tub-route-timing';

    const durEl = document.createElement('span');
    durEl.className = 'tub-route-duration';
    durEl.textContent = `${itin.durationMinutes} min`;

    const clockRange = document.createElement('span');
    clockRange.className = 'tub-route-clock-range';
    const countdown = formatCountdownLabel(itin.minutesUntilStart, dict);
    clockRange.textContent = `${itin.startTime} → ${itin.endTime} · ${countdown}`;

    const transferMeta = document.createElement('span');
    transferMeta.className = 'tub-route-transfer-meta';
    transferMeta.textContent =
      itin.transfers === 0
        ? dict.tubPlanDirect
        : itin.transfers === 1
          ? dict.tubPlanOneTransfer
          : dict.tubPlanTransfers.replace('{n}', String(itin.transfers));

    timeSummary.appendChild(durEl);
    timeSummary.appendChild(clockRange);
    timeSummary.appendChild(transferMeta);

    head.appendChild(busSummary);
    head.appendChild(timeSummary);
    card.appendChild(head);

    // 2. Step-by-step legs
    const legsList = document.createElement('div');
    legsList.className = 'tub-route-legs';

    for (const leg of itin.legs) {
      if (leg.mode === 'WALK') {
        const walkRow = document.createElement('div');
        walkRow.className = 'tub-leg-walk';

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-person-walking';
        icon.setAttribute('aria-hidden', 'true');

        const targetName =
          leg.toName && leg.toName !== 'END'
            ? leg.toName
            : plannerState.to?.name || dict.tubPlanDestinationWord;

        const distLabel = formatMeters(leg.distanceMeters);
        const text = document.createElement('span');
        text.textContent = distLabel
          ? dict.tubPlanWalkStepDist
              .replace('{min}', String(leg.durationMinutes))
              .replace('{dist}', distLabel)
              .replace('{to}', targetName)
          : dict.tubPlanWalkStep
              .replace('{min}', String(leg.durationMinutes))
              .replace('{to}', targetName);

        walkRow.appendChild(icon);
        walkRow.appendChild(text);
        legsList.appendChild(walkRow);
        continue;
      }

      // BUS LEG
      const busRow = document.createElement('div');
      busRow.className = 'tub-leg-bus';

      const legTop = document.createElement('div');
      legTop.className = 'tub-leg-bus-top';

      const linePill = document.createElement('span');
      linePill.className = 'tub-line-code tub-line-code--sm';
      linePill.textContent = leg.line;

      const legTitle = document.createElement('div');
      legTitle.className = 'tub-leg-bus-title';

      const headline = document.createElement('div');
      headline.className = 'tub-leg-bus-headline';
      headline.textContent = leg.headsign
        ? `${dict.tubPlanBusLinePrefix} ${leg.line} → ${leg.headsign}`
        : `${dict.tubPlanBusLinePrefix} ${leg.line}`;
      legTitle.appendChild(headline);

      const boardExit = document.createElement('div');
      boardExit.className = 'tub-leg-bus-stops';
      boardExit.textContent = `${leg.startTime} ${leg.fromName}  →  ${leg.endTime} ${leg.toName}`;
      legTitle.appendChild(boardExit);

      const subMeta = document.createElement('div');
      subMeta.className = 'tub-leg-bus-meta';
      const statusLabel = leg.cancelled
        ? dict.tubStatusCancelled
        : leg.realTime
          ? dict.tubStatusLive
          : dict.tubStatusScheduled;
      subMeta.textContent = `${leg.durationMinutes} min · ${dict.tubPlanStopsCount.replace('{n}', String(leg.stopsCount))} · ${statusLabel}`;
      if (leg.realTime && !leg.cancelled) {
        subMeta.classList.add('is-live');
      }
      legTitle.appendChild(subMeta);

      legTop.appendChild(linePill);
      legTop.appendChild(legTitle);
      busRow.appendChild(legTop);

      // Action links on bus leg: check live board at boarding stop + toggle intermediate stops
      const legActions = document.createElement('div');
      legActions.className = 'tub-leg-actions';

      if (leg.fromStopId && leg.fromStopId.includes('Transportes-Urbanos-de-Braga_') && plannerState.onSelectStop) {
        const stopBtn = document.createElement('button');
        stopBtn.type = 'button';
        stopBtn.className = 'tub-leg-action-btn';
        const stopIcon = document.createElement('i');
        stopIcon.className = 'fa-solid fa-clock';
        stopIcon.setAttribute('aria-hidden', 'true');
        const stopTxt = document.createElement('span');
        stopTxt.textContent = dict.tubPlanViewBoardingStop;
        stopBtn.appendChild(stopIcon);
        stopBtn.appendChild(stopTxt);
        stopBtn.addEventListener('click', () => {
          plannerState.onSelectStop(leg.fromStopId, leg.fromName);
        });
        legActions.appendChild(stopBtn);
      }

      if (Array.isArray(leg.intermediateStops) && leg.intermediateStops.length > 0) {
        const stopsBox = document.createElement('ol');
        stopsBox.className = 'tub-timeline tub-leg-inter-stops';
        stopsBox.style.display = 'none';

        for (const s of leg.intermediateStops) {
          const li = document.createElement('li');
          li.className = 'tub-timeline-item';
          const row = document.createElement('div');
          row.className = 'tub-timeline-static';

          const t = document.createElement('span');
          t.className = 'tub-timeline-time';
          t.textContent = s.time;

          const dot = document.createElement('span');
          dot.className = 'tub-timeline-dot';
          dot.setAttribute('aria-hidden', 'true');

          const n = document.createElement('span');
          n.className = 'tub-timeline-name';
          n.textContent = s.name;

          row.appendChild(t);
          row.appendChild(dot);
          row.appendChild(n);
          li.appendChild(row);
          stopsBox.appendChild(li);
        }

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'tub-leg-action-btn';
        toggleBtn.setAttribute('aria-expanded', 'false');
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fa-solid fa-list-ul';
        toggleIcon.setAttribute('aria-hidden', 'true');
        const toggleTxt = document.createElement('span');
        toggleTxt.textContent = dict.tubPlanShowStops.replace('{n}', String(leg.intermediateStops.length));
        toggleBtn.appendChild(toggleIcon);
        toggleBtn.appendChild(toggleTxt);

        toggleBtn.addEventListener('click', () => {
          const isOpen = stopsBox.style.display !== 'none';
          stopsBox.style.display = isOpen ? 'none' : 'flex';
          toggleBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        legActions.appendChild(toggleBtn);
        busRow.appendChild(legActions);
        busRow.appendChild(stopsBox);
      } else if (legActions.childNodes.length > 0) {
        busRow.appendChild(legActions);
      }

      legsList.appendChild(busRow);
    }

    card.appendChild(legsList);
    container.appendChild(card);
  }
}

/**
 * Resolves a typed origin/destination input via `/api/tub/places` if the user
 * pressed Submit without clicking an autocomplete suggestion.
 *
 * @param {'from' | 'to'} field - Field to resolve.
 * @returns {Promise<{ placeParam: string, name: string } | null>} Resolved place or null.
 */
async function ensureResolvedField(field) {
  const input = document.getElementById(field === 'from' ? 'tub-plan-from' : 'tub-plan-to');
  const current = field === 'from' ? plannerState.from : plannerState.to;
  const typed = (input ? input.value : '').trim();

  if (!typed) {
    return null;
  }

  if (current && normalizeText(current.name) === normalizeText(typed)) {
    return current;
  }
  if (typed.length < 2) {
    return current;
  }

  // Instant match against curated quick Braga hubs if user typed their label directly
  const dict = getDict();
  const normTyped = normalizeText(typed);
  const quickMatch = QUICK_DESTINATIONS.find(
    (d) => normalizeText(d.name) === normTyped || normalizeText(dict[d.tagKey] || '') === normTyped
  );
  if (quickMatch) {
    const resolvedQuick = {
      placeParam: quickMatch.placeParam,
      name: dict[quickMatch.tagKey] || quickMatch.name
    };
    if (field === 'from') {
      plannerState.from = resolvedQuick;
    } else {
      plannerState.to = resolvedQuick;
    }
    return resolvedQuick;
  }

  const res = await searchBragaTubPlaces(typed);
  const first = Array.isArray(res.places) ? res.places[0] : null;
  if (!first) return null;

  const resolved = { placeParam: first.placeParam, name: first.name };
  if (field === 'from') {
    plannerState.from = resolved;
  } else {
    plannerState.to = resolved;
  }
  if (input) input.value = first.name;
  return resolved;
}

/**
 * Executes the live TUB route plan query from `plannerState.from` to `plannerState.to`.
 *
 * @param {boolean} [silent=false] - When true, refreshes without clearing existing cards.
 * @returns {Promise<void>}
 */
export async function executeRoutePlan(silent = false) {
  logCall('executeRoutePlan', { silent });
  const dict = getDict();
  const resultsEl = document.getElementById('tub-plan-results');
  const refreshBtn = document.getElementById('tub-live-refresh');

  if (!navigator.onLine) {
    renderPlannerStatus(resultsEl, 'fa-solid fa-wifi', dict.tubOfflineError, true);
    return;
  }

  if (!silent) {
    renderPlannerStatus(resultsEl, 'fa-solid fa-spinner fa-spin', dict.tubPlanSearching);
  }
  if (refreshBtn) refreshBtn.classList.add('is-spinning');

  try {
    const origin = await ensureResolvedField('from');
    const destination = await ensureResolvedField('to');

    if (!origin || !destination) {
      renderPlannerStatus(resultsEl, 'fa-solid fa-route', dict.tubPlanPickBoth, false);
      return;
    }

    if (origin.placeParam === destination.placeParam) {
      renderPlannerStatus(resultsEl, 'fa-solid fa-circle-info', dict.tubPlanSamePlace, true);
      return;
    }

    if (plannerState.activeController) {
      plannerState.activeController.abort();
    }
    plannerState.activeController = new AbortController();

    const data = await planTubBusRoute({
      from: origin.placeParam,
      to: destination.placeParam,
      signal: plannerState.activeController.signal
    });

    plannerState.lastPlanPayload = data;
    renderQuickDestinations();
    renderPlannedRoutes(data);
  } catch (error) {
    if (error && error.name === 'AbortError') return;
    const msg = error?.code === 'SAME_ORIGIN_DESTINATION' ? dict.tubPlanSamePlace : dict.tubErrorFetch;
    renderPlannerStatus(resultsEl, 'fa-solid fa-triangle-exclamation', msg, true);
  } finally {
    if (refreshBtn) refreshBtn.classList.remove('is-spinning');
  }
}

/**
 * Sets the planner's origin to the user's current GPS coordinates inside Braga.
 *
 * @returns {void}
 */
function handleUseGpsOrigin() {
  logCall('handleUseGpsOrigin');
  const dict = getDict();
  const fromInput = document.getElementById('tub-plan-from');
  const gpsBtn = document.getElementById('tub-plan-gps-btn');
  const resultsEl = document.getElementById('tub-plan-results');

  if (!navigator.geolocation) {
    renderPlannerStatus(resultsEl, 'fa-solid fa-location-crosshairs', dict.tubGeoUnavailable, true);
    return;
  }

  if (gpsBtn) gpsBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (gpsBtn) gpsBtn.disabled = false;
      const lat = Number(position.coords.latitude);
      const lon = Number(position.coords.longitude);
      const insideBraga = lat >= 41.4 && lat <= 41.7 && lon >= -8.65 && lon <= -8.25;
      if (!insideBraga) {
        renderPlannerStatus(resultsEl, 'fa-solid fa-location-crosshairs', dict.tubGeoOutsideBraga, true);
        return;
      }

      plannerState.from = {
        placeParam: `${lat.toFixed(6)},${lon.toFixed(6)}`,
        name: dict.tubPlanMyLocation
      };
      if (fromInput) fromInput.value = dict.tubPlanMyLocation;
      hideSuggestions('from');

      if (plannerState.to) {
        executeRoutePlan(false);
      }
    },
    () => {
      if (gpsBtn) gpsBtn.disabled = false;
      renderPlannerStatus(resultsEl, 'fa-solid fa-location-crosshairs', dict.tubGeoDenied, true);
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  );
}

/**
 * Refreshes the currently active planned route if both origin and destination are selected.
 *
 * @param {boolean} [silent=false] - Silent refresh flag.
 * @returns {void}
 */
export function refreshTubPlanner(silent = false) {
  logCall('refreshTubPlanner', { silent });
  if (plannerState.from && plannerState.to) {
    executeRoutePlan(silent);
  }
}

/**
 * Re-renders planner chips and existing route cards after a language change.
 *
 * @returns {void}
 */
export function rerenderTubPlannerLanguage() {
  renderQuickDestinations();
  if (plannerState.lastPlanPayload) {
    renderPlannedRoutes(plannerState.lastPlanPayload);
  } else {
    const resultsEl = document.getElementById('tub-plan-results');
    renderPlannerStatus(resultsEl, 'fa-solid fa-route', getDict().tubPlanEmptyHint);
  }
}

/**
 * Initializes the TUB destination & bus line planner UI and event listeners.
 *
 * @param {object} [options={}] - Callback options.
 * @param {(stopId: string, stopName: string) => void} [options.onSelectStop] - Invoked when user inspects a boarding stop.
 * @returns {void}
 */
export function initTubPlanner({ onSelectStop } = {}) {
  logCall('initTubPlanner');
  plannerState.onSelectStop = typeof onSelectStop === 'function' ? onSelectStop : null;

  const fromInput = document.getElementById('tub-plan-from');
  const toInput = document.getElementById('tub-plan-to');
  const gpsBtn = document.getElementById('tub-plan-gps-btn');
  const swapBtn = document.getElementById('tub-plan-swap-btn');
  const form = document.getElementById('tub-plan-form');
  const resultsEl = document.getElementById('tub-plan-results');

  if (!fromInput || !toInput || !form) return;

  fromInput.value = plannerState.from.name;
  renderQuickDestinations();
  renderPlannerStatus(resultsEl, 'fa-solid fa-route', getDict().tubPlanEmptyHint);

  const wireAutocomplete = (input, field) => {
    input.addEventListener('input', () => {
      const query = input.value.trim();
      if (field === 'from') {
        plannerState.from = null;
      } else {
        plannerState.to = null;
        renderQuickDestinations();
      }

      cancelAutocomplete(field);
      if (query.length < 2) {
        hideSuggestions(field);
        return;
      }

      const timerKey = field === 'from' ? 'fromDebounce' : 'toDebounce';
      const seqKey = field === 'from' ? 'fromSeq' : 'toSeq';
      const requestSeq = plannerState[seqKey];

      plannerState[timerKey] = window.setTimeout(async () => {
        try {
          const res = await searchBragaTubPlaces(query);
          if (plannerState[seqKey] !== requestSeq) return;
          renderPlaceSuggestions(field, res.places);
        } catch {
          if (plannerState[seqKey] !== requestSeq) return;
          hideSuggestions(field);
        }
      }, APP_CONFIG.tubLive.searchDebounceMs);
    });
  };

  wireAutocomplete(fromInput, 'from');
  wireAutocomplete(toInput, 'to');

  document.addEventListener('click', (event) => {
    if (!form.contains(event.target)) {
      hideSuggestions('from');
      hideSuggestions('to');
    }
  });

  form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideSuggestions('from');
      hideSuggestions('to');
    }
  });

  if (gpsBtn) {
    gpsBtn.addEventListener('click', handleUseGpsOrigin);
  }

  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      cancelAutocomplete('from');
      cancelAutocomplete('to');
      const prevFrom = plannerState.from;
      const prevTo = plannerState.to;
      const prevFromVal = fromInput.value;
      const prevToVal = toInput.value;

      plannerState.from = prevTo;
      plannerState.to = prevFrom;
      fromInput.value = prevToVal;
      toInput.value = prevFromVal;
      hideSuggestions('from');
      hideSuggestions('to');
      renderQuickDestinations();

      if (plannerState.from && plannerState.to) {
        executeRoutePlan(false);
      }
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    cancelAutocomplete('from');
    cancelAutocomplete('to');
    hideSuggestions('from');
    hideSuggestions('to');
    executeRoutePlan(false);
  });
}
