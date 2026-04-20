import { queryOptions } from '@tanstack/react-query';
import { getStatsFn } from './stats.functions';

export const useGetStatsQueryOptions = () =>
  queryOptions({
    queryKey: ['stats'],
    queryFn: () => getStatsFn(),
  });
