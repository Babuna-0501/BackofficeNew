import { BrandType, CategoryType, ProductType } from '@/types';
import { FunctionComponent } from 'react';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import ProductForm from '@/components/product/ProductForm';

interface ProductDetailBoardProps {
  product: ProductType;
  brands: BrandType[];
  categories: CategoryType[];
}

const ProductDetailBoard: FunctionComponent<ProductDetailBoardProps> = props => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Бүтээгдэхүүний дэлгэрэнгүй' />

        <CoreBreadCrumb />
      </div>

      <ProductForm {...props} />
    </div>
  );
};

export default ProductDetailBoard;
