import { FunctionComponent } from 'react';
import BrandTable from '@/components/brand/BrandTable';
import { BrandType } from '@/types';

interface BrandBoardProps {
  brands: BrandType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const BrandBoard: FunctionComponent<BrandBoardProps> = ({ brands, totalPage, currentPage, total }) => {
  return <BrandTable brands={brands} totalPage={totalPage} currentPage={currentPage} total={total} />;
};

export default BrandBoard;
