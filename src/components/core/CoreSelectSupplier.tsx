import { tr, searchParamsToObject } from '@/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { FunctionComponent, Key, useState } from 'react';
import { chooseSupplierAction, removeSupplierAction } from '@/app/actions/main';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import CoreNotFound from '@/components/core/CoreNotFound';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useSuppliers } from '@/hooks';
import { SupplierType } from '@/types';
import CoreLoading from '@/components/core/CoreLoading';

interface CoreSelectSupplierProps {
  supplier?: SupplierType;
}

const CoreSelectSupplier: FunctionComponent<CoreSelectSupplierProps> = props => {
  const { supplier } = props;

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

  const onInputChange = (inputValue: string) => {
    if (!inputValue) onClear();

    onSearchValue(inputValue);
  };

  const defaultItems = supplier ? (items.some(item => item.id === supplier.id) ? items : [supplier, ...items]) : items;

  return (
    <Autocomplete
      className='max-w-xs'
      defaultSelectedKey={supplier?.id}
      defaultItems={defaultItems}
      isLoading={isLoading}
      onInputChange={onInputChange}
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
        emptyContent: isLoading ? <CoreLoading /> : <CoreNotFound text='Нийлүүлэгч олдсонгүй' />
      }}
      scrollShadowProps={{
        isEnabled: isLoading
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
