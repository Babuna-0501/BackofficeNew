import ProductBoard from '@/components/product/ProductBoard';
import { getProducts } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface ProductPageProps {
  searchParams: SearchParamsType;
}

const ProductPage: FunctionComponent<ProductPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const productsData = await getProducts(filter);

  return (
    <ProductBoard
      products={productsData.data}
      totalPage={productsData.totalPage}
      currentPage={productsData.currentPage}
      total={productsData.total}
    />
  );
};

export default ProductPage;
