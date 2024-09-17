
import { Card, CardContent } from "@/components/ui/card";

import Car_Management from "../Car_Management/Car_Management";

const Sidebar = () => {
  return (
    <div>
      <Card className="lg:w-[250px] w-full lg:h-screen h- rounded-none lg:border-[1px] lg:border-[#ddd] border-none pt-0 ">
        <CardContent className="p-0">
          <ul className="text-[#2D3A4B] lg:flex grid lg:flex-col grid-cols-1 lg:gap-0 gap-1">
            <li className="text-lg font-semibold lg:w-full w-[80%] mx-auto">
              <Car_Management />
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
