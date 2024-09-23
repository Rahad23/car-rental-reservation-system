import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpenar from "@/Loading_Spinners/LoadingSpenar/LoadingSpenar";
import {
  useGetAllUserQuery,
  useUnblockUserMutation,
} from "@/Redux/features/auth/Auth/Auth";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useState } from "react";
import Action_to_user from "./Action_to_user";
import Search_user from "./Search_user";
import Switch_User_Data from "./Switch_User_Data";
import { Button } from "@/components/ui/button";
import swal from "sweetalert";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
type UserProfile = {
  _id: string;
  address: string;
  email: string;
  isDeleted: boolean;
  name: string;
  phone: string;
  profile_img: string;
  role: "user" | "admin"; // Assuming "role" can have other values like "admin"
};

interface ErrorResponse {
  success: boolean;
  message: string;
}

const User_Management = () => {
  const authUser = useAppSelector((state: RootState) => state.auth);
  const [roll, setRoll] = useState("users");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllUserQuery({
    search: search,
    token: authUser?.token as string,
  });

  const [unblockUser, { isLoading: unblockUserLoading }] =
    useUnblockUserMutation();

  const users = data && data?.data?.users;
  const admins = data && data?.data?.admins;
  const blockUsers = data && data?.data?.blockUsers;

  const handleUnblockUsers = async (id: string) => {
    const willChange = await swal({
      title: "Are you sure?",
      text: "You want to unblock this user?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Unblock",
          value: true,
          visible: true,
          className: "btn-danger bg-[#D4002A] hover:bg-[#D4002A]",
          closeModal: true,
        },
      },
      dangerMode: true,
    });

    if (willChange) {
      try {
        // Use await to wait for the car deletion API call to complete
        const result = await unblockUser({
          id,
          token: authUser?.token,
        });

        if ("data" in result && result?.data?.success) {
          await swal("Unblock Successfully", {
            icon: "success",
          });
        }

        if (result?.error && "data" in result.error) {
          const errorData = result.error.data as ErrorResponse; // Type assertion
          if (errorData?.success === false) {
            await swal(`${errorData?.message}`, {
              icon: "error",
            });
          }
        } else {
          console.log("Error doesn't have data property");
        }
        // Show success message after deletion
      } catch (error) {
        console.error("Error dos't change user role:", error);
        await swal("Failed to unblock the user!", {
          icon: "error",
        });
      }
    } else {
      await swal("This user have still blocks list!");
    }
  };

  return isLoading ? (
    <div className="w-full">
      <LoadingSpenar />
    </div>
  ) : (
    <div className="w-full px-10 mt-10">
      <div className="flex justify-between">
        <Search_user search={search} setSearch={setSearch} />
        <Switch_User_Data roll={roll} setRoll={setRoll} />
      </div>
      <Table className="mt-7">
        <TableCaption>A list of Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roll === "users" &&
            users?.map((data: UserProfile) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">
                  <img className="w-12" src={data?.profile_img} alt="profile" />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>
                  <Action_to_user id={data?._id} isBlock={data?.isDeleted} />
                </TableCell>
              </TableRow>
            ))}
          {roll === "admins" &&
            admins?.map((data: UserProfile) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">
                  <img className="w-12" src={data?.profile_img} alt="profile" />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>
                  <span className="text-red-600 font-semibold">Admin</span>
                </TableCell>
              </TableRow>
            ))}
          {roll === "block" &&
            blockUsers?.map((data: UserProfile) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">
                  <img className="w-12" src={data?.profile_img} alt="profile" />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.role}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>
                  {unblockUserLoading ? (
                    <LoadingButton message="Wait" />
                  ) : (
                    <Button
                      onClick={() => handleUnblockUsers(data?._id)}
                      className="bg-[#D4002A] hover:bg-[#D4002A]"
                    >
                      Unblock User
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default User_Management;
