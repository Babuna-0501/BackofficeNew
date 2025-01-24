import { getCookie } from '@/app/actions/cookies';
import CoreNotFound from '@/components/core/CoreNotFound';
import ProductCreateBoard from '@/components/product/create/ProductCreateBoard';
import { getBrands, getCategories } from '@/services';

async function ProductCreatePage() {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  const brandsData = await getBrands({ limit: 1000 });

  const categoriesData = await getCategories({ limit: 1000 });

  if (!supplierId) {
    return <CoreNotFound text='Нийлүүлэгч олдсонгүй' />;
  }

  return <ProductCreateBoard supplierId={supplierId} brands={brandsData.data} categories={categoriesData.data} />;
}

export default ProductCreatePage;
