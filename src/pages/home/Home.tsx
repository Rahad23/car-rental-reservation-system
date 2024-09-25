import { RootState } from "@/Redux/store";
import Customers_Review from "../customers_review/Customers_Review";
import Featured_Cars from "../featured_cars/Featured_Cars";
import Hero_section from "../hero-section/Hero_section";
import Why_Choose_Us from "../why_choose_us/Why_Choose_Us";
import { useAppSelector } from "@/Redux/hook";
import "./HomeStyle.css";
const Home = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);

  return (
    <div className={darkLight.darkLight ? "bg-gray-950" : "bg-[#FFFFFF]"}>
      <Hero_section />
      <Featured_Cars />
      <Why_Choose_Us />
      <Customers_Review />
    </div>
  );
};

export default Home;
