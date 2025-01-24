import { OrderType } from '@/types';
import { FunctionComponent } from 'react';
import OrderTable from '@/components/order/OrderTable';

interface OrderBoardProps {
  orders: OrderType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const OrderBoard: FunctionComponent<OrderBoardProps> = ({ orders, totalPage, currentPage, total }) => {
  return <OrderTable orders={orders} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default OrderBoard;
