'use server';

import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';
import { checkAuth, getPetByPetId } from '@/lib/server-utils';
import { sleep } from '@/lib/utils';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/validations';
import { Prisma } from '@prisma/client';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

// ---user actions ---
export async function signUp(prevState: unknown, formData: FormData) {
  sleep(2000);
  const data = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(data);

  if (!validatedFormData.success) {
    return { message: 'Invalid sign up credentials' };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    // Handle error, e.g., user already exists
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint failed on the email field
        return { message: 'User already exists' };
      }
    }
    return { message: 'Could not add user' };
  }

  return await signIn('credentials', formData);
}
export async function logIn(prevState: unknown, formData: FormData) {
  //validation on server
  const data = Object.fromEntries(formData.entries()) as Record<
    string,
    unknown
  >;
  const validatedFormData = authSchema.safeParse(data);

  //authentication check
  if (!validatedFormData.success) {
    return { message: 'Could not login' };
  }
  try {
    return await signIn('credentials', formData);
  } catch (error) {
    // Handle error, e.g., invalid credentials
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          // Invalid credentials
          return { message: 'Invalid credentials' };
        }
        case 'OAuthSignInError': {
          // Invalid credentials
          return { message: 'Could not sign in with social media account' };
        }

        default: {
          return { message: 'Error. Invalid credentials' };
        }
      }
    }
    throw error; // Re-throw if it's not an AuthError, nextjs redirect throws error so we need to rethrow it
  }
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

  const existingPet = await getPetByPetId(validatedPetId.data);
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
  const pet = await getPetByPetId(validatedPetId.data);

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
