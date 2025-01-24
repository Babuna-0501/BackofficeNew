import CoreSubmitButton from '@/components/core/CoreSubmitButton';
import { BrandType, FileType, SupplierType } from '@/types';
import { Form } from '@heroui/react';
import { FunctionComponent, useState } from 'react';
import UpdateBannerList from '@/components/supplier/sections/UpdateBannerList';
import { updateSupplierImageAction } from '@/app/actions/supplier';
import { toastMessage, tr } from '@/utils';
import CoreUploadImage from '@/components/core/CoreUploadImage';

interface SupplierImagesFormProps {
  supplier: SupplierType;
  brands: BrandType[];
}

const SupplierImagesForm: FunctionComponent<SupplierImagesFormProps> = ({ supplier, brands }) => {
  const [allImage, setAllImage] = useState({
    logo: supplier?.logo || '',
    infoBanner: supplier?.infoBanner || '',
    productBanner: supplier?.productBanner || '',
    banners: supplier?.banners || []
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateSupplierImageAction(allImage, supplier.id);

    toastMessage(response);
  };

  return (
    <Form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium'>{tr('Нийлүүлэгчийн лого')}</label>

            <CoreUploadImage
              image={allImage.logo}
              setImage={(logo: string) =>
                setAllImage({
                  ...allImage,
                  logo
                })
              }
              className='w-full'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium'>{tr('Захиалгын баннер')}</label>

            <CoreUploadImage
              image={allImage.productBanner}
              setImage={(productBanner: string) =>
                setAllImage({
                  ...allImage,
                  productBanner
                })
              }
              className='w-full'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium'>{tr('Нийлүүлэгчийн баннер')}</label>

            <CoreUploadImage
              image={allImage.infoBanner}
              setImage={(infoBanner: string) =>
                setAllImage({
                  ...allImage,
                  infoBanner
                })
              }
              className='w-full'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 w-full'>
        <label className='text-xs font-medium'>{tr('Үндсэн баннерууд')}</label>

        <UpdateBannerList
          items={brands}
          banners={allImage.banners}
          setBanners={(banners: FileType[]) => setAllImage({ ...allImage, banners })}
        />
      </div>

      <CoreSubmitButton text='Хадгалах' className='mt-2' />
    </Form>
  );
};

export default SupplierImagesForm;
