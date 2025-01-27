import { cn, replaceMediaUrl, tr } from '@/utils';
import CoreImage from '@/components/core/CoreImage';
import { Button, Modal, ModalBody, ModalContent, Spinner, useDisclosure } from '@heroui/react';
import { uploadImageAction } from '@/app/actions/main';
import { FunctionComponent, useState, useTransition } from 'react';
import { ExclamationCircleIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MAX_FILE_SIZE } from '@/configs';
import { toast } from 'react-toastify';

interface CoreUploadImagesProps {
  images: string[];
  setImages: (images: string[]) => void;
  className?: string;
  maxImages?: number;
}

const CoreUploadImages: FunctionComponent<CoreUploadImagesProps> = ({ images, setImages, className, maxImages = 100 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isPending, startTransition] = useTransition();
  const [modalImage, setModalImage] = useState<string>('');
  const [showXButton, setShowXButton] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteImage = (index: number) => {
    if (maxImages === 1) {
      setImages([]);
    } else {
      const updatedImages = images.filter((_, i) => i !== index);

      setImages(updatedImages.length > 0 ? updatedImages : []);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);

    setErrorMessage(null);

    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);

    if (files.length > validFiles.length) {
      setErrorMessage('1MB хэмжээнээс хэтрэхгүй байх ёстой.');
      return;
    }

    if (validFiles.length > 0) {
      startTransition(async () => {
        const formData = new FormData();
        validFiles.forEach((file: File) => formData.append('files', file));

        const response = await uploadImageAction(formData);

        if (response && response.data) {
          const responseImages = response.data.map((item: { image: string }) => replaceMediaUrl(item.image));

          setImages([...images, ...responseImages]);
        } else {
          toast(response.message, { type: 'error' });
        }
      });
    }
  };

  const handleOpenModal = (img: string) => {
    setModalImage(img);
    onOpen();
  };

  return (
    <>
      {images?.map((imageUrl: string, index: number) => {
        if (!imageUrl) {
          return null;
        }

        return (
          <div
            key={index}
            className={cn(
              'relative hover:border-primary rounded-md border w-40 h-40 flex items-center justify-center',
              className
            )}
            onMouseEnter={() => setShowXButton(index)}
            onMouseLeave={() => setShowXButton(null)}
            onClick={() => handleOpenModal(replaceMediaUrl(imageUrl))}
          >
            <div className={cn('w-36 h-36', className)}>
              <CoreImage src={replaceMediaUrl(imageUrl)} />
            </div>

            <Button
              isIconOnly
              className={`absolute -top-2 -right-2 z-20 ${index === showXButton ? 'flex' : 'hidden'}`}
              radius='full'
              size='sm'
              color='danger'
              onPress={() => deleteImage(index)}
            >
              <XMarkIcon className='w-4 h-4' />
            </Button>
          </div>
        );
      })}

      {isPending && (
        <div className={cn('w-40 h-40 rounded-md overflow-hidden flex items-center justify-center', className)}>
          <Spinner size='sm' />
        </div>
      )}

      {maxImages > images.length && !isPending && (
        <label
          className={cn(
            `w-40 h-40 flex flex-col items-center justify-center border border-dashed border-default rounded-md hover:border-primary cursor-pointer text-center ${
              errorMessage ? 'border-danger' : ''
            }`,
            className
          )}
        >
          {errorMessage ? (
            <ExclamationCircleIcon className='w-6 h-6 text-danger' />
          ) : (
            <PhotoIcon className='w-6 h-6 text-default' />
          )}

          <p className={`text-xs px-4 ${errorMessage ? 'text-danger' : 'text-default'}`}>{tr(errorMessage || 'Зураг оруулах')}</p>

          <input type='file' className='hidden' onChange={handleFileChange} />
        </label>
      )}

      <Modal isOpen={isOpen} size='full' onClose={onClose}>
        <ModalContent className='bg-transparent p-20' onClick={onClose}>
          <ModalBody>
            <div className='w-full h-full'>
              <CoreImage src={modalImage} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoreUploadImages;
