import { apiService } from '@/services';
import { ApiResponseType, BrandType, SearchParamsFilterType } from '@/types';

export async function getBrands(filter: SearchParamsFilterType): Promise<ApiResponseType<BrandType[]>> {
  return apiService.getList<BrandType[]>('/product/bo/brands', filter);
}

export async function getBrand<BrandType>(id: string) {
  const res = await apiService.getOne<BrandType>(`/product/bo/brand`, { id });
  return res.data;
}

export async function createBrand<BrandType>(data: BrandType) {
  return await apiService.create<BrandType, BrandType>(`/product/bo/brand`, data);
}

export async function updateBrand<BrandType>(data: BrandType, id: string) {
  return await apiService.update<BrandType, BrandType>(`/product/bo/brand`, { id: id, data: data });
}

export async function deleteBrand<BrandType>(id: string) {
  return await apiService.delete<BrandType>(`/product/bo/brand`, { id });
}
