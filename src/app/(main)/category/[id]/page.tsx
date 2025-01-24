import { ParamsType, CategoryType } from '@/types';
import { FunctionComponent } from 'react';
import { getCategory } from '@/services';
import CategoryDetailBoard from '@/components/category/detail/CategoryDetailBoard';

interface CategoryDetailPageProps {
  params: ParamsType;
}

const CategoryDetailPage: FunctionComponent<CategoryDetailPageProps> = async ({ params }) => {
  const filter = await params;

  const category = await getCategory<CategoryType>(filter.id);

  return <CategoryDetailBoard category={category} />;
};

export default CategoryDetailPage;
