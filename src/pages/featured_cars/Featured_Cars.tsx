import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Featured_Cars_Pagination from "./Featured_Cars_Pagination";
import { useGetCarsQuery } from "@/Redux/features/Cars/Cars";
import { TCar } from "./Featured_Cars_Type";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { Link } from "react-router-dom";
const Featured_Cars = () => {
  const { data, isLoading: featuredDataLoading } = useGetCarsQuery({
    search: "",
  });
  // const data = [
  //   {
  //     _id: 1,
  //     ad_img: car1,
  //     carType: "Hybrid",
  //     model: "ZDV33",
  //     price: 500,
  //   },
  //   {
  //     _id: 2,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 3,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 4,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 5,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 6,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 7,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  //   {
  //     _id: 8,
  //     ad_img: car2,
  //     carType: "Sedan",
  //     model: "a49D",
  //     price: 300,
  //   },
  // ];

  return featuredDataLoading ? (
    <LoadingSpenar />
  ) : (
    <div className="px-24">
      <h1 className="text-2xl text-center mt-16 font-semibold">
        Featured Cars
      </h1>
      <div className="mt-11 grid grid-cols-4 gap-3">
        {data?.data?.result?.map((data: TCar) => (
          <Card key={data?._id} className="w-[280px] py-4">
            <CardContent>
              <img className="w-[200px] mx-auto" src={data?.car_image} alt="" />
              <div className="mt-2">
                <h1 className="text-gray-950">
                  <span className="font-semibold">Category:</span>{" "}
                  {data?.category?.type}
                </h1>
                <h1 className="text-gray-950">
                  <span className="font-semibold">Model:</span> {data?.name}
                </h1>
                <h1 className="text-gray-950">
                  <span className="font-semibold">Price Per Hour:</span>{" "}
                  {data?.pricePerHour}.TK
                </h1>
              </div>
            </CardContent>
            <Link
              to={`/avis_cars/category/${data?.category?._id}`}
              className="flex justify-center items-center"
            >
              <Button className="bg-[#D4002A] hover:bg-[#D4002A] text-lg">
                View
              </Button>
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-7">
        <Featured_Cars_Pagination />
      </div>
    </div>
  );
};

export default Featured_Cars;
