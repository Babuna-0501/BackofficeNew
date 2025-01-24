import { MerchantType } from '@/types';
import { FunctionComponent } from 'react';
import MerchantTable from '@/components/merchant/MerchantTable';

interface MerchantBoardProps {
  merchants: MerchantType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const MerchantBoard: FunctionComponent<MerchantBoardProps> = ({ merchants, totalPage, currentPage, total }) => {
  return <MerchantTable merchants={merchants} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default MerchantBoard;
