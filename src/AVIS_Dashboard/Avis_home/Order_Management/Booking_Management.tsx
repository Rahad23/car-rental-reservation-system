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
import { MdDirectionsCarFilled } from "react-icons/md";
import { Link } from "react-router-dom";

const Booking_Management = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#D4002A] hover:bg-[#D4002A] w-full py-1 px-1 text-xl rounded-none text-[#fff] hover:text-[#fff] font-semibold hover:border-[1px] hover:border-[#ffffff] capitalize"
        >
          Booking management
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Booking Management</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"return-car"}>
            <DropdownMenuItem className="cursor-pointer">
              <MdDirectionsCarFilled className="mr-2 h-4 w-4" />
              <span>Return Car</span>
              <DropdownMenuShortcut>⇧⌘R_C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Booking_Management;
