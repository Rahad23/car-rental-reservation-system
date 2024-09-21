import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReturnCarModal from "./ReturnCarModal";
import { ImCross } from "react-icons/im";

interface TBookingHistoryActionsPropsType {
  carId: string;
  openActionDropdown: boolean;
  setOpenActionDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingHistoryActions: React.FC<TBookingHistoryActionsPropsType> = ({
  carId,
  openActionDropdown,
  setOpenActionDropdown,
}) => {
  return (
    <div>
      <DropdownMenu open={openActionDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" bg-[#D4002A] hover:bg-[#D4002A] hover:text-white text-white font-semibold "
            onClick={() => setOpenActionDropdown(true)}
          >
            Action
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex justify-between">
            <span>Actions</span>
            <span>
              <ImCross
                className="text-xl text-red-600 cursor-pointer"
                onClick={() => setOpenActionDropdown(false)}
                title="Close"
              />
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="w-full">
                <ReturnCarModal
                  carId={carId}
                  setOpenActionDropdown={setOpenActionDropdown}
                />
              </div>
              <DropdownMenuShortcut>⇧⌘C_R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-950 font-semibold cursor-pointer">
              <div className="w-full">
                <span>Cancel Booking</span>
              </div>
              <DropdownMenuShortcut>⇧⌘C_B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BookingHistoryActions;
