import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePasswordSetupMutation } from '@/services/users/auth';
import { isErrorResponse } from '@/types/helper';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState, SubmitEvent } from 'react';
import { toast } from 'sonner';

const PasswordSetupPage = () => {
  const navigate = useNavigate();
  const route = getRouteApi('/(users)/auth/password-setup');
  const api = route.useRouteContext().api;
  const mutation = usePasswordSetupMutation(api);
  const { token } = route.useSearch();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid password setup link');
      return;
    }

    await mutation.mutateAsync(
      { password, token },
      {
        onSuccess: (res) => {
          toast.success(res.message);

          setTimeout(() => {
            navigate({ to: '/auth', replace: true });
          }, 500);
        },
        onError: (err) => {
          if (isAxiosError(err) && isErrorResponse(err.response?.data)) {
            toast.error(err.response?.data.error);
          } else {
            toast.error('Password setup failed');
          }
        },
      },
    );
  };

  let isLoading = mutation.isPending;

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-[90%] sm:w-[70%] md:w-[40%] lg:w-[25%] space-y-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Password Setup</h1>
          <p className='text-sm'>Set new password</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-3.5'>
          <div className='relative'>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='new-password'
              className='h-10 pr-10'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
              {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
            </button>
          </div>

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full h-10 font-semibold text-primary-foreground transition-all bg-primary hover:bg-primary/90'>
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2' />
                Processing...
              </span>
            ) : (
              'Set new password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordSetupPage;
