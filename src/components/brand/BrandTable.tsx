'use client';

import { FunctionComponent, useCallback, useState } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { getValueByPath, toastMessage } from '@/utils';
import { BrandType, TableItemType } from '@/types';
import { BRAND_COLUMNS, isActiveMap } from '@/configs';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import { Chip } from "@heroui/react";
import BrandFilterForm from '@/components/brand/BrandFilterForm';
import CoreDateComponent from '@/components/core/CoreDateComponent';
import CoreTableActions from '@/components/core/CoreTableActions';
import { deleteBrandAction } from '@/app/actions/brand';

interface BrandTableProps {
  brands: BrandType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const BrandTable: FunctionComponent<BrandTableProps> = ({ brands, totalPage, currentPage, total }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteBrand = async (id: string) => {
    const response = await deleteBrandAction(id);

    toastMessage(response);
  };

  const renderCell = useCallback((brand: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(brand, columnKey.toString());

    switch (columnKey) {
      case 'image':
        return <CoreGroupImages images={[cellValue]} />;

      case 'createdAt':
        return <CoreDateComponent serverDate={cellValue} format='YYYY-MM-DD' />;

      case 'actions':
        return (
          <CoreTableActions id={brand.id} actions={['edit', 'delete']} setLoading={setLoading} onDeleteAction={deleteBrand} />
        );

      case 'isActive':
        return (
          <Chip color={cellValue ? 'primary' : 'danger'} size='sm' className='text-white capitalize'>
            {isActiveMap[cellValue]}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={brands}
      columns={BRAND_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      customTopContent={<BrandFilterForm />}
      total={total}
      loading={loading}
    />
  );
};

export default BrandTable;
