import { n as axios } from '../_libs/axios+[...].mjs'
import { t as zod_default } from '../_libs/zod.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-BmQBoQXc.js
var BASE_URL = `https://rupert.uz/api/v1/`
function createAxiosInstance(config = {}) {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 2500,
    ...config
  })
}
function createApi() {
  const instance = createAxiosInstance()
  return (url, config = {}) => instance(url, config).then((r) => r.data)
}
var uuid = zod_default.uuid()
var isoDateTime = zod_default.iso.datetime({ offset: true })
var isoDate = zod_default.iso.date()
//#endregion
export {
  isoDateTime as a,
  isoDate as i,
  createApi as n,
  uuid as o,
  createAxiosInstance as r,
  BASE_URL as t
}
