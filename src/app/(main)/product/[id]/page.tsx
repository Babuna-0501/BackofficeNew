import { ParamsType, ProductType } from '@/types';
import { FunctionComponent } from 'react';
import { getBrands, getCategories, getProduct } from '@/services';
import ProductDetailBoard from '@/components/product/detail/ProductDetailBoard';

interface ProductDetailPageProps {
  params: ParamsType;
}

const ProductDetailPage: FunctionComponent<ProductDetailPageProps> = async ({ params }) => {
  const filter = await params;

  const product = await getProduct<ProductType>(filter.id);

  const brandsData = await getBrands({ limit: 1000 });

  const categoriesData = await getCategories({ limit: 1000 });

  return <ProductDetailBoard product={product} brands={brandsData.data} categories={categoriesData.data} />;
};

export default ProductDetailPage;
