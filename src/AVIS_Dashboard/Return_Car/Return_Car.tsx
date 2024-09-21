import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import {
  useCancelRentCarMutation,
  useConfirmRentCarMutation,
  useGetAllBookingsQuery,
} from "@/Redux/features/Booking/Booking";
import { usePaymentReturnCarMutation } from "@/Redux/features/payment/Payment";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

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
  const { toast } = useToast();
  const authData = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading: getAllBookingsLoading } = useGetAllBookingsQuery({
    token: authData.token,
  });

  const [confirmRentCar, { isLoading: confirmRentLoading }] =
    useConfirmRentCarMutation();
  const [cancelRentCar, { isLoading: cancelRentLoading }] =
    useCancelRentCarMutation();

  const [paymentReturnCar, { isLoading: paymentLoading }] =
    usePaymentReturnCarMutation();

  //handle payment
  const handlePayment = async (id: string) => {
    const result = await paymentReturnCar({
      id,
      token: authData.token,
    });

    if (result?.data?.data?.result === "true") {
      window.location.href = result?.data?.data?.payment_url;
    }
  };

  //confirm bookings
  const handleConfirmBooking = async (id: string) => {
    const result = await confirmRentCar({ id, token: authData.token });
    if (result?.data?.success) {
      toast({
        title: "Car Rent Confirm successfully!",
        description: getCurrentFormattedDate(),
        style: { background: "#7af59b", color: "#2D3A4B" },
      });
    }
  };

  const handleCancelRentCar = async (id: string) => {
    const result = await cancelRentCar({ id, token: authData.token });

    if (result?.data?.success) {
      toast({
        title: "Car Rent Cancel successfully!",
        description: getCurrentFormattedDate(),
        style: { background: "#7af59b", color: "#2D3A4B" },
      });
    }
  };

  return getAllBookingsLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="px-10 w-full">
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
              <TableCell>{car?.startTime}</TableCell>
              <TableCell className="text-right">
                {car?.cancelRent ? (
                  <h1 className="text-red-600 font-semibold">Rent Cancel</h1>
                ) : car?.totalCost ? (
                  <div>{car?.totalCost}.TK</div>
                ) : (
                  <div>
                    {paymentLoading ? (
                      <LoadingButton message="Redirect payment..." />
                    ) : car.isBooked === "unconfirmed" ? (
                      <div className="flex items-center justify-center gap-x-1">
                        {confirmRentLoading ? (
                          <LoadingButton message="Wait" />
                        ) : (
                          <Button
                            onClick={() => handleConfirmBooking(car?._id)}
                            className="bg-green-600 hover:bg-green-600"
                          >
                            Confirm
                          </Button>
                        )}
                        {cancelRentLoading ? (
                          <LoadingButton message="wait" />
                        ) : (
                          <Button
                            onClick={() => handleCancelRentCar(car?._id)}
                            className="bg-red-600 hover:bg-red-600"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        onClick={() => handlePayment(car._id)}
                        className="bg-[#D4002A] hover:bg-[#D4002A]"
                      >
                        Return
                      </Button>
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
