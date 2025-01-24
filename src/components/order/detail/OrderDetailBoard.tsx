import { OrderType } from '@/types';
import { FunctionComponent } from 'react';
import CoreTitle from '@/components/core/CoreTitle';
import OrderInfo from '@/components/order/detail/OrderInfo';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import OrderProductsTable from '@/components/order/detail/OrderProductsTable';
import OrderMerchantInfo from '@/components/order/detail/OrderMerchantInfo';
import OrderPaymentInfo from '@/components/order/detail/OrderPaymentInfo';

interface OrderDetailBoardProps {
  order: OrderType;
}

const OrderDetailBoard: FunctionComponent<OrderDetailBoardProps> = ({ order }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Захиалгын дэлгэрэнгүй' />

        <CoreBreadCrumb />
      </div>

      <div className='flex gap-4'>
        <div className='flex-1 flex flex-col gap-4'>
          <OrderProductsTable products={order.products} />

          {order.giftProducts?.length > 0 && (
            <div className='flex flex-col gap-4'>
              <CoreTitle text='Бэлэг' />

              <OrderProductsTable products={order.giftProducts} />
            </div>
          )}
        </div>

        <div className='w-96 flex flex-col gap-4'>
          <OrderInfo order={order} />

          <OrderMerchantInfo merchant={order.merchant} />

          <OrderPaymentInfo order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailBoard;
