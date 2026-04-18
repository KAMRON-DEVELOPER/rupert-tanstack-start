import { useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';

import { CreateApi } from '@/services/api';
import { Stats } from '@/types/stats';
import type { User } from '@/types/user';
import type { MessageResponse } from '@/types/types';
import { deleteProfileFn, getProfileFn, logoutFn, updateProfileFn } from './auth.functions';

export const useGetProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfileFn(),
  });

export const useGetStatsQueryOptions = (api: CreateApi) =>
  queryOptions({
    queryKey: ['stats'],
    queryFn: () => api<Stats>('users/stats'),
  });

export const useEmailAuthMutation = (api: CreateApi) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { username?: string | null; email: string; password: string }) =>
      api<User | MessageResponse>('users/auth/email', { method: 'POST', data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

export const usePasswordSetupMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: ({ password, token }: { password: string; token: string }) =>
      api<MessageResponse>('users/auth/password-setup', { method: 'POST', data: { password }, params: { token } }),
  });
};

export const useVerifyMutation = (api: CreateApi) => {
  return useMutation({
    mutationFn: (params: { token: string }) => api('users/auth/verify', { method: 'POST', params }),
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: User) => updateProfileFn({ data }),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useDeleteProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProfileFn(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutFn(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
