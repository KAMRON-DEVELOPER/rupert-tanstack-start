import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { createApi } from '@/services/api';
import { isAxiosError } from 'axios';

export function getRouter() {
  //* Query instances via `useQuery` or `useInfiniteQuery` by default consider cached data as stale.
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401 && router) {
          if (typeof window === 'undefined') return;

          const pathname = router.state.location.pathname;
          if (pathname === '/auth') return;

          router.navigate({
            to: '/auth',
            search: { redirect: router.state.location.href },
            replace: true,
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        if (typeof window === 'undefined') return;

        const pathname = router.state.location.pathname;
        if (pathname === '/auth') return;

        if (isAxiosError(err) && err.response?.status === 401 && router) {
          router.navigate({
            to: '/auth',
            search: { redirect: router.state.location.href },
            replace: true,
          });
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

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
      api,
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
