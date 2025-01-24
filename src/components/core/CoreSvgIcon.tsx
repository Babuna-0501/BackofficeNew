import { cn } from '@/utils';
import { FunctionComponent } from 'react';

interface CoreSvgIconProps {
  src: string;
  width?: number;
  height?: number;
  degree?: number;
  className?: string;
}

const CoreSvgIcon: FunctionComponent<CoreSvgIconProps> = props => {
  const { src, width = 18, height = 18, degree, className } = props;

  return (
    <span
      className={cn('dark:bg-white bg-black', className)}
      style={{
        display: 'inline-block',
        width: width,
        height: height,
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        transform: `rotate(${degree}deg)`
      }}
    />
  );
};

export default CoreSvgIcon;
