'use server';

import { redirect } from 'next/navigation';
import { deleteCookie, setCookie } from '@/app/actions/cookies';
import { uploadImageFetcher } from '@/services';

export const chooseSupplierAction = async (supplierId: string, pathname: string) => {
  setCookie('supplierId', supplierId);

  redirect(pathname);
};

export const removeSupplierAction = async (pathname: string) => {
  deleteCookie('supplierId');

  redirect(pathname);
};

export const changePathAction = async (pathname: string) => {
  redirect(pathname);
};

export const uploadImageAction = async (formData: FormData) => await uploadImageFetcher(formData);
