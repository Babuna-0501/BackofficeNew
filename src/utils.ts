/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MEDIA_URL } from '@/configs';
import { ApiResponseType } from '@/types';
import { toast } from 'react-toastify';

type KeyValue<K extends string | number | symbol, V> = { key: K; value: V };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tr(text: string) {
  return text;
}

export const formatUnit = (value: string | number, unit: string) => {
  return value ? `${value.toLocaleString()} ${unit}` : `0 ${unit}`;
};

export function objectToArray<T extends Record<string, unknown>>(obj: T): KeyValue<keyof T, T[keyof T]>[] {
  return Object.entries(obj).map(([key, value]) => ({
    key: key as keyof T,
    value: value as T[keyof T]
  }));
}

export const convertObjectToParam = (object: Record<string, unknown>): string =>
  new URLSearchParams(
    Object.entries(object)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)])
  ).toString();

export const removeFromObject = (obj: Record<string, string>): void =>
  Object.keys(obj).forEach(key => {
    if (obj[key] === '' || (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0 && obj[key] !== null)) {
      delete obj[key];
    }
  });

export const removeEmptyStringFields = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== '' && value !== undefined && value !== null && value !== 'undefined')
  );
};

export function formDataToObject(formData: FormData): Record<string, string | string[]> {
  const obj: Record<string, string | string[]> = {};

  formData.forEach((value: any, key) => {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).push(value);
      } else {
        obj[key] = [obj[key] as string, value];
      }
    } else {
      obj[key] = value;
    }
  });

  return obj;
}

export const replaceMediaUrl = (imageUrl?: string) => {
  if (!imageUrl) {
    return '/assets/logos/logo-admin.svg';
  }

  if (!imageUrl.includes('/media')) {
    return `${MEDIA_URL}/original/${imageUrl}`;
  }

  return imageUrl.replace(/^https:\/\/[^/]+\/media/, `${MEDIA_URL}`);
};

export const replaceUploadingMediaUrl = (image: string) => image.replace(`${MEDIA_URL}/original/`, '');

export const getValueByPath = (obj: Record<string, any>, path: string): any => {
  const keys = path.split('.');

  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export function convertExcelFromBase64(base64Data: string, filename = 'file.xlsx') {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function toastMessage<T>(response: ApiResponseType<T>) {
  if (!response.errors) {
    toast(tr('Амжилттай хадгаллаа'), { type: 'success' });
  } else {
    toast(response.errors[0].message, { type: 'error' });
  }
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const params: { [anyProp: string]: string } = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}
