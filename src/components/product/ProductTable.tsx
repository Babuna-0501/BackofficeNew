'use client';

import { FunctionComponent, useCallback } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { getValueByPath } from '@/utils';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import { Chip } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import { CategoryType, ProductType, TableItemType } from '@/types';
import { isActiveMap, PRODUCTS_COLUMNS } from '@/configs';
import ProductFilterForm from '@/components/product/ProductFilterForm';

interface ProductTableProps {
  products: ProductType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const ProductTable: FunctionComponent<ProductTableProps> = props => {
  const { products, totalPage, currentPage, total } = props;

  const renderCell = useCallback((product: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(product, columnKey.toString());

    switch (columnKey) {
      case 'categories':
        return cellValue.map(
          (category: CategoryType, index: number, array: CategoryType[]) =>
            `${category.name}${index < array.length - 1 ? ', ' : ''}`
        );

      case 'isActive':
        return (
          <Chip color={cellValue ? 'primary' : 'danger'} size='sm' className='text-white capitalize'>
            {isActiveMap[cellValue]}
          </Chip>
        );

      case 'images':
        return <CoreGroupImages images={cellValue} max={1} renderCount={() => null} />;

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={products}
      columns={PRODUCTS_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      onRowAction={key => changePathAction(`/product/${key}`)}
      customTopContent={<ProductFilterForm />}
      total={total}
    />
  );
};

export default ProductTable;
