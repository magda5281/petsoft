import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function AuthForm() {
  return (
    <form>
      <div className='flex flex-col gap-3 '>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' />
        </div>

        <Button className='self-start'>Log in</Button>
      </div>
    </form>
  );
}
