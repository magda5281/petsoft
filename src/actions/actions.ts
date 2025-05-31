'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addPet(formData: FormData) {
  await prisma.pet.create({
    data: {
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      age: parseInt(formData.get('age') as string),
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      notes: formData.get('notes') as string,
    },
  });
  revalidatePath('/app', 'layout');
}
