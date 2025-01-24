import { MerchantType } from '@/types';
import { FunctionComponent } from 'react';
import CoreTextInfo from '@/components/core/CoreTextInfo';
import moment from 'moment';
import { isActiveMap } from '@/configs';
import { Chip } from "@heroui/react";

interface MerchantInfoProps {
  merchant: MerchantType;
}

const MerchantInfo: FunctionComponent<MerchantInfoProps> = ({ merchant }) => {
  const businessStartDate = merchant.businessStartDate ? moment(merchant.businessStartDate).format('YYYY-MM-DD') : '--';
  const createdDate = merchant.createdAt ? moment(merchant.createdAt).format('YYYY-MM-DD') : '--';
  const isActive = (
    <Chip color={merchant.inactive ? 'primary' : 'danger'} size='sm' className='text-white capitalize'>
      {isActiveMap[String(merchant.inactive)]}
    </Chip>
  );

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between gap-4 items-center'>
        <h2 className='font-medium text-2xl text-wrap'>{merchant.businessName}</h2>
      </div>

      <div className='flex flex-col gap-5'>
        <CoreTextInfo label='Харилцагчийн дугаар' value={merchant.customerNo} />
        <CoreTextInfo label='Харилцагчийн регистр' value={merchant.regNo} />
        <CoreTextInfo label='Харилцагчийн утас' value={merchant.phone} />
        <CoreTextInfo label='Харилцагчийн хаяг' value={merchant.address} />
        <CoreTextInfo label='Төлөв' value={isActive} />
        <CoreTextInfo label='Харилцагч болсон огноо' value={createdDate} />
        <CoreTextInfo label='Бизнесээ эхлүүлсэн огноо' value={businessStartDate} />
      </div>
    </div>
  );
};

export default MerchantInfo;
