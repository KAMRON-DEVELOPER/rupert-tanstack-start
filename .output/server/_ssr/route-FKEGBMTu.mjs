import { n as clsx } from '../_libs/class-variance-authority+clsx.mjs'
import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  f as linkOptions,
  o as Outlet
} from '../_libs/@tanstack/react-router+[...].mjs'
import { t as useScrollDirection } from './useScrollDirection-CiV8-4EP.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/route-FKEGBMTu.js
var import_jsx_runtime = require_jsx_runtime()
var BottomPillTabs = ({ tabs }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: clsx(
      'fixed bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300',
      useScrollDirection() === 'down' ? 'translate-y-24' : 'translate-y-0'
    ),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('nav', {
      className:
        'bg-muted/50 flex items-center justify-between rounded-full border p-1 backdrop-blur-sm',
      children: tabs.map(({ label, exact, ...linkProps }, i) => {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Link,
          {
            ...linkProps,
            activeOptions: { exact },
            children: ({ isActive }) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                className: clsx(
                  'btn-sm',
                  !isActive &&
                    'text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent'
                ),
                children: label
              })
          },
          i
        )
      })
    })
  })
}
var tabs = linkOptions([
  {
    to: '/work/vacancies',
    label: 'Vacancies'
  },
  {
    to: '/work/companies',
    label: 'Companies'
  }
])
var WorkTabs = () =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomPillTabs, { tabs })
var WorkPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'grid min-h-screen gap-8 px-8 md:grid-cols-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkTabs, {})
    ]
  })
}
var SplitComponent = WorkPage
//#endregion
export { SplitComponent as component }
