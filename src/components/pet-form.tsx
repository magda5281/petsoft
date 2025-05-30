import { usePetContext } from '@/lib/hooks';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};
export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };
    actionType === 'edit' && selectedPet
      ? handleEditPet(selectedPet.id, pet)
      : handleAddPet(pet);

    onFormSubmission();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        id='id'
        name='id'
        type='hidden'
        defaultValue={
          actionType === 'edit' && selectedPet ? selectedPet.id : ''
        }
      />
      <div className='flex flex-col gap-3 '>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
            required
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner name</Label>
          <Input
            id='ownerName'
            name='ownerName'
            type='text'
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
            required
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input
            id='imageUrl'
            name='imageUrl'
            type='text'
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            name='age'
            type='number'
            required
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
        </div>{' '}
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea
            id='notes'
            name='notes'
            rows={3}
            required
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
        </div>
        <Button type='submit' className='self-end'>
          {actionType === 'add' ? 'Add a new pet' : 'Update pet'}
        </Button>
      </div>
    </form>
  );
}
