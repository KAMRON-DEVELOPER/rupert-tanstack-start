import { O as require_jsx_runtime } from '../_libs/@base-ui/react+[...].mjs'
import {
  A as redirect,
  a as createRouter,
  c as createFileRoute,
  l as createRootRouteWithContext,
  n as Scripts,
  o as Outlet,
  r as HeadContent,
  s as lazyRouteComponent
} from '../_libs/@tanstack/react-router+[...].mjs'
import {
  c as dehydrate,
  i as MutationCache,
  l as hydrate,
  n as QueryCache,
  t as QueryClient
} from '../_libs/tanstack__query-core.mjs'
import { o as QueryClientProvider } from '../_libs/tanstack__react-query.mjs'
import { t as useGetStatsQueryOptions } from './stats-CNR_NleR.mjs'
import { r as TooltipProvider } from './tooltip-BTCtgc5W.mjs'
import { t as isAxiosError } from '../_libs/axios+[...].mjs'
import { t as zod_default } from '../_libs/zod.mjs'
import { n as createApi } from './primitives-BmQBoQXc.mjs'
import { n as useGetCountriesQueryOptions } from './locations-DBFoHRWi.mjs'
import { t as Toaster } from '../_libs/sonner.mjs'
import { t as useGetSkillsQueryOptions } from './skills-CR1xJB9f.mjs'
import { n as useGetAuthProbeQueryOptions } from './auth-D06X9tzE.mjs'
import { n as companyListParamsSchema } from './company-Ceac0N8k.mjs'
import { n as useGetProfileQueryOptions } from './users-D-YVzfI_.mjs'
import {
  a as useGetFollowRequestsQueryOptions,
  c as useGetSessionsQueryOptions,
  l as useGetUserSkillsQueryOptions,
  o as useGetFollowersQueryOptions,
  s as useGetFollowingQueryOptions,
  u as useGetWorkExperiencesQueryOptions
} from './work-experience-CA1o8zio.mjs'
import { r as useGetResumesQueryOptions } from './resume-DMYamUQJ.mjs'
import {
  r as useGetChatsQueryOptions,
  t as WebSocketProvider
} from './chats-BF_hTLAY.mjs'
import {
  a as vacancyListParamsSchema,
  n as applicationListParamsSchema
} from './vacancy-BU3XEoF-.mjs'
import {
  c as useGetVacanciesQueryOptions,
  l as useGetVacancyQueryOptions,
  o as useGetApplicationQueryOptions,
  s as useGetApplicationsQueryOptions
} from './vacancies-BeZCF-vN.mjs'
import {
  a as useGetCompaniesQueryOptions,
  o as useGetCompanyQueryOptions
} from './companies-DOgslJIC.mjs'
import { t as TanStackRouterDevtools } from '../_libs/@tanstack/react-router-devtools+[...].mjs'
import { t as ReactQueryDevtools2 } from '../_libs/tanstack__react-query-devtools.mjs'
import { t as J } from '../_libs/next-themes.mjs'
//#region node_modules/.nitro/vite/services/ssr/assets/router-DZPMUy-4.js
var import_jsx_runtime = require_jsx_runtime()
var styles_default = '/assets/styles-CD1G04_k.css'
var Route$27 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { title: 'Rupert' }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles_default
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/RupertSvg.svg'
      }
    ]
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    return {
      isAuthenticated: await queryClient.ensureQueryData(
        useGetAuthProbeQueryOptions()
      )
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(useGetCountriesQueryOptions()),
      queryClient.ensureQueryData(useGetSkillsQueryOptions())
    ])
  },
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
})
function RootComponent() {
  const { queryClient, isAuthenticated } = Route$27.useRouteContext()
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      QueryClientProvider,
      {
        client: queryClient,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(J, {
            storageKey: 'theme',
            defaultTheme: 'system',
            attribute: 'class',
            enableSystem: true,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
                children: isAuthenticated
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      WebSocketProvider,
                      {
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          Outlet,
                          {}
                        )
                      }
                    )
                  : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
                position: 'top-right',
                theme: 'dark',
                richColors: false,
                toastOptions: {
                  classNames: {
                    toast: 'toast-base',
                    description: 'text-muted-foreground',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning',
                    error: 'toast-error'
                  }
                }
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TanStackRouterDevtools, {
            position: 'bottom-right'
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactQueryDevtools2, {})
        ]
      }
    )
  })
}
function NotFoundComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
    children: 'Not Found'
  })
}
function ErrorComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
    className: 'text-center',
    children: 'Something went wrong!'
  })
}
function RootDocument({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('html', {
    suppressHydrationWarning: true,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('head', {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('body', {
        suppressHydrationWarning: true,
        children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
        ]
      })
    ]
  })
}
var $$splitComponentImporter$24 = () => import('./route-BZXJD9qM.mjs')
var Route$26 = createFileRoute('/(public)')({
  component: lazyRouteComponent($$splitComponentImporter$24, 'component')
})
var $$splitComponentImporter$23 = () => import('./route-p-BCX7_B.mjs')
var Route$25 = createFileRoute('/(apps)')({
  component: lazyRouteComponent($$splitComponentImporter$23, 'component')
})
var $$splitComponentImporter$22 = () => import('./(public)-DLWtwESp.mjs')
var Route$24 = createFileRoute('/(public)/')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(useGetStatsQueryOptions())
  },
  component: lazyRouteComponent($$splitComponentImporter$22, 'component')
})
var $$splitComponentImporter$21 = () => import('./terms-D6Df-CGP.mjs')
var Route$23 = createFileRoute('/(public)/terms')({
  component: lazyRouteComponent($$splitComponentImporter$21, 'component')
})
var $$splitComponentImporter$20 = () => import('./privacy-CvbbBHBr.mjs')
var Route$22 = createFileRoute('/(public)/privacy')({
  component: lazyRouteComponent($$splitComponentImporter$20, 'component')
})
var $$splitComponentImporter$19 = () => import('./admin-0D1_KAzh.mjs')
var Route$21 = createFileRoute('/(admin)/admin')({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated)
      throw redirect({
        to: '/auth',
        replace: true
      })
    if (
      (await context.queryClient.ensureQueryData(useGetProfileQueryOptions()))
        .role !== 'admin'
    )
      throw redirect({
        to: '/work/vacancies',
        replace: true
      })
  },
  component: lazyRouteComponent($$splitComponentImporter$19, 'component')
})
var $$splitComponentImporter$18 = () => import('./route-FKEGBMTu.mjs')
var Route$20 = createFileRoute('/(apps)/(work)')({
  component: lazyRouteComponent($$splitComponentImporter$18, 'component')
})
var $$splitComponentImporter$17 = () => import('./route-BYhfCLEk.mjs')
var Route$19 = createFileRoute('/(apps)/(messages)')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(useGetChatsQueryOptions()),
  component: lazyRouteComponent($$splitComponentImporter$17, 'component')
})
var $$splitComponentImporter$16 = () => import('./auth.index-B1ruujxS.mjs')
var Route$18 = createFileRoute('/(users)/auth/')({
  beforeLoad: async ({ context }) => {
    if (context.isAuthenticated === true)
      throw redirect({
        to: '/',
        replace: true
      })
  },
  component: lazyRouteComponent($$splitComponentImporter$16, 'component')
})
var $$splitComponentImporter$15 = () => import('./profile.index-BAoULaTf.mjs')
var Route$17 = createFileRoute('/(public)/profile/')({
  loader: async ({ context: { queryClient } }) => {
    return await Promise.all([
      queryClient.ensureQueryData(useGetProfileQueryOptions()),
      queryClient.ensureQueryData(useGetUserSkillsQueryOptions()),
      queryClient.ensureQueryData(useGetResumesQueryOptions()),
      queryClient.ensureQueryData(useGetWorkExperiencesQueryOptions()),
      queryClient.ensureQueryData(useGetSessionsQueryOptions()),
      queryClient.ensureQueryData(
        useGetFollowersQueryOptions({
          offset: 0,
          limit: 10
        })
      ),
      queryClient.ensureQueryData(
        useGetFollowingQueryOptions({
          offset: 0,
          limit: 10
        })
      ),
      queryClient.ensureQueryData(
        useGetFollowRequestsQueryOptions({
          offset: 0,
          limit: 10
        })
      )
    ])
  },
  component: lazyRouteComponent($$splitComponentImporter$15, 'component')
})
var $$splitComponentImporter$14 = () => import('./posts.index-DNnw5-GL.mjs')
var Route$16 = createFileRoute('/(apps)/posts/')({
  component: lazyRouteComponent($$splitComponentImporter$14, 'component')
})
var $$splitComponentImporter$13 = () => import('./feeds.index-Dpwdb_7G.mjs')
var Route$15 = createFileRoute('/(apps)/feeds/')({
  component: lazyRouteComponent($$splitComponentImporter$13, 'component')
})
var $$splitComponentImporter$12 = () => import('./admin.index-Bxb2BF8H.mjs')
var Route$14 = createFileRoute('/(admin)/admin/')({
  component: lazyRouteComponent($$splitComponentImporter$12, 'component')
})
var $$splitComponentImporter$11 = () => import('./auth.verify-Bn_PpbwJ.mjs')
var Route$13 = createFileRoute('/(users)/auth/verify')({
  validateSearch: zod_default.object({ token: zod_default.string().nullish() }),
  beforeLoad: async ({ search }) => {
    if (!search.token) {
      console.warn('Verification token not found')
      throw redirect({
        to: '/',
        replace: true
      })
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$11, 'component')
})
var $$splitComponentImporter$10 = () =>
  import('./auth.password-setup-Bc763gxj.mjs')
var Route$12 = createFileRoute('/(users)/auth/password-setup')({
  validateSearch: zod_default.object({ token: zod_default.string().nullish() }),
  beforeLoad: async ({ search }) => {
    if (!search.token) {
      console.warn('Password setup token not found')
      throw redirect({
        to: '/',
        replace: true
      })
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$10, 'component')
})
var $$splitComponentImporter$9 = () => import('./admin.skills-BuPJkJdX.mjs')
var Route$11 = createFileRoute('/(admin)/admin/skills')({
  component: lazyRouteComponent($$splitComponentImporter$9, 'component')
})
var $$splitComponentImporter$8 = () => import('./admin.locations-CviIsDGF.mjs')
var Route$10 = createFileRoute('/(admin)/admin/locations')({
  component: lazyRouteComponent($$splitComponentImporter$8, 'component')
})
var Route$9 = createFileRoute('/(apps)/(work)/work/')({
  beforeLoad: () => {
    throw redirect({
      to: '/work/vacancies',
      replace: true
    })
  }
})
var Route$8 = createFileRoute('/(apps)/(messages)/messages/')({
  beforeLoad: () => {
    throw redirect({
      to: '/messages/chats',
      replace: true
    })
  }
})
var $$splitComponentImporter$7 = () =>
  import('./work.vacancies.index-DYF4PJT4.mjs')
var Route$7 = createFileRoute('/(apps)/(work)/work/vacancies/')({
  validateSearch: vacancyListParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([
      queryClient.ensureQueryData(useGetVacanciesQueryOptions(deps))
    ])
  },
  component: lazyRouteComponent($$splitComponentImporter$7, 'component')
})
var $$splitComponentImporter$6 = () =>
  import('./work.companies.index-sz5_gqfF.mjs')
var Route$6 = createFileRoute('/(apps)/(work)/work/companies/')({
  validateSearch: companyListParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await Promise.all([
      queryClient.ensureQueryData(useGetCompaniesQueryOptions(deps))
    ])
  },
  component: lazyRouteComponent($$splitComponentImporter$6, 'component')
})
var $$splitComponentImporter$5 = () =>
  import('./work.applications.index-D5RPuCIi.mjs')
var Route$5 = createFileRoute('/(apps)/(work)/work/applications/')({
  validateSearch: applicationListParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(useGetApplicationsQueryOptions(deps))
  },
  component: lazyRouteComponent($$splitComponentImporter$5, 'component')
})
var $$splitComponentImporter$4 = () =>
  import('./messages.groups.index-CMMJGid3.mjs')
var Route$4 = createFileRoute('/(apps)/(messages)/messages/groups/')({
  beforeLoad: () => {
    throw redirect({
      to: '/messages/chats',
      replace: true
    })
  },
  component: lazyRouteComponent($$splitComponentImporter$4, 'component')
})
var $$splitComponentImporter$3 = () =>
  import('./messages.chats.index-BCHd_hor.mjs')
var Route$3 = createFileRoute('/(apps)/(messages)/messages/chats/')({
  component: lazyRouteComponent($$splitComponentImporter$3, 'component')
})
var $$splitComponentImporter$2 = () =>
  import('./work.vacancies._id-BE31f9om.mjs')
var Route$2 = createFileRoute('/(apps)/(work)/work/vacancies/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetVacancyQueryOptions(params))
  },
  component: lazyRouteComponent($$splitComponentImporter$2, 'component')
})
var $$splitComponentImporter$1 = () =>
  import('./work.companies._id-BBX0w0Td.mjs')
var Route$1 = createFileRoute('/(apps)/(work)/work/companies/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetCompanyQueryOptions(params))
  },
  component: lazyRouteComponent($$splitComponentImporter$1, 'component')
})
var $$splitComponentImporter = () =>
  import('./work.applications._id-BhOxyn-p.mjs')
var Route = createFileRoute('/(apps)/(work)/work/applications/$id')({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(useGetApplicationQueryOptions(params))
  },
  component: lazyRouteComponent($$splitComponentImporter, 'component')
})
var publicRouteRoute = Route$26.update({
  id: '/(public)',
  getParentRoute: () => Route$27
})
var appsRouteRoute = Route$25.update({
  id: '/(apps)',
  getParentRoute: () => Route$27
})
var publicIndexRoute = Route$24.update({
  id: '/',
  path: '/',
  getParentRoute: () => publicRouteRoute
})
var publicTermsRoute = Route$23.update({
  id: '/terms',
  path: '/terms',
  getParentRoute: () => publicRouteRoute
})
var publicPrivacyRoute = Route$22.update({
  id: '/privacy',
  path: '/privacy',
  getParentRoute: () => publicRouteRoute
})
var adminAdminRoute = Route$21.update({
  id: '/(admin)/admin',
  path: '/admin',
  getParentRoute: () => Route$27
})
var appsworkRouteRoute = Route$20.update({
  id: '/(work)',
  getParentRoute: () => appsRouteRoute
})
var appsmessagesRouteRoute = Route$19.update({
  id: '/(messages)',
  getParentRoute: () => appsRouteRoute
})
var usersAuthIndexRoute = Route$18.update({
  id: '/(users)/auth/',
  path: '/auth/',
  getParentRoute: () => Route$27
})
var publicProfileIndexRoute = Route$17.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => publicRouteRoute
})
var appsPostsIndexRoute = Route$16.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => appsRouteRoute
})
var appsFeedsIndexRoute = Route$15.update({
  id: '/feeds/',
  path: '/feeds/',
  getParentRoute: () => appsRouteRoute
})
var adminAdminIndexRoute = Route$14.update({
  id: '/',
  path: '/',
  getParentRoute: () => adminAdminRoute
})
var usersAuthVerifyRoute = Route$13.update({
  id: '/(users)/auth/verify',
  path: '/auth/verify',
  getParentRoute: () => Route$27
})
var usersAuthPasswordSetupRoute = Route$12.update({
  id: '/(users)/auth/password-setup',
  path: '/auth/password-setup',
  getParentRoute: () => Route$27
})
var adminAdminSkillsRoute = Route$11.update({
  id: '/skills',
  path: '/skills',
  getParentRoute: () => adminAdminRoute
})
var adminAdminLocationsRoute = Route$10.update({
  id: '/locations',
  path: '/locations',
  getParentRoute: () => adminAdminRoute
})
var appsworkWorkIndexRoute = Route$9.update({
  id: '/work/',
  path: '/work/',
  getParentRoute: () => appsworkRouteRoute
})
var appsmessagesMessagesIndexRoute = Route$8.update({
  id: '/messages/',
  path: '/messages/',
  getParentRoute: () => appsmessagesRouteRoute
})
var appsworkWorkVacanciesIndexRoute = Route$7.update({
  id: '/work/vacancies/',
  path: '/work/vacancies/',
  getParentRoute: () => appsworkRouteRoute
})
var appsworkWorkCompaniesIndexRoute = Route$6.update({
  id: '/work/companies/',
  path: '/work/companies/',
  getParentRoute: () => appsworkRouteRoute
})
var appsworkWorkApplicationsIndexRoute = Route$5.update({
  id: '/work/applications/',
  path: '/work/applications/',
  getParentRoute: () => appsworkRouteRoute
})
var appsmessagesMessagesGroupsIndexRoute = Route$4.update({
  id: '/messages/groups/',
  path: '/messages/groups/',
  getParentRoute: () => appsmessagesRouteRoute
})
var appsmessagesMessagesChatsIndexRoute = Route$3.update({
  id: '/messages/chats/',
  path: '/messages/chats/',
  getParentRoute: () => appsmessagesRouteRoute
})
var appsworkWorkVacanciesIdRoute = Route$2.update({
  id: '/work/vacancies/$id',
  path: '/work/vacancies/$id',
  getParentRoute: () => appsworkRouteRoute
})
var appsworkWorkCompaniesIdRoute = Route$1.update({
  id: '/work/companies/$id',
  path: '/work/companies/$id',
  getParentRoute: () => appsworkRouteRoute
})
var appsworkWorkApplicationsIdRoute = Route.update({
  id: '/work/applications/$id',
  path: '/work/applications/$id',
  getParentRoute: () => appsworkRouteRoute
})
var appsmessagesRouteRouteChildren = {
  appsmessagesMessagesIndexRoute,
  appsmessagesMessagesChatsIndexRoute,
  appsmessagesMessagesGroupsIndexRoute
}
var appsmessagesRouteRouteWithChildren =
  appsmessagesRouteRoute._addFileChildren(appsmessagesRouteRouteChildren)
var appsworkRouteRouteChildren = {
  appsworkWorkIndexRoute,
  appsworkWorkApplicationsIdRoute,
  appsworkWorkCompaniesIdRoute,
  appsworkWorkVacanciesIdRoute,
  appsworkWorkApplicationsIndexRoute,
  appsworkWorkCompaniesIndexRoute,
  appsworkWorkVacanciesIndexRoute
}
var appsRouteRouteChildren = {
  appsmessagesRouteRoute: appsmessagesRouteRouteWithChildren,
  appsworkRouteRoute: appsworkRouteRoute._addFileChildren(
    appsworkRouteRouteChildren
  ),
  appsFeedsIndexRoute,
  appsPostsIndexRoute
}
var appsRouteRouteWithChildren = appsRouteRoute._addFileChildren(
  appsRouteRouteChildren
)
var publicRouteRouteChildren = {
  publicPrivacyRoute,
  publicTermsRoute,
  publicIndexRoute,
  publicProfileIndexRoute
}
var publicRouteRouteWithChildren = publicRouteRoute._addFileChildren(
  publicRouteRouteChildren
)
var adminAdminRouteChildren = {
  adminAdminLocationsRoute,
  adminAdminSkillsRoute,
  adminAdminIndexRoute
}
var rootRouteChildren = {
  appsRouteRoute: appsRouteRouteWithChildren,
  publicRouteRoute: publicRouteRouteWithChildren,
  adminAdminRoute: adminAdminRoute._addFileChildren(adminAdminRouteChildren),
  usersAuthPasswordSetupRoute,
  usersAuthVerifyRoute,
  usersAuthIndexRoute
}
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes()
function getRouter() {
  const api = createApi()
  function redirectToAuth() {
    if (typeof window === 'undefined') return
    const { pathname, href } = router.state.location
    if (pathname === '/auth') return
    router.navigate({
      to: '/auth',
      search: { redirect: href },
      replace: true
    })
  }
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401)
          redirectToAuth()
      }
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        if (isAxiosError(err) && err.response?.status === 401) redirectToAuth()
      }
    }),
    defaultOptions: {
      queries: {
        staleTime: 6e4,
        refetchOnWindowFocus: false,
        retry: 0
      },
      mutations: { retry: 0 }
    }
  })
  let router = createRouter({
    routeTree,
    context: {
      queryClient,
      api,
      isAuthenticated: false
    },
    hydrate: (dehydrated) => {
      hydrate(queryClient, dehydrated.queryClientState)
    },
    dehydrate: () => ({ queryClientState: dehydrate(queryClient) }),
    scrollRestoration: true,
    defaultPreload: 'intent'
  })
  return router
}
//#endregion
export { getRouter }
