import { replaceMediaUrl } from '@/utils';
import { Avatar, AvatarGroup } from "@heroui/react";
import { FunctionComponent } from 'react';
import CoreImage from '@/components/core/CoreImage';

interface CoreGroupImagesProps {
  images: string[];
  max?: number;
  renderCount?: (count: number) => React.ReactNode;
}

const CoreGroupImages: FunctionComponent<CoreGroupImagesProps> = ({ images, max = 3, renderCount }) => {
  if (!images?.length) {
    return <Avatar classNames={{ base: 'bg-default-100' }} src={replaceMediaUrl()} />;
  }

  return (
    <AvatarGroup max={max} size='md' classNames={{ count: 'bg-default-100' }} renderCount={renderCount}>
      {images.map((src: string, index: number) => {
        return (
          <Avatar
            key={index}
            src={replaceMediaUrl(src)}
            classNames={{ base: 'bg-default-100' }}
            showFallback
            fallback={<CoreImage src={replaceMediaUrl()} />}
          />
        );
      })}
    </AvatarGroup>
  );
};

export default CoreGroupImages;
