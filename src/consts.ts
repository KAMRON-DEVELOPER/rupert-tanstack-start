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

const PROD = import.meta.env.PROD
export const SERVER_ADDR = PROD
  ? 'https://rupert.uz'
  : 'http://192.168.10.11:8000'
export const BASE_URL = `${SERVER_ADDR}/api/v1/`
