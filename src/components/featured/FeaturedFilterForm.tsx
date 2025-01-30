'use client';

import { objectToArray, searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import CoreCreateButton from '@/components/core/CoreCreateButton';
import { isActiveMap, isTypeMap } from '@/configs';
import { useSearchParams } from 'next/navigation';

function FeaturedFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/featured' className='grid grid-cols-6 gap-2 items-end'>
      <Select
        aria-label='core'
        aria-hidden='false'
        defaultSelectedKeys={[defaultParams.type || '']}
        name='type'
        placeholder='--'
        label='Сонгох'
        labelPlacement='outside'
        items={objectToArray(isTypeMap)}
        variant='bordered'
        classNames={{
          label: 'text-xs font-medium'
        }}
      >
        {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
      </Select>

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
          onPress={() => changePathAction('/featured')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default FeaturedFilterForm;
