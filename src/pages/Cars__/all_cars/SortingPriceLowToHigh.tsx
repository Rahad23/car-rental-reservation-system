import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SortingProductCategoryProps {
  setPriceSorting: React.Dispatch<React.SetStateAction<string>>;
}

const SortingPriceLowToHigh: React.FC<SortingProductCategoryProps> = ({
  setPriceSorting,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroup
        className="flex"
        onValueChange={(value) => setPriceSorting(value)}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value={"1"} id="r1" />
          <Label htmlFor="r1" className="cursor-pointer">
            Low To High
          </Label>
        </div>
        <span>{"->"}</span>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value={"-1"} id="r2" />
          <Label htmlFor="r2" className="cursor-pointer">
            High To Low
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SortingPriceLowToHigh;
