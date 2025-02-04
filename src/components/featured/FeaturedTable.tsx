'use client';

import { FunctionComponent, useCallback } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { getValueByPath } from '@/utils';
import { Chip } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import { FeaturedType, TableItemType } from '@/types';
import {isActiveMap, FEATURED_COLUMNS } from '@/configs';
import FeaturedFilterForm from '@/components/featured/FeaturedFilterForm';
import CoreDateComponent from '@/components/core/CoreDateComponent';
import CoreGroupImages from '@/components/core/CoreGroupImages';



interface FeaturedTableProps {
  featured: FeaturedType[];
  totalPage: number;
  currentPage: number;
  total: number;
}
 
const FeaturedTable: FunctionComponent<FeaturedTableProps> = ({featured, totalPage, currentPage, total}) => {
  const renderCell = useCallback((product: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(product, columnKey.toString());
  
    switch (columnKey) {
      case 'isActive':
        return (
          <Chip color={cellValue ? 'primary' : 'danger'} size='sm' className='text-white capitalize'>
            {isActiveMap[cellValue]}
          </Chip>
        );
      case 'image':
        const images = Array.isArray(cellValue) ? cellValue : [cellValue];
        return (
          <div style={{ width: '50px', height: '50px' }}>
            <CoreGroupImages images={images} max={3} />
          </div>
        );
      case 'startAt':
      case 'endAt':
        return <CoreDateComponent serverDate={cellValue} format='YYYY-MM-DD HH:mm:ss' />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={featured} 
      columns={FEATURED_COLUMNS} 
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      total={total}
      onRowAction={key => changePathAction(`/featured/${key}`)}
      customTopContent={<FeaturedFilterForm />}
    />
  );
}
 
export default FeaturedTable;