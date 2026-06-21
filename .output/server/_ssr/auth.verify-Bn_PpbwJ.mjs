import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  m as useNavigate,
  u as getRouteApi
} from '../_libs/@tanstack/react-router+[...].mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as getErrorMessage } from './helper-CcD2XA6A.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import { a as useVerifyMutation } from './auth-D06X9tzE.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/auth.verify-Bn_PpbwJ.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var VerifyPage = () => {
  const navigate = useNavigate()
  const route = getRouteApi('/(users)/auth/verify')
  const api = route.useRouteContext().api
  const mutation = useVerifyMutation(api)
  const { token } = route.useSearch()
  ;(0, import_react.useEffect)(() => {
    if (!token) {
      toast.error('Invalid verification link')
      return
    }
    mutation.mutate(
      { token },
      {
        onSuccess: () => {
          toast.success('Email verified successfully')
          setTimeout(() => {
            navigate({
              to: '/',
              replace: true
            })
          }, 500)
        },
        onError: (err) => {
          if (isAxiosError(err))
            toast.error(
              getErrorMessage(err.response?.data, 'Email verification failed')
            )
          else toast.error('Email verification failed')
        }
      }
    )
  }, [token, navigate])
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'flex min-h-screen items-center justify-center',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      className: 'text-center',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          className:
            'mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2'
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          children: 'Verifying your email...'
        })
      ]
    })
  })
}
var SplitComponent = VerifyPage
//#endregion
export { SplitComponent as component }
