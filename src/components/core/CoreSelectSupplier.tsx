import { tr, searchParamsToObject } from '@/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FunctionComponent, Key, useState } from 'react';
import { chooseSupplierAction, removeSupplierAction } from '@/app/actions/main';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import CoreNotFound from '@/components/core/CoreNotFound';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useSuppliers } from '@/hooks';

interface CoreSelectSupplierProps {
  supplierId: string;
}

const CoreSelectSupplier: FunctionComponent<CoreSelectSupplierProps> = props => {
  const { supplierId } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const { items, hasMore, isLoading, onLoadMore, onSearchValue } = useSuppliers({ fetchDelay: 1500 });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore
  });

  const onSelectionChange = (key: Key | null) => {
    const updatedParams = new URLSearchParams(searchParamsToObject(searchParams));

    let newPath = pathname;

    if (key) {
      if (pathname.startsWith('/supplier/')) {
        newPath = pathname
          .split('/')
          .map((part, index) => {
            if (index === 2) {
              return key.toString();
            }
            return part;
          })
          .join('/');
      }

      newPath = `${newPath}?${updatedParams.toString()}`;

      chooseSupplierAction(key.toString(), newPath);
    } else {
      removeSupplierAction(newPath);
    }
  };

  const onClear = () => {
    removeSupplierAction(pathname);
  };

  return (
    <Autocomplete
      className='max-w-xs'
      defaultSelectedKey={supplierId}
      defaultItems={items}
      isLoading={isLoading}
      onInputChange={onSearchValue}
      color='primary'
      label={tr('-- Нийлүүлэгч сонгох --')}
      variant='flat'
      radius='none'
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      onSelectionChange={onSelectionChange}
      clearButtonProps={{
        onPress: onClear
      }}
      listboxProps={{
        emptyContent: <CoreNotFound text='Нийлүүлэгч олдсонгүй' />
      }}
      scrollShadowProps={{
        isEnabled: false
      }}
    >
      {item => (
        <AutocompleteItem key={item.id} className='pl-4'>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default CoreSelectSupplier;
