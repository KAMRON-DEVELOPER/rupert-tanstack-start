import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import { d as Link } from '../_libs/@tanstack/react-router+[...].mjs'
import { h as MapPin, w as Code } from '../_libs/lucide-react.mjs'
import {
  i as CardTitle,
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Bxb2BF8H.js
var import_jsx_runtime = require_jsx_runtime()
var ADMIN_SECTIONS = [
  {
    title: 'Locations',
    description: 'Manage countries and city records.',
    to: '/admin/locations',
    icon: MapPin
  },
  {
    title: 'Skills',
    description: 'Manage platform skill taxonomy.',
    to: '/admin/skills',
    icon: Code
  }
]
function AdminDashboard() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'space-y-6',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
            className: 'text-3xl font-bold tracking-tight',
            children: 'Admin Dashboard'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            className: 'text-muted-foreground',
            children: 'Manage platform reference data.'
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        className: 'grid gap-4 md:grid-cols-2',
        children: ADMIN_SECTIONS.map((section) =>
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Link,
            {
              to: section.to,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                className: 'hover:bg-muted/50 h-full transition-colors',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                    className:
                      'flex flex-row items-center justify-between space-y-0',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                        className: 'text-base',
                        children: section.title
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        section.icon,
                        { className: 'text-muted-foreground h-4 w-4' }
                      )
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                      className: 'text-muted-foreground text-sm',
                      children: section.description
                    })
                  })
                ]
              })
            },
            section.to
          )
        )
      })
    ]
  })
}
var SplitComponent = AdminDashboard
//#endregion
export { SplitComponent as component }
