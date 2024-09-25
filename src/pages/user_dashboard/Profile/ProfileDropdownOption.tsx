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
import { User } from "lucide-react";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";
import ProfileEditDialog from "./ProfileEditDialog";
import { IoIosOptions } from "react-icons/io";
interface TProfileEditDialogProps {
  profileImg: string;
}

const ProfileDropdownOption: React.FC<TProfileEditDialogProps> = ({
  profileImg,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <DropdownMenu open={openDropdown}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" bg-[#D4002A] hover:bg-[#D4002A]  hover:text-white lg
        text-white font-semibold"
          onClick={() => setOpenDropdown(true)}
        >
          <span className="lg:hidden block">
            <IoIosOptions className="text-xl" />
          </span>
          <span className="lg:block hidden">Management</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex justify-between">
          <span>Management</span>
          <span>
            <ImCross
              className="text-xl text-red-600 cursor-pointer"
              onClick={() => setOpenDropdown(false)}
              title="Close"
            />
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <div className="w-full">
              <ProfileEditDialog
                profileImg={profileImg}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
            <DropdownMenuShortcut>⇧⌘P_E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Link to={"/user-booking"}>
            <DropdownMenuItem className="text-gray-950 font-semibold cursor-pointer">
              <TbBrandBooking className="mr-2 h-4 w-4" />
              <div className="w-full">
                <span>Booking History</span>
              </div>
              <DropdownMenuShortcut>⇧⌘B_S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownOption;
