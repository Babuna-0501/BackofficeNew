import BrandDetailBoard from '@/components/brand/detail/BrandDetailBoard';
import { getBrand } from '@/services';
import { BrandType, ParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface BrandEditPageProps {
  params: ParamsType;
}

const BrandEditPage: FunctionComponent<BrandEditPageProps> = async ({ params }) => {
  const filter = await params;

  const brand = await getBrand<BrandType>(filter.id);

  return <BrandDetailBoard brand={brand} />;
};

export default BrandEditPage;
