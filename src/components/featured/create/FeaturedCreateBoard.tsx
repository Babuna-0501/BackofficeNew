import CoreBreadCrumb from "@/components/core/CoreBreadCrumb";
import CoreTitle from "@/components/core/CoreTitle";
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from "react";
import FeaturedForm from "../FeaturedForm";
import CoreSelectSupplier from "@/components/core/CoreSelectSupplier";
import { createFeatured, getProduct, getProducts } from "@/services";
import { ProductType } from "@/types";
import FeaturedCreateBoardFilter from "../detail/FeaturedCreateBoardFilter";
import { getBrandsAction } from "@/app/actions/brand";

interface FeaturedCreateBoardProps {
  supplierId: string;
}

const FeaturedCreateBoard: FunctionComponent<
  FeaturedCreateBoardProps
> = async ({ supplierId }) => {
  // const { items, hasMore, isLoading, onLoadMore, onSearchValue } = useSuppliers(
  //   { fetchDelay: 1500 }
  // );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <CoreTitle text="Онцлох үүсгэх" />
        <FeaturedCreateBoardFilter
          supplierId={supplierId}
  
        />
        <CoreBreadCrumb />
      </div>

      <Card>
        <CardBody>
          <FeaturedForm supplierId={supplierId} />
        </CardBody>
      </Card>
    </div>
  );
};

export default FeaturedCreateBoard;
