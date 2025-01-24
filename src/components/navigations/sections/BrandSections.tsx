import CoreCreateButton from '@/components/core/CoreCreateButton';

function BrandSections() {
  return (
    <div className='flex gap-4'>
      <CoreCreateButton text='Брэнд үүсгэх' pathname='/brand/create' />
    </div>
  );
}

export default BrandSections;
