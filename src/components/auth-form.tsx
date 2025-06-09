'use client';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { logIn, signUp } from '@/actions/actions';
import AuthFormBtn from './auth-form-btn';
import { useFormState } from 'react-dom';

type AuthFormProps = {
  type: 'login' | 'signup';
};
export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

  return (
    <form action={type === 'login' ? dispatchLogIn : dispatchSignUp}>
      <div className='flex flex-col gap-3 '>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            name='email'
            required
            maxLength={100}
            autoComplete='email'
          />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            name='password'
            required
            maxLength={100}
            autoComplete='current-password'
          />
        </div>
        <AuthFormBtn type={type} />
        <p className='text-red-500 text-sm mt-2'>
          {signUpError ? signUpError.message : ''}
          {logInError ? logInError.message : ''}
        </p>
      </div>
    </form>
  );
}
