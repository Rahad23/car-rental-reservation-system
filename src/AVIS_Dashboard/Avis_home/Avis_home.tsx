import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Avis_home = () => {
  return (
    <div className="flex gap-x-6">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Avis_home;
