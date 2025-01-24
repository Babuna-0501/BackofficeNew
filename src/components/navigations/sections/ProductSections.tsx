import CoreCreateButton from '@/components/core/CoreCreateButton';

function ProductSections() {
  return (
    <div className='flex gap-4'>
      <CoreCreateButton text='Нэг бүтээгдэхүүн бүртгэх' pathname='/product/create' />
    </div>
  );
}

export default ProductSections;
