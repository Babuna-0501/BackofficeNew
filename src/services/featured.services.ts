import { getCookie } from "@/app/actions/cookies";
import { API_URL } from "@/configs";
import { apiService, fetcher } from "@/services";
import { ApiResponseType, FeaturedType, SearchParamsFilterType } from "@/types";
import { removeEmptyStringFields } from "@/utils";
const createUrl = (
  endpoint: string,
  filter?: SearchParamsFilterType
): string => {
  const url = new URL(`${API_URL}${endpoint}`);

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString().replace(API_URL as string, "");
};

export async function getFeaturedList(
  filter: SearchParamsFilterType
): Promise<ApiResponseType<FeaturedType[]> | null> {
  const supplierId = (await getCookie("supplierId"))?.value || "";

  const extendedFilter = { limit: 10, supplierId, ...filter };
  const url = createUrl(
    "/marketing/bo/promoted-items/list",
    removeEmptyStringFields(extendedFilter)
  );
  const res = await fetcher<ApiResponseType<FeaturedType[]> | null>(url);
  return res;
}
export async function getFeaturedOne<FeaturedType>(id: string) {
  const res = await apiService.getOne<FeaturedType>(
    `/marketing/bo/promoted-items`,
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
    `/marketing/bo/promoted-items`,
    { id: id, data: data }
  );
}
