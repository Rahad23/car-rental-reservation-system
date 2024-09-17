import Customers_Review from "../customers_review/Customers_Review";
import Featured_Cars from "../featured_cars/Featured_Cars";
import Hero_section from "../hero-section/Hero_section";
import Why_Choose_Us from "../why_choose_us/Why_Choose_Us";

const Home = () => {
  return (
    <>
      <Hero_section />
      <Featured_Cars />
      <Why_Choose_Us />
      <Customers_Review />
    </>
  );
};

export default Home;
