'use server';

import { createCategory, deleteCategory, getCategories, updateCategory } from '@/services';
import { SearchParamsFilterType } from '@/types';
import { formDataToObject, removeEmptyStringFields } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function getCategoriesAction(filter: SearchParamsFilterType) {
  const categoriesData = await getCategories(removeEmptyStringFields(filter));

  return { data: categoriesData?.data ?? [], hasMore: categoriesData?.totalPage > categoriesData?.currentPage };
}

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
