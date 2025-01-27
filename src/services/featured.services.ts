import { apiService } from '@/services';
import { ApiResponseType, FeaturedType, SearchParamsFilterType } from '@/types';

export async function getFeaturedList(filter: SearchParamsFilterType): Promise<ApiResponseType<FeaturedType[]>> {
  return apiService.getList<FeaturedType[]>('', filter);
}

export async function getFeaturedOne<FeaturedType>(id: string) {
  const res = await apiService.getOne<FeaturedType>(``, { id });
  return res.data;
}
