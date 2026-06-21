import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/feeds.index-Dpwdb_7G.js
var import_jsx_runtime = require_jsx_runtime()
var FeedList = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'col-span-3 border-x'
  })
}
var FeedLeftSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'p-8'
  })
}
var FeedRightSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {})
}
var FeedPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'grid min-h-screen md:grid-cols-5',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedLeftSidebar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedRightSidebar, {})
    ]
  })
}
var SplitComponent = FeedPage
//#endregion
export { SplitComponent as component }
