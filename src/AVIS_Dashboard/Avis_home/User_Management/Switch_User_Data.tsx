import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";

interface TRadioButtonTypeProps {
  roll: string;
  setRoll: React.Dispatch<React.SetStateAction<string>>;
}

const Switch_User_Data: React.FC<TRadioButtonTypeProps> = ({
  roll,
  setRoll,
}) => {
  const darkLight = useAppSelector((state: RootState) => state.darkLight);
  const darkLight__ = darkLight.darkLight;

  return (
    <div className="flex justify-start lg:justify-end items-center ">
      <RadioGroup defaultValue="comfortable" className="flex mt-6">
        <div
          className="flex items-center space-x-2"
          onClick={() => setRoll("users")}
        >
          <RadioGroupItem
            value="users"
            id="r1"
            checked={roll === "users"}
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
            Users
          </Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => setRoll("admins")}
        >
          <RadioGroupItem
            value="admins"
            id="r2"
            onClick={() => setRoll("admins")}
            checked={roll === "admins"}
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
            Admins
          </Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => setRoll("block")}
        >
          <RadioGroupItem
            value="block"
            id="r3"
            onClick={() => setRoll("block")}
            checked={roll === "block"}
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
            Blocked-user
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default Switch_User_Data;
