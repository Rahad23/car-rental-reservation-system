import App from "@/App";
import Avis_home from "@/AVIS_Dashboard/Avis_home/Avis_home";
import Create_Car from "@/AVIS_Dashboard/Create_Car/Create_Car";
import Return_Car from "@/AVIS_Dashboard/Return_Car/Return_Car";
import Main from "@/components/layout/Main";
import AboutUS from "@/pages/AboutUS/AboutUS";
import Booking_Car from "@/pages/booking_page/Booking_Car";
import All_Cars from "@/pages/Cars__/all_cars/All_Cars";
import Car_Details from "@/pages/Cars__/car_details/Car_Details";
import Car_with_category from "@/pages/Cars__/car_with_category/Car_with_category";
import Cars_Home from "@/pages/Cars__/cars_home/Cars_Home";
import Error_page from "@/pages/Error_page/Error_page";
import Forgot_password from "@/pages/forgot_password/Forgot_password";
import User_profile from "@/pages/user_dashboard/User_profile";
import OnlyAdmin from "@/ProtectedRoute/OnlyAdmin";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error_page />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/avis_home",
        element: <Avis_home />,
        children: [
          {
            path: "create-car",
            element: (
              <OnlyAdmin>
                <Create_Car />
              </OnlyAdmin>
            ),
          },
          {
            path: "return-car",
            element: (
              <OnlyAdmin>
                <Return_Car />
              </OnlyAdmin>
            ),
          },
        ],
      },
      {
        path: "/avis_cars",
        element: <Cars_Home />,
        children: [
          {
            path: "/avis_cars",
            element: <All_Cars />,
          },
          {
            path: "category/:id",
            element: <Car_with_category />,
          },
          {
            path: "details/:id",
            element: <Car_Details />,
          },
          {
            path: "bookings/:id",
            element: <Booking_Car />,
          },
        ],
      },
      {
        path: "/about-us",
        element: <AboutUS />,
      },
      {
        path: "/forgot_password",
        element: <Forgot_password />,
      },
      {
        path: "/profile",
        element: <User_profile />,
      },
    ],
  },
]);

export default router;
