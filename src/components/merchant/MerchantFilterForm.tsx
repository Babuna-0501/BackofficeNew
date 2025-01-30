'use client';

import { searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input } from '@heroui/react';
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

function MerchantFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/merchant' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        name='customerNo'
        defaultValue={defaultParams.customerNo}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Харилцагчийн дугаар')}
        placeholder={tr('Харилцагчийн дугаар')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='name'
        variant='bordered'
        defaultValue={defaultParams.name}
        labelPlacement='outside'
        label={tr('Харилцагчийн нэр')}
        placeholder={tr('Харилцагчийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='regNo'
        variant='bordered'
        defaultValue={defaultParams.regNo}
        labelPlacement='outside'
        label={tr('Харилцагчийн регистр')}
        placeholder={tr('Харилцагчийн регистр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='phone'
        variant='bordered'
        defaultValue={defaultParams.phone}
        labelPlacement='outside'
        label={tr('Харилцагчийн утас')}
        placeholder={tr('Харилцагчийн утас')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <div className='flex gap-2'>
        <CoreSubmitButton text='Хайх' startContent={<FunnelIcon className='w-4 h-4' />} className='w-full' />

        <Button
          type='reset'
          color='danger'
          onPress={() => changePathAction('/merchant')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default MerchantFilterForm;
