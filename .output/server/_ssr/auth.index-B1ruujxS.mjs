import { o as __toESM } from '../_runtime.mjs'
import {
  O as require_jsx_runtime,
  k as require_react
} from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  m as useNavigate,
  p as useRouteContext
} from '../_libs/@tanstack/react-router+[...].mjs'
import { C as EyeOff, S as Eye } from '../_libs/lucide-react.mjs'
import {
  n as SiGoogle,
  r as SiGithub
} from '../_libs/icons-pack__react-simple-icons.mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import { t as Input } from './input-BAnSrTfB.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as BASE_URL } from './primitives-BmQBoQXc.mjs'
import { t as getErrorMessage } from './helper-CcD2XA6A.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import { t as useEmailAuthMutation } from './auth-D06X9tzE.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/auth.index-B1ruujxS.js
var import_react = /* @__PURE__ */ __toESM(require_react())
var import_jsx_runtime = require_jsx_runtime()
var AuthPage = () => {
  const navigate = useNavigate()
  const { api } = useRouteContext({ from: '__root__' })
  const mutation = useEmailAuthMutation(api)
  const [email, setEmail] = (0, import_react.useState)('')
  const [password, setPassword] = (0, import_react.useState)('')
  const [firstName, setFirstName] = (0, import_react.useState)(null)
  const [lastName, setLastName] = (0, import_react.useState)(null)
  const [showPassword, setShowPassword] = (0, import_react.useState)(false)
  const [showNamesField, setShowNamesField] = (0, import_react.useState)(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    await mutation.mutateAsync(
      {
        email,
        password,
        firstName: firstName || void 0,
        lastName: lastName || void 0
      },
      {
        onSuccess: (res) => {
          if ('email' in res) {
            toast.success('You authenticated successfully!')
            setTimeout(() => {
              navigate({
                to: '/',
                replace: true
              })
            }, 500)
          } else if (res.kind === 'new_user') setShowNamesField(true)
          else toast.error(res.message)
        },
        onError: (err) => {
          if (isAxiosError(err))
            toast.error(
              getErrorMessage(err.response?.data, 'Authentication failed')
            )
          else toast.error('Authentication failed')
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
              children: 'Welcome to Rupert'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'text-sm',
              children: showNamesField
                ? 'Complete your profile'
                : 'Sign in or create account'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          onSubmit: handleSubmit,
          className: 'space-y-3.5',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              id: 'email',
              name: 'email',
              type: 'email',
              placeholder: 'Email',
              defaultValue: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              autoComplete: 'email',
              className: 'h-10'
            }),
            showNamesField &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_jsx_runtime.Fragment,
                {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'fname',
                      name: 'fname',
                      type: 'text',
                      placeholder: 'First name',
                      defaultValue: firstName ?? '',
                      onChange: (e) => setFirstName(e.target.value),
                      required: true,
                      autoComplete: 'given-name',
                      className: 'h-10'
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      id: 'lname',
                      name: 'lname',
                      type: 'text',
                      placeholder: 'Last name',
                      defaultValue: lastName ?? '',
                      onChange: (e) => setLastName(e.target.value),
                      required: true,
                      autoComplete: 'family-name',
                      className: 'h-10'
                    })
                  ]
                }
              ),
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
                  autoComplete: showNamesField
                    ? 'new-password'
                    : 'current-password',
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
                : showNamesField
                  ? 'Create Account'
                  : 'Continue'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          className: 'flex items-center gap-px',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'bg-border h-px grow'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
              className: 'text-muted-foreground mx-3 text-xs',
              children: 'or continue with'
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              className: 'bg-border h-px grow'
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuthButtons, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermsNotice, {})
      ]
    })
  })
}
var SocialAuthButtons = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'flex flex-col space-y-2.5',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
        onClick: () => (window.location.href = `${BASE_URL}users/auth/google`),
        variant: 'outline',
        className: 'flex h-10 w-full items-center justify-center gap-2 text-sm',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiGoogle, {
            className: 'h-4 w-4'
          }),
          'Continue with Google'
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
        onClick: () => (window.location.href = `${BASE_URL}users/auth/github`),
        variant: 'outline',
        className: 'flex h-10 w-full items-center justify-center gap-2 text-sm',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiGithub, {
            className: 'h-4 w-4'
          }),
          'Continue with GitHub'
        ]
      })
    ]
  })
}
var TermsNotice = () => {
  const linkClass =
    'underline underline-offset-2 transition-colors hover:text-foreground'
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
    className: 'text-muted-foreground text-center text-xs',
    children: [
      'By continuing, you agree to the',
      ' ',
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
        to: '/terms',
        className: linkClass,
        children: 'Terms of Service'
      }),
      ' ',
      'and',
      ' ',
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
        to: '/privacy',
        className: linkClass,
        children: 'Privacy Policy'
      }),
      '.'
    ]
  })
}
var SplitComponent = AuthPage
//#endregion
export { SplitComponent as component }
