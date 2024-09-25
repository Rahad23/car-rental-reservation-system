import { Outlet } from "react-router-dom";
import SidebarUser from "../Sidebar/Sidebar_user";

const Cars_Home = () => {
  return (
    <div className="lg:flex grid mt-1  gap-x-5">
      <SidebarUser />
      <div className="lg:mt-0 mt-5 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Cars_Home;
