import appCss from '@/styles.css?url';

import type { ReactNode } from 'react';
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { CreateApi } from '@/services/api';
import { TooltipProvider } from '@/components/ui/tooltip';
import { authProbeFn } from '@/services/users/auth.functions';

export type RouterContext = {
  queryClient: QueryClient;
  api: CreateApi;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Rupert',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/RupertSvg.svg' },
    ],
  }),
  beforeLoad: async () => {
    const isAuthenticated = await authProbeFn();
    return { isAuthenticated };
  },
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  let { queryClient } = Route.useRouteContext();

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          storageKey='theme'
          defaultTheme='system'
          attribute='class'
          enableSystem>
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
          <Toaster
            position='top-right'
            theme='dark'
            richColors={false}
            toastOptions={{
              classNames: {
                toast: 'toast-base',
                description: 'text-muted-foreground',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning',
                error: 'toast-error',
              },
            }}
          />
        </ThemeProvider>
        <TanStackRouterDevtools position='bottom-right' />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RootDocument>
  );
}

function NotFoundComponent() {
  return <p>Not Found</p>;
}

function ErrorComponent() {
  return <p className='text-center'>Something went wrong!</p>;
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
  );
}
