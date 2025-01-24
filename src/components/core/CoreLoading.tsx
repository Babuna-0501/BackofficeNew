import { tr } from '@/utils';
import { Spinner } from "@heroui/react";

function CoreLoading() {
  return (
    <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
      <Spinner color='primary' />
      <span className='text-xs'>{tr('Уншиж байна')}.</span>
    </div>
  );
}

export default CoreLoading;
