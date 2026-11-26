/**
 * Feature: Client-Side TUB Braga Mobility API Wrapper
 *
 * Encapsulates all browser-to-server HTTP calls to `/api/tub/*` for fetching
 * featured Braga stops, searching stops by name or GPS coordinates, querying
 * upcoming departures, listing active circulating TUB lines, and loading full
 * stop-by-stop bus itineraries.
 *
 * Use cases:
 * - Powering the in-app "Horários TUB em Tempo Real" board cleanly with abortable requests.
 * - Logging every API call with structured info-level parameters via logger.js.
 */

import { APP_CONFIG } from './config.js';
import { logCall } from './logger.js';

/**
 * Performs a JSON GET request against the local `/api/tub` backend proxy.
 *
 * @param {string} endpoint - Endpoint path relative to `APP_CONFIG.tubLive.apiBase`.
 * @param {AbortSignal} [signal] - Optional AbortSignal for cancelling stale requests.
 * @returns {Promise<any>} Parsed JSON response payload.
 */
async function requestTubApi(endpoint, signal) {
  const url = `${APP_CONFIG.tubLive.apiBase}${endpoint}`;
  logCall('requestTubApi', { url });

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(payload.error || `HTTP ${response.status}`);
    err.code = payload.code || 'HTTP_ERROR';
    err.status = response.status;
    throw err;
  }

  return payload;
}

/**
 * Fetches curated featured Braga TUB stops.
 *
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ stops: Array<object> }>} Featured stops response.
 */
export function fetchFeaturedTubStops(signal) {
  logCall('fetchFeaturedTubStops');
  return requestTubApi('/featured-stops', signal);
}

/**
 * Searches TUB stops by text query.
 *
 * @param {string} query - Stop name search string.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ stops: Array<object>, mode: string }>} Matching TUB stops.
 */
export function searchTubStopsByName(query, signal) {
  logCall('searchTubStopsByName', { query });
  const encoded = encodeURIComponent(String(query || '').trim());
  return requestTubApi(`/stops?q=${encoded}`, signal);
}

/**
 * Discovers nearest TUB stops around given GPS coordinates in Braga.
 *
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ stops: Array<object>, mode: string }>} Nearby stops sorted by distance.
 */
export function fetchNearbyTubStops(lat, lon, signal) {
  logCall('fetchNearbyTubStops', { lat: Number(lat).toFixed(4), lon: Number(lon).toFixed(4) });
  return requestTubApi(`/stops?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`, signal);
}

/**
 * Fetches upcoming TUB departures for a specific stop ID.
 *
 * @param {{ stopId: string, line?: string, limit?: number, signal?: AbortSignal }} params - Query parameters.
 * @returns {Promise<object>} Normalized departures payload.
 */
export function fetchTubDepartures({ stopId, line = '', limit = APP_CONFIG.tubLive.defaultDepartureLimit, signal }) {
  logCall('fetchTubDepartures', { stopId, line: line || null, limit });
  const qs = new URLSearchParams({
    stopId,
    n: String(limit)
  });
  if (line) {
    qs.set('line', line);
  }
  return requestTubApi(`/departures?${qs.toString()}`, signal);
}

/**
 * Fetches all currently circulating TUB lines across Braga.
 *
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<object>} Active lines payload.
 */
export function fetchActiveTubLines(signal) {
  logCall('fetchActiveTubLines');
  return requestTubApi('/lines', signal);
}

/**
 * Fetches the full stop-by-stop schedule for a single TUB trip.
 *
 * @param {string} tripId - Validated TUB trip identifier.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<object>} Trip stop timeline payload.
 */
export function fetchTubTripSchedule(tripId, signal) {
  logCall('fetchTubTripSchedule', { tripId });
  return requestTubApi(`/trip?tripId=${encodeURIComponent(tripId)}`, signal);
}

/**
 * Searches Braga TUB stops, landmarks, and addresses for origin/destination autocomplete.
 *
 * @param {string} query - Free-text Braga place or stop name.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ places: Array<object> }>} Matching Braga places and stops.
 */
export function searchBragaTubPlaces(query, signal) {
  logCall('searchBragaTubPlaces', { query });
  const encoded = encodeURIComponent(String(query || '').trim());
  return requestTubApi(`/places?q=${encoded}`, signal);
}

/**
 * Plans live TUB bus journeys from origin to destination inside Braga.
 *
 * @param {{ from: string, to: string, signal?: AbortSignal }} params - Route parameters.
 * @returns {Promise<object>} Normalized live bus itineraries.
 */
export function planTubBusRoute({ from, to, signal }) {
  logCall('planTubBusRoute', { from, to });
  const qs = new URLSearchParams({ from, to });
  return requestTubApi(`/plan?${qs.toString()}`, signal);
}
