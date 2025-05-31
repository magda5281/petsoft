import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';
import { Toaster } from '@/components/ui/sonner';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/db';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pets = await prisma.pet.findMany();

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
