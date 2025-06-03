import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login

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
    authorized: async ({ auth, request }) => {
      //runs on every request
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (isTryingToAccessApp) {
        return isLoggedIn;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      // On first sign-in, `user.id` is already set as `token.sub` by NextAuth,
      // so you don't have to do `token.sub = user.id` again.
      // Just return the token as-is:
      return token;
    },
    async session({ session, token }) {
      // Copy `token.sub` into `session.user.id`
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
