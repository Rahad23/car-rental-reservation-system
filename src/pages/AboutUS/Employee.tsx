import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import man1 from "../../assets/employee/man1.jfif";
import man2 from "../../assets/employee/man2.jfif";
import man3 from "../../assets/employee/man3.jfif";
const Employee = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Mir Hossain",
      image: man1,
      post: "CEO",
    },
    {
      id: "2",
      name: "Tanvir Rahman",
      image: man2,
      post: "Marketing Manager",
    },
    {
      id: "3",
      name: "Rahad Hasan",
      image: man3,
      post: "E-commerce Manager",
    },
  ];

  return teamMembers.map((data) => (
    <Card key={data?.id} className="lg:w-[200px] w-[150px]">
      <CardContent className="lg:px- px-0">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarImage src={data?.image} alt="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold text-gray-950 text-base text-center mt-1">
            <span className="text-gray-800">{data?.name}</span>
          </h1>
          <h1 className="font-semibold text-gray-950 text-sm text-center mt-1">
            <span className="text-gray-800">{data?.post}</span>
          </h1>
        </div>
      </CardContent>
    </Card>
  ));
};

export default Employee;
