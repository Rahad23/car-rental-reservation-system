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
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { useCancelRentCarMutation } from "@/Redux/features/Booking/Booking";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

const CancelRentDialog: React.FC<{ id: string }> = ({ id }) => {
  const { toast } = useToast();
  const authData = useAppSelector((state: RootState) => state.auth);
  const [cancelRentCar, { isLoading: cancelRentLoading }] =
    useCancelRentCarMutation();

  const handleConfirmBooking = async (id: string) => {
    const result = await cancelRentCar({ id, token: authData.token });
    if (result?.data?.success) {
      toast({
        title: "Car Rent Confirm successfully!",
        description: getCurrentFormattedDate(),
        style: { background: "#7af59b", color: "#2D3A4B" },
      });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className=" bg-red-600 hover:bg-red-600 text-white font-semibold hover:text-white"
          >
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do You want to cancel this rent request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {cancelRentLoading ? (
              <LoadingButton message="Wait" />
            ) : (
              <AlertDialogAction onClick={() => handleConfirmBooking(id)}>
                Continue
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CancelRentDialog;
