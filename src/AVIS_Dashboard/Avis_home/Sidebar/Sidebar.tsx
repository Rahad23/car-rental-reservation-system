import { Card, CardContent } from "@/components/ui/card";

import Car_Management from "../Car_Management/Car_Management";
import Booking_Management from "../Order_Management/Booking_Management";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <Card className="lg:w-[250px] w-full lg:h-screen h- rounded-none lg:border-[1px] lg:border-[#ddd] border-none pt-0 ">
        <CardContent className="p-0">
          <ul className="text-[#2D3A4B] lg:flex grid lg:flex-col grid-cols-1 lg:gap-0 gap-1">
            <li className="text-lg font-semibold lg:w-full w-[80%] mx-auto">
              <Car_Management />
            </li>
            <li className="text-lg font-semibold lg:w-full w-[80%] mx-auto">
              <Booking_Management />
            </li>
            <Link className="" to={"users-management"}>
              <li className="text-lg font-semibold lg:w-full w-[80%] mx-auto">
                <Button className="bg-[#D4002A] hover:bg-[#D4002A] w-full py-1 px-1 text-xl rounded-none text-[#fff] hover:text-[#fff] font-semibold hover:border-[1px] hover:border-[#ffffff] capitalize">
                  Users management
                </Button>
              </li>
            </Link>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
