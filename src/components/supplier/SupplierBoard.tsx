import { SupplierType } from '@/types';
import { FunctionComponent } from 'react';
import SupplierTable from '@/components/supplier/SupplierTable';

interface SupplierBoardProps {
  suppliers: SupplierType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const SupplierBoard: FunctionComponent<SupplierBoardProps> = ({ suppliers, totalPage, currentPage, total }) => {
  return <SupplierTable suppliers={suppliers} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default SupplierBoard;
