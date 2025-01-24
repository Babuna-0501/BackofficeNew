import SupplierBoard from '@/components/supplier/SupplierBoard';
import { getSuppliers } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface SupplierPageProps {
  searchParams: SearchParamsType;
}

const SupplierPage: FunctionComponent<SupplierPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const suppliersData = await getSuppliers(filter);

  return (
    <SupplierBoard
      suppliers={suppliersData.data}
      totalPage={suppliersData.totalPage}
      currentPage={suppliersData.currentPage}
      total={suppliersData.total}
    />
  );
};

export default SupplierPage;
