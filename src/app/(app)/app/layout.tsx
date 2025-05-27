import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { Pet } from '@/lib/types';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch pets data');
  }
  const petsData: Pet[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <Container>
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={petsData}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </Container>
    </>
  );
}
