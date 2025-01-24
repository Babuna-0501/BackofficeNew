import { apiService } from '@/services';
import { ApiResponseType, CategoryType, SearchParamsFilterType } from '@/types';

export async function getCategories(filter: SearchParamsFilterType): Promise<ApiResponseType<CategoryType[]>> {
  return apiService.getList<CategoryType[]>('/product/bo/categories', filter);
}

export async function getCategory<CategoryType>(id: string) {
  const res = await apiService.getOne<CategoryType>(`/product/bo/category`, { id });
  return res.data;
}

export async function createCategory<CategoryType>(data: CategoryType) {
  return await apiService.create<CategoryType, CategoryType>(`/product/bo/category`, data);
}

export async function updateCategory<CategoryType>(data: CategoryType, id: string) {
  return await apiService.update<CategoryType, CategoryType>(`/product/bo/category`, { id: id, data: data });
}

export async function deleteCategory<CategoryType>(id: string) {
  return await apiService.delete<CategoryType>(`/product/bo/category`, { id });
}
