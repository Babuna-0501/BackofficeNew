import { MerchantType, ParamsType } from '@/types';
import { FunctionComponent } from 'react';
import { getLocations, getMerchant } from '@/services';
import MerchantDetailBoard from '@/components/merchant/detail/MerchantDetailBoard';

interface MerchantDetailPageProps {
  params: ParamsType;
}

const MerchantDetailPage: FunctionComponent<MerchantDetailPageProps> = async ({ params }) => {
  const filter = await params;

  const merchant = await getMerchant<MerchantType>(filter.id);

  const locations = await getLocations();

  return <MerchantDetailBoard merchant={merchant} locations={locations.data} />;
};

export default MerchantDetailPage;
