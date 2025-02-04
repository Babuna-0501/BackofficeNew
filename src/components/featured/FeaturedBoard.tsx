import { FunctionComponent } from "react";
import { FeaturedType } from "@/types";
import FeaturedTable from "@/components/featured/FeaturedTable";

interface FeaturedBoardProps {
  featured: FeaturedType[];
  totalPage: number;
  currentPage: number;
  total: number;
}

const FeaturedBoard: FunctionComponent<FeaturedBoardProps> = ({
  featured,
  totalPage,
  currentPage,
  total,
}) => {
  return (
    <FeaturedTable
      featured={featured}
      totalPage={totalPage}
      currentPage={currentPage}
      total={total}
    />
  );
};

export default FeaturedBoard;
