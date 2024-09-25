import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

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

interface TConfirmationDialogProps {
  handleBookings: () => Promise<void>;
  data: TFindCars;
}

const Confirmation_Dialog: React.FC<TConfirmationDialogProps> = ({
  handleBookings,
  data,
}) => {
  const carBookingData = useAppSelector((state: RootState) => state.booking);

  //converted time utc to local time and date
  const convertTimeAndDate = (startTime: string) => {
    // Create a Date object from the startTime
    const dateObj = new Date(startTime);

    // Format the date as "DD/MM/YYYY"
    const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY format

    // Format the time as "hh:mm AM/PM"
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single digit minutes
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

    const dateAndTime = `Date: ${formattedDate}__Time: ${formattedTime}`;

    return dateAndTime;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#D4002A] text-white text-lg hover:text-white hover:bg-[#D4002A]"
          disabled={
            !carBookingData?.pass_nid || !carBookingData?.driving_license
          }
        >
          Book Now
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-96 overflow-y-scroll no-scrollbar">
        <AlertDialogHeader>
          <AlertDialogTitle className="py-4">
            Check Your Rent Details Carefully
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-row gap-x-3">
              <img
                src={data?.car_image}
                className="cursor-pointer w-48"
                alt="car-img"
              />

              <div className="mt-2">
                <h1 className="capitalize text-md font-semibold text-[#101316]">
                  Type:{" "}
                  <span className="text-[#2D3A4B] font-bold">
                    {data?.category?.type}
                  </span>
                </h1>
                <h1 className="text-md font-semibold text-[#101316]">
                  Model:{" "}
                  <span className="text-[#2D3A4B] font-bold">{data?.name}</span>
                </h1>
                <h1 className="text-md font-semibold text-[#101316]">
                  Is Electric?:{" "}
                  <span className="text-[#2D3A4B] font-bold">
                    {data?.isElectric ? "Yes" : "No"}
                  </span>
                </h1>
                <h1 className="text-md font-semibold text-[#101316]">
                  Color:{" "}
                  <span className="text-[#2D3A4B] font-bold">
                    {data?.color}
                  </span>
                </h1>
                <h1 className="text-md font-semibold text-[#101316]">
                  Features:{" "}
                  <span className="text-[#2D3A4B] font-bold">
                    {data?.features?.map((data: string) => data).join(", ")}
                  </span>
                </h1>

                <h1 className="text-md font-semibold text-[#101316] flex items-center">
                  Price Per Hour:{" "}
                  <span className="text-[#2D3A4B] font-bold flex items-center ml-1">
                    {data?.pricePerHour}.TK
                  </span>
                </h1>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-lg">
                Passport/NID:{" "}
                <span className="text-gray-950 font-semibold">
                  {carBookingData?.pass_nid}
                </span>
              </h1>
              <h1 className="text-lg">
                Driving License:{" "}
                <span className="text-gray-950 font-semibold">
                  {carBookingData?.driving_license}
                </span>
              </h1>
              <h1 className="text-lg">
                Start Time:{" "}
                <span className="text-gray-950 font-semibold">
                  {convertTimeAndDate(carBookingData?.startTime)}
                </span>
              </h1>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBookings}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Confirmation_Dialog;
