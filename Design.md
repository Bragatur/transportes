# Design.md — Mobilidade em Braga (Visit Braga)

## Overview

**Mobilidade em Braga** is the official tourist mobility portal for the Municipality of Braga (Divisão de Turismo — DAET). It helps visitors plan how to travel to Braga and navigate the city easily in four languages (**PT**, **EN**, **ES**, **FR**).

---

## Visual Direction & Design System

- **Braga Institutional Palette**: Deep granite-slate glass surfaces (`rgba(12–22, 14–24, 19–30)`) over full-bleed Braga photography, paired with a warm baroque gold accent (`#e2b866` / `#d4a64f`) for high WCAG AA contrast and unmistakable civic identity.
- **Single-Elevation Discipline**: Eliminates nested "cards within cards" by rendering categories as a single-column editorial list separated by crisp `1px` hairline dividers, reserving card elevation strictly for clickable service items.
- **Zero-Pill Metadata**: Accordion item counts (`· 6`, `· 3`) render as unboxed inline tabular text (`tabular-nums`) rather than bordered chips.
- **Operator Identity**: Integrates real operator logos (`/public/logos/*.webp`, `.jpg`) for CP, CCTB, Rede Expressos, FlixBus, GetBus, Cávado Mobilidade, and AVE Mobilidade with automatic icon fallback (`initLogoFallbacks`), plus subtle category-tinted icons for other services.

---

## Architecture & Module Map

The application is a Progressive Web App (PWA) served via Express (`server.js`) on port `3000`, with modular ES scripts under `/public/js/`, operator logos under `/public/logos/`, and branded PWA PNG icons under `/public/`, ensuring `npm run build` bundles everything cleanly into `dist/`.

| File | Responsibility |
| --- | --- |
| `/index.html` | Semantic HTML5 layout, Braga gold/slate theme, PWA meta/manifest/apple-touch-icon links, top utility bar (*Guia Rápido*, *Instalar App*, language switcher), offline connectivity banner, compact section header, segmented tabs, instant search bar, hairline-divided accordions (*Comboios & Planeador* with Rome2Rio, *Automóvel & Trânsito* with Waze, inline **Horários TUB em Tempo Real** `#tub-live-accordion` at the top of *Na Cidade*, *Transportes Públicos* with TUB & TUB Interactive Map, *Pontos-Chave (GPS)*, *Bom Jesus & Sameiro*, *A Pé & Bicicleta*, *Estacionamento & Autocaravanas* with Park4Night), accessible modals (`#privacy-modal`, `#guide-modal`, `#ios-install-modal`), and reduced-motion CSS rules. |
| `/manifest.json` | Web App Manifest (`id: "/"`, `short_name: "Braga Mov"`, `display: "standalone"`, `theme_color: "#0e1015"`) with separate `192x192`, `512x512` (`any`), and `512x512` (`maskable`) branded PNG icons. |
| `/sw.js` | Root Service Worker (`braga-mobility-v3`) bypassing `/api/*` completely, serving HTML and JS/CSS/JSON assets network-first with cached offline fallback so updates activate immediately without stale-cache breakage, and serving static images/logos/icons cache-first so the Quick Mobility Guide and contacts remain accessible offline. |
| `/public/js/config.js` | Centralized configuration: supported languages, `localStorage` keys, loader timeout, URL hash routes (`#viajar`, `#cidade`), accordion exclusivity flag, PWA paths/icon inventory, operator logo inventory, and localized external URLs (`link-bolt-scooters`, `link-park4night`, etc.). |
| `/public/js/logger.js` | Structured `console.info` call logger (`logCall`) with inline-data sanitization (`sanitizeLogParam`). |
| `/public/js/translations.js` | Complete 4-language dictionary (`PT`, `EN`, `ES`, `FR`) covering page title, meta description, hero copy, utility buttons, offline banner, segmented tabs, search strings, accordion headings, contextual tips, card labels & subtitles, Quick Mobility Guide modal, iOS Safari install guide, footer, and the full GDPR Privacy Policy. |
| `/public/js/i18n.js` | Language detection (`localStorage` -> `navigator.language` -> `pt`), persistence, DOM/meta/link/placeholder localization, and top-right accessible language switcher. |
| `/public/js/accordions.js` | Exclusive accordion mode (opening a category closes siblings outside search) and dynamic inline item counts (`· N`). |
| `/public/js/search.js` | Real-time accent-insensitive service filtering across card titles, subtitles, headings, and multilingual keywords, with auto-expanding matches and cross-section discovery prompt. |
| `/public/js/navigation.js` | Smooth view transitions between Home, *Viajar para Braga*, and *Na Cidade*, compact section header toggle (`main.in-section`), segmented tab switching, clickable Visit Braga brand mark, and browser history sync (`popstate`). |
| `/server.js` | Express web server on port `3000` mounting `/api/tub` proxy routes, restricting direct downloads of server/config files and dotfiles, and serving the PWA shell and static assets. |
| `/server/tubMobilityService.js` | Server-side Braga TUB mobility API integration (Transitous MOTIS carrying the official Transportes Urbanos de Braga GTFS feed, with optional HTTPS `TUB_MOBILITY_API_URL` / `TUB_MOBILITY_API_KEY` override). Handles input validation, Braga geographic bounds checks, Haversine nearby stop sorting, TTL caching, live departures normalization, active circulating lines discovery, Braga place/stop geocoding, full stop-by-stop trip timetables, and point-to-point TUB bus route planning (`planTubJourney`). |
| `/server/tubRoutes.js` | Express REST router exposing validated `Cache-Control: no-store` endpoints: `GET /api/tub/featured-stops`, `GET /api/tub/stops`, `GET /api/tub/places`, `GET /api/tub/plan`, `GET /api/tub/departures`, `GET /api/tub/lines`, and `GET /api/tub/trip`. |
| `/.env.example` | Documents optional server-side environment variables (`TUB_MOBILITY_API_URL`, `TUB_MOBILITY_API_KEY`) without storing secrets. |
| `/public/js/tubApiClient.js` | Browser API client wrapper for `/api/tub/*` (stops, places, route planning, departures, active lines, and trips) with abortable fetches and structured info logging. |
| `/public/js/tubPlanner.js` | Interactive **Destino / Qual o autocarro a apanhar** planner inside the TUB Real-Time panel (`#tub-panel-planner`). Supports origin (Av. Central, GPS current location, or any Braga stop/place), destination autocomplete, 1-tap Braga landmark chips, origin↔destination swap, live TUB line recommendations (direct & transfer legs), walking distances, expandable intermediate stops, and safe `textContent` DOM rendering. |
| `/public/js/tubLive.js` | Interactive **Horários TUB em Tempo Real** panel embedded directly inside *Na Cidade* (`#tub-live-accordion`, collapsed by default and loaded on demand when opened). Coordinates the *Por Paragem*, *Destino*, and *Linhas Ativas* tabs, GPS nearby stop discovery, per-line filtering, platform bay metadata, expandable stop-by-stop itineraries, automatic 30s polling only while visible, safe `textContent` DOM rendering, and full 4-language reactivity. |
| `/public/js/guideModal.js` | Accessible Quick Mobility Guide modal (*Aeroporto ↔ Braga*, TUB tickets & lines, pedestrian distances, highway tolls, offline Tourist Office & 112 contacts) with backdrop dismissal, `Escape` handling, scroll lock, and focus restoration. |
| `/public/js/pwa.js` | Registers `/sw.js` (triggering immediate update checks), captures `beforeinstallprompt` for one-tap installation, detects iOS Safari to show guided Home Screen instructions (`#ios-install-modal`), hides install buttons in standalone mode, and toggles `#offline-banner` on connectivity changes. |
| `/public/js/privacyModal.js` | Accessible Privacy Policy modal dialog with backdrop dismissal, `Escape` key closing, scroll lock, and keyboard focus restoration. |
| `/public/js/loader.js` | Resilient splash preloader for the hero background photograph with `onload`, `onerror`, cached-image check, and safety timeout fallback. |
| `/public/js/main.js` | Application bootstrap entry point wiring i18n, logo fallbacks, accordions, search, inline TUB Live schedules lifecycle (`activateTubLive`/`deactivateTubLive`), navigation, Quick Mobility Guide modal, Privacy modal, PWA manager, and loader. |
| `/scripts/test.mjs` | Non-destructive read-only test script (`npm test`) validating translation parity, DOM IDs, operator logo assets, PWA manifest/SW/icon compliance, TUB mobility service validators/normalizers, HTTPS/clean external links, `rel="noopener noreferrer"`, and utility functions. |
