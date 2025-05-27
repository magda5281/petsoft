import Branding from '@/components/branding';
import ContentBlock from '@/components/content-block';
import PetButton from '@/components/pet-button';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';

export default async function DashboardPage() {
  return (
    <main>
      <div className='flex justify-between items-center text-white py-8'>
        <Branding />
        <Stats />
      </div>
      <div
        className='grid grid-rows-[3rem_1fr_1fr]
      md:grid-cols-3 md:grid-rows-[3rem_1fr] gap-4 h-screen md:h-[38rem]'
      >
        <div className='md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1'>
          <SearchForm />
        </div>
        <div className='relative row-start-2 md:row-span-full col-start-1 col-span-1'>
          <ContentBlock>
            <PetList />
            <div className='absolute bottom-4 right-4'>
              <PetButton actionType='add' />
            </div>
          </ContentBlock>
        </div>
        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
