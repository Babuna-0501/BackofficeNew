'use client';

import { FunctionComponent, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import CoreImage from '@/components/core/CoreImage';
import { replaceMediaUrl } from '@/utils';

interface CoreGalleryProps {
  images: string[];
  isGallery?: boolean;
}

const CoreGallery: FunctionComponent<CoreGalleryProps> = ({ images, isGallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className='flex flex-col gap-2'>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='h-[600px] w-[600px] border rounded-md'
      >
        {images?.map((src: string, index: number) => {
          return (
            <SwiperSlide key={index} className='w-full h-full p-3'>
              <CoreImage src={replaceMediaUrl(src)} objectFit='contain' />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {isGallery && (
        <Swiper
          onSwiper={(swiper: SwiperClass) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='h-24 w-[600px]'
        >
          {images?.map((src: string, index: number) => {
            return (
              <SwiperSlide key={index} className='w-full h-full border rounded-md overflow-hidden'>
                <CoreImage src={replaceMediaUrl(src)} objectFit='contain' />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default CoreGallery;
