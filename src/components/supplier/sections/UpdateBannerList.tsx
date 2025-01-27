import CoreImage from '@/components/core/CoreImage';
import { BrandType, FileType } from '@/types';
import { replaceMediaUrl, tr, cn } from '@/utils';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure
} from '@heroui/react';
import { FunctionComponent, useState } from 'react';
import { SUPPLIER_BANNER_TYPES } from '@/configs';
import { toast } from 'react-toastify';
import CoreUploadImages from '@/components/core/CoreUploadImages';

interface AddBrandBannerProps {
  items: BrandType[];
  banners: FileType[];
  setBanners: (banners: FileType[]) => void;
}

const AddBrandBanner: FunctionComponent<AddBrandBannerProps> = ({ items, setBanners, banners }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selectedBannerImage, setSelectedBannerImage] = useState<string>('');
  const [selectedBannerType, setSelectedBannerType] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');

  const [editingBannerIndex, setEditingBannerIndex] = useState<number | null>(null);
  const [showXButton, setShowXButton] = useState<number | null>(null);

  const itemsList = items.map(item => ({
    key: item.id,
    value: item.name
  }));

  const deleteImage = (index: number) => {
    const updatedImages = banners.filter((_, i) => i !== index);
    setBanners(updatedImages);
  };

  const handleAddOrUpdateBanner = () => {
    if (selectedBannerImage && selectedBannerType) {
      const newBanner: FileType = {
        file: selectedBannerImage,
        type: selectedBannerType
      };

      if (selectedBannerType !== 3 && selectedId) {
        newBanner.id = selectedId;
      }

      if (editingBannerIndex !== null) {
        const updatedBanners = [...banners];
        updatedBanners[editingBannerIndex] = newBanner;
        setBanners(updatedBanners);
      } else {
        setBanners([...banners, newBanner]);
      }

      onClose();
    } else {
      toast('Бүх талбарыг бөглөнө үү.', { type: 'warning' });
    }
  };

  const onOpenNewBanner = () => {
    setSelectedBannerImage('');
    setSelectedBannerType(null);
    setSelectedId('');
    setEditingBannerIndex(null);
    onOpen();
  };

  const editBanner = (banner: FileType, index: number) => {
    setSelectedBannerImage(banner.file);
    setSelectedBannerType(banner.type);
    setEditingBannerIndex(index);
    setSelectedId(banner.id || '');
    onOpen();
  };

  const itemsMap: { [key: number]: { name: string; label: string } } = {
    2: { name: 'brandId', label: 'Брэнд сонгох' }
  };

  return (
    <div className='grid grid-cols-3 gap-3'>
      {banners.map((banner, index) => (
        <div
          key={index}
          className={cn('relative hover:border-primary rounded-md border w-full h-40 flex items-center justify-center')}
          onMouseEnter={() => setShowXButton(index)}
          onMouseLeave={() => setShowXButton(null)}
          onClick={() => editBanner(banner, index)}
        >
          <div className={cn('w-full h-full')}>
            <CoreImage src={replaceMediaUrl(banner.file)} />
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
      ))}

      <Button onPress={onOpenNewBanner} size='sm' className='w-full h-40' variant='bordered'>
        <PlusIcon className='w-5 h-5' />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>{editingBannerIndex !== null ? tr('Засах') : tr('Баннер нэмэх')}</ModalHeader>
          <ModalBody className='gap-4 flex flex-col'>
            <Select
              aria-label='core'
              aria-hidden='false'
              name='type'
              isRequired
              defaultSelectedKeys={[selectedBannerType?.toString() || '']}
              onChange={e => setSelectedBannerType(Number(e.target.value))}
              placeholder='--'
              label='Төрөл сонгох'
              labelPlacement='outside'
              items={SUPPLIER_BANNER_TYPES}
              variant='bordered'
              classNames={{
                label: 'text-xs font-medium',
                helperWrapper: 'absolute -bottom-5 left-0'
              }}
            >
              {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
            </Select>

            {selectedBannerType && itemsMap[selectedBannerType] ? (
              <Select
                aria-label='core'
                aria-hidden='false'
                name={itemsMap[selectedBannerType].name}
                defaultSelectedKeys={[selectedId]}
                onChange={e => setSelectedId(e.target.value)}
                placeholder='--'
                label={itemsMap[selectedBannerType].label}
                labelPlacement='outside'
                items={itemsList}
                variant='bordered'
                classNames={{
                  label: 'text-xs font-medium',
                  helperWrapper: 'absolute -bottom-5 left-0'
                }}
              >
                {option => <SelectItem key={option.key}>{option.value}</SelectItem>}
              </Select>
            ) : null}

            <CoreUploadImages
              images={selectedBannerImage ? [selectedBannerImage] : []}
              setImages={images => setSelectedBannerImage(images[0] || '')}
              className='w-full'
              maxImages={1}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' fullWidth onPress={handleAddOrUpdateBanner}>
              {tr(editingBannerIndex !== null ? 'Засах' : 'Нэмэх')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddBrandBanner;
