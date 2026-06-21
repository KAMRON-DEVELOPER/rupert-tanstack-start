import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/posts.index-DNnw5-GL.js
var import_jsx_runtime = require_jsx_runtime()
var PostList = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'col-span-3 border-x'
  })
}
var PostLeftSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    className: 'p-8'
  })
}
var PostRightSidebar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {})
}
var PostsPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'grid min-h-screen md:grid-cols-5',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostLeftSidebar, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostList, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostRightSidebar, {})
    ]
  })
}
var SplitComponent = PostsPage
//#endregion
export { SplitComponent as component }
