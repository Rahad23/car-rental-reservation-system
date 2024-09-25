import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import { useGetRentSummeryQuery } from "@/Redux/features/RentSummery/RentSummery";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const Avis_Chart = () => {
  const authUser = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetRentSummeryQuery({
    token: authUser?.token,
  });

  const chartData = data?.data?.rechart?.map(
    (data: { month: string; total_rent: string }) => ({
      month: data?.month,
      total_rent: data?.total_rent,
    })
  );

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#D4002A",
    },
    mobile: {
      label: "Mobile",
      color: "#dc3254",
    },
  } satisfies ChartConfig;

  return isLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] lg:w-[600px] w-[300px] mx-auto"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total_rent" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
      <h1 className="text-2xl text-center mt-5 font-semibold">Sales Chart</h1>
    </div>
  );
};

export default Avis_Chart;
