import App from "@/App";
import All_Cars_Admin from "@/AVIS_Dashboard/All_Cars/All_Cars_Admin";
import Cars_Edit from "@/AVIS_Dashboard/All_Cars/Cars_Edit";
import Avis_Dashboard from "@/AVIS_Dashboard/Avis_home/Avis_Dash_Board/Avis_Dashboard";
import Avis_home from "@/AVIS_Dashboard/Avis_home/Avis_home";
import User_Management from "@/AVIS_Dashboard/Avis_home/User_Management/User_Management";
import Create_Car from "@/AVIS_Dashboard/Create_Car/Create_Car";
import ManageBookings from "@/AVIS_Dashboard/MangeBookings/ManageBookings";
import Return_Car from "@/AVIS_Dashboard/Return_Car/Return_Car";
import Main from "@/components/layout/Main";
import AboutUS from "@/pages/AboutUS/AboutUS";
import Booking_Car from "@/pages/booking_page/Booking_Car";
import Booking_with_search from "@/pages/booking_with_search/Booking_with_search";
import All_Cars from "@/pages/Cars__/all_cars/All_Cars";
import Car_Details from "@/pages/Cars__/car_details/Car_Details";
import Car_with_category from "@/pages/Cars__/car_with_category/Car_with_category";
import Cars_Home from "@/pages/Cars__/cars_home/Cars_Home";
import Error_page from "@/pages/Error_page/Error_page";
import Forgot_password from "@/pages/forgot_password/Forgot_password";
import BookingHistory from "@/pages/user_dashboard/BookingHistory/BookingHistory";
import User_profile from "@/pages/user_dashboard/Profile/User_profile";
import CheckLogin from "@/ProtectedRoute/CheckLogin";
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
            path: "/avis_home",
            element: <Avis_Dashboard />,
          },
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
          {
            path: "manage-booking",
            element: (
              <OnlyAdmin>
                <ManageBookings />
              </OnlyAdmin>
            ),
          },
          {
            path: "users-management",
            element: (
              <OnlyAdmin>
                <User_Management />
              </OnlyAdmin>
            ),
          },
          {
            path: "all_cars",
            element: (
              <OnlyAdmin>
                <All_Cars_Admin />
              </OnlyAdmin>
            ),
          },
          {
            path: "cars_edit/:id",
            element: (
              <OnlyAdmin>
                <Cars_Edit />
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
          {
            path: "booking-car",
            element: <Booking_with_search />,
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
        element: (
          <CheckLogin>
            <User_profile />
          </CheckLogin>
        ),
      },
      {
        path: "/user-booking",
        element: (
          <CheckLogin>
            <BookingHistory />
          </CheckLogin>
        ),
      },
    ],
  },
]);

export default router;
