import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { addPet } from '@/actions/actions';
import PetFormBtn from './pet-form-btn';
import { toast } from 'sonner';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};
export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        const error = await addPet(formData);
        if (error) {
          toast.warning(error.message);
        }
        onFormSubmission();
      }}
    >
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
        <PetFormBtn actionType={actionType} />
      </div>
    </form>
  );
}
