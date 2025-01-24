import { tr, searchParamsToObject } from '@/utils';
import { SupplierType } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { FunctionComponent, Key } from 'react';
import { chooseSupplierAction, removeSupplierAction } from '@/app/actions/main';
import { Autocomplete, AutocompleteItem, AutocompleteSection } from '@heroui/react';
import CoreNotFound from '@/components/core/CoreNotFound';

interface CoreSelectSupplierProps {
  suppliers: SupplierType[];
  supplierId: string;
}

const CoreSelectSupplier: FunctionComponent<CoreSelectSupplierProps> = props => {
  const { suppliers, supplierId } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      defaultItems={suppliers}
      color='primary'
      label={tr('-- Нийлүүлэгч сонгох --')}
      variant='flat'
      radius='none'
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
        <AutocompleteSection
          key={item.id}
          title={item.name}
          classNames={{
            heading: 'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small'
          }}
        >
          {item.branches && item.branches.length > 0 ? (
            item.branches.map(branch => (
              <AutocompleteItem key={branch.id} className='pl-4'>
                {branch.name}
              </AutocompleteItem>
            ))
          ) : (
            <AutocompleteItem key={item.id} className='pl-4'>
              {item.name}
            </AutocompleteItem>
          )}
        </AutocompleteSection>
      )}
    </Autocomplete>
  );
};

export default CoreSelectSupplier;
