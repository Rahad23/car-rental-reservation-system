import { MultiSelect } from "react-multi-select-component";

import "../booking_with_search/booking_with_search_style/Booking_with_search_style.css";

import Find_Cars_Card from "../booking_with_search/Find_Cars_Card";
import {
  useGetCarFeatureQuery,
  useGetCarTypeQuery,
} from "@/Redux/features/Cars/Cars";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useFindCarMutation } from "@/Redux/features/Car_Find/Car_find";
import { useState } from "react";
import {
  resetCarFindDataState,
  setCarFeatures,
  setCarTypes,
} from "@/Redux/features/Car_Find/Car_find_slice";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SelectFieldLoading from "@/Loading_Spinners/SelectFieldLoading/SelectFieldLoading";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";

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
  const { toast } = useToast();
  const [findCar, { isLoading: findCarLoading }] = useFindCarMutation();

  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedFeatured, setSelectedFeatured] = useState<
    { value: string; label: string }[]
  >([]);

  const [findCars_, setFindCars_] = useState([]);
  const [visibleFindCars, setVisibleFindCars] = useState(false);
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
        setVisibleFindCars(true);
      } else {
        toast({
          title: "No Car Found",
          description: getCurrentFormattedDate(),
          style: { background: "#dc2626", color: "#fff" },
        });
      }

      dispatch(resetCarFindDataState());
      setSelected([]);
      setSelectedFeatured([]);
    }
  };

  const clearFilterCarsData = () => {
    setVisibleFindCars(false);
    setFindCars_([]);
  };

  return (
    <div className="px-24 mt-2 relative">
      <Card className="card-img rounded-none h-72">
        <CardContent className="">
          <div className="mt-5 grid grid-cols-2 justify-center gap-x-5">
            <div>
              <Label htmlFor="type" className="text-[#fff]  text-lg">
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
            ) : visibleFindCars ? (
              <Button
                onClick={clearFilterCarsData}
                className="bg-[#D4002A] hover:bg-[#D4002A] w-60 text-lg"
              >
                Clear Filter
              </Button>
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

      <div
        className={
          !visibleFindCars
            ? "hidden"
            : "flex flex-col gap-y-3 h-[650px] w-full bg-[#ddd] px-5 overflow-y-scroll no-scrollbar absolute top-44"
        }
      >
        {findCars_?.map((data: TFindCars) => (
          <Find_Cars_Card key={data?._id} payload={data} />
        ))}
      </div>
    </div>
  );
};

export default Search_Form;
