import Branding from '@/components/branding';
import ContentBlock from '@/components/content-block';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';

export default async function DashboardPage() {
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
        <div className='row-start-2 md:row-span-full col-start-1 col-span-1'>
          <ContentBlock>
            <PetList pets={petsData} />
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
