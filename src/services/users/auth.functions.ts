import { createServerFn } from '@tanstack/react-start';
import { MessageResponse } from '@/types/types';
import { createServerApi } from '@/services/api.server';
import { AuthProbeSchema, UserSchema } from '@/types/user';

export const authProbeFn = createServerFn().handler(async (): Promise<boolean> => {
  const api = createServerApi();

  try {
    const res = await api<AuthProbeSchema>('users/auth/probe');
    return res.isAuthenticated;
  } catch (err) {
    console.error(`🚨 Failed authProbeFn`, err);
    throw err;
  }
});

export const getProfileFn = createServerFn().handler(async () => {
  const api = createServerApi();
  return api<UserSchema>('users');
});

export const updateProfileFn = createServerFn({ method: 'POST' })
  .inputValidator((data: UserSchema) => data)
  .handler(async ({ data }) => {
    const api = createServerApi();
    return api<UserSchema>('users', { method: 'PATCH', data });
  });

export const deleteProfileFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi();
  await api('users', { method: 'DELETE' });
  return null;
});

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const api = createServerApi();
  return api<MessageResponse>('users/auth/logout', { method: 'POST' });
});
