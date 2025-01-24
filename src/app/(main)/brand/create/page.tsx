import { getCookie } from '@/app/actions/cookies';
import BrandCreateBoard from '@/components/brand/create/BrandCreateBoard';
import CoreNotFound from '@/components/core/CoreNotFound';

async function BrandCreatePage() {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  if (!supplierId) {
    return <CoreNotFound text='Нийлүүлэгч олдсонгүй' />;
  }

  return <BrandCreateBoard supplierId={supplierId} />;
}

export default BrandCreatePage;
