'use client';

import CoreDateComponent from '@/components/core/CoreDateComponent';
import CoreTable from '@/components/core/CoreTable';
import { ORDER_LOGS_COLUMNS, statusColorMap, statusOrderMap } from '@/configs';
import { OrderLogType, TableItemType } from '@/types';
import { getValueByPath, tr } from '@/utils';
import { Button, Chip, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { FunctionComponent, useCallback } from 'react';

interface OrderLogsProps {
  logs: OrderLogType[];
}

const OrderLogs: FunctionComponent<OrderLogsProps> = ({ logs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderCell = useCallback((log: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(log, columnKey.toString());

    switch (columnKey) {
      case 'createdAt':
        return <CoreDateComponent serverDate={cellValue} />;

      case 'action':
        return (
          <Chip color={statusColorMap[cellValue]} size='sm' className='text-white capitalize'>
            {statusOrderMap[cellValue]}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Button color='primary' onPress={() => onOpen()} size='sm'>
        {tr('Захиалгын лог харах')}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <CoreTable data={logs} columns={ORDER_LOGS_COLUMNS} renderCell={renderCell} showIndex={false} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderLogs;
