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
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { usePaymentReturnCarMutation } from "@/Redux/features/payment/Payment";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

interface TReturnCarPropsType {
  carId: string;
  setOpenActionDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReturnCarModal: React.FC<TReturnCarPropsType> = ({
  carId,
  setOpenActionDropdown,
}) => {
  const authData = useAppSelector((state: RootState) => state.auth);
  const [paymentReturnCar, { isLoading: paymentLoading }] =
    usePaymentReturnCarMutation();

  const handlePayment = async (id: string) => {
    const result = await paymentReturnCar({
      id,
      token: authData.token,
    });

    if (result?.data?.data?.result === "true") {
      setOpenActionDropdown(false);
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
              className="p-0 w-full flex justify-start bg-[#] border-none"
            >
              Return Car
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
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
