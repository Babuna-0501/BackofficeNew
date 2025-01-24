import { tr } from '@/utils';
import { FunctionComponent } from 'react';

interface CoreTextInfoProps {
  label: string;
  value: React.ReactNode;
}

const CoreTextInfo: FunctionComponent<CoreTextInfoProps> = ({ label, value }) => {
  return (
    <div className='text-xs flex gap-2 items-center'>
      <span className='text-default-400'>{tr(label)}:</span>
      <span>{value || '--'}</span>
    </div>
  );
};

export default CoreTextInfo;
