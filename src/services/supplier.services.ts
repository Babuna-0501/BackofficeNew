import { apiService } from '@/services';
import { ApiResponseType, SearchParamsFilterType, SupplierType } from '@/types';

export async function getSuppliers(filter: SearchParamsFilterType): Promise<ApiResponseType<SupplierType[]>> {
  return apiService.getList<SupplierType[]>('/customer/bo/supplier', filter);
}

export async function getSupplier<SupplierType>(id: string) {
  const res = await apiService.getOne<SupplierType>(`/customer/bo/supplier`, { id });
  return res.data;
}

export async function createSupplier<SupplierType>(data: SupplierType) {
  return await apiService.create<SupplierType, SupplierType>(`/customer/bo/supplier`, data);
}

export async function updateSupplier<SupplierType>(data: SupplierType, id: string) {
  return await apiService.update<SupplierType, SupplierType>(`/customer/bo/supplier`, { id, data });
}
