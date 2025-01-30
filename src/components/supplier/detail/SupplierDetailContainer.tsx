'use client';

import { FunctionComponent, Key } from 'react';
import { BrandType, CityType, SupplierType } from '@/types';
import { Avatar, Card, CardBody, Tab, Tabs } from '@heroui/react';
import SupplierGeneralForm from '@/components/supplier/forms/SupplierGeneralForm';
import SupplierBankForm from '@/components/supplier/forms/SupplierBankForm';
import SupplierImagesForm from '@/components/supplier/forms/SupplierImagesForm';
import { SUPPLIER_FORM_TABS } from '@/configs';
import SupplierHtmlForm from '@/components/supplier/forms/SupplierHtmlForm';
import { replaceMediaUrl } from '@/utils';
import { usePathname, useRouter } from 'next/navigation';

interface SupplierDetailContainerProps {
  brands: BrandType[];
  locations: CityType[];
  suppliers: SupplierType[];
  supplier: SupplierType;
  tabName: string;
}

const SupplierDetailContainer: FunctionComponent<SupplierDetailContainerProps> = ({
  supplier,
  locations,
  suppliers,
  brands,
  tabName
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const supplierFormMap: Record<string, React.ReactNode> = {
    general: <SupplierGeneralForm supplier={supplier} locations={locations} suppliers={suppliers} />,
    bank: <SupplierBankForm supplier={supplier} />,
    images: <SupplierImagesForm supplier={supplier} brands={brands} />,
    terms: <SupplierHtmlForm supplier={supplier} name='termOfService' label='Үйлчилгээний нөхцөл' />,
    about: <SupplierHtmlForm supplier={supplier} name='aboutCompany' label='Компаний тухай' />,
    cooperation: <SupplierHtmlForm supplier={supplier} name='cooperation' label='Хамтын ажиллагаа' />
  };

  return (
    <div className='flex gap-4'>
      <Card className='h-full'>
        <CardBody className='items-center gap-10'>
          <Avatar className='w-32 h-32 mt-10 bg-transparent' src={replaceMediaUrl(supplier.logo)} isBordered color='primary' />

          <Tabs
            color='primary'
            fullWidth
            isVertical
            variant='solid'
            className='w-72'
            selectedKey={tabName}
            onSelectionChange={(value: Key) => router.push(pathname + `?tabName=${value.toString()}`)}
          >
            {SUPPLIER_FORM_TABS.map(tabName => {
              return <Tab key={tabName.key} title={tabName.title} className='justify-start' />;
            })}
          </Tabs>
        </CardBody>
      </Card>

      <Card className='flex-1'>
        <CardBody>{supplierFormMap[tabName]}</CardBody>
      </Card>
    </div>
  );
};

export default SupplierDetailContainer;
