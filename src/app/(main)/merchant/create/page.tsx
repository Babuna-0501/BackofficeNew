import { getCookie } from '@/app/actions/cookies';
import CoreNotFound from '@/components/core/CoreNotFound';
import MerchantCreateBoard from '@/components/merchant/create/MerchantCreateBoard';
import { getLocations } from '@/services';

async function MerchantCreatePage() {
  const supplierId = (await getCookie('supplierId'))?.value || '';

  if (!supplierId) {
    return <CoreNotFound text='Нийлүүлэгч олдсонгүй' />;
  }

  const locations = await getLocations();

  return <MerchantCreateBoard locations={locations.data} supplierId={supplierId} />;
}

export default MerchantCreatePage;
