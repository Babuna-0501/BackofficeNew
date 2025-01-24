import FeaturedBoard from '@/components/featured/FeaturedBoard';
import { getFeaturedList } from '@/services';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface FeaturedPageProps {
  searchParams: SearchParamsType;
}

const FeaturedPage: FunctionComponent<FeaturedPageProps> = async ({ searchParams }) => {
  const filter = await searchParams;

  const featuredData = await getFeaturedList(filter);
  console.log(featuredData);

  return (
    <FeaturedBoard
      featured={featuredData.data}
      currentPage={featuredData.currentPage}
      total={featuredData.total}
      totalPage={featuredData.totalPage}
    />
  );
};

export default FeaturedPage;
