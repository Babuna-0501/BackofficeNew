import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { CityType, MerchantType } from '@/types';
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';
import MerchantForm from '@/components/merchant/MerchantForm';

interface MerchantDetailBoardProps {
  merchant: MerchantType;
  locations: CityType[];
}

const MerchantDetailBoard: FunctionComponent<MerchantDetailBoardProps> = props => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Харилцагчийн мэдээлэл засварлах' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <MerchantForm {...props} />
        </CardBody>
      </Card>
    </div>
  );
};

export default MerchantDetailBoard;
