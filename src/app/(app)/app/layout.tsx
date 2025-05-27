import AppFooter from '@/components/appFooter';
import AppHeader from '@/components/appHeader';
import BackgroundPattern from '@/components/backgroundPattern';
import Container from '@/components/container';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundPattern />
      <Container>
        <AppHeader /> {children} <AppFooter />
      </Container>
    </>
  );
}
