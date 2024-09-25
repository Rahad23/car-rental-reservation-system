import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

const Why_Choose_Us = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;

  const Data = [
    {
      _id: 1,
      question: "Why should I choose AVIS for car rental services?",
      answer:
        "At AVIS, we pride ourselves on offering top-notch vehicles at competitive rates, ensuring a smooth rental experience. Our extensive fleet, flexible rental terms, and customer-first approach make us the ideal choice for all your travel needs.",
    },
    {
      _id: 2,
      question: "Does AVIS offer competitive pricing?",
      answer:
        "Yes, AVIS provides some of the best rental prices in the market. We offer transparent pricing with no hidden fees, so you always know exactly what you're paying for.",
    },
    {
      _id: 3,
      question: "What types of vehicles can I rent at AVIS?",
      answer:
        "AVIS offers a wide selection of vehicles to suit every need, from economy cars and SUVs to luxury models. Whether you're planning a business trip or a family vacation, we have the right car for you.",
    },
    {
      _id: 4,
      question: "Can I rent a car from AVIS at any time?",
      answer:
        "Absolutely! AVIS offers 24/7 online booking, so you can rent a car at any time that suits you. Our customer support is also available around the clock to assist with any queries.",
    },
    {
      _id: 5,
      question: "Does AVIS offer any additional benefits?",
      answer:
        "es, AVIS offers benefits such as free cancellations, flexible rental options, and rewards for loyal customers. We strive to make your rental experience convenient and hassle-free.",
    },
    {
      _id: 6,
      question: "How does AVIS ensure vehicle safety and cleanliness?",
      answer:
        "At AVIS, we follow strict maintenance protocols to ensure every car is in top condition. Additionally, we thoroughly clean and sanitize each vehicle between rentals to guarantee your safety and comfort.",
    },
    {
      _id: 7,
      question: "What makes AVIS different from other car rental services?",
      answer:
        "AVIS stands out due to our customer-centric approach. With our wide range of vehicles, competitive pricing, and exceptional service, we ensure a seamless rental experience from start to finish.",
    },
    {
      _id: 8,
      question: "How can I contact AVIS support if I need assistance?",
      answer:
        "Our support team is available 24/7 to assist you with any issues or questions. You can reach us via phone, email, or live chat, and we’ll be happy to help resolve any concerns quickly.",
    },
  ];

  return (
    <div className="lg:px-24 px-2 mt-20">
      <h1
        className={
          darkLight__
            ? "text-2xl text-gray-100 text-center mt-16 font-semibold"
            : "text-2xl text-center mt-16 font-semibold"
        }
      >
        Why Choose Us?
      </h1>

      <div
        className={
          darkLight__
            ? "w-[60%] mx-auto mt-10 text-gray-100"
            : "w-[60%] mx-auto mt-10"
        }
      >
        <Accordion type="single" collapsible className="w-full">
          {Data.map((data) => (
            <AccordionItem key={data?._id} value={`item-${data?._id}`}>
              <AccordionTrigger className="font-semibold">
                {data?.question}
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                {data?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Why_Choose_Us;
