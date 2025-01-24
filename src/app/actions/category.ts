'use server';

import { createCategory, deleteCategory, updateCategory } from '@/services';
import { formDataToObject } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function createCategoryAction(formData: FormData) {
  const data = formDataToObject(formData);

  const response = await createCategory(data);

  return response;
}

export async function updateCategoryAction(formData: FormData, id: string) {
  const data = formDataToObject(formData);

  const response = await updateCategory(data, id);

  revalidatePath(`/category/${id}/edit`);

  return response;
}

export async function deleteCategoryAction(id: string) {
  const response = await deleteCategory(id);

  revalidatePath(`/category`);

  return response;
}
