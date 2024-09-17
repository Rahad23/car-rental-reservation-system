import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortingProductCategoryProps {
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
}

const SortingPrice: React.FC<SortingProductCategoryProps> = ({
  setPriceRange,
}) => {
  const priceRange = [
    {
      id: 1,
      amount: "100-150",
    },
    {
      id: 2,
      amount: "150-200",
    },
    {
      id: 3,
      amount: "200-250",
    },
    {
      id: 4,
      amount: "250-300",
    },
    {
      id: 5,
      amount: "300-350",
    },
    {
      id: 6,
      amount: "350-400",
    },
    {
      id: 7,
      amount: "400-450",
    },
    {
      id: 8,
      amount: "480-500",
    },
    {
      id: 8,
      amount: "500-600",
    },
  ];

  return (
    <Select onValueChange={(value) => setPriceRange(value)}>
      <SelectTrigger className="w-[180px] rounded-none ring-0 focus:ring-0">
        <SelectValue placeholder="Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel></SelectLabel>
          {priceRange.map((data) => (
            <SelectItem key={data.id} value={data.amount}>
              {data.amount}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortingPrice;
