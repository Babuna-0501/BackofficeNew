import { tr } from '@/utils';
import CoreImage from '@/components/core/CoreImage';

function CoreComingSoon() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='w-24 h-24'>
        <CoreImage src='/assets/logos/logo-admin.svg' />
      </div>

      <p className='text-6xl uppercase '>{tr('Тун Удахгүй')}...</p>
    </div>
  );
}

export default CoreComingSoon;
