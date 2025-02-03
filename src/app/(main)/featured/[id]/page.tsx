import FeaturedDetailBoard from '@/components/featured/detail/FeaturedCreateBoardFilter';
import { getFeaturedOne } from '@/services';
import { FeaturedType, ParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface FeaturedPageDetailProps {
  params: ParamsType;
}

const FeaturedPageDetail: FunctionComponent<FeaturedPageDetailProps> = async ({ params }) => {
  const filter = await params;

  const featuredOne = await getFeaturedOne<FeaturedType>(filter.id);

  return <FeaturedDetailBoard featuredOne={featuredOne} />;
};

export default FeaturedPageDetail;
