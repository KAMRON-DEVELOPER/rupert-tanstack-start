import { AxiosRequestConfig } from 'axios'
import {
  getRequestHeader,
  getResponseHeaders
} from '@tanstack/react-start/server'
import { createAxiosInstance, CreateApi } from './api'

export function createServerApi(): CreateApi {
  const cookieHeader = getRequestHeader('cookie')

  const headers: Record<string, string> = {}

  if (cookieHeader) {
    headers.Cookie = cookieHeader
  }

  const instance = createAxiosInstance({ headers })

  return async <T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const res = await instance(url, config)

    const setCookie = res.headers['set-cookie']
    const cookies = Array.isArray(setCookie)
      ? setCookie
      : setCookie
        ? [setCookie]
        : []

    if (cookies.length) {
      // getResponseHeaders() is enough because it returns the live response Headers object for
      // the current TanStack/H3 request. Mutating it directly with .append(...) changes
      // the response that will be sent to the browser.
      const responseHeaders = getResponseHeaders()

      // for (const cookie of cookies) {
      //   responseHeaders.append('set-cookie', cookie)
      // }

      cookies.forEach((c) => responseHeaders.append('set-cookie', c))
    }

    return res.data
  }
}
