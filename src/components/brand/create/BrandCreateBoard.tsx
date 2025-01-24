import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';
import BrandForm from '@/components/brand/BrandForm';

interface BrandCreateBoardProps {
  supplierId: string;
}

const BrandCreateBoard: FunctionComponent<BrandCreateBoardProps> = ({ supplierId }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Брэнд үүсгэх' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <BrandForm supplierId={supplierId} />
        </CardBody>
      </Card>
    </div>
  );
};

export default BrandCreateBoard;
