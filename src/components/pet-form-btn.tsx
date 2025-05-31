import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function PetFormBtn({ actionType }) {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='self-end' disabled={pending}>
      {actionType === 'add' ? 'Add a new pet' : 'Update pet'}
    </Button>
  );
}
