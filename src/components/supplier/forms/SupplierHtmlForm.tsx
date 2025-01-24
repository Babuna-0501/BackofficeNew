import { updateSupplierAction } from '@/app/actions/supplier';
import CoreHtmlEditor from '@/components/core/CoreHtmlEditor';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { SupplierType } from '@/types';
import { toastMessage } from '@/utils';
import { Form } from '@heroui/react';
import { FunctionComponent, useState } from 'react';

interface SupplierHtmlFormAboutProps {
  supplier: SupplierType;
  name: string;
  defaultValue: string;
  label?: string;
}

const SupplierHtmlForm: FunctionComponent<SupplierHtmlFormAboutProps> = ({ supplier, name, defaultValue, label }) => {
  const [html, setHtml] = useState(defaultValue);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append(name, html);

    const response = await updateSupplierAction(formData, supplier.id);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4 h-full'>
      <CoreHtmlEditor html={html} setHtml={setHtml} label={label} />

      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default SupplierHtmlForm;
