import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { Link } from "react-router-dom";

const SidebarUser = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div>
      <Card
        className={
          darkLight__
            ? "lg:w-[250px] bg-gray-950 w-full lg:h-screen h- rounded-none lg:border-[1px] lg:border-[#ddd] border-white border-none pt-0 "
            : "lg:w-[250px] w-full lg:h-screen h- rounded-none lg:border-[1px] lg:border-gray-700 border-none pt-0 "
        }
      >
        <CardContent className="p-0">
          <ul className="text-[#2D3A4B] lg:flex grid lg:flex-col grid-cols-1 lg:gap-0 gap-1">
            <Link to={"/avis_cars"}>
              <li className="text-lg font-semibold lg:w-full w-[80%] mx-auto">
                <Button
                  variant="outline"
                  className="bg-[#D4002A] hover:bg-[#D4002A] w-full py-1 px-1 text-xl rounded-none text-[#fff] hover:text-[#fff] font-semibold hover:border-[1px] hover:border-[#ffffff] capitalize"
                >
                  All Cars
                </Button>
              </li>
            </Link>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarUser;
