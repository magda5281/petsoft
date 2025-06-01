import { Button } from './ui/button';

type PetFormBtnProps = {
  actionType: string;
};
export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type='submit' className='self-end'>
      {actionType === 'add' ? 'Add a new pet' : 'Update pet'}
    </Button>
  );
}
