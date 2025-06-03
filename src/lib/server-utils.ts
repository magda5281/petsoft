import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { Session } from 'next-auth';
import prisma from '@/lib/db';
import { Pet, User } from '@prisma/client';

export async function checkAuth(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
    throw new Error('Redirecting to /login');
  }
  return session;
}

export async function getPetByPetId(petId: Pet['id']) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
}

export async function getPetsByUserId(userId: User['id']) {
  const pets = await prisma.pet.findMany({
    where: {
      userId: userId,
    },
  });
  return pets;
}

export async function getUserByEmail(email: User['email']) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}
