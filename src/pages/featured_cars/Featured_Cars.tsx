import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Featured_Cars_Pagination from "./Featured_Cars_Pagination";
import { useGetCarsQuery } from "@/Redux/features/Cars/Cars";
import { TCar } from "./Featured_Cars_Type";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
const Featured_Cars = () => {
  const { data, isLoading: featuredDataLoading } = useGetCarsQuery({
    search: "",
  });
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return featuredDataLoading ? (
    <LoadingSpenar />
  ) : (
    <div className="lg:px-24 px-2">
      <h1
        className={
          darkLight__
            ? "text-2xl text-center mt-16 font-semibold text-gray-100"
            : "text-2xl text-center mt-16 font-semibold"
        }
      >
        Featured Cars
      </h1>
      <div className="mt-11 grid lg:grid-cols-4 grid-cols-1 gap-3">
        {data?.data?.result?.map((data: TCar) => (
          <Card
            key={data?._id}
            className={
              darkLight__
                ? "lg:w-[280px] w-[300px] mx-auto py-4 bg-gray-950"
                : "lg:w-[280px] w-[300px] mx-auto py-4"
            }
          >
            <CardContent>
              <img className="w-[200px] mx-auto" src={data?.car_image} alt="" />
              <div className="mt-2">
                <h1 className={darkLight__ ? "text-gray-100" : "text-gray-950"}>
                  <span className="font-semibold">Category:</span>{" "}
                  {data?.category?.type}
                </h1>
                <h1 className={darkLight__ ? "text-gray-100" : "text-gray-950"}>
                  <span className="font-semibold">Model:</span> {data?.name}
                </h1>
                <h1 className={darkLight__ ? "text-gray-100" : "text-gray-950"}>
                  <span className="font-semibold">Price Per Hour:</span>{" "}
                  {data?.pricePerHour}.TK
                </h1>
              </div>
            </CardContent>
            {data?.status === "available" ? (
              <Link
                to={`/avis_cars/category/${data?.category?._id}`}
                className="flex justify-center items-center"
              >
                <Button className="bg-[#D4002A] hover:bg-[#D4002A] text-lg">
                  View
                </Button>
              </Link>
            ) : (
              <div className="flex justify-center">
                <Button className="bg-[#D4002A] hover:bg-[#D4002A] text-lg">
                  Booked
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      {/* <div className="mt-7">
        <Featured_Cars_Pagination />
      </div> */}
    </div>
  );
};

export default Featured_Cars;
