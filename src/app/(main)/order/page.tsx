import OrderBoard from '@/components/order/OrderBoard';
import { getOrders } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface OrderPageProps {
  searchParams: SearchParamsType;
}

const OrderPage: FunctionComponent<OrderPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const ordersData = await getOrders(filter);

  return (
    <OrderBoard
      orders={ordersData.data}
      totalPage={ordersData.totalPage}
      currentPage={ordersData.currentPage}
      total={ordersData.total}
    />
  );
};

export default OrderPage;
