'use client';

import { createCategoryAction, updateCategoryAction } from '@/app/actions/category';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { errorMessageMap } from '@/configs';
import { CategoryType } from '@/types';
import { toastMessage, tr } from '@/utils';
import { Form, Input } from "@heroui/react";
import { FunctionComponent } from 'react';

interface CategoryFormProps {
  supplierId?: string;
  category?: CategoryType;
}

const CategoryForm: FunctionComponent<CategoryFormProps> = ({ supplierId, category }) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (supplierId) {
      formData.set('supplierId', supplierId);
    }

    const response = category ? await updateCategoryAction(formData, category.id) : await createCategoryAction(formData);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4' validationBehavior='native'>
      <Input
        type='text'
        isRequired
        defaultValue={category?.name}
        name='name'
        variant='bordered'
        labelPlacement='outside'
        label={tr('Категорийн нэр')}
        placeholder={tr('Категорийн нэр')}
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

export default CategoryForm;
