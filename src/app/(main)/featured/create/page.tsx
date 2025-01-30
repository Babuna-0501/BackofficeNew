import { getCookie } from '@/app/actions/cookies';
import FeaturedCreateBoard from '@/components/featured/create/FeaturedCreateBoard';
import CoreNotFound from '@/components/core/CoreNotFound';

async function FeaturedCreatePage() {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  if (!supplierId) {
    return <CoreNotFound text='Нийлүүлэгч олдсонгүй' />;
  }

  return <FeaturedCreateBoard supplierId={supplierId} />;
}

export default FeaturedCreatePage;
