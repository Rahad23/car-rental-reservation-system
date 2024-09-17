import { Outlet } from "react-router-dom";
import SidebarUser from "../Sidebar/Sidebar_user";

const Cars_Home = () => {
  return (
    <div className="flex gap-x-5">
      <SidebarUser />
      <Outlet />
    </div>
  );
};

export default Cars_Home;
