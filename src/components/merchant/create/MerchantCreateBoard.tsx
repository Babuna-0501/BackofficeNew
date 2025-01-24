import { FunctionComponent } from 'react';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { CityType } from '@/types';
import MerchantForm from '@/components/merchant/MerchantForm';
import { Card, CardBody } from "@heroui/react";

interface MerchantCreateBoardProps {
  locations: CityType[];
  supplierId: string;
}

const MerchantCreateBoard: FunctionComponent<MerchantCreateBoardProps> = props => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Харилцагч үүсгэх' />

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

export default MerchantCreateBoard;
