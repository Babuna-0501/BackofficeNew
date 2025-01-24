'use client';

import { createSupplierAction, updateSupplierAction } from '@/app/actions/supplier';
import CoreAddressFormSection from '@/components/core/CoreAddressFormSection';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { errorMessageMap } from '@/configs';
import { CityType, SupplierType } from '@/types';
import { toastMessage, tr } from '@/utils';
import { Form, Input, Select, SelectItem } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

interface SupplierGeneralFormProps {
  locations: CityType[];
  suppliers: SupplierType[];
  supplier?: SupplierType;
}

const SupplierGeneralForm: FunctionComponent<SupplierGeneralFormProps> = ({ supplier, locations, suppliers }) => {
  const router = useRouter();

  const companies = suppliers
    .map(company => ({ key: company.id, value: company.name }))
    .filter(company => (supplier ? company.key !== supplier.id : true));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let response;

    if (!supplier) {
      response = await createSupplierAction(formData);

      router.replace(`/supplier/${response.data.id}?tabName=images`);
    } else {
      response = await updateSupplierAction(formData, supplier.id);
    }

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='w-full flex flex-col gap-4' validationBehavior='native'>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <Input
          type='text'
          defaultValue={supplier?.name}
          isRequired
          name='name'
          variant='bordered'
          label={tr('Нийлүүлэгчийн нэр')}
          labelPlacement='outside'
          placeholder={tr('Нийлүүлэгчийн нэр')}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        />

        <Select
          name='parentId'
          placeholder='--'
          label={tr('Компани сонгох')}
          defaultSelectedKeys={[supplier?.parentId || '']}
          aria-label='core'
          aria-hidden='false'
          labelPlacement='outside'
          items={companies}
          variant='bordered'
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
        >
          {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
        </Select>

        <Input
          type='text'
          defaultValue={supplier?.regNo}
          isRequired
          name='regNo'
          variant='bordered'
          label={tr('Нийлүүлэгчийн регистр')}
          labelPlacement='outside'
          placeholder={tr('Нийлүүлэгчийн регистр')}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        />

        <Input
          type='text'
          defaultValue={supplier?.phone}
          isRequired
          name='phone'
          variant='bordered'
          label={tr('Нийлүүлэгчийн утас')}
          labelPlacement='outside'
          placeholder={tr('Нийлүүлэгчийн утас')}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        />

        <Input
          type='text'
          defaultValue={supplier?.email}
          isRequired
          name='email'
          variant='bordered'
          label={tr('Нийлүүлэгчийн мэйл хаяг')}
          labelPlacement='outside'
          placeholder={tr('Нийлүүлэгчийн мэйл хаяг')}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        />

        <Input
          type='number'
          defaultValue={supplier?.orderMin?.toString()}
          isRequired
          name='orderMin'
          variant='bordered'
          label={tr('Захиалгын доод дүн')}
          labelPlacement='outside'
          placeholder={tr('Захиалгын доод дүн')}
          classNames={{
            label: 'text-xs font-medium',
            helperWrapper: 'absolute -bottom-5 left-0'
          }}
          validate={value => {
            if (!value) return errorMessageMap['required'];
          }}
        />
      </div>

      <CoreAddressFormSection locations={locations} item={supplier} />

      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default SupplierGeneralForm;
