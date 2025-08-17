# PetSoft

Cutting‐edge Next.js application for pet daycare management, featuring full CRUD, optimistic UI, server actions, authentication, payments, and seamless database integration (SQLite for local development, PostgreSQL in production via Prisma Data Proxy). Deployed on Vercel.

🔗 **<a href="https://petsoft-wine.vercel.app" target="_blank">Live
Demo</a>**

## 📖 Overview

PetSoft empowers pet daycare owners to:

- Keep track of pets under care (CRUD operations)

- View real‐time data with optimistic UI updates

- Securely authenticate users and manage sessions

- Process payments via Stripe Checkout

- Deploy globally with Vercel and Prisma Accelerate

## 🚀 Features

### Routing & UI

- Private, public, and auth routes: fine‐grained access control using NextAuth callbacks

- Shadcn/ui: accessible, consistent component library for building UI

### Data Management

- Server Components & Actions: fetch data in server layouts, mutate via server actions with revalidatePath for fresh data

- Prisma ORM: SQLite in dev, PostgreSQL in production (Prisma Accelerate/Data Proxy)

- CRUD logic: create, read, update, delete pets in dashboard forms

- Optimistic UI: immediate feedback while server operations complete

- Context API: global search and pets context for state management

### Validation & Types

- Zod schemas: form validation client‐side and server‐side in actions

- TypeScript safety: full typing with Prisma model types

- React Hook Form: unified error handling via useFormState, useFormStatus, and useTransition

### Authentication & Payments

- NextAuth: JWT‐based credentials provider, custom callbacks, and session token updates

**NOTE**
Use any fake test email and password to sign up

- Stripe Checkout: payment flow with success/cancel URLs, webhook verification, add webhook endpoint for production, Sonner notifications

**NOTE**
Use Strapi test card number: 4242 4242 4242 4242
MM/YY any future date
CVC any 3 digit number

### Dev Tools & Patterns

- Env management: .env

- Prisma Migrate & Seed: database migrations, seed scripts for initial data

- NGROK: expose local webhooks to Stripe CLI for testing

- Error Boundaries & 404: planned enhancements

## 🛠️ Tech Stack

- Next.js 14 (App Router, React 18+)

- TypeScript

- Prisma ORM + Prisma Accelerate/Data Proxy

- Shadcn/ui, Lucide icons, Tailwind

- React Hook Form, Zod

- NextAuth.js

- Stripe Node.js SDK, Sonner for toast notifications

- Vercel for hosting & CI
