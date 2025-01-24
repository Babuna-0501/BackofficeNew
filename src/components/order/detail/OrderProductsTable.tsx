'use client';

import CoreTable from '@/components/core/CoreTable';
import { formatUnit, getValueByPath } from '@/utils';
import { ProductType, TableItemType } from '@/types';
import { FunctionComponent, useCallback } from 'react';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import { changePathAction } from '@/app/actions/main';
import { ORDER_PRODUCTS_COLUMNS } from '@/configs';

interface OrderProductsTableProps {
  products: ProductType[];
}

const OrderProductsTable: FunctionComponent<OrderProductsTableProps> = ({ products }) => {
  const renderCell = useCallback((order: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(order, columnKey.toString());

    switch (columnKey) {
      case 'price':
        return formatUnit(cellValue, '₮');

      case 'basePrice':
        return formatUnit(cellValue, '₮');

      case 'totalBasePrice':
        return formatUnit(cellValue, '₮');

      case 'totalPrice':
        return formatUnit(cellValue, '₮');

      case 'discountPercent':
        return formatUnit(cellValue, '%');

      case 'quantity':
        return formatUnit(cellValue, 'ш');

      case 'images':
        return <CoreGroupImages images={cellValue} />;

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={products}
      columns={ORDER_PRODUCTS_COLUMNS}
      renderCell={renderCell}
      onRowAction={key => changePathAction(`/product/${key}`)}
    />
  );
};

export default OrderProductsTable;
