import { uploadImageAction } from '@/app/actions/main';
import { replaceMediaUrl, tr } from '@/utils';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Button, cn, Spinner } from '@heroui/react';
import { FunctionComponent, useState, useTransition } from 'react';
import CoreImage from '@/components/core/CoreImage';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface CoreUploadImageProps {
  className?: string;
  image: string;
  setImage: (image: string) => void;
}

const CoreUploadImage: FunctionComponent<CoreUploadImageProps> = ({ className, setImage, image }) => {
  const [isPending, startTransition] = useTransition();
  const [showXButton, setShowXButton] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);

    if (files.length > 0) {
      startTransition(async () => {
        const formData = new FormData();
        files.forEach((file: File) => formData.append('files', file));

        const response = await uploadImageAction(formData);

        if (response && response.data) {
          const responseImages = response.data.map((item: { image: string }) => replaceMediaUrl(item.image));

          setImage(responseImages[0]);
        } else {
          toast(response.message, { type: 'error' });
        }
      });
    }
  };

  const deleteImage = () => {
    if (image) {
      setImage('');
    }
  };

  return (
    <label
      className={cn(
        'w-40 h-40 flex items-center justify-center border border-dashed border-default rounded-md hover:border-primary cursor-pointer relative',
        className
      )}
      onMouseEnter={() => setShowXButton(true)}
      onMouseLeave={() => setShowXButton(false)}
    >
      {isPending ? (
        <Spinner />
      ) : image ? (
        <div className='w-full h-full'>
          <CoreImage src={replaceMediaUrl(image)} objectFit='contain' />
        </div>
      ) : (
        <div className='flex flex-col gap items-center text-default'>
          <PhotoIcon className='w-6 h-6' />
          <span className='text-xs'>{tr('Зураг оруулах')}</span>
        </div>
      )}

      <input type='file' className='hidden' onChange={handleFileChange} />

      <Button
        isIconOnly
        className={`absolute -top-2 -right-2 z-20 ${image && showXButton ? 'flex' : 'hidden'}`}
        radius='full'
        size='sm'
        color='danger'
        onPress={deleteImage}
      >
        <XMarkIcon className='w-4 h-4' />
      </Button>
    </label>
  );
};

export default CoreUploadImage;
