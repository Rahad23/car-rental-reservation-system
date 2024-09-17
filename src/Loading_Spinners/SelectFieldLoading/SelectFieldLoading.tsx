import { Loader2 } from "lucide-react";

const SelectFieldLoading = () => {
  return (
    <div className="mt-4 flex gap-x-2 items-center cursor-default">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
};

export default SelectFieldLoading;
