import { Card, CardContent } from "@/components/ui/card";
import man1 from "../../../assets/man/man1.jpg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "../Customers_review_style/Customers_review_style.css";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Customers_review_card = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const review = [
    {
      _id: 1,
      ratings: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at eaque numquam natus perspiciatis, velit temporibus impedit optio rem dignissimos ratione!",
      name: "Jahid",
      occupation: "Developer",
      profilePicture: man1,
    },
    {
      _id: 2,
      ratings: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at eaque numquam natus perspiciatis, velit temporibus impedit optio rem dignissimos ratione!",
      name: "Jahid",
      occupation: "Developer",
      profilePicture: man1,
    },
    {
      _id: 3,
      ratings: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at eaque numquam natus perspiciatis, velit temporibus impedit optio rem dignissimos ratione!",
      name: "Jahid",
      occupation: "Developer",
      profilePicture: man1,
    },
    {
      _id: 4,
      ratings: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at eaque numquam natus perspiciatis, velit temporibus impedit optio rem dignissimos ratione!",
      name: "Jahid",
      occupation: "Developer",
      profilePicture: man1,
    },
    {
      _id: 5,
      ratings: 5,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam at eaque numquam natus perspiciatis, velit temporibus impedit optio rem dignissimos ratione!",
      name: "Jahid",
      occupation: "Developer",
      profilePicture: man1,
    },
  ];

  return (
    <div className="mx-auto mt-8 w-[50%]">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {review?.map((data) => (
            <div key={data?.profilePicture} className="embla__slide">
              <Card className="w-[400px]">
                <CardContent className="flex justify-center flex-col items-center">
                  <Avatar className="w-20 h-20 mx-auto mt-3">
                    <AvatarImage src={data?.profilePicture} alt={data.name} />
                  </Avatar>
                  <h1 className="font-bold text-xl text-gray-950 mt-2">
                    {data?.name}
                  </h1>
                  <h1 className="font-semibold text-lg text-gray-950 -mt-1">
                    {data?.occupation}
                  </h1>
                  <p className="text-center text-lg text-gray-950">
                    {data?.review?.length > 150
                      ? data?.review.slice(0, 150) + "..."
                      : data?.review}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers_review_card;
