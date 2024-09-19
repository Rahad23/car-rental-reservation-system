import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OnlyUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loginUserData = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUserData?.user?.role !== "user") {
      navigate("/");
    }
  }, [loginUserData, navigate]);

  return <>{children}</>;
};

export default OnlyUser;
