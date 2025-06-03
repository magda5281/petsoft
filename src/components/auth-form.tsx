import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { logIn, signUp } from '@/actions/actions';

type AuthFormProps = {
  type: 'login' | 'signup';
};
export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === 'login' ? logIn : signUp}>
      <div className='flex flex-col gap-3 '>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' name='email' />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' name='password' />
        </div>

        <Button className='self-start'>Log in</Button>
      </div>
    </form>
  );
}
