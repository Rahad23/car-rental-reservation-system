import { RootState } from "@/Redux/store";
import Customers_review_card from "./Customers_review_card/Customers_review_card";
import { useAppSelector } from "@/Redux/hook";

const Customers_Review = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div>
      <h1
        className={
          darkLight__
            ? "text-2xl text-center mt-16 font-semibold text-gray-100"
            : "text-2xl text-center mt-16 font-semibold"
        }
      >
        Customers Reviews
      </h1>
      <div>
        <Customers_review_card />
      </div>
    </div>
  );
};

export default Customers_Review;
