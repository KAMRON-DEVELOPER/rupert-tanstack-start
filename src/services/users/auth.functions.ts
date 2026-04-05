import { createServerFn } from '@tanstack/react-start';
import { isAxiosError } from 'axios';
import type { Tokens, User } from '@/types/user/user';
import { MessageResponse } from '@/types/types';
import { Stats } from '@/types/user/stats';
import { createServerApi } from '@/services/api.server';

export const authProbeFn = createServerFn().handler(async (): Promise<boolean> => {
  const api = createServerApi();

  try {
    await api<User>('users/profile');
    return true;
  } catch (err) {
    console.error(`🚨 Failed authProbeFn`, err);
    if (isAxiosError(err) && err?.response?.status === 401) {
      return false;
    }

    throw err;
  }
});

export const getProfileFn = createServerFn().handler(async () => {
  const api = createServerApi();
  return api<User>('users/profile');
});

export const getStatsFn = createServerFn().handler(async () => {
  const api = createServerApi();
  return api<Stats>('users/stats');
});

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator((data: User) => data)
  .handler(async ({ data }) => {
    const api = createServerApi();
    return api<User>('users/profile', { method: 'PATCH', data });
  });

export const deleteProfileFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi();
  await api('users/profile', { method: 'DELETE' });
  return null;
});

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi();
  return api<MessageResponse>('users/auth/logout', { method: 'POST' });
});

export const refreshFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi();
  return await api<Tokens>('users/auth/refresh', { method: 'POST' });
});
