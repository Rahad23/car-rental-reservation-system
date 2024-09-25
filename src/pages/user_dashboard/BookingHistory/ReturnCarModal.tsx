import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import SelectFieldLoading from "@/Loading_Spinners/SelectFieldLoading/SelectFieldLoading";
import { usePaymentReturnCarMutation } from "@/Redux/features/payment/Payment";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useState } from "react";

interface TReturnCarPropsType {
  carId: string;
}

type TCarData = {
  data: {
    car: {
      car_image: string;
      category: {
        isDeleted: boolean;
        type: string;
        _id: string;
      };
      isDeleted: boolean;
      type: string;
      _id: string;
      color: string;
      description: string;
      features: string[];
      isElectric: boolean;
      name: string;
      pricePerHour: string;
      status: string;
    };
    totalCost: number;
    totalHours: string;
    totalMinutes: string;
  };
  success: boolean;
  message: string;
};

const ReturnCarModal: React.FC<TReturnCarPropsType> = ({ carId }) => {
  const { toast } = useToast();
  const authData = useAppSelector((state: RootState) => state.auth);
  const [paymentReturnCar, { isLoading: paymentLoading }] =
    usePaymentReturnCarMutation();
  const [paymentData, setPaymentData] = useState<TCarData | null>(null);
  const handlePaymentSeeDetails = async (id: string) => {
    const result = await paymentReturnCar({
      id,
      token: authData.token,
      PType: "history",
    });

    if (result?.data?.success) {
      setPaymentData(result?.data as TCarData);
    }
    if (result?.data?.error) {
      toast({
        title: "Car make successfully!",
        description: getCurrentFormattedDate(),
        style: { background: "#dc2626", color: "#fff" },
      });
    }
  };

  const handlePayment = async (id: string) => {
    const result = await paymentReturnCar({
      id,
      token: authData.token,
      PType: "confirm",
    });

    if (result?.data?.data?.result === "true") {
      window.location.href = result?.data?.data?.payment_url;
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div>
            <Button
              variant="outline"
              className="bg-[#D4002A] hover:bg-[#D4002A] text-white font-semibold text-base hover:text-white"
              onClick={() => handlePaymentSeeDetails(carId)}
            >
              Return Car
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              {paymentLoading ? (
                <div className="flex justify-center">
                  <SelectFieldLoading />
                </div>
              ) : (
                <div>
                  <img
                    className="w-24"
                    src={paymentData?.data?.car?.car_image}
                    alt=""
                  />
                  <div>
                    <p className="text-lg font-bold text-gray-900 flex gap-x-2 items-center capitalize">
                      <span className="text-base font-semibold text-gray-950">
                        Type:
                      </span>
                      {paymentData?.data?.car?.category?.type}
                    </p>
                    <p className="text-lg font-bold text-gray-900 flex gap-x-2 items-center">
                      <span className="text-base font-semibold text-gray-950">
                        Model:
                      </span>
                      {paymentData?.data?.car?.name}
                    </p>
                    <p className="text-lg font-bold text-gray-900 flex gap-x-2 items-center">
                      <span className="text-base font-semibold text-gray-950">
                        How long was it for rent?:
                      </span>
                      {paymentData?.data?.totalHours +
                        " " +
                        paymentData?.data?.totalMinutes}
                    </p>
                    <p className="text-lg font-bold text-gray-900 flex gap-x-2 items-center">
                      <span className="text-base font-semibold text-gray-950">
                        Your total amount:
                      </span>
                      {paymentData?.data?.totalCost + ".TK"}
                    </p>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {paymentLoading ? (
              <LoadingButton message="Redirect payment..." />
            ) : (
              <AlertDialogAction onClick={() => handlePayment(carId)}>
                Continue
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReturnCarModal;
