'use client';

import { changePathAction } from '@/app/actions/main';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
import { FunctionComponent } from 'react';

interface CoreEditButtonProps {
  pathname: string;
}

const CoreEditButton: FunctionComponent<CoreEditButtonProps> = ({ pathname }) => {
  return (
    <Button
      variant='flat'
      color='primary'
      isIconOnly={true}
      onPress={() => changePathAction(pathname)}
      startContent={<PencilSquareIcon className='w-5 h-5 text-primary' />}
    />
  );
};

export default CoreEditButton;
