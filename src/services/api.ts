import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, COOKIE_URL } from '@/consts';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

type CreateApiOptions = {
  requestCookieHeader?: string;
  onSetCookieHeaders?: (setCookieHeaders: string[]) => void;
};

export function createApi({ requestCookieHeader, onSetCookieHeaders }: CreateApiOptions = {}) {
  const jar = new CookieJar();

  if (requestCookieHeader) {
    requestCookieHeader.split(';').forEach((cookie) => {
      jar.setCookieSync(cookie.trim(), COOKIE_URL);
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

  if (onSetCookieHeaders) {
    client.interceptors.response.use((response) => {
      const setCookie = response.headers['set-cookie'];
      if (setCookie) {
        onSetCookieHeaders(setCookie);
      }
      return response;
    });
  }

  const api = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    const res = await client(url, config);
    return res.data;
  };

  return api;
}

export type CreateApi = ReturnType<typeof createApi>;
