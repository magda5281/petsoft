import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { checkAuth, getPetsByUserId } from '@/lib/server-utils';
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);

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
    </>
  );
}
