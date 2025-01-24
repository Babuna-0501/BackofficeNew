import { OrderType, ParamsType } from '@/types';
import { FunctionComponent } from 'react';
import OrderDetailBoard from '@/components/order/detail/OrderDetailBoard';
import { getOrder } from '@/services';

interface OrderDetailPageProps {
  params: ParamsType;
}

const OrderDetailPage: FunctionComponent<OrderDetailPageProps> = async ({ params }) => {
  const filter = await params;

  const order = await getOrder<OrderType>(filter.id);

  return <OrderDetailBoard order={order} />;
};

export default OrderDetailPage;
