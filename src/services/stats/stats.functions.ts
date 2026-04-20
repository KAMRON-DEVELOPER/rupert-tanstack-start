import { Stats } from '@/types/stats';
import { createServerFn } from '@tanstack/react-start';
import { createServerApi } from '@/services/api.server';

export const getStatsFn = createServerFn().handler(async () => {
  const api = createServerApi();
  return api<Stats>('stats');
});
