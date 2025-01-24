'use server';

import { createProduct, deleteProduct, updateProduct } from '@/services';
import { formDataToObject, removeEmptyStringFields } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function createProductAction(formData: FormData) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const newData = {
    ...data,
    images: JSON.parse(data.images)
  };

  const response = await createProduct(newData);

  return response;
}

export async function updateProductAction(formData: FormData, id: string) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const newData = {
    ...data,
    images: JSON.parse(data.images)
  };

  const response = await updateProduct(newData, id);

  revalidatePath(`/product/${id}`);

  return response;
}

export async function deleteProductAction(id: string) {
  const response = await deleteProduct(id);

  revalidatePath(`/product/${id}`);

  return response;
}
