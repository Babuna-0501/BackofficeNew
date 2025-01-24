import BrandBoard from '@/components/brand/BrandBoard';
import { getBrands } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface BrandPageProps {
  searchParams: SearchParamsType;
}

const BrandPage: FunctionComponent<BrandPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const brandsData = await getBrands(filter);

  return (
    <BrandBoard
      brands={brandsData.data}
      totalPage={brandsData.totalPage}
      currentPage={brandsData.currentPage}
      total={brandsData.total}
    />
  );
};

export default BrandPage;
