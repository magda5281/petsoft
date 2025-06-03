import NextAuth, { NextAuthConfig } from 'next-auth';

const config = {
  providers: [],
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
