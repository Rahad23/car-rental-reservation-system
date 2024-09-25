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
import { useToast } from "@/hooks/use-toast";
import { setIsOpen } from "@/Redux/features/auth/Login/LoginFormSlice";
import {
  resetLoginState,
  setLoginEmail,
  setLoginPassword,
} from "@/Redux/features/auth/Login/LoginSlice";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { z, ZodIssue } from "zod";
import { loginSchema } from "./LoginValidation";
import { useLoginUserMutation } from "@/Redux/features/auth/Login/Login";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { jwtDecode } from "jwt-decode";
import { setUser, TUser } from "@/Redux/features/auth/Auth/AuthSlice";
import { Link } from "react-router-dom";
//error interface
interface ErrorSource {
  path: string;
  message: string;
}

interface CustomError {
  data: {
    errorSources: ErrorSource[];
    message: string;
  };
  message: string;
  stack: string;
  success: boolean;
  status: number;
}

const Login = () => {
  const dispatch = useDispatch();
  const formOpen = useAppSelector((state: RootState) => state.loginFormOpen);
  const login = useAppSelector((state: RootState) => state.loginUser);
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  //login mutation
  const [loginUser, { isLoading: userLoginLoading }] = useLoginUserMutation();

  const [zodError, setZodError] = useState<ZodIssue[]>([]);
  const { toast } = useToast();
  const handleOpenChange = () => {
    dispatch(setIsOpen(false));
  };

  const handleLoginUser = async () => {
    try {
      const resultValidation = loginSchema.parse(login);

      if (resultValidation) {
        const result = await loginUser(login);

        if (result?.data?.success) {
          dispatch(resetLoginState());
          dispatch(setIsOpen(false));

          const user = jwtDecode(result?.data?.token) as TUser;

          dispatch(setUser({ user: user, token: result?.data?.token }));

          toast({
            title: "Login successful!",
            description: getCurrentFormattedDate(),
            style: { background: "#7af59b", color: "#2D3A4B" },
          });
        }

        if (result?.error) {
          const error = result.error as CustomError;

          toast({
            title: `${error?.data?.message} !`,
            description: getCurrentFormattedDate(),
            style: { background: " #dc2626", color: "#fff" },
          });
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setZodError(e.errors);
      }
    }
  };

  return (
    <DropdownMenu open={formOpen.isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => dispatch(setIsOpen(!formOpen.isOpen))}
          className={
            darkLight__
              ? "p-0 border-0 bg-gray-950 rounded-none hover:bg-gray-950 focus:ring-0 focus:border-none focus:outline-none"
              : "p-0 border-0 bg-white rounded-none hover:bg-white focus:ring-0 focus:border-none focus:outline-none"
          }
        >
          <span className="cool-link text-[#D4002A]">Login</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mr-44 px-3">
        <DropdownMenuLabel className="px-0">Login</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="">
            <div className="flex flex-col gap-y-4">
              <div>
                <Input
                  type="email"
                  id="email"
                  value={login.email}
                  onChange={(e) => dispatch(setLoginEmail(e.target.value))}
                  className="focus:outline-none focus:ring-0  focus:border-none"
                  placeholder="Email"
                />
                <span className="text-red-600">
                  {zodError?.find((err) => err.path[0] === "email")?.message}
                </span>
              </div>
              <div>
                <Input
                  onChange={(e) => dispatch(setLoginPassword(e.target.value))}
                  value={login.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <span className="text-red-600">
                  {zodError?.find((err) => err.path[0] === "password")?.message}
                </span>
              </div>
            </div>
            <Link to={"/forgot_password"}>
              <span className="mt-1 block text-gray-950 hover:border-b-[0.5px] hover:border-gray-950 hover:border-dashed w-36 cursor-pointer">
                Forgot Password?
              </span>
            </Link>
            <div className="flex justify-center">
              {userLoginLoading ? (
                <LoadingButton message="Wait" />
              ) : (
                <Button
                  onClick={handleLoginUser}
                  className="bg-[#D4002A] hover:bg-[#D4002A] w-[150px] text-lg mt-5"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Login;
