import { Card, CardContent } from "@/components/ui/card";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useGetRentSummeryQuery } from "@/Redux/features/RentSummery/RentSummery";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

const Total_Bookings = () => {
  const authUser = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetRentSummeryQuery({
    token: authUser?.token,
  });

  return (
    <div>
      <h1 className="text-gray-950 font-semibold">Total Bookings</h1>
      <Card className="w-52 h-28 flex justify-center items-center mt-1">
        {isLoading ? (
          <LoadingSpenar />
        ) : (
          <CardContent className="flex justify-center items-center h-16 p-0 w-16">
            <h1 className="text-4xl font-semibold text-[#D4002A]">
              {data?.data?.bookings?.length}
            </h1>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Total_Bookings;
