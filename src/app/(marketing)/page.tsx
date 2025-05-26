import Logo from '@/components/logo';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='bg-[#5dc9a8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 px-3 md:px-10  mx-auto'>
      <Image
        src='https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png'
        alt='PetSoft Hero Image'
        width={519}
        height={472}
        priority
        loading='eager'
        draggable={false}
        unoptimized={true}
        fetchPriority='high'
      />
      <div>
        <Logo />
        <h1 className='text-5xl font-semibold my-6 max-w-[35rem] '>
          Manage your <span className='font-bold'>pet daycare </span> with ease
        </h1>
        <p className='text-2xl font-medium max-w-[37.5rem]'>
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for £299.
        </p>
        <div className='mt-10'></div>
      </div>
    </main>
  );
}
