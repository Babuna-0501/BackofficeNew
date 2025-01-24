'use client';

import { objectToArray, searchParamsToObject, tr } from '@/utils';
import Form from 'next/form';
import { Button, DateRangePicker, Input, Select, SelectItem } from "@heroui/react";
import { changePathAction } from '@/app/actions/main';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BackspaceIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { paymentMethodMap, statusOrderMap } from '@/configs';
import { useSearchParams } from 'next/navigation';

function OrderFilterForm() {
  const searchParams = useSearchParams();

  const defaultParams = searchParamsToObject(searchParams);

  return (
    <Form action='/order' className='grid grid-cols-6 gap-2 items-end'>
      <Input
        type='text'
        name='orderNo'
        defaultValue={defaultParams.orderNo}
        variant='bordered'
        labelPlacement='outside'
        label={tr('Захиалгын дугаар')}
        placeholder={tr('Захиалгын дугаар')}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />
      <DateRangePicker
        aria-label='date'
        label={tr('Захиалсан огноо')}
        labelPlacement='outside'
        variant='bordered'
        startName='startDate'
        endName='endDate'
        calendarProps={{ disableAnimation: true }}
        classNames={{
          label: 'text-xs font-medium'
        }}
      />
      <Select
        aria-label='core'
        aria-hidden='false'
        name='status'
        placeholder='--'
        label='Төлөв'
        defaultSelectedKeys={[defaultParams.status || '']}
        labelPlacement='outside'
        items={objectToArray(statusOrderMap)}
        variant='bordered'
        classNames={{
          label: 'text-xs font-medium'
        }}
      >
        {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
      </Select>

      <Select
        aria-label='core'
        aria-hidden='false'
        name='paymentMethod'
        defaultSelectedKeys={[defaultParams.paymentMethod || '']}
        placeholder='--'
        label='Төлбөрийн хэлбэр'
        labelPlacement='outside'
        items={objectToArray(paymentMethodMap)}
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
          onPress={() => changePathAction('/order')}
          endContent={<BackspaceIcon className='w-4 h-4' />}
          className='w-full'
        >
          {tr('Цэвэрлэх')}
        </Button>
      </div>
    </Form>
  );
}

export default OrderFilterForm;
