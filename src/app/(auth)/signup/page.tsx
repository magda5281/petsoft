import AuthForm from '@/components/auth-form';
import H1 from '@/components/h1';
import Link from 'next/link';

export default function Signup() {
  return (
    <main className='space-y-4'>
      <H1 className='text-center mt-4'>Sign up</H1>
      <AuthForm />
      <p className='text-sm text-muted-foreground'>
        Already have an account?
        <Link
          href='/login'
          className='text-zinc-500 font-medium text-sm hover:underline ml-1'
        >
          Login
        </Link>
      </p>
    </main>
  );
}
