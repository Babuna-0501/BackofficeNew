import { tr } from '@/utils';
import { FunctionComponent } from 'react';

interface CoreNotFoundProps {
  text?: string;
}

const CoreNotFound: FunctionComponent<CoreNotFoundProps> = ({ text }) => {
  return <span className='text-xs'>{tr(text || 'Мэдээлэл олдсонгүй')}.</span>;
};

export default CoreNotFound;
