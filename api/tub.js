/**
 * Feature: Vercel Serverless Function Entry Point for TUB Real-Time Mobility API
 *
 * Mounts the shared validated Express router (`createTubRouter`) as a Vercel
 * Serverless Function at `/api/tub`, handling all `/api/tub/*` endpoints
 * (`/featured-stops`, `/stops`, `/places`, `/plan`, `/departures`, `/lines`,
 * and `/trip`) in production deployments on Vercel without duplicating any
 * routing, validation, or upstream mobility API logic.
 *
 * Security:
 * - Inherits strict Braga stopId, tripId, line, place, and geographic bounds
 *   validation from `server/tubRoutes.js` and `server/tubMobilityService.js`.
 * - Enforces `Cache-Control: no-store` on all live transit responses and
 *   disables the `X-Powered-By` header.
 *
 * Use cases:
 * - Serving real-time TUB bus schedules, GPS nearby stops, active lines, and
 *   destination route planning on Vercel deployments (`*.vercel.app`).
 * - Supporting both full `/api/tub/...` paths (Vercel rewrites) and stripped
 *   subpaths seamlessly.
 */

import express from 'express';
import { createTubRouter } from '../server/tubRoutes.js';

/**
 * Builds the Express application instance exported as the Vercel handler.
 *
 * @returns {import('express').Express} Configured Express app for `/api/tub/*`.
 */
export function createVercelTubApp() {
  const app = express();
  app.disable('x-powered-by');

  const tubRouter = createTubRouter();
  app.use('/api/tub', tubRouter);
  app.use('/', tubRouter);

  return app;
}

const app = createVercelTubApp();

export default app;
