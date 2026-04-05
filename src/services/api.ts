import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { BASE_URL, COOKIE_DOMAIN, getInternalK8sBaseUrl } from '@/consts';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

type CreateApiOptions = {
  requestCookieHeader?: string;
  onSetCookieHeaders?: (setCookieHeaders: string[]) => void;
};

interface Config extends AxiosRequestConfig {
  _retry?: boolean;
}

export function createApi(options: CreateApiOptions = {}) {
  const { requestCookieHeader, onSetCookieHeaders } = options;

  const jar = new CookieJar();

  if (requestCookieHeader) {
    requestCookieHeader.split(';').forEach((cookie) => {
      jar.setCookieSync(cookie.trim(), COOKIE_DOMAIN);
    });
  }

  const client = wrapper(
    axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      withCredentials: true,
      jar,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  );

  client.interceptors.request.use((config) => {
    const internalUrl = getInternalK8sBaseUrl(config.url ?? '');

    if (internalUrl) {
      config.baseURL = internalUrl;

      // Must manually attach cookies because tough-cookie won't send
      // poddle.uz cookies to the internal k8s cluster domain
      const currentCookies = jar.getCookieStringSync(COOKIE_DOMAIN);
      if (currentCookies) {
        config.headers['Cookie'] = currentCookies;
      } else if (requestCookieHeader) {
        config.headers['Cookie'] = requestCookieHeader;
      }
    }

    return config;
  });

  let refreshPromise: Promise<boolean> | null = null;

  async function api<T>(url: string, cfg: Config = {}): Promise<T> {
    const { _retry, ...customConfig } = cfg;

    try {
      const res = await client.request<T>({ url, ...customConfig });
      return res.data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401 && !_retry) {
        cfg._retry = true;

        if (!refreshPromise) {
          refreshPromise = client
            .post('users/auth/refresh')
            .then((res) => {
              const setCookieHeaders = res.headers['set-cookie'];
              if (setCookieHeaders) {
                setCookieHeaders.forEach((c) => jar.setCookieSync(c, COOKIE_DOMAIN));
                if (onSetCookieHeaders) {
                  onSetCookieHeaders(setCookieHeaders);
                }
              }

              return true;
            })
            .catch(() => false)
            .finally(() => {
              refreshPromise = null;
            });
        }

        const ok = await refreshPromise;

        if (ok) {
          const retryRes = await client.request<T>({
            url,
            ...customConfig,
          });

          return retryRes.data;
        }
      }

      throw error;
    }
  }

  return api;
}

export type CreateApi = ReturnType<typeof createApi>;
