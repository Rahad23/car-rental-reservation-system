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
  resetCarFindDataState,
  setCarFeatures,
  setCarTypes,
} from "@/Redux/features/Car_Find/Car_find_slice";
import { useFindCarMutation } from "@/Redux/features/Car_Find/Car_find";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import Find_Cars_Card from "./Find_Cars_Card";

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

type TFindCarCategory = {
  isDeleted: boolean;
  type: string;
  _id: string;
};

type TFindCars = {
  _id: string;
  car_image: string;
  category: TFindCarCategory;
  color: string;
  description: string;
  features: string[];
  isDeleted: boolean;
  isElectric: boolean;
  name: string;
  pricePerHour: string;
  status: "available" | "unavailable";
  type: string;
};

const Search_Form = () => {
  const { data: featuresData, isLoading: getFeatureLoading } =
    useGetCarFeatureQuery(undefined);
  const { data: carTypeData, isLoading: getCarTypeLoading } =
    useGetCarTypeQuery(undefined);
  const dispatch = useDispatch();
  const authData = useAppSelector((state: RootState) => state.auth);
  const carFind = useAppSelector((state: RootState) => state.car_find);

  const [findCar, { isLoading: findCarLoading }] = useFindCarMutation();

  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedFeatured, setSelectedFeatured] = useState<
    { value: string; label: string }[]
  >([]);

  const [findCars_, setFindCars_] = useState([]);
  const [carNotFoundMessage, setCarNotFoundMessage] = useState("");

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

  //handle find car
  const handleFindCars = async () => {
    setFindCars_([]);
    const result = await findCar({ payload: carFind, token: authData.token });
    if (result?.data?.success) {
      if (result?.data?.data?.length > 0) {
        setFindCars_(result?.data?.data);
      } else {
        setCarNotFoundMessage("Not Found!");
      }
      dispatch(resetCarFindDataState());
      setSelected([]);
      setSelectedFeatured([]);
    }
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
            {findCarLoading ? (
              <LoadingButton message="Wait" />
            ) : (
              <Button
                disabled={
                  carFind.carFeatures.length === 0 ||
                  carFind.carType.length === 0
                }
                onClick={handleFindCars}
                className="bg-[#D4002A] hover:bg-[#D4002A] w-60 text-lg"
              >
                Find Car
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {findCars_?.length === 0 ? (
        <h1 className="text-xl font-semibold mt-5 text-center">
          {carNotFoundMessage ? carNotFoundMessage : "Find your favorite car"}
        </h1>
      ) : (
        <div className="flex flex-col gap-y-3 h-[650px] overflow-y-scroll no-scrollbar">
          {findCars_?.map((data: TFindCars) => (
            <Find_Cars_Card key={data?._id} payload={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search_Form;
