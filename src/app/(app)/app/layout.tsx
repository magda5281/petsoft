import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';
import { Toaster } from '@/components/ui/sonner';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/db';
import { checkAuth } from '@/lib/server-utils';
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id, // Fetch pets for the authenticated user
    },
  });

  return (
    <>
      <BackgroundPattern />
      <Container>
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </Container>
      <Toaster position='top-right' richColors />
    </>
  );
}
