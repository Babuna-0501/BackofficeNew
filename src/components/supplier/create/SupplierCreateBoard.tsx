import { FunctionComponent } from 'react';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { CityType, SupplierType } from '@/types';
import { Card, CardBody } from '@heroui/react';
import SupplierGeneralForm from '@/components/supplier/forms/SupplierGeneralForm';

interface SupplierCreateBoardProps {
  locations: CityType[];
  suppliers: SupplierType[];
}

const SupplierCreateBoard: FunctionComponent<SupplierCreateBoardProps> = props => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Нийлүүлэгч үүсгэх' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <SupplierGeneralForm {...props} />
        </CardBody>
      </Card>
    </div>
  );
};

export default SupplierCreateBoard;
