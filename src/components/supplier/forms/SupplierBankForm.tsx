import { updateSupplierBankAction } from '@/app/actions/supplier';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { errorMessageMap } from '@/configs';
import { BankAccountType, SupplierType } from '@/types';
import { toastMessage, tr } from '@/utils';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Form, Input } from '@heroui/react';
import { FunctionComponent, useState } from 'react';

interface SupplierBankFormProps {
  supplier: SupplierType;
}

const SupplierBankForm: FunctionComponent<SupplierBankFormProps> = ({ supplier }) => {
  const defaultValue =
    supplier?.bankAccounts && supplier?.bankAccounts.length === 0
      ? [{ bankName: '', accountNumber: '', accountName: '' }]
      : supplier?.bankAccounts;

  const [bankAccounts, setBankAccounts] = useState<BankAccountType[]>(defaultValue);

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { bankName: '', accountNumber: '', accountName: '' }]);
  };

  const deleteBankAccount = (index: number) => {
    const updatedBankAccounts = bankAccounts.filter((_, i) => i !== index);

    setBankAccounts(updatedBankAccounts);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedBankAccounts = bankAccounts.map((bank, i) => (i === index ? { ...bank, [field]: value } : bank));
    setBankAccounts(updatedBankAccounts);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateSupplierBankAction(bankAccounts, supplier.id);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-2 h-full' validationBehavior='native'>
      {bankAccounts.map((bank, index) => {
        return (
          <div key={index} className='flex gap-4 items-end mb-3 w-full'>
            <div className='grid grid-cols-3 gap-4 flex-1'>
              <Input
                type='text'
                defaultValue={bank?.bankName}
                isRequired
                variant='bordered'
                label={tr('Банкны нэр')}
                labelPlacement='outside'
                placeholder={tr('Банкны нэр')}
                onChange={e => handleChange(index, 'bankName', e.target.value)}
                classNames={{
                  label: 'text-xs font-medium',
                  helperWrapper: 'absolute -bottom-5 left-0'
                }}
                validate={value => {
                  if (!value) return errorMessageMap['required'];
                }}
              />

              <Input
                type='text'
                defaultValue={bank?.accountName}
                isRequired
                variant='bordered'
                label={tr('Дансны нэр')}
                labelPlacement='outside'
                placeholder={tr('Дансны нэр')}
                onChange={e => handleChange(index, 'accountName', e.target.value)}
                classNames={{
                  label: 'text-xs font-medium',
                  helperWrapper: 'absolute -bottom-5 left-0'
                }}
                validate={value => {
                  if (!value) return errorMessageMap['required'];
                }}
              />

              <Input
                type='text'
                defaultValue={bank?.accountNumber}
                isRequired
                variant='bordered'
                label={tr('Банкны данс')}
                labelPlacement='outside'
                placeholder={tr('Банкны данс')}
                onChange={e => handleChange(index, 'accountNumber', e.target.value)}
                classNames={{
                  label: 'text-xs font-medium',
                  helperWrapper: 'absolute -bottom-5 left-0'
                }}
                validate={value => {
                  if (!value) return errorMessageMap['required'];
                }}
              />
            </div>

            <Button isIconOnly color='danger' onPress={() => deleteBankAccount(index)}>
              <TrashIcon className='w-5 h-5' />
            </Button>
          </div>
        );
      })}

      <Button fullWidth size='sm' onPress={addBankAccount}>
        <PlusIcon className='w-5 h-5' />
        {tr('Банкны данс нэмэх')}
      </Button>

      <CoreSubmitButton text='Хадгалах' className='mt-auto' />
    </Form>
  );
};

export default SupplierBankForm;
