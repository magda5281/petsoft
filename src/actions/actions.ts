'use server';

import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(formData) {
  await sleep(3000);

  try {
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
  } catch (error) {
    return {
      message: 'Could not add pet',
    };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId, formData) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
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
  } catch (error) {
    return {
      message: 'Could not update pet',
    };
  }
  revalidatePath('/app', 'layout');
}
