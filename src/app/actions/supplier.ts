'use server';

import { createSupplier, getSuppliers, updateSupplier } from '@/services';
import { BankAccountType, FileType, SearchParamsFilterType } from '@/types';
import { formDataToObject, removeEmptyStringFields } from '@/utils';
import { revalidatePath } from 'next/cache';

export async function getSuppliersAction(filter: SearchParamsFilterType) {
  const suppliersData = await getSuppliers(removeEmptyStringFields(filter));

  return { data: suppliersData?.data ?? [], hasMore: suppliersData?.totalPage > suppliersData?.currentPage };
}

export async function createSupplierAction(formData: FormData) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const response = await createSupplier(data);

  return response;
}

export async function updateSupplierImageAction(
  allImage: { logo: string; infoBanner: string; productBanner: string; banners: FileType[] },
  id: string
) {
  const response = await updateSupplier(allImage, id);

  revalidatePath(`/supplier/${id}`);

  return response;
}

export async function updateSupplierBankAction(bankAccounts: BankAccountType[], id: string) {
  const response = await updateSupplier({ bankAccounts }, id);

  revalidatePath(`/supplier/${id}`);

  return response;
}

export async function updateSupplierAction(formData: FormData, id: string) {
  const data = removeEmptyStringFields(formDataToObject(formData));

  const response = await updateSupplier(data, id);

  revalidatePath(`/supplier/${id}`);

  return response;
}
