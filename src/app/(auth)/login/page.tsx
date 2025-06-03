import AuthForm from '@/components/auth-form';
import H1 from '@/components/h1';
import Link from 'next/link';

export default function Login() {
  return (
    <main className='space-y-4'>
      <H1 className='text-center mt-4'>Log In</H1>
      <AuthForm type='login' />
      <p className='text-sm text-muted-foreground'>
        Don't have an account?
        <Link
          href='/signup'
          className='text-zinc-500 font-medium text-sm hover:underline ml-1'
        >
          Register here
        </Link>
      </p>
      <p className='text-sm text-muted-foreground'>
        <Link
          href='/forgot-password'
          className='text-zinc-500 font-medium hover:underline'
        >
          Forgot your password?
        </Link>
      </p>
    </main>
  );
}
