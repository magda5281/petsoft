'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import DemoHint from './demo-hint';

export default function AuthFormBtn({ type }: { type: 'login' | 'signup' }) {
  const { pending } = useFormStatus();
  return (
    <DemoHint
      className='self-start'
      title="Demo app – please don't use real details"
      hint={
        <>
          <p>Email: e.g. guest123@example.com</p>
          <p>Password: e.g. demo1234 (min. 4 characters)</p>
          <p className='mt-1 opacity-80'>
            No emails are sent. Note your details – there&apos;s no password
            reset.
          </p>
        </>
      }
    >
      <Button disabled={pending}>{type === 'login' ? 'Log In' : 'Sign Up'}</Button>
    </DemoHint>
  );
}
