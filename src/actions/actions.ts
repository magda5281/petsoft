'use server';

import { auth, signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { checkAuth } from '@/lib/server-utils';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// ---user actions ---
export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hashSync(
    formData.get('password') as string,
    10
  );
  const email = formData
    .get('email')
    ?.toString()
    .trim()
    .toLowerCase() as string;

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });
  return await signIn('credentials', formData);
}
export async function logIn(formData: FormData) {
  return await signIn('credentials', formData);
}

export async function logOut() {
  return await signOut({ redirectTo: '/' });
}

//-----pet actions ----
export async function addPet(pet: unknown) {
  //authentication check
  const session = await checkAuth();

  //validation
  const validatedPet = petFormSchema.safeParse(pet); // Validate the pet data against the schema

  if (!validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  //database mutation
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: 'Could not add pet',
    };
  }

  revalidatePath('/app', 'layout');
}

export async function editPet(petId: unknown, pet: unknown) {
  //authentication check
  const session = await checkAuth();
  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  //authorization

  const existingPet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });
  if (!existingPet) {
    return {
      message: 'Pet not found',
    };
  }
  if (existingPet.userId !== session.user.id) {
    return {
      message: 'Not authorized to edit this pet',
    };
  }
  //database mutation
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
  //authentication check
  const session = await checkAuth();
  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet ID',
    };
  }

  //authorization check - permission to mutate data  (user owns pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: 'Pet not found',
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: 'Not authorized to delete this pet',
    };
  }

  //database mutation
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
