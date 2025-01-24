import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { BrandType, CityType, SupplierType } from '@/types';
import { FunctionComponent } from 'react';
import SupplierDetailContainer from '@/components/supplier/detail/SupplierDetailContainer';

interface SupplierDetailBoardProps {
  supplier: SupplierType;
  suppliers: SupplierType[];
  locations: CityType[];
  brands: BrandType[];
  tabName: string;
}

const SupplierDetailBoard: FunctionComponent<SupplierDetailBoardProps> = props => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Нийлүүлэгчийн мэдээлэл засварлах' />

        <CoreBreadCrumb />
      </div>

      <SupplierDetailContainer {...props} />
    </div>
  );
};

export default SupplierDetailBoard;
