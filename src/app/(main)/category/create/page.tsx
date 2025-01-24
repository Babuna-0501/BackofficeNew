import { getCookie } from '@/app/actions/cookies';
import CategoryCreateBoard from '@/components/category/create/CategoryCreateBoard';
import CoreNotFound from '@/components/core/CoreNotFound';

async function CategoryCreatePage() {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  if (!supplierId) {
    return <CoreNotFound text='Нийлүүлэгч олдсонгүй' />;
  }

  return <CategoryCreateBoard supplierId={supplierId} />;
}

export default CategoryCreatePage;
