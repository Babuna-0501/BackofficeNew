import { ChipProps } from '@heroui/react';

export const statusColorMap: Record<string, ChipProps['color']> = {
  created: 'default',
  pending: 'warning',
  confirmed: 'success',
  delivered: 'primary',
  reordered: 'secondary',
  cancelled: 'danger',
  returned: 'danger'
};

export const isActiveMap: Record<string, string> = {
  true: 'Идэвхтэй',
  false: 'Идэвхгүй'
};

export const isCheckedMap: Record<string, string> = {
  true: 'Тийм',
  false: 'Үгүй'
};

export const paymentMethodMap: Record<string, string> = {
  cash: 'Бэлнээр'
};

export const errorMessageMap: Record<string, string> = {
  required: 'Заавал байх ёстой'
};
