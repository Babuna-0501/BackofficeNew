'use client';

import { BrandType } from '@/types';
import { errorMessageMap, isActiveMap } from '@/configs';
import { Form, Input, Select, SelectItem } from "@heroui/react";
import { FunctionComponent, useState } from 'react';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { objectToArray, toastMessage, tr } from '@/utils';
import { createBrandAction, updateBrandAction } from '@/app/actions/brand';
import CoreUploadImage from '@/components/core/CoreUploadImage';

interface BrandFormProps {
  brand?: BrandType;
  supplierId?: string;
}

const BrandForm: FunctionComponent<BrandFormProps> = ({ brand, supplierId }) => {
  const [image, setImage] = useState<string>(brand?.image || '');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (supplierId) {
      formData.set('supplierId', supplierId);
    }

    formData.append('image', image);

    const response = brand ? await updateBrandAction(formData, brand.id) : await createBrandAction(formData);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4' validationBehavior='native'>
      <Input
        type='text'
        defaultValue={brand?.name}
        isRequired
        name='name'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Брэндийн нэр')}
        placeholder={tr('Брэндийн нэр')}
        classNames={{
          label: 'text-xs font-medium'
        }}
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      />

      <Select
        aria-label='core'
        aria-hidden='false'
        name='isActive'
        placeholder='--'
        defaultSelectedKeys={[brand?.isActive?.toString() || '']}
        label={tr('Төлөв')}
        labelPlacement='outside'
        items={objectToArray(isActiveMap)}
        variant='bordered'
        classNames={{
          label: 'text-xs font-medium'
        }}
        isRequired
        validate={value => {
          if (!value) return errorMessageMap['required'];
        }}
      >
        {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
      </Select>

      <div className='flex flex-col gap-2'>
        <label className='text-xs font-medium'>{tr('Зураг оруулах')}</label>

        <CoreUploadImage image={image} setImage={setImage} />
      </div>

      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default BrandForm;
