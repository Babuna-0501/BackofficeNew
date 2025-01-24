import CoreTextInfo from '@/components/core/CoreTextInfo';
import CoreTitle from '@/components/core/CoreTitle';
import { MerchantType } from '@/types';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';

interface OrderMerchantInfoProps {
  merchant: MerchantType;
}

const OrderMerchantInfo: FunctionComponent<OrderMerchantInfoProps> = ({ merchant }) => {
  return (
    <Card>
      <CardBody className='gap-4'>
        <div className='flex gap-2 items-center'>
          <Avatar icon={<BuildingStorefrontIcon className='w-5 h-5' />} />
          <CoreTitle text='Харилцагчийн мэдээлэл' />
        </div>

        <div className='flex flex-col gap-2'>
          <CoreTextInfo label='Нэр' value={merchant?.name} />

          <CoreTextInfo label='Утас' value={merchant?.phone} />

          <CoreTextInfo label='Хаяг' value={merchant?.address} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderMerchantInfo;
