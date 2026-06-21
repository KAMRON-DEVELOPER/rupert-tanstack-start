import {
  i as getResponseHeaders,
  r as getRequestHeader,
  t as TSS_SERVER_FUNCTION
} from './ssr.mjs'
import { r as createAxiosInstance } from './primitives-BmQBoQXc.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/api.server-DOJ6Jc1U.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = '/_serverFn/' + serverFnMeta.id
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  })
}
function createServerApi() {
  const cookieHeader = getRequestHeader('cookie')
  const headers = {}
  if (cookieHeader) headers.Cookie = cookieHeader
  const instance = createAxiosInstance({ headers })
  return async (url, config = {}) => {
    const res = await instance(url, config)
    const setCookie = res.headers['set-cookie']
    const cookies = Array.isArray(setCookie)
      ? setCookie
      : setCookie
        ? [setCookie]
        : []
    if (cookies.length) {
      const responseHeaders = getResponseHeaders()
      cookies.forEach((c) => responseHeaders.append('set-cookie', c))
    }
    return res.data
  }
}
//#endregion
export { createServerRpc as n, createServerApi as t }
