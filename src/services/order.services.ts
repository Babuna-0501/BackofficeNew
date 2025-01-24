import { apiService } from '@/services';
import { ApiResponseType, SearchParamsFilterType, OrderType } from '@/types';

export async function getOrders(filter: SearchParamsFilterType): Promise<ApiResponseType<OrderType[]>> {
  return apiService.getList<OrderType[]>('/order/bo', filter);
}

export async function getOrder<OrderType>(id: string) {
  const res = await apiService.getOne<OrderType>(`/order/bo`, { id });
  return res.data;
}
