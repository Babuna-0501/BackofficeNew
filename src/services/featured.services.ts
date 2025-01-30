import { apiService } from "@/services";
import { ApiResponseType, FeaturedType, SearchParamsFilterType } from "@/types";

export async function getFeaturedList(
  filter: SearchParamsFilterType
): Promise<ApiResponseType<FeaturedType[]>> {
  return apiService.getList<FeaturedType[]>(
    "/marketing/bo/promoted-items/list",
    filter
  );
}

export async function getFeaturedOne<FeaturedType>(id: string) {
  const res = await apiService.getOne<FeaturedType>(
    `/marketing/bo/promoted-items/list`,
    { id }
  );
  return res.data;
}

export async function createFeatured<FeaturedType>(data: FeaturedType) {
  const res = await apiService.create<FeaturedType, FeaturedType>(
    `/marketing/bo/promoted-items/`,
    data
  );
  return res.data;
}

export async function deleteFeatured<FeaturedType>(id: string) {
  return await apiService.delete<FeaturedType>(
    `/marketing/bo/promoted-items/`,
    { id }
  );
}

export async function updateFeatured<FeaturedType>(
  data: FeaturedType,
  id: string
) {
  return await apiService.update<FeaturedType, FeaturedType>(
    `/marketing/bo/promoted-items/`,
    { id: id, data: data }
  );
}
