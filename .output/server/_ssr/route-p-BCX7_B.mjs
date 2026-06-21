import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import { o as Outlet } from '../_libs/@tanstack/react-router+[...].mjs'
import { t as Navbar } from './Navbar-Dl-TZVsZ.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/route-p-BCX7_B.js
var import_jsx_runtime = require_jsx_runtime()
function RouteComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('main', {
        className: 'pt-12 md:pt-14',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
      })
    ]
  })
}
//#endregion
export { RouteComponent as component }
