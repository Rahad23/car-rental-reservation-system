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
import { BiSolidEdit } from "react-icons/bi";
import defaultProfileImg from "../../assets/man/profile.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
const ProfileEditDialog = () => {
  const [showImgIcon, setImgIcon] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute top-0 right-6 bg-[#ddd] hover:bg-[#ddd] p-0 rounded-none border-none"
        >
          <BiSolidEdit
            className=" text-2xl text-[#D4002A]  cursor-pointer"
            title="Update Profile Data"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] px-7">
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
                    src={defaultProfileImg}
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
            <Input id="profile-pic" className="hidden" type="file" />
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Name"
              placeholder="Name"
              className=""
            />
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              defaultValue="Name"
              placeholder="Email"
              className=""
            />
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="email"
              defaultValue="Name"
              placeholder="Phone"
              className=""
            />
          </div>
          <div className="flex flex-col  gap-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              defaultValue="Name"
              placeholder="Address"
              className=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
