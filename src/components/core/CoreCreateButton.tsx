import { changePathAction } from '@/app/actions/main';
import { tr } from '@/utils';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
import { FunctionComponent } from 'react';

interface CoreCreateButtonProps {
  text: string;
  pathname: string;
}

const CoreCreateButton: FunctionComponent<CoreCreateButtonProps> = ({ text, pathname }) => {
  return (
    <Button color='primary' onPress={() => changePathAction(pathname)} startContent={<PlusIcon className='w-5 h-5' />}>
      {tr(text)}
    </Button>
  );
};

export default CoreCreateButton;
