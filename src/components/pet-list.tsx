import { type Pet } from '@/lib/types';
import Image from 'next/image';

type PetListProps = Pet[];

export default function PetList({ pets }: { pets: PetListProps }) {
  return (
    <ul className='bg-white border-b border-black/10'>
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className='flex items-center gap-3 w-full cursor-pointer px-5 py-2 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]  focus:outline-none transition '>
            <Image
              src={pet.imageUrl}
              alt='Pet image'
              width={45}
              height={45}
              className='rounded-full object-cover h-[45px] w-[45px] shrink-0'
              loading='lazy'
              unoptimized
              fetchPriority='low'
              priority={false}
              draggable={false}
            />

            <p className='font-semibold'>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
