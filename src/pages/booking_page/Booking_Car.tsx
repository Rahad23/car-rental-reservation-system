import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import {
  resetBookingDataState,
  setCarId,
  setDate,
  setDrivingLicense,
  setPass_NID,
  setStartTime,
} from "@/Redux/features/Booking/BookinasSlice";
import { useBookingCarMutation } from "@/Redux/features/Booking/Booking";
import { carBookingValidationSchema } from "./Booking_Car_validation";
import { z, ZodIssue } from "zod";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ErrorSource {
  path: string;
  message: string;
}

interface ErrorResponse {
  data: {
    errorSources: ErrorSource[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

const Booking_Car = () => {
  const [value_, onChange_] = useState<Value>(new Date());
  const { id } = useParams();
  const authData = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetSingleCarQuery({
    id,
    token: authData.token,
  });
  const [zodError, setZodError] = useState<ZodIssue[]>([]);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const carBookingData = useAppSelector((state: RootState) => state.booking);
  const [bookingCar, { isLoading: bookingLoading }] = useBookingCarMutation();
  const [time_, setTime] = useState("");
  const [timeSetError, setTimeSetError] = useState("");
  const [seeMoreDescription, setSeeMoreDescription] = useState(false);
  useEffect(() => {
    if (value_) {
      if (id) {
        dispatch(setCarId(id));
      }

      if (value_ instanceof Date) {
        const convertedTimeUTC = value_.toISOString();

        const convertedDate = value_.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        if (convertedTimeUTC) {
          const getTime_ = `${value_
            .getUTCHours()
            .toString()
            .padStart(2, "0")}:${value_
            .getUTCMinutes()
            .toString()
            .padStart(2, "0")}`;
          setTime(getTime_);
          dispatch(setStartTime(convertedTimeUTC));
        }

        if (convertedDate) {
          dispatch(setDate(convertedDate));
        }
      }
    }
  }, [value_]);

  const handleBookings = async () => {
    try {
      const resultValidation = carBookingValidationSchema.parse(carBookingData);

      if (resultValidation && time_ !== "00") {
        const result = await bookingCar({
          payload: carBookingData,
          token: authData.token,
        });
        if (result?.data?.success) {
          setTimeSetError("");
          dispatch(resetBookingDataState());
          //success toast
          toast({
            title: "Order make successfully!",
            description: getCurrentFormattedDate(),
            style: { background: "#7af59b", color: "#2D3A4B" },
          });
        }

        if (result?.error) {
          const fetchError = result.error as ErrorResponse;
          //error toast
          toast({
            title: `${fetchError?.data?.message}`,
            description: "Your request Failed",
            style: { background: "#dc2626", color: "#fff" },
          });
        }
      } else {
        setTimeSetError("Select Time");
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setZodError(e.errors);
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  return isLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
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
          <div className="mt-3">
            <p className="font-semibold text-[#2D3A4B]">
              {seeMoreDescription ? (
                data?.data?.description?.length > 200 ? (
                  <>
                    {data?.data?.description?.slice(0, 200)}...{" "}
                    <span
                      onClick={() => setSeeMoreDescription(!seeMoreDescription)}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      See more
                    </span>
                  </>
                ) : (
                  data?.data?.description
                )
              ) : (
                <p className={"font-semibold text-[#2D3A4B]"}>
                  {data?.data?.description}{" "}
                  <span
                    className={
                      data?.data?.description.length > 200
                        ? `font-semibold text-[#2D3A4B] `
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
          <div className="mt-5">
            <div>
              <div>
                <Label htmlFor="passport/nid">
                  Passport/NID<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={carBookingData.pass_nid}
                  onChange={(e) => dispatch(setPass_NID(e.target.value))}
                  type="text"
                  id="passport/nid"
                  placeholder="Passport/NID"
                />
                <span className="text-red-600 text-sm flex flex-col gap-y-1">
                  {zodError?.find((err) => err.path[0] === "pass_nid")?.message}
                </span>
              </div>
              <div>
                <Label htmlFor="D.license">
                  Driving License<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={carBookingData.driving_license}
                  onChange={(e) => dispatch(setDrivingLicense(e.target.value))}
                  type="text"
                  id="D.license"
                  placeholder="Driving License"
                />
                <span className="text-red-600 text-sm flex flex-col gap-y-1">
                  {
                    zodError?.find((err) => err.path[0] === "driving_license")
                      ?.message
                  }
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <Label className="mb-1">
                Select Booking Date<span className="text-red-600">*</span>
              </Label>
              <DateTimePicker
                className={"custom-datetime-picker"}
                onChange={onChange_}
                value={value_}
                minDate={new Date()}
              />
              <span className="text-red-600 text-sm flex flex-col gap-y-1">
                {zodError?.find((err) => err.path[0] === "date")?.message}{" "}
                <br />
                {zodError?.find((err) => err.path[0] === "startTime")?.message}
                {timeSetError && timeSetError}
              </span>
            </div>
          </div>
          <div className="mt-4">
            {bookingLoading ? (
              <LoadingButton message="Wait" />
            ) : (
              <Button
                onClick={handleBookings}
                className="bg-[#D4002A] hover:bg-[#D4002A]"
              >
                Book Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking_Car;
