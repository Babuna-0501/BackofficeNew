'use server';

import { createMerchant, updateMerchant } from '@/services';
import { formDataToObject, removeEmptyStringFields } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function createMerchantAction(formData: FormData) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const response = await createMerchant(data);

  return response;
}

export async function updateMerchantAction(formData: FormData, id: string) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const response = await updateMerchant(data, id);

  revalidatePath(`/merchant/${id}`);

  return response;
}
