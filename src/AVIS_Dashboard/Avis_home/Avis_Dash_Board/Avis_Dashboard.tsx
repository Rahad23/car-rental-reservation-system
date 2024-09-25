import Available_Car from "./Available_Car";
import Avis_Chart from "./Avis_Chart/Avis_Chart";
import Car_Category_Admin from "./Car_Category_Admin";
import Total_Bookings from "./Total_Bookings";
import Total_Revenue from "./Total_Revenue";

const Avis_Dashboard = () => {
  return (
    <div className="flex justify-center w-full  px-10 flex-col">
      <div className="lg:flex grid grid-cols-1 justify-center lg:gap-x-6 gap-x-2 mt-8">
        <Total_Bookings />
        <Available_Car />
        <Car_Category_Admin />
        <Total_Revenue />
      </div>
      <div className="mt-32">
        <Avis_Chart />
      </div>
    </div>
  );
};

export default Avis_Dashboard;
