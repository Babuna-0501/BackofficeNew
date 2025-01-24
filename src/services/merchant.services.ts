import { apiService } from '@/services';
import { ApiResponseType, SearchParamsFilterType, MerchantType } from '@/types';

export async function getMerchants(filter: SearchParamsFilterType): Promise<ApiResponseType<MerchantType[]>> {
  return apiService.getList<MerchantType[]>('/customer/bo/merchant', filter);
}

export async function getMerchant<MerchantType>(id: string) {
  const res = await apiService.getOne<MerchantType>(`/customer/bo/merchant`, { id });
  return res.data;
}

export async function createMerchant<MerchantType>(data: MerchantType) {
  return await apiService.create<MerchantType, MerchantType>(`/customer/bo/merchant`, data);
}

export async function updateMerchant<MerchantType>(data: MerchantType, id: string) {
  return await apiService.update<MerchantType, MerchantType>(`/customer/bo/merchant`, { id, data });
}
