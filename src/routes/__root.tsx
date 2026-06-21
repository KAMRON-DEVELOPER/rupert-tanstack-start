import appCss from '@/styles.css?url'

import type { ReactNode } from 'react'
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { CreateApi } from '@/api/api'
import { TooltipProvider } from '@/components/ui/tooltip'
import { WebSocketProvider } from '@/hooks/useWebsocket'
import { useGetCountriesQueryOptions } from '@/api/locations/locations'
import { useGetSkillsQueryOptions } from '@/api/skills/skills'
import { useGetAuthProbeQueryOptions } from '@/api/users/auth'

export type RouterContext = {
  queryClient: QueryClient
  api: CreateApi
  isAuthenticated: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'Rupert'
      }
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/RupertSvg.svg' }
    ]
  }),
  beforeLoad: async ({ context: { queryClient } }) => {
    const isAuthenticated = await queryClient.ensureQueryData(useGetAuthProbeQueryOptions())
    return { isAuthenticated }
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
  const { queryClient, isAuthenticated } = Route.useRouteContext()

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="theme" defaultTheme="system" attribute="class" enableSystem>
          <TooltipProvider>
            {isAuthenticated ? (
              <WebSocketProvider>
                <Outlet />
              </WebSocketProvider>
            ) : (
              <Outlet />
            )}
          </TooltipProvider>
          <Toaster
            position="top-right"
            theme="dark"
            richColors={false}
            toastOptions={{
              classNames: {
                toast: 'toast-base',
                description: 'text-muted-foreground',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning',
                error: 'toast-error'
              }
            }}
          />
        </ThemeProvider>
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </RootDocument>
  )
}

function NotFoundComponent() {
  return <p>Not Found</p>
}

function ErrorComponent() {
  return <p className="text-center">Something went wrong!</p>
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
