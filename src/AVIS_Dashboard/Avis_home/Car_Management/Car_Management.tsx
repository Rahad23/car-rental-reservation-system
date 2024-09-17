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
import { Link } from "react-router-dom";
import { MdDirectionsCarFilled } from "react-icons/md";
const Car_Management = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#D4002A] hover:bg-[#D4002A] w-full py-1 px-1 text-xl rounded-none text-[#fff] hover:text-[#fff] font-semibold hover:border-[1px] hover:border-[#ffffff] capitalize"
        >
          Car management
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Car Management</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"create-car"}>
            <DropdownMenuItem className="cursor-pointer">
              <MdDirectionsCarFilled className="mr-2 h-4 w-4" />
              <span>Create Car</span>
              <DropdownMenuShortcut>⇧⌘C_C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <MdDirectionsCarFilled className="mr-2 h-4 w-4" />
            <Link to={"all_cars"}>
              <span>All Cars</span>
            </Link>
            <DropdownMenuShortcut>⇧⌘A_C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Car_Management;
