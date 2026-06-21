import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import { u as getRouteApi } from '../_libs/@tanstack/react-router+[...].mjs'
import { i as useSuspenseQuery } from '../_libs/tanstack__react-query.mjs'
import { t as EmptyState } from './EmptyState-Bowh_nnF.mjs'
import { s as useGetApplicationsQueryOptions } from './vacancies-BeZCF-vN.mjs'
import { t as ApplicationCard } from './ApplicationCard-6YWFvyHX.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.applications.index-D5RPuCIi.js
var import_jsx_runtime = require_jsx_runtime()
var ApplicationsPage = () => {
  const {
    data: { data: applications, total }
  } = useSuspenseQuery(
    useGetApplicationsQueryOptions(
      getRouteApi('/(apps)/(work)/work/applications/').useLoaderDeps()
    )
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'col-span-3 space-y-3',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
        className: 'text-sm',
        children: ['Total applications: ', total]
      }),
      applications.length === 0
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
            title: 'No applications found'
          })
        : applications.map((application) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ApplicationCard,
              { application },
              application.id
            )
          )
    ]
  })
}
var SplitComponent = ApplicationsPage
//#endregion
export { SplitComponent as component }
