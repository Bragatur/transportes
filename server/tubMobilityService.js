/**
 * Feature: TUB Braga Real-Time Bus Schedules & City Mobility API Service
 *
 * Server-side service that integrates with the live city mobility API
 * (Transitous MOTIS carrying the official Transportes Urbanos de Braga GTFS
 * feed, with optional server-side municipal gateway override via environment
 * variables). Provides real-time / live scheduled departures by stop, full
 * stop-by-stop bus itineraries, active circulating TUB lines across Braga,
 * stop & landmark search by name, GPS-based nearby stop discovery, and live
 * point-to-point TUB route planning (origin -> destination -> which bus to catch).
 *
 * Use cases:
 * - Querying upcoming TUB departures at Central, Bom Jesus, Sameiro, CP Station, or any Braga stop.
 * - Planning a trip from any Braga location/GPS/stop to a destination to see which TUB bus line to catch.
 * - Discovering the nearest TUB bus stops from a visitor's current GPS coordinates.
 * - Listing all currently active TUB urban bus lines and inspecting their live stop schedules.
 * - Caching upstream responses briefly in memory to keep mobile lookups fast and resilient.
 */

const DEFAULT_API_BASE_URL = 'https://api.transitous.org';
const TUB_STOP_PREFIX = 'pt-Transportes-Urbanos-de-Braga_';
const BRAGA_TIMEZONE = 'Europe/Lisbon';
const UPSTREAM_TIMEOUT_MS = 10000;
const USER_AGENT = 'VisitBraga-Mobility/1.0 (https://visitbraga.travel)';

/** Braga municipality geographic bounds for GPS validation */
export const BRAGA_BOUNDS = {
  minLat: 41.4,
  maxLat: 41.7,
  minLon: -8.65,
  maxLon: -8.25
};

/** Curated key Braga tourist & commuter TUB stops (real GTFS stop IDs) */
export const FEATURED_TUB_STOPS = [
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_146',
    name: 'Central I (Av. Central)',
    tagKey: 'tubSpotCentral',
    lat: 41.55187,
    lon: -8.419851
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_144',
    name: 'Central III (Centro)',
    tagKey: 'tubSpotCentral3',
    lat: 41.55178,
    lon: -8.42095
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_17',
    name: 'Nova Estação I (CP)',
    tagKey: 'tubSpotTrain',
    lat: 41.54925,
    lon: -8.43485
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_1975',
    name: 'Norton Matos (C. Camionagem)',
    tagKey: 'tubSpotBusTerminal',
    lat: 41.55526,
    lon: -8.42485
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_1',
    name: 'Bom Jesus',
    tagKey: 'tubSpotBomJesus',
    lat: 41.5546,
    lon: -8.3775
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_1051',
    name: 'Santuário (Sameiro)',
    tagKey: 'tubSpotSameiro',
    lat: 41.54026,
    lon: -8.36829
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_370',
    name: 'Universidade do Minho II',
    tagKey: 'tubSpotUminho',
    lat: 41.55758,
    lon: -8.39757
  },
  {
    stopId: 'pt-Transportes-Urbanos-de-Braga_2029',
    name: 'Hospital de Braga',
    tagKey: 'tubSpotHospital',
    lat: 41.5688,
    lon: -8.40166
  }
];

/** Curated Braga landmarks, major avenues, and transit hubs with common Portuguese/tourist aliases */
const BRAGA_KNOWN_PLACES = [
  {
    id: 'braga-av-liberdade',
    placeParam: '41.548851,-8.421593',
    name: 'Avenida da Liberdade (Centro)',
    area: 'Centro · Braga',
    kind: 'place',
    lat: 41.548851,
    lon: -8.421593,
    aliases: ['av da liberdade', 'av liberdade', 'avenida da liberdade', 'avenida liberdade', 'liberdade', 'sao lazaro']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_146',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_146',
    name: 'Central I (Av. Central)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.55187,
    lon: -8.419851,
    aliases: ['av central', 'avenida central', 'central', 'centro', 'centro historico']
  },
  {
    id: 'braga-praca-republica',
    placeParam: '41.551250,-8.422700',
    name: 'Praça da República (Arcada)',
    area: 'Centro · Braga',
    kind: 'place',
    lat: 41.55125,
    lon: -8.4227,
    aliases: ['praca da republica', 'arcada', 'republica', 'chafariz']
  },
  {
    id: 'braga-se-catedral',
    placeParam: '41.549940,-8.426940',
    name: 'Sé de Braga (Catedral)',
    area: 'Centro Histórico · Braga',
    kind: 'place',
    lat: 41.54994,
    lon: -8.42694,
    aliases: ['se', 'se de braga', 'catedral', 'catedral de braga', 'cathedral']
  },
  {
    id: 'braga-arco-porta-nova',
    placeParam: '41.550460,-8.429370',
    name: 'Arco da Porta Nova',
    area: 'Centro Histórico · Braga',
    kind: 'place',
    lat: 41.55046,
    lon: -8.42937,
    aliases: ['arco da porta nova', 'porta nova']
  },
  {
    id: 'braga-santa-barbara',
    placeParam: '41.551100,-8.425950',
    name: 'Jardim de Santa Bárbara',
    area: 'Centro Histórico · Braga',
    kind: 'place',
    lat: 41.5511,
    lon: -8.42595,
    aliases: ['jardim de santa barbara', 'santa barbara']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_1',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_1',
    name: 'Bom Jesus',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5546,
    lon: -8.3775,
    aliases: ['bom jesus', 'bom jesus do monte', 'santuario do bom jesus', 'elevador bom jesus', 'funicular']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_1051',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_1051',
    name: 'Santuário (Sameiro)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.54026,
    lon: -8.36829,
    aliases: ['sameiro', 'santuario do sameiro', 'monte do sameiro']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_17',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_17',
    name: 'Nova Estação I (Estação CP)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.54925,
    lon: -8.43485,
    aliases: ['estacao', 'estacao cp', 'estacao de comboios', 'comboios', 'comboio', 'cp', 'train station', 'gare', 'maximinos']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_1975',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_1975',
    name: 'Norton Matos (Central de Camionagem)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.55526,
    lon: -8.42485,
    aliases: ['central de camionagem', 'camionagem', 'rodoviaria', 'bus terminal', 'norton de matos', 'rede expressos', 'flixbus']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_370',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_370',
    name: 'Universidade do Minho (Gualtar)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.55758,
    lon: -8.39757,
    aliases: ['universidade do minho', 'uminho', 'u minho', 'um', 'gualtar', 'campus de gualtar', 'university']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_2029',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_2029',
    name: 'Hospital de Braga',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5688,
    lon: -8.40166,
    aliases: ['hospital', 'hospital de braga', 'sete fontes']
  },
  {
    id: 'braga-parque',
    placeParam: '41.556708,-8.404594',
    name: 'Braga Parque',
    area: 'São Victor · Braga',
    kind: 'place',
    lat: 41.556708,
    lon: -8.404594,
    aliases: ['braga parque', 'bragaparque', 'shopping', 'centro comercial']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_553',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_553',
    name: 'Nova Arcada',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5792,
    lon: -8.4292,
    aliases: ['nova arcada', 'ikea', 'dume']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_2117',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_2117',
    name: 'Estádio Municipal de Braga',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5623,
    lon: -8.4314,
    aliases: ['estadio', 'estadio municipal', 'estadio de braga', 'pedreira', 'sc braga', 'stadium']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_53',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_53',
    name: 'Parque da Rodovia (João Paulo II)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5512,
    lon: -8.4018,
    aliases: ['rodovia', 'parque da rodovia', 'piscinas da rodovia', 'complexo da rodovia']
  },
  {
    id: 'braga-forum',
    placeParam: '41.540750,-8.422750',
    name: 'Forum Braga (Altice Forum)',
    area: 'São José de São Lázaro · Braga',
    kind: 'place',
    lat: 41.54075,
    lon: -8.42275,
    aliases: ['forum braga', 'altice forum', 'parque de exposicoes', 'peb']
  },
  {
    id: 'braga-theatro-circo',
    placeParam: '41.549550,-8.422280',
    name: 'Theatro Circo',
    area: 'Av. da Liberdade · Braga',
    kind: 'place',
    lat: 41.54955,
    lon: -8.42228,
    aliases: ['theatro circo', 'teatro circo']
  },
  {
    id: 'braga-mercado-municipal',
    placeParam: '41.553540,-8.423750',
    name: 'Mercado Municipal de Braga',
    area: 'Centro · Braga',
    kind: 'place',
    lat: 41.55354,
    lon: -8.42375,
    aliases: ['mercado', 'mercado municipal', 'praca municipal']
  },
  {
    id: 'braga-av-31-janeiro',
    placeParam: '41.547720,-8.416340',
    name: 'Avenida 31 de Janeiro',
    area: 'Braga',
    kind: 'place',
    lat: 41.54772,
    lon: -8.41634,
    aliases: ['31 de janeiro', 'av 31 de janeiro', 'avenida 31 de janeiro']
  },
  {
    id: 'braga-av-joao-xxi',
    placeParam: '41.547360,-8.414320',
    name: 'Avenida João XXI',
    area: 'Braga',
    kind: 'place',
    lat: 41.54736,
    lon: -8.41432,
    aliases: ['joao xxi', 'av joao xxi', 'avenida joao xxi']
  },
  {
    id: 'braga-minho-center',
    placeParam: '41.550410,-8.403610',
    name: 'Minho Center (Lamaçães)',
    area: 'Lamaçães · Braga',
    kind: 'place',
    lat: 41.55041,
    lon: -8.40361,
    aliases: ['minho center', 'minhocenter', 'robert smith', 'av robert smith', 'lamacaes']
  },
  {
    id: 'pt-Transportes-Urbanos-de-Braga_54',
    placeParam: 'pt-Transportes-Urbanos-de-Braga_54',
    name: 'INL (Laboratório Ibérico de Nanotecnologia)',
    area: 'Paragem TUB',
    kind: 'stop',
    lat: 41.5553,
    lon: -8.3991,
    aliases: ['inl', 'nanotecnologia']
  },
  {
    id: 'braga-mosteiro-tibaes',
    placeParam: '41.555480,-8.478920',
    name: 'Mosteiro de Tibães',
    area: 'Mire de Tibães · Braga',
    kind: 'place',
    lat: 41.55548,
    lon: -8.47892,
    aliases: ['tibaes', 'mosteiro de tibaes']
  }
];

const PT_STOP_WORDS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas', 'a', 'o', 'os', 'as',
  'av', 'avenida', 'r', 'rua', 'pr', 'pc', 'praca', 'largo', 'lg', 'travessa', 'tv', 'paragem', 'braga'
]);

/** Simple TTL cache to protect the upstream transit API under burst traffic */
const responseCache = new Map();
/** Cached full list of real Braga TUB bus stops (~1,880 stops) */
let bragaStopsIndexCache = { stops: null, expiresAt: 0 };

/**
 * Logs server-side function invocations at info level without exposing secrets.
 *
 * @param {string} fnName - Name of the function being called.
 * @param {Record<string, unknown>} [params={}] - Non-sensitive call parameters.
 * @returns {void}
 */
function logServerCall(fnName, params = {}) {
  console.info(`[BragaMobility:TUB] ${fnName}`, JSON.stringify(params));
}

/**
 * Validates and resolves the upstream mobility API base URL from environment
 * or falls back to the public Transitous MOTIS API. Rejects non-HTTPS URLs
 * and private/loopback network hosts to prevent SSRF.
 *
 * @returns {string} Validated HTTPS base URL without trailing slash.
 */
export function resolveApiBaseUrl() {
  const configured = (process.env.TUB_MOBILITY_API_URL || '').trim();
  if (!configured) {
    return DEFAULT_API_BASE_URL;
  }

  try {
    const parsed = new URL(configured);
    const host = parsed.hostname.toLowerCase();
    const isBlockedHost =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '0.0.0.0' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

    if (parsed.protocol !== 'https:' || isBlockedHost) {
      console.warn('[BragaMobility:TUB] Ignoring unsafe TUB_MOBILITY_API_URL override; using default.');
      return DEFAULT_API_BASE_URL;
    }

    return parsed.origin + parsed.pathname.replace(/\/+$/, '');
  } catch {
    return DEFAULT_API_BASE_URL;
  }
}

/**
 * Validates whether a stopId belongs strictly to the Braga TUB GTFS namespace.
 *
 * @param {unknown} stopId - Candidate stop identifier.
 * @returns {boolean} True when valid.
 */
export function isValidTubStopId(stopId) {
  return typeof stopId === 'string' && /^pt-Transportes-Urbanos-de-Braga_[A-Za-z0-9_-]{1,32}$/.test(stopId);
}

/**
 * Validates whether a tripId belongs to a Braga TUB trip.
 *
 * @param {unknown} tripId - Candidate trip identifier.
 * @returns {boolean} True when valid.
 */
export function isValidTubTripId(tripId) {
  return (
    typeof tripId === 'string' &&
    tripId.includes('pt-Transportes-Urbanos-de-Braga_') &&
    /^[A-Za-z0-9_:\-]{12,140}$/.test(tripId)
  );
}

/**
 * Validates an optional TUB route/line filter string (e.g., "2", "88", "90").
 *
 * @param {unknown} line - Candidate line short name.
 * @returns {boolean} True when valid.
 */
export function isValidLineFilter(line) {
  return typeof line === 'string' && /^[A-Za-z0-9]{1,8}$/.test(line);
}

/**
 * Checks whether coordinates fall within the Braga municipality bounds.
 *
 * @param {number} lat - Latitude in decimal degrees.
 * @param {number} lon - Longitude in decimal degrees.
 * @returns {boolean} True when inside Braga bounds.
 */
export function isWithinBragaBounds(lat, lon) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= BRAGA_BOUNDS.minLat &&
    lat <= BRAGA_BOUNDS.maxLat &&
    lon >= BRAGA_BOUNDS.minLon &&
    lon <= BRAGA_BOUNDS.maxLon
  );
}

/**
 * Validates a route planner endpoint parameter (`from` or `to`).
 * Accepts either a valid Braga TUB `stopId` or a `"lat,lon"` coordinate pair
 * strictly within Braga municipality bounds.
 *
 * @param {unknown} place - Candidate place parameter.
 * @returns {boolean} True when valid for Braga TUB trip planning.
 */
export function isValidPlanPlace(place) {
  if (typeof place !== 'string') return false;
  const trimmed = place.trim();
  if (isValidTubStopId(trimmed)) {
    return true;
  }
  const match = /^(-?\d{1,2}(?:\.\d{1,7})?),\s*(-?\d{1,2}(?:\.\d{1,7})?)$/.exec(trimmed);
  if (!match) return false;
  return isWithinBragaBounds(Number(match[1]), Number(match[2]));
}

/**
 * Calculates Haversine great-circle distance in meters between two coordinates.
 *
 * @param {number} lat1 - Origin latitude.
 * @param {number} lon1 - Origin longitude.
 * @param {number} lat2 - Target latitude.
 * @param {number} lon2 - Target longitude.
 * @returns {number} Distance in whole meters.
 */
export function computeDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/**
 * Formats an ISO timestamp string as HH:MM in Braga's local timezone (Europe/Lisbon).
 *
 * @param {string | Date} isoTime - ISO timestamp or Date instance.
 * @returns {string} Formatted local time string (e.g., "09:44").
 */
export function extractLisbonClock(isoTime) {
  const date = isoTime instanceof Date ? isoTime : new Date(isoTime);
  if (Number.isNaN(date.getTime())) {
    return '--:--';
  }
  return new Intl.DateTimeFormat('pt-PT', {
    timeZone: BRAGA_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
}

/**
 * Normalizes a raw MOTIS/Transitous stopTime item into a compact departure record.
 *
 * @param {object} item - Raw stopTime entry from upstream API.
 * @param {number} [nowMs=Date.now()] - Reference timestamp in milliseconds.
 * @returns {object} Normalized departure object.
 */
export function normalizeDeparture(item, nowMs = Date.now()) {
  const place = item?.place || {};
  const departureIso = place.departure || place.arrival || place.scheduledDeparture || '';
  const scheduledIso = place.scheduledDeparture || place.scheduledArrival || departureIso;

  const depMs = Date.parse(departureIso);
  const schedMs = Date.parse(scheduledIso);

  const minutesUntil = Number.isFinite(depMs) ? Math.max(0, Math.round((depMs - nowMs) / 60000)) : null;
  const delayMinutes =
    Number.isFinite(depMs) && Number.isFinite(schedMs) ? Math.round((depMs - schedMs) / 60000) : 0;

  return {
    line: String(item?.routeShortName || item?.displayName || '?').trim(),
    routeName: String(item?.routeLongName || '').trim(),
    headsign: String(item?.headsign || item?.tripTo?.name || '').trim(),
    origin: String(item?.tripFrom?.name || '').trim(),
    destination: String(item?.tripTo?.name || '').trim(),
    stopId: String(place.stopId || ''),
    stopName: String(place.name || ''),
    tripId: String(item?.tripId || ''),
    departureIso,
    scheduledIso,
    departureTime: extractLisbonClock(departureIso),
    scheduledTime: extractLisbonClock(scheduledIso),
    minutesUntil,
    delayMinutes,
    realTime: Boolean(item?.realTime),
    cancelled: Boolean(item?.cancelled || item?.tripCancelled || place.cancelled),
    wheelchairAccessible: item?.wheelchairAccessible === 'ACCESSIBLE'
  };
}

/**
 * Performs a cached HTTPS GET request to the configured mobility API.
 *
 * @param {string} pathWithQuery - Relative path starting with '/api/v1/'.
 * @param {number} ttlMs - Cache lifetime in milliseconds.
 * @returns {Promise<any>} Parsed JSON response payload.
 */
async function fetchMobilityJson(pathWithQuery, ttlMs) {
  const now = Date.now();
  const cached = responseCache.get(pathWithQuery);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const baseUrl = resolveApiBaseUrl();
  const url = `${baseUrl}${pathWithQuery}`;
  const headers = {
    Accept: 'application/json',
    'User-Agent': USER_AGENT
  };

  const apiKey = (process.env.TUB_MOBILITY_API_KEY || '').trim();
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  });

  if (!response.ok) {
    throw new Error(`Mobility API responded with status ${response.status}`);
  }

  const data = await response.json();

  // Keep memory bounded if many distinct queries are made
  if (responseCache.size > 150) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
  responseCache.set(pathWithQuery, { data, expiresAt: now + ttlMs });

  return data;
}

/**
 * Returns the curated list of featured Braga TUB stops.
 *
 * @returns {Array<object>} Featured stops list.
 */
export function getFeaturedStops() {
  logServerCall('getFeaturedStops');
  return FEATURED_TUB_STOPS;
}

/**
 * Normalizes Portuguese text for accent-insensitive, punctuation-free search matching.
 *
 * @param {string} text - Input text.
 * @returns {string} Normalized lowercase ASCII-friendly string.
 */
export function normalizeSearchText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,;:/()\-–—]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Expands common Portuguese street/place abbreviations so upstream geocoders
 * (like Transitous MOTIS) recognize queries such as "Av da Liberdade" or "R. do Souto".
 *
 * @param {string} text - Raw user query.
 * @returns {string} Expanded query string.
 */
function expandPortugueseAbbreviations(text) {
  return String(text || '')
    .replace(/\bav\.?\s+/gi, 'Avenida ')
    .replace(/\br\.?\s+/gi, 'Rua ')
    .replace(/\b(?:pr|p[cç])\.?\s+/gi, 'Praça ')
    .replace(/\best\.?\s+/gi, 'Estação ')
    .replace(/\bsta\.?\s+/gi, 'Santa ')
    .replace(/\bsto\.?\s+/gi, 'Santo ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Loads and caches all real TUB bus stops within Braga municipality (~1,880 stops)
 * for instant, accent-insensitive, Braga-only stop lookup.
 *
 * @returns {Promise<Array<{ stopId: string, name: string, normName: string, lat: number, lon: number }>>} Cached Braga TUB stops.
 */
async function getAllBragaTubStops() {
  const now = Date.now();
  if (Array.isArray(bragaStopsIndexCache.stops) && bragaStopsIndexCache.expiresAt > now) {
    return bragaStopsIndexCache.stops;
  }

  try {
    const rawStops = await fetchMobilityJson(
      '/api/v1/map/stops?min=41.45,-8.55&max=41.65,-8.30',
      6 * 60 * 60 * 1000
    );
    const stops = (Array.isArray(rawStops) ? rawStops : [])
      .filter((s) => isValidTubStopId(s?.stopId) && s?.name)
      .map((s) => {
        const name = String(s.name).trim();
        return {
          stopId: s.stopId,
          name,
          normName: normalizeSearchText(name),
          lat: Number(s.lat),
          lon: Number(s.lon)
        };
      });

    if (stops.length > 0) {
      bragaStopsIndexCache = { stops, expiresAt: now + 6 * 60 * 60 * 1000 };
    }
    return stops;
  } catch (error) {
    console.warn('[BragaMobility:TUB] Failed to refresh full Braga stops index:', error.message);
    return Array.isArray(bragaStopsIndexCache.stops) ? bragaStopsIndexCache.stops : [];
  }
}

/**
 * Scores and filters the cached Braga TUB stop index against a user search query.
 *
 * @param {Array<object>} stopsIndex - Cached Braga TUB stops list.
 * @param {string} query - Raw search query.
 * @param {number} [limit=10] - Max results to return.
 * @returns {Array<object>} Ranked matching TUB stops.
 */
function matchLocalTubStops(stopsIndex, query, limit = 10) {
  const normQuery = normalizeSearchText(query);
  if (!normQuery) return [];

  const allTokens = normQuery.split(' ').filter(Boolean);
  const coreTokens = allTokens.filter((t) => !PT_STOP_WORDS.has(t));
  const searchTokens = coreTokens.length > 0 ? coreTokens : allTokens;
  const corePhrase = searchTokens.join(' ');

  const scored = [];
  for (const stop of stopsIndex) {
    let score = 0;
    if (stop.normName === normQuery || stop.normName === corePhrase) {
      score = 120;
    } else if (stop.normName.startsWith(normQuery) || (corePhrase.length >= 2 && stop.normName.startsWith(corePhrase))) {
      score = 95;
    } else if (stop.normName.includes(normQuery) || (corePhrase.length >= 2 && stop.normName.includes(corePhrase))) {
      score = 75;
    } else if (searchTokens.length > 0 && searchTokens.every((t) => stop.normName.includes(t))) {
      score = 60;
    }

    if (score > 0) {
      // Slightly boost central Braga stops so "Liberdade (Igreja S Lázaro)" ranks ahead of distant outskirts
      const distCenter = computeDistanceMeters(41.5518, -8.4198, stop.lat, stop.lon);
      const proximityBonus = distCenter < 2500 ? 10 : distCenter < 5000 ? 5 : 0;
      scored.push({ stop, score: score + proximityBonus, distCenter });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.distCenter - b.distCenter || a.stop.name.localeCompare(b.stop.name));
  return scored.slice(0, limit).map((item) => item.stop);
}

/**
 * Searches real TUB bus stops in Braga by name or by proximity to GPS coordinates.
 *
 * @param {{ query?: string, lat?: number, lon?: number }} options - Search parameters.
 * @returns {Promise<{ stops: Array<object>, mode: 'nearby' | 'search' | 'featured' }>} Matching TUB stops.
 */
export async function searchTubStops({ query = '', lat, lon } = {}) {
  logServerCall('searchTubStops', {
    hasQuery: Boolean(query),
    hasCoords: Number.isFinite(lat) && Number.isFinite(lon)
  });

  if (Number.isFinite(lat) && Number.isFinite(lon)) {
    const deltaLat = 0.008;
    const deltaLon = 0.01;
    const min = `${(lat - deltaLat).toFixed(5)},${(lon - deltaLon).toFixed(5)}`;
    const max = `${(lat + deltaLat).toFixed(5)},${(lon + deltaLon).toFixed(5)}`;
    const rawStops = await fetchMobilityJson(
      `/api/v1/map/stops?min=${encodeURIComponent(min)}&max=${encodeURIComponent(max)}`,
      120000
    );

    const stops = (Array.isArray(rawStops) ? rawStops : [])
      .filter((s) => isValidTubStopId(s.stopId))
      .map((s) => ({
        stopId: s.stopId,
        name: String(s.name || '').trim(),
        lat: Number(s.lat),
        lon: Number(s.lon),
        distanceMeters: computeDistanceMeters(lat, lon, Number(s.lat), Number(s.lon))
      }))
      .sort((a, b) => a.distanceMeters - b.distanceMeters)
      .slice(0, 12);

    return { stops, mode: 'nearby' };
  }

  const cleaned = String(query || '').trim().slice(0, 80);
  if (!cleaned) {
    return { stops: FEATURED_TUB_STOPS, mode: 'featured' };
  }

  // 1. Search complete cached Braga TUB stops index first (instant & accent-insensitive)
  const stopsIndex = await getAllBragaTubStops();
  const localMatches = matchLocalTubStops(stopsIndex, cleaned, 14).map((s) => ({
    stopId: s.stopId,
    name: s.name,
    lat: s.lat,
    lon: s.lon
  }));

  if (localMatches.length > 0) {
    return { stops: localMatches, mode: 'search' };
  }

  // 2. Fallback to Transitous geocode with expanded Portuguese street names + Braga scope
  const expanded = expandPortugueseAbbreviations(cleaned);
  const searchText = /braga/i.test(expanded) ? expanded : `${expanded} Braga`;
  const raw = await fetchMobilityJson(
    `/api/v1/geocode?text=${encodeURIComponent(searchText)}&type=STOP&place=41.5518,-8.4198`,
    180000
  );

  const stops = (Array.isArray(raw) ? raw : [])
    .filter((s) => isValidTubStopId(s.id))
    .map((s) => ({
      stopId: s.id,
      name: String(s.name || '').trim(),
      lat: Number(s.lat),
      lon: Number(s.lon)
    }))
    .slice(0, 14);

  return { stops, mode: 'search' };
}

/**
 * Fetches upcoming TUB departures for a validated Braga stop ID.
 *
 * @param {{ stopId: string, limit?: number, line?: string }} options - Departure query options.
 * @returns {Promise<object>} Normalized stop departures payload.
 */
export async function getStopDepartures({ stopId, limit = 16, line = '' }) {
  logServerCall('getStopDepartures', { stopId, limit, line: line || null });
  const clampedLimit = Math.min(30, Math.max(1, Number(limit) || 16));
  const requestCount = line ? 30 : clampedLimit;
  const raw = await fetchMobilityJson(
    `/api/v1/stoptimes?stopId=${encodeURIComponent(stopId)}&n=${requestCount}`,
    20000
  );

  const nowMs = Date.now();
  const rawList = Array.isArray(raw?.stopTimes) ? raw.stopTimes : [];

  let departures = rawList
    .filter((item) => {
      const id = item?.place?.stopId || item?.routeId || '';
      return id.includes('Transportes-Urbanos-de-Braga') || item?.agencyId === 'TUB';
    })
    .map((item) => normalizeDeparture(item, nowMs));

  const availableLines = [...new Set(departures.map((d) => d.line))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  if (line) {
    const target = line.toUpperCase();
    departures = departures.filter((d) => d.line.toUpperCase() === target);
  }

  departures = departures.slice(0, clampedLimit);

  const featuredMatch = FEATURED_TUB_STOPS.find((s) => s.stopId === stopId);
  const stopName = departures[0]?.stopName || featuredMatch?.name || stopId.replace(TUB_STOP_PREFIX, 'Paragem ');
  const stopLat = rawList[0]?.place?.lat ?? featuredMatch?.lat ?? null;
  const stopLon = rawList[0]?.place?.lon ?? featuredMatch?.lon ?? null;

  return {
    stopId,
    stopName,
    lat: stopLat,
    lon: stopLon,
    timezone: BRAGA_TIMEZONE,
    serverClock: extractLisbonClock(new Date(nowMs)),
    fetchedAt: new Date(nowMs).toISOString(),
    availableLines,
    departures,
    source: 'Transportes Urbanos de Braga (GTFS / Transitous Mobility API)'
  };
}

/**
 * Lists all currently circulating TUB urban bus lines across Braga for the next 60 minutes.
 *
 * @returns {Promise<object>} Active lines summary with live trip counts and sample tripIds.
 */
export async function getActiveTubLines() {
  logServerCall('getActiveTubLines');
  const now = new Date();
  const end = new Date(now.getTime() + 60 * 60 * 1000);
  // Bucket startTime to the current minute so the 30s cache hits reliably
  const startIso = new Date(Math.floor(now.getTime() / 60000) * 60000).toISOString();
  const endIso = new Date(Math.floor(end.getTime() / 60000) * 60000).toISOString();

  const raw = await fetchMobilityJson(
    `/api/v1/map/trips?min=41.48,-8.52&max=41.62,-8.34&zoom=14&startTime=${encodeURIComponent(startIso)}&endTime=${encodeURIComponent(endIso)}`,
    30000
  );

  const byLine = new Map();
  const items = Array.isArray(raw) ? raw : [];

  for (const seg of items) {
    const trip = seg?.trips?.[0];
    if (!trip || !isValidTubTripId(trip.tripId)) continue;

    const line = String(trip.routeShortName || '').trim();
    if (!line) continue;

    let entry = byLine.get(line);
    if (!entry) {
      entry = {
        line,
        tripIds: new Set(),
        sampleTripId: trip.tripId,
        sampleFrom: String(seg?.from?.name || '').trim(),
        sampleTo: String(seg?.to?.name || '').trim(),
        nextDeparture: extractLisbonClock(seg?.departure || ''),
        realTime: Boolean(seg?.realTime)
      };
      byLine.set(line, entry);
    }

    entry.tripIds.add(trip.tripId);
    if (seg?.realTime) {
      entry.realTime = true;
    }
  }

  const lines = [...byLine.values()]
    .map((entry) => ({
      line: entry.line,
      activeTrips: entry.tripIds.size,
      sampleTripId: entry.sampleTripId,
      sampleFrom: entry.sampleFrom,
      sampleTo: entry.sampleTo,
      nextDeparture: entry.nextDeparture,
      realTime: entry.realTime
    }))
    .sort((a, b) => a.line.localeCompare(b.line, undefined, { numeric: true }));

  return {
    timezone: BRAGA_TIMEZONE,
    serverClock: extractLisbonClock(now),
    fetchedAt: now.toISOString(),
    totalActiveLines: lines.length,
    lines
  };
}

/**
 * Fetches the full ordered stop-by-stop schedule for a specific TUB bus trip.
 *
 * @param {string} tripId - Validated TUB trip identifier.
 * @returns {Promise<object>} Normalized trip itinerary with stops and times.
 */
export async function getTubTripSchedule(tripId) {
  logServerCall('getTubTripSchedule', { tripId });
  const raw = await fetchMobilityJson(
    `/api/v1/trip?tripId=${encodeURIComponent(tripId)}`,
    30000
  );

  const leg = raw?.legs?.[0];
  if (!leg) {
    return {
      tripId,
      line: '',
      routeName: '',
      headsign: '',
      realTime: false,
      stops: []
    };
  }

  const nowMs = Date.now();
  const rawStops = [
    leg.from,
    ...(Array.isArray(leg.intermediateStops) ? leg.intermediateStops : []),
    leg.to
  ].filter(Boolean);

  const stops = rawStops.map((stop) => {
    const timeIso = stop.departure || stop.arrival || stop.scheduledDeparture || stop.scheduledArrival || '';
    const timeMs = Date.parse(timeIso);
    return {
      stopId: String(stop.stopId || ''),
      name: String(stop.name || '').trim(),
      lat: Number(stop.lat),
      lon: Number(stop.lon),
      timeIso,
      time: extractLisbonClock(timeIso),
      passed: Number.isFinite(timeMs) ? timeMs < nowMs - 60000 : false,
      cancelled: Boolean(stop.cancelled)
    };
  });

  return {
    tripId,
    line: String(leg.routeShortName || leg.displayName || '').trim(),
    routeName: String(leg.routeLongName || '').trim(),
    headsign: String(leg.headsign || leg.to?.name || '').trim(),
    realTime: Boolean(leg.realTime),
    serverClock: extractLisbonClock(new Date(nowMs)),
    stops
  };
}

/**
 * Searches Braga TUB bus stops, landmarks, avenues, and addresses for origin/destination
 * autocomplete and form resolution. Combines curated Braga places, the complete cached
 * Braga TUB stop index (~1,880 stops), and Braga-scoped Transitous geocoding.
 *
 * @param {{ query: string }} options - Search text options.
 * @returns {Promise<{ places: Array<object> }>} Matching Braga stops and places.
 */
export async function searchBragaPlaces({ query = '' } = {}) {
  const cleaned = String(query || '').trim().slice(0, 80);
  logServerCall('searchBragaPlaces', { hasQuery: Boolean(cleaned) });

  if (cleaned.length < 2) {
    return {
      places: FEATURED_TUB_STOPS.map((s) => ({
        id: s.stopId,
        placeParam: s.stopId,
        name: s.name,
        area: 'Paragem TUB',
        kind: 'stop',
        lat: s.lat,
        lon: s.lon
      }))
    };
  }

  const normQuery = normalizeSearchText(cleaned);
  const expandedQuery = expandPortugueseAbbreviations(cleaned);
  const normExpanded = normalizeSearchText(expandedQuery);
  const queryTokens = normQuery.split(' ').filter((t) => t && !PT_STOP_WORDS.has(t));

  const seen = new Set();
  const places = [];

  const pushUnique = (entry) => {
    const key = `${entry.kind}:${normalizeSearchText(entry.name)}`;
    if (seen.has(key) || seen.has(`param:${entry.placeParam}`)) return;
    seen.add(key);
    seen.add(`param:${entry.placeParam}`);
    places.push(entry);
  };

  // 1. Match curated Braga landmarks, major avenues & transit hubs first
  const knownScored = [];
  for (const spot of BRAGA_KNOWN_PLACES) {
    const normName = normalizeSearchText(spot.name);
    const normAliases = spot.aliases.map(normalizeSearchText);
    let score = 0;

    if (normName === normQuery || normName === normExpanded || normAliases.includes(normQuery) || normAliases.includes(normExpanded)) {
      score = 150;
    } else if (
      normName.startsWith(normQuery) ||
      normName.startsWith(normExpanded) ||
      normAliases.some((a) => a.startsWith(normQuery) || a.startsWith(normExpanded))
    ) {
      score = 120;
    } else if (
      normName.includes(normQuery) ||
      normName.includes(normExpanded) ||
      normAliases.some((a) => a.includes(normQuery) || a.includes(normExpanded) || (normQuery.length >= 4 && normQuery.includes(a)))
    ) {
      score = 95;
    } else if (
      queryTokens.length > 0 &&
      queryTokens.every((t) => normName.includes(t) || normAliases.some((a) => a.includes(t)))
    ) {
      score = 80;
    }

    if (score > 0) {
      knownScored.push({ spot, score });
    }
  }
  knownScored.sort((a, b) => b.score - a.score);
  for (const { spot } of knownScored.slice(0, 4)) {
    pushUnique({
      id: spot.id,
      placeParam: spot.placeParam,
      name: spot.name,
      area: spot.area,
      kind: spot.kind,
      lat: spot.lat,
      lon: spot.lon
    });
  }

  // 2. Match against the complete Braga TUB stops index (~1,880 real stops)
  const stopsIndex = await getAllBragaTubStops();
  const matchedStops = matchLocalTubStops(stopsIndex, cleaned, 6);
  for (const stop of matchedStops) {
    pushUnique({
      id: stop.stopId,
      placeParam: stop.stopId,
      name: stop.name,
      area: 'Paragem TUB',
      kind: 'stop',
      lat: stop.lat,
      lon: stop.lon
    });
    if (places.length >= 10) break;
  }

  // 3. Supplement with Braga-scoped Transitous geocode for any street/address/POI
  if (places.length < 8) {
    try {
      const geoText = /braga/i.test(expandedQuery) ? expandedQuery : `${expandedQuery} Braga`;
      const raw = await fetchMobilityJson(
        `/api/v1/geocode?text=${encodeURIComponent(geoText)}&place=41.5518,-8.4198`,
        180000
      );

      for (const item of Array.isArray(raw) ? raw : []) {
        const lat = Number(item?.lat);
        const lon = Number(item?.lon);
        if (!isWithinBragaBounds(lat, lon)) continue;

        const isTubStop = item?.type === 'STOP' && isValidTubStopId(item?.id);
        if (item?.type === 'STOP' && !isTubStop) continue;

        const name = String(item?.name || '').trim();
        if (!name) continue;

        const placeParam = isTubStop ? item.id : `${lat.toFixed(6)},${lon.toFixed(6)}`;
        const areas = Array.isArray(item?.areas)
          ? item.areas
              .map((a) => String(a?.name || '').trim())
              .filter((a) => a && a.toLowerCase() !== 'portugal')
          : [];

        pushUnique({
          id: String(item.id || placeParam),
          placeParam,
          name,
          area: isTubStop ? 'Paragem TUB' : areas[0] || 'Braga',
          kind: isTubStop ? 'stop' : 'place',
          lat,
          lon
        });

        if (places.length >= 10) break;
      }
    } catch (error) {
      console.warn('[BragaMobility:TUB] Geocode supplement failed:', error.message);
    }
  }

  return { places: places.slice(0, 10) };
}

/**
 * Normalizes a raw Transitous MOTIS itinerary into a clean TUB journey recommendation.
 *
 * @param {object} rawItinerary - Raw itinerary from `/api/v1/plan`.
 * @param {number} [nowMs=Date.now()] - Reference timestamp in milliseconds.
 * @returns {object} Normalized itinerary detailing which TUB bus line(s) to take.
 */
export function normalizeItinerary(rawItinerary, nowMs = Date.now()) {
  const rawLegs = Array.isArray(rawItinerary?.legs) ? rawItinerary.legs : [];
  const startIso = String(rawItinerary?.startTime || '');
  const endIso = String(rawItinerary?.endTime || '');
  const startMs = Date.parse(startIso);
  const durationMinutes = Math.max(1, Math.round((Number(rawItinerary?.duration) || 0) / 60));
  const minutesUntilStart = Number.isFinite(startMs)
    ? Math.max(0, Math.round((startMs - nowMs) / 60000))
    : null;

  const legs = [];
  const busLines = [];
  let hasTubBus = false;
  let hasNonTubTransit = false;
  let anyRealTime = false;
  let anyCancelled = false;

  for (const leg of rawLegs) {
    const mode = String(leg?.mode || '').toUpperCase();
    const isTransit = mode === 'BUS' || mode === 'RAIL' || mode === 'REGIONAL_RAIL' || mode === 'SUBWAY' || mode === 'TRAM';

    if (isTransit) {
      const tripId = String(leg?.tripId || '');
      const isTub =
        leg?.agencyId === 'TUB' ||
        tripId.includes('Transportes-Urbanos-de-Braga') ||
        String(leg?.from?.stopId || '').includes('Transportes-Urbanos-de-Braga');

      if (isTub) {
        hasTubBus = true;
      } else {
        hasNonTubTransit = true;
      }

      const line = String(leg?.routeShortName || leg?.displayName || '?').trim();
      busLines.push(line);
      if (leg?.realTime) anyRealTime = true;
      if (leg?.cancelled) anyCancelled = true;

      const interStops = Array.isArray(leg?.intermediateStops)
        ? leg.intermediateStops.map((s) => ({
            stopId: String(s?.stopId || ''),
            name: String(s?.name || '').trim(),
            time: extractLisbonClock(s?.departure || s?.arrival || s?.scheduledDeparture || '')
          }))
        : [];

      legs.push({
        mode: 'BUS',
        isTub,
        line,
        routeName: String(leg?.routeLongName || '').trim(),
        headsign: String(leg?.headsign || leg?.to?.name || '').trim(),
        fromName: String(leg?.from?.name || '').trim(),
        fromStopId: String(leg?.from?.stopId || ''),
        toName: String(leg?.to?.name || '').trim(),
        toStopId: String(leg?.to?.stopId || ''),
        startTime: extractLisbonClock(leg?.startTime || ''),
        endTime: extractLisbonClock(leg?.endTime || ''),
        durationMinutes: Math.max(1, Math.round((Number(leg?.duration) || 0) / 60)),
        stopsCount: interStops.length + 1,
        realTime: Boolean(leg?.realTime),
        cancelled: Boolean(leg?.cancelled),
        tripId,
        intermediateStops: interStops
      });
    } else if (mode === 'WALK') {
      const dist = Math.round(Number(leg?.distance) || 0);
      const mins = Math.max(1, Math.round((Number(leg?.duration) || 0) / 60));
      // Omit zero-meter internal platform transfer hops unless meaningful
      if (dist === 0 && leg?.from?.name === leg?.to?.name) {
        continue;
      }
      legs.push({
        mode: 'WALK',
        fromName: String(leg?.from?.name || '').trim(),
        toName: String(leg?.to?.name || '').trim(),
        startTime: extractLisbonClock(leg?.startTime || ''),
        endTime: extractLisbonClock(leg?.endTime || ''),
        durationMinutes: mins,
        distanceMeters: dist
      });
    }
  }

  return {
    durationMinutes,
    startTime: extractLisbonClock(startIso),
    endTime: extractLisbonClock(endIso),
    minutesUntilStart,
    transfers: Math.max(0, Number(rawItinerary?.transfers) || 0),
    busLines,
    hasTubBus,
    hasNonTubTransit,
    realTime: anyRealTime,
    cancelled: anyCancelled,
    legs
  };
}

/**
 * Plans real-time TUB bus journeys between an origin and destination in Braga.
 *
 * @param {{ from: string, to: string }} options - Validated origin and destination parameters.
 * @returns {Promise<object>} Normalized live bus route options showing which TUB bus to catch.
 */
export async function planTubJourney({ from, to }) {
  logServerCall('planTubJourney', { from, to });
  const nowMs = Date.now();
  // Bucket time to current minute for short 20s cache deduplication
  const bucketIso = new Date(Math.floor(nowMs / 60000) * 60000).toISOString();

  const raw = await fetchMobilityJson(
    `/api/v1/plan?fromPlace=${encodeURIComponent(from)}&toPlace=${encodeURIComponent(to)}&time=${encodeURIComponent(bucketIso)}&numItineraries=5&transitModes=BUS&maxDirectTime=900`,
    20000
  );

  const normalizedAll = (Array.isArray(raw?.itineraries) ? raw.itineraries : [])
    .map((it) => normalizeItinerary(it, nowMs))
    .filter((it) => it.busLines.length > 0);

  // Prefer pure TUB urban bus itineraries when available
  const pureTub = normalizedAll.filter((it) => it.hasTubBus && !it.hasNonTubTransit);
  const itineraries = (pureTub.length > 0 ? pureTub : normalizedAll).slice(0, 4);

  let directWalk = null;
  const rawDirect = Array.isArray(raw?.direct) ? raw.direct[0] : null;
  if (rawDirect && Number.isFinite(Number(rawDirect.duration))) {
    const walkLeg = Array.isArray(rawDirect.legs) ? rawDirect.legs[0] : null;
    directWalk = {
      durationMinutes: Math.max(1, Math.round(Number(rawDirect.duration) / 60)),
      distanceMeters: Math.round(Number(walkLeg?.distance) || 0)
    };
  }

  return {
    from,
    to,
    timezone: BRAGA_TIMEZONE,
    serverClock: extractLisbonClock(new Date(nowMs)),
    fetchedAt: new Date(nowMs).toISOString(),
    itineraries,
    directWalk
  };
}
