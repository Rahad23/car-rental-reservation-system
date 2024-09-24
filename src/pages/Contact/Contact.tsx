import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="h-screen mt-11">
      <h1 className="text-xl font-semibold text-gray-950 text-center">
        Contact Information
      </h1>
      <Card className="w-[700px] mx-auto">
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
