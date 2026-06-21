import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  g as useParams
} from '../_libs/@tanstack/react-router+[...].mjs'
import { i as useSuspenseQuery } from '../_libs/tanstack__react-query.mjs'
import { t as Separator$1 } from './separator-vCZ5CfjF.mjs'
import {
  i as CardTitle,
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import { o as useGetApplicationQueryOptions } from './vacancies-BeZCF-vN.mjs'
import { t as ApplicationCard } from './ApplicationCard-6YWFvyHX.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/work.applications._id-BhOxyn-p.js
var import_jsx_runtime = require_jsx_runtime()
var ApplicationPage = () => {
  const { data: application } = useSuspenseQuery(
    useGetApplicationQueryOptions(
      useParams({ from: '/(apps)/(work)/work/applications/$id' })
    )
  )
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    className: 'col-span-3 space-y-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationCard, {
        application
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
              children: 'Application details'
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
            className: 'space-y-4 text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'Applicant'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                    children: [
                      application.applicant.firstName,
                      ' ',
                      application.applicant.lastName
                    ]
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'Vacancy'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                    to: '/work/vacancies/$id',
                    params: { id: application.vacancyId },
                    className: 'hover:underline',
                    children: application.vacancy.title
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'Cover letter'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'whitespace-pre-wrap',
                    children: application.coverLetter || 'No cover letter'
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'text-muted-foreground',
                    children: 'Recruiter note'
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    className: 'whitespace-pre-wrap',
                    children: application.recruiterNote || 'No recruiter note'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  })
}
var SplitComponent = ApplicationPage
//#endregion
export { SplitComponent as component }
