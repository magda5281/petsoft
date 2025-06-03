import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { Session } from 'next-auth';

export async function checkAuth(): Promise<Session> {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/login');
    throw new Error('Redirecting to /login');
  }
  return session;
}
