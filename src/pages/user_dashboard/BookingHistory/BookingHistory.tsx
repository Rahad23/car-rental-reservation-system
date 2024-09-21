import { Card, CardContent } from "@/components/ui/card";
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
import { useGetUserBookingsQuery } from "@/Redux/features/Booking/Booking";

import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useState } from "react";
import RadioButton_Pending_Approve from "./RadioButton_Pending_Approve";
import { Button } from "@/components/ui/button";
import CancelDialog from "./CancelDialog/CancelDialog";

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

const BookingHistory = () => {
  const authData = useAppSelector((state: RootState) => state.auth);
  const [pendingApprove, setPendingApprove] = useState("pending");
  // const { data, isLoading: getAllBookingsLoading } = useGetAllBookingsQuery({
  //   token: authData.token,
  // });
  const { data, isLoading: getUserBookingLoading } = useGetUserBookingsQuery({
    token: authData.token,
  });

  console.log(data?.data?.approveBooking);
  console.log(data?.data?.pendingBooking);

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

  return getUserBookingLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="px-24">
      <div>
        <RadioButton_Pending_Approve
          pendingApprove={pendingApprove}
          setPendingApprove={setPendingApprove}
        />
      </div>
      <Card className="rounded-none bg-[#ddd] w-full mx-auto mt-5">
        <CardContent className="p-0">
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
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprove === "pending" &&
                data?.data?.pendingBooking?.map((car: CarBooking) => (
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
                      {car?.isBooked === "confirmed" ? (
                        <div>
                          <Button className="bg-[#D4002A] hover:bg-[#D4002A]">
                            Return
                          </Button>
                        </div>
                      ) : car?.cancelRent ? (
                        <span className="text-red-600 font-semibold">
                          Canceled
                        </span>
                      ) : (
                        <CancelDialog id={car?._id} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {pendingApprove === "approve" &&
                data?.data?.approveBooking?.map((car: CarBooking) => (
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
                      {car?.isBooked === "confirmed" && (
                        <div>
                          <Button className="bg-[#D4002A] hover:bg-[#D4002A]">
                            Return
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {pendingApprove === "canceled" &&
                data?.data?.canceledBooking?.map((car: CarBooking) => (
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
                      {car?.isBooked === "confirmed" ? (
                        <div>
                          <Button className="bg-[#D4002A] hover:bg-[#D4002A]">
                            Return
                          </Button>
                        </div>
                      ) : car?.cancelRent ? (
                        <span className="text-red-600 font-semibold">
                          Canceled
                        </span>
                      ) : (
                        <CancelDialog id={car?._id} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingHistory;
