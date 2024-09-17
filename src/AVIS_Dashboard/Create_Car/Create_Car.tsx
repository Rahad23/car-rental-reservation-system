import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "react-multi-select-component";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetCarFeatureQuery,
  useGetCarTypeQuery,
  useMakeCarMutation,
} from "@/Redux/features/Cars/Cars";
import { TCarFeatures, TCarType } from "./Create_Car_Type";
import SelectFieldLoading from "@/Loading_Spinners/SelectFieldLoading/SelectFieldLoading";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";
import {
  resetCarDataState,
  setCarCategory,
  setCarColor,
  setCarDescription,
  setCarFeatures,
  setCarName,
  setIsElectric,
  setPricePerHour,
} from "@/Redux/features/Cars/CarSlice";
import { z, ZodIssue } from "zod";
import { carValidationSchema } from "./Create_Car_Data_Validation";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { getCurrentFormattedDate } from "@/formatedCurrentTimes/TimeFormate";

const Create_Car = () => {
  const { toast } = useToast();
  const { data, isLoading: carTypeLoading } = useGetCarTypeQuery(undefined);
  const { data: carFeatures, isLoading: carFeaturesLoading } =
    useGetCarFeatureQuery(undefined);

  //use redux carSlice hare dispatch redux carSlice and set input value
  const dispatch = useDispatch();
  //car input data
  const carInputData = useAppSelector((state: RootState) => state.makeACar);
  const authData = useAppSelector((state: RootState) => state.auth);
  const [makeCar, { isLoading: carCreateLoading }] = useMakeCarMutation();
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );
  const [carImgFile, setAdImgFile] = useState<File | null>(null);
  const [zodError, setZodError] = useState<ZodIssue[]>([]);

  //custom data set in react multiple select field
  const customStrings = {
    allItemsAreSelected: "All features are selected.",
    selectSomeItems: "Select features...",
    search: "Search features...",
    clearSearch: "Clear search",
    // You can override more messages here
  };

  //handle isElectric car or nonElectric car dispatch
  const handleSelectChange = (value: string) => {
    // Convert value to boolean based on selection
    dispatch(setIsElectric(value === "true"));
  };
  //handle isElectric car or nonElectric car dispatch
  const handleSelectCarTypeChange = (value: string) => {
    // Convert value to boolean based on selection
    dispatch(setCarCategory(value));
  };

  //set car image into state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAdImgFile(file);
    }
  };

  //const handle multiple featured
  const handleMultipleFeatured = (e: { value: string; label: string }[]) => {
    const selectedValues = e?.map(
      (option: { value: string; label: string }) => option.value
    );

    // Dispatch the selected feature values to the Redux store
    dispatch(setCarFeatures(selectedValues));
    setSelected(e);
  };

  const options =
    carFeatures?.data
      ?.filter((feature: TCarFeatures) => !feature.isDeleted)
      ?.map((feature: { feature: string }) => ({
        label: feature.feature,
        value: feature.feature,
      })) || [];

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const resultValidation = carValidationSchema.parse(carInputData);

      if (resultValidation) {
        //here set car image append to form data
        if (carImgFile) {
          formData.append("file", carImgFile);
        }

        const dataFields = {
          name: carInputData.name,
          pricePerHour: carInputData.pricePerHour,
          description: carInputData.description,
          category: carInputData.category || "",
          color: carInputData.color,
          isElectric: carInputData.isElectric,
          features: carInputData.features,
        };

        //here set input field data append to form data
        formData.append("data", JSON.stringify(dataFields));

        const result = await makeCar({
          payload: formData,
          token: authData.token,
        });

        if (result?.data?.success) {
          dispatch(resetCarDataState());
          setAdImgFile(null);
          setSelected([]);
          toast({
            title: "Car make successfully!",
            description: getCurrentFormattedDate(),
            style: { background: "#7af59b", color: "#2D3A4B" },
            //   action: (
            //     <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            //   ),
          });
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setZodError(e.errors);
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  return (
    <div className="w-full px-14">
      <h1 className="text-xl font-semibold mt-2 text-gray-950">Create Car</h1>
      <hr />
      <div className="mt-9 grid grid-cols-1 gap-x-5 gap-y-3">
        <div className="flex flex-row gap-x-3 w-full">
          <div className="w-full">
            <Label htmlFor="name">Car Model</Label>
            <Input
              value={carInputData.name}
              onChange={(e) => dispatch(setCarName(e.target.value))}
              className=""
              id="name"
              type="text"
              placeholder="Car Name"
            />
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "name")?.message}
            </span>
          </div>
          <div className="w-full">
            <Label htmlFor="name">Car Color</Label>
            <Input
              value={carInputData.color}
              onChange={(e) => dispatch(setCarColor(e.target.value))}
              className=""
              type="text"
              placeholder="Car Color"
            />
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "color")?.message}
            </span>
          </div>
          <div className="w-full">
            <Label htmlFor="price">Price Per Hour</Label>

            <Input
              value={carInputData.pricePerHour}
              onChange={(e) => dispatch(setPricePerHour(e.target.value))}
              id="price"
              className=""
              type="number"
              placeholder="Car Price"
            />
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "pricePerHour")?.message}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-5">
          <div className="w-full">
            <Label htmlFor="type">Is The Car Electric?</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Is Electric?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="true" className="text-base">
                    Yes
                  </SelectItem>
                  <SelectItem value="false" className="text-base">
                    No
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "isElectric")?.message}
            </span>
          </div>
          <div className="w-full">
            <Label htmlFor="type">Features</Label>

            {/* Multi select test */}
            {carFeaturesLoading ? (
              <SelectFieldLoading />
            ) : (
              <>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={handleMultipleFeatured}
                  labelledBy="Select Car Features"
                  overrideStrings={customStrings}
                />
                <span className="text-red-600 text-sm">
                  {zodError?.find((err) => err.path[0] === "features")?.message}
                </span>
              </>
            )}
          </div>
          {/* select car type ------------------------------ */}
          <div className="w-full">
            <Label htmlFor="type">Car Type</Label>
            <Select onValueChange={handleSelectCarTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Car Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Car Types</SelectLabel>
                  {carTypeLoading ? (
                    <SelectFieldLoading />
                  ) : (
                    data?.data?.map((carType: TCarType) => (
                      <SelectItem
                        key={carType?._id}
                        className="capitalize text-base"
                        value={carType?._id}
                      >
                        {carType?.type}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "category")?.message}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="w-[400px]">
            <Label htmlFor="img">Car Image</Label>
            <Input
              onChange={handleFileChange}
              type="file"
              id="img"
              placeholder="Car Image"
            />
            <span className="text-red-600 text-sm">
              {!carImgFile && "Car Image is required!!"}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-3">
          <div className="w-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={carInputData.description}
              onChange={(e) => dispatch(setCarDescription(e.target.value))}
              id="description"
              placeholder="Description"
            />
            <span className="text-red-600 text-sm">
              {zodError?.find((err) => err.path[0] === "description")?.message}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-7">
        {carCreateLoading ? (
          <LoadingButton message="Wait" />
        ) : (
          <Button
            onClick={handleSubmit}
            className="w-[400px] text-xl bg-[#D4002A] hover:bg-[#D4002A]"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default Create_Car;
