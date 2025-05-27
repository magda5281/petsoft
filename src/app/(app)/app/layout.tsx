import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';
import PetContextProvider from '@/contexts/pet-context-provider';

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
  const petsData = await response.json();
  if (!petsData || !Array.isArray(petsData)) {
    throw new Error('Invalid pets data format');
  }
  return (
    <>
      <BackgroundPattern />
      <Container>
        <AppHeader />
        <PetContextProvider data={petsData}>{children}</PetContextProvider>
        <AppFooter />
      </Container>
    </>
  );
}
