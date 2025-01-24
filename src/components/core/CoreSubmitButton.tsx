'use client';

import { tr } from '@/utils';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { FunctionComponent, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface CoreSubmitButtonProps {
  text: string;
  className?: string;
  isDisabled?: boolean;
  onPress?: () => void;
  startContent?: ReactNode;
}

const CoreSubmitButton: FunctionComponent<CoreSubmitButtonProps> = props => {
  const { text, className, isDisabled, onPress, startContent } = props;

  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      color='primary'
      onPress={onPress}
      isLoading={pending}
      className={className}
      isDisabled={isDisabled}
      startContent={startContent}
      endContent={<PaperAirplaneIcon className='w-4 h-4' />}
    >
      {tr(text)}
    </Button>
  );
};

export default CoreSubmitButton;
