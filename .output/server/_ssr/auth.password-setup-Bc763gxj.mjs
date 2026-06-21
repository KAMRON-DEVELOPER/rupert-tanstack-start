import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  m as useNavigate,
  u as getRouteApi
} from '../_libs/@tanstack/react-router+[...].mjs'
import { C as EyeOff, S as Eye } from '../_libs/lucide-react.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as getErrorMessage } from './helper-CcD2XA6A.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import { i as usePasswordSetupMutation } from './auth-D06X9tzE.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/auth.password-setup-Bc763gxj.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var PasswordSetupPage = () => {
  const navigate = useNavigate()
  const route = getRouteApi('/(users)/auth/password-setup')
  const api = route.useRouteContext().api
  const mutation = usePasswordSetupMutation(api)
  const { token } = route.useSearch()
  const [password, setPassword] = (0, import_react.useState)('')
  const [showPassword, setShowPassword] = (0, import_react.useState)(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error('Invalid password setup link')
      return
    }
    await mutation.mutateAsync(
      {
        password,
        token
      },
      {
        onSuccess: () => {
          toast.success('Password set successfully')
          setTimeout(() => {
            navigate({
              to: '/auth',
              replace: true
            })
          }, 500)
        },
        onError: (err) => {
          if (isAxiosError(err))
            toast.error(
              getErrorMessage(err.response?.data, 'Password setup failed')
            )
          else toast.error('Password setup failed')
        }
      }
    )
  }
  let isLoading = mutation.isPending
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'flex min-h-screen items-center justify-center',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      className: 'w-[90%] space-y-4 sm:w-[70%] md:w-[40%] lg:w-[25%]',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'text-center',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
              className: 'text-2xl font-semibold',
              children: 'Password Setup'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-sm',
              children: 'Set new password'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-3.5',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              className: 'relative',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  id: 'password',
                  name: 'password',
                  type: showPassword ? 'text' : 'password',
                  placeholder: 'Password',
                  defaultValue: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                  autoComplete: 'new-password',
                  className: 'h-10 pr-10'
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('button', {
                  type: 'button',
                  onClick: () => setShowPassword(!showPassword),
                  className:
                    'text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors',
                  children: showPassword
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
                        className: 'h-4 w-4'
                      })
                    : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
                        className: 'h-4 w-4'
                      })
                })
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              type: 'submit',
              disabled: isLoading,
              className:
                'text-primary-foreground bg-primary hover:bg-primary/90 h-10 w-full font-semibold transition-all',
              children: isLoading
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    className: 'flex items-center justify-center',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        className:
                          'border-primary-foreground/30 border-t-primary-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2'
                      }),
                      'Processing...'
                    ]
                  })
                : 'Set new password'
            })
          ]
        })
      ]
    })
  })
}
var SplitComponent = PasswordSetupPage
//#endregion
export { SplitComponent as component }
