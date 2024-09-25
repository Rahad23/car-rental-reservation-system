import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useGetCarsQuery } from "@/Redux/features/Cars/Cars";
import { Card, CardContent } from "@/components/ui/card";
import { TCar } from "@/pages/featured_cars/Featured_Cars_Type";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Cars_Search from "./Cars_Search";
import SortingPriceLowToHigh from "./SortingPriceLowToHigh";
import SortingWithType from "./SortingWithType";
import SortingPrice from "./SortingPrice";
import { RxCross1 } from "react-icons/rx";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";

const All_Cars = () => {
  const [search, setSearch] = useState("");
  const [priceSorting, setPriceSorting] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  const { data, isLoading: carAllDataFetchLoading } = useGetCarsQuery({
    search,
    data: {
      priceSorting,
      category,
      priceRange,
    },
  });

  const clearAllFilterField = () => {
    setCategory("");
    setPriceRange("");
    setPriceSorting("");
  };

  return carAllDataFetchLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="px-10 w-full">
      <div className="mt-10 flex justify-between items-center">
        <Cars_Search setSearch={setSearch} search={search} />
        <div className="flex justify-center gap-x-3 relative">
          <div>
            <div className="flex items-center">
              <SortingWithType setCategory={setCategory} />
              <SortingPrice setPriceRange={setPriceRange} />
            </div>
            <SortingPriceLowToHigh setPriceSorting={setPriceSorting} />
          </div>
          {priceSorting || category || priceRange ? (
            <RxCross1
              onClick={clearAllFilterField}
              className="text-red-700 text-2xl cursor-pointer absolute -right-1 -top-6"
              title="Clear Filter"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 mt-16 gap-x-5">
        {data?.data?.result?.map((data: TCar) => (
          <Card key={data?._id} className={darkLight__ ? "bg-gray-950" : ""}>
            <img
              src={data?.car_image}
              className=" mx-auto  box-border"
              alt=""
            />
            <CardContent className="mt-5">
              <div>
                <h1
                  className={
                    darkLight__
                      ? "text-[#fff] font-bold"
                      : "text-[#000] font-bold"
                  }
                >
                  Category: {data?.category?.type}
                </h1>
                <h1
                  className={
                    darkLight__
                      ? "text-[#fff] font-bold"
                      : "text-[#000] font-bold"
                  }
                >
                  Name: {data.name}
                </h1>
                <h1
                  className={
                    darkLight__
                      ? "text-[#fff] font-bold"
                      : "text-[#000] font-bold"
                  }
                >
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

export default All_Cars;
