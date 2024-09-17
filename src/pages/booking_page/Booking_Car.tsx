import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./Booking_Car.style.css";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "@/Redux/features/Cars/Cars";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Booking_Car = () => {
  const [value_, onChange_] = useState<Value>(new Date());
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCarQuery(id);

  return (
    <div className="w-full mt-20">
      <h1 className="text-center text-2xl text-[#D4002A] font-semibold">
        Booking Car
      </h1>
      <Card className="mx-auto w-[700px] mt-4">
        <CardContent className="py-10 flex justify-center flex-col items-center">
          <div className="flex flex-row gap-x-3">
            <PhotoProvider>
              <PhotoView src={data?.data.car_image}>
                <img
                  title="View Photo"
                  src={data?.data.car_image}
                  className="cursor-pointer w-48"
                  alt=""
                />
              </PhotoView>
            </PhotoProvider>
            <div>
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
            </div>
          </div>
          <DateTimePicker
            className={"custom-datetime-picker"}
            onChange={onChange_}
            value={value_}
          />
          <div className="mt-4">
            <Button className="bg-[#D4002A] hover:bg-[#D4002A]">
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking_Car;
