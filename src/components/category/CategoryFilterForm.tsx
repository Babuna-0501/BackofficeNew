'use client';

import { searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, Input } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

function CategoryFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/category' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        name='name'
        defaultValue={defaultParams.name}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Категорийн нэр')}
        placeholder={tr('Категорийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />

      <div className='flex gap-2'>
        <CoreSubmitButton text='Хайх' startContent={<FunnelIcon className='w-4 h-4' />} className='w-full' />

        <Button
          type='reset'
          color='danger'
          onPress={() => changePathAction('/category')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default CategoryFilterForm;
