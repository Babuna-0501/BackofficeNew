'use server';

import { fetcher } from '@/services';
import { FileType } from '@/types';
import { formDataToObject } from '@/utils';

export async function exportReportAction(formData: FormData) {
  const rawFormData = formDataToObject(formData);

  const fileName = `${rawFormData.startDate} - ${rawFormData.endDate} тайлан.xlsx`;

  const response = await fetcher<FileType>(
    `/order/bo/report?filter[startDate]=${rawFormData.startDate}&filter[endDate]=${rawFormData.endDate}`
  );

  return { file: response ? response.file : '', name: fileName };
}
