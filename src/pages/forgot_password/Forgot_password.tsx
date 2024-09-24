import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import {
  resetPasswordForgotState,
  setEmail,
  setPassword_,
} from "@/Redux/features/forgot_password/Forgot_Password_Slice";
import { z, ZodIssue } from "zod";
import { forgotPasswordSchema } from "./Forgot_password.validation";
import { useForgotPasswordMutation } from "@/Redux/features/forgot_password/Forgot_Password";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";
import { setIsOpen } from "@/Redux/features/auth/Login/LoginFormSlice";
import { useNavigate } from "react-router-dom";

interface ErrorSource {
  message: string;
  path: string; // Adjust the type and property name as per your actual data structure
}

interface ErrorResponse {
  data: {
    errorSources: ErrorSource[];
    message: string;
    stack: string;
  };
  success: boolean;
}

const Forgot_password = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [seenPassword, setSeenPassword] = useState(false);
  const [zodError, setZodError] = useState<ZodIssue[]>([]);

  const forgotPasswordData = useAppSelector(
    (state: RootState) => state.forgotPassword
  );

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async () => {
    try {
      const resultValidation = forgotPasswordSchema.parse(forgotPasswordData);

      if (resultValidation) {
        const result = await forgotPassword(forgotPasswordData);

        if (result?.data?.success) {
          dispatch(resetPasswordForgotState());
          setPassword("");
          setSeenPassword(false);
          dispatch(setIsOpen(true));
          toast({
            title: "Password update successfully",
            description: getCurrentFormattedDate(),
            style: { background: "#7af59b", color: "#2D3A4B" },
          });
          navigate("/");
        }

        if (result?.error) {
          const errorData = result?.error as ErrorResponse;
          toast({
            title: errorData.data?.message,
            description: getCurrentFormattedDate(),
            style: { background: "#dc2626", color: "#fff" },
          });
        }
      }
    } catch (e) {
      console.log(e);
      if (e instanceof z.ZodError) {
        setZodError(e.errors);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold text-gray-950">
        Reset Your Password
      </h1>
      <Card className="w-[400px] mx-auto mt-5">
        <CardContent className="flex flex-col gap-y-2 mt-3">
          <div>
            <Input
              type="email"
              value={forgotPasswordData.email}
              id="email"
              placeholder="Your registered email type here"
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <span className="text-red-600">
              {zodError?.find((err) => err.path[0] === "email")?.message}
            </span>
          </div>
          <div className="relative">
            <div>
              <Input
                type={seenPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="pr-8"
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "password")?.message}
              </span>
            </div>
            {seenPassword ? (
              <IoEyeSharp
                onClick={() => setSeenPassword(!seenPassword)}
                className="absolute top-3 text-lg cursor-pointer right-3"
              />
            ) : (
              <IoEyeOff
                onClick={() => setSeenPassword(!seenPassword)}
                className="absolute top-3 text-lg cursor-pointer right-3"
              />
            )}
          </div>

          <div>
            <Input
              type="password"
              value={forgotPasswordData.password}
              onChange={(e) => dispatch(setPassword_(e.target.value))}
              placeholder="Confirm Password"
            />
            <span className="text-red-600">
              {password !== forgotPasswordData.password &&
                "Confirm password not match!"}
            </span>
          </div>
          {isLoading ? (
            <LoadingButton message="wait" />
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-[#D4002A] hover:bg-[#D4002A]"
            >
              Update
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Forgot_password;
