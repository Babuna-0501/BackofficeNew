import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from 'react';
import CategoryForm from '@/components/category/CategoryForm';

interface CategoryCreateBoardProps {
  supplierId: string;
}

const CategoryCreateBoard: FunctionComponent<CategoryCreateBoardProps> = ({ supplierId }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Категори үүсгэх' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <CategoryForm supplierId={supplierId} />
        </CardBody>
      </Card>
    </div>
  );
};

export default CategoryCreateBoard;
