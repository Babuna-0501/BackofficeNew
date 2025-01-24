'use client';

import { FunctionComponent, useCallback } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { getValueByPath } from '@/utils';
import { Chip } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import { FeaturedType, TableItemType } from '@/types';
import {isActiveMap, FEATURED_COLUMNS } from '@/configs';
import FeaturedFilterForm from '@/components/featured/FeaturedFilterForm';


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
