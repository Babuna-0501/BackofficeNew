import { FunctionComponent } from 'react';
import ProductTable from '@/components/product/ProductTable';
import { ProductType } from '@/types';

interface ProductBoardProps {
  products: ProductType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const ProductBoard: FunctionComponent<ProductBoardProps> = ({ products, totalPage, currentPage, total }) => {
  return <ProductTable products={products} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default ProductBoard;
