import { apiService } from '@/services';
import { ApiResponseType, FeaturedType, SearchParamsFilterType } from '@/types';

export async function getFeaturedList(filter: SearchParamsFilterType): Promise<ApiResponseType<FeaturedType[]>> {
  return apiService.getList<FeaturedType[]>('/marketing/promoted-items/list', filter);
}

export async function getFeaturedOne<FeaturedType>(id: string) {
  const res = await apiService.getOne<FeaturedType>(`/marketing/promoted-items/list`, { id });
  return res.data;
}
