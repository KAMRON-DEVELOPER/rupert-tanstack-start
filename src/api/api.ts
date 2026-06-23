import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_URL } from '@/consts'

export function createAxiosInstance(
  config: AxiosRequestConfig = {}
): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 4000,
    ...config
  })
}

export type CreateApi = <T>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<T>

export function createApi(): CreateApi {
  const instance = createAxiosInstance()

  return (url, config = {}) => instance(url, config).then((r) => r.data)
}
