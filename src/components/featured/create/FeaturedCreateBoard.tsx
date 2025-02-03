import CoreTitle from "@/components/core/CoreTitle";
import { Card, CardBody } from "@heroui/react";
import { FunctionComponent } from "react";
import FeaturedForm from "../FeaturedForm";
import FeaturedCreateBoardFilter from "@/components/featured/detail/FeaturedCreateBoardFilter";



interface FeaturedCreateBoardProps {
  supplierId: string;
}



const FeaturedCreateBoard: FunctionComponent<FeaturedCreateBoardProps> = async ({ supplierId }) => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardBody>
        <div className="flex flex-col justify-between gap-4 items-center">
          <div className='flex justify-around'>
            <CoreTitle text="Онцлох үүсгэх" />
          </div>
          <FeaturedCreateBoardFilter
            supplierId={supplierId}
          />
        </div>
        </CardBody>
          <FeaturedForm supplierId={supplierId} />
      
      </Card>

    </div>
  );
};

export default FeaturedCreateBoard;
