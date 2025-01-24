'use client';

import { objectToArray, searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { isActiveMap } from '@/configs';
import { useSearchParams } from 'next/navigation';

function BrandFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/brand' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        name='name'
        defaultValue={defaultParams.name}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Брэндийн нэр')}
        placeholder={tr('Брэндийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Select
        aria-label='core'
        aria-hidden='false'
        name='isActive'
        defaultSelectedKeys={[defaultParams.isActive || '']}
        placeholder='--'
        label={tr('Төлөв')}
        labelPlacement='outside'
        items={objectToArray(isActiveMap)}
        variant='bordered'
        classNames={{
          label: 'text-xs font-medium'
        }}
      >
        {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
      </Select>

      <div className='flex gap-2'>
        <CoreSubmitButton text='Хайх' startContent={<FunnelIcon className='w-4 h-4' />} className='w-full' />

        <Button
          type='reset'
          color='danger'
          onPress={() => changePathAction('/brand')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default BrandFilterForm;
