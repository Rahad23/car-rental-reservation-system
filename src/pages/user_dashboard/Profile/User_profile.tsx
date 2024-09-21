import { Card, CardContent } from "@/components/ui/card";
import "../User_Dashboard.style.css";
import { RootState } from "@/Redux/store";
import { useAppSelector } from "@/Redux/hook";
import defaultProfileImg from "../../../assets/man/profile.png";
import { useGetSingleUserQuery } from "@/Redux/features/auth/Auth/Auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import ProfileDropdownOption from "./ProfileDropdownOption";

const User_profile = () => {
  const loginUserData = useAppSelector((state: RootState) => state.auth);

  const payload = {
    email: loginUserData?.user?.email,
    token: loginUserData.token,
  };

  const { data, isLoading } = useGetSingleUserQuery(payload);

  const userProfileImg = data && data?.data?.profile_img;

  return isLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="w-full px-10 mt-1">
      <div>
        <Card className="rounded-none bg-[#ddd] w-[600px] mx-auto mt-5">
          <CardContent className="relative">
            <div>
              <div className="flex flex-col items-center justify-center mt-4">
                <div className="flex space-x-5">
                  <img
                    alt=""
                    className="w-40 h-40 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                    src={userProfileImg ? userProfileImg : defaultProfileImg}
                  />
                </div>
              </div>
              <div>
                <ul>
                  <li>
                    <Label
                      htmlFor="name"
                      className="text-base font-bold text-[#D4002A]"
                    >
                      Name:
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={data?.data?.name}
                      className="text-lg font-semibold text-gray-950"
                      readOnly
                    />
                  </li>
                  <li>
                    <Label
                      htmlFor="address"
                      className="text-base font-bold text-[#D4002A]"
                    >
                      Address:
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      value={data?.data?.address}
                      className="text-lg font-semibold text-gray-950"
                      readOnly
                    />
                  </li>
                  <li>
                    <Label
                      htmlFor="email"
                      className="text-base font-bold text-[#D4002A]"
                    >
                      Email:
                    </Label>
                    <Input
                      id="email"
                      type="text"
                      value={data?.data?.email}
                      className="text-lg font-semibold text-gray-950"
                      readOnly
                    />
                  </li>
                  <li>
                    <Label
                      htmlFor="phone"
                      className="text-base font-bold text-[#D4002A]"
                    >
                      Phone:
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      value={data?.data?.phone}
                      className="text-lg font-semibold text-gray-950"
                      readOnly
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div className="absolute top-0 right-6">
              <ProfileDropdownOption profileImg={userProfileImg} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default User_profile;
