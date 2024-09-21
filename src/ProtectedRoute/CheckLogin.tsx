import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckLogin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loginUserData = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUserData?.token) {
      navigate("/");
    }
  }, [loginUserData, navigate]);

  return <>{children}</>;
};

export default CheckLogin;
