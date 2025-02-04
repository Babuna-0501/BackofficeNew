import { getCookie } from "@/app/actions/cookies";
import CoreNotFound from "@/components/core/CoreNotFound";
import FeaturedDetailBoard from "@/components/featured/detail/FeaturedCreateBoardFilter";
import { getFeaturedOne } from "@/services";
import { FeaturedType, ParamsType } from "@/types";
import { FunctionComponent } from "react";

interface FeaturedPageDetailProps {
  params: ParamsType;
}

const FeaturedPageDetail: FunctionComponent<FeaturedPageDetailProps> = async ({
  params,
}) => {
  const filter = await params;

  const featuredOne = await getFeaturedOne<FeaturedType>(filter.id);
  const supplierId = (await getCookie("supplierId"))?.value || "";

  if (!supplierId) {
    return <CoreNotFound text="Нийлүүлэгч олдсонгүй" />;
  }

  return (
    <FeaturedDetailBoard featuredOne={featuredOne} supplierId={supplierId} />
  );
};

export default FeaturedPageDetail;
