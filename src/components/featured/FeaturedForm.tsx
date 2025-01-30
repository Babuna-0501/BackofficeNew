'use client';

import { FeaturedType } from '@/types';
import { errorMessageMap, isActiveMap } from '@/configs';
import { Form, Input, Select, SelectItem } from '@heroui/react';
import { FunctionComponent, useState } from 'react';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { objectToArray, toastMessage, tr } from '@/utils';
import { createBrandAction, updateBrandAction } from '@/app/actions/brand';

interface FeaturedFormProps {
  brand?: FeaturedType;
  product?: FeaturedType;
  supplierId?: string;
}

const FeaturedForm: FunctionComponent<FeaturedFormProps> = ({ brand, product , supplierId }) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (supplierId) {
      formData.set('supplierId', supplierId);
    }

    const response = brand || product ? await updateBrandAction(formData , brand?.id!) : await createBrandAction(formData);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4' validationBehavior='native'>
      <Input
        type='text'
        defaultValue=''
        isRequired
        name='name'
        variant='bordered'
        labelPlacement='outside'
        label={tr('нэр')}
        placeholder={tr('нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />


      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default FeaturedForm;
