import { useVerifyMutation } from '@/services/users/auth';
import { isErrorResponse } from '@/types/helper';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';

const VerifyPage = () => {
  const navigate = useNavigate();
  const route = getRouteApi('/(users)/auth/verify');
  const api = route.useRouteContext().api;
  const mutation = useVerifyMutation(api);
  const { token } = route.useSearch();

  useEffect(() => {
    if (!token) {
      toast.error('Invalid verification link');
      return;
    }

    mutation.mutate(
      { token },
      {
        onSuccess: () => {
          toast.success('Email verified successfully');

          setTimeout(() => {
            navigate({ to: '/', replace: true });
          }, 500);
        },
        onError: (err) => {
          if (isAxiosError(err) && isErrorResponse(err.response?.data)) {
            toast.error(err.response?.data.error);
          } else {
            toast.error('Email verification failed');
          }
        },
      },
    );
  }, [token, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='h-12 w-12 mx-auto mb-4 animate-spin rounded-full border-b-2'></div>
        <p>Verifying your email...</p>
      </div>
    </div>
  );
};

export default VerifyPage;
