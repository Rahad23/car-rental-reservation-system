import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";
type TFindCarCategory = {
  isDeleted: boolean;
  type: string;
  _id: string;
};

type TFindCars = {
  _id: string;
  car_image: string;
  category: TFindCarCategory;
  color: string;
  description: string;
  features: string[];
  isDeleted: boolean;
  isElectric: boolean;
  name: string;
  pricePerHour: string;
  status: "available" | "unavailable";
  type: string;
};

interface TFindCarsCardPropsType {
  payload: TFindCars;
}

const Find_Cars_Card: React.FC<TFindCarsCardPropsType> = ({ payload }) => {
  const [seeMoreDescription, setSeeMoreDescription] = useState(false);

  return (
    <div>
      <Card className="mx-auto lg:w-[700px] w-[300px] mt-4">
        <CardContent className="py-10 flex justify-center flex-col items-center">
          <div className="flex lg:flex-row flex-col gap-x-3">
            <PhotoProvider>
              <PhotoView src={payload?.car_image}>
                <img
                  title="View Photo"
                  src={payload?.car_image}
                  className="cursor-pointer w-48"
                  alt=""
                />
              </PhotoView>
            </PhotoProvider>
            <div>
              <h1 className="capitalize text-md font-semibold text-[#101316]">
                Category:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {payload?.category?.type}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Model:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {payload?.name}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Is Electric?:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {payload?.isElectric ? "Yes" : "No"}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Color:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {payload?.color}
                </span>
              </h1>
              <h1 className="text-md font-semibold text-[#101316]">
                Features:{" "}
                <span className="text-[#2D3A4B] font-bold">
                  {payload?.features?.map((data: string) => data).join(", ")}
                </span>
              </h1>

              <h1 className="text-md font-semibold text-[#101316] flex items-center">
                Price Per Hour:{" "}
                <span className="text-[#2D3A4B] font-bold flex items-center ml-1">
                  {payload?.pricePerHour}.TK
                </span>
              </h1>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-semibold text-[#2D3A4B]">
              {seeMoreDescription ? (
                payload?.description?.length > 200 ? (
                  <>
                    {payload?.description?.slice(0, 200)}...{" "}
                    <span
                      onClick={() => setSeeMoreDescription(!seeMoreDescription)}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      See more
                    </span>
                  </>
                ) : (
                  payload?.description
                )
              ) : (
                <p className="font-semibold text-[#2D3A4B]">
                  {payload?.description}{" "}
                  <span
                    className={
                      payload?.description.length > 200
                        ? `font-semibold text-[#2D3A4B]`
                        : "hidden"
                    }
                    onClick={() => setSeeMoreDescription(!seeMoreDescription)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    See less
                  </span>
                </p>
              )}
            </p>
          </div>
          <div className="mt-5 w-full flex justify-center">
            <Link to={`/avis_cars/bookings/${payload?._id}`}>
              <Button className="bg-[#D4002A] text-xl hover:bg-[#D4002A]">
                Rent-Car
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Find_Cars_Card;
