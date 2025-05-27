'use client';
import { usePetContext, useSearchContext } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();

  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className='bg-white border-b border-light'>
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex items-center gap-3 w-full cursor-pointer px-5 py-2 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2]  focus:outline-none transition',
              {
                'bg-[#eff1f2]': selectedPetId === pet.id,
              }
            )}
          >
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
