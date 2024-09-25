import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Avis_home = () => {
  return (
    <div className="flex gap-x-6 lg:flex-row flex-col">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Avis_home;
