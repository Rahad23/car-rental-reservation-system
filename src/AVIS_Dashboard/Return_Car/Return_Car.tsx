import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useGetAllBookingsQuery } from "@/Redux/features/Booking/Booking";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import CancelRentDialog from "./AleartDialog/CancelRentDialog";
import ConfirmRentDialog from "./AleartDialog/ConfirmRentDialog";
import ReturnCarModal from "@/pages/user_dashboard/BookingHistory/ReturnCarModal";

type Car = {
  car_image: string;
  category: string;
  color: string;
  description: string;
  features: string[];
  isDeleted: boolean;
  isElectric: boolean;
  name: string;
  pricePerHour: string;
  status: string;
  _id: string;
};

interface User {
  address: string;
  email: string;
  isDeleted: boolean;
  name: string;
  phone: string;
  role: string;
  _id: string;
}

interface CarBooking {
  carId: Car;
  _id: string;
  date: string;
  endTime: string | null;
  isBooked: string;
  startTime: string;
  totalCost: number;
  user: User;
  cancelRent: boolean;
}

const Return_Car = () => {
  const authData = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading: getAllBookingsLoading } = useGetAllBookingsQuery({
    token: authData.token,
  });

  //handle pa

  //formated time
  function formatStartTime(isoString: string) {
    const date = new Date(isoString);

    // Get day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0"); // Get day (2 digits)
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Get month (1-12, so add 1 and format)
    const year = date.getUTCFullYear(); // Get year (YYYY)

    // Format time (HH:mm)
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${day}/${month}/${year} (${formattedTime})`; // Combine date and time
  }

  return getAllBookingsLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="lg:px-10 px-2 lg:mt-0 w-full h-screen mt-10 ">
      <Table>
        <TableCaption>A list of your car booking.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Car</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Price Per Hour</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Feature</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead className="text-right">Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((car: CarBooking) => (
            <TableRow key={car._id}>
              <TableCell>
                <img src={car.carId.car_image} alt="" />
              </TableCell>
              <TableCell>
                <span>{car.carId.name}</span>
              </TableCell>
              <TableCell>
                <span>{car.carId.pricePerHour}.TK</span>
              </TableCell>
              <TableCell>{car.carId.color}</TableCell>
              <TableCell>
                {car?.carId?.features?.map((data) => data).join(", ")}
              </TableCell>
              <TableCell>{car?.date}</TableCell>
              <TableCell>{formatStartTime(car?.startTime)}</TableCell>
              <TableCell className="text-right">
                {car?.cancelRent ? (
                  <h1 className="text-red-600 font-semibold">Rent Cancel</h1>
                ) : car?.totalCost ? (
                  <div>{car?.totalCost}.TK</div>
                ) : (
                  <div>
                    {car.isBooked === "unconfirmed" ? (
                      <div className="flex items-center justify-center gap-x-1">
                        <ConfirmRentDialog id={car?._id} />
                        <CancelRentDialog id={car?._id} />
                      </div>
                    ) : (
                      <ReturnCarModal carId={car?._id} />
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Return_Car;
