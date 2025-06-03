import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { petFormSchema, TPetForm } from '@/lib/validations';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            name: selectedPet?.name || '',
            ownerName: selectedPet?.ownerName || '',
            imageUrl: selectedPet?.imageUrl || DEFAULT_PET_IMAGE,
            age: selectedPet?.age || 0,
            notes: selectedPet?.notes || '',
          }
        : undefined,
    // mode: 'onBlur',
    // reValidateMode: 'onChange',
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;
        if (actionType === 'add') {
          await handleAddPet(petData);
        } else if (actionType === 'edit' && selectedPet) {
          await handleEditPet(selectedPet?.id, petData);
        }
      }}
    >
      <div className='flex flex-col gap-3 '>
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' {...register('name')} />
        </div>
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        <div className='space-y-1'>
          <Label htmlFor='ownerName'>Owner name</Label>
          <Input id='ownerName' {...register('ownerName')} />
        </div>
        {errors.ownerName && (
          <p className='text-red-500'>{errors.ownerName.message}</p>
        )}
        <div className='space-y-1'>
          <Label htmlFor='imageUrl'>Image Url</Label>
          <Input id='imageUrl' {...register('imageUrl')} />
        </div>
        {errors.imageUrl && (
          <p className='text-red-500'>{errors.imageUrl?.message}</p>
        )}
        <div className='space-y-1'>
          <Label htmlFor='age'>Age</Label>
          <Input id='age' {...register('age')} />
        </div>
        {errors.age && <p className='text-red-500'>{errors.age?.message}</p>}
        <div className='space-y-1'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' {...register('notes')} rows={3} />
        </div>
        {errors.notes && (
          <p className='text-red-500'>{errors.notes?.message}</p>
        )}
        <PetFormBtn actionType={actionType} />
      </div>
    </form>
  );
}
