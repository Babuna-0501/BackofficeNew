import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';
import FeaturedForm from '../FeaturedForm';


interface FeaturedCreateBoardProps {
  supplierId: string;
}

const FeaturedCreateBoard: FunctionComponent<FeaturedCreateBoardProps> = ({ supplierId }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Онцлох үүсгэх' />
        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <FeaturedForm supplierId={supplierId}/>
        </CardBody>
      </Card>
    </div>

     
  );
};

export default FeaturedCreateBoard;
