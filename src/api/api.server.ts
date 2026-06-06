import { AxiosRequestConfig } from 'axios'
import {
  getRequestHeader,
  setResponseHeaders
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
    if (setCookie?.length) {
      const headers = new Headers()
      setCookie.forEach((h) => headers.append('set-cookie', h))
      setResponseHeaders(headers)
    }

    return res.data
  }
}
