import { updateSupplierAction } from '@/app/actions/supplier';
import CoreHtmlEditor from '@/components/core/CoreHtmlEditor';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { SupplierType } from '@/types';
import { toastMessage } from '@/utils';
import { Form } from '@heroui/react';
import { FunctionComponent, useEffect, useState } from 'react';

interface SupplierHtmlFormAboutProps {
  supplier: SupplierType;
  name: keyof SupplierType;
  label?: string;
}

const SupplierHtmlForm: FunctionComponent<SupplierHtmlFormAboutProps> = ({ supplier, name, label }) => {
  const [html, setHtml] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append(name, html || '<br>');

    const response = await updateSupplierAction(formData, supplier.id);

    toastMessage(response);
  };

  useEffect(() => {
    setHtml(supplier[name]?.toString() || '');
  }, [name, supplier]);

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4 h-full'>
      <CoreHtmlEditor html={html} setHtml={setHtml} label={label} />

      <CoreSubmitButton text='Хадгалах' />
    </Form>
  );
};

export default SupplierHtmlForm;
