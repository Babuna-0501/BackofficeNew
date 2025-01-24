'use client';

import { OrderType, ProductType, TableItemType } from '@/types';
import { FunctionComponent, useCallback } from 'react';
import { Chip } from '@heroui/react';
import CoreTable from '@/components/core/CoreTable';
import { formatUnit, getValueByPath } from '@/utils';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import { changePathAction } from '@/app/actions/main';
import { statusColorMap, statusOrderMap, ORDER_COLUMNS, paymentMethodMap } from '@/configs';
import CoreDateComponent from '@/components/core/CoreDateComponent';
import OrderFilterForm from '@/components/order/OrderFilterForm';

interface OrderTableProps {
  orders: OrderType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const OrderTable: FunctionComponent<OrderTableProps> = props => {
  const { orders, totalPage, currentPage, total } = props;

  const renderCell = useCallback((order: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(order, columnKey.toString());

    switch (columnKey) {
      case 'totalPrice':
        return formatUnit(cellValue, '₮');

      case 'deliveryDate':
        return <CoreDateComponent serverDate={cellValue} format='YYYY-MM-DD' />;

      case 'orderedAt':
        return (
          <div>
            <CoreDateComponent serverDate={cellValue} format='HH:MM:ss' />
            <CoreDateComponent serverDate={cellValue} format='YYYY-MM-DD' />
          </div>
        );

      case 'paymentMethod':
        return paymentMethodMap[cellValue];

      case 'status':
        return (
          <Chip color={statusColorMap[cellValue]} size='sm' className='text-white capitalize'>
            {statusOrderMap[cellValue]}
          </Chip>
        );

      case 'products':
        const images: string[] = [];

        if ('products' in order && Array.isArray(order.products)) {
          order.products.forEach((product: ProductType) => {
            if (product && product.images) {
              images.push(...product.images);
            }
          });
        }

        return <CoreGroupImages images={images} />;

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={orders}
      columns={ORDER_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      onRowAction={key => changePathAction(`/order/${key}`)}
      customTopContent={<OrderFilterForm />}
      total={total}
    />
  );
};

export default OrderTable;
