import { BASE_URL } from '@/consts';
import { SiGithub, SiGoogle } from '@icons-pack/react-simple-icons';
import { useState, type SubmitEvent } from 'react';
import { useEmailAuthMutation } from '@/services/users/auth';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isErrorResponse } from '@/types/helper';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { api } = useRouteContext({ from: '__root__' });
  const mutation = useEmailAuthMutation(api);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showNamesField, setShowNamesField] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutation.mutateAsync(
      { email, password, firstName, lastName },
      {
        onSuccess: (res) => {
          if ('email' in res) {
            toast.success('You authenticated successfully!');

            setTimeout(() => {
              navigate({ to: '/', replace: true });
            }, 500);
          } else {
            if (res.message === 'new_user') {
              setShowNamesField(true);
            } else {
              toast.error(res.message);
            }
          }
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
          <h1 className='text-2xl font-semibold'>Welcome to Rupert</h1>
          <p className='text-sm'>{showNamesField ? 'Complete your profile' : 'Sign in or create account'}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-3.5'>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
            className='h-10'
          />

          {showNamesField && (
            <>
              <Input
                id='fname'
                name='fname'
                type='text'
                placeholder='First name'
                defaultValue={firstName ?? ''}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete='given-name'
                className='h-10'
              />
              <Input
                id='lname'
                name='lname'
                type='text'
                placeholder='Last name'
                defaultValue={lastName ?? ''}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete='family-name'
                className='h-10'
              />
            </>
          )}

          <div className='relative'>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={showNamesField ? 'new-password' : 'current-password'}
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
            className='w-full h-10 font-semibold text-background transition-all bg-primary hover:bg-primary/90'>
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2' />
                Processing...
              </span>
            ) : showNamesField ? (
              'Create Account'
            ) : (
              'Continue'
            )}
          </Button>
        </form>

        {/* Or Continue With */}
        <div className='flex items-center gap-px'>
          <div className='grow h-px bg-border' />
          <span className='mx-3 text-xs text-muted-foreground'>or continue with</span>
          <div className='grow h-px bg-border' />
        </div>

        <SocialAuthButtons />
        <TermsNotice />
      </div>
    </div>
  );
};

const SocialAuthButtons = () => {
  return (
    <div className='flex flex-col space-y-2.5'>
      <Button
        onClick={() => (window.location.href = `${BASE_URL}users/auth/google`)}
        variant='outline'
        className='w-full h-10 flex items-center justify-center gap-2 text-sm'>
        <SiGoogle className='w-4 h-4' />
        Continue with Google
      </Button>
      <Button
        onClick={() => (window.location.href = `${BASE_URL}users/auth/github`)}
        variant='outline'
        className='w-full h-10 flex items-center justify-center gap-2 text-sm'>
        <SiGithub className='w-4 h-4' />
        Continue with GitHub
      </Button>
    </div>
  );
};

const TermsNotice = () => {
  const linkClass = 'underline underline-offset-2 transition-colors hover:text-foreground';

  return (
    <p className='text-xs text-center text-muted-foreground'>
      By continuing, you agree to the{' '}
      <Link
        to='/terms'
        className={linkClass}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        to='/privacy'
        className={linkClass}>
        Privacy Policy
      </Link>
      .
    </p>
  );
};
