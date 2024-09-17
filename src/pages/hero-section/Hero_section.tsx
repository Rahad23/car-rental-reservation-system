import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import car1 from "../../assets/cars/car1.jpg";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const Hero_section = () => {
  const data = [
    {
      _id: 1,
      ad_img: car1,
      carType: "Hybrid",
      model: "ZDV33",
      price: 500,
    },
  ];

  return (
    <div className="px-7 lg:px-0">
      <Carousel
        className=" overflow-hidden shadow-lg rounded-none mx-auto w-[85%] mt-3"
        // plugins={[
        //   Autoplay({
        //     delay: 6000,
        //   }),
        // ]}
      >
        <CarouselContent>
          {data?.map((slider) => (
            <CarouselItem key={slider._id} className="min-w-full">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-[300px] lg:h-[500px] p-0 relative">
                  <img
                    src={slider?.ad_img}
                    className="w-full  object-cover transition-transform duration-500 hover:scale-105"
                    alt=""
                  />
                  <div
                    data-aos="fade-right"
                    className="absolute top-[30%] lg:left-56 left-16 w-[700px]"
                  >
                    <div className="bg-[#D4002A] py-5 px-9 rounded-lg">
                      <h4 className="capitalize lg:text-xl text-base font-bold text-[#fff]">
                        Type: {slider?.carType}
                      </h4>
                      <h1 className="capitalize lg:text-xl text-base font-bold text-[#fff]">
                        Model: {slider?.model}
                      </h1>
                      <h1 className="capitalize lg:text-xl text-base font-bold text-[#fff]">
                        Price: {slider?.price}.TK
                      </h1>
                      <Link to={`/`}>
                        <Button className="lg:mt-10 mt-14  w-56 h-14 rounded-sm text-xl shadow-xl">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 hidden">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 hidden">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default Hero_section;
