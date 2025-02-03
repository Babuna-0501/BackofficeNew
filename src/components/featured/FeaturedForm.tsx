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
    <Form className='flex flex-col justify-center gap-4 items-center'>
      <CoreSubmitButton text='Хадгалах' />
    </Form>
   
  );
};

export default FeaturedForm;
