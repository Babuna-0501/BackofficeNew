import FeaturedBoard from "@/components/featured/FeaturedBoard";
import { getFeaturedList } from "@/services";
import { SearchParamsType } from "@/types";
import { FunctionComponent } from "react";

interface FeaturedPageProps {
  searchParams: SearchParamsType;
}

const FeaturedPage: FunctionComponent<FeaturedPageProps> = async ({
  searchParams,
}) => {
  const filter = await searchParams;

  const featuredData = await getFeaturedList(filter);

  return (
    <FeaturedBoard
      featured={featuredData?.data ?? []}
      currentPage={featuredData?.currentPage ?? 0}
      total={featuredData?.total ?? 0}
      totalPage={featuredData?.totalPage ?? 1}
    />
  );
};

export default FeaturedPage;
