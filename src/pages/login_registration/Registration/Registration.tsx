import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrationSchema } from "./RegistrationValidation";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import {
  resetRegistrationState,
  setAddress,
  setEmail,
  setName,
  setPassword,
  setPhoneNumber,
} from "@/Redux/features/auth/Registration/RegistrationSlice";
import { z, ZodIssue } from "zod";
import { useRegistrationUserMutation } from "@/Redux/features/auth/Registration/Registration";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { setIsOpen } from "@/Redux/features/auth/Login/LoginFormSlice";
import { setIsRegOpen } from "@/Redux/features/auth/Registration/RegistrationFormSlice";

interface CustomError {
  data?: {
    errorSources?: Array<{ path: string; message: string }>;
  };
  message?: string;
  stack?: string;
  success?: boolean;
  status?: number;
}

// type RegistrationMutation = RegistrationSuccess | RegistrationError

const Registration = () => {
  type E164Number = string;

  const dispatch = useDispatch();
  const userData = useAppSelector((state: RootState) => state.registration);
  const registrationFormOpen = useAppSelector(
    (state: RootState) => state.registrationFormOpen
  );

  const [value, setValue] = useState<E164Number | undefined>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seenPassword, setSeenPassword] = useState(false);
  const [zodError, setZodError] = useState<ZodIssue[]>([]);
  const [agreeTermsAndCondition, setAgreeTermsAndCondition] = useState(false);

  const { toast } = useToast();
  // const resultValidation = registrationSchema.parse(userData);

  const [registrationUser, { isLoading: loadingRegistration }] =
    useRegistrationUserMutation();

  //set phone number dispatch
  useEffect(() => {
    if (value) {
      dispatch(setPhoneNumber(value));
    }
  }, [value]);

  const handleStateTermsAndConditions = (e: boolean) => {
    setAgreeTermsAndCondition(e);
  };

  const handleRegistration = async () => {
    try {
      const resultValidation = registrationSchema.parse(userData);

      if (resultValidation) {
        const result = await registrationUser(userData);
        if (result.data?.success) {
          dispatch(resetRegistrationState());
          setConfirmPassword("");
          dispatch(setIsOpen(true));
          dispatch(setIsRegOpen(false));
          toast({
            title: "Account Created successfully!",
            description: getCurrentFormattedDate(),
            style: { background: "#7af59b", color: "#2D3A4B" },
            //   action: (
            //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            //   ),
          });
        } else {
          const error = result.error as CustomError;
          if (error.data?.errorSources && error.data.errorSources.length > 0) {
            toast({
              title: `${error.data.errorSources[0].message} !`,
              description: getCurrentFormattedDate(),
              style: { background: " #dc2626", color: "#fff" },
              //   action: (
              //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              //   ),
            });
          }
          // else {
          //   console.log(
          //     "Error message:",
          //     error.message || "No message available"
          //   );
          // }
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setZodError(e.errors);
      }
    }
  };

  const handleOpenChange = () => {
    dispatch(setIsRegOpen(false));
  };

  return (
    <DropdownMenu
      open={registrationFormOpen.isOpen}
      onOpenChange={handleOpenChange}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => dispatch(setIsRegOpen(true))}
          className="p-0 border-0 bg-white rounded-none hover:bg-white focus:ring-0 focus:border-none focus:outline-none"
        >
          <span className="cool-link text-[#D4002A]">Sign-Up</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] mr-32 px-3 overflow-y-scroll h-[460px] no-scrollbar">
        <DropdownMenuLabel className="px-0">Sign-Up</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex flex-col gap-y-4">
            <div>
              <Input
                type="text"
                value={userData.name}
                className="focus:outline-none focus:ring-0  focus:border-none"
                placeholder="Name"
                onChange={(e) => dispatch(setName(e.target.value))}
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "name")?.message}
              </span>
            </div>
            <div>
              <Input
                type="email"
                value={userData.email}
                className="focus:outline-none focus:ring-0  focus:border-none"
                placeholder="Email"
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "email")?.message}
              </span>
            </div>
            <div>
              <PhoneInput
                defaultCountry="BD"
                value={userData.phone}
                onChange={setValue}
                className="border-[1px] border-[#ddd]  w-full rounded-md text-gray-700 px-1"
                placeholder="Phone number"
                numberInputProps={{
                  className: "rounded-md px-4 focus:outline-none py-2 px-3",
                }}
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "phone")?.message}
              </span>
            </div>
            <div>
              <Textarea
                value={userData.address}
                placeholder="Type your address here."
                onChange={(e) => dispatch(setAddress(e.target.value))}
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "address")?.message}
              </span>
            </div>

            <div className="relative">
              <Input
                type={seenPassword ? "text" : "password"}
                value={userData.password}
                placeholder="Password"
                onChange={(e) => dispatch(setPassword(e.target.value))}
                className="pr-12"
              />
              {seenPassword ? (
                <IoEyeSharp
                  onClick={() => setSeenPassword(!seenPassword)}
                  className="absolute top-3 text-lg cursor-pointer right-2"
                />
              ) : (
                <IoMdEyeOff
                  onClick={() => setSeenPassword(!seenPassword)}
                  className="absolute top-3 text-lg cursor-pointer right-2"
                />
              )}
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "password")?.message}
              </span>
            </div>
            <div>
              <Input
                type="password"
                value={confirmPassword}
                placeholder="Confirm-Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {
                <span className="text-red-600">
                  {confirmPassword !== userData?.password &&
                    "Confirm Password not match!"}
                </span>
              }
            </div>
            <div className="flex items-center space-x-2">
              <span
                onClick={() =>
                  setAgreeTermsAndCondition(!agreeTermsAndCondition)
                }
                className="flex items-center gap-x-1"
              >
                <Checkbox
                  checked={agreeTermsAndCondition}
                  onCheckedChange={handleStateTermsAndConditions}
                  id="terms"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Accept{" "}
                </label>
              </span>
              <Link to={"/"}>
                {" "}
                <span className="text-blue-800 border-b-[1px] border-blue-700">
                  Terms And Conditions
                </span>
              </Link>
            </div>
            <div className="flex justify-center">
              {loadingRegistration ? (
                <LoadingButton message="Wait" />
              ) : (
                <Button
                  onClick={handleRegistration}
                  className="bg-[#D4002A] hover:bg-[#D4002A] w-[150px] text-lg"
                  disabled={agreeTermsAndCondition === false}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Registration;
