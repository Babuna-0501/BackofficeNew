import { CategoryType } from '@/types';
import { FunctionComponent } from 'react';
import CoreBreadCrumb from '@/components/core/CoreBreadCrumb';
import CoreTitle from '@/components/core/CoreTitle';
import { Card, CardBody } from "@heroui/react";
import CategoryForm from '@/components/category/CategoryForm';

interface CategoryDetailBoardProps {
  category: CategoryType;
}

const CategoryDetailBoard: FunctionComponent<CategoryDetailBoardProps> = ({ category }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <CoreTitle text='Брэндийн дэлгэрэнгүй' />

        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <CategoryForm category={category} />
        </CardBody>
      </Card>
    </div>
  );
};

export default CategoryDetailBoard;
