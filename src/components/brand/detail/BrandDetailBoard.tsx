import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { BrandType } from '@/types';
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';
import BrandForm from '@/components/brand/BrandForm';

interface BrandDetailBoardProps {
  brand: BrandType;
}

const BrandDetailBoard: FunctionComponent<BrandDetailBoardProps> = ({ brand }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Брэнд засварлах' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <BrandForm brand={brand} />
        </CardBody>
      </Card>
    </div>
  );
};

export default BrandDetailBoard;
