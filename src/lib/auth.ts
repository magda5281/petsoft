import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';
import { authSchema } from './validations';
const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const validatedFormData = authSchema.safeParse(credentials);

        if (!validatedFormData.success) {
          return null;
        }
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
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

      const hasAccess = auth?.user?.hasAccess;

      const isLoginRoutes =
        request.nextUrl.pathname.includes('/login') ||
        request.nextUrl.pathname.includes('/signup');

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp && !hasAccess) {
        return Response.redirect(new URL('/payment', request.nextUrl));
      }
      if (isLoggedIn && isTryingToAccessApp && hasAccess) {
        return true;
      }
      if (isLoggedIn && isLoginRoutes && hasAccess) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        if (isLoginRoutes && !hasAccess) {
          return Response.redirect(new URL('/payment', request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }
    },
    async jwt({ token, trigger, user }) {
      // On first sign-in, `user.id` is already set as `token.sub` by NextAuth,

      if (user) {
        token.hasAccess = user.hasAccess || false;
      }

      if (trigger === 'update') {
        if (typeof token.email === 'string') {
          const userFromDb = await getUserByEmail(token.email);

          if (userFromDb) {
            token.hasAccess = userFromDb.hasAccess || false;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Copy `token.sub` into `session.user.id`
      // if (token.sub && session.user) {
      session.user.id = token.sub as string;
      session.user.hasAccess = token.hasAccess || false;
      // }
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

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
