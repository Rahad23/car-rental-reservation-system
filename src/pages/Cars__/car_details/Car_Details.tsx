import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useGetSingleCarQuery } from "@/Redux/features/Cars/Cars";
import { Link, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";

const Car_Details = () => {
  const { id } = useParams();
  const authData = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetSingleCarQuery({
    id,
    token: authData.token,
  });

  return isLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="px-24 mt-12  ">
      <Card className="w-[700px] py-7 mx-auto">
        <CardDescription>
          <CardHeader className="w-[400px] py-1 mx-auto">
            <PhotoProvider>
              <PhotoView src={data?.data.car_image}>
                <img
                  title="View Photo"
                  src={data?.data.car_image}
                  className="cursor-pointer"
                  alt=""
                />
              </PhotoView>
            </PhotoProvider>
          </CardHeader>
          <CardDescription className="px-5 mt-3">
            <div className="flex flex-col gap-y-1">
              <h1 className="capitalize text-md font-semibold text-[#101316]">
                Category:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {data?.data.category?.type}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Model:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {data?.data?.name}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Is Electric?:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {data?.data?.isElectric ? "Yes" : "No"}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Color:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {data?.data?.color}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Features:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {data?.data?.features?.map((data: string) => data).join(", ")}
                </span>
              </h1>

              <h1 className="text-md font-semibold text-[#101316] flex items-center">
                Price Per Hour:{" "}
                <span className="text-[#2D3A4B] font-bold flex items-center ml-1">
                  {data?.data?.pricePerHour}.TK
                </span>
              </h1>
              <div className="flex items-center text-yellow-500">
                {/* {ratingsStar()} */}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-950 font-bold">
                Product Details: {data?.data?.description}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-x-5">
              <Link to={`/avis_cars/bookings/${id}`}>
                <Button className="capitalize bg-[#D4002A] hover:bg-[#D4002A] rounded-none mt-4 flex gap-x-2 items-center">
                  Book-Now
                </Button>
              </Link>
            </div>
          </CardDescription>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Car_Details;
