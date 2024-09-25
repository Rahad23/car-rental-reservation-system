import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

interface TRadioButtonTypeProps {
  pendingApprove: string;
  setPendingApprove: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButton_Pending_Approve: React.FC<TRadioButtonTypeProps> = ({
  pendingApprove,
  setPendingApprove,
}) => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;
  return (
    <div className="flex justify-end items-center ">
      <RadioGroup defaultValue="comfortable" className="flex mt-6">
        <div
          className="flex items-center space-x-2"
          onClick={() => setPendingApprove("pending")}
        >
          <RadioGroupItem
            value="pending"
            id="r1"
            checked={pendingApprove === "pending"}
            className={
              darkLight__
                ? "text-[#fff] border-[#fff]"
                : "text-[#D4002A] border-[#D4002A]"
            }
          />
          <Label
            htmlFor="r1"
            className={
              darkLight__ ? "cursor-pointer text-white" : "cursor-pointer"
            }
          >
            Pending
          </Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => setPendingApprove("approve")}
        >
          <RadioGroupItem
            value="approve"
            id="r2"
            onClick={() => setPendingApprove("approve")}
            checked={pendingApprove === "approve"}
            className={
              darkLight__
                ? "text-[#fff] border-[#fff]"
                : "text-[#D4002A] border-[#D4002A]"
            }
          />
          <Label
            htmlFor="r2"
            className={
              darkLight__ ? "cursor-pointer text-white" : "cursor-pointer"
            }
          >
            Approve
          </Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => setPendingApprove("canceled")}
        >
          <RadioGroupItem
            value="canceled"
            id="r3"
            checked={pendingApprove === "canceled"}
            className={
              darkLight__
                ? "text-[#fff] border-[#fff]"
                : "text-[#D4002A] border-[#D4002A]"
            }
          />
          <Label
            htmlFor="r3"
            className={
              darkLight__ ? "cursor-pointer text-white" : "cursor-pointer"
            }
          >
            Canceled
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioButton_Pending_Approve;
