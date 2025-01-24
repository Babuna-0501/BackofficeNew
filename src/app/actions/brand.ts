'use server';

import { createBrand, deleteBrand, getBrands, updateBrand } from '@/services';
import { SearchParamsFilterType } from '@/types';
import { formDataToObject } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function getBrandsAction(filter: SearchParamsFilterType) {
  const response = await getBrands(filter);

  return response;
}

export async function createBrandAction(formData: FormData) {
  const data = formDataToObject(formData);

  const response = await createBrand(data);

  return response;
}

export async function updateBrandAction(formData: FormData, id: string) {
  const data = formDataToObject(formData);

  const response = await updateBrand(data, id);

  revalidatePath(`/brand/${id}`);

  return response;
}

export async function deleteBrandAction(id: string) {
  const response = await deleteBrand(id);

  revalidatePath(`/brand`);

  return response;
}
