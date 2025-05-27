import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';

export default function AccountPage() {
  return (
    <main>
      <H1 className='my-8 text-white'>Your account</H1>

      <ContentBlock className='h-[32rem] flex items-center justify-center'>
        <p>logged in </p>
      </ContentBlock>
    </main>
  );
}
