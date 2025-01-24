import SupplierCreateBoard from '@/components/supplier/create/SupplierCreateBoard';
import { getLocations, getSuppliers } from '@/services';

async function SupplierCreatePage() {
  const locations = await getLocations();

  const suppliersData = await getSuppliers({ limit: 1000 });

  return <SupplierCreateBoard locations={locations.data} suppliers={suppliersData.data} />;
}

export default SupplierCreatePage;
