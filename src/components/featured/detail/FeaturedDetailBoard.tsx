import CoreComingSoon from '@/components/core/CoreComingSoon';
import { FeaturedType } from '@/types';
import { FunctionComponent } from 'react';

interface FeaturedDetailBoardProps {
  featuredOne: FeaturedType;
}

const FeaturedDetailBoard: FunctionComponent<FeaturedDetailBoardProps> = () => {
  return <CoreComingSoon />;
};

export default FeaturedDetailBoard;
