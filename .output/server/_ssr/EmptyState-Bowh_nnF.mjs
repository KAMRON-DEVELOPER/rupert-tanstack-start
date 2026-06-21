import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/EmptyState-Bowh_nnF.js
var import_jsx_runtime = require_jsx_runtime()
var EmptyState = ({ title, description }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'rounded-lg border border-dashed p-4 text-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
        className: 'font-medium',
        children: title
      }),
      description &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
          className: 'text-muted-foreground mt-1',
          children: description
        })
    ]
  })
}
//#endregion
export { EmptyState as t }
