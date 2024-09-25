import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCar } from "@/pages/featured_cars/Featured_Cars_Type";
import { useGetCarsQuery } from "@/Redux/features/Cars/Cars";
import { useState } from "react";
import Cars_Edit_Delete from "./Cars_Edit_Delete_Dropdown";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import Cars_Search from "@/pages/Cars__/all_cars/Cars_Search";
import SortingWithType from "@/pages/Cars__/all_cars/SortingWithType";
import SortingPrice from "@/pages/Cars__/all_cars/SortingPrice";
import SortingPriceLowToHigh from "@/pages/Cars__/all_cars/SortingPriceLowToHigh";
import { RxCross1 } from "react-icons/rx";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";

const All_Cars_Admin = () => {
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
    <div className="lg:px-7 px-2 w-full">
      <div className="mt-10 flex justify-start lg:justify-between lg:flex-row flex-col items-start lg:items-center">
        <Cars_Search setSearch={setSearch} search={search} />
        <div className="flex justify-center flex-col gap-x-3 relative mt-2 lg:mt-0">
          <div className="flex items-start lg:items-center lg:flex-row flex-col">
            <SortingWithType setCategory={setCategory} />
            <SortingPrice setPriceRange={setPriceRange} />
          </div>
          <SortingPriceLowToHigh setPriceSorting={setPriceSorting} />

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
      <Table className={darkLight__ ? "mt-8 text-white" : "mt-8 text-gray-950"}>
        <TableCaption>A list of your recent datas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Is Electric</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price Per Hour</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.result?.map((data: TCar) => (
            <TableRow key={data._id}>
              <TableCell>
                <img className="w-16" src={data?.car_image} alt="" />
              </TableCell>
              <TableCell>{data?.category?.type}</TableCell>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.color}</TableCell>
              <TableCell>
                {data?.features?.map((data) => data).join(", ")}
              </TableCell>
              <TableCell>{data?.isElectric ? "Yes" : "No"}</TableCell>
              <TableCell>
                {data?.description?.length > 200
                  ? data?.description.slice(0, 200) + "..."
                  : data?.description}
              </TableCell>
              <TableCell>{data?.pricePerHour}.TK</TableCell>
              <TableCell className="text-right">
                <Cars_Edit_Delete id={data?._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default All_Cars_Admin;
