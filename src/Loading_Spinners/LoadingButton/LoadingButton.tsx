import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type TLoadingButton = {
  message: string;
};

const LoadingButton: React.FC<TLoadingButton> = ({ message }) => {
  return (
    <Button className="capitalize bg-[#2D3A4B] rounded-none mt-4 flex gap-x-2 items-center cursor-default">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {message}
    </Button>
  );
};

export default LoadingButton;
