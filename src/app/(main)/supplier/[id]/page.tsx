import { ParamsType, SearchParamsType, SupplierType } from '@/types';
import { FunctionComponent } from 'react';
import { getBrands, getLocations, getSupplier, getSuppliers } from '@/services';
import SupplierDetailBoard from '@/components/supplier/detail/SupplierDetailBoard';

interface SupplierDetailPageProps {
  params: ParamsType;
  searchParams: SearchParamsType;
}

const SupplierDetailPage: FunctionComponent<SupplierDetailPageProps> = async ({ params, searchParams }) => {
  const filter = await params;
  const { tabName } = await searchParams;

  const supplier = await getSupplier<SupplierType>(filter.id);

  const locations = await getLocations();

  const suppliersData = await getSuppliers({ limit: 1000 });

  const brandsData = await getBrands({ limit: 1000 });

  return (
    <SupplierDetailBoard
      supplier={supplier}
      locations={locations.data}
      suppliers={suppliersData.data}
      brands={brandsData.data}
      tabName={tabName ? tabName.toString() : 'general'}
    />
  );
};

export default SupplierDetailPage;
