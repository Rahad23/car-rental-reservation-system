import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "react-multi-select-component";

import "./booking_with_search_style/Booking_with_search_style.css";
import { Button } from "@/components/ui/button";
import {
  useGetCarFeatureQuery,
  useGetCarTypeQuery,
} from "@/Redux/features/Cars/Cars";
import SelectFieldLoading from "@/Loading_Spinners/SelectFieldLoading/SelectFieldLoading";
import { useState } from "react";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";
import { useDispatch } from "react-redux";
import {
  setCarFeatures,
  setCarTypes,
} from "@/Redux/features/Car_Find/Car_find_slice";

interface TCarCategoryType {
  isDeleted: boolean;
  type: string;
  _id: string;
}
interface TCarFeaturesType {
  isDeleted: boolean;
  feature: string;
  _id: string;
}

const Search_Form = () => {
  const { data: featuresData, isLoading: getFeatureLoading } =
    useGetCarFeatureQuery(undefined);
  const { data: carTypeData, isLoading: getCarTypeLoading } =
    useGetCarTypeQuery(undefined);
  const dispatch = useDispatch();
  const carFind = useAppSelector((state: RootState) => state.car_find);

  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedFeatured, setSelectedFeatured] = useState<
    { value: string; label: string }[]
  >([]);

  //custom data set in react multiple select field
  const customStrings = {
    allItemsAreSelected: "Selected All",
    selectSomeItems: "Select ...",
    search: "Search...",
    clearSearch: "Clear search",
    // You can override more messages here
  };

  //1
  const options =
    carTypeData?.data
      ?.filter((carType: TCarCategoryType) => !carType?.isDeleted)
      ?.map((carType: TCarCategoryType) => ({
        label: carType.type,
        value: carType.type,
      })) || [];

  //2
  const optionsCarFeatures =
    featuresData?.data
      ?.filter((carFeatures: TCarFeaturesType) => !carFeatures?.isDeleted)
      ?.map((carFeatures: TCarFeaturesType) => ({
        label: carFeatures.feature,
        value: carFeatures.feature,
      })) || [];

  //const handle multiple featured
  const handleMultipleType = (e: { value: string; label: string }[]) => {
    const selectedValues = e?.map(
      (option: { value: string; label: string }) => option.value
    );
    dispatch(setCarTypes(selectedValues));
    setSelected(e);
  };

  //const handle multiple featured
  const handleMultipleFeatured = (e: { value: string; label: string }[]) => {
    const selectedValues = e?.map(
      (option: { value: string; label: string }) => option.value
    );
    dispatch(setCarFeatures(selectedValues));
    setSelectedFeatured(e);
  };

  return (
    <div>
      <Card className="card-img rounded-none">
        <CardContent className="">
          <div className="mt-5 grid grid-cols-2 justify-center gap-x-5">
            <div>
              <Label htmlFor="type" className="text-[#fff] text-lg">
                Car Type
              </Label>
              {getCarTypeLoading ? (
                <SelectFieldLoading />
              ) : (
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={handleMultipleType}
                  labelledBy="Select Car Type"
                  overrideStrings={customStrings}
                />
              )}
            </div>
            <div>
              <Label htmlFor="features" className="text-[#fff] text-lg">
                Car Features
              </Label>
              {getFeatureLoading ? (
                <SelectFieldLoading />
              ) : (
                <MultiSelect
                  options={optionsCarFeatures}
                  value={selectedFeatured}
                  onChange={handleMultipleFeatured}
                  labelledBy="Select Car Features"
                  overrideStrings={customStrings}
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-center w-full">
            <Button
              disabled={
                carFind.carFeatures.length === 0 || carFind.carType.length === 0
              }
              className="bg-[#D4002A] hover:bg-[#D4002A] w-60 text-lg"
            >
              Find Car
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search_Form;
