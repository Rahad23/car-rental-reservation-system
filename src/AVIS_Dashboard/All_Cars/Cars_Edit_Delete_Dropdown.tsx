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
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import swal from "sweetalert";
import { useAppSelector } from "@/Redux/hook";
import { RootState } from "@/Redux/store";
import { useDeleteCarMutation } from "@/Redux/features/Cars/Cars";

interface ErrorResponse {
  success: boolean;
  message: string;
}

const Cars_Edit_Delete: React.FC<{ id: string }> = ({ id }) => {
  const authData = useAppSelector((state: RootState) => state.auth);

  const [deleteCar] = useDeleteCarMutation();

  //handle car delete
  const handleCarDelete = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "You want to Delete This Car?",
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
          text: "Delete",
          value: true,
          visible: true,
          className: "btn-danger",
          closeModal: true,
        },
      },
      dangerMode: true,
    });

    if (willDelete) {
      try {
        // Use await to wait for the car deletion API call to complete
        const result = await deleteCar({ id, token: authData.token });

        if (result?.data?.success) {
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
        console.error("Error deleting car:", error);
        await swal("Failed to delete the car!", {
          icon: "error",
        });
      }
    } else {
      await swal("This Car Data is safe!");
    }
  };

  return (
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
          <Link to={`/avis_home/cars_edit/${id}`}>
            <DropdownMenuItem className="gap-x-3 text-green-600 cursor-pointer">
              <MdModeEdit className="text-lg text-gray-950" />
              <span className="text-lg ">Edit</span>
              <DropdownMenuShortcut>⇧⌘C_E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={handleCarDelete}
            className="gap-x-3 text-red-600 hover:text-red-600 cursor-pointer"
          >
            <AiTwotoneDelete className="text-lg text-red-600" />
            <span className="text-lg">Delete</span>
            <DropdownMenuShortcut>⇧⌘D_C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cars_Edit_Delete;
