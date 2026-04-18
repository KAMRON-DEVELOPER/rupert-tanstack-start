import { createServerFn } from '@tanstack/react-start';
import { MessageResponse } from '@/types/types';
import { createServerApi } from '@/services/api.server';
import { AuthProbe, User } from '@/types/user';
import { Stats } from '@/types/stats';

export const authProbeFn = createServerFn().handler(async (): Promise<boolean> => {
  const api = createServerApi();

  try {
    const res = await api<AuthProbe>('users/auth/probe');
    return res.isAuthenticated;
  } catch (err) {
    console.error(`🚨 Failed authProbeFn`, err);
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
