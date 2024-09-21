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
import BookingHistoryActions from "./BookingHistoryActions";
import { useState } from "react";
import RadioButton_Pending_Approve from "./RadioButton_Pending_Approve";

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
}

const BookingHistory = () => {
  const authData = useAppSelector((state: RootState) => state.auth);
  const [openActionDropdown, setOpenActionDropdown] = useState(false);
  const [pendingApprove, setPendingApprove] = useState("pending");
  // const { data, isLoading: getAllBookingsLoading } = useGetAllBookingsQuery({
  //   token: authData.token,
  // });
  const { data, isLoading: getUserBookingLoading } = useGetUserBookingsQuery({
    token: authData.token,
  });

  console.log(data?.data?.approveBooking);
  console.log(data?.data?.pendingBooking);

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
                    <TableCell>{car?.startTime}</TableCell>
                    <TableCell className="text-right">
                      {car?.totalCost ? (
                        <div>{car?.totalCost}.TK</div>
                      ) : (
                        <BookingHistoryActions
                          carId={car._id}
                          setOpenActionDropdown={setOpenActionDropdown}
                          openActionDropdown={openActionDropdown}
                        />
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
                    <TableCell>{car?.startTime}</TableCell>
                    <TableCell className="text-right">
                      {car?.totalCost ? (
                        <div>{car?.totalCost}.TK</div>
                      ) : (
                        <BookingHistoryActions
                          carId={car._id}
                          setOpenActionDropdown={setOpenActionDropdown}
                          openActionDropdown={openActionDropdown}
                        />
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
