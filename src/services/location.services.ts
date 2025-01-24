import { apiService } from '@/services';
import { ApiResponseType, CityType } from '@/types';

export async function getLocations(): Promise<ApiResponseType<CityType[]>> {
  return apiService.getList<CityType[]>('/customer/bo/location');
}
