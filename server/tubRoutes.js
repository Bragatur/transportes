/**
 * Feature: Express REST Proxy Routes for TUB Real-Time Bus Schedules
 *
 * Exposes validated, cache-controlled JSON endpoints under `/api/tub/*` that
 * proxy Braga's live TUB transit data to the browser without exposing any
 * upstream credentials or accepting arbitrary URLs.
 *
 * Use cases:
 * - `GET /api/tub/featured-stops`: Key tourist & commuter stops in Braga.
 * - `GET /api/tub/stops?q=...` or `?lat=...&lon=...`: Search stops by name or GPS proximity.
 * - `GET /api/tub/departures?stopId=...&line=...&n=...`: Upcoming live/scheduled departures.
 * - `GET /api/tub/lines`: All currently active TUB urban bus lines across Braga.
 * - `GET /api/tub/trip?tripId=...`: Full stop-by-stop schedule for a selected bus trip.
 */

import express from 'express';
import {
  getFeaturedStops,
  searchTubStops,
  searchBragaPlaces,
  getStopDepartures,
  getActiveTubLines,
  getTubTripSchedule,
  planTubJourney,
  isValidTubStopId,
  isValidTubTripId,
  isValidLineFilter,
  isValidPlanPlace,
  isWithinBragaBounds
} from './tubMobilityService.js';

/**
 * Builds and returns the Express router handling `/api/tub/*` endpoints.
 *
 * @returns {import('express').Router} Configured Express router.
 */
export function createTubRouter() {
  const router = express.Router();

  // Never cache live transit responses in proxies or browser HTTP cache
  router.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  router.get('/featured-stops', (_req, res) => {
    res.json({ stops: getFeaturedStops() });
  });

  router.get('/stops', async (req, res) => {
    try {
      const hasCoords = req.query.lat !== undefined || req.query.lon !== undefined;
      if (hasCoords) {
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);
        if (!isWithinBragaBounds(lat, lon)) {
          return res.status(400).json({
            error: 'Coordinates are outside Braga municipality bounds.',
            code: 'OUT_OF_BOUNDS'
          });
        }
        const result = await searchTubStops({ lat, lon });
        return res.json(result);
      }

      const query = typeof req.query.q === 'string' ? req.query.q : '';
      const result = await searchTubStops({ query });
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /stops failed:', error.message);
      return res.status(502).json({ error: 'Unable to fetch TUB stops right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  router.get('/places', async (req, res) => {
    try {
      const query = typeof req.query.q === 'string' ? req.query.q : '';
      const result = await searchBragaPlaces({ query });
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /places failed:', error.message);
      return res.status(502).json({ error: 'Unable to search Braga places right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  router.get('/plan', async (req, res) => {
    try {
      const from = typeof req.query.from === 'string' ? req.query.from.trim() : '';
      const to = typeof req.query.to === 'string' ? req.query.to.trim() : '';

      if (!isValidPlanPlace(from) || !isValidPlanPlace(to)) {
        return res.status(400).json({
          error: 'Origin and destination must be valid Braga TUB stops or coordinates inside Braga.',
          code: 'INVALID_PLACE'
        });
      }

      if (from === to) {
        return res.status(400).json({
          error: 'Origin and destination cannot be identical.',
          code: 'SAME_ORIGIN_DESTINATION'
        });
      }

      const result = await planTubJourney({ from, to });
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /plan failed:', error.message);
      return res.status(502).json({ error: 'Unable to plan TUB route right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  router.get('/departures', async (req, res) => {
    try {
      const stopId = req.query.stopId;
      if (!isValidTubStopId(stopId)) {
        return res.status(400).json({ error: 'Invalid TUB stopId.', code: 'INVALID_STOP_ID' });
      }

      const line = typeof req.query.line === 'string' ? req.query.line.trim() : '';
      if (line && !isValidLineFilter(line)) {
        return res.status(400).json({ error: 'Invalid TUB line filter.', code: 'INVALID_LINE' });
      }

      const limit = req.query.n !== undefined ? Number(req.query.n) : 16;
      const result = await getStopDepartures({ stopId, limit, line });
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /departures failed:', error.message);
      return res.status(502).json({ error: 'Unable to fetch TUB departures right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  router.get('/lines', async (_req, res) => {
    try {
      const result = await getActiveTubLines();
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /lines failed:', error.message);
      return res.status(502).json({ error: 'Unable to fetch active TUB lines right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  router.get('/trip', async (req, res) => {
    try {
      const tripId = req.query.tripId;
      if (!isValidTubTripId(tripId)) {
        return res.status(400).json({ error: 'Invalid TUB tripId.', code: 'INVALID_TRIP_ID' });
      }
      const result = await getTubTripSchedule(tripId);
      return res.json(result);
    } catch (error) {
      console.error('[BragaMobility:TUB] /trip failed:', error.message);
      return res.status(502).json({ error: 'Unable to fetch TUB trip schedule right now.', code: 'UPSTREAM_ERROR' });
    }
  });

  return router;
}
