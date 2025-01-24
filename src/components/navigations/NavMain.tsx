import { FunctionComponent } from 'react';
import { cn } from '@/utils';
import { SupplierType } from '@/types';
import CoreUserDropDown from '@/components/core/CoreUserDropDown';
import CoreThemeSwitcher from '@/components/core/CoreThemeSwitcher';
import CoreSelectSupplier from '@/components/core/CoreSelectSupplier';
import { usePathname } from 'next/navigation';
import OrderSections from '@/components/navigations/sections/OrderSections';
import ProductSections from '@/components/navigations/sections/ProductSections';
import BrandSections from '@/components/navigations/sections/BrandSections';
import CategorySections from '@/components/navigations/sections/CategorySections';
import MerchantSections from '@/components/navigations/sections/MerchantSections';
import SupplierSections from '@/components/navigations/sections/SupplierSections';

interface NavMainProps {
  isOpen: boolean;
  suppliers: SupplierType[];
  supplierId: string;
}

const NavMain: FunctionComponent<NavMainProps> = props => {
  const { isOpen, suppliers, supplierId } = props;

  const pathname = usePathname();

  const menuSectionsMap: { [key: string]: React.ReactNode } = {
    brand: <BrandSections />,
    category: <CategorySections />,
    merchant: <MerchantSections />,
    order: <OrderSections />,
    product: <ProductSections />,
    supplier: <SupplierSections />
  };

  const generalPath = pathname.split('/')[1];

  return (
    <div
      className={cn(
        'w-full flex items-center gap-4 fixed top-0 left-0 transition-all shadow-md bg-background z-40',
        isOpen ? 'pl-60' : 'pl-20'
      )}
    >
      <CoreSelectSupplier suppliers={suppliers} supplierId={supplierId} />

      {menuSectionsMap[generalPath]}

      <div className='flex ml-auto p-2 items-center gap-4'>
        <CoreThemeSwitcher />

        <CoreUserDropDown />
      </div>
    </div>
  );
};

export default NavMain;
