import CategoryBoard from '@/components/category/CategoryBoard';
import { getCategories } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface CategoryPageProps {
  searchParams: SearchParamsType;
}

const CategoryPage: FunctionComponent<CategoryPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const categoriesData = await getCategories(filter);

  return (
    <CategoryBoard
      categories={categoriesData.data}
      totalPage={categoriesData.totalPage}
      currentPage={categoriesData.currentPage}
      total={categoriesData.total}
    />
  );
};

export default CategoryPage;
