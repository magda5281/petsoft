'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
//TODO: do we need it as separate component?
export default function AuthFormBtn({ type }: { type: 'login' | 'signup' }) {
  const { pending } = useFormStatus();
  return (
    <Button className='self-start' disabled={pending}>
      {type === 'login' ? 'Log In' : 'Sign Up'}
    </Button>
  );
}
