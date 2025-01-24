'use client';

import { getValueByPath } from '@/utils';
import { SupplierType, TableItemType } from '@/types';
import { FunctionComponent, useCallback } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { changePathAction } from '@/app/actions/main';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import { SUPPLIERS_COLUMNS } from '@/configs';
import SupplierFilterForm from '@/components/supplier/SupplierFilterForm';

interface SupplierTableProps {
  suppliers: SupplierType[];
  currentPage: number;
  totalPage: number;
  total: number;
}

const SupplierTable: FunctionComponent<SupplierTableProps> = props => {
  const { suppliers, currentPage, totalPage, total } = props;

  const renderCell = useCallback((supplier: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(supplier, columnKey.toString());

    switch (columnKey) {
      case 'logo':
        return <CoreGroupImages images={[cellValue]} />;

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={suppliers}
      columns={SUPPLIERS_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      onRowAction={key => changePathAction(`/supplier/${key}`)}
      customTopContent={<SupplierFilterForm />}
      total={total}
    />
  );
};

export default SupplierTable;
