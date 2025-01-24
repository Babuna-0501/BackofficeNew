'use client';

import { FunctionComponent, useCallback, useState } from 'react';
import CoreTable from '@/components/core/CoreTable';
import { getValueByPath, toastMessage } from '@/utils';
import { CategoryType, TableItemType } from '@/types';
import { CATEGORY_COLUMNS } from '@/configs';
import CoreDateComponent from '@/components/core/CoreDateComponent';
import CoreTableActions from '@/components/core/CoreTableActions';
import CategoryFilterForm from '@/components/category/CategoryFilterForm';
import { deleteCategoryAction } from '@/app/actions/category';

interface CategoryTableProps {
  categories: CategoryType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const CategoryTable: FunctionComponent<CategoryTableProps> = ({ categories, totalPage, currentPage, total }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCategory = async (id: string) => {
    const response = await deleteCategoryAction(id);

    toastMessage(response);
  };

  const renderCell = useCallback((category: TableItemType, columnKey: React.Key) => {
    const cellValue = getValueByPath(category, columnKey.toString());

    switch (columnKey) {
      case 'createdAt':
        return <CoreDateComponent serverDate={cellValue} format='YYYY-MM-DD' />;

      case 'actions':
        return (
          <CoreTableActions
            id={category.id}
            actions={['edit', 'delete']}
            setLoading={setLoading}
            onDeleteAction={deleteCategory}
          />
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <CoreTable
      data={categories}
      columns={CATEGORY_COLUMNS}
      renderCell={renderCell}
      totalPage={totalPage}
      currentPage={currentPage}
      total={total}
      customTopContent={<CategoryFilterForm />}
      loading={loading}
    />
  );
};

export default CategoryTable;
