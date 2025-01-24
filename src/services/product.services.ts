import { apiService } from '@/services';
import { ApiResponseType, SearchParamsFilterType, ProductType } from '@/types';

export async function getProducts(filter: SearchParamsFilterType): Promise<ApiResponseType<ProductType[]>> {
  return apiService.getList<ProductType[]>('/product/bo/list', filter);
}

export async function getProduct<ProductType>(id: string) {
  const res = await apiService.getOne<ProductType>(`/product/bo`, { id });
  return res.data;
}

export async function createProduct<ProductType>(data: ProductType) {
  return await apiService.create<ProductType, ProductType>(`/product/bo`, data);
}

export async function updateProduct<ProductType>(data: ProductType, id: string) {
  return await apiService.update<ProductType, ProductType>(`/product/bo`, { id: id, data: data });
}

export async function deleteProduct<ProductType>(id: string) {
  return await apiService.delete<ProductType>(`/product/bo`, { id });
}
