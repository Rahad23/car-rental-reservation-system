import { Outlet } from "react-router-dom";
import Navbar from "./pages/sheared/Navbar/Navbar";
import Footer from "./pages/sheared/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
