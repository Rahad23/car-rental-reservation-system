import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectFieldLoading from "@/Loading_Spinners/SelectFieldLoading/SelectFieldLoading";
import { useGetCarTypeQuery } from "@/Redux/features/Cars/Cars";
import { useEffect, useState } from "react";
// React.Dispatch<React.SetStateAction<string>>
type TSortingWithType = {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SortingWithType: React.FC<TSortingWithType> = ({ setCategory }) => {
  type TCategory = {
    _id: string;
    type: string;
    isDeleted: boolean;
  };

  const [categoryValue, setCategoryValue] = useState("");

  const { data, isLoading: catTypeLoading } = useGetCarTypeQuery(undefined);

  useEffect(() => {
    setCategory(categoryValue);
  }, [categoryValue]);

  return (
    <div className="flex gap-x-0 items-center">
      <Select onValueChange={(value) => setCategoryValue(value)}>
        <SelectTrigger className="w-[180px] rounded-none ring-0 focus:ring-0">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            {catTypeLoading ? (
              <SelectFieldLoading />
            ) : (
              data?.data?.map((data: TCategory) => (
                <SelectItem
                  key={data._id}
                  className="cursor-pointer capitalize"
                  value={data._id}
                >
                  {data.type}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortingWithType;
