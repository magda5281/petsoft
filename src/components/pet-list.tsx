import Image from 'next/image';

export default function PetList() {
  return (
    <ul className='bg-white border-b border-black/10'>
      <li>
        <button className='flex items-center gap-3 w-full cursor-pointer px-5 py-2 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]  focus:outline-none transition '>
          <Image
            src={
              'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png'
            }
            alt='Pet image'
            width={45}
            height={45}
            className='rounded-full object-cover'
            loading='lazy'
            unoptimized
            fetchPriority='low'
            priority={false}
            draggable={false}
          />
          <p className='font-semibold'>Benjamin</p>
        </button>
      </li>
    </ul>
  );
}
