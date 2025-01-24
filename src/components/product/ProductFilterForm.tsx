'use client';

import { objectToArray, searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { isActiveMap } from '@/configs';
import { useSearchParams } from 'next/navigation';

function ProductFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/product' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        name='sku'
        defaultValue={defaultParams.sku}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Бүтээгдэхүүний SKU')}
        placeholder={tr('Бүтээгдэхүүний SKU')}
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
        label={tr('Бүтээгдэхүүний нэр')}
        placeholder={tr('Бүтээгдэхүүний нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Input
        type='text'
        name='barCode'
        variant='bordered'
        defaultValue={defaultParams.barCode}
        labelPlacement='outside'
        label={tr('Бүтээгдэхүүний баркод')}
        placeholder={tr('Бүтээгдэхүүний баркод')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <Select
        aria-label='core'
        aria-hidden='false'
        defaultSelectedKeys={[defaultParams.isActive || '']}
        name='isActive'
        placeholder='--'
        label='Төлөв'
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
          onPress={() => changePathAction('/product')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default ProductFilterForm;
