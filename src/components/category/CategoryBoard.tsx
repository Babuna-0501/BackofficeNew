import { CategoryType } from '@/types';
import { FunctionComponent } from 'react';
import CategoryTable from '@/components/category/CategoryTable';

interface CategoryBoardProps {
  categories: CategoryType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const CategoryBoard: FunctionComponent<CategoryBoardProps> = ({ categories, totalPage, currentPage, total }) => {
  return <CategoryTable categories={categories} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default CategoryBoard;
