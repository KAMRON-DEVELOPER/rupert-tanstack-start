import { getRequestHeader, setResponseHeaders } from '@tanstack/react-start/server';
import { createApi } from './api';

export function createServerApi() {
  const requestCookieHeader = getRequestHeader('cookie');

  const api = createApi({
    requestCookieHeader,
    onSetCookieHeaders: (setCookieHeaders) => {
      const headers = new Headers();
      for (const setCookieHeader of setCookieHeaders) {
        headers.append('set-cookie', setCookieHeader);
      }
      setResponseHeaders(headers);
    },
  });

  return api;
}
