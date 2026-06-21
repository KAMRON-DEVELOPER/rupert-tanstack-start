import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import {
  d as Link,
  p as useRouteContext
} from '../_libs/@tanstack/react-router+[...].mjs'
import { t as Button } from './button-DMup9fK5.mjs'
import {
  i as CardTitle,
  n as CardContent,
  r as CardHeader,
  t as Card
} from './card-Dl6-vnQ9.mjs'
import { n as toast } from '../_libs/sonner.mjs'
import { t as ApplicationStatusList } from './literals-DmvvSYvr.mjs'
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  r as SelectItem,
  t as Select$1
} from './select-BXkScN6D.mjs'
import { f as useUpdateApplicationMutation } from './vacancies-BeZCF-vN.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/ApplicationCard-6YWFvyHX.js
var import_jsx_runtime = require_jsx_runtime()
var ApplicationCard = ({ application }) => {
  const { api } = useRouteContext({ from: '__root__' })
  const updateApplication = useUpdateApplicationMutation(api)
  const updateStatus = async (status) => {
    try {
      await updateApplication.mutateAsync({
        id: application.id,
        data: { status }
      })
      toast.success('Application updated')
    } catch {
      toast.error('Failed to update application')
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    size: 'sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
            to: '/work/applications/$id',
            params: { id: application.id },
            className: 'hover:underline',
            children: application.vacancy.title
          })
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
        className: 'space-y-3',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'text-muted-foreground text-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                children: application.vacancy.company.name
              }),
              application.resume &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                  children: ['Resume: ', application.resume.title]
                })
            ]
          }),
          application.coverLetter &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              className: 'line-clamp-3 text-sm',
              children: application.coverLetter
            }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            className: 'flex items-center gap-2',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
                value: application.status,
                onValueChange: (value) => updateStatus(value),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                    className: 'w-40',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      SelectValue,
                      {}
                    )
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                    children: ApplicationStatusList.map((status) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        SelectItem,
                        {
                          value: status,
                          children: status
                        },
                        status
                      )
                    )
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                asChild: true,
                variant: 'outline',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                  to: '/work/applications/$id',
                  params: { id: application.id },
                  children: 'Details'
                })
              })
            ]
          })
        ]
      })
    ]
  })
}
//#endregion
export { ApplicationCard as t }
