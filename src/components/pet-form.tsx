import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { useForm } from 'react-hook-form';
import { PetEssentials } from '@/lib/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  ownerName: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Image url must be a valid url' }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive()
    .max(99999, { message: 'Age must be valid number' }),
  notes: z.union([
    z.literal(''),
    z.string().trim().max(1000, { message: 'Enter maximum 1000 characters' }),
  ]),
});

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<PetEssentials>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          age: parseInt(formData.get('age') as string),
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
          notes: formData.get('notes') as string,
        };
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
