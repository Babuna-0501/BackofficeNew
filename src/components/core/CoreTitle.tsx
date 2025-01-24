import { tr } from '@/utils';
import { FunctionComponent } from 'react';

interface CoreTitleProps {
  text: string;
}

const CoreTitle: FunctionComponent<CoreTitleProps> = ({ text }) => {
  return <h2 className='font-medium text-lg'>{tr(text)}</h2>;
};

export default CoreTitle;
