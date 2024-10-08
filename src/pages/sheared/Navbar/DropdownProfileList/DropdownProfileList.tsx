import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { ImCross } from "react-icons/im";
import LogoutAlertDialog from "../LogoutAlertDialog/LogoutAlertDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

const DropdownProfileList = () => {
  const [open, setOpen] = useState(false);
  const loginUser = useAppSelector((state: RootState) => state.auth);
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className={
            darkLight.darkLight
              ? "p-0 border-0 bg-gray-950 rounded-none hover:bg-gray-950 focus:ring-0 focus:border-none focus:outline-none focus:bg-gray-950"
              : "p-0 border-0 bg-white rounded-none hover:bg-white focus:ring-0 focus:border-none focus:outline-none"
          }
        >
          <ProfileAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-16">
        <DropdownMenuLabel className="flex justify-between">
          <span> My Account</span>
          <ImCross
            className="text-xl text-red-600 cursor-pointer"
            onClick={() => setOpen(!open)}
            title="close modal"
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        {loginUser?.user?.role === "admin" && (
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link to={"/avis_home"}>
              <span>AVIS Dashboard</span>
            </Link>

            <DropdownMenuShortcut>⇧⌘A_D</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          //   onClick={() => dispatch(logOutUser())}
          className="text-red-600 hover:text-red-600 cursor-pointer"
        >
          <LogoutAlertDialog setOpen={setOpen} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownProfileList;
