import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCarWithTypeQuery } from "@/Redux/features/Cars/Cars";
import { Link, useParams } from "react-router-dom";
import { TCar } from "../../featured_cars/Featured_Cars_Type";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import SearchCategory from "./SearchCategory";
import { useState } from "react";

const Car_with_category = () => {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const { data, isLoading: carTypeLoading } = useGetCarWithTypeQuery({
    id,
    search,
  });

  return carTypeLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="px-24">
      <div className="mt-10">
        <SearchCategory setSearch={setSearch} search={search} />
      </div>
      <div className="grid grid-cols-3 mt-11 gap-x-5">
        {data?.data?.result?.map((data: TCar) => (
          <Card key={data._id} className="">
            <img src={data.car_image} className=" mx-auto  box-border" alt="" />
            <CardContent className="mt-5">
              <div>
                <h1 className="text-[#000] font-bold">
                  Category: {data.category.type}
                </h1>
                <h1 className="text-[#000] font-bold">Name: {data.name}</h1>
                <h1 className="text-[#000] font-bold">
                  Price Per Hour: {data?.pricePerHour}.TK
                </h1>
              </div>

              <div className="justify-center flex items-center">
                <Link to={`/avis_cars/details/${data?._id}`}>
                  <Button className="text-base h-[30px] rounded-sm text-[#fff]  bg-[#D4002A] hover:bg-[#D4002A] mt-5">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Car_with_category;
