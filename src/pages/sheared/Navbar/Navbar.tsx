import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, MountainIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/avis_logo.png";
import { Separator } from "@/components/ui/separator";
import "./NavbarStyle/Navbar.css";
import Login from "@/pages/login_registration/Login/Login";
import Registration from "@/pages/login_registration/Registration/Registration";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import DropdownProfileList from "./DropdownProfileList/DropdownProfileList";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setDarkLight } from "@/Redux/features/Dark_Light/Dark_Light_Theme_slice";
const Navbar = () => {
  const loginUser = useAppSelector((state: RootState) => state.auth);
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const dispatch = useDispatch();
  return (
    <header
      className={
        darkLight.darkLight
          ? "flex h-20 w-full shrink-0 items-center lg:px-24 px-2 border-t-0 border-r-0 border-l-0 border-[1px] border-gray-950 bg-gray-950"
          : "flex h-20 w-full shrink-0 items-center lg:px-24 px-2 border-t-0 border-r-0 border-l-0 border-[1px] border-[#ddd]"
      }
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to={"/"} className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              to={"/"}
              className="flex w-full items-center py-2 text-lg font-semibold "
              // prefetch={false}
            >
              {!loginUser?.user?.email ? (
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <Login />
                  <Separator orientation="vertical" />
                  <Registration />
                </div>
              ) : (
                <DropdownProfileList />
              )}
            </Link>
            <Link
              to={"/"}
              className="flex w-full items-center py-2 text-lg font-semibold "
              // prefetch={false}
            >
              Home
            </Link>
            <Link
              to={"/about-us"}
              className="flex w-full items-center py-2 text-lg font-semibold"
              // prefetch={false}
            >
              About Us
            </Link>
            <Link
              to={"/avis_cars/booking-car"}
              className="flex w-full items-center py-2 text-lg font-semibold"
              // prefetch={false}
            >
              Booking
            </Link>
            <Link
              to={"/contact"}
              className="flex w-full items-center py-2 text-lg font-semibold"
              // prefetch={false}
            >
              Contact
            </Link>
            <Link
              to={""}
              className="flex w-full items-center py-2 text-lg font-semibold"
              // prefetch={false}
            >
              {darkLight.darkLight ? (
                <MdDarkMode
                  onClick={() => dispatch(setDarkLight(false))}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <CiLight
                  onClick={() => dispatch(setDarkLight(true))}
                  className="text-2xl cursor-pointer"
                />
              )}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link
        to={"/"}
        className="mr-6 hidden lg:flex"
        // prefetch={false}
      >
        <img className="w-[91px] h-[28px]" src={logo} alt="" />
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          to={"/"}
          className={
            darkLight.darkLight
              ? "group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50"
              : // dark light css
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          }
          // prefetch={false}
        >
          Home
        </Link>
        <Link
          to={"/about-us"}
          className={
            darkLight.darkLight
              ? "group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50"
              : // dark light css
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          }
          // prefetch={false}
        >
          About Us
        </Link>
        <Link
          to={"/avis_cars/booking-car"}
          className={
            darkLight.darkLight
              ? "group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50"
              : // dark light css
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          }
          // prefetch={false}
        >
          Booking
        </Link>
        <Link
          to={"/contact"}
          className={
            darkLight.darkLight
              ? "group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50"
              : // dark light css
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          }
          // prefetch={false}
        >
          Contact
        </Link>
        <div
          className={
            darkLight.darkLight
              ? "group lg:inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50  hidden"
              : // dark light css
                "group lg:inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50 hidden"
          }
          // prefetch={false}
        >
          {!loginUser?.user?.email ? (
            <div className="lg:flex h-5 items-center space-x-4 text-sm  hidden">
              <Login />
              <Separator orientation="vertical" />
              <Registration />
            </div>
          ) : (
            <DropdownProfileList />
          )}
        </div>
        <div
          className={
            darkLight.darkLight
              ? "group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-900 text-[#ddd] hover:text-white focus:bg-gray-900 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-900 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-100/50"
              : // dark light css
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          }
          // prefetch={false}
        >
          {darkLight.darkLight ? (
            <MdDarkMode
              onClick={() => dispatch(setDarkLight(false))}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CiLight
              onClick={() => dispatch(setDarkLight(true))}
              className="text-2xl cursor-pointer"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
