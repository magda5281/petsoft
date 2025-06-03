import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';
import SignOutBtn from '@/components/sign-out-btn';
import { checkAuth } from '@/lib/server-utils';

export default async function AccountPage() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className='my-8 text-white'>Your account</H1>

      <ContentBlock className='h-[32rem] flex items-center justify-center flex-col gap-4'>
        <p>Logged in as {session.user.email} </p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
