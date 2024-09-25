import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

interface SortingProductCategoryProps {
  setPriceSorting: React.Dispatch<React.SetStateAction<string>>;
}

const SortingPriceLowToHigh: React.FC<SortingProductCategoryProps> = ({
  setPriceSorting,
}) => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;

  return (
    <div className="flex items-center space-x-2">
      <RadioGroup
        className="flex"
        onValueChange={(value) => setPriceSorting(value)}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value={"1"}
            id="r1"
            className={darkLight__ ? " text-white border-white" : ""}
          />
          <Label
            htmlFor="r1"
            className={
              darkLight__ ? "cursor-pointer text-white" : "cursor-pointer"
            }
          >
            Low To High
          </Label>
        </div>
        <span>{"->"}</span>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value={"-1"}
            id="r2"
            className={darkLight__ ? " text-white border-white" : ""}
          />
          <Label
            htmlFor="r2"
            className={
              darkLight__ ? "cursor-pointer text-white" : "cursor-pointer"
            }
          >
            High To Low
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SortingPriceLowToHigh;
