'use client';

import { convertExcelFromBase64, tr } from '@/utils';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Button, DateRangePicker, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { exportReportAction } from '@/app/actions/order';

function OrderReportButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const downloadExcelFile = async (formData: FormData) => {
    const { name, file } = await exportReportAction(formData);

    if (file) {
      convertExcelFromBase64(file, name);

      onClose();
    }
  };

  return (
    <div>
      <Button color='primary' onPress={onOpen} startContent={<DocumentArrowDownIcon className='w-5 h-5' />}>
        {tr('Тайлан')}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='pb-4'>
          <ModalHeader>{tr('Тайлан')}</ModalHeader>

          <ModalBody>
            <form className='flex flex-col gap-4' action={downloadExcelFile}>
              <DateRangePicker
                isRequired
                aria-label='date'
                label='Эхлэх, дуусах огноо'
                variant='bordered'
                startName='startDate'
                endName='endDate'
                errorMessage={tr('Өдөр сонгоно уу')}
                calendarProps={{ disableAnimation: true }}
              />

              <CoreSubmitButton text='Татах' />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default OrderReportButton;
