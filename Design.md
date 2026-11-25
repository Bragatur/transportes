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

The application is served via Express (`server.js`) on port `3000`, with modular ES scripts under `/public/js/` and logos under `/public/logos/`, ensuring `npm run build` bundles everything cleanly into `dist/`.

| File | Responsibility |
| --- | --- |
| `/index.html` | Semantic HTML5 layout, Braga gold/slate theme, top-right language switcher, compact section header, segmented tabs, instant search bar, hairline-divided accordions, and reduced-motion CSS rules. |
| `/public/js/config.js` | Centralized configuration: supported languages, `localStorage` keys, loader timeout, URL hash routes (`#viajar`, `#cidade`), accordion exclusivity flag, operator logo inventory, and localized external URLs. |
| `/public/js/logger.js` | Structured `console.info` call logger (`logCall`) with inline-data sanitization (`sanitizeLogParam`). |
| `/public/js/translations.js` | Complete 4-language dictionary (`PT`, `EN`, `ES`, `FR`) covering page title, meta description, hero copy, segmented tabs, search strings, accordion headings, contextual tips, card labels & subtitles, footer, and the full GDPR Privacy Policy. |
| `/public/js/i18n.js` | Language detection (`localStorage` -> `navigator.language` -> `pt`), persistence, DOM/meta/link/placeholder localization, and top-right accessible language switcher. |
| `/public/js/accordions.js` | Exclusive accordion mode (opening a category closes siblings outside search) and dynamic inline item counts (`· N`). |
| `/public/js/search.js` | Real-time accent-insensitive service filtering across card titles, subtitles, headings, and multilingual keywords, with auto-expanding matches and cross-section discovery prompt. |
| `/public/js/navigation.js` | Smooth view transitions between Home, *Viajar para Braga*, and *Na Cidade*, compact section header toggle (`main.in-section`), segmented tab switching, clickable Visit Braga brand mark, and browser history sync (`popstate`). |
| `/public/js/privacyModal.js` | Accessible Privacy Policy modal dialog with backdrop dismissal, `Escape` key closing, scroll lock, and keyboard focus restoration. |
| `/public/js/loader.js` | Resilient splash preloader for the hero background photograph with `onload`, `onerror`, cached-image check, and safety timeout fallback. |
| `/public/js/main.js` | Application bootstrap entry point wiring i18n, logo fallbacks, accordions, search, navigation, modal, and loader. |
| `/scripts/test.mjs` | Non-destructive read-only test script (`npm test`) validating translation parity, DOM IDs, operator logo assets, HTTPS/clean external links, `rel="noopener noreferrer"`, and utility functions. |
