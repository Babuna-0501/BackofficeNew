'use client';

import { getValueByPath } from '@/utils';
import { MerchantType, TableItemType } from '@/types';
import { FunctionComponent, useCallback } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { changePathAction } from '@/app/actions/main';
import { MERCHANTS_COLUMNS } from '@/configs';
import MerchantFilterForm from '@/components/merchant/MerchantFilterForm';
import CoreGroupImages from '@/components/core/CoreGroupImages';
import CoreDateComponent from '@/components/core/CoreDateComponent';

interface MerchantTableProps {
  merchants: MerchantType[];
  currentPage: number;
  totalPage: number;
  total: number;
}

const MerchantTable: FunctionComponent<MerchantTableProps> = props => {
  const { merchants, currentPage, totalPage, total } = props;

  const renderCell = useCallback((merchant: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(merchant, columnKey.toString());

    switch (columnKey) {
      case 'createdAt':
        return <CoreDateComponent serverDate={cellValue} />;

      case 'logo':
        return <CoreGroupImages images={[cellValue]} />;

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={merchants}
      columns={MERCHANTS_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      onRowAction={key => changePathAction(`/merchant/${key}`)}
      customTopContent={<MerchantFilterForm />}
      total={total}
    />
  );
};

export default MerchantTable;
