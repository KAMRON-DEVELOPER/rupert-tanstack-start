/*
 * `beforeLoad` and `loader` can run on the server during SSR.
 *
 * On the server, we can't use a relative base URL like `/api/v1/`
 * because there is no browser origin to resolve it against.
 *
 * In the browser, a relative base URL is fine, so we use `/api/v1/`.
 * During SSR, we use an absolute URL instead.
 *
 * Vite produces two separate bundles: a client bundle and a server bundle.
 * In each bundle, `import.meta.env.SSR` is statically replaced at build time:
 * Client bundle → SSR is replaced with `false` → code becomes `/api/v1/`
 * Server bundle → SSR is replaced with `true` → code becomes the absolute URL
 */

const IS_PROD = import.meta.env.PROD;
export const BASE_URL = IS_PROD ? import.meta.env.VITE_API_URL || 'https://rupert.uz/api/v1/' : 'http://localhost:8080/api/v1/';
export const COOKIE_URL = IS_PROD ? 'https://rupert.uz' : 'http://localhost:8080';
