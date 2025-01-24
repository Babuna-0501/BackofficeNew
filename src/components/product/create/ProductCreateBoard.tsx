import { FunctionComponent } from 'react';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import ProductForm from '@/components/product/ProductForm';
import { BrandType, CategoryType } from '@/types';

interface ProductCreateBoardProps {
  supplierId: string;
  brands: BrandType[];
  categories: CategoryType[];
}

const ProductCreateBoard: FunctionComponent<ProductCreateBoardProps> = ({ supplierId, brands, categories }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Бүтээгдэхүүн үүсгэх' />

        <CoreBreadCrumb />
      </div>

      <ProductForm supplierId={supplierId} brands={brands} categories={categories} />
    </div>
  );
};

export default ProductCreateBoard;
