import GoogleMapEmbaded from "./GoogleMapEmbaded";
import Employee from "./Employee";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
const AboutUS = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div className="lg:px-24 px-7">
      <div
        className={
          darkLight__
            ? "mt-16 leading-7 font-semibold lg:text-left text-center text-gray-100"
            : "mt-16 leading-7 font-semibold lg:text-left text-center "
        }
      >
        <span className={darkLight__ ? "text-gray-100" : "text-gray-950"}>
          Dear Customer,
        </span>{" "}
        Welcome to Avis car rental website. Avis is a very popular platform in
        Bangladesh in the list of rent the car. We have been providing essential
        car rent since 2024. Each of our customers is added to a private group
        for any after-sales support to resolve their issues. So every customer
        will get instant solutions for any after-sale problem. If you need any
        assistance feel free to ask any question via{" "}
        <a
          href="mailto: rahadhasan33675@email.com"
          className="text-blue-600 hover:border-b-[1px] hover:border-blue-600"
        >
          rahadhasan33675@gmail.com
        </a>{" "}
        ,{" "}
        <a href="https://wa.me/01733675223" target="_blank">
          <span className="text-blue-600 hover:border-b-[1px] hover:border-blue-600 font-semibold">
            WhatsApp at:- +8801733675223
          </span>
        </a>{" "}
        Or{" "}
        <a
          href="https://www.facebook.com/DeveloperRahadhasan/"
          className="text-blue-600 hover:border-b-[1px] hover:border-blue-600 font-semibold"
          target="_blank"
        >
          Facebook
        </a>{" "}
        Regards,
        <br />
        <div className="mt-5">
          Trade License No:{" "}
          <span className="text-red-500">0124586974525135</span> <br /> BSCIC
          Registration No:{" "}
          <span className="text-red-500">KU-5214799546-587945618</span>
        </div>
      </div>
      <div className="mt-20 flex justify-between lg:flex-row flex-col">
        <h1
          className={
            darkLight__
              ? "font-semibold text-gray-100"
              : "font-semibold text-gray-950"
          }
        >
          Company Location:
          <div className="mt-5">
            <GoogleMapEmbaded
              src={
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460595.1052208681!2d89.3349120265144!3d25.591645907376325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2c8e5e6f60cfb%3A0xa2ff6053255f8384!2z4KaV4KeB4Kah4Ka84Ka_4KaX4KeN4Kaw4Ka-4KauIOCmuOCngeCmquCmvuCmsCDgpq7gpr7gprDgp43gppXgp4fgpp8!5e0!3m2!1sen!2sbd!4v1725380598542!5m2!1sen!2sbd"
              }
            />
          </div>
        </h1>
        <div>
          <h1
            className={
              darkLight__
                ? "font-semibold text-gray-100 lg:mt-0 mt-5"
                : "font-semibold text-gray-950 lg:mt-0 mt-5"
            }
          >
            Members:
          </h1>
          <div className="grid grid-cols-2 lg:gap-x-5 gap-x-2 lg:gap-y-5 gap-y-3 justify-center items-center lg:mt-0 mt-5 ">
            <Employee />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
