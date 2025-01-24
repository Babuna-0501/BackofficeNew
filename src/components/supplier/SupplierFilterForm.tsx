'use client';

import { searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

function SupplierFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/supplier' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        defaultValue={defaultParams.customerNo}
        name='customerNo'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Нийлүүлэгчийн дугаар')}
        placeholder={tr('Нийлүүлэгчийн дугаар')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='regNo'
        defaultValue={defaultParams.regNo}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Нийлүүлэгчийн регистр')}
        placeholder={tr('Нийлүүлэгчийн регистр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='name'
        defaultValue={defaultParams.name}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Нийлүүлэгчийн нэр')}
        placeholder={tr('Нийлүүлэгчийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='phone'
        defaultValue={defaultParams.phone}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Нийлүүлэгчийн утас')}
        placeholder={tr('Нийлүүлэгчийн утас')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <div className='flex gap-2'>
        <CoreSubmitButton text='Хайх' startContent={<FunnelIcon className='w-4 h-4' />} className='w-full' />

        <Button
          type='reset'
          color='danger'
          onPress={() => changePathAction('/supplier')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default SupplierFilterForm;
