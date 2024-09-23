import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingButton from "@/Loading_Spinners/LoadingButton/LoadingButton";
import {
  useBlockUserMutation,
  useUpdateUserRoleMutation,
} from "@/Redux/features/auth/Auth/Auth";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import swal from "sweetalert";

interface ErrorResponse {
  success: boolean;
  message: string;
}
const Action_to_user: React.FC<{ id: string; isBlock: boolean }> = ({
  id,
  isBlock,
}) => {
  const authUser = useAppSelector((state: RootState) => state.auth);
  const [updateUserRole, { isLoading: updateUserRoleLoading }] =
    useUpdateUserRoleMutation();

  const [blockUser, { isLoading: blockUserLoading }] = useBlockUserMutation();

  const handleUpdateUserRole = async (id: string) => {
    const willChange = await swal({
      title: "Are you sure?",
      text: "You want to Make Admin This User?",
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
          text: "Make Admin",
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
        const result = await updateUserRole({ id, token: authUser?.token });

        if ("data" in result && result?.data?.success) {
          await swal("Delete Successfully", {
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
        await swal("Failed to change the user role!", {
          icon: "error",
        });
      }
    } else {
      await swal("This user not make admin!");
    }
  };

  const handleBlockUser = async () => {
    const willBlock = await swal({
      title: "Are you sure?",
      text: "You want to Block This User?",
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
          text: "Block User",
          value: true,
          visible: true,
          className: "btn-danger bg-[#D4002A] hover:bg-[#D4002A]",
          closeModal: true,
        },
      },
      dangerMode: true,
    });

    if (willBlock) {
      try {
        // Use await to wait for the car deletion API call to complete
        const result = await blockUser({
          id,
          token: authUser?.token,
        });

        if (result && result?.data?.success) {
          await swal("Blocking successfully!", {
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
        console.error("Error blocking user:", error);
        await swal("Failed to Block the user!", {
          icon: "error",
        });
      }
    } else {
      await swal("This user not make admin!");
    }
  };

  return isBlock ? (
    <h1 className="text-red-600 font-semibold">Blocked User</h1>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#D4002A] hover:bg-[#D4002A] hover:text-white text-white"
        >
          Action
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Action</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleUpdateUserRole(id)}
            className="gap-x-3 text-green-600 cursor-pointer"
          >
            {updateUserRoleLoading ? (
              <LoadingButton message="Wait" />
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <MdModeEdit className="text-lg text-gray-950" />
                  <span className="text-lg ">Make Admin</span>
                </div>
                <DropdownMenuShortcut>⇧⌘M_A</DropdownMenuShortcut>
              </div>
            )}
          </DropdownMenuItem>
          {blockUserLoading ? (
            <LoadingButton message="wait" />
          ) : (
            <DropdownMenuItem
              onClick={handleBlockUser}
              className="gap-x-3 text-red-600 hover:text-red-600 cursor-pointer"
            >
              <AiTwotoneDelete className="text-lg text-red-600" />
              <span className="text-lg">Block</span>
              <DropdownMenuShortcut>⇧⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action_to_user;
