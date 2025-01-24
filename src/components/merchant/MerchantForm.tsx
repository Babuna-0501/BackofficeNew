'use client';

import { createMerchantAction, updateMerchantAction } from '@/app/actions/merchant';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { errorMessageMap } from '@/configs';
import { CityType, MerchantType } from '@/types';
import { toastMessage, tr } from '@/utils';
import { Form, Input, Textarea } from '@heroui/react';
import { FunctionComponent } from 'react';
import CoreAddressFormSection from '@/components/core/CoreAddressFormSection';

interface MerchantFormProps {
  locations: CityType[];
  supplierId?: string;
  merchant?: MerchantType;
}

const MerchantForm: FunctionComponent<MerchantFormProps> = ({ supplierId, merchant, locations }) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (supplierId) {
      formData.set('supplierId', supplierId);
    }

    const response = merchant ? await updateMerchantAction(formData, merchant.id) : await createMerchantAction(formData);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4' validationBehavior='native'>
      <Input
        type='text'
        isRequired
        defaultValue={merchant?.businessName}
        name='businessName'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Харилцагчийн нэр')}
        placeholder={tr('Харилцагчийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />

      <Input
        type='text'
        isRequired
        defaultValue={merchant?.name}
        name='name'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Салбарын нэр')}
        placeholder={tr('Салбарын нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />

      <Input
        type='text'
        defaultValue={merchant?.regNo}
        isRequired
        name='regNo'
        variant='bordered'
        label={tr('Харилцагчийн регистр')}
        labelPlacement='outside'
        placeholder={tr('Харилцагчийн регистр')}
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
        defaultValue={merchant?.phone}
        isRequired
        name='phone'
        variant='bordered'
        label={tr('Харилцагчийн утас')}
        labelPlacement='outside'
        placeholder={tr('Харилцагчийн утас')}
        classNames={{
          label: 'text-xs font-medium',
          helperWrapper: 'absolute -bottom-5 left-0'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />

      <CoreAddressFormSection locations={locations} item={merchant} />

      <Textarea
        isRequired
        type='text'
        name='address'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Дэлгэрэнгүй хаяг')}
        defaultValue={merchant?.address}
        placeholder={tr('Дэлгэрэнгүй хаяг')}
        classNames={{
          label: 'text-xs font-medium',
          helperWrapper: 'absolute -bottom-5 left-0'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />

      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default MerchantForm;
