/**
 * Feature: Express Web Server & Braga Mobility API Gateway
 *
 * Serves the "Mobilidade em Braga — Visit Braga" Progressive Web App on port
 * 3000 and mounts the server-side `/api/tub` proxy router for real-time TUB
 * urban bus schedules, nearby stop lookup, and active line monitoring.
 *
 * Use cases:
 * - Serving index.html, manifest.json, sw.js, and static assets from /public.
 * - Exposing validated `/api/tub/*` JSON endpoints to the frontend.
 */

import express from 'express';
import { createTubRouter } from './server/tubRoutes.js';

const app = express();
const PORT = 3000;

// Real-time TUB Braga mobility API proxy routes
app.use('/api/tub', createTubRouter());

// Prevent direct static downloads of server source, scripts, or config manifests
app.use((req, res, next) => {
  if (/^\/(server|scripts|node_modules|dist)(\/|$)|^\/(package(-lock)?\.json|server\.js|Design\.md)$/i.test(req.path)) {
    return res.status(404).end();
  }
  return next();
});

// Serve static files from the current directory (ignoring dotfiles like .env)
app.use(express.static('.', { dotfiles: 'ignore' }));

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Server running on http://0.0.0.0:${PORT}`);
});
