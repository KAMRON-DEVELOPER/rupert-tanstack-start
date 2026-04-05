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
export const BASE_URL = import.meta.env.SSR ? `http://localhost:${process.env.PORT || 5173}/api/v1/` : '/api/v1/';

export const COOKIE_DOMAIN = import.meta.env.PROD ? 'https://poddle.uz' : 'http://localhost:5173';

/*
 * Helper to resolve Kubernetes internal URLs in Production.
 * This prevents requests from leaving the cluster.
 */
export const getInternalK8sBaseUrl = (path: string): string | null => {
  if (!import.meta.env.SSR || !import.meta.env.PROD) return null;

  const namespace = 'poddle-system';
  const clusterDomain = 'svc.cluster.local';

  if (path.startsWith('users')) return `http://users-api.${namespace}.${clusterDomain}:80/api/v1/`;
  if (path.startsWith('billing')) return `http://billing-api.${namespace}.${clusterDomain}:80/api/v1/`;
  if (path.startsWith('compute')) return `http://compute-api.${namespace}.${clusterDomain}:80/api/v1/`;

  return null;
};
