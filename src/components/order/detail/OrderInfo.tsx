import { OrderType } from '@/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody, Chip } from "@heroui/react";
import { FunctionComponent } from 'react';
import CoreTitle from '@/components/core/CoreTitle';
import CoreTextInfo from '@/components/core/CoreTextInfo';
import moment from 'moment';
import { statusColorMap, statusOrderMap } from '@/configs';
import OrderLogs from '@/components/order/detail/OrderLogs';

interface OrderInfoProps {
  order: OrderType;
}

const OrderInfo: FunctionComponent<OrderInfoProps> = ({ order }) => {
  const orderedDate = order.orderedAt ? moment(order.orderedAt).format('YYYY-MM-DD, HH:MM:ss') : '--';
  const deliveryDate = order.orderedAt ? moment(order.deliveryDate).format('YYYY-MM-DD') : '--';

  return (
    <Card>
      <CardBody className='gap-4'>
        <div className='flex gap-2 items-center'>
          <Avatar icon={<ShoppingCartIcon className='w-5 h-5' />} />

          <div>
            <CoreTitle text='Захиалгын мэдээлэл' />

            {order.status && (
              <Chip color={statusColorMap[order.status]} size='sm' className='text-white capitalize ml-auto'>
                {statusOrderMap[order.status]}
              </Chip>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <CoreTextInfo label='Захиалгын дугаар' value={order.orderNo} />

          <CoreTextInfo label='Захиалсан огноо' value={orderedDate} />

          <CoreTextInfo label='Нийлүүлэгч' value={order.supplier?.name} />

          <CoreTextInfo label='Хүргэлтийн өдөр' value={deliveryDate} />

          <OrderLogs logs={order.logs} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderInfo;
