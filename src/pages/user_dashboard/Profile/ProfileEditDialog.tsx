import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import defaultProfileImg from "../../../assets/man/profile.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { Textarea } from "@/components/ui/textarea";
import { RxCross1 } from "react-icons/rx";
import {
  resetUpdateUserState,
  setUpdateAddress,
  setUpdateEmail,
  setUpdateName,
  setUpdatePhoneNumber,
} from "@/Redux/features/auth/Auth/Auth.Update.User.Slice";
import { z, ZodIssue } from "zod";
import { updateUserDataSchema } from "./ProfileEdit.validation";
import { useUpdateUserMutation } from "@/Redux/features/auth/Auth/Auth";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface TProfileEditDialogProps {
  profileImg: string;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEditDialog: React.FC<TProfileEditDialogProps> = ({
  profileImg,
  setOpenDropdown,
}) => {
  type E164Number = string;
  const [showImgIcon, setImgIcon] = useState(false);
  const [profileImg_, setProfileImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [zodError, setZodError] = useState<ZodIssue[]>([]);
  const [value, setValue] = useState<E164Number | undefined>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  //   const authData = useAppSelector((state: RootState) => state.auth);
  const updateData = useAppSelector((state: RootState) => state.updateUser);
  //auth
  const auth = useAppSelector((state: RootState) => state.auth);
  //update user mutation
  const [update_profile, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  //set profile img in state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImg(file);
    }
    const previewUrl = file && URL.createObjectURL(file);
    setImgPreview(previewUrl!);
  };

  useEffect(() => {
    if (value) {
      dispatch(setUpdatePhoneNumber(value));
    }
  }, [value, dispatch]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      const resultValidation = updateUserDataSchema.parse(updateData);

      if (resultValidation) {
        //set profile img conditional
        if (profileImg_) {
          formData.append("file", profileImg_);
        }

        const payload = {
          name: updateData.name,
          email: updateData.email,
          phone: updateData.phone,
          address: updateData.address,
        };

        formData.append("data", JSON.stringify(payload));

        const result = await update_profile({
          payload: formData,
          token: auth.token,
        });

        if (result?.data?.success) {
          dispatch(resetUpdateUserState());
          setModalIsOpen(false);
          setOpenDropdown(false);
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
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-[#FFFFFF] p-0 rounded-none border-none w-full flex justify-start"
          onClick={() => setModalIsOpen(true)}
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] px-7 overflow-y-scroll no-scrollbar h-[550px]">
        <DialogHeader>
          <div className="flex flex-col items-center justify-center mt-4">
            <Label htmlFor="profile-pic">
              <div
                onMouseEnter={() => setImgIcon(true)}
                onMouseLeave={() => setImgIcon(false)}
                className="relative flex items-center justify-center"
              >
                <div className="flex space-x-5 cursor-pointer">
                  <img
                    alt=""
                    className="w-20 h-20 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                    src={
                      imgPreview
                        ? imgPreview
                        : profileImg
                        ? profileImg
                        : defaultProfileImg
                    }
                  />
                </div>

                <MdOutlineAddPhotoAlternate
                  onMouseEnter={() => setImgIcon(true)}
                  onMouseLeave={() => setImgIcon(false)}
                  className={
                    showImgIcon
                      ? "absolute text-4xl opacity-60 cursor-pointer"
                      : "absolute text-4xl opacity-60 hidden"
                  }
                />
              </div>
            </Label>
            {imgPreview && (
              <RxCross1
                onClick={() => setImgPreview(null)}
                className="text-4xl opacity-60 cursor-pointer text-red-600 font-bold ml-2 mt-1"
                title="Remove Photo"
              />
            )}
            <Input
              onChange={handleFileChange}
              id="profile-pic"
              className="hidden"
              type="file"
            />
            <span className="text-red-600 text-sm mt-3">
              {!profileImg_ && "Profile img is Optional!"}
            </span>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="name">Name</Label>
            <div>
              <Input
                id="name"
                onChange={(e) => dispatch(setUpdateName(e.target.value))}
                value={updateData.name}
                placeholder="Name"
                className=""
              />
              <span className="text-red-600 text-sm">
                {zodError?.find((err) => err.path[0] === "name")?.message}
              </span>
            </div>
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="name">Email</Label>
            <div>
              <Input
                id="email"
                onChange={(e) => dispatch(setUpdateEmail(e.target.value))}
                value={updateData.email}
                placeholder="Email"
                className=""
              />
              <span className="text-red-600 text-sm">
                {zodError?.find((err) => err.path[0] === "email")?.message}
              </span>
            </div>
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div>
              <PhoneInput
                defaultCountry="BD"
                value={updateData.phone}
                onChange={setValue}
                className="border-[1px] border-[#ddd]  w-full rounded-md text-gray-700 px-1"
                placeholder="Phone number"
                numberInputProps={{
                  className: "rounded-md px-4 focus:outline-none py-2 px-3",
                }}
              />
              <span className="text-red-600">
                {zodError?.find((err) => err.path[0] === "phone")?.message}
              </span>
            </div>
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="address">Address</Label>
            <div>
              <Textarea
                id="address"
                onChange={(e) => dispatch(setUpdateAddress(e.target.value))}
                value={updateData.address}
                placeholder="Type your address here."
              />
              <span className="text-red-600 text-sm">
                {zodError?.find((err) => err.path[0] === "address")?.message}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          {updateUserLoading ? (
            <LoadingButton message="Wait.." />
          ) : (
            <Button
              onClick={handleUpdate}
              type="submit"
              className="bg-[#D4002A] hover:bg-[#D4002A]"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
