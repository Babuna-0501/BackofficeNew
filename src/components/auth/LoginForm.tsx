'use client';

import { loginAction } from '@/app/actions/auth';
import { tr } from '@/utils';
import { useState } from 'react';
import { errorMessageMap } from '@/configs';
import { Card, CardBody, Form, Input } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import CoreSubmitButton from '@/components/core/CoreSubmitButton';

function LoginForm() {
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { message } = await loginAction(formData);

    if (message) {
      setMessage(message);
    }
  };

  const passwordEndContent = (
    <div onClick={toggleVisibility} className='cursor-pointer'>
      {isVisible ? <EyeIcon className='w-6 h-6 text-default-400' /> : <EyeSlashIcon className='w-6 h-6 text-default-400' />}
    </div>
  );

  return (
    <Form className='w-full flex flex-col gap-3' onSubmit={onSubmit} validationBehavior='native'>
      {message && (
        <Card className='bg-danger text-white text-xs w-full'>
          <CardBody>{message}</CardBody>
        </Card>
      )}

      <Input
        isRequired
        type='text'
        name='phoneNumber'
        variant='bordered'
        label={tr('Нэвтрэх нэр')}
        placeholder={tr('Нэвтрэх нэр')}
        labelPlacement='outside'
        classNames={{
          label: 'text-xs font-medium',
          helperWrapper: 'absolute -bottom-5 left-0'
        }}
        errorMessage={errorMessageMap['required']}
      />

      <Input
        isRequired
        name='password'
        variant='bordered'
        label={tr('Нууц үг')}
        placeholder={tr('Нууц үг')}
        labelPlacement='outside'
        endContent={passwordEndContent}
        type={isVisible ? 'text' : 'password'}
        classNames={{
          label: 'text-xs font-medium',
          helperWrapper: 'absolute -bottom-5 left-0'
        }}
        errorMessage={errorMessageMap['required']}
      />

      <CoreSubmitButton text='Нэвтрэх' className='mt-2 w-full' />
    </Form>
  );
}

export default LoginForm;
