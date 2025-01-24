import CoreTextInfo from '@/components/core/CoreTextInfo';
import CoreTitle from '@/components/core/CoreTitle';
import { paymentMethodMap } from '@/configs';
import { OrderType } from '@/types';
import { formatUnit } from '@/utils';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';

interface OrderPaymentInfoProps {
  order: OrderType;
}

const OrderPaymentInfo: FunctionComponent<OrderPaymentInfoProps> = ({ order }) => {
  return (
    <Card>
      <CardBody className='gap-4'>
        <div className='flex gap-2 items-center'>
          <Avatar icon={<CreditCardIcon className='w-5 h-5' />} />

          <CoreTitle text='Төлбөрийн мэдээлэл' />
        </div>

        <div className='flex flex-col gap-2'>
          <CoreTextInfo label='Төлбөрийн хэлбэр' value={paymentMethodMap[order.paymentMethod]} />

          <CoreTextInfo label='Нийт дүн' value={formatUnit(order.totalBasePrice, '₮')} />

          <CoreTextInfo label='Нийт хөнглөлтийн хувь' value={formatUnit(order.discountPercent, '%')} />

          <CoreTextInfo label='Нийт хөнгөлөлт' value={formatUnit(order.totalDiscountAmount, '₮')} />

          <CoreTextInfo label='Төлөх дүн' value={formatUnit(order.totalPrice, '₮')} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderPaymentInfo;
