import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        // e.g. look up user in your DB using credentials.email / credentials.password
        // If valid, return { id, name, email, ... }; otherwise return null or throw.
        const { email, password } = credentials || {};
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error('No user found with the given email');
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          throw new Error('Invalid credentials');
          return null;
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: async ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');
      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
