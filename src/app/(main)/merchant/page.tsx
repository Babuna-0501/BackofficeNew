import MerchantBoard from '@/components/merchant/MerchantBoard';
import { getMerchants } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface MerchantPageProps {
  searchParams: SearchParamsType;
}

const MerchantPage: FunctionComponent<MerchantPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const merchantsData = await getMerchants(filter);

  return (
    <MerchantBoard
      merchants={merchantsData.data}
      totalPage={merchantsData.totalPage}
      currentPage={merchantsData.currentPage}
      total={merchantsData.total}
    />
  );
};

export default MerchantPage;
