import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { logOutUser } from "@/Redux/features/auth/Auth/AuthSlice";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";

type LogoutAlertDialogProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutAlertDialog: React.FC<LogoutAlertDialogProps> = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    setOpen(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="p-0 border-0 bg-white rounded-none hover:bg-white focus:ring-0 focus:border-none focus:outline-none flex justify-between w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
