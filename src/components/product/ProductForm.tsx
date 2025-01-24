'use client';

import { objectToArray, replaceUploadingMediaUrl, toastMessage, tr } from '@/utils';
import { Card, CardBody, Form, Input, Select, SelectItem } from "@heroui/react";
import { FunctionComponent, useState } from 'react';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { errorMessageMap, isActiveMap, isCheckedMap } from '@/configs';
import { BrandType, CategoryType, ProductType } from '@/types';
import { createProductAction, updateProductAction } from '@/app/actions/product';
import CoreUploadImageList from '@/components/core/CoreUploadImageList';

interface ProductFormProps {
  product?: ProductType;
  supplierId?: string;
  brands: BrandType[];
  categories: CategoryType[];
}

const ProductForm: FunctionComponent<ProductFormProps> = ({ product, supplierId, brands, categories }) => {
  const [images, setImages] = useState<string[]>(product?.images || []);

  const brandsList = brands.map(brand => {
    return {
      key: brand.id,
      value: brand.name
    };
  });

  const categoriesList = categories.map(category => {
    return {
      key: category.id,
      value: category.name
    };
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const imageUrls = images.map(image => replaceUploadingMediaUrl(image));

    formData.append('images', JSON.stringify(imageUrls));

    if (supplierId) {
      formData.set('supplierId', supplierId);
    }

    const response = product ? await updateProductAction(formData, product.id) : await createProductAction(formData);

    toastMessage(response);
  };

  return (
    <Form className='grid grid-cols-2 gap-4' onSubmit={onSubmit} validationBehavior='native'>
      <Card className='h-full'>
        <CardBody className='flex flex-col gap-4 pb-8'>
          <Input
            type='text'
            defaultValue={product?.name}
            isRequired
            name='name'
            variant='bordered'
            label={tr('Бүтээгдэхүүний нэр')}
            labelPlacement='outside'
            placeholder={tr('Бүтээгдэхүүний нэр')}
            classNames={{
              label: 'text-xs font-medium',
              helperWrapper: 'absolute -bottom-5 left-0'
            }}
            validate={value => {
              if (!value) return errorMessageMap['required'];
            }}
          />

          <Select
            aria-label='core'
            aria-hidden='false'
            defaultSelectedKeys={[product?.splitSale?.toString() || '']}
            name='splitSale'
            isRequired
            placeholder='--'
            label='Ширхгээр зарах'
            labelPlacement='outside'
            items={objectToArray(isCheckedMap)}
            variant='bordered'
            classNames={{
              label: 'text-xs font-medium',
              helperWrapper: 'absolute -bottom-5 left-0'
            }}
            validate={value => {
              if (!value) return errorMessageMap['required'];
            }}
          >
            {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
          </Select>

          <div className='grid grid-cols-2 gap-4'>
            <Input
              type='text'
              defaultValue={product?.sku}
              isRequired
              name='sku'
              variant='bordered'
              label={tr('Бүтээгдэхүүний SKU')}
              labelPlacement='outside'
              placeholder={tr('Бүтээгдэхүүний SKU')}
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
              defaultValue={product?.barCode}
              isRequired
              name='barCode'
              variant='bordered'
              label={tr('Бүтээгдэхүүний баркод')}
              labelPlacement='outside'
              placeholder={tr('Бүтээгдэхүүний баркод')}
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            />

            <Select
              aria-label='core'
              aria-hidden='false'
              defaultSelectedKeys={product?.categoryIds}
              name='categoryId'
              isRequired
              placeholder='--'
              label='Категори сонгох'
              labelPlacement='outside'
              items={categoriesList}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>

            <Select
              aria-label='core'
              aria-hidden='false'
              defaultSelectedKeys={[product?.brandId || '']}
              name='brandId'
              isRequired
              placeholder='--'
              label='Брэнд сонгох'
              labelPlacement='outside'
              items={brandsList}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>

            <Input
              type='number'
              defaultValue={product?.inCase?.toString()}
              isRequired
              name='inCase'
              variant='bordered'
              label={tr('Хайрцаг дахь тоо')}
              labelPlacement='outside'
              placeholder={tr('Хайрцаг дахь тоо')}
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            />

            <Select
              aria-label='core'
              aria-hidden='false'
              defaultSelectedKeys={[product?.isActive?.toLocaleString() || '']}
              name='isActive'
              isRequired
              placeholder='--'
              label='Төлөв'
              labelPlacement='outside'
              items={objectToArray(isActiveMap)}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>

            <Select
              aria-label='core'
              aria-hidden='false'
              isRequired
              defaultSelectedKeys={[product?.isAlcohol?.toString() || '']}
              name='isAlcohol'
              placeholder='--'
              label={tr('Алкохолны төрөл эсэх')}
              labelPlacement='outside'
              items={objectToArray(isCheckedMap)}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>

            <Select
              aria-label='core'
              aria-hidden='false'
              isRequired
              name='cityTax'
              defaultSelectedKeys={[product?.cityTax?.toString() || '']}
              placeholder='--'
              label={tr('Хотын татвар төлөх эсэх')}
              labelPlacement='outside'
              items={objectToArray(isCheckedMap)}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
              validate={value => {
                if (!value) return errorMessageMap['required'];
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>
          </div>
        </CardBody>
      </Card>

      <Card className='gap-2 flex flex-col h-full'>
        <CardBody className='gap-2 w-full'>
          <label className='text-xs font-medium'>{tr('Зураг оруулах')}</label>

          <div className='grid grid-cols-2 gap-4 w-full'>
            <CoreUploadImageList images={images} setImages={setImages} className='w-full h-48' maxImages={4} />
          </div>

          <CoreSubmitButton text='Хадгалах' className='mt-auto' />
        </CardBody>
      </Card>
    </Form>
  );
};

export default ProductForm;
