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
  const suppliersOutBranches = suppliers.filter(supplier => supplier.branches && supplier.branches.length === 0);

  const suppliersWithBranches = suppliers.filter(supplier => supplier.branches && supplier.branches.length > 0);

  suppliersWithBranches.forEach(supplier => {
    suppliersOutBranches.push(...supplier.branches);
  });

  return <SupplierTable suppliers={suppliersOutBranches} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default SupplierBoard;
