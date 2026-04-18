import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { createApi } from '@/services/api';
import { isAxiosError } from 'axios';

function redirectToAuth(router: ReturnType<typeof createRouter>) {
  if (typeof window === 'undefined') return;

  const { pathname, href } = router.state.location;
  if (pathname === '/auth') return;

  router.navigate({
    to: '/auth',
    search: { redirect: href },
    replace: true,
  });
}

export function getRouter() {
  let router: ReturnType<typeof createRouter>;

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          redirectToAuth(router);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        if (typeof window === 'undefined') return;

        const pathname = router.state.location.pathname;
        if (pathname === '/auth') return;

        if (isAxiosError(err) && err.response?.status === 401) {
          redirectToAuth(router);
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, err) => {
          if (isAxiosError(err) && err?.response?.status === 401) {
            return false;
          }
          return failureCount <= 1;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
  const api = createApi();

  router = createRouter({
    routeTree,
    context: {
      queryClient,
      api,
      isAuthenticated: false,
    },
    scrollRestoration: true,
    defaultPreload: 'intent',
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
