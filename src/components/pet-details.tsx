'use client';
import { usePetContext } from '@/lib/hooks';
import Image from 'next/image';
import EmptyView from './empty-view';
import PetButton from './pet-button';
import { Pet } from '@prisma/client';

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className='flex flex-col w-full h-full'>
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}
type Props = { pet: Pet };
function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className='flex items-center gap-4 bg-white px-8 py-5  border-b border-light'>
      <Image
        src={pet?.imageUrl || ''}
        alt='Pet image'
        height={75}
        width={75}
        className='object-cover w-[75px] h-[75px] rounded-full'
      />
      <h2 className='text-3xl font-semibold leading-7ml-5 '>{pet?.name}</h2>
      <div className='ml-auto space-x-2'>
        <PetButton actionType='edit'> Edit</PetButton>
        <PetButton
          actionType='checkout'
          onClick={async () => {
            await handleCheckoutPet(pet.id);
          }}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className='flex justify-around py-10 px-5 text-center '>
      <div>
        <h3 className='text-[0.8rem] text-zinc-700 uppercase font-medium'>
          Owner name
        </h3>
        <p className='mt-1 text-lg text-zinc-800 '>
          {pet?.ownerName || 'No owner name provided'}
        </p>
      </div>
      <div>
        <h3 className='text-[0.8rem] text-zinc-700 uppercase font-medium'>
          Age
        </h3>
        <p className='mt-1 text-lg text-zinc-800  '>
          {pet?.age || 'No owner name'}
        </p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className='flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light'>
      {pet?.notes}
    </section>
  );
}
