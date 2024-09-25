import { Outlet } from "react-router-dom";
import Navbar from "./pages/sheared/Navbar/Navbar";
import Footer from "./pages/sheared/Footer/Footer";
import { RootState } from "./Redux/store";
import { useAppSelector } from "./Redux/hook";

function App() {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div className={darkLight__ ? "bg-gray-950" : ""}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
