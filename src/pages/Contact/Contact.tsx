import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

const Contact = () => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div className="h-screen mt-11">
      <h1
        className={
          darkLight__
            ? "text-xl font-semibold text-gray-100 text-center px-24"
            : "text-xl font-semibold text-gray-950 text-center px-24"
        }
      >
        Contact Information
      </h1>
      <Card className="lg:w-[700px] w-[300px] mx-auto">
        <CardContent className="py-5">
          <ul className="flex flex-col gap-y-2">
            <li className="text-lg text-gray-950">
              WhatsApp:{" "}
              <span className="text-gray-950 font-semibold">01733675223</span>
            </li>
            <li className="text-lg text-gray-950">
              FaceBook:{" "}
              <a
                className="text-blue-600 font-semibold"
                href="https://www.facebook.com/DeveloperRahadhasan/"
                target="_blank"
              >
                Admin-FaceBook-Profile
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
