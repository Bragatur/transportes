/**
 * Feature: Structured Application Info Logger
 *
 * Provides a lightweight, consistent logging layer used across all modules of
 * the "Mobilidade em Braga" application. Logs function invocations with their
 * sanitized parameters at the `info` level so behavior can be traced cleanly
 * during development and automated testing without leaking large inline data.
 *
 * Use cases:
 * - Recording function entry calls with their parameters via console.info.
 * - Stripping inline base64 or oversized strings before emitting logs.
 * - Allowing tests to run quietly or inspect logged calls cleanly.
 */

/**
 * Strips inline data URIs or overly long payload strings from log parameters.
 *
 * @param {*} value - Arbitrary value passed as a function parameter.
 * @returns {*} Sanitized copy safe for structured info logging.
 */
export function sanitizeLogParam(value) {
  if (typeof value === 'string') {
    if (value.startsWith('data:') && value.includes('base64,')) {
      return '[inline-data-stripped]';
    }
    if (value.length > 240) {
      return `${value.slice(0, 240)}... [truncated]`;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeLogParam);
  }
  if (value && typeof value === 'object') {
    const clean = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === 'inlineData' || key === 'dataUrl') {
        clean[key] = '[inline-data-stripped]';
      } else {
        clean[key] = sanitizeLogParam(val);
      }
    }
    return clean;
  }
  return value;
}

/**
 * Logs a function invocation at info level along with its sanitized parameters.
 *
 * @param {string} functionName - Name of the invoked function.
 * @param {Record<string, *>} [params={}] - Key-value map of function parameters.
 * @returns {void}
 */
export function logCall(functionName, params = {}) {
  const sanitized = sanitizeLogParam(params);
  console.info(`[BragaMobility] ${functionName}`, sanitized);
}
