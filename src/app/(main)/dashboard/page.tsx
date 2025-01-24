import CoreComingSoon from '@/components/core/CoreComingSoon';
import { SearchParamsType } from '@/types';
import { FunctionComponent } from 'react';

interface DashboardPageProps {
  searchParams: SearchParamsType;
}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  return <CoreComingSoon />;
};

export default DashboardPage;
