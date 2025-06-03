'use server';

import { signIn } from '@/lib/auth';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

// ---user actions ---

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  //retr
  //return result of your signin function
  return await signIn('credentials', authData);
}
//-----pet actions ----
export async function addPet(pet: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet); // Validate the pet data against the schema

  if (!validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: 'Could not add pet',
    };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, pet: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: 'Invalid pet data',
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: 'Could not update pet',
    };
  }
  revalidatePath('/app', 'layout');
}

export async function deletePet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet ID',
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: 'Could not delete pet',
    };
  }
  revalidatePath('/app', 'layout');
}
