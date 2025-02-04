'use client';

import { FeaturedType } from '@/types';
import { FunctionComponent } from 'react';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { toastMessage } from '@/utils';
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
    <div className='flex flex-col justify-center items-center'>
      <CoreSubmitButton text='Хадгалах' className='w-full'/>
    </div> 
   
  );
};

export default FeaturedForm;
